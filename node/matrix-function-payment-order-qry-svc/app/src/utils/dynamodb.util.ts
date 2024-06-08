import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandInput,
  GetCommandOutput,
  PutCommand,
  PutCommandInput,
  PutCommandOutput,
  QueryCommand,
  QueryCommandInput,
  QueryCommandOutput,
} from "@aws-sdk/lib-dynamodb";

import { logger } from "./logger";

class DynamoDBUtil {
  private readonly dynamoDBDocumentClient: DynamoDBDocumentClient;

  constructor() {
    this.dynamoDBDocumentClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({})
    );
  }

  async getItem(getCommandInput: GetCommandInput): Promise<GetCommandOutput> {
    logger.debug(
      `Init process of obtain Item in table:  ${getCommandInput.TableName}`
    );
    return await this.dynamoDBDocumentClient.send(
      new GetCommand(getCommandInput)
    );
  }

  async getItems(
    queryCommandInput: QueryCommandInput
  ): Promise<QueryCommandOutput> {
    logger.debug(
      `Init process of obtain Item in table:  ${queryCommandInput.TableName}`
    );
    return await this.dynamoDBDocumentClient.send(
      new QueryCommand(queryCommandInput)
    );
  }

  async putItem(putCommandInput: PutCommandInput): Promise<PutCommandOutput> {
    logger.debug(
      `Init process of obtain Item in table:  ${putCommandInput.TableName}`
    );
    return await this.dynamoDBDocumentClient.send(
      new PutCommand(putCommandInput)
    );
  }
}

export default new DynamoDBUtil();
