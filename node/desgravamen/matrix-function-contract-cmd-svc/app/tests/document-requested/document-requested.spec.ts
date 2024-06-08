import service from '../../src/services/document-requested/service';
import { handler as documentGenerationRequestedHandler } from '../../src/functions/document-requested/handler';
import secretsmanagerAdapter from 'src/adapters/secretsmanager.adapter';
import { mockMskEvent, mockMskRecordContentByTopic } from './mskEvent.mock';
import { dynamoEventContractAuthorized, dynamoOfferQuery } from './document-requested.mock';

const topicOfferAuthorized = 'com.gcredicorp.matrix.contract.offer-authorized';
const topicDocumentTemplateRenderRequested = 'com.gcredicorp.matrix.document-template.render-requested.v1';

let envsOriginal = {
  MSK_BROKERS: '',
  MSK_SASL_USERNAME: '',
  MSK_SASL_PASSWORD: '',
  MSK_TOPIC_OFFER_AUTHORIZED: '',
  MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_REQUESTED: '',
  BUCKET_DOCUMENTSRV: ''
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

jest.mock('aws-sdk/clients/dynamodb', () => {
  return {
    DocumentClient: class {
      query = jest.fn().mockReturnThis();
      put = jest.fn().mockReturnThis();
      promise = jest.fn().mockResolvedValue(dynamoEventContractAuthorized)
    }
  }
})

jest.mock('aws-xray-sdk', () => {
  return {
    captureAWSClient: (service: any) => service
  }
})

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

beforeAll(() => {
  const {
    MSK_BROKERS,
    MSK_SASL_USERNAME,
    MSK_SASL_PASSWORD,
    MSK_TOPIC_OFFER_AUTHORIZED,
    MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_REQUESTED,
    BUCKET_DOCUMENTSRV,
  } = process.env;

  envsOriginal = {
    MSK_BROKERS: MSK_BROKERS!,
    MSK_SASL_USERNAME: MSK_SASL_USERNAME!,
    MSK_SASL_PASSWORD: MSK_SASL_PASSWORD!,
    MSK_TOPIC_OFFER_AUTHORIZED: MSK_TOPIC_OFFER_AUTHORIZED!,
    MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_REQUESTED: MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_REQUESTED!,
    BUCKET_DOCUMENTSRV: BUCKET_DOCUMENTSRV!,
  };
  process.env.MSK_BROKERS = 'b-1,b-2';
  process.env.MSK_SASL_USERNAME = '';
  process.env.MSK_SASL_PASSWORD = '';
  process.env.MSK_TOPIC_OFFER_AUTHORIZED = topicOfferAuthorized;
  process.env.MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_REQUESTED = 'com.gcredicorp.matrix.document-template.render-requested.v1';
  process.env.BUCKET_DOCUMENTSRV = 'bucket_template';
})

afterAll(() => {
  process.env.MSK_BROKERS = envsOriginal.MSK_BROKERS;
  process.env.MSK_SASL_USERNAME = envsOriginal.MSK_SASL_USERNAME;
  process.env.MSK_SASL_PASSWORD = envsOriginal.MSK_SASL_PASSWORD;
  process.env.MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_REQUESTED = envsOriginal.MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_REQUESTED;
  process.env.BUCKET_DOCUMENTSRV = envsOriginal.BUCKET_DOCUMENTSRV;
})

describe('Test DocumentGenerationRequestedUseCase', () => {
  test('should to read and publish message from topic', async () => {
    const mockOfferAuthorized = mockMskEvent(topicOfferAuthorized);
    const prepareMessagesSpy = jest.spyOn(service, 'prepareMessages');
    const produceMessagesToTopicSpy = jest.spyOn(service, 'produceMessagesToTopic');
    const spyFindProductOffer = jest.spyOn(service, 'findProductOffer');
    const spySecretManager = jest.spyOn(secretsmanagerAdapter, 'getSecretValue');

    spySecretManager.mockResolvedValue({
      SecretString: JSON.stringify({
        field: 'secret-mock'
      })
    } as any);

    spyFindProductOffer.mockResolvedValue(dynamoOfferQuery)
    const responseHandler = await documentGenerationRequestedHandler(mockOfferAuthorized, '' as any);
    expect(responseHandler).toBe('OK');
    expect(prepareMessagesSpy).toBeCalled();
    expect(produceMessagesToTopicSpy).toBeCalled();
  });

  test('should to throw Error with EventData corrupted', async () => {
    const mockInputEvent = '';
    await expect(documentGenerationRequestedHandler(mockInputEvent, '' as any)).rejects.toThrow();
  });

  test('should prepareMessages', async () => {
    const mockEventOfferAuthorized = mockMskRecordContentByTopic(topicOfferAuthorized, false);
    const filteredMessages = [JSON.stringify(mockEventOfferAuthorized)];
    const mockSource = mockEventOfferAuthorized.source;
    const mockId = mockEventOfferAuthorized.id;

    const spyFindProductOffer = jest.spyOn(service, 'findProductOffer');
    spyFindProductOffer.mockResolvedValue(dynamoOfferQuery);

    const preparedMessages = await service.prepareMessages(topicDocumentTemplateRenderRequested, filteredMessages);
    const preparedMessage = preparedMessages[0];
    const parsePreparedMessage = JSON.parse(preparedMessage.value);

    expect(preparedMessage.key).toBe(`${mockSource}/${mockId}`);
    expect(parsePreparedMessage.transaction).toBe(mockEventOfferAuthorized.transaction);
    expect(parsePreparedMessage.templateId).toBe('resumeTemplate');
    expect(parsePreparedMessage.type).toBe(topicDocumentTemplateRenderRequested);

    expect(parsePreparedMessage.params.creditLine).toBe(`S/ 3,000.00`)
    expect(parsePreparedMessage.params.tcea).toBe('30.00%');
    expect(parsePreparedMessage.params.tceaDolar).toBe('30.00%');
    expect(parsePreparedMessage.params.tea).toBe('20.00%');
    expect(parsePreparedMessage.params.teaDolar).toBe('20.00%');
    expect(parsePreparedMessage.params.tnam).toBe('12.42%');
    expect(parsePreparedMessage.params.tnamDolar).toBe('12.42%');
  });
});
