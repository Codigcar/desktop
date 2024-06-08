import { DataEvent, MSKEvent, MSKRecord } from 'src/utils/interfaces';

export const mockMskRecordContentByTopic = (topic: string, returnCoded = false, addDocument = false): string | any => {
  const value: DataEvent = {
    data: {
      payload: {
      },
      snapshot: {
        offer: {
          conditions: {
            creditLine: '5000',
            tea: '0.3',
            tcea: '0.4'
          }
        },
        customer: {
          name: 'User',
          lastName: 'LastName'
        },
        account: {},
        card: {}
      }
    },
    author: '7a7b9903-b054-42ec-b62e-7ef24c1eb290',
    source: '7879dbf0-d331-415c-b380-0c0e4df0a7cc',
    id: 2,
    time: 1664423063688,
    type: topic,
    dataContentType: 'application/json',
    transaction: '7879dbf0-d331-415c-b380-0c0e4df0a7cc',
    dataEncodingType: 'identity'
  };
  if (addDocument) value.data.snapshot.document = {
    key: 'file-123.pdf'
  };

  const valueDecoded: string = Buffer.from(JSON.stringify(value), 'binary').toString('base64');
  return returnCoded ? valueDecoded : value;
};

export const mockMskRecord = (topic: string, withDocument = false): MSKRecord => {
  return {
    topic,
    partition: 1,
    key: '1',
    offset: 1,
    timestamp: 1,
    timestampType: 'CREATE_TIME',
    value: mockMskRecordContentByTopic(topic, true, withDocument)
  };
};

export const mockMskEvent = (topic: string, countRecords: number = 1, withDocument = false): MSKEvent => {
  const mock: MSKEvent = {
    eventSource: 'aws:kafka',
    eventSourceArn: '',
    records: {
      [topic]: [...Array(countRecords).fill(mockMskRecord(topic, withDocument))]
    }
  };
  return mock;
};
