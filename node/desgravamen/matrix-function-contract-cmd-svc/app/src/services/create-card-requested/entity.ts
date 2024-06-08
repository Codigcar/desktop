import { indexTable } from "src/utils/constants";
import { DataEvent } from "src/utils/interfaces";

export class CreateCardRequestedEntity {
  static contractByUsernameQueryParams = (username: string) => {
    return {
      TableName: process.env.CONTRACT_EVENT_STORE_TABLE_NAME!,
      IndexName: indexTable.contract.byAuthor,
      KeyConditionExpression: "author = :author",
      ExpressionAttributeValues: {
        ":author": `${username}`
      }
    };
  };

  static contractEventStoreUpdateParams = (contractEvent: DataEvent) => {
    return {
      TableName: process.env.CONTRACT_EVENT_STORE_TABLE_NAME!,
      Item: contractEvent,
      ConditionExpression: 'attribute_not_exists(id)'
    };
  };

  static lastEventByTransactionIdQueryParams = (transactionId: string) => {
    return {
      TableName: process.env.CONTRACT_EVENT_STORE_TABLE_NAME!,
      IndexName: indexTable.contract.byTransactionId,
      KeyConditionExpression: "#transaction = :transactionId",
      Limit: 1,
      ScanIndexForward: false,
      ExpressionAttributeValues: {
        ":transactionId": transactionId
      },
      ExpressionAttributeNames: {
        '#transaction': 'transaction'
      }
    };
  };
}
