import service from 'src/services/rollback/rollback.service';
import { handler as rollbackHandler } from '../../src/functions/rollback/handler';
import { mockMskEvent } from './mskEvent.mock';
import { dynamoContractEventsRecords } from './rollback.mock';
import { TOPICS_ROLLBACK } from 'src/utils/constants';
import { myContextMocked } from 'tests/__mocks__/context-mock/context.mock';

const topicDocumentRenderFailed = TOPICS_ROLLBACK.DOCUMENT_TEMPLATE_RENDER_FAILED;
const topicCardCreatedFailed = TOPICS_ROLLBACK.CARD_REGISTER_FAILED;
const topicCustomerCreatedFailed = TOPICS_ROLLBACK.CUSTOMER_CREATION_FAILED;

let envsOriginal = {
  KAFKA_BOOTSTRAP_SERVERS: '',
  MSK_SASL_USERNAME: '',
  MSK_SASL_PASSWORD: '',
  MSK_TOPIC_CARD_REGISTER_FAILED: '',
  MSK_TOPIC_CUSTOMER_CREATION_FAILED: '',
  MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_FAILED: '',
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
      promise = jest.fn().mockResolvedValue(dynamoContractEventsRecords)
    }
  }
});

jest.mock('aws-xray-sdk', () => {
  return {
    captureAWSClient: (service: any) => service
  }
});

beforeAll(() => {
  const {
    KAFKA_BOOTSTRAP_SERVERS,
    MSK_SASL_USERNAME,
    MSK_SASL_PASSWORD,
    MSK_TOPIC_CARD_REGISTER_FAILED,
    MSK_TOPIC_CUSTOMER_CREATION_FAILED,
    MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_FAILED,
  } = process.env;

  envsOriginal = {
    KAFKA_BOOTSTRAP_SERVERS: KAFKA_BOOTSTRAP_SERVERS!,
    MSK_SASL_USERNAME: MSK_SASL_USERNAME!,
    MSK_SASL_PASSWORD: MSK_SASL_PASSWORD!,
    MSK_TOPIC_CARD_REGISTER_FAILED: MSK_TOPIC_CARD_REGISTER_FAILED!,
    MSK_TOPIC_CUSTOMER_CREATION_FAILED: MSK_TOPIC_CUSTOMER_CREATION_FAILED!,
    MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_FAILED: MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_FAILED!,
  };
  process.env.KAFKA_BOOTSTRAP_SERVERS = 'b-1,b-2';
  process.env.MSK_SASL_USERNAME = '';
  process.env.MSK_SASL_PASSWORD = '';
  process.env.MSK_TOPIC_CARD_REGISTER_FAILED = topicCardCreatedFailed;
  process.env.MSK_TOPIC_CUSTOMER_CREATION_FAILED = topicCustomerCreatedFailed;
  process.env.MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_FAILED = topicDocumentRenderFailed;
});

beforeEach(() => {
  jest.clearAllMocks();
})

afterAll(() => {
  process.env.KAFKA_BOOTSTRAP_SERVERS = envsOriginal.KAFKA_BOOTSTRAP_SERVERS;
  process.env.MSK_SASL_USERNAME = envsOriginal.MSK_SASL_USERNAME;
  process.env.MSK_SASL_PASSWORD = envsOriginal.MSK_SASL_PASSWORD;
  process.env.MSK_TOPIC_CARD_REGISTER_FAILED = envsOriginal.MSK_TOPIC_CARD_REGISTER_FAILED;
  process.env.MSK_TOPIC_CUSTOMER_CREATION_FAILED = envsOriginal.MSK_TOPIC_CUSTOMER_CREATION_FAILED;
  process.env.MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_FAILED = envsOriginal.MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_FAILED;
});

describe('Test OfferAcquisitionCompletedUseCase', () => {
  test('should to read message from topic Document-Failed', async () => {
    const mockInputToEvent = mockMskEvent(topicDocumentRenderFailed);
    const responseHandler = await rollbackHandler(mockInputToEvent, myContextMocked);
    expect(responseHandler).toBe('OK');
  });

  test('should to read message from topic rollbackCardRegisterFailed', async () => {
    const mockInputToEvent = mockMskEvent(topicCardCreatedFailed);
    const rollbackCardRegisterFailedSpy = jest.spyOn(service, 'rollbackCardRegisterFailed');
    const deleteCustomerSpy = jest.spyOn(service, 'deleteCustomer');
    const rollbackCustomerCreationFailedSpy = jest.spyOn(service, 'rollbackCustomerCreationFailed');

    const responseHandler = await rollbackHandler(mockInputToEvent, myContextMocked);
    expect(responseHandler).toBe('OK');
    expect(rollbackCardRegisterFailedSpy).toBeCalled();
    expect(rollbackCustomerCreationFailedSpy).not.toBeCalled();
    expect(deleteCustomerSpy).toBeCalledTimes(1);
  });

  test('should to read message from topic CustomerCreationFailed', async () => {
    const mockInputToEvent = mockMskEvent(topicCustomerCreatedFailed);
    const rollbackCardRegisterFailedSpy = jest.spyOn(service, 'rollbackCardRegisterFailed');
    const rollbackCustomerCreationFailedSpy = jest.spyOn(service, 'rollbackCustomerCreationFailed');
    const deleteCustomerSpy = jest.spyOn(service, 'deleteCustomer');

    rollbackCustomerCreationFailedSpy.mockReturnValue(Promise.resolve());

    const responseHandler = await rollbackHandler(mockInputToEvent, myContextMocked);
    expect(responseHandler).toBe('OK');
    expect(rollbackCardRegisterFailedSpy).not.toBeCalled();
    expect(rollbackCustomerCreationFailedSpy).toBeCalled();
    expect(deleteCustomerSpy).not.toBeCalled();
  });

  test('when to received message with topic not supported should to return a error', async () => {
    const mockInputToEvent = mockMskEvent('Test-topic-notSupported');
    const rollbackCardRegisterFailedSpy = jest.spyOn(service, 'rollbackCardRegisterFailed');
    const rollbackCustomerCreationFailedSpy = jest.spyOn(service, 'rollbackCustomerCreationFailed');

    rollbackCustomerCreationFailedSpy.mockReturnValue(Promise.resolve());

    const responseHandler = await rollbackHandler(mockInputToEvent, myContextMocked);
    expect(responseHandler).toEqual([{ "errorCode": "INVALID_EVENT_TYPE", "errorMessage": "The event type is invalid.", "key": "1" }])
  });

  test('should to throw Error with EventData corrupted', async () => {
    const mockEventValidated: any = '';
    await expect(rollbackHandler(mockEventValidated, myContextMocked)).rejects.toThrow();
  });
});
