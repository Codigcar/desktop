import service from 'src/services/contract-authorizer/service';
import { cognitoUserData, generatedContractData, generatedContractEventStoreData, dynamoProductOfferQuery as dynamoLeadViewsQuery, mockLead, leadNotFoundErrorMessage, userNotFoundErrorMessage } from './contract-authorizer.mock';
import cognitoAdapter from 'src/adapters/cognito.adapter';
import DynamoDBAdapter from 'src/adapters/dynamodb.adapter';
import { ConfirmForgotPasswordRequestFilterSensitiveLog } from '@aws-sdk/client-cognito-identity-provider';

let envsOriginal = {
  AWS_REGION: '',
  PRODUCT_OFFER_TABLE_NAME: '',
  CONTRACT_EVENT_STORE_TABLE_NAME: '',
  COGNITO_USER_POOL_ID: '',
}

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

jest.mock('uuid', () => {
  return {
    v4: jest.fn(() => '44d51bb3-dbe1-433d-b0d3-55d85823dea9')
  };
});

jest.mock('aws-xray-sdk-core', () => {
  return {
    captureAWSv3Client: (service: any) => service,
    captureAWSClient: (service: any) => service,
    captureAWS: (service: any) => service
  }
});

jest.mock('@aws-sdk/client-cognito-identity-provider', () => {
  class CognitoIdentityProviderClient {
    send(input: any) { return cognitoUserData }
  }
  class ListUsersCommand {
    constructor(params: any) { }
  }
  return {
    CognitoIdentityProviderClient,
    ListUsersCommand
  }
})

beforeEach(() => {
  process.env = {
    AWS_REGION: 'us-east-1',
    PRODUCT_OFFER_TABLE_NAME: 'dyn-dev-matrix-product-offers-01',
    CONTRACT_EVENT_STORE_TABLE_NAME: 'dyn-dev-matrix-contract-events-01',
    COGNITO_USER_POOL_ID: 'us-east-1_2aUwb0bH5',
    _X_AMZN_TRACE_ID: undefined
  }
});

beforeAll(() => {
  const {
    AWS_REGION,
    PRODUCT_OFFER_TABLE_NAME,
    CONTRACT_EVENT_STORE_TABLE_NAME,
    COGNITO_USER_POOL_ID,
  } = process.env;

  envsOriginal = {
    AWS_REGION: AWS_REGION!,
    PRODUCT_OFFER_TABLE_NAME: PRODUCT_OFFER_TABLE_NAME!,
    CONTRACT_EVENT_STORE_TABLE_NAME: CONTRACT_EVENT_STORE_TABLE_NAME!,
    COGNITO_USER_POOL_ID: COGNITO_USER_POOL_ID!,
  }
});

afterAll(() => {
  process.env.AWS_REGION = envsOriginal.AWS_REGION;
  process.env.PRODUCT_OFFER_TABLE_NAME = envsOriginal.PRODUCT_OFFER_TABLE_NAME;
  process.env.CONTRACT_EVENT_STORE_TABLE_NAME = envsOriginal.CONTRACT_EVENT_STORE_TABLE_NAME;
  process.env.COGNITO_USER_POOL_ID = envsOriginal.COGNITO_USER_POOL_ID;
})

