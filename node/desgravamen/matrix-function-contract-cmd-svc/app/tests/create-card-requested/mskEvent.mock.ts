import { DataEvent, MSKEvent, MSKRecord } from 'src/utils/interfaces';

const mockContractEvent = {
  source: "ee6a9781-b2b1-4a0a-9d57-909b1306fb96",
  id: 4,
  author: "1a7b9903-b054-42ec-b62e-7ef24c1eb280",
  data: {
    payload: {
      id: "f7172c30-0c9a-4d74-8117-5f2c65bdf1e8",
      cognitoUserName: "1a7b9903-b054-42ec-b62e-7ef24c1eb280",
      customerId: "f7172c30-0c9a-4d74-8117-5f2c65bdf1e8",
      document: {
        documentIssueAt: "1993-12-07T00:00:00Z",
        documentNumber: "46687138"
      },
      email: "luis.guisado.matrix.nuevo@gmail.com",
      email_verified: "false",
      lastName: "GUISADO",
      location: {
        address: "ADDRESS TEST",
        district: "MIRAFLORES",
        peruResident: true,
        province: "STATE TEST",
        state: "STATE TEST"
      },
      name: "LUIS ALBERTO",
      occupation: "r",
      phone_number: "+51966378412",
      phone_number_verified: "true",
      profession: "c",
      status: "ACTIVE",
      workplace: "a"
    },
    snapshot: {
      customer: {
        id: "f7172c30-0c9a-4d74-8117-5f2c65bdf1e8",
        document: {
          documentIssueAt: "1993-12-07T00:00:00Z",
          documentNumber: "46687138"
        },
        email: "luis.guisado.matrix.nuevo@gmail.com",
        email_verified: "false",
        lastName: "GUISADO",
        location: {
          address: "ADDRESS TEST",
          district: "MIRAFLORES",
          peruResident: true,
          province: "STATE TEST",
          state: "STATE TEST"
        },
        name: "LUIS ALBERTO",
        occupation: "r",
        phone_number: "+51966378412",
        phone_number_verified: "true",
        profession: "c",
        status: "ACTIVE",
        workplace: "a"
      },
      document: {
        bucket: "s3-dev-matrix-contract-documents-01",
        key: "20230331_lead/46687138-creditcard_666.pdf",
        type: "pdf"
      },
      offer: {
        id: "lead/46687138-creditcard",
        billingDay: 25,
        conditions: {
          billingDay: 25,
          creditLine: 666,
          currency: "PEN",
          desgravamen: 0.00256,
          maxValueDesgravamen: 20,
          payDay: 12,
          tcea: 0.6274,
          tea: 0.58
        },
        dataProtectionClauseAccepted: true,
        desgravamen: 0.00256,
        maxValueDesgravamen: 20,
        payDay: 12,
        tcea: 0.6274,
        tea: 0.58
      }
    }
  },
  dataContentType: "application/json",
  dataEncodingType: "identity",
  time: 1680274515482,
  transaction: "1-6426f448-1b5095df71db943a09a2156e",
  type: "com.gcredicorp.matrix.card.requested.v1"
};

export const mockMskRecordContentByTopic = (returnCoded = false): string | any => {
  const value = mockEventCustomerValidated;
  const valueDecoded: string = Buffer.from(JSON.stringify(value), 'binary').toString('base64');
  return returnCoded ? valueDecoded : value;
};

export const mockEventCustomerValidated: DataEvent = {
  source: "ee6a9781-b2b1-4a0a-9d57-909b1306fb96",
  id: 3,
  author: "1a7b9903-b054-42ec-b62e-7ef24c1eb280",
  data: {
    payload: {
      id: "f7172c30-0c9a-4d74-8117-5f2c65bdf1e8",
      cognitoUserName: "1a7b9903-b054-42ec-b62e-7ef24c1eb280",
      customerId: "f7172c30-0c9a-4d74-8117-5f2c65bdf1e8",
      document: {
        documentIssueAt: "1993-12-07T00:00:00Z",
        documentNumber: "46687138"
      },
      email: "luis.guisado.matrix.nuevo@gmail.com",
      email_verified: "false",
      lastName: "GUISADO",
      location: {
        address: "ADDRESS TEST",
        district: "MIRAFLORES",
        peruResident: true,
        province: "STATE TEST",
        state: "STATE TEST"
      },
      name: "LUIS ALBERTO",
      occupation: "r",
      phone_number: "+51966378412",
      phone_number_verified: "true",
      profession: "c",
      status: "ACTIVE",
      workplace: "a"
    },
    snapshot: {
      customer: {
        id: "f7172c30-0c9a-4d74-8117-5f2c65bdf1e8",
        document: {
          documentIssueAt: "1993-12-07T00:00:00Z",
          documentNumber: "46687138"
        },
        email: "luis.guisado.matrix.nuevo@gmail.com",
        email_verified: "false",
        lastName: "GUISADO",
        location: {
          address: "ADDRESS TEST",
          district: "MIRAFLORES",
          peruResident: true,
          province: "STATE TEST",
          state: "STATE TEST"
        },
        name: "LUIS ALBERTO",
        occupation: "r",
        phone_number: "+51966378412",
        phone_number_verified: "true",
        profession: "c",
        status: "ACTIVE",
        workplace: "a"
      },
      document: {
        bucket: "s3-dev-matrix-contract-documents-01",
        key: "20230331_lead/46687138-creditcard_666.pdf",
        type: "pdf"
      },
      offer: {
        id: "lead/46687138-creditcard",
        billingDay: 25,
        conditions: {
          billingDay: 25,
          creditLine: 666,
          currency: "PEN",
          desgravamen: 0.00256,
          maxValueDesgravamen: 20,
          payDay: 12,
          tcea: 0.6274,
          tea: 0.58
        },
        dataProtectionClauseAccepted: true,
        desgravamen: 0.00256,
        maxValueDesgravamen: 20,
        payDay: 12,
        tcea: 0.6274,
        tea: 0.58
      }
    }
  },
  dataContentType: "application/json",
  dataEncodingType: "identity",
  time: 1680274511117,
  transaction: "1-6426f448-1b5095df71db943a09a2156e",
  type: "com.gcredicorp.matrix.contract.customer-validated.v1"
}

export const mockDynamoContractEvent = {
  Items: [mockContractEvent],
  Count: 1
}

export const mockMskEvent = (countRecords: number = 1): MSKEvent => {
  const mock: MSKEvent = {
    eventSource: 'aws:kafka',
    eventSourceArn: '',
    records: {
      ["com.gcredicorp.matrix.contract.customer-validated.v1"]: [...Array(countRecords).fill(mockMskRecord())]
    }
  };
  return mock;
};

const mockMskRecord = (): MSKRecord => {
  return {
    topic: "com.gcredicorp.matrix.contract.customer-validated.v1",
    partition: 1,
    key: '1',
    offset: 1,
    timestamp: 1,
    timestampType: 'CREATE_TIME',
    value: mockMskRecordContentByTopic(true)
  };
};
