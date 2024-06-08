import service from '../../src/services/offer-acquisition-completed/offer-acquisition-completed.service';
import { handler as offerAcquisitionCompletedHandler } from '../../src/functions/offer-acquisition-completed/handler';
import { lastEventMocked, mockMskEvent, mockMskRecordContentByTopic } from './offer-acquisition-completed.mock';
import { myContextMocked } from 'tests/__mocks__/context-mock/context.mock';

import * as utils from '../../src/utils/utils';

const topicAccountCreated = 'com.gcredicorp.matrix.contract.account-created.v1';
const topicCardEmitted = 'com.gcredicorp.matrix.contract.card-emitted.v1';
const topicDocumentCreated = 'com.gcredicorp.matrix.contract.document-created.v1';

let envsOriginal = {
  KAFKA_BOOTSTRAP_SERVERS: '',
  MSK_SASL_USERNAME: '',
  MSK_SASL_PASSWORD: '',
  MSK_TOPIC_ACCOUNT_CREATED: '',
  MSK_TOPIC_CARD_EMITTED: '',
  MSK_TOPIC_DOCUMENT_CREATED: '',
};

jest.mock('@middy/core');
jest.mock('@aws-lambda-powertools/logger', () => {
  class ClassLogger {
    constructor(logLevel: any, logFormatter: any, environment: any) {}
    info(...input: any) {
      console.info(...input);
    }
    error(...input: any) {
      console.error(...input);
    }
    debug(...input: any) {
      console.debug(...input);
    }
    appendKeys(...input: any) {}
  }
  class LogFormatter {}
  return {
    injectLambdaContext: () => {
      console.log('injectLambdaContext...');
    },
    LogFormatter,
    Logger: ClassLogger,
  };
});

jest.mock('@aws-lambda-powertools/tracer', () => {
  class ClassTracer {
    constructor(serviceName: any) {}
    captureMethod = () => jest.fn();
  }
  return {
    captureLambdaHandler: () => {
      console.log('captureLambdaHandler...');
    },
    Tracer: ClassTracer,
  };
});

jest.mock('aws-xray-sdk', () => {
  return {
    captureAWSClient: (service: any) => service,
  };
});

beforeAll(() => {
  const {
    KAFKA_BOOTSTRAP_SERVERS,
    MSK_SASL_USERNAME,
    MSK_SASL_PASSWORD,
    MSK_TOPIC_ACCOUNT_CREATED,
    MSK_TOPIC_CARD_EMITTED,
    MSK_TOPIC_DOCUMENT_CREATED,
  } = process.env;

  envsOriginal = {
    KAFKA_BOOTSTRAP_SERVERS: KAFKA_BOOTSTRAP_SERVERS!,
    MSK_SASL_USERNAME: MSK_SASL_USERNAME!,
    MSK_SASL_PASSWORD: MSK_SASL_PASSWORD!,
    MSK_TOPIC_ACCOUNT_CREATED: MSK_TOPIC_ACCOUNT_CREATED!,
    MSK_TOPIC_CARD_EMITTED: MSK_TOPIC_CARD_EMITTED!,
    MSK_TOPIC_DOCUMENT_CREATED: MSK_TOPIC_DOCUMENT_CREATED!,
  };
  process.env.KAFKA_BOOTSTRAP_SERVERS = 'b-1,b-2';
  process.env.MSK_SASL_USERNAME = '';
  process.env.MSK_SASL_PASSWORD = '';
  process.env.MSK_TOPIC_ACCOUNT_CREATED = topicAccountCreated;
  process.env.MSK_TOPIC_CARD_EMITTED = topicCardEmitted;
  process.env.MSK_TOPIC_DOCUMENT_CREATED = topicDocumentCreated;
});

afterAll(() => {
  process.env.KAFKA_BOOTSTRAP_SERVERS = envsOriginal.KAFKA_BOOTSTRAP_SERVERS;
  process.env.MSK_SASL_USERNAME = envsOriginal.MSK_SASL_USERNAME;
  process.env.MSK_SASL_PASSWORD = envsOriginal.MSK_SASL_PASSWORD;
  process.env.MSK_TOPIC_ACCOUNT_CREATED = envsOriginal.MSK_TOPIC_ACCOUNT_CREATED;
  process.env.MSK_TOPIC_CARD_EMITTED = envsOriginal.MSK_TOPIC_CARD_EMITTED;
  process.env.MSK_TOPIC_DOCUMENT_CREATED = envsOriginal.MSK_TOPIC_DOCUMENT_CREATED;
});

