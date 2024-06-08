import service from '../../src/services/create-customer-requested/create-customer-requested.service';
import { handler as createCustomerRequestedHandler } from '../../src/functions/create-customer-requested/handler';
import { mockCustomerEvent, mockMskEvent, mockMskRecordContentByTopic } from './mskEvent.mock';
import DynamoAdapter from 'src/adapters/dynamodb.adapter';
import { KafkaAdapter } from 'src/adapters/kafka';
import secretsmanagerAdapter from 'src/adapters/secretsmanager.adapter';

const topicOfferAuthorized = 'com.gcredicorp.matrix.contract.offer-authorized.v1';
const topicCustomerCreationRequested = 'com.gcredicorp.matrix.customer.creation-requested.v1';

let envsOriginal = {
  MSK_BROKERS: '',
  MSK_SASL_USERNAME: '',
  MSK_SASL_PASSWORD: '',
  MSK_TOPIC_OFFER_AUTHORIZED: '',
  MSK_TOPIC_CUSTOMER_REQUESTED: '',
  SECRETS_MANAGER_MSK_NAME: '',
  AWS_REGION: '',
};

jest.mock('@middy/core');

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
});

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
});

jest.useFakeTimers().setSystemTime(new Date(1662305682026));

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
    MSK_TOPIC_OFFER_AUTHORIZED,
    MSK_TOPIC_CUSTOMER_REQUESTED,
    SECRETS_MANAGER_MSK_NAME,
    AWS_REGION,
  } = process.env;

  envsOriginal = {
    MSK_BROKERS: MSK_BROKERS!,
    MSK_SASL_USERNAME: MSK_SASL_USERNAME!,
    MSK_SASL_PASSWORD: MSK_SASL_PASSWORD!,
    MSK_TOPIC_OFFER_AUTHORIZED: MSK_TOPIC_OFFER_AUTHORIZED!,
    MSK_TOPIC_CUSTOMER_REQUESTED: MSK_TOPIC_CUSTOMER_REQUESTED!,
    SECRETS_MANAGER_MSK_NAME: SECRETS_MANAGER_MSK_NAME!,
    AWS_REGION: AWS_REGION!,
  };
  process.env.MSK_BROKERS = 'b-1,b-2';
  process.env.MSK_SASL_USERNAME = '';
  process.env.MSK_SASL_PASSWORD = '';
  process.env.MSK_TOPIC_OFFER_AUTHORIZED = topicOfferAuthorized;
  process.env.MSK_TOPIC_CUSTOMER_REQUESTED = topicCustomerCreationRequested;
  process.env.SECRETS_MANAGER_MSK_NAME = 'secretId'
  process.env.AWS_REGION = 'us-east-1'
});

afterAll(() => {
  process.env.MSK_BROKERS = envsOriginal.MSK_BROKERS;
  process.env.MSK_SASL_USERNAME = envsOriginal.MSK_SASL_USERNAME;
  process.env.MSK_SASL_PASSWORD = envsOriginal.MSK_SASL_PASSWORD;
  process.env.MSK_TOPIC_OFFER_AUTHORIZED = envsOriginal.MSK_TOPIC_OFFER_AUTHORIZED;
  process.env.MSK_TOPIC_CUSTOMER_REQUESTED = envsOriginal.MSK_TOPIC_CUSTOMER_REQUESTED;
  process.env.SECRETS_MANAGER_MSK_NAME = envsOriginal.SECRETS_MANAGER_MSK_NAME;
  process.env.AWS_REGION = envsOriginal.AWS_REGION;
});

describe('Test CreateCustomerRequestedUseCase', () => {
  test('should to read and publish message from topic', async () => {
    const mockOfferAuthorized = mockMskEvent(topicOfferAuthorized);
    const filterMessagesSpy = jest.spyOn(service, 'filterMessages');
    const prepareMessagesSpy = jest.spyOn(service, 'prepareMessages');
    const produceMessagesToTopicSpy = jest.spyOn(service, 'produceMessagesToTopic');
    const spySecretManager = jest.spyOn(secretsmanagerAdapter, 'getSecretValue');
    const spyDynamoQuery = jest.spyOn(DynamoAdapter, 'query');
    const spyKafka = jest.spyOn(KafkaAdapter.prototype, 'sendMessages');

    spyKafka.mockReturnThis();
    spySecretManager.mockResolvedValue({
      SecretString: JSON.stringify({
        field: 'secret-mock'
      })
    } as any);
    spyDynamoQuery.mockResolvedValue({
      Items: [mockCustomerEvent],
      Count: 0
    } as any)

    const responseHandler = await createCustomerRequestedHandler(mockOfferAuthorized, '' as any);
    expect(responseHandler).toBe('OK');
    expect(filterMessagesSpy).toBeCalled();
    expect(prepareMessagesSpy).toBeCalled();
    expect(produceMessagesToTopicSpy).toBeCalled();
  });

  test('should to throw Error with EventData corrupted', async () => {
    const mockInputEvent = '';
    await expect(createCustomerRequestedHandler(mockInputEvent, '' as any)).rejects.toThrow();
  });

  test('should filterMessages', async () => {
    const mockEventOfferAuthorized = mockMskRecordContentByTopic(topicOfferAuthorized, false);
    const spyDynamoQuery = jest.spyOn(DynamoAdapter, 'query');

    spyDynamoQuery.mockResolvedValue({
      Items: [],
      Count: 0
    } as any)

    const filteredMessages = await service.filterMessages([JSON.stringify(mockEventOfferAuthorized)]);

    console.log({mockEventOfferAuthorized, filteredMessages})
    expect(filteredMessages[0]).toEqual(JSON.stringify(mockEventOfferAuthorized));
  });

  test('should prepareMessages', async () => {
    const mockEventOfferAuthorized = mockMskRecordContentByTopic(topicOfferAuthorized, false);
    const filteredMessages = [JSON.stringify(mockEventOfferAuthorized)];
    const mockSource = mockEventOfferAuthorized.source;
    const mockId = mockEventOfferAuthorized.id;
    const preparedMessages = await service.prepareMessages(topicCustomerCreationRequested, filteredMessages);
    const preparedMessage = preparedMessages[0];
    const parsePreparedMessage = JSON.parse(preparedMessage.value);
    expect(preparedMessage.key).toBe(`${mockSource}/${mockId}`);
    expect(parsePreparedMessage.data.payload.cognitoUserName).toBe(mockEventOfferAuthorized.data.payload.cognitoUserName);
    expect(parsePreparedMessage.data.snapshot).toStrictEqual({});
    expect(parsePreparedMessage.time).toBe(Date.now());
    expect(parsePreparedMessage.transaction).toBe(mockEventOfferAuthorized.transaction);
    expect(parsePreparedMessage.type).toBe(topicCustomerCreationRequested);
  });
});
