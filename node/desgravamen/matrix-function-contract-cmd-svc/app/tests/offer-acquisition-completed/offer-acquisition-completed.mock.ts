import { TOPICS } from 'src/utils/constants';
import { MSKEvent, MSKRecord } from 'src/utils/interfaces';

const documentCreatedEvent = {
  source: '7879dbf0-d331-415c-b380-0c0e4df0a7cc',
  id: 5,
  author: '7a7b9903-b054-42ec-b62e-7ef24c1eb290',
  data: {
    payload: {},
    snapshot: {
      offer: {},
      document: {},
    },
  },
  dataContentType: 'application/json',
  dataEncodingType: 'identity',
  time: 1664423063688,
  transaction: '7879dbf0-d331-415c-b380-0c0e4df0a7cc',
  type: TOPICS.DOCUMENT_CREATED,
};

const accountCreatedEvent = {
  source: '7879dbf0-d331-415c-b380-0c0e4df0a7cc',
  id: 3,
  author: '7a7b9903-b054-42ec-b62e-7ef24c1eb290',
  data: {
    payload: {},
    snapshot: {
      offer: {},
      customer: {},
      account: {},
    },
  },
  dataContentType: 'application/json',
  dataEncodingType: 'identity',
  time: 1664423063688,
  transaction: '7879dbf0-d331-415c-b380-0c0e4df0a7cc',
  type: TOPICS.ACCOUNT_CREATED,
};

const cardEmittedEvent = {
  source: '7879dbf0-d331-415c-b380-0c0e4df0a7cc',
  id: 4,
  author: '7a7b9903-b054-42ec-b62e-7ef24c1eb290',
  data: {
    payload: {},
    snapshot: {
      offer: {},
      customer: {},
      account: {},
      card: {},
    },
  },
  dataContentType: 'application/json',
  dataEncodingType: 'identity',
  time: 1664423063688,
  transaction: '7879dbf0-d331-415c-b380-0c0e4df0a7cc',
  type: TOPICS.CARD_EMITTED,
};

const dynamoContractEventsRecords = {
  Items: [documentCreatedEvent, accountCreatedEvent, cardEmittedEvent],
};

const dynamoProductOfferQuery = {
  Items: [
    {
      offerId: '822b57dd-dffc-4510-a5fe-37edacbdfd19',
      currency: 'PEN',
      dni: '23933460',
      maxCreditLine: 15000,
      minCreditLine: 3000,
      status: 'consumed',
    },
  ],
};

export const mockMskRecordContentByTopic = (topic: string, returnCoded = false): string | any => {
  const value = {
    source: '7879dbf0-d331-415c-b380-0c0e4df0a7cc',
    id: 2,
    author: '7a7b9903-b054-42ec-b62e-7ef24c1eb290',
    data: {
      payload: {
        id: '29b15113-d882-45b5-83c3-998decf9ef98',
        contractId: '29b15113-d882-45b5-83c3-998decf9ef98',
        cognitoUserName: '7a7b9903-b054-42ec-b62e-7ef24c1eb290',
        customerId: '29b15113-d882-45b5-83c3-998decf9ef98',
        document: {
          documentIssueAt: '1995-05-14T00:00:00Z',
          documentNumber: '10359153',
        },
        email: 'eider.arango@globant.com',
        email_verified: 'false',
        gender: 'male',
        lastName: 'ARANGO',
        location: {
          address: 'ALAMEDA.',
          district: 'LA MOLINA',
          province: 'LIMA',
          state: 'LIMA',
        },
        name: 'EIDER',
        phone_number: '+573212301673',
        phone_number_verified: 'true',
        profession: 'ENGINEER',
        status: 'ACTIVE',
        workplace: 'BCP',
      },
      snapshot: {
        customer: {
          id: '29b15113-d882-45b5-83c3-998decf9ef98',
          document: {
            documentIssueAt: '1995-05-14T00:00:00Z',
            documentNumber: '10359153',
          },
          email: 'eider.arango@globant.com',
          email_verified: 'false',
          gender: 'male',
          lastName: 'ARANGO',
          location: {
            address: 'ALAMEDA.',
            district: 'LA MOLINA',
            province: 'LIMA',
            state: 'LIMA',
          },
          name: 'EIDER',
          phone_number: '+573212301673',
          phone_number_verified: 'true',
          profession: 'ENGINEER',
          status: 'ACTIVE',
          workplace: 'BCP',
        },
        offer: {
          id: '822b57dd-dffc-4510-a5fe-37edacbdfd19',
          conditions: {
            creditLine: 3000,
            currency: 'PEN',
          },
          dataProtectionClauseAccepted: true,
        },
      },
    },
    dataContentType: 'application/json',
    dataEncodingType: 'identity',
    time: 1664423063688,
    transaction: '7879dbf0-d331-415c-b380-0c0e4df0a7cc',
    type: topic,
  };
  const valueDecoded: string = Buffer.from(JSON.stringify(value), 'binary').toString('base64');
  return returnCoded ? valueDecoded : value;
};

