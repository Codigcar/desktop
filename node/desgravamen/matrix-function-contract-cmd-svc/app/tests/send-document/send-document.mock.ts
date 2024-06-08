import { TOPICS } from 'src/utils/constants';

const documentTemplateRenderCompletedEvent = {
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
  type: 'com.gcredicorp.matrix.document-template.render-completed.v1'
};

const contractReleasedBeforDocumentCreatedEvent = {
  source: '7879dbf0-d331-415c-b380-0c0e4df0a7cc',
  id: 3,
  author: '7a7b9903-b054-42ec-b62e-7ef24c1eb290',
  data: {
    payload: {},
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
  type: TOPICS.CONTRACT_RELEASED
};

const contractReleasedAfterDocumentCreatedEvent = {
  source: '7879dbf0-d331-415c-b380-0c0e4df0a7cc',
  id: 3,
  author: '7a7b9903-b054-42ec-b62e-7ef24c1eb290',
  data: {
    payload: {},
    snapshot: {
      offer: {},
      customer: {
        name: 'User',
        lastName: 'Lastname'
      },
      account: {},
      document: {
        bucket: "s3-dev-matrix-contract-documents-01",
        key: "20221228_07919073-812f-4aa9-8e61-4bd4ee48887c_10000.pdf",
        type: "pdf"
      }
    }
  },
  dataContentType: 'application/json',
  dataEncodingType: 'identity',
  time: 1664423063688,
  transaction: '7879dbf0-d331-415c-b380-0c0e4df0a7cc',
  type: TOPICS.CONTRACT_RELEASED
};

const dynamoContractEventsRecords = {
  Items: [
    documentTemplateRenderCompletedEvent,
    contractReleasedBeforDocumentCreatedEvent,
    contractReleasedAfterDocumentCreatedEvent,
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

export {
  dynamoContractEventsRecords,
  dynamoProductOfferQuery,
  contractReleasedAfterDocumentCreatedEvent
};
