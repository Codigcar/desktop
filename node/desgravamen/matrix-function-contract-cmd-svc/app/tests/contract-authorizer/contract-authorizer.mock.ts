import { ERROR_CODES } from "src/utils/constants";
import { DataEventContractStore, Lead } from "src/utils/interfaces";

const cognitoUserData = {
  Users: [
    {
      Username: '555b4fc4-9b84-48ee-8ef2-ec3f5480123f',
      UserCreateDate: new Date('2022-08-24T10:46:20.421000-05:00'),
      UserLastModifiedDate: new Date('2022-08-24T10:51:47.356000-05:00'),
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


export const mockLead: Lead = {
  id: "lead/46687138-creditcard",
  address: "Jr Los Zafiros 2019 Urb. San Hilarion",
  billingDay: 25,
  bornDate: "1990-12-30",
  codClaveCIC: "9999999",
  codUnicoCLI: "466871381",
  currency: "PEN",
  department: "Lima",
  desgravamen: 0.00256,
  district: "San Juan de Lurigancho",
  dni: "46687138",
  email: "lguisadom@gmail.com",
  maxCreditLine: 1000,
  maxValueDesgravamen: 20,
  minCreditLine: 500,
  monthlyCost: 0,
  name: "Luis Alberto",
  payDay: 12,
  phoneNumber: "966389345",
  plan: 1,
  productDescription: "Tarjeta Matrix",
  province: "Lima",
  status: "ready",
  surname1: "Guisado",
  surname2: "Mena",
  tcea: 0.06274,
  tea: 0.58,
  type: "CREDIT_CARD"
}

const dynamoLeadViewsQuery = {
  Items: [mockLead]
};

const generatedContractData: DataEventContractStore = {
  contractId: '44d51bb3-dbe1-433d-b0d3-55d85823dea9',
  cognitoUser: '555b4fc4-9b84-48ee-8ef2-ec3f5480123f',
  productOfferRequested: {
    dni: '23933460',
    offerId: 'lead/46687138-creditcard',
    conditions: {
      currency: 'PEN',
      creditLine: 1000,
      tcea: 0.06274,
      tea: 0.58,
      desgravamen: 0.00256,
      maxValueDesgravamen: 20,
      payDay: 12,
      billingDay: 25
    }
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
      conditions: {
        currency: 'PEN',
        creditLine: 1000,
        tcea: 0.06274,
        tea: 0.58,
        billingDay: 25,
        desgravamen: 0.00256,
        maxValueDesgravamen: 20,
        payDay: 12,
      },
      dataProtectionClauseAccepted: true,
      dni: '23933460',
      offerId: 'lead/46687138-creditcard'
    },
    snapshot: {
      offer: {
        id: 'lead/46687138-creditcard',
        billingDay: 25,
        payDay: 12,
        conditions: {
          currency: 'PEN',
          creditLine: 1000,
          tcea: 0.06274,
          payDay: 12,
          tea: 0.58,
          billingDay: 25,
          desgravamen: 0.00256,
          maxValueDesgravamen: 20,
        },
        desgravamen: 0.00256,
        maxValueDesgravamen: 20,
        dataProtectionClauseAccepted: true,
        tea: 0.58,
        tcea: 0.06274,
      }
    }
  },
  dataContentType: 'application/json',
  dataEncodingType: 'identity',
  time: 1662305682026,
  transaction: '44d51bb3-dbe1-433d-b0d3-55d85823dea9',
  type: 'com.gcredicorp.matrix.contract.offer-authorized.v1'
}

const leadNotFoundErrorMessage = JSON.stringify({
  code: ERROR_CODES.LEAD_NOT_FOUND,
  message: 'Lead not found.',
  details: [{
    message: `Lead not found: '822b57dd-dffc-4510-a5fe-37edacbdfd19'`
  }]
});

const userNotFoundErrorMessage = JSON.stringify({
  code: ERROR_CODES.USER_NOT_FOUND,
  message: 'User not found.',
  details: [{
    message: `The user with accountId '23933460' is not registered in Cognito.`
  }]
});


export {
  cognitoUserData,
  dynamoLeadViewsQuery as dynamoProductOfferQuery,
  generatedContractData,
  generatedContractEventStoreData,
  leadNotFoundErrorMessage,
  userNotFoundErrorMessage
};
