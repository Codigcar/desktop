enum TOPICS {
  OFFER_AUTHORIZED = 'com.gcredicorp.matrix.contract.offer-authorized.v1',
  ACCOUNT_VALIDATED = 'com.gcredicorp.matrix.contract.account-validated',
  CUSTOMER_VALIDATED = 'com.gcredicorp.matrix.contract.customer-validated.v1',
  CUSTOMER_FAILED = 'com.gcredicorp.matrix.customer.creation-failed.v1',
  CREATE_ACCOUNT_REQUESTED = 'com.gcredicorp.matrix.contract.create-account-requested',
  ACCOUNT_CREATED = 'com.gcredicorp.matrix.contract.account-created.v1',
  CARD_EMITTED = 'com.gcredicorp.matrix.contract.card-emitted.v1',
  DOCUMENT_CREATED = 'com.gcredicorp.matrix.contract.document-created.v1',
  CONTRACT_RELEASED = 'com.gcredicorp.matrix.contract.released.v1',
  CONTRACT_FAILED = 'com.gcredicorp.matrix.contract.failed.v1',
  CONTRACT_REQUESTED = 'pe.io.contract.authorization-requested.v1'
}

const prefix = 'com.gcredicorp.matrix';

const TOPICS_ROLLBACK = {
  CUSTOMER_CREATION_FAILED: `${prefix}.customer.creation-failed.v1`,
  CARD_REGISTER_FAILED: `${prefix}.card-register.failed.v1`,
  DOCUMENT_TEMPLATE_RENDER_FAILED: `${prefix}.document-template.render-failed.v1`,
};

const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

const PARAM_TYPES = {
  DOCUMENT_NUMBER: 'document_number',
  EMAIL: 'email',
  PHONE_NUMBER: 'phone_number',
  PREFERRED_USERNAME: 'preferred_username',
  USER_ID: 'username',
};

const OFFER_STATUS = {
  READY: 'ready',
  PROCESSING: 'processing',
  CONSUMED: 'consumed',
  AUTHORIZED: 'AUTHORIZED',
};

const LEAD_STATUS = {
  ACQUIRED: "ACQUIRED",
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  RESERVED: "RESERVED",
};

const CONTRACT_STATUS = {
  REQUESTED: "REQUESTED",
};

const ERROR_CODES = {
  INVALID_REQUEST: 'invalid_request',
  UNAUTHORIZED_REQUEST: 'unauthorized_request',
  FORBIDDEN_REQUEST: 'forbidden_request',
  USER_NOT_FOUND: 'user_not_found',
  OFFER_NOT_FOUND: 'offer_not_found',
  CONTRACT_NOT_FOUND: 'contract_not_found',
  OFFER_CONSUMED: 'offer_consumed',
  OFFER_NOT_READY: 'offer_not_ready',
  INVALID_CREDIT: 'invalid_credit',
  INCONSISTENCY_ERROR: 'inconsistency_error',
  LEAD_NOT_FOUND: 'lead_not_found',
  LEAD_ACQUIRED: 'lead_acquired',
  LEAD_NOT_ACTIVE: 'lead_not_active',
};

const UUID_REGEX = /^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$/;

const USER_PREFIX = 'user:';

export const OFFER_DOCUMENT_TEMPLATE = {
  FILE_TEMPLATE: 'resumeTemplate',
  CHANGE_TAX: '3.00%',
  TNAM: '12.42%',
};

export const EMAIL_TEMPLATE = 'email_test_template';
export const CONTRACT_FILE = 'contract1.pdf';
export const DESGRAVAMEN_FILE = 'desgravamen1.pdf';

export const indexTable = {
  contract: {
    byAuthor: 'author-index',
    byTransactionId: 'transaction-id-index',
    byTransactionType: 'transaction-type-index',
  },
  customer: {
    byAuthor: 'author-index',
  },
};

export const eventProperties = {
  eventSource: 'eventSource',
  eventSourceArn: 'eventSourceArn',
  records: 'records',
  topic: 'topic',
  partition: 'partition',
  offset: 'offset',
  timestamp: 'timestamp',
  timestampType: 'timestampType',
  key: 'key',
  value: 'value',
};

export { base64regex, TOPICS, PARAM_TYPES, OFFER_STATUS, ERROR_CODES, UUID_REGEX, USER_PREFIX, TOPICS_ROLLBACK, LEAD_STATUS, CONTRACT_STATUS };
