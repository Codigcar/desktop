const cognitoUserData = {
  Users: [
    {
      Username: '555b4fc4-9b84-48ee-8ef2-ec3f5480123f',
      UserCreateDate: '2022-08-24T10:46:20.421000-05:00',
      UserLastModifiedDate: '2022-08-24T10:51:47.356000-05:00',
      Enabled: true,
      UserStatus: 'CONFIRMED',
      Attributes: [
        {
          Name: 'sub',
          Value: '6cd804dd-2ebb-4d49-ac6c-07b6a4cb950a'
        }, {
          Name: 'custom:document_number',
          Value: '23933460'
        }, {
          Name: 'email_verified',
          Value: 'false'
        }, {
          Name: 'phone_number_verified',
          Value: 'true'
        }, {
          Name: 'phone_number',
          Value: '+51984712040'
        }, {
          Name: 'preferred_username',
          Value: '23933460'
        }, {
          Name: 'email',
          Value: 'mail.corporation.josue@mailinator.com'
        }
      ]
    }
  ]
};

const dynamoProductOfferQuery = {
  Items: [
    {
      offerId: '822b57dd-dffc-4510-a5fe-37edacbdfd19',
      currency: 'PEN',
      dni: '23933460',
      maxCreditLine: 15000,
      minCreditLine: 3000,
      status: 'consumed'
    }
  ]
};

export const mockEventContractAuthorized = {
  "source": "44cfd2ac-728b-432b-a22d-ede43538559f",
  "id": 1,
  "author": "33e705bc-4f2b-11ed-bdc3-0242ac120002",
  "data": {
    "payload": {
      "cognitoUserName": "33e705bc-4f2b-11ed-bdc3-0242ac120002",
      "conditions": {
        "billingDay": 25,
        "creditLine": 7500,
        "currency": "PEN",
        "desgravamen": 0.00256,
        "maxValueDesgravamen": 20,
        "payDay": 12,
        "tcea": 0.93,
        "tea": 0.49
      },
      "dataProtectionClauseAccepted": true,
      "dni": "11042619",
      "offerId": "lead/64565842-creditcard"
    },
    "snapshot": {
      "offer": {
        "id": "lead/64565842-creditcard",
        "billingDay": 25,
        "conditions": {
          "billingDay": 25,
          "creditLine": 7500,
          "currency": "PEN",
          "desgravamen": 0.00256,
          "maxValueDesgravamen": 20,
          "payDay": 12,
          "tcea": 0.93,
          "tea": 0.49
        },
        "dataProtectionClauseAccepted": true,
        "desgravamen": 0.00256,
        "maxValueDesgravamen": 20,
        "payDay": 12,
        "tcea": 0.93,
        "tea": 0.49
      }
    }
  },
  "dataContentType": "application/json",
  "dataEncodingType": "identity",
  "time": 1682434120045,
  "transaction": "1-6447e846-73581a5e2011476f32964a65",
  "type": "com.gcredicorp.matrix.contract.offer-authorized.v1"
}

const dynamoEventContractAuthorized = {
  Items: [mockEventContractAuthorized],
  Count: 1,
};

const dynamoOfferQuery = {
  tcea: 0.3,
  tea: 0.2,
  desgravamen: 0.012,
  maxCreditLine: 15000,
  minCreditLine: 3000
}

const generatedContractData = {
  contractId: '44d51bb3-dbe1-433d-b0d3-55d85823dea9',
  cognitoUser: '555b4fc4-9b84-48ee-8ef2-ec3f5480123f',
  productOfferRequested: {
    dni: '23933460',
    offerId: '822b57dd-dffc-4510-a5fe-37edacbdfd19',
    conditions: { currency: 'PEN', creditLine: 3000 }
  },
  dataProtectionClauseAccepted: true
};

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
  cognitoUserData,
  dynamoProductOfferQuery,
  generatedContractData,
  generatedContractEventStoreData,
  dynamoEventContractAuthorized,
  dynamoOfferQuery,
  dynamoLastContractRecord
};
