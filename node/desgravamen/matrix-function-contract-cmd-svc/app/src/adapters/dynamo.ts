/**********************************************
 * TO - DO: Para pruebas en local, comentar 
 * el código referente a X-ray y descomentarlo
 * para los commits
 **********************************************/

import { captureAWSClient } from 'aws-xray-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { injectable } from 'tsyringe';
import { ERROR } from 'src/utils/errors';
import { ERROR_CODES } from 'src/utils/constants';
import { logger } from 'src/utils/logger.util';

@injectable()
export class DynamoAdapter {
  private readonly client: DocumentClient;

  constructor() {
    this.client = new DocumentClient({
      region: process.env.AWS_REGION
    });
    // captureAWSClient((this.client as any).service);
  }

  async query(params: any) {
    return await this.client.query(params).promise();
  }

  async put(params: any) {
    try {
      return await this.client.put(params).promise();
    } catch (error) {
      logger.error(JSON.stringify({ error }));

      throw new ERROR.DynamoPut(JSON.stringify({
        code: ERROR_CODES.USER_NOT_FOUND,
        message: 'Error dynamoDB put data.',
        params,
      }));
    }
  }

  async update(params: any) {
    return await this.client.update(params).promise();
  }

  async delete (params: any) {
    return await this.client.delete(params).promise();
  }
}
