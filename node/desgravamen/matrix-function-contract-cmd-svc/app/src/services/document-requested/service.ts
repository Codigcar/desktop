import 'reflect-metadata';
import { container } from 'tsyringe';
import { logger, tracer } from 'src/utils/logger.util';
import { KafkaAdapter } from 'src/adapters/kafka';
import { ERROR_CODES, OFFER_DOCUMENT_TEMPLATE } from 'src/utils/constants';
import { DataEvent, Offer, snapshotOffer } from 'src/utils/interfaces';
import { DocumentRequestedEntity } from './entity';
import SecretsManagerAdapter from 'src/adapters/secretsmanager.adapter';
import { ERROR } from 'src/utils/errors';
import DynamoDBAdapter from 'src/adapters/dynamodb.adapter';

class DocumentRequestedService {
  @tracer.captureMethod({
    captureResponse: true,
  })
  async prepareMessages(topicName: string, messages: DataEvent[]) {
    const preparedMessages = [];
    for (const message of messages) {
      const jsonMessage = message;
      const { source, id } = jsonMessage;
      logger.debug('jsonMessage', JSON.stringify(jsonMessage));
      const newMessage = await this.prepareMessage(topicName, jsonMessage);
      if (!newMessage) {
        continue;
      }
      preparedMessages.push({
        key: `${source}/${id}`,
        value: JSON.stringify(newMessage)
      });
    }

    return preparedMessages;
  }

  @tracer.captureMethod({
    captureResponse: true,
  })
  async produceMessagesToTopic(topicName: string, messages: any) {
    const secrets = await SecretsManagerAdapter.getSecretValue(process.env.SECRETS_MANAGER_MSK_NAME!);
    container.register('credentials', { useValue: JSON.parse(secrets.SecretString!) });
    const kafka = container.resolve(KafkaAdapter);
    await kafka.sendMessages(topicName, messages);
    container.clearInstances();
    logger.debug(`publishMessageByTopic '${topicName}' OK`);
  };

  @tracer.captureMethod({
    captureResponse: true,
  })
  private async prepareMessage(topicName: string, message: DataEvent) {
    const offerId = message.data.snapshot.offer.id;
    const creditLine = message.data.snapshot.offer.conditions.creditLine;
    let snapshotOffer = message.data.snapshot['offer'] as snapshotOffer;
    let offer: Offer;
    let offerToPrepareParams = snapshotOffer;
    if (!snapshotOffer) {
      logger.error(`Offer not found ${offerId}`);
      return;
    }

    const desgravamen = snapshotOffer.desgravamen;
    const maxValueDesgravamen = snapshotOffer.maxValueDesgravamen;
    const billingDay = snapshotOffer.billingDay;
    const payDay = snapshotOffer.payDay;
    if (!desgravamen || !maxValueDesgravamen || !billingDay || !payDay) {
      offer = await this.findLeadView(offerId);
      offerToPrepareParams = {
        ...offerToPrepareParams,
        desgravamen: offer.desgravamen,
        maxValueDesgravamen: offer.maxValueDesgravamen,
        billingDay: offer.billingDay!,
        payDay: offer.payDay,
      }
    }

    const date = new Date(Date.now());
    const fechaForPdf: String = date.getFullYear().toLocaleString() + ('0' + (date.getMonth() + 1)).slice(-2) + ('0' + date.getDate()).slice(-2);
    const targetS3 = {
      store: process.env.BUCKET_DOCUMENTSRV,
      id: fechaForPdf + '_' + snapshotOffer.id + '_' + creditLine,
    };
    targetS3.id = targetS3.id.replace(/,/g, '');

    const newMessage = {
      ...message,
      transaction: message.transaction,
      templateId: OFFER_DOCUMENT_TEMPLATE.FILE_TEMPLATE,
      targetS3,
      params: this.prepareParamsTemplateOffer(offerToPrepareParams, creditLine),
      time: Date.now(),
      type: topicName
    };

    return newMessage;
  }

  @tracer.captureMethod({
    captureResponse: true,
  })
  async findLeadView(offerId: string) {
    const productOfferQueryParams = DocumentRequestedEntity.LeadViewQueryParams(offerId);
    const { Items: dataProductOffer } = await DynamoDBAdapter.query(productOfferQueryParams);

    if (!dataProductOffer || !dataProductOffer[0]) {
      logger.error(`Offer not found: '${offerId}'`)
      throw new ERROR.OfferNotFoundError(JSON.stringify({
        code: ERROR_CODES.OFFER_NOT_FOUND,
        message: 'offer not found.',
        details: [{
          message: `offer not found by id ${offerId}`
        }]
      }));
    }

    return dataProductOffer[0] as Offer;
  };

  private prepareParamsTemplateOffer(offer: snapshotOffer, creditLine: number) {
    return {
      creditLine: this.solesCurrencyFormatter(creditLine, 'CreditLine'),
      tcea: this.percentFormatter(offer.tcea, 'TCEA'),
      tceaDolar: this.percentFormatter(offer.tcea, 'TCEA-Dollar'),
      tea: this.percentFormatter(offer.tea, 'TEA'),
      teaDolar: this.percentFormatter(offer.tea, 'TEA-Dollar'),
      tnam: OFFER_DOCUMENT_TEMPLATE.TNAM,
      tnamDolar: OFFER_DOCUMENT_TEMPLATE.TNAM,
      desgravamen: `${this.percentFormatter(offer.desgravamen, 'desgravamen', 3)} - máximo ${this.solesCurrencyFormatter(offer.maxValueDesgravamen, 'maxValueDesgravamen')} (1)`,
      billingDay: `${offer.billingDay} de cada mes`,
      payDay: `${offer.payDay} de cada mes`,
    };
  };

  private validateOnlyPossitiveNumber = (num: any, paramName: string): number => {
    let toValidate = String(num);
    // deepcode ignore UseNumberIsNan: <just using Number.isNaN isn't cover all cases>
    if (Number.isNaN(toValidate) || toValidate.length === 0 || isNaN(Number(toValidate))) {
      logger.error(`Invalid number for param ${paramName}: ${toValidate}`);
    }
    const toNumber = parseFloat(toValidate);

    if (toNumber < 0) {
      logger.error(`Value ${toValidate} must to be a possitive number for param ${paramName}`);
    }

    return toNumber;
  }

  private percentFormatter = (num: number, paramName: string, decimalsFixed = 2): string => {
    const toNumber = this.validateOnlyPossitiveNumber(num, paramName);
    const numberPercent = toNumber * 100;
    return String(numberPercent.toFixed(decimalsFixed) + '%');
  };

  private solesCurrencyFormatter = (num: number, paramName: string): string => {
    const toNumber = this.validateOnlyPossitiveNumber(num, paramName);
    return `S/ ${new Intl.NumberFormat('pe-PE', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(toNumber)}`;
  };
}

export default new DocumentRequestedService();
