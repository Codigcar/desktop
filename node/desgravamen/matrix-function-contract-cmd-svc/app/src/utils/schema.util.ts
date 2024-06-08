import { eventProperties } from './constants';
const MSK_TOPIC_CARD_EMITTED: string = process.env.MSK_TOPIC_CARD_EMITTED!;
const MSK_TOPIC_ACCOUNT_CREATED: string = process.env.MSK_TOPIC_ACCOUNT_CREATED!;
const MSK_TOPIC_OFFER_AUTHORIZED: string = process.env.MSK_TOPIC_OFFER_AUTHORIZED!;
const MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_REQUESTED: string = process.env.MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_REQUESTED!;
const MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_COMPLETED: string = process.env.MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_COMPLETED!;
const MSK_TOPIC_CARD_REGISTER_FAILED: string = process.env.MSK_TOPIC_CARD_REGISTER_FAILED!;
const MSK_TOPIC_CUSTOMER_CREATION_FAILED: string = process.env.MSK_TOPIC_CUSTOMER_CREATION_FAILED!;
const MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_FAILED: string = process.env.MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_FAILED!;
const MSK_TOPIC_CONTRACT_RELEASED: string = process.env.MSK_TOPIC_CONTRACT_RELEASED!;
const MSK_TOPIC_DOCUMENT_CREATED: string = process.env.MSK_TOPIC_DOCUMENT_CREATED!;
const MSK_TOPIC_CUSTOMER_REQUESTED: string = process.env.MSK_TOPIC_CUSTOMER_REQUESTED!;
const MSK_TOPIC_CUSTOMER_CREATED: string = process.env.MSK_TOPIC_CUSTOMER_CREATED!;
const MSK_TOPIC_CUSTOMER_VALIDATED: string = process.env.MSK_TOPIC_CUSTOMER_VALIDATED!;

const keyTopicCardEmitted = `^${MSK_TOPIC_CARD_EMITTED}-[0-9]*$`;
const keyTopicAccountCreated = `^${MSK_TOPIC_ACCOUNT_CREATED}-[0-9]*$`;
const keyTopicOfferAuthorized = `^${MSK_TOPIC_OFFER_AUTHORIZED}-[0-9]*$`;
const keyTopicDocumentTemplateRenderRequested = `^${MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_REQUESTED}-[0-9]*$`;
const keyTopicDocumentCreated = `^${MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_COMPLETED}-[0-9]*$`;
const keyTopicOfferAcquisitionCompleted = `(${keyTopicCardEmitted}|${keyTopicAccountCreated})`;
const keyTopicCardRegisterFailed = `^${MSK_TOPIC_CARD_REGISTER_FAILED}-[0-9]*$`;
const keyTopicCustomerCreationFailed = `^${MSK_TOPIC_CUSTOMER_CREATION_FAILED}-[0-9]*$`;
const keyTopicDocumentTemplateRenderFailed = `^${MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_FAILED}-[0-9]*$`;
const keyTopicRollback = `(${keyTopicCardRegisterFailed}|${keyTopicCustomerCreationFailed}|${keyTopicDocumentTemplateRenderFailed})`;
const keyTopicCardContractReleased = `^${MSK_TOPIC_CONTRACT_RELEASED}-[0-9]*$`;
const keyTopicCardDocumentCreated = `^${MSK_TOPIC_DOCUMENT_CREATED}-[0-9]*$`;
const keyTopicSendDocument = `(${keyTopicCardContractReleased}|${keyTopicCardDocumentCreated})`;
const keyTopicCustomerValidated = `^${MSK_TOPIC_CUSTOMER_VALIDATED}-[0-9]*$`;

const commonPropertiesMskEvent = {
  [eventProperties.partition]: { type: 'number' },
  [eventProperties.offset]: { type: 'number' },
  [eventProperties.timestamp]: { type: 'number' },
  [eventProperties.timestampType]: { type: 'string' },
  [eventProperties.key]: { type: 'string' },
  [eventProperties.value]: {
    type: 'string',
    contentEncoding: 'base64',
  },
};
const keyTopicCustomerRequested = `^${MSK_TOPIC_CUSTOMER_REQUESTED}-[0-9]*$`;
const keyTopicCustomerCreated = `^${MSK_TOPIC_CUSTOMER_CREATED}-[0-9]*$`;

