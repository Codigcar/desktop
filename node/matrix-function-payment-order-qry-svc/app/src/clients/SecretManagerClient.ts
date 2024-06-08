import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";
import { inject, injectable } from 'inversify';
import TYPES from '../common/types';

@injectable()
export class SecretManagerClient {
    constructor(
        @inject(TYPES.i2cSecretId) private readonly i2cSecretId: string,
        @inject(TYPES.SecretsManagerClient) private readonly secretsManagerClient : SecretsManagerClient,
    ){}
    async getConnectionData(){
        const client = this.secretsManagerClient;
        const params = {SecretId: this.i2cSecretId};
        const command = new GetSecretValueCommand(params);
        const secretValue = await client.send(command);
        return JSON.parse(secretValue.SecretString);
    }
}
