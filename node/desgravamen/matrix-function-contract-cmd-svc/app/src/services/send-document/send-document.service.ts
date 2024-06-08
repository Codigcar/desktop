import 'reflect-metadata';
import { v4 as uuid } from 'uuid';
import { logger, tracer } from 'src/utils/logger.util';
import dynamoDBAdapter from 'src/adapters/dynamodb.adapter';
import { ContractSnapshotDocument, DataEvent } from 'src/utils/interfaces';
import { TOPICS, CONTRACT_FILE, DESGRAVAMEN_FILE } from 'src/utils/constants';
import { existsContractEvent } from 'src/utils/utils';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { AppError, ErrorCodes } from 'src/utils/error';
import { SendDocumentEntity } from './entity';

class SendDocumentService {
  @tracer.captureMethod({
    captureResponse: true,
  })
  public async filterMessages(messages: any) {
    const filteredMessages: string[] = [];
    for (const message of messages) {
      try {
        const jsonMessage = message;
        const eventType = jsonMessage.type;
        const transaction = jsonMessage.transaction;

        const documentReadyToSend = await this.verifyDocumentReadyToSend(transaction, eventType, jsonMessage);

        if (!documentReadyToSend) continue;

        logger.info(`Document ready to send for transaction ${jsonMessage.transaction}`);
        filteredMessages.push(JSON.stringify(documentReadyToSend));

        if (filteredMessages.length === 0) {
          throw new AppError(ErrorCodes.EVENT_NOT_FOUND);
        }

        return filteredMessages;

      } catch (error) {
        logger.error(JSON.stringify({ error }));
        throw error;
      }
    }
  }

  @tracer.captureMethod({
    captureResponse: true,
  })
  async verifyDocumentReadyToSend(transaction: string, eventType: string, currentlyEvent: DataEvent) {
    switch (eventType) {
      case TOPICS.DOCUMENT_CREATED:
        const lastContractEvent = await existsContractEvent(transaction, TOPICS.CONTRACT_RELEASED);

        return lastContractEvent ? (lastContractEvent as DocumentClient.ItemList)[0] as DataEvent : false;

      case TOPICS.CONTRACT_RELEASED:
        if (currentlyEvent.data.snapshot.document) {
          return currentlyEvent;
        }
        const existDocumentCreated = await existsContractEvent(transaction, TOPICS.DOCUMENT_CREATED);

        if (existDocumentCreated) {
          return currentlyEvent;
        }
        return false;

      default:
        return false;
    }
  };

  @tracer.captureMethod({
    captureResponse: true,
  })
  public async saveEvent(messages: any): Promise<void> {
    for (const message of messages) {
      try {
        const jsonMessage: DataEvent = JSON.parse(message);
        const newNotificationEvent = await this.prepareNotificationEvent(jsonMessage);
        logger.debug(`Outcoming event: ${JSON.stringify(newNotificationEvent)}`);
        const notificationEventStoreSaveParams = SendDocumentEntity.notificationEventStoreSaveParams(newNotificationEvent);
        await dynamoDBAdapter.put(notificationEventStoreSaveParams);
        return;
      } catch (error) {
        logger.error(JSON.stringify({ error }));
        throw error;
      }
    }
  };

  async prepareNotificationEvent(lastContractEvent: DataEvent) {
    const uuidNotification = uuid();
    let firstName = '';

    let billingDay = lastContractEvent.data.snapshot.offer.conditions.billingDay;
    let payDay = lastContractEvent.data.snapshot.offer.conditions.payDay;

    const customerData = lastContractEvent.data.snapshot.customer;
    if (customerData.name && customerData.lastName) {
      firstName = customerData.name ? customerData.name.split(' ')[0] : customerData.name;
    }

    const documents = await this.s3Documents(lastContractEvent.data.snapshot.document as ContractSnapshotDocument);
    return {
      source: `notification/${uuidNotification}`,
      id: 1,
      author: lastContractEvent.author,
      data: {
        payload: {
          id: uuidNotification,
          email: {
            attachments: [
              documents.contract,
              documents.desgravamen,
              documents.summary,
            ],
            template: {
              name: process.env.CONTRACT_SUMMARY_EMAIL_TEMPLATE,
              parameters: {
                firstName: firstName,
                billingDate: billingDay,
                paymentDeadline: payDay,
                subject: 'Bienvenido al círculo'
              },
              version: '1'
            }
          },
          user: lastContractEvent.author
        },
        snapshot: {}
      },
      dataContentType: 'application/json',
      dataEncodingType: 'none',
      time: Date.now(),
      transaction: lastContractEvent.transaction,
      type: process.env.MSK_TOPIC_NOTIFICATION_REQUEST
    };
  }

  @tracer.captureMethod({
    captureResponse: true,
  })
  async s3Documents(dataDocument: ContractSnapshotDocument) {
    const env = process.env.ENV || 'dev';
    return {
      contract: {
        store: `s3-${env}-matrix-front-01`,
        id: CONTRACT_FILE,
        filename: 'Contrato de la tarjeta de crédito iO.pdf',
      },
      desgravamen: {
        store: `s3-${env}-matrix-front-01`,
        id: DESGRAVAMEN_FILE,
        filename: 'Seguro de desgravamen.pdf',
      },
      summary: {
        store: `s3-${env}-matrix-contract-documents-01`,
        id: dataDocument.key,
        filename: 'Hoja Resumen Contratación iO.pdf'
      }
    }
  };
};

export default new SendDocumentService();