export const eventSchemaCardEmitted = {
  type: 'object',
  required: [eventProperties.eventSource, eventProperties.eventSourceArn, eventProperties.records],
  properties: {
    [eventProperties.eventSource]: {
      type: 'string',
    },
    [eventProperties.eventSourceArn]: {
      type: 'string',
    },
    [eventProperties.records]: {
      type: 'object',
      additionalProperties: false,
      patternProperties: {
        [keyTopicCardEmitted]: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              [eventProperties.topic]: {
                type: 'string',
                enum: [MSK_TOPIC_CARD_EMITTED],
              },
              ...commonPropertiesMskEvent,
            },
          },
        },
      },
    },
  },
};

export const eventSchemaAccountCreated = {
  type: 'object',
  required: [eventProperties.eventSource, eventProperties.eventSourceArn, eventProperties.records],
  properties: {
    [eventProperties.eventSource]: {
      type: 'string',
    },
    [eventProperties.eventSourceArn]: {
      type: 'string',
    },
    [eventProperties.records]: {
      type: 'object',
      additionalProperties: false,
      patternProperties: {
        [keyTopicAccountCreated]: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              [eventProperties.topic]: {
                type: 'string',
                enum: [MSK_TOPIC_ACCOUNT_CREATED],
              },
              ...commonPropertiesMskEvent,
            },
          },
        },
      },
    },
  },
};

export const eventSchemaOfferAcquisitionCompleted = {
  type: 'object',
  required: [eventProperties.eventSource, eventProperties.eventSourceArn, eventProperties.records],
  properties: {
    [eventProperties.eventSource]: {
      type: 'string',
    },
    [eventProperties.eventSourceArn]: {
      type: 'string',
    },
    [eventProperties.records]: {
      type: 'object',
      additionalProperties: false,
      patternProperties: {
        [keyTopicOfferAcquisitionCompleted]: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              [eventProperties.topic]: {
                type: 'string',
                enum: [MSK_TOPIC_ACCOUNT_CREATED, MSK_TOPIC_CARD_EMITTED],
              },
              ...commonPropertiesMskEvent,
            },
          },
        },
      },
    },
  },
};

export const schemaContractAuthorizerInput = {
  type: 'object',
  required: ['user', 'leadId', 'acceptDataProtection', 'amountOfCredit'],
  properties: {
    user: {
      type: 'string',
    },
    leadId: {
      type: 'string',
    },
    acceptDataProtection: {
      type: 'boolean',
      errorMessage: {
        type: 'acceptDataProtection must be of type boolean',
      },
    },
    amountOfCredit: {
      type: 'number',
      errorMessage: {
        type: 'amountOfCredit must be of type number',
      },
    },
  },
  errorMessage: {
    type: 'Should be an object',
    required: {
      user: 'user is required',
      leadId: 'leadId is required',
      acceptDataProtection: 'acceptDataProtection is required',
      amountOfCredit: 'amountOfCredit is required',
    },
  },
};

export const eventSchemaDocumentRequested = {
  type: 'object',
  required: [eventProperties.eventSource, eventProperties.eventSourceArn, eventProperties.records],
  properties: {
    [eventProperties.eventSource]: {
      type: 'string',
    },
    [eventProperties.eventSourceArn]: {
      type: 'string',
    },
    [eventProperties.records]: {
      type: 'object',
      patternProperties: {
        [keyTopicOfferAuthorized]: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              [eventProperties.topic]: {
                type: 'string',
                enum: [MSK_TOPIC_OFFER_AUTHORIZED],
              },
              ...commonPropertiesMskEvent,
            },
          },
        },
        [keyTopicDocumentTemplateRenderRequested]: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              [eventProperties.topic]: {
                type: 'string',
                enum: [MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_REQUESTED],
              },
              ...commonPropertiesMskEvent,
            },
          },
        },
      },
    },
  },
};

export const eventSchemaDocumentCreated = {
  type: 'object',
  required: [eventProperties.eventSource, eventProperties.eventSourceArn, eventProperties.records],
  properties: {
    [eventProperties.eventSource]: {
      type: 'string',
    },
    [eventProperties.eventSourceArn]: {
      type: 'string',
    },
    [eventProperties.records]: {
      type: 'object',
      patternProperties: {
        [keyTopicDocumentTemplateRenderRequested]: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              [eventProperties.topic]: {
                type: 'string',
                enum: [MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_COMPLETED],
              },
              ...commonPropertiesMskEvent,
            },
          },
        },
      },
    },
  },
};

