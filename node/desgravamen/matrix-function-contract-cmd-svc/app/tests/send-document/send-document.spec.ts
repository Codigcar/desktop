import service from 'src/services/send-document/send-document.service';
import { handler as sendDocumentHandler } from '../../src/functions/send-document/handler';
import { mockMskEvent } from './mskEvent.mock';
import { contractReleasedAfterDocumentCreatedEvent, dynamoContractEventsRecords, dynamoProductOfferQuery } from './send-document.mock';
import { mockMskRecordContentByTopic } from './mskEvent.mock';
import * as utils from '../../src/utils/utils';
import * as Logger from 'src/utils/logger.util';
import { myContextMocked } from 'tests/__mocks__/context-mock/context.mock';

const topicAccountCreated = 'com.gcredicorp.matrix.contract.account-created.v1';
const topicCardEmitted = 'com.gcredicorp.matrix.contract.card-emitted.v1';
const topicDocumentCreated = 'com.gcredicorp.matrix.contract.document-created.v1';

let envsOriginal = {
  MSK_BROKERS: '',
  MSK_SASL_USERNAME: '',
  MSK_SASL_PASSWORD: '',
  MSK_TOPIC_ACCOUNT_CREATED: '',
  MSK_TOPIC_CARD_EMITTED: '',
  MSK_TOPIC_DOCUMENT_CREATED: '',
  MSK_TOPIC_CONTRACT_RELEASED: '',
  MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_COMPLETED: '',
  MSK_TOPIC_NOTIFICATION_REQUEST: ''
};

jest.mock('@middy/core');
jest.mock('src/utils/logger.util.ts');
jest.mock('@aws-lambda-powertools/logger', () => {
  class ClassLogger {
    constructor(logLevel: any, logFormatter: any, environment: any) { }
    info(...input: any) {
      console.info(...input);
    }
    error(...input: any) {
      console.error(...input);
    }
    debug(...input: any) {
      console.debug(...input);
    }
    appendKeys(...input: any) { }
  }
  class LogFormatter { }
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
    constructor(serviceName: any) { }
    captureMethod = () => jest.fn();
  }
  return {
    captureLambdaHandler: () => {
      console.log('captureLambdaHandler...');
    },
    Tracer: ClassTracer,
  };
});


jest.mock('aws-sdk/clients/dynamodb', () => {
  return {
    DocumentClient: class {
      query = jest.fn().mockReturnThis();
      put = jest.fn().mockReturnThis();
      promise = jest.fn().mockResolvedValue(dynamoContractEventsRecords);
      update = jest.fn().mockReturnThis();
    }
  }
});

jest.mock('aws-sdk/clients/secretsmanager', () => {
  const mockSecretString = {
    field: 'secret-mock'
  }
  const promise = jest.fn().mockReturnValue({
    SecretString: JSON.stringify(mockSecretString)
  })
  class SecretsManager {
    getSecretValue = jest.fn().mockReturnValue({
      promise
    })
  }
  return SecretsManager
})

jest.mock('aws-xray-sdk', () => {
  return {
    captureAWSClient: (service: any) => service
  }
});

beforeAll(() => {
  const {
    MSK_BROKERS,
    MSK_SASL_USERNAME,
    MSK_SASL_PASSWORD,
    MSK_TOPIC_ACCOUNT_CREATED,
    MSK_TOPIC_CARD_EMITTED,
    MSK_TOPIC_DOCUMENT_CREATED,
    MSK_TOPIC_CONTRACT_RELEASED,
    MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_COMPLETED,
    MSK_TOPIC_NOTIFICATION_REQUEST,
  } = process.env;

  envsOriginal = {
    MSK_BROKERS: MSK_BROKERS!,
    MSK_SASL_USERNAME: MSK_SASL_USERNAME!,
    MSK_SASL_PASSWORD: MSK_SASL_PASSWORD!,
    MSK_TOPIC_ACCOUNT_CREATED: MSK_TOPIC_ACCOUNT_CREATED!,
    MSK_TOPIC_CARD_EMITTED: MSK_TOPIC_CARD_EMITTED!,
    MSK_TOPIC_DOCUMENT_CREATED: MSK_TOPIC_DOCUMENT_CREATED!,
    MSK_TOPIC_CONTRACT_RELEASED: MSK_TOPIC_CONTRACT_RELEASED!,
    MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_COMPLETED: MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_COMPLETED!,
    MSK_TOPIC_NOTIFICATION_REQUEST: MSK_TOPIC_NOTIFICATION_REQUEST!,
  };
  process.env.MSK_BROKERS = 'b-1,b-2';
  process.env.MSK_SASL_USERNAME = '';
  process.env.MSK_SASL_PASSWORD = '';
  process.env.MSK_TOPIC_ACCOUNT_CREATED = topicAccountCreated;
  process.env.MSK_TOPIC_CARD_EMITTED = topicCardEmitted;
  process.env.MSK_TOPIC_DOCUMENT_CREATED = topicDocumentCreated;
  process.env.MSK_TOPIC_CONTRACT_RELEASED = 'com.gcredicorp.matrix.contract.released.v1';
  process.env.MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_COMPLETED = 'topic-document-render';
  process.env.MSK_TOPIC_NOTIFICATION_REQUEST = 'topic-notification';

  jest.clearAllMocks();
});

