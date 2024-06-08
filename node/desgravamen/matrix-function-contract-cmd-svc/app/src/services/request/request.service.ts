import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';
import { ERROR } from 'src/utils/errors';
import { ContractRequestedEntity } from './entity';
import { logger, tracer } from 'src/utils/logger.util';
import cognitoAdapter from 'src/adapters/cognito.adapter';
import dynamoDBAdapter from 'src/adapters/dynamodb.adapter';
import { validateLead } from 'src/services/request/validator';
import { TOPICS, CONTRACT_STATUS, PARAM_TYPES, ERROR_CODES } from 'src/utils/constants';
import { ContractRequestedInput, ContractRequestedLead, DataEvent } from 'src/utils/interfaces';

class ContractRequestedService {
  @tracer.captureMethod({
    captureResponse: true,
  })
  public async saveEvent(messages: ContractRequestedInput[]) {
    for (const message of messages) {
      try {
        const jsonMessage: ContractRequestedInput = message;
        const {user: userId, leadId, amountOfCredit, acceptDataProtection} = jsonMessage
        const lead = await this.findLeadById(leadId);
        const { userData, userDocumentNumber } = await this.getCognitoUserData(userId);
        validateLead(lead, userDocumentNumber, amountOfCredit);

        const contractNewEvent = await this.prepareNewContractEvent(userData, userDocumentNumber,lead, acceptDataProtection, amountOfCredit);
        console.log({contractNewEvent});
        await this.saveContractEventStore(contractNewEvent);
      } catch (error) {
        logger.error(JSON.stringify({ error }));
        throw error;
      }
    }
  }

  @tracer.captureMethod({
    captureResponse: true,
  })
  async getContractLastEvent(author: string) {
    const contractLastEventQueryParams = ContractRequestedEntity.contractLastEventQueryParamsByAuthor(author);
    const { Items: contractLastEvent } = await dynamoDBAdapter.query(contractLastEventQueryParams);

    if (!contractLastEvent || !contractLastEvent[0]) {
      throw new Error(`Contract not found for user ${author}`);
    }

    return contractLastEvent[0];
  }

  @tracer.captureMethod({
    captureResponse: true,
  })
  async findLeadById(leadId: string) {
    const userLeadQueryParams = ContractRequestedEntity.getLeadsById(leadId);
    const { Items: userLead } = await dynamoDBAdapter.query(userLeadQueryParams);

    if (!userLead || !userLead[0]) {
      throw new Error(`Lead not found: '${leadId}`);
    }

    return userLead[0] as ContractRequestedLead;
  }

  @tracer.captureMethod({
    captureResponse: true,
  })
  public async saveContractEventStore(contractNewEvent: any) {
    await dynamoDBAdapter.put(ContractRequestedEntity.contractEventStoreSaveParams(contractNewEvent));
  }

  @tracer.captureMethod({
    captureResponse: true,
  })
  public async getCognitoUserData (documentNumber: any) {
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

  public formatCognitoUserInfo (cognitoUser: any) {
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

  async prepareNewContractEvent(cognitoUser: any, userDocumentNumber: string, lead: ContractRequestedLead, acceptDataProtection: boolean, amountOfCredit: number) {
    const contractId = uuidv4()
    const eventContractStoreData = {
      source: contractId,
      id: 1,
      author: cognitoUser.Username,
      data: {
        payload: {
          cognitoUserName: cognitoUser.Username,
          conditions: {
            currency: lead.currency,
            creditLine: amountOfCredit,
            tea: lead.tea,
            tcea: lead.tcea,
            desgravamen: lead.desgravamen,
            billingDay: lead.billingDay,
            payDay: lead.payDay,
            maxValueDesgravamen: lead.maxValueDesgravamen,
          },
          dataProtectionClauseAccepted: acceptDataProtection,
          dni: userDocumentNumber,
          offerId: lead.id,
        },
        snapshot: {
          offer: {
            id: lead.id,
            conditions: {
              currency: lead.currency,
              creditLine: amountOfCredit,
              tea: lead.tea,
              tcea: lead.tcea,
              desgravamen: lead.desgravamen,
              billingDay: lead.billingDay,
              payDay: lead.payDay,
              maxValueDesgravamen: lead.maxValueDesgravamen,
            },
            dataProtectionClauseAccepted: acceptDataProtection,
            tea: lead.tea,
            tcea: lead.tcea,
            desgravamen: lead.desgravamen,
            billingDay: lead.billingDay,
            payDay: lead.payDay,
            maxValueDesgravamen: lead.maxValueDesgravamen,
          },
          status: CONTRACT_STATUS.REQUESTED
        },
      },
      dataContentType: 'application/json',
      dataEncodingType: 'identity',
      time: Date.now(),
      transaction: this.getTransactionId(contractId),
      type: TOPICS.CONTRACT_REQUESTED
    };

    return eventContractStoreData;
  }

  getTransactionId(contractId: string): string {
    try {
      let xRayTraceId = process.env._X_AMZN_TRACE_ID;
      if (!xRayTraceId) return contractId;
      logger.debug(`xRayTraceId: ${xRayTraceId}`);

      const xRayId = xRayTraceId.split(/[=;]/)[1];
      logger.debug(`xRayId: ${xRayId}`);
      return xRayId;
    } catch (error: any) {
      logger.error(error);
      return contractId;
    }
  }
}

export default new ContractRequestedService();
