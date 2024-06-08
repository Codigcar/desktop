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

export const mockMskRecord = (topic: string): MSKRecord => {
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