describe('Service', () => {
  test('Get AWS Cognito User data with Document Number - User Not Found', async () => {
    try {
      const documentNumber = '23933460';
      const spyCognitoAdapter = jest.spyOn(cognitoAdapter, 'getUserByParam');
      spyCognitoAdapter.mockResolvedValue([{}])
      await service.getCognitoUserData(documentNumber);
    } catch (error) {
      expect((error as Error).message).toBe(userNotFoundErrorMessage);
    }
  });

  test('Get AWS Cognito User data with Document Number', async () => {
    const documentNumber = '23933460';
    const spyCognitoAdapter = jest.spyOn(cognitoAdapter, 'getUserByParam');
    spyCognitoAdapter.mockResolvedValue(cognitoUserData.Users)
    const { userData, userDocumentNumber } = await service.getCognitoUserData(documentNumber);
    expect(userData).toEqual(cognitoUserData.Users[0]);
    expect(userDocumentNumber).toEqual(documentNumber);
  });

  test('Find Lead by Id: Lead not found', async () => {
    try {
      const leadId = '822b57dd-dffc-4510-a5fe-37edacbdfd19';
      const spyDynamoQuery = jest.spyOn(DynamoDBAdapter, 'query')
      spyDynamoQuery.mockResolvedValue([] as any);

      const dataProductOffer = await service.findLeadById(leadId);
    } catch (error) {
      expect((error as Error).message).toBe(leadNotFoundErrorMessage);
    }
  });

  test('Find Lead by Id - Ok', async () => {
    const offerId = '822b57dd-dffc-4510-a5fe-37edacbdfd19';
    const spyDynamoQuery = jest.spyOn(DynamoDBAdapter, 'query')
    spyDynamoQuery.mockResolvedValue(dynamoLeadViewsQuery as any);

    const dataProductOffer = await service.findLeadById(offerId);
    console.log(dataProductOffer);
    expect(dataProductOffer).toEqual(dynamoLeadViewsQuery.Items[0]);
  });

  test('Prepare contract data', async () => {
    const cognitoUser = cognitoUserData.Users[0];
    const documentNumber = '23933460';
    const lead = dynamoLeadViewsQuery.Items[0];
    const body = {
      acceptDataProtection: true,
      amountOfCredit: 3000
    };
    const acceptDataProtection = true;
    const contractData = await service.prepareContractData(
      cognitoUser,
      documentNumber,
      lead,
      acceptDataProtection,
      1000
    );
    expect(contractData).toEqual(generatedContractData);
  });

  test('Prepare contract event store data', async () => {
    const contractEventStoreData = await service.newEventContractStoreData(generatedContractData);

    expect(contractEventStoreData.source).toBe(generatedContractEventStoreData.source);
    expect(contractEventStoreData.author).toBe(generatedContractEventStoreData.author);
    expect(contractEventStoreData.data).toEqual(generatedContractEventStoreData.data);
  });

  test('Save contract event store data into DynamoDB', async () => {
    const saveContractEventStoreSpy = jest.spyOn(service, 'saveContractEventStore');
    const spyDynamoPut = jest.spyOn(DynamoDBAdapter, 'put')
    spyDynamoPut.mockReturnThis();
    
    await service.saveContractEventStore(generatedContractEventStoreData);
    expect(saveContractEventStoreSpy).toBeCalled();
  });

  test('Get Transacion Id (XRay) - Ok', async () => {
    process.env._X_AMZN_TRACE_ID = 'Root=1-6381162e-6e9e2f2f1a57947a45bbc627;Sample=1';
    const transactionId = await service.getTransactionId('0c612d6f-1e20-4259-96b2-3bf95fc58714');
    expect(transactionId).toStrictEqual('1-6381162e-6e9e2f2f1a57947a45bbc627');
  });

  test('Get Transacion Id (XRay) - _X_AMZN_TRACE_ID is undefined', async () => {
    const transactionId = await service.getTransactionId('0c612d6f-1e20-4259-96b2-3bf95fc58714');
    expect(transactionId).toStrictEqual('0c612d6f-1e20-4259-96b2-3bf95fc58714');
  });

  test('Get Transacion Id (XRay) - env-var is invalid', async () => {
    process.env._X_AMZN_TRACE_ID = 'Root=';
    const transactionId = await service.getTransactionId('0c612d6f-1e20-4259-96b2-3bf95fc58714');
    expect(transactionId).toStrictEqual('0c612d6f-1e20-4259-96b2-3bf95fc58714');
  });

  test('Get Transacion Id (XRay) - env-var is invalid', async () => {
    process.env._X_AMZN_TRACE_ID = 'Root';
    const transactionId = await service.getTransactionId('0c612d6f-1e20-4259-96b2-3bf95fc58714');
    expect(transactionId).toStrictEqual('0c612d6f-1e20-4259-96b2-3bf95fc58714');
  });
});
