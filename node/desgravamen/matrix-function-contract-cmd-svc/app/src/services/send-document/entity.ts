import { indexTable } from "src/utils/constants";

export class SendDocumentEntity {
  static notificationEventStoreSaveParams = (notificationEvent: any) => {
    return {
      TableName: process.env.NOTIFICATIONS_EVENT_STORE_TABLE_NAME,
      Item: notificationEvent,
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
