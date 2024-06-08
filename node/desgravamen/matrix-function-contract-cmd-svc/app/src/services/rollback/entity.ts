import { indexTable } from "src/utils/constants";

export class RollbackEntity {
  static contractEventStoreUpdateParams = (contractEvent: any) => {
    return {
      TableName: process.env.CONTRACT_EVENT_STORE_TABLE_NAME!,
      Item: contractEvent,
      ConditionExpression: 'attribute_not_exists(id)'
    };
  };

  static eventsBySourceQueryParams = (source: string) => {
    return {
      TableName: process.env.CONTRACT_EVENT_STORE_TABLE_NAME!,
      KeyConditionExpression: "#source = :source",
      ScanIndexForward: false,
      ExpressionAttributeValues: {
        ':source': source,
      },
      ExpressionAttributeNames: {
        '#source': 'source',
      }
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

  static geCustomerEventByAuthor = (cognitoUsername: string) => {
    return {
      TableName: process.env.CUSTOMER_EVENT_STORE_TABLE_NAME!,
      IndexName: indexTable.customer.byAuthor,
      KeyConditionExpression: "#author = :author",
      ScanIndexForward: false,
      ExpressionAttributeValues: {
        ":author": `user:${cognitoUsername}`,
      },
      ExpressionAttributeNames: {
        "#author": "author",
      }
    }
  }

  static customerEventDeleteParams = (source: string, id: number) => {
    return {
      TableName: process.env.CUSTOMER_EVENT_STORE_TABLE_NAME!,
      Key: {
        source,
        id,
      },
    };
  };
}
