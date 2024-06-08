export interface MSKRecordEvent {
  topic: string;
  partition: number;
  offset: number;
  timestamp: number;
  timestampType: string;
  key: string;
  value: string;
  headers: any[];
}

export interface MSKRecord {
  topic: string;
  partition: number;
  offset: number;
  timestamp: number;
  timestampType: 'CREATE_TIME' | 'LOG_APPEND_TIME';
  key: string;
  value: string;
}

export interface MSKEvent {
  eventSource: 'aws:kafka';
  eventSourceArn: string;
  records: {
    [topic: string]: MSKRecord[];
  };
}

interface payload {
  [k: string]: any
}

interface snapshot {
  [k: string]: {
    [y: string]: string | number | any;
  }
}

export interface DataEvent {
  source: string;
  id: number;
  author: string;
  data: {
    payload: payload;
    snapshot: snapshot;
    status?: string,
  };
  dataContentType: 'application/json';
  dataEncodingType: string;
  time: number;
  transaction: string;
  type: string
}

export interface CustomerEvent {
  source: string;
  id: number;
  author: string;
  data: {
    payload: payload;
    snapshot: snapshot;
  };
  dataContentType: 'application/json';
  dataEncodingType: string;
  time: number;
  transaction: string;
  type: string
}

export interface MessageToTopic {
  key: string;
  value: string;
}

export interface kafkaProducer {
  send: (options: { topic: string, messages: MessageToTopic[] }) => {};
  connect: Function;
}

export interface kafkaEventDecodingByMiddleware {
  eventSource: string
  eventSourceArn: string
  records: kafkaEventDecodingByMiddlewareRecord
}

export interface MessageDocumentCreated {
  transaction: string;
  type: string;
  s3: {
    key: string;
    type: string;
    bucket: string;
  }
}

export interface kafkaEventDecodingByMiddlewareRecord {
  [k: string]: {
    topic: string,
    partition: number,
    offset: number,
    timestamp: number,
    timestampType: "CREATE_TIME",
    key: string,
    value: DataEvent
  }[]
}

export interface Offer {
  offerId?: string;
  address?: string;
  billingDay?: number;
  bornDate?: string;
  currency?: string;
  department?: string;
  desgravamen: number;
  district?: string;
  dni?: string;
  email?: string;
  maxCreditLine: number;
  minCreditLine: number;
  monthlyCost?: number;
  name?: string;
  phoneNumber?: string;
  plan?: string;
  productDescription?: string;
  province?: string;
  status?: string;
  surname1?: string;
  surname2?: string;
  tcea: number;
  tceaDollar?: number;
  tea: number;
  teaDollar?: number;
  changeTax?: number;
  tnam?: number;
  tnamDollar?: number;
  payDay: number;
  maxValueDesgravamen: number;
}

export interface snapshotOffer {
  id: string;
  conditions: any;
  dataProtectionClauseAccepted: any;
  tea: number;
  tcea: number;
  billingDay: number;
  desgravamen: number;
  payDay: number;
  maxValueDesgravamen: number;
}

export interface MessageTopicRollback {
  source: string;
  id: number;
  author: string;
  data: {
    payload: any;
    snapshot: any;
  };
  dataContentType: 'application/json';
  dataEncodingType: string;
  time: number;
  transaction: string;
  type: string
}

export interface CognitoUser {
  username: string;
  userCreateDate: Date;
  userLastModifiedDate: Date;
  enabled: boolean;
  userStatus: string;
  [k: string]: string | Date | boolean;
}

export interface Customer {
  source: string;
  id: number;
  author: string;
  data: {
    payload: {
      [k: string]: any
    };
    snapshot: {
      [k: string]: any
    };
  };
  dataContentType: 'application/json';
  dataEncodingType: string;
  time: number;
  transaction: string;
  type: string
}

export interface DataEventContractStore {
  contractId: string;
  cognitoUser: any;
  productOfferRequested: {
    dni: string;
    offerId: string | undefined;
    conditions: {
      currency: string | undefined;
      creditLine: any;
      tea: number;
      tcea: number;
      billingDay?: number;
      desgravamen: number;
      payDay: number;
      maxValueDesgravamen: number;
    };
  };
  dataProtectionClauseAccepted: any;
}

export interface Lead {
  id?: string;
  address?: string;
  billingDay?: number;
  bornDate?: string;
  codClaveCIC?: string;
  codUnicoCLI?: string;
  currency?: string;
  department?: string;
  desgravamen: number;
  district?: string;
  dni?: string;
  email?: string;
  maxCreditLine: number;
  maxValueDesgravamen: number,
  minCreditLine: number;
  monthlyCost?: number;
  name?: string;
  payDay: number;
  phoneNumber?: string;
  plan?: number;
  productDescription?: string;
  province?: string;
  status?: string;
  surname1?: string;
  surname2?: string;
  tcea: number;
  tea: number;
  type?: string;
}

export interface InputVtl {
  user: string;
  leadId: string;
  acceptDataProtection: boolean;
  amountOfCredit: number;
}

export interface ContractSnapshotDocument {
  bucket: string;
  key: string;
  type: string;
};

export interface ContractRequestedInput {
  user: string;
  leadId: string;
  acceptDataProtection: boolean;
  amountOfCredit: number;
};

export interface ContractRequestedLead {
  id?: string;
  address?: string;
  billingDay?: number;
  bornDate?: string;
  codClaveCIC?: string;
  codUnicoCLI?: string;
  currency?: string;
  department?: string;
  desgravamen: number;
  district?: string;
  dni?: string;
  email?: string;
  maxCreditLine: number;
  maxValueDesgravamen: number,
  minCreditLine: number;
  monthlyCost?: number;
  name?: string;
  payDay: number;
  phoneNumber?: string;
  plan?: number;
  productDescription?: string;
  province?: string;
  status?: string;
  surname1?: string;
  surname2?: string;
  tcea: number;
  tea: number;
  type?: string;
}
