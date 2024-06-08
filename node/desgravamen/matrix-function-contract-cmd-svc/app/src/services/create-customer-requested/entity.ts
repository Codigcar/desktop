import { indexTable } from "src/utils/constants";

class CreateCustomerRequestedEntity {
  public customerByUsernameQueryParams(username: string) {
    return {
      TableName: process.env.CUSTOMER_EVENT_STORE_TABLE_NAME!,
      IndexName: indexTable.customer.byAuthor,
      KeyConditionExpression: 'author = :author',
      Limit: 1,
      ScanIndexForward: false,
      ExpressionAttributeValues: {
        ':author': `user:${username}`
      }
    };
  }

  public contractEventStoreSaveParams(contractEvent: any) {
    return {
      TableName: process.env.CONTRACT_EVENT_STORE_TABLE_NAME!,
      Item: contractEvent,
      ConditionExpression: 'attribute_not_exists(id)'
    };
  }

  public lastEventByTransactionIdQueryParams(transactionId: string) {
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
  }
}

export default new CreateCustomerRequestedEntity();
