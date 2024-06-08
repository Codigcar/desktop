/**********************************************
 * TO - DO: Para pruebas en local, comentar 
 * el código referente a X-ray y descomentarlo
 * para los commits
 **********************************************/
import { captureAWSClient, captureAWS } from 'aws-xray-sdk';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { injectable } from 'tsyringe';

const {
  AWS_REGION,
  COGNITO_USER_POOL_ID
} = process.env;

@injectable()
export class CognitoAdapter {
  private readonly cognito: CognitoIdentityServiceProvider;

  constructor() {
    // this.cognito = new CognitoIdentityServiceProvider({
    //   apiVersion: '2016-04-18',
    //   region: AWS_REGION
    // });

    const { CognitoIdentityServiceProvider } = captureAWS(require('aws-sdk'));

    this.cognito = captureAWSClient(new CognitoIdentityServiceProvider({
      apiVersion: '2016-04-18',
      region: AWS_REGION
    }));
  }

  async getUserByParam (value: any, paramType: any) {
    const params = {
      UserPoolId: COGNITO_USER_POOL_ID!,
      Filter: `${paramType} = \"${value}\"`,
      Limit: 60
    };
    
    const { Users } = await this.cognito.listUsers(params).promise();
    return Users;
  };
}
