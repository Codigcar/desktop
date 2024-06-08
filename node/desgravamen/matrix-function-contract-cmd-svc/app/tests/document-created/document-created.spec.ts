import service from '../../src/services/document-created/service';
import { handler as documentCreatedHandler } from '../../src/functions/document-created/handler';
import { mockMskEvent, mockMskRecordContentByTopic } from './mskEvent.mock';
import { dynamoEventContractAuthorized, generatedContractEventStoreData, mockEventContractAuthorized } from './document-created.mock';
import DynamoDBAdapter from 'src/adapters/dynamodb.adapter';
import { myContextMocked } from 'tests/__mocks__/context-mock/context.mock';

const topicGenerationCompleted = 'com.gcredicorp.matrix.document-template.render-completed.v1';

let envsOriginal = {
  KAFKA_BOOTSTRAP_SERVERS: '',
  MSK_SASL_USERNAME: '',
  MSK_SASL_PASSWORD: '',
  MSK_TOPIC_OFFER_AUTHORIZED: '',
  MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_COMPLETED: '',
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
})


beforeAll(() => {
  const {
    KAFKA_BOOTSTRAP_SERVERS,
    MSK_SASL_USERNAME,
    MSK_SASL_PASSWORD,
    MSK_TOPIC_OFFER_AUTHORIZED,
    MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_COMPLETED,
  } = process.env;

  envsOriginal = {
    KAFKA_BOOTSTRAP_SERVERS: KAFKA_BOOTSTRAP_SERVERS!,
    MSK_SASL_USERNAME: MSK_SASL_USERNAME!,
    MSK_SASL_PASSWORD: MSK_SASL_PASSWORD!,
    MSK_TOPIC_OFFER_AUTHORIZED: MSK_TOPIC_OFFER_AUTHORIZED!,
    MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_COMPLETED: MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_COMPLETED!,
  };
  process.env.KAFKA_BOOTSTRAP_SERVERS = 'b-1,b-2';
  process.env.MSK_SASL_USERNAME = '';
  process.env.MSK_SASL_PASSWORD = '';
  process.env.MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_COMPLETED = topicGenerationCompleted
})

afterAll(() => {
  process.env.KAFKA_BOOTSTRAP_SERVERS = envsOriginal.KAFKA_BOOTSTRAP_SERVERS;
  process.env.MSK_SASL_USERNAME = envsOriginal.MSK_SASL_USERNAME;
  process.env.MSK_SASL_PASSWORD = envsOriginal.MSK_SASL_PASSWORD;
  process.env.MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_COMPLETED = envsOriginal.MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_COMPLETED;
})

describe('Test DocumentRenderCompletedUseCase', () => {
  test('getLastContractRecordByTransactionId should to return last register founded register', async () => {
    const spyDynamoQuery = jest.spyOn(DynamoDBAdapter, 'query');
    spyDynamoQuery.mockResolvedValue(dynamoEventContractAuthorized as any);

    const result = await service.getLastContractRecordByTransactionId('');
    expect(result).toEqual(mockEventContractAuthorized);
  })

  test('getLastContractRecordByTransactionId to return undefined if not founded register', async () => {
    const spyDynamoQuery = jest.spyOn(DynamoDBAdapter, 'query');
    spyDynamoQuery.mockResolvedValue({Items: [], Count: 0} as any);

    const result = await service.getLastContractRecordByTransactionId('');
    expect(result).toBe(undefined);
  })

  test('should saveEvent', async () => {
    const mockEventDocumentRenderCompleted = mockMskRecordContentByTopic(topicGenerationCompleted, false);
    const getLastContractRecordByTransactionIdSpy = jest.spyOn(service, 'getLastContractRecordByTransactionId');
    const spyDynamoDBAdapterPut = jest.spyOn(DynamoDBAdapter, 'put');

    spyDynamoDBAdapterPut.mockReturnThis();
    getLastContractRecordByTransactionIdSpy.mockReturnValue(Promise.resolve(generatedContractEventStoreData));

    await service.saveEvent([mockEventDocumentRenderCompleted]);
    expect(getLastContractRecordByTransactionIdSpy).toBeCalled();
    expect(getLastContractRecordByTransactionIdSpy).toBeCalledWith(mockEventDocumentRenderCompleted.transaction)
  });
  
  test('should to read and publish message from topic', async () => {
    const mockInputToEvent = mockMskEvent(topicGenerationCompleted);
    const saveEventSpy = jest.spyOn(service, 'saveEvent');
    const spyDynamoDBAdapterPut = jest.spyOn(DynamoDBAdapter, 'put');

    spyDynamoDBAdapterPut.mockReturnThis();

    const responseHandler = await documentCreatedHandler(mockInputToEvent, myContextMocked);
    expect(responseHandler).toBe('OK');
    expect(saveEventSpy).toBeCalled();
  });

  test('should to throw Error with EventData corrupted', async () => {
    const mockEventValidated: any = '';
    await expect(documentCreatedHandler(mockEventValidated, myContextMocked)).rejects.toThrow();
  });
});
