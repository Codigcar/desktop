import service from '../../src/services/customer-created/service';
import { handler as customerCreatedHandler } from '../../src/functions/customer-created/handler';
import { mockMskEvent, mockMskRecordContentByTopic } from './mskEvent.mock';
import { generatedContractEventStoreData } from './customer-created.mock';
import DynamoDBAdapter from 'src/adapters/dynamodb.adapter';
const topicCustomerCreated = 'com.gcredicorp.matrix.customer.created.v1';
const topicCustomerValidated = 'com.gcredicorp.matrix.contract.customer-validated.v1';

let envsOriginal = {
  KAFKA_BOOTSTRAP_SERVERS: '',
  MSK_SASL_USERNAME: '',
  MSK_SASL_PASSWORD: '',
  MSK_TOPIC_CUSTOMER_CREATED: '',
  MSK_TOPIC_CUSTOMER_VALIDATED: '',
};

jest.mock('@middy/core');

jest.mock('@aws-lambda-powertools/logger', () => {
  class ClassLogger {
    constructor(logLevel: any, logFormatter: any, environment: any) { }
    info(...input: any) { console.info(...input) }
    error(...input: any) { console.error(...input) }
    debug(...input: any) { console.debug(...input) }
  }
  class LogFormatter { }
  return {
    injectLambdaContext: () => {
      console.log('injectLambdaContext...');
    },
    LogFormatter,
    Logger: ClassLogger,
  };
})
jest.mock('@aws-lambda-powertools/tracer', () => {
  class ClassTracer {
    constructor(serviceName: any) { }
    captureMethod = () => jest.fn()
  }
  return {
    captureLambdaHandler: () => {
      console.log('captureLambdaHandler...');

    },
    Tracer: ClassTracer
  };
})

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
    MSK_TOPIC_CUSTOMER_CREATED,
    MSK_TOPIC_CUSTOMER_VALIDATED
  } = process.env;

  envsOriginal = {
    KAFKA_BOOTSTRAP_SERVERS: KAFKA_BOOTSTRAP_SERVERS!,
    MSK_SASL_USERNAME: MSK_SASL_USERNAME!,
    MSK_SASL_PASSWORD: MSK_SASL_PASSWORD!,
    MSK_TOPIC_CUSTOMER_CREATED: MSK_TOPIC_CUSTOMER_CREATED!,
    MSK_TOPIC_CUSTOMER_VALIDATED: MSK_TOPIC_CUSTOMER_VALIDATED!
  };
  process.env.KAFKA_BOOTSTRAP_SERVERS = 'b-1,b-2';
  process.env.MSK_SASL_USERNAME = '';
  process.env.MSK_SASL_PASSWORD = '';
  process.env.MSK_TOPIC_CUSTOMER_CREATED = topicCustomerCreated;
  process.env.MSK_TOPIC_CUSTOMER_VALIDATED = topicCustomerValidated;
});

afterAll(() => {
  process.env.KAFKA_BOOTSTRAP_SERVERS = envsOriginal.KAFKA_BOOTSTRAP_SERVERS;
  process.env.MSK_SASL_USERNAME = envsOriginal.MSK_SASL_USERNAME;
  process.env.MSK_SASL_PASSWORD = envsOriginal.MSK_SASL_PASSWORD;
  process.env.MSK_TOPIC_CUSTOMER_CREATED = envsOriginal.MSK_TOPIC_CUSTOMER_CREATED;
  process.env.MSK_TOPIC_CUSTOMER_VALIDATED = envsOriginal.MSK_TOPIC_CUSTOMER_VALIDATED;
});

describe('Test CustomerCreatedUseCase', () => {
  test('should saveContractEventStore', async () => {
    const mockCustomerCreated = mockMskRecordContentByTopic(topicCustomerCreated, false);
    const getLastContractRecordByTransactionIdSpy = jest.spyOn(service, 'getLastContractRecordByTransactionId');
    const spyDynamoPut = jest.spyOn(DynamoDBAdapter, 'put');

    getLastContractRecordByTransactionIdSpy.mockReturnValue(Promise.resolve(generatedContractEventStoreData));
    spyDynamoPut.mockReturnThis();
    await service.saveContractEventStore([mockCustomerCreated]);
    expect(getLastContractRecordByTransactionIdSpy).toBeCalled();
    expect(getLastContractRecordByTransactionIdSpy).toBeCalledWith(mockCustomerCreated.transaction);
  });
  
  test('should to read and publish message from topic', async () => {
    const mockInputToEvent = mockMskEvent(topicCustomerCreated);
    const saveEventSpy = jest.spyOn(service, 'saveContractEventStore');
    saveEventSpy.mockReturnValue(Promise.resolve());

    const responseHandler = await customerCreatedHandler(mockInputToEvent, '' as any);
    expect(responseHandler).toBe('OK');
    expect(saveEventSpy).toBeCalled();
  });

  test('should to throw Error with EventData corrupted', async () => {
    const mockEventValidated: any = '';
    await expect(customerCreatedHandler(mockEventValidated, '' as any)).rejects.toThrow();
  });
});
