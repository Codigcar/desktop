import { v4 as uuidv4 } from 'uuid';
import { ERROR_CODES, PARAM_TYPES, TOPICS } from 'src/utils/constants';
import { ERROR } from 'src/utils/errors';
import { DataEvent, DataEventContractStore, Lead } from 'src/utils/interfaces';
import dynamoDBAdapter from 'src/adapters/dynamodb.adapter';
import { logger, tracer } from 'src/utils/logger.util';
import cognitoAdapter from 'src/adapters/cognito.adapter';
import contractAuthorizerEntities from 'src/services/contract-authorizer/entity';

class ContractAuthorizerService {
  @tracer.captureMethod({
    captureResponse: true,
  })
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
  
  public prepareContractData (cognitoUser: any, userDocumentNumber: string, lead: Lead, acceptDataProtection: boolean, amountOfCredit: number) {
    const contractId = uuidv4();
    const contractData = {
      contractId,
      cognitoUser: cognitoUser.Username,
      productOfferRequested: {
        dni: userDocumentNumber,
        offerId: lead.id,
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
      },
      dataProtectionClauseAccepted: acceptDataProtection
    };
  
    logger.debug(`Contract Data: ${JSON.stringify(contractData)}`);
    return contractData;
  };
  
  public newEventContractStoreData (contractData: DataEventContractStore) {
    const eventContractStoreData: DataEvent = {
      source: contractData.contractId,
      id: 1,
      author: contractData.cognitoUser,
      data: {
        payload: {
          cognitoUserName: contractData.cognitoUser,
          conditions: contractData.productOfferRequested.conditions,
          dataProtectionClauseAccepted: contractData.dataProtectionClauseAccepted,
          dni: contractData.productOfferRequested.dni,
          offerId: contractData.productOfferRequested.offerId,
        },
        snapshot: {
          offer: {
            id: contractData.productOfferRequested.offerId,
            conditions: contractData.productOfferRequested.conditions,
            dataProtectionClauseAccepted: contractData.dataProtectionClauseAccepted,
            tea: contractData.productOfferRequested.conditions.tea,
            tcea: contractData.productOfferRequested.conditions.tcea,
            desgravamen: contractData.productOfferRequested.conditions.desgravamen,
            billingDay: contractData.productOfferRequested.conditions.billingDay,
            payDay: contractData.productOfferRequested.conditions.payDay,
            maxValueDesgravamen: contractData.productOfferRequested.conditions.maxValueDesgravamen,
          }
        },
      },
      dataContentType: 'application/json',
      dataEncodingType: 'identity',
      time: Date.now(),
      transaction: this.getTransactionId(contractData.contractId),
      type: TOPICS.OFFER_AUTHORIZED
    };
  
    return eventContractStoreData;
  };
  
  @tracer.captureMethod({
    captureResponse: true,
  })
  public async saveContractEventStore (contractEventStoreData: any) {
    const contractEventStoreSaveParams = contractAuthorizerEntities.contractEventStoreSaveParams(contractEventStoreData);
    await dynamoDBAdapter.put(contractEventStoreSaveParams);
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
  
  public getTransactionId (contractId: string): string {
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
