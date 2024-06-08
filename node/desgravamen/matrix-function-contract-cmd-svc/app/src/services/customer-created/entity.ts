import { indexTable } from "src/utils/constants";

export class CustomerCreatedEntity {
  static contractEventStoreUpdateParams = (contractEvent: any) => {
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
      KeyConditionExpression: '#transaction = :transactionId',
      Limit: 1,
      ScanIndexForward: false,
      ExpressionAttributeValues: {
        ':transactionId': transactionId
      },
      ExpressionAttributeNames: {
        '#transaction': 'transaction'
      }
    };
  };
}