export const mockMskRecord = (topic: string): MSKRecord => {
  return {
    topic,
    partition: 1,
    key: '1',
    offset: 1,
    timestamp: 1,
    timestampType: 'CREATE_TIME',
    value: mockMskRecordContentByTopic(topic, true),
  };
};

export const mockMessageToSend = (topic: string): MSKRecord => {
  return {
    topic,
    partition: 1,
    key: '1',
    offset: 1,
    timestamp: 1,
    timestampType: 'CREATE_TIME',
    value: mockMskRecordContentByTopic(topic, true),
  };
};

export const mockMskEvent = (topic: string, countRecords: number = 1): MSKEvent => {
  const mock: MSKEvent = {
    eventSource: 'aws:kafka',
    eventSourceArn: '',
    records: {
      [topic]: [...Array(countRecords).fill(mockMskRecord(topic))],
    },
  };
  return mock;
};

export const lastEventMocked = {
  source: 'bf5fe9af-46de-40be-8c9a-50be4d1f88a3',
  id: 5,
  author: '7adb9dd7-2f06-4396-a92d-0f8333ffe5a6',
  data: {
    payload: {
      id: 'account:8f16ec50-2bc6-47d6-969d-8f04b50683d7',
      balance: 0,
      cognitoUserName: '7adb9dd7-2f06-4396-a92d-0f8333ffe5a6',
      contractId: 'bf5fe9af-46de-40be-8c9a-50be4d1f88a3',
      creditLimit: 666,
      customerId: '28db5fb2-e9fd-47ae-90f5-14c4c2c65dce',
      document: {
        documentIssueAt: '1998-05-19T00:00:00Z',
        documentNumber: '70868726',
      },
      email: 'gianella.aponte.matrix@gmail.com',
      email_verified: 'false',
      externalCustomerId: '333000000001586635',
      externalTransactionId: 'F10095568',
      lastDepositAmount: 0,
      lastName: 'APONTE RODRIGUEZ',
      ledgerBalance: 0,
      location: {
        address: '62057W ASENT.H. ALAN GARCIA PEREZ MZ. J LT. 38',
        district: 'LA ESPERANZA',
        province: 'TRUJILLO',
        state: 'LA LIBERTAD',
      },
      name: 'GIANELLA ALEXANDRA',
      phone_number: '+51939996572',
      phone_number_verified: 'true',
      purchaseApr: 0.5,
      reference: '333158663509',
      status: 'ACTIVE',
    },
    snapshot: {
      account: {
        id: 'account:8f16ec50-2bc6-47d6-969d-8f04b50683d7',
        balance: 0,
        contractId: 'bf5fe9af-46de-40be-8c9a-50be4d1f88a3',
        creditLimit: 666,
        customerId: '28db5fb2-e9fd-47ae-90f5-14c4c2c65dce',
        externalCustomerId: '333000000001586635',
        externalTransactionId: 'F10095568',
        lastDepositAmount: 0,
        ledgerBalance: 0,
        purchaseApr: 0.5,
        reference: '333158663509',
      },
      customer: {
        id: '28db5fb2-e9fd-47ae-90f5-14c4c2c65dce',
        document: {
          documentIssueAt: '1998-05-19T00:00:00Z',
          documentNumber: '70868726',
        },
        email: 'gianella.aponte.matrix@gmail.com',
        email_verified: 'false',
        lastName: 'APONTE RODRIGUEZ',
        location: {
          address: '62057W ASENT.H. ALAN GARCIA PEREZ MZ. J LT. 38',
          district: 'LA ESPERANZA',
          province: 'TRUJILLO',
          state: 'LA LIBERTAD',
        },
        name: 'GIANELLA ALEXANDRA',
        phone_number: '+51939996572',
        phone_number_verified: 'true',
        status: 'ACTIVE',
      },
      document: {
        bucket: 's3-dev-matrix-contract-documents-01',
        key: '20230315_fbb87136-36a0-4ad6-8534-db525f23d519_666.pdf',
        type: 'pdf',
      },
      offer: {
        id: 'fbb87136-36a0-4ad6-8534-db525f23d519',
        billingDay: 25,
        conditions: {
          billingDay: 25,
          creditLine: 666,
          currency: 'PEN',
          desgravamen: 0.00256,
          maxValueDesgravamen: 20,
          payDay: 12,
          tcea: 0.94,
          tea: 0.5,
        },
        dataProtectionClauseAccepted: true,
        desgravamen: 0.00256,
        maxValueDesgravamen: 20,
        payDay: 12,
        tcea: 0.94,
        tea: 0.5,
      },
    },
  },
  dataContentType: 'application/json',
  dataEncodingType: 'identity',
  time: 1678892421368,
  transaction: '1-6411dd73-2fe2dc5f09405e56549a2d35',
  type: 'com.gcredicorp.matrix.contract.account-created.v1',
};

export { dynamoContractEventsRecords, dynamoProductOfferQuery };
