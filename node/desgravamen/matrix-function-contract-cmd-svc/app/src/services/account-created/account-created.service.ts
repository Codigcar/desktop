import 'reflect-metadata';
import { logger, tracer } from 'src/utils/logger.util';
import { AccountCreatedEntity } from './entity';
import { TOPICS } from 'src/utils/constants';
import { existsContractEvent } from 'src/utils/utils';
import dynamoDBAdapter from 'src/adapters/dynamodb.adapter';
import { DataEvent } from 'src/utils/interfaces';

class AccountCreatedService {
  @tracer.captureMethod({
    captureResponse: true,
  })
  public async saveEvent(messages: DataEvent[]) {
    for (const message of messages) {
      try {
        const jsonMessage: DataEvent = message;
        const contractId = jsonMessage.data.payload.contractId;
        const { transaction: transactionId } = jsonMessage;

        if (!contractId) {
          logger.error(`contractId not exist in transaction ${transactionId}`);
          continue;
        }

        const contractLastEvent = await this.getContractLastEvent(contractId, transactionId);

        if (!contractLastEvent) continue;

        logger.debug(`Last contract: ${JSON.stringify(contractLastEvent)}`);

        const existsAccountCreatedEvent = await existsContractEvent(transactionId, TOPICS.ACCOUNT_CREATED);

        if (existsAccountCreatedEvent) continue;

        const contractNewEvent = await this.prepareNewContractEvent(contractLastEvent, jsonMessage);
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
  async getContractLastEvent(contractId: string, transaction: string) {
    logger.debug(`contractId: ${contractId}`);
    const contractLastEventQueryParams = AccountCreatedEntity.contractLastEventQueryParams(contractId);
    const { Items: contractLastEvent } = await dynamoDBAdapter.query(contractLastEventQueryParams);

    if (!contractLastEvent || !contractLastEvent[0]) {
      logger.error(`Contract not found: '${contractId}', on Transaction: '${transaction}'`);
      return;
    }

    return contractLastEvent[0];
  }

  @tracer.captureMethod({
    captureResponse: true,
  })
  public async saveContractEventStore(contractNewEvent: any) {
    await dynamoDBAdapter.put(AccountCreatedEntity.contractEventStoreSaveParams(contractNewEvent));
  }

  async prepareNewContractEvent(contractLastEvent: Record<string, any>, jsonMessage: any) {
    const newData = {
      payload: {
        ...contractLastEvent.data.payload,
        ...jsonMessage.data.payload,
      },
      snapshot: {
        ...contractLastEvent.data.snapshot,
        account: jsonMessage.data.payload,
      },
    };
    const contractNewEvent = {
      source: contractLastEvent.source,
      id: contractLastEvent.id + 1,
      author: contractLastEvent.author,
      data: newData,
      dataContentType: 'application/json',
      dataEncodingType: 'identity',
      time: Date.now(),
      transaction: contractLastEvent.transaction,
      type: TOPICS.ACCOUNT_CREATED,
    };

    return contractNewEvent;
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

export default new AccountCreatedService();
