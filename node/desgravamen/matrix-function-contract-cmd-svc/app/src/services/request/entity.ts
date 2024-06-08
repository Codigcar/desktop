export class ContractRequestedEntity {

    static contractLastEventQueryParamsBySource = (source: string) => {
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

    static contractLastEventQueryParamsByAuthor = (author: string) => {
      return {
        TableName: process.env.CONTRACT_EVENT_STORE_TABLE_NAME!,
        IndexName: 'author-index',
        KeyConditionExpression: "#author = :author",
        Limit: 1,
        ScanIndexForward: false,
        ExpressionAttributeValues: {
            ":author": author
        },
        ExpressionAttributeNames: {
            '#author': 'author'
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

    static getLeadsById(id: string) {
      return {
        TableName: process.env.DYNAMO_LEADS_VIEW_TABLE_NAME!,
        KeyConditionExpression: 'id = :id',
        ExpressionAttributeValues: {
          ':id': id,
        }
      };
    }

};
  