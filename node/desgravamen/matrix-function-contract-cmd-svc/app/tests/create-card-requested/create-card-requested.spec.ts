import service from '../../src/services/create-card-requested/service';
import * as useCase from 'src/functions/create-card-requested/handler';
import { handler as createCardRequestedHandler } from '../../src/functions/create-card-requested/handler';
import { mockEventCustomerValidated, mockMskEvent, mockMskRecordContentByTopic } from './mskEvent.mock';
import DynamoDBAdapter from 'src/adapters/dynamodb.adapter';
import { myContextMocked } from 'tests/__mocks__/context-mock/context.mock';
import * as utils from 'src/utils/utils';
import { KafkaAdapter } from 'src/adapters/kafka';

let envsOriginal = {
  MSK_TOPIC_CUSTOMER_VALIDATED: '',
  SECRETS_MANAGER_MSK_NAME: '',
  CONTRACT_EVENT_STORE_TABLE_NAME: '',
  MSK_TOPIC_CARD_REQUESTED: ''
};

jest.mock('@middy/core');
// jest.mock('tsyringe');

class Producer {
  private sendCb;

  constructor({ sendCb }: { sendCb: any }) {
    this.sendCb = sendCb;
  }
  async connect() {
    return Promise.resolve();
  }
  async send({ topic, messages }: { topic: string, messages: any }) {
    this.sendCb({ topic, messages });
  }
  async disconnect() {
    return Promise.resolve();
  }
}

class Consumer {
  async connect() {
    return Promise.resolve();
  }
  async disconnect() {
    return Promise.resolve();
  }
  async subscribe() {
    return Promise.resolve();
  }
  async run() {
    return Promise.resolve();
  }
  async push() {
    return Promise.resolve();
  }
}

jest.mock('kafkajs', () => {
  return {
    Kafka: class Kafka {
      constructor(config: any) { }
      _sendCb({ topic, messages }: { topic: string, messages: any; }) { }
      producer() {
        return new Producer({
          sendCb: this._sendCb.bind(this),
        });
      }
      consumer() {
        return new Consumer();
      }
    }
  }
})

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
})

beforeAll(() => {
  const {
    MSK_TOPIC_CUSTOMER_VALIDATED,
    SECRETS_MANAGER_MSK_NAME,
    CONTRACT_EVENT_STORE_TABLE_NAME,
    MSK_TOPIC_CARD_REQUESTED,
  } = process.env;

  envsOriginal = {
    MSK_TOPIC_CUSTOMER_VALIDATED: MSK_TOPIC_CUSTOMER_VALIDATED!,
    SECRETS_MANAGER_MSK_NAME: SECRETS_MANAGER_MSK_NAME!,
    CONTRACT_EVENT_STORE_TABLE_NAME: CONTRACT_EVENT_STORE_TABLE_NAME!,
    MSK_TOPIC_CARD_REQUESTED: MSK_TOPIC_CARD_REQUESTED!
  };

  process.env.MSK_TOPIC_CUSTOMER_VALIDATED = 'com.gcredicorp.matrix.contract.customer-validated.v1';
  process.env.SECRETS_MANAGER_MSK_NAME = 'secret';
  process.env.CONTRACT_EVENT_STORE_TABLE_NAME = 'tbl-contract';
  process.env.MSK_TOPIC_CARD_REQUESTED = 't-cr'
})

afterAll(() => {
  process.env.MSK_TOPIC_CUSTOMER_VALIDATED = envsOriginal.MSK_TOPIC_CUSTOMER_VALIDATED;
  process.env.SECRETS_MANAGER_MSK_NAME = envsOriginal.SECRETS_MANAGER_MSK_NAME;
  process.env.CONTRACT_EVENT_STORE_TABLE_NAME = envsOriginal.CONTRACT_EVENT_STORE_TABLE_NAME;
  process.env.MSK_TOPIC_CARD_REQUESTED = envsOriginal.MSK_TOPIC_CARD_REQUESTED;
})

