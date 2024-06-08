import 'reflect-metadata';
import { logger, tracer } from 'src/utils/logger.util';
import { DocumentCreatedEntity } from './entity';
import { TOPICS } from 'src/utils/constants';
import { existsContractEvent } from 'src/utils/utils';
import DynamoDBAdapter from 'src/adapters/dynamodb.adapter';
import { MessageDocumentCreated } from 'src/utils/interfaces';

class DocumenteCreatedService {
  @tracer.captureMethod({
    captureResponse: true,
  })
  async getLastContractRecordByTransactionId(transactionId: any) {
    const lastEventByTransactionIdQueryParams = DocumentCreatedEntity.lastEventByTransactionIdQueryParams(transactionId);
    const lastContractRecord = await DynamoDBAdapter.query(lastEventByTransactionIdQueryParams);
    if (!(lastContractRecord.Items && lastContractRecord.Items.length > 0)) {
      const message = `No previous record was found contract with transactionId: '${transactionId}'.`;
      logger.info(message);
      return;
    }

    return lastContractRecord.Items[0];
  };

  @tracer.captureMethod({
    captureResponse: true,
  })
  async saveEvent(messages: MessageDocumentCreated[]): Promise<void> {
    for (const message of messages) {
      try {
        const jsonMessage: MessageDocumentCreated = message;
        const { transaction: transactionId } = jsonMessage;

        const contractLastEvent = await this.getLastContractRecordByTransactionId(transactionId);

        if (!contractLastEvent) continue;

        const existsDocumentCreatedEvent = await existsContractEvent(transactionId, TOPICS.DOCUMENT_CREATED);

        if (existsDocumentCreatedEvent) continue;

        const newData = {
          payload: {
            ...contractLastEvent.data.payload,
            ...jsonMessage.s3
          },
          snapshot: {
            ...contractLastEvent.data.snapshot,
            document: jsonMessage.s3
          }
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
          type: contractLastEvent.type === TOPICS.CONTRACT_RELEASED ? contractLastEvent.type : TOPICS.DOCUMENT_CREATED,
        };
        await DynamoDBAdapter.put(DocumentCreatedEntity.contractEventStoreSaveParams(contractNewEvent));
      } catch (error) {
        logger.error(JSON.stringify({ error }));
        throw error;
      }
    }
  };
}

export default new DocumenteCreatedService();
