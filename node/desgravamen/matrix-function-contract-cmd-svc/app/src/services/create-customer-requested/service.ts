import 'reflect-metadata';
import { container } from 'tsyringe';
import { KafkaAdapter } from 'src/adapters/kafka';
import { logger, tracer } from 'src/utils/logger.util';
import createCustomerRequestedEntity from './entity';
import { CognitoUser, Customer, DataEvent } from 'src/utils/interfaces';
import { ERROR_CODES, PARAM_TYPES, TOPICS } from 'src/utils/constants';
import cognitoAdapter from 'src/adapters/cognito.adapter';
import dynamoDBAdapter from 'src/adapters/dynamodb.adapter';
import secretsmanagerAdapter from 'src/adapters/secretsmanager.adapter';

const {
  MSK_TOPIC_CUSTOMER_VALIDATED,
  SECRETS_MANAGER_MSK_NAME
} = process.env;

class CreateCustomerRequestedService {

  public formatCognitoUserInfo (cognitoUser: any) {
    const data: CognitoUser = {
      enabled: false,
      userCreateDate: new Date(),
      userLastModifiedDate: new Date(),
      username: '',
      userStatus: ''
    };
    if (
      !cognitoUser.Username ||
      !cognitoUser.UserCreateDate ||
      !cognitoUser.UserLastModifiedDate ||
      !cognitoUser.Enabled ||
      !cognitoUser.UserStatus ||
      !cognitoUser.Attributes
    ) {
      logger.error('Error: Fn-formatCognitoUserInfo received cognitoUser param incomplete');
      return;
    }
  
    data.username = cognitoUser.Username;
    data.userCreateDate = cognitoUser.UserCreateDate;
    data.userLastModifiedDate = cognitoUser.UserLastModifiedDate;
    data.enabled = cognitoUser.Enabled;
    data.userStatus = cognitoUser.UserStatus;
    cognitoUser.Attributes.forEach((item: any) => {
      const nameItem = item.Name;
      data[nameItem] = item.Value!;
    });
  
    return data;
  };
  
  @tracer.captureMethod({
    captureResponse: true,
  })
  public async getCognitoUserData (documentNumber: any) {
    logger.info('Start executing method CreateCustomerRequested.getCognitoUserData');
    const cognitoUser = await cognitoAdapter.getUserByParam(documentNumber, PARAM_TYPES.USER_ID);
  
    const [userData] = (cognitoUser === undefined) ? [{}] : cognitoUser;
  
    if (Object.keys(userData).length === 0) {
      logger.error('Error: ', JSON.stringify({
        code: ERROR_CODES.USER_NOT_FOUND,
        message: `The user with accountId '${documentNumber}' is not registered in Cognito.`
      }));
    }
    const userInfo = this.formatCognitoUserInfo(userData);
    if (!userInfo) {
      return;
    }

    return { userData, userDocumentNumber: userInfo['preferred_username'] as string };
  };
  
  @tracer.captureMethod({
    captureResponse: true,
  })
  public async checkIfCustomerExists (cognitoUserName: any): Promise<Customer | boolean> {
    logger.info('Start executing method CreateCustomerRequested.checkIfCustomerExists');
    logger.debug(`cognitoUserName: ${cognitoUserName}`);

    const customerByUsernameQueryParams = createCustomerRequestedEntity.customerByUsernameQueryParams(cognitoUserName);
    logger.debug(`customer by username query params: ${JSON.stringify(customerByUsernameQueryParams)}`);
    const result = await dynamoDBAdapter.query(customerByUsernameQueryParams);

    const customerExist = (result.Count as number) > 0;
    logger.info(`customerExist: ${customerExist}`);
  
    if (customerExist) {
      const customer: Customer = result.Items![0] as Customer;
      if (customer.type === TOPICS.CUSTOMER_FAILED) {
        return false;
      }
  
      return customer;
    }
  
    return customerExist;
  };
  
  public newContractEventCustomerValidatedStoreData (lastContract: any, customerData: any) {
    logger.info('Start executing method CreateCustomerRequested.newContractEventCustomerValidatedStoreData');
    const newContract = {
      ...lastContract,
      id: lastContract.id + 1,
      time: Date.now(),
      type: MSK_TOPIC_CUSTOMER_VALIDATED,
      data: {
        payload: {
          ...customerData.payload,
          customerId: customerData.payload.id,
          cognitoUserName: lastContract.data.payload.cognitoUserName,
        },
        snapshot: {
          offer: lastContract.data.snapshot.offer,
          customer: customerData.snapshot
        }
      }
    };
  
    logger.debug(`newContract: ${JSON.stringify(newContract)} for author: ${lastContract.author}`);
    return newContract;
  };
  
