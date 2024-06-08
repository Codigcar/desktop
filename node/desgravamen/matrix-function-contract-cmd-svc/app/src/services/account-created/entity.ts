export class AccountCreatedEntity {
  static contractLastEventQueryParams = (source: string) => {
    return {
      TableName: process.env.CONTRACT_EVENT_STORE_TABLE_NAME!,
      KeyConditionExpression: '#source = :source',
      Limit: 1,
      ScanIndexForward: false,
      ExpressionAttributeValues: {
        ':source': source
      },
      ExpressionAttributeNames: {
        '#source': 'source'
      }
    };
  };

  static contractEventStoreSaveParams = (contractEvent: any) => {
    return {
      TableName: process.env.CONTRACT_EVENT_STORE_TABLE_NAME!,
      Item: contractEvent,
      ConditionExpression: 'attribute_not_exists(id)'
    };
  };
};
