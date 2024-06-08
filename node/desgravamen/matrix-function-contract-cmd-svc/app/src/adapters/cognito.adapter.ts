import { CognitoIdentityProviderClient, ListUsersCommand } from '@aws-sdk/client-cognito-identity-provider';
import { captureAWSv3Client } from 'aws-xray-sdk-core';
import { tracer } from 'src/utils/logger.util';

const {
  AWS_REGION,
  COGNITO_USER_POOL_ID
} = process.env;

class CognitoAdapter {
  // TODO verify updates:
  // https://github.com/aws/aws-xray-sdk-node/issues/540
  // https://github.com/aws/aws-xray-sdk-node/tree/master/packages/core#capture-outgoing-aws-requests-on-a-single-client
  private readonly cognitoClient: CognitoIdentityProviderClient = captureAWSv3Client(
    new CognitoIdentityProviderClient({ region: AWS_REGION }) as any);

  @tracer.captureMethod({
    captureResponse: true,
  })
  public async getUserByParam(
    value: any, paramType: any
  ) {
    const params = {
      UserPoolId: COGNITO_USER_POOL_ID!,
      Filter: `${paramType} = \"${value}\"`,
      Limit: 60
    };

    const { Users } = await this.cognitoClient.send(
      new ListUsersCommand(params));
    return Users;
  }
}

export default new CognitoAdapter();
