import { Offer } from "src/utils/interfaces";

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

const dynamoEventContractAuthorized = {
  Items: [
    {
      source: '7879dbf0-d331-415c-b380-0c0e4df0a7cc',
      id: 2,
      author: '7a7b9903-b054-42ec-b62e-7ef24c1eb290',
      data: {
        payload: {
          id: '29b15113-d882-45b5-83c3-998decf9ef98',
          cognitoUserName: '7a7b9903-b054-42ec-b62e-7ef24c1eb290',

        },
        snapshot: {
          offer: {
            id: '822b57dd-dffc-4510-a5fe-37edacbdfd19',
            conditions: {
              creditLine: 3000,
              currency: 'PEN'
            },
            dataProtectionClauseAccepted: true
          }
        }
      },
      dataContentType: 'application/json',
      dataEncodingType: 'identity',
      time: 1664423063688,
      transaction: '7879dbf0-d331-415c-b380-0c0e4df0a7cc',
      type: 'com.gcredicorp.matrix.contract.offer-authorized'
    }
  ],
  Count: 1,
};

const dynamoOfferQuery: Offer = {
  // Items: [
  //   {
      tcea: 0.3,
      tea: 0.2,
      desgravamen: 0.012,
      maxCreditLine: 15000,
      minCreditLine: 3000,
      maxValueDesgravamen: 2.65,
      payDay: 15
  //   }
  // ]
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


export {
  cognitoUserData,
  dynamoProductOfferQuery,
  generatedContractData,
  generatedContractEventStoreData,
  dynamoEventContractAuthorized,
  dynamoOfferQuery
};
