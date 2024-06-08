/**********************************************
 * TO - DO: Para pruebas en local, comentar 
 * el código referente a X-ray y descomentarlo
 * para los commits
 **********************************************/

import { injectable } from 'tsyringe';
import SecretsManager from 'aws-sdk/clients/secretsmanager';

@injectable()
export class SecretsManagerAdapter {
  private secretsManager: SecretsManager;

  constructor() {
    this.secretsManager = new SecretsManager({
      region: process.env.AWS_REGION
    });
  }

  async getSecretValue (secretName: string) {
    return await this.secretsManager.getSecretValue({ SecretId: secretName }).promise();
  }
}