afterAll(() => {
  process.env.MSK_BROKERS = envsOriginal.MSK_BROKERS;
  process.env.MSK_SASL_USERNAME = envsOriginal.MSK_SASL_USERNAME;
  process.env.MSK_SASL_PASSWORD = envsOriginal.MSK_SASL_PASSWORD;
  process.env.MSK_TOPIC_ACCOUNT_CREATED = envsOriginal.MSK_TOPIC_ACCOUNT_CREATED;
  process.env.MSK_TOPIC_CARD_EMITTED = envsOriginal.MSK_TOPIC_CARD_EMITTED;
  process.env.MSK_TOPIC_DOCUMENT_CREATED = envsOriginal.MSK_TOPIC_DOCUMENT_CREATED;
  process.env.MSK_TOPIC_CONTRACT_RELEASED = envsOriginal.MSK_TOPIC_CONTRACT_RELEASED;
  process.env.MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_COMPLETED = envsOriginal.MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_COMPLETED;
  process.env.MSK_TOPIC_NOTIFICATION_REQUEST = envsOriginal.MSK_TOPIC_NOTIFICATION_REQUEST;
});

describe('Test SendDocumentUseCase', () => {
  test('should to read message from topic contract-released', async () => {
    const mockDataFilter = mockMskRecordContentByTopic(process.env.MSK_TOPIC_CONTRACT_RELEASED!, false, true);
    const mockInputToEvent = mockMskEvent(process.env.MSK_TOPIC_CONTRACT_RELEASED!, 1, true);
    console.log({ mockInputToEvent__filtered: mockDataFilter });

    const spyFilterMessages = jest.spyOn(service, 'filterMessages');
    // const spyPrepareMessages = jest.spyOn(service, 'prepareMessages');
    // const spyProduceMessagesToTopic = jest.spyOn(service, 'produceMessagesToTopic');
    const responseHandler = await sendDocumentHandler(mockInputToEvent, myContextMocked);

    expect(responseHandler).toBe('OK');
    expect(spyFilterMessages).toBeCalled();
    // expect(spyPrepareMessages).toBeCalledWith(process.env.MSK_TOPIC_NOTIFICATION_REQUEST, [JSON.stringify(mockDataFilter)]);
    // expect(spyProduceMessagesToTopic).toBeCalled();
  });

  test('should to read message from topic document-created and throw error with event contract-released', async () => {
    const mockDataFilter = mockMskRecordContentByTopic(process.env.MSK_TOPIC_DOCUMENT_CREATED!, false, true);
    const mockInputToEvent = mockMskEvent(process.env.MSK_TOPIC_DOCUMENT_CREATED!, 1, true);
    console.log({ mockInputToEvent__filtered: mockDataFilter });

    const spyFilterMessages = jest.spyOn(service, 'filterMessages');
    const spyExistContract = jest.spyOn(utils, 'existsContractEvent')
    spyExistContract.mockReturnValue(Promise.resolve(false));

    await expect(sendDocumentHandler(mockInputToEvent, myContextMocked)).rejects.toThrow();
    expect(spyFilterMessages).toBeCalled();
  });

  test('should to read message from topic document-created and exist event with contract-released', async () => {
    const mockInputToEvent = mockMskEvent(process.env.MSK_TOPIC_DOCUMENT_CREATED!, 1, true);

    const spyFilterMessages = jest.spyOn(service, 'filterMessages');
    const spyExistContract = jest.spyOn(utils, 'existsContractEvent')
    spyExistContract.mockReturnValue(Promise.resolve([contractReleasedAfterDocumentCreatedEvent] as any));

    // const spyPrepareMessages = jest.spyOn(service, 'prepareMessages');
    // const spyProduceMessagesToTopic = jest.spyOn(service, 'produceMessagesToTopic');
    const responseHandler = await sendDocumentHandler(mockInputToEvent, myContextMocked);

    expect(spyFilterMessages).toBeCalled();
    expect(responseHandler).toBe('OK');
    // expect(spyProduceMessagesToTopic).toBeCalled();
    // expect(spyPrepareMessages).toBeCalledWith(process.env.MSK_TOPIC_NOTIFICATION_REQUEST, [JSON.stringify(contractReleasedAfterDocumentCreatedEvent)]);
  });

  test('should to throw error if event contract-released doesn\'t have snaphot.document', async () => {
    const mockDataFilter = mockMskRecordContentByTopic(process.env.MSK_TOPIC_CONTRACT_RELEASED!, false);
    const mockInputToEvent = mockMskEvent(process.env.MSK_TOPIC_CONTRACT_RELEASED!, 1, false);
    console.log({ mockInputToEvent__filtered: mockDataFilter });

    await expect(sendDocumentHandler(mockInputToEvent, myContextMocked)).rejects.toThrow();
  });

  test('should to throw Error with EventData corrupted', async () => {
    const mockEventValidated: any = '';
    await expect(sendDocumentHandler(mockEventValidated, myContextMocked)).rejects.toThrow();
  });

  test('should to print Error list when receive message with topic not support', async () => {
    const mockInputToEventTopicNotSupport = mockMskEvent('topic-not-support', 1, false);
    const mockInputToEvent = mockMskEvent(process.env.MSK_TOPIC_CONTRACT_RELEASED!, 1, true);

    const mockInput = {
      ...mockInputToEventTopicNotSupport,
      records: {
        ...mockInputToEventTopicNotSupport.records,
        ...mockInputToEvent.records
      }
    }
    const spyLoggerError = jest.spyOn(Logger.logger, 'error')
    await sendDocumentHandler(mockInput, myContextMocked)
    expect(spyLoggerError).toBeCalled();
  });
});
