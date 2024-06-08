import { TOPICS, TOPICS_ROLLBACK } from 'src/utils/constants';

const cardRegisterFailedEvent = {
  source: '7879dbf0-d331-415c-b380-0c0e4df0a7cc',
  id: 5,
  author: '7a7b9903-b054-42ec-b62e-7ef24c1eb290',
  data: {
    payload: {},
    snapshot: {
      offer: {},
      document: {}
    }
  },
  dataContentType: 'application/json',
  dataEncodingType: 'identity',
  time: 1664423063688,
  transaction: '7879dbf0-d331-415c-b380-0c0e4df0a7cc',
  type: TOPICS_ROLLBACK.CARD_REGISTER_FAILED
};

const customerCreationFailedEvent = {
  source: '7879dbf0-d331-415c-b380-0c0e4df0a7cc',
  id: 3,
  author: '7a7b9903-b054-42ec-b62e-7ef24c1eb290',
  data: {
    payload: {
      
    },
    snapshot: {
      offer: {},
      customer: {},
      account: {}
    }
  },
  dataContentType: 'application/json',
  dataEncodingType: 'identity',
  time: 1664423063688,
  transaction: '7879dbf0-d331-415c-b380-0c0e4df0a7cc',
  type: TOPICS_ROLLBACK.CUSTOMER_CREATION_FAILED
};

const documentRenderFailedEvent = {
  source: '7879dbf0-d331-415c-b380-0c0e4df0a7cc',
  id: 4,
  author: '7a7b9903-b054-42ec-b62e-7ef24c1eb290',
  data: {
    payload: {},
    snapshot: {
      offer: {},
      customer: {},
      account: {},
      card: {}
    }
  },
  dataContentType: 'application/json',
  dataEncodingType: 'identity',
  time: 1664423063688,
  transaction: '7879dbf0-d331-415c-b380-0c0e4df0a7cc',
  type: TOPICS_ROLLBACK.DOCUMENT_TEMPLATE_RENDER_FAILED
};

const dynamoContractEventsRecords = {
  Items: [
    cardRegisterFailedEvent,
    customerCreationFailedEvent,
    documentRenderFailedEvent,
  ]
}

export {
  dynamoContractEventsRecords
};