describe('Test createCardRequested UseCase', () => {

  test('checkIfContractExists', async () => {
    const spyDynamoQuery = jest.spyOn(DynamoDBAdapter, 'query');
    spyDynamoQuery.mockResolvedValue({
      Count: 1,
      Items: {}
    } as any)

    const result = await service.checkIfContractExists('');
    
    expect(result).toBe(true);
  })

  test('Dont should to return contract event getLastContractRecordByTransactionId if doesnt exist', async () => {
    const spyDynamoQuery = jest.spyOn(DynamoDBAdapter, 'query');

    spyDynamoQuery.mockResolvedValue({
      Items: [],
      Count: 0,
    } as any);

    const result = await service.getLastContractRecordByTransactionId(mockEventCustomerValidated.transaction);
    expect(result).toEqual(undefined);
  })

  test('Should to run use case', async () => {
    const mockInputToEvent = mockMskEvent();
    const spyExistsContractEvent = jest.spyOn(utils, 'existsContractEvent');
    const spyGetLastContractRecordByTransactionId = jest.spyOn(service, 'getLastContractRecordByTransactionId');
    const spyDynamoPut = jest.spyOn(DynamoDBAdapter, 'put');
    console.log({ mockInputToEvent });

    spyExistsContractEvent.mockResolvedValue(false);
    spyGetLastContractRecordByTransactionId.mockResolvedValue(mockEventCustomerValidated);
    spyDynamoPut.mockReturnThis();
    const result = await useCase.handler(mockInputToEvent, myContextMocked);
    expect(result).toBe('OK')
  })

  test('prepareMessage', async () => {
    const mockDateNow = 1682452966729;
    const mockTopic = 'topic.test';
    const spyDate = jest.spyOn(Date, 'now');
    spyDate.mockReturnValue(mockDateNow);

    const result = await service.prepareMessage(mockTopic, mockEventCustomerValidated);
    const keysMessage = Object.keys(mockEventCustomerValidated);
    expect(result.time).toBe(mockDateNow);
    expect(result.type).toBe(mockTopic);
  })

  test('Should to return last contract event getLastContractRecordByTransactionId', async () => {
    const spyDynamoQuery = jest.spyOn(DynamoDBAdapter, 'query');

    spyDynamoQuery.mockResolvedValue({
      Items: [mockEventCustomerValidated],
      Count: 1,
    } as any);

    const result = await service.getLastContractRecordByTransactionId(mockEventCustomerValidated.transaction);
    expect(result).toEqual(mockEventCustomerValidated);
  })

  test('should saveEvent', async () => {
    const mockEventCustomerValidated = mockMskRecordContentByTopic(false);
    const getLastContractRecordByTransactionIdSpy = jest.spyOn(service, 'getLastContractRecordByTransactionId');
    const spyDynamoPut = jest.spyOn(DynamoDBAdapter, 'put')
    getLastContractRecordByTransactionIdSpy.mockReturnValue(Promise.resolve(mockEventCustomerValidated));

    spyDynamoPut.mockReturnThis();
    await service.saveContractEventStore([mockEventCustomerValidated]);
    expect(getLastContractRecordByTransactionIdSpy).toBeCalled();
    expect(getLastContractRecordByTransactionIdSpy).toBeCalledWith(mockEventCustomerValidated.transaction)
  });

  test('should to read and publish message from topic', async () => {
    const mockInputToEvent = mockMskEvent();
    const saveEventSpy = jest.spyOn(service, 'saveContractEventStore');
    saveEventSpy.mockReturnValue(Promise.resolve());

    const responseHandler = await createCardRequestedHandler(mockInputToEvent, '' as any);
    expect(responseHandler).toBe('OK');
    expect(saveEventSpy).toBeCalled();
  });

  test('should to throw Error with EventData corrupted', async () => {
    const mockEventValidated: any = '';
    await expect(createCardRequestedHandler(mockEventValidated, '' as any)).rejects.toThrow();
  });


});
