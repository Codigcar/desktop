class ContractAuthorizerEntities {
  public contractEventStoreSaveParams(contractEvent: any) {
    return {
      TableName: process.env.CONTRACT_EVENT_STORE_TABLE_NAME!,
      Item: contractEvent,
      ConditionExpression: 'attribute_not_exists(id)'
    };
  }

  public getLeadsById(id: string) {
    return {
      TableName: process.env.DYNAMO_LEADS_VIEW_TABLE_NAME,
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': id,
      }
    };
  }
}

export default new ContractAuthorizerEntities();
