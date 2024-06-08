import service from '../../src/services/account-created/account-created.service';
import { handler } from '../../src/functions/account-created/handler';
import { lastEventMocked, mockMskEvent, mockMskRecordContentByTopic } from './account-created.mock';
import { myContextMocked } from '../__mocks__/context-mock/context.mock';

import * as utils from '../../src/utils/utils';

const topicAccountCreated = 'com.gcredicorp.matrix.account.created.v1';

let envsOriginal = {
  KAFKA_BOOTSTRAP_SERVERS: '',
  MSK_SASL_MECHANISM: '',
  MSK_SASL_USERNAME: '',
  MSK_SASL_PASSWORD: '',
  MSK_TOPIC_ACCOUNT_CREATED: '',
  CONTRACT_EVENT_STORE_TABLE_NAME: 'table-contract',
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
    MSK_SASL_MECHANISM,
    MSK_SASL_USERNAME,
    MSK_SASL_PASSWORD,
    MSK_TOPIC_ACCOUNT_CREATED,
    CONTRACT_EVENT_STORE_TABLE_NAME,
  } = process.env;

  envsOriginal = {
    KAFKA_BOOTSTRAP_SERVERS: KAFKA_BOOTSTRAP_SERVERS!,
    MSK_SASL_MECHANISM: MSK_SASL_MECHANISM!,
    MSK_SASL_USERNAME: MSK_SASL_USERNAME!,
    MSK_SASL_PASSWORD: MSK_SASL_PASSWORD!,
    MSK_TOPIC_ACCOUNT_CREATED: MSK_TOPIC_ACCOUNT_CREATED!,
    CONTRACT_EVENT_STORE_TABLE_NAME: CONTRACT_EVENT_STORE_TABLE_NAME!,
  };
  process.env.KAFKA_BOOTSTRAP_SERVERS = 'b-1,b-2';
  process.env.MSK_SASL_MECHANISM = '';
  process.env.MSK_SASL_USERNAME = '';
  process.env.MSK_SASL_PASSWORD = '';
  process.env.MSK_TOPIC_ACCOUNT_CREATED = topicAccountCreated;
  process.env.CONTRACT_EVENT_STORE_TABLE_NAME = 'table-contract';

  jest.clearAllMocks();
});

afterAll(() => {
  process.env.KAFKA_BOOTSTRAP_SERVERS = envsOriginal.KAFKA_BOOTSTRAP_SERVERS;
  process.env.MSK_SASL_MECHANISM = envsOriginal.MSK_SASL_MECHANISM;
  process.env.MSK_SASL_USERNAME = envsOriginal.MSK_SASL_USERNAME;
  process.env.MSK_SASL_PASSWORD = envsOriginal.MSK_SASL_PASSWORD;
  process.env.MSK_TOPIC_ACCOUNT_CREATED = envsOriginal.MSK_TOPIC_ACCOUNT_CREATED;
});

describe('Test cardAccountCreatedUseCase', () => {
  test('should saveEvent', async () => {
    const mockEvenAccountCreatedCompleted = mockMskRecordContentByTopic(topicAccountCreated, false);
    console.log(mockEvenAccountCreatedCompleted);

    const getLastContractEventSpy = jest.spyOn(service, 'getContractLastEvent');
    getLastContractEventSpy.mockReturnValue(Promise.resolve(lastEventMocked));

    const spyExistContract = jest.spyOn(utils, 'existsContractEvent');
    spyExistContract.mockReturnValue(Promise.resolve(false));

    const saveEventSpy = jest.spyOn(service, 'saveContractEventStore');
    saveEventSpy.mockReturnValue(Promise.resolve());

    await service.saveEvent([mockEvenAccountCreatedCompleted]);
    expect(getLastContractEventSpy).toBeCalled();
    expect(spyExistContract).toBeCalled();
    expect(saveEventSpy).toBeCalled();
  });

  test('should to read and publish message from topic', async () => {
    const mockEvenAccountCreatedCompleted = mockMskEvent(topicAccountCreated);
    console.log(JSON.stringify(mockEvenAccountCreatedCompleted));
    const saveContractEventStoreSpy = jest.spyOn(service, 'saveEvent');
    saveContractEventStoreSpy.mockReturnValue(Promise.resolve());
    const accountCreatedHandlerResult = await handler(mockEvenAccountCreatedCompleted, myContextMocked);

    expect(saveContractEventStoreSpy).toBeCalled();
    expect(accountCreatedHandlerResult).toBe('OK');
  });

  test('should to throw Error with EventData corrupted', async () => {
    const mockEventValidated = '';
    await expect(handler(mockEventValidated, myContextMocked)).rejects.toThrow();
  });
});
