import { v4 as uuidv4 } from 'uuid';
import { ERROR_CODES, PARAM_TYPES, TOPICS, OFFER_STATUS } from 'src/utils/constants';
import { ERROR } from 'src/utils/errors';
import { DataEvent, DataEventContractStore, Lead } from 'src/utils/interfaces';
import dynamoDBAdapter from 'src/adapters/dynamodb.adapter';
import { logger, tracer } from 'src/utils/logger.util';
import cognitoAdapter from 'src/adapters/cognito.adapter';
import { validateLead } from 'src/services/authorize/validator';
import * as AWS from 'aws-sdk';
import contractAuthorizerEntities from 'src/services/contract-authorizer/entity';

class ContractAuthorizerService {
  @tracer.captureMethod({
    captureResponse: true,
  })

  public async saveEvent(messages: DataEvent[]) {
    for (const message of messages) {
      try {
        const { user, acceptDataProtection, source, amountOfCredit, leadId, action } = message.data.payload.details.hiddenDetails;

        logger.appendKeys({ author: user });

        const { userData, userDocumentNumber } = await this.getCognitoUserData(user);
        logger.debug(`userData: ${JSON.stringify(userData)}, userDocumentNumber=${userDocumentNumber}`);

        const lead = await this.findLeadById(leadId);

        validateLead(lead, userDocumentNumber, acceptDataProtection, amountOfCredit);

        const lastItem = await this.getLastItem(source);

        const contractData = this.prepareContractData(lastItem, action);

        await this.saveContractEventStore(contractData);
        logger.debug(`save ContractEventStoreData: ${JSON.stringify(contractData)}`);

        return JSON.stringify({
          message: "Offer accepted.",
          transactionId: contractData,
        });
      } catch (error) {
        logger.error(JSON.stringify({ error }));
      }
    }
  }

  public async findLeadById(leadId: string) {
    const leadQueryParams = contractAuthorizerEntities.getLeadsById(leadId);
    const { Items: leadData } = await dynamoDBAdapter.query(leadQueryParams);
    logger.debug(`leadData: ${JSON.stringify(leadData)}`);

    if (!leadData || !leadData[0]) {
      throw new ERROR.LeadNotFoundError(JSON.stringify({
        code: ERROR_CODES.LEAD_NOT_FOUND,
        message: 'Lead not found.',
        details: [{
          message: `Lead not found: '${leadId}'`
        }]
      }));
    }

    return leadData[0] as Lead;
  }

  @tracer.captureMethod({
    captureResponse: true,
  })
  public async getCognitoUserData(documentNumber: any) {
    const cognitoUser = await cognitoAdapter.getUserByParam(documentNumber, PARAM_TYPES.USER_ID);

    const [userData] =
      (cognitoUser === undefined) ? [{}] : cognitoUser;

    if (Object.keys(userData).length === 0) {
      throw new ERROR.UserNotFoundError(JSON.stringify({
        code: ERROR_CODES.USER_NOT_FOUND,
        message: 'User not found.',
        details: [{
          message: `The user with accountId '${documentNumber}' is not registered in Cognito.`
        }]
      }));
    }

    const { preferred_username: userDocumentNumber } = this.formatCognitoUserInfo(userData);

    return { userData, userDocumentNumber };
  };

  public async getLastItem(identity: string): Promise<any> {
    const docClient = new AWS.DynamoDB.DocumentClient({ region: process.env.REGION });
    try {
      const source = identity;

      const params: AWS.DynamoDB.DocumentClient.QueryInput = {
        TableName: process.env.CONTRACT_EVENT_STORE_TABLE_NAME || '',
        KeyConditionExpression: "#source = :source",
        ExpressionAttributeNames: {
          "#source": "source"
        },
        ExpressionAttributeValues: {
          ":source": source
        },
        ScanIndexForward: false,
        Limit: 1
      };

      const result = await docClient.query(params).promise();

      return result.Items;
    } catch (err) {
      console.error('Error while querying DynamoDB:', err);
      throw err;
    }
  }

  public prepareContractData(lastItem: any, action: string) {
    lastItem[0].data.payload.flowType = action;
    lastItem[0].data.snapshot.status = OFFER_STATUS.AUTHORIZED;
    lastItem[0].type = TOPICS.OFFER_AUTHORIZED;
    lastItem[0].id = lastItem[0].id + 1;
    lastItem[0].time = Date.now(),

    logger.debug(`Contract Data: ${JSON.stringify(lastItem)}`);
    return lastItem;
  };

  @tracer.captureMethod({
    captureResponse: true,
  })
  public async saveContractEventStore(contractEventStoreData: any) {
    const [contractEvent] = contractEventStoreData
    const contractEventStoreSaveParams = contractAuthorizerEntities.contractEventStoreSaveParams(contractEvent);
    await dynamoDBAdapter.put(contractEventStoreSaveParams);
  };

  public formatCognitoUserInfo(cognitoUser: any) {
    const data: any = {};
    data.username = cognitoUser.Username;
    data.userCreateDate = cognitoUser.UserCreateDate;
    data.userLastModifiedDate = cognitoUser.UserLastModifiedDate;
    data.enabled = cognitoUser.Enabled;
    data.userStatus = cognitoUser.UserStatus;
    cognitoUser.Attributes.forEach((item: any) => {
      const nameItem = item.Name;
      data[nameItem] = item.Value;
    });

    return data;
  };

  public getTransactionId(contractId: string): string {
    try {
      let xRayTraceId = process.env._X_AMZN_TRACE_ID;
      if (!xRayTraceId) return contractId;
      logger.debug(`xRayTraceId: ${xRayTraceId}`);

      const xRayId = xRayTraceId.split(/[=;]/)[1];
      logger.debug(`xRayId: ${xRayId}`);

      if (!xRayId || xRayId === '') return contractId;
      return xRayId;

    } catch (error: any) {
      logger.error(error);
      return contractId;
    }
  }
}

export default new ContractAuthorizerService();
