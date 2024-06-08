const generatedContractEventStoreData = {
  source: '44d51bb3-dbe1-433d-b0d3-55d85823dea9',
  id: 1,
  author: '555b4fc4-9b84-48ee-8ef2-ec3f5480123f',
  data: {
    payload: {
      cognitoUserName: '555b4fc4-9b84-48ee-8ef2-ec3f5480123f',
      conditions: { currency: 'PEN', creditLine: 3000 },
      dataProtectionClauseAccepted: true,
      dni: '23933460',
      offerId: '822b57dd-dffc-4510-a5fe-37edacbdfd19'
    },
    snapshot: {
      offer: {
        id: '822b57dd-dffc-4510-a5fe-37edacbdfd19',
        conditions: { currency: 'PEN', creditLine: 3000 },
        dataProtectionClauseAccepted: true
      }
    }
  },
  dataContentType: 'application/json',
  dataEncodingType: 'identity',
  time: 1662305682026,
  transaction: '44d51bb3-dbe1-433d-b0d3-55d85823dea9',
  type: 'com.gcredicorp.matrix.contract.offer-authorized.v1'
}

const dynamoLastContractRecord = {
  Items: [generatedContractEventStoreData]
}

export {
  generatedContractEventStoreData,
  dynamoLastContractRecord
};