describe('Test OfferAcquisitionCompletedUseCase', () => {
  test('When accountCreatedEvent should saveContractEventStore: offer acquisition completed successfully', async () => {
    const mockAccountCreated = mockMskRecordContentByTopic(topicAccountCreated, false);
    const isAcquisitionReadyToCompleteIdSpy = jest.spyOn(service, 'isAcquisitionReadyToComplete');
    const isAcquisitionCompletedIdSpy = jest.spyOn(service, 'isAcquisitionCompleted');
    const getLastEventContractByTransaction = jest.spyOn(service, 'getLastEventContractByTransaction');
    const completeAcquisitionsIdSpy = jest.spyOn(service, 'completeAcquisitions');
    const prepareNewContractEventIdSpy = jest.spyOn(service, 'prepareNewContractEvent');
    const saveEventSpy = jest.spyOn(service, 'saveContractEventStore');

    isAcquisitionReadyToCompleteIdSpy.mockReturnValue(Promise.resolve(mockAccountCreated));
    isAcquisitionCompletedIdSpy.mockReturnValue(Promise.resolve(false));
    getLastEventContractByTransaction.mockReturnValue(Promise.resolve(mockAccountCreated));
    saveEventSpy.mockReturnValue(Promise.resolve());

    await service.completeAcquisitions([mockAccountCreated]);
    expect(isAcquisitionReadyToCompleteIdSpy).toBeCalled();
    expect(isAcquisitionCompletedIdSpy).toBeCalled();
    expect(completeAcquisitionsIdSpy).toBeCalled();
    expect(prepareNewContractEventIdSpy).toBeCalled();
    expect(saveEventSpy).toBeCalled();
  });

  test('When cardEmittedEvent should saveContractEventStore: offer acquisition completed successfully', async () => {
    const mockCardEmitted = mockMskRecordContentByTopic(topicCardEmitted, false);
    const isAcquisitionReadyToCompleteIdSpy = jest.spyOn(service, 'isAcquisitionReadyToComplete');
    const isAcquisitionCompletedIdSpy = jest.spyOn(service, 'isAcquisitionCompleted');
    const getLastEventContractByTransaction = jest.spyOn(service, 'getLastEventContractByTransaction');
    const completeAcquisitionsIdSpy = jest.spyOn(service, 'completeAcquisitions');
    const prepareNewContractEventIdSpy = jest.spyOn(service, 'prepareNewContractEvent');
    const saveEventSpy = jest.spyOn(service, 'saveContractEventStore');

    isAcquisitionReadyToCompleteIdSpy.mockReturnValue(Promise.resolve(mockCardEmitted));
    isAcquisitionCompletedIdSpy.mockReturnValue(Promise.resolve(false));
    getLastEventContractByTransaction.mockReturnValue(Promise.resolve(mockCardEmitted));
    saveEventSpy.mockReturnValue(Promise.resolve());

    await service.completeAcquisitions([mockCardEmitted]);
    expect(isAcquisitionReadyToCompleteIdSpy).toBeCalled();
    expect(isAcquisitionCompletedIdSpy).toBeCalled();
    expect(completeAcquisitionsIdSpy).toBeCalled();
    expect(prepareNewContractEventIdSpy).toBeCalled();
    expect(saveEventSpy).toBeCalled();
  });

  test('should to read message from topic', async () => {
    const mockInputToEvent = mockMskEvent(topicAccountCreated);
    const completeAcquisitionsSpy = jest.spyOn(service, 'completeAcquisitions');
    completeAcquisitionsSpy.mockReturnValue(Promise.resolve());
    const responseHandler = await offerAcquisitionCompletedHandler(mockInputToEvent, myContextMocked);
    expect(responseHandler).toBe('OK');
    expect(completeAcquisitionsSpy).toBeCalled();
  });

  test('should to throw Error with EventData corrupted', async () => {
    const mockEventValidated: any = '';
    await expect(offerAcquisitionCompletedHandler(mockEventValidated, myContextMocked)).rejects.toThrow();
  });
});
