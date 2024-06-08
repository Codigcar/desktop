import { MSKEvent, MSKRecord } from 'src/utils/interfaces';

export const mockMskRecordContentByTopic = (topic: string, returnCoded = false): string | any => {
  const value = {
    source: '7879dbf0-d331-415c-b380-0c0e4df0a7cc',
    id: 2,
    author: '7a7b9903-b054-42ec-b62e-7ef24c1eb290',
    data: {
      payload: {
        id: '29b15113-d882-45b5-83c3-998decf9ef98',
        cognitoUserName: '7a7b9903-b054-42ec-b62e-7ef24c1eb290',
        customerId: '29b15113-d882-45b5-83c3-998decf9ef98',
        document: {
          documentIssueAt: '1995-05-14T00:00:00Z',
          documentNumber: '10359153'
        },
        email: 'eider.arango@globant.com',
        email_verified: 'false',
        gender: 'male',
        lastName: 'ARANGO',
        location: {
          address: 'ALAMEDA.',
          district: 'LA MOLINA',
          province: 'LIMA',
          state: 'LIMA'
        },
        name: 'EIDER',
        phone_number: '+573212301673',
        phone_number_verified: 'true',
        profession: 'ENGINEER',
        status: 'ACTIVE',
        workplace: 'BCP'
      },
      snapshot: {
        customer: {
          id: '29b15113-d882-45b5-83c3-998decf9ef98',
          document: {
            documentIssueAt: '1995-05-14T00:00:00Z',
            documentNumber: '10359153'
          },
          email: 'eider.arango@globant.com',
          email_verified: 'false',
          gender: 'male',
          lastName: 'ARANGO',
          location: {
            address: 'ALAMEDA.',
            district: 'LA MOLINA',
            province: 'LIMA',
            state: 'LIMA'
          },
          name: 'EIDER',
          phone_number: '+573212301673',
          phone_number_verified: 'true',
          profession: 'ENGINEER',
          status: 'ACTIVE',
          workplace: 'BCP'
        },
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
    type: topic
  };
  const valueDecoded: string = Buffer.from(JSON.stringify(value), 'binary').toString('base64');
  return returnCoded ? valueDecoded : value;
};

export const mockCustomerEvent = {
 source: "customer/54189ad7-8e60-4246-8b2a-9d3a402e455d",
 id: 1,
 author: "user:f430389a-b831-4188-977e-4cb93efb3d73",
 data: {
  payload: {
   id: "54189ad7-8e60-4246-8b2a-9d3a402e455d",
   "custom:document_number": "72721080",
   document: {
    documentIssueAt: "1995-11-06T00:00:00Z",
    documentNumber: "72721080"
   },
   email: "irving.chero.matrix3@gmail.com",
   email_verified: "false",
   gender: "male",
   lastName: "CHERO GARCIA",
   location: {
    address: "CALLE FORTUNATO HERRERA 568 URB. CHIMU",
    district: "PIURA",
    peruResident: true,
    province: "PIURA",
    state: "PIURA"
   },
   name: "IRVING CHERO",
   occupation: "test prueba notification requested",
   phone_number: "+51994356661",
   phone_number_verified: "true",
   profession: "desarrollador",
   status: "ACTIVE",
   workplace: "test prueba "
  },
  snapshot: {
   id: "54189ad7-8e60-4246-8b2a-9d3a402e455d",
   "custom:document_number": "72721080",
   document: {
    documentIssueAt: "1995-11-06T00:00:00Z",
    documentNumber: "72721080"
   },
   email: "irving.chero.matrix2@gmail.com",
   email_verified: "false",
   gender: "male",
   lastName: "CHERO GARCIA",
   location: {
    address: "CALLE FORTUNATO HERRERA 568 URB. CHIMU",
    district: "PIURA",
    peruResident: true,
    province: "PIURA",
    state: "PIURA"
   },
   name: "IRVING JOSUE",
   occupation: "test prueba notification requested",
   phone_number: "+51937403320",
   phone_number_verified: "true",
   profession: "desarrollador",
   status: "ACTIVE",
   workplace: "test prueba "
  }
 },
 dataContentType: "application/json",
 dataEncodingType: "identity",
 time: 1668467220522,
 transaction: "82c78f3d-8bd1-462a-a58c-df169ba3f2ef",
 type: "com.gcredicorp.matrix.customer.created.v1"
}

export const mockMskEvent = (topic: string, countRecords: number = 1): MSKEvent => {
  const mock: MSKEvent = {
    eventSource: 'aws:kafka',
    eventSourceArn: '',
    records: {
      [topic]: [...Array(countRecords).fill(mockMskRecord(topic))]
    }
  };
  return mock;
};

const mockMskRecord = (topic: string): MSKRecord => {
  return {
    topic,
    partition: 1,
    key: '1',
    offset: 1,
    timestamp: 1,
    timestampType: 'CREATE_TIME',
    value: mockMskRecordContentByTopic(topic, true)
  };
};
