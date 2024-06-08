import { MSKEvent, MSKRecord } from 'src/utils/interfaces';

export const mockMskRecordContentByTopic = (topic: string, returnCoded = false): string | any => {
  const value = {
    data: {
      payload: {
      },
      snapshot: {
        offer: {},
        customer: {},
        account: {},
        card: {},
        document: {}
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
