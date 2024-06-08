import { indexTable } from "src/utils/constants";

export class DocumentRequestedEntity {
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
  
  static LeadViewQueryParams = (offerId: string) => {
    return {
      TableName: process.env.LEAD_VIEW_TABLE_NAME!,
      KeyConditionExpression: '#offerId = :offerId',
      Limit: 1,
      ScanIndexForward: false,
      ExpressionAttributeValues: {
        ':offerId': offerId
      },
      ExpressionAttributeNames: {
        '#offerId': 'offerId'
      }
    };
  };
}
