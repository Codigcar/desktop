import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  PutCommandInput,
  PutCommandOutput,
  QueryCommand,
  QueryCommandInput,
  QueryCommandOutput,
  DeleteCommandInput,
  DeleteCommandOutput,
  DeleteCommand
} from '@aws-sdk/lib-dynamodb';
import { captureAWSv3Client } from 'aws-xray-sdk-core';
import { ERROR_CODES } from 'src/utils/constants';
import { ERROR } from 'src/utils/errors';
import { logger, tracer } from 'src/utils/logger.util';

class DynamoDBAdapter {
  // TODO verify updates:
  // https://github.com/aws/aws-xray-sdk-node/issues/540
  // https://github.com/aws/aws-xray-sdk-node/tree/master/packages/core#capture-outgoing-aws-requests-on-a-single-client
  private static ddbClient: DynamoDBClient = captureAWSv3Client(
    new DynamoDBClient({}) as any);

  private static ddbDocClient: DynamoDBDocumentClient =
    DynamoDBDocumentClient.from(DynamoDBAdapter.ddbClient);

  @tracer.captureMethod({
    captureResponse: true,
  })
  public async query(
    queryCommandInput: QueryCommandInput
  ): Promise<QueryCommandOutput> {
    const queryCommand: QueryCommand = new QueryCommand(queryCommandInput);
    return await DynamoDBAdapter.ddbDocClient.send(queryCommand);
  }

  @tracer.captureMethod({
    captureResponse: true,
  })
  public async put(
    putCommandInput: PutCommandInput
  ): Promise<PutCommandOutput> {
    try {
      const putCommand: PutCommand = new PutCommand(putCommandInput);
      return await DynamoDBAdapter.ddbDocClient.send(putCommand);

    } catch (error: any) {
      logger.error(error);
      throw new ERROR.DynamoPut(JSON.stringify({
        code: ERROR_CODES.USER_NOT_FOUND,
        message: `Error dynamoDB put data. ${error}`,
        putCommandInput,
      }));
    }
  }

  @tracer.captureMethod({
    captureResponse: true,
  })
  public async delete( 
    deleteCommandInput: DeleteCommandInput
  ): Promise<DeleteCommandOutput> {
    const deleteCommand: DeleteCommand = new DeleteCommand(deleteCommandInput);
    return await DynamoDBAdapter.ddbDocClient.send(deleteCommand);
  }  
}

export default new DynamoDBAdapter();
