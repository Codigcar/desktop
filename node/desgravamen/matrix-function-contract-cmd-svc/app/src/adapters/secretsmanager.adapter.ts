import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";
import { captureAWSv3Client } from 'aws-xray-sdk-core';
import { tracer } from 'src/utils/logger.util';

const {
  AWS_REGION
} = process.env;

class SecretsManagerAdapter {
  // TODO verify updates:
  // https://github.com/aws/aws-xray-sdk-node/issues/540
  // https://github.com/aws/aws-xray-sdk-node/tree/master/packages/core#capture-outgoing-aws-requests-on-a-single-client
  private static readonly secretsManagerClient: SecretsManagerClient = captureAWSv3Client(
    new SecretsManagerClient({ region: AWS_REGION }) as any);

  @tracer.captureMethod({
    captureResponse: true,
  })
  public async getSecretValue(
    secretName: string
  ) {

    return await SecretsManagerAdapter.secretsManagerClient.send(
      new GetSecretValueCommand({ SecretId: secretName })
    );
  }
}

export default new SecretsManagerAdapter();