  @tracer.captureMethod({
    captureResponse: true,
  })
  public async saveContractEventStore (contractEventStoreData: any) {
    logger.info('Start executing method CreateCustomerRequested.saveContractEventStore');
    logger.debug(`Saving contractEventStoreData: `, JSON.stringify(contractEventStoreData));
    const contractEventStoreSaveParams = createCustomerRequestedEntity.contractEventStoreSaveParams(contractEventStoreData);
    await dynamoDBAdapter.put(contractEventStoreSaveParams);
  };
  
  @tracer.captureMethod({
    captureResponse: true,
  })
  public async addEventCustomerValidatedOnContract (customer: Customer, transaction: string) {
    logger.info('Start executing method CreateCustomerRequested.addEventCustomerValidatedOnContract');
    const lastEventByTransactionIdQueryParams = createCustomerRequestedEntity.lastEventByTransactionIdQueryParams(transaction);
    
    try {
      const { Items } = await dynamoDBAdapter.query(lastEventByTransactionIdQueryParams);
      const lastContractRecord: DataEvent = Items![0] as DataEvent;
      const customerId = lastContractRecord.data.snapshot.customer?.id || null;
      if (customerId) {
        logger.info(`Customer ${customerId} already registered on transaction ${transaction}`);
        return;
      }
  
      const customerData = {
        payload: customer.data.payload,
        snapshot: customer.data.snapshot,
      }
      const contractEventStoreData = await this.newContractEventCustomerValidatedStoreData(lastContractRecord, customerData);
  
      await this.saveContractEventStore(contractEventStoreData);
      logger.debug(`Add event CustomerValidated on transaction ${transaction}`)
    } catch (error: any) {
      logger.error(`Error addEventCustomerValidatedOnContract on transaction ${transaction}`, error.message)
    }
  }
  
  @tracer.captureMethod({
    captureResponse: true,
  })
  public async filterMessages (messages: DataEvent[]) {
    logger.info('Start executing method CreateCustomerRequested.filterMessages');
    const filteredMessages = [];
    for (const message of messages) {
      const jsonMessage: DataEvent = message;
      const cognitoUserName = jsonMessage.data.payload.cognitoUserName;
      const transaction = jsonMessage.transaction;
      const registeredCustomer = await this.checkIfCustomerExists(cognitoUserName);
  
      if (registeredCustomer) {
        const customer = registeredCustomer as Customer;
        logger.error(`Customer exists with cognito userName: ${cognitoUserName}`);
  
        await this.addEventCustomerValidatedOnContract(customer, transaction);
  
      } else {
        filteredMessages.push(jsonMessage);
      }
    }
  
    return filteredMessages;
  };
  
  @tracer.captureMethod({
    captureResponse: true,
  })
  public async prepareMessages (topicName: any, messages: DataEvent[]) {
    logger.info('Start executing method CreateCustomerRequested.prepareMessages');

    const preparedMessages = [];
    for (const message of messages) {
      const jsonMessage = message;
      const { source, id } = jsonMessage;
      logger.debug('jsonMessage: ', JSON.stringify(jsonMessage));
      const newMessage = await this.prepareMessage(topicName, jsonMessage);
      preparedMessages.push({
        key: `${source}/${id}`,
        value: JSON.stringify(newMessage)
      });
    }
  
    return preparedMessages;
  };
  
  public async prepareMessage (topicName: string, message: any) {
    logger.info('Start executing method CreateCustomerRequested.prepareMessage');
    
    const newMessage = {
      ...message,
      data: {
        payload: {
          cognitoUserName: message.data.payload.cognitoUserName
        },
        snapshot: {},
      },
      time: Date.now(),
      type: topicName
    };
  
    logger.debug(`newMessage: ${JSON.stringify(newMessage)} for author: ${message.author}`);
    return newMessage;
  };
  
  @tracer.captureMethod({
    captureResponse: true,
  })
  public async produceMessagesToTopic (topicName: any, messages: any) {
    logger.info('Start executing method CreateCustomerRequested.produceMessagesToTopic');
    logger.debug(`messages: ${JSON.stringify(messages)}`);
    const secrets = await secretsmanagerAdapter.getSecretValue(SECRETS_MANAGER_MSK_NAME!);
    logger.debug(`secret: ${SECRETS_MANAGER_MSK_NAME}, value: ${JSON.stringify(secrets)}`);
    container.register('credentials', { useValue: JSON.parse(secrets.SecretString!) });
    const kafka = container.resolve(KafkaAdapter);
    await kafka.sendMessages(topicName, messages);
    container.clearInstances();
    logger.info(`publishMessageByTopic '${topicName}' OK`);
  };

}

export default new CreateCustomerRequestedService();
