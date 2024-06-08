import 'reflect-metadata';
import { logger, tracer } from 'src/utils/logger.util';
import { CustomerCreatedEntity } from './entity';
import { TOPICS } from 'src/utils/constants';
import { existsContractEvent } from 'src/utils/utils';
import dynamodbAdapter from 'src/adapters/dynamodb.adapter';
import { DataEvent } from 'src/utils/interfaces';

const {
  MSK_TOPIC_CUSTOMER_VALIDATED
} = process.env;

class CustomerCreatedService {
  @tracer.captureMethod({
    captureResponse: true,
  })
  public async saveContractEventStore (messages: DataEvent[]): Promise<void> {
    for (const message of messages) {
      try {
        const customerData = message;
        const { transaction: transactionId } = customerData;
        const lastContract = await this.getLastContractRecordByTransactionId(transactionId);
        if (!lastContract) continue;

        const existsCustomerValidatedEvent = await existsContractEvent(transactionId, TOPICS.CUSTOMER_VALIDATED);
        
        if (existsCustomerValidatedEvent) continue;

        const contractEventStoreData = this.newContractEventStoreData(lastContract, customerData);
        const contractEventStoreUpdateParams = CustomerCreatedEntity.contractEventStoreUpdateParams(contractEventStoreData);
        await dynamodbAdapter.put(contractEventStoreUpdateParams);
      } catch (error) {
        logger.error(JSON.stringify({ error }));
        throw error;
      }
    }
  };

  @tracer.captureMethod({
    captureResponse: true,
  })
  public async getLastContractRecordByTransactionId (transactionId: any) {
    const lastEventByTransactionIdQueryParams = CustomerCreatedEntity.lastEventByTransactionIdQueryParams(transactionId);
    const lastContractRecord = await dynamodbAdapter.query(lastEventByTransactionIdQueryParams);
    if (!(lastContractRecord.Items && lastContractRecord.Items.length > 0)) {
      const message = `No previous record was found contract with transactionId: '${transactionId}'.`;
      logger.info(message);
      return;
    }

    return lastContractRecord.Items[0];
  };

  public newContractEventStoreData (lastContract: any, customerData: any) {
    const newContract = {
      ...lastContract,
      id: lastContract.id + 1,
      time: Date.now(),
      type: MSK_TOPIC_CUSTOMER_VALIDATED,
      data: {
        payload: {
          ...customerData.data.payload,
          customerId: customerData.data.payload.id,
          cognitoUserName: lastContract.data.payload.cognitoUserName,
        },
        snapshot: {
          ...lastContract.data.snapshot,
          customer: customerData.data.snapshot
        }
      }
    };

    return newContract;
  };
}

export default new CustomerCreatedService();
