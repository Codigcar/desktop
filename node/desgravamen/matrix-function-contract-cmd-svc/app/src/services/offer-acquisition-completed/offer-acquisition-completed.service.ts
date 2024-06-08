import 'reflect-metadata';
import { TOPICS } from 'src/utils/constants';
import { DataEvent } from 'src/utils/interfaces';
import { logger, tracer } from 'src/utils/logger.util';
import { OfferAcquisitionCompletedEntity } from './entity';
import { existsContractEvent } from 'src/utils/utils';
import dynamoDBAdapter from 'src/adapters/dynamodb.adapter';

class OfferAcquisitionCompletedService {
  @tracer.captureMethod({
    captureResponse: true,
  })
  public async completeAcquisitions(messages: DataEvent[]) {
    for (const message of messages) {
      try {
        const jsonMessage: DataEvent = message;
        const eventType = jsonMessage.type;
        const transaction = jsonMessage.transaction;

        const isCompleted = await this.isAcquisitionCompleted(transaction);
        logger.debug(`isCompleted: ${JSON.stringify(isCompleted)}`);
        if (isCompleted) continue;

        const isReadyToComplete = await this.isAcquisitionReadyToComplete(transaction, eventType);
        logger.debug(`isReadyToComplete: ${JSON.stringify(isReadyToComplete)}`);
        if (!isReadyToComplete) continue;

        const eventToUse = await this.getLastEventContractByTransaction(transaction);

        if (eventToUse.type === TOPICS.CONTRACT_RELEASED) continue;

        const newContractEvent = await this.prepareNewContractEvent(eventToUse);

        await this.saveContractEventStore(newContractEvent);

        logger.info(`Product acquisition completed successfully to transaction: ${transaction}`);
      } catch (error) {
        logger.error(JSON.stringify({ error }));
        throw error;
      }
    }
  }

  @tracer.captureMethod({
    captureResponse: true,
  })
  public async saveContractEventStore(contractNewEvent: any) {
    await dynamoDBAdapter.put(OfferAcquisitionCompletedEntity.contractEventStoreUpdateParams(contractNewEvent));
  }

  async isAcquisitionReadyToComplete(transaction: string, eventType: string) {
    let lastContractEvent;

    switch (eventType) {
      case TOPICS.ACCOUNT_CREATED:
        lastContractEvent = await existsContractEvent(transaction, TOPICS.CARD_EMITTED);
        break;

      case TOPICS.CARD_EMITTED:
        lastContractEvent = await existsContractEvent(transaction, TOPICS.ACCOUNT_CREATED);
        break;
    }

    return lastContractEvent;
  }

  async isAcquisitionCompleted(transaction: string) {
    return await existsContractEvent(transaction, TOPICS.CONTRACT_RELEASED);
  }

  async prepareNewContractEvent(lastContractEvent: DataEvent) {
    return {
      source: lastContractEvent.source,
      id: lastContractEvent.id + 1,
      author: lastContractEvent.author,
      data: {
        payload: {},
        snapshot: lastContractEvent.data.snapshot,
      },
      dataContentType: lastContractEvent.dataContentType,
      dataEncodingType: lastContractEvent.dataEncodingType,
      time: Date.now(),
      transaction: lastContractEvent.transaction,
      type: TOPICS.CONTRACT_RELEASED,
    };
  }

  getSnapshotDataByEventType(eventType: string, contractEvents: any, type: string) {
    const index = contractEvents.findIndex((event: DataEvent) => event.type === eventType);
    return index >= 0 ? contractEvents[index].data.snapshot[type] : {};
  }

  @tracer.captureMethod({
    captureResponse: true,
  })
  async getLastEventContractByTransaction(transactionId: string): Promise<DataEvent> {
    const lastEventByTransactionIdQueryParams =
      OfferAcquisitionCompletedEntity.lastEventByTransactionIdQueryParams(transactionId);
    const { Items } = await dynamoDBAdapter.query(lastEventByTransactionIdQueryParams);
    const lastContractRecord: DataEvent = Items![0] as DataEvent;

    return lastContractRecord;
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

export default new OfferAcquisitionCompletedService();
