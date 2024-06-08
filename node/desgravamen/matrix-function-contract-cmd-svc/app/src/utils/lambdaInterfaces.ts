interface APIGatewayProxyEventHeaders {
  [name: string]: string | undefined;
}

interface APIGatewayProxyEventMultiValueHeaders {
  [name: string]: string[] | undefined;
}

interface APIGatewayProxyEventPathParameters {
  [name: string]: string | undefined;
}

interface APIGatewayProxyEventQueryStringParameters {
  [name: string]: string | undefined;
}

interface APIGatewayProxyEventMultiValueQueryStringParameters {
  [name: string]: string[] | undefined;
}

interface APIGatewayProxyEventStageVariables {
  [name: string]: string | undefined;
}

export type APIGatewayEventDefaultAuthorizerContext = undefined | null | {
  [name: string]: any;
};

interface APIGatewayEventClientCertificate {
  clientCertPem: string;
  serialNumber: string;
  subjectDN: string;
  issuerDN: string;
  validity: {
      notAfter: string;
      notBefore: string;
  };
}

interface APIGatewayEventIdentity {
  accessKey: string | null;
  accountId: string | null;
  apiKey: string | null;
  apiKeyId: string | null;
  caller: string | null;
  clientCert: APIGatewayEventClientCertificate | null;
  cognitoAuthenticationProvider: string | null;
  cognitoAuthenticationType: string | null;
  cognitoIdentityId: string | null;
  cognitoIdentityPoolId: string | null;
  principalOrgId: string | null;
  sourceIp: string;
  user: string | null;
  userAgent: string | null;
  userArn: string | null;
}

export interface APIGatewayEventRequestContextWithAuthorizer<TAuthorizerContext> {
  accountId: string;
  apiId: string;
  authorizer: TAuthorizerContext;
  connectedAt?: number | undefined;
  connectionId?: string | undefined;
  domainName?: string | undefined;
  domainPrefix?: string | undefined;
  eventType?: string | undefined;
  extendedRequestId?: string | undefined;
  protocol: string;
  httpMethod: string;
  identity: APIGatewayEventIdentity;
  messageDirection?: string | undefined;
  messageId?: string | null | undefined;
  path: string;
  stage: string;
  requestId: string;
  requestTime?: string | undefined;
  requestTimeEpoch: number;
  resourceId: string;
  resourcePath: string;
  routeKey?: string | undefined;
}

export interface APIGatewayProxyEventBase<TAuthorizerContext> {
  body: string | null;
  headers: APIGatewayProxyEventHeaders;
  multiValueHeaders: APIGatewayProxyEventMultiValueHeaders;
  httpMethod: string;
  isBase64Encoded: boolean;
  path: string;
  pathParameters: APIGatewayProxyEventPathParameters | null;
  queryStringParameters: APIGatewayProxyEventQueryStringParameters | null;
  multiValueQueryStringParameters: APIGatewayProxyEventMultiValueQueryStringParameters | null;
  stageVariables: APIGatewayProxyEventStageVariables | null;
  requestContext: APIGatewayEventRequestContextWithAuthorizer<TAuthorizerContext>;
  resource: string;
}

type APIGatewayProxyEvent = APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>;

export type APIGatewayEvent = APIGatewayProxyEvent;