export const eventSchemaCreateCustomerRequested = {
  type: 'object',
  required: [eventProperties.eventSource, eventProperties.eventSourceArn, eventProperties.records],
  properties: {
    [eventProperties.eventSource]: {
      type: 'string',
    },
    [eventProperties.eventSourceArn]: {
      type: 'string',
    },
    [eventProperties.records]: {
      type: 'object',
      patternProperties: {
        [keyTopicOfferAuthorized]: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              [eventProperties.topic]: {
                type: 'string',
                enum: [MSK_TOPIC_OFFER_AUTHORIZED],
              },
              ...commonPropertiesMskEvent,
            },
          },
        },
        [keyTopicCustomerRequested]: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              [eventProperties.topic]: {
                type: 'string',
                enum: [MSK_TOPIC_CUSTOMER_REQUESTED],
              },
              ...commonPropertiesMskEvent,
            },
          },
        },
      },
    },
  },
};

export const eventSchemaCustomerCreated = {
  type: 'object',
  required: [eventProperties.eventSource, eventProperties.eventSourceArn, eventProperties.records],
  properties: {
    [eventProperties.eventSource]: {
      type: 'string',
    },
    [eventProperties.eventSourceArn]: {
      type: 'string',
    },
    [eventProperties.records]: {
      type: 'object',
      patternProperties: {
        [keyTopicCustomerCreated]: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              [eventProperties.topic]: {
                type: 'string',
                enum: [MSK_TOPIC_CUSTOMER_CREATED],
              },
              ...commonPropertiesMskEvent,
            },
          },
        },
      },
    },
  },
};

export const eventSchemaCreateCardRequested = {
  type: 'object',
  required: [eventProperties.eventSource, eventProperties.eventSourceArn, eventProperties.records],
  properties: {
    [eventProperties.eventSource]: {
      type: 'string',
    },
    [eventProperties.eventSourceArn]: {
      type: 'string',
    },
    [eventProperties.records]: {
      type: 'object',
      patternProperties: {
        [keyTopicCustomerValidated]: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              [eventProperties.topic]: {
                type: 'string',
                enum: [MSK_TOPIC_CUSTOMER_VALIDATED],
              },
              ...commonPropertiesMskEvent,
            },
          },
        },
      },
    },
  },
};

export const eventSchemaRollback = {
  type: 'object',
  required: [eventProperties.eventSource, eventProperties.eventSourceArn, eventProperties.records],
  properties: {
    [eventProperties.eventSource]: {
      type: 'string',
    },
    [eventProperties.eventSourceArn]: {
      type: 'string',
    },
    [eventProperties.records]: {
      type: 'object',
      patternProperties: {
        [keyTopicRollback]: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              [eventProperties.topic]: {
                type: 'string',
                enum: [
                  MSK_TOPIC_CARD_REGISTER_FAILED,
                  MSK_TOPIC_CUSTOMER_CREATION_FAILED,
                  MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_FAILED,
                ],
              },
              ...commonPropertiesMskEvent,
            },
          },
        },
      },
    },
  },
};

export const eventSchemaSendDocument = {
  type: 'object',
  required: [eventProperties.eventSource, eventProperties.eventSourceArn, eventProperties.records],
  properties: {
    [eventProperties.eventSource]: {
      type: 'string',
    },
    [eventProperties.eventSourceArn]: {
      type: 'string',
    },
    [eventProperties.records]: {
      type: 'object',
      patternProperties: {
        [keyTopicSendDocument]: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              [eventProperties.topic]: {
                type: 'string',
                enum: [MSK_TOPIC_CONTRACT_RELEASED, MSK_TOPIC_DOCUMENT_CREATED],
              },
              ...commonPropertiesMskEvent,
            },
          },
        },
      },
    },
  },
};

export const schemaRequestInput = {
  type: 'object',
  required: ['user', 'leadId', 'acceptDataProtection', 'amountOfCredit'],
  properties: {
    user: {
      type: 'string',
    },
    leadId: {
      type: 'string',
    },
    acceptDataProtection: {
      type: 'boolean',
      errorMessage: {
        type: 'acceptDataProtection must be of type boolean',
      },
    },
    amountOfCredit: {
      type: 'number',
      errorMessage: {
        type: 'amountOfCredit must be of type number',
      },
    },
  },
  errorMessage: {
    type: 'Should be an object',
    required: {
      user: 'user is required',
      leadId: 'leadId is required',
      acceptDataProtection: 'acceptDataProtection is required',
      amountOfCredit: 'amountOfCredit is required',
    },
  },
};
