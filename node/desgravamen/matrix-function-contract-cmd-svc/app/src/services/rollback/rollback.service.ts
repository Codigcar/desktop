import 'reflect-metadata';
import { logger, tracer } from 'src/utils/logger.util';
import { RollbackEntity } from './entity';
import { ERROR_CODES, TOPICS_ROLLBACK, TOPICS } from 'src/utils/constants';
import dynamoDBAdapter from 'src/adapters/dynamodb.adapter';
import { CustomerEvent, DataEvent, MessageTopicRollback } from 'src/utils/interfaces';

class RollbackService {
  @tracer.captureMethod({
    captureResponse: true,
  })
  public async rollbackByTopic(messages: any) {
    for (const message of messages) {
      try {
        const jsonMessage = message;
        const errorType = jsonMessage.type;
        const transaction = jsonMessage.transaction;
        const contractLastEvent = await this.getLastEventByTransaction(transaction); 

        if(!contractLastEvent) continue;

        logger.debug(`Error: ${errorType} with contract contractEvent: ${JSON.stringify(contractLastEvent)} `,);

        switch (errorType) {
          case TOPICS_ROLLBACK.CARD_REGISTER_FAILED:
            await this.rollbackCardRegisterFailed(contractLastEvent as DataEvent, errorType);
            break;

          case TOPICS_ROLLBACK.CUSTOMER_CREATION_FAILED:
            await this.rollbackCustomerCreationFailed(contractLastEvent as DataEvent, errorType);
            break;            

          default:
            logger.error('TOPIC_ROLLBACK not support');
            break;                  
        }

      } catch (error) {
        logger.error(JSON.stringify({ error }));
        throw error;
      }
    }
  };

  @tracer.captureMethod({
    captureResponse: true,
  })
  async getLastEventByTransaction(transaction: string) {
    logger.debug(`transaction: ${transaction}`);
    const lastEventByTransactionQueryParams = RollbackEntity.lastEventByTransactionIdQueryParams(transaction);
    const { Items: lastcontractEvent } = await dynamoDBAdapter.query(lastEventByTransactionQueryParams);

    if (!lastcontractEvent || !lastcontractEvent[0]) {
        logger.error('Error: ', JSON.stringify({
          code: ERROR_CODES.CONTRACT_NOT_FOUND,
          message: `Contract not found on transaction ${transaction}`,
        }));
        return;
    }

    return lastcontractEvent[0];
  };

  @tracer.captureMethod({
    captureResponse: true,
  })
  async rollbackCardRegisterFailed (lastContractEvent: DataEvent, typeError: string) {
    await Promise.all([
      this.deleteCustomer(lastContractEvent.author),
      this.saveEventContractFailed(lastContractEvent, typeError),
    ]);

    return;
  }

  @tracer.captureMethod({
    captureResponse: true,
  })
  async getCustomerEvent (username: string) {
    logger.debug(`username: ${username}`);
    const customerEventQueryParams = RollbackEntity.geCustomerEventByAuthor(username);
    logger.debug(`customerEventQueryParams: ${JSON.stringify(customerEventQueryParams)}`);
    const { Items: customerEventByAuthor } = await dynamoDBAdapter.query(customerEventQueryParams);

    if (!customerEventByAuthor || !customerEventByAuthor[0]) {
        logger.error('Error: ', JSON.stringify({
          code: ERROR_CODES.USER_NOT_FOUND,
          message: `Customer not found by username ${username}`,
        }));
        return;
    }

    return customerEventByAuthor;
  }

  @tracer.captureMethod({
    captureResponse: true,
  })
  async deleteCustomer(username: string) {   
    const customerEventByAuthor = await this.getCustomerEvent(username);
    
    if(!customerEventByAuthor) return;
    customerEventByAuthor.forEach(async (customer) => {
        const customerEventDelete = RollbackEntity.customerEventDeleteParams(customer.source, customer.id);
        await dynamoDBAdapter.delete(customerEventDelete);
    });
  }

  @tracer.captureMethod({
    captureResponse: true,
  })
  async saveEventContractFailed (lastContractEvent: DataEvent, typeError: string) {
    const payload = lastContractEvent.data.payload;
    const snapshot = lastContractEvent.data.snapshot;
  
    const newContractEvent: DataEvent = {
      ...lastContractEvent,
      data: {
        payload,
        snapshot: {
          ...snapshot,
          error: {
            type: typeError,
          }
        }
      },
      id: lastContractEvent.id + 1,
      time: Date.now(),
      transaction: lastContractEvent.transaction,
      type: TOPICS.CONTRACT_FAILED,
    }

    logger.debug(`eventcontract to save: ${JSON.stringify(newContractEvent)}`);
    const contractEventStoreUpdateParams = RollbackEntity.contractEventStoreUpdateParams(newContractEvent)
    await dynamoDBAdapter.put(contractEventStoreUpdateParams);
    return;
  }

  async rollbackCustomerCreationFailed (lastContractEvent: DataEvent, typeError: string) {
    await Promise.all([
      this.saveEventContractFailed(lastContractEvent, typeError),
    ]);
  }  

}

export default new RollbackService();