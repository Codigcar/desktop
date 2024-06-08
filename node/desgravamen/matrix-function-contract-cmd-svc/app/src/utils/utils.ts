import { AppError, ErrorCodes, ErrorMessages } from 'src/utils/error';
import { base64regex, indexTable, USER_PREFIX } from './constants';
import { DataEvent, MSKRecord, MSKRecordEvent, MessageDocumentCreated, kafkaEventDecodingByMiddleware, kafkaEventDecodingByMiddlewareRecord } from './interfaces';
import dynamoDBAdapter from 'src/adapters/dynamodb.adapter';
import { logger } from 'src/utils/logger.util';

export const consumeMessages = async (topicsName: any, input: any) => {
  logger.debug('Function consumeMessages');
  if (!input.records) {
    throw new AppError(ErrorCodes.EMPTY_EVENT);
  }
  const messages = await readMessageByTopic(topicsName, Object.values(input.records));
  return messages;
};

export const consumeMessages_v2 = async (topicsName: any, input: kafkaEventDecodingByMiddleware) => {
  logger.debug('Function consumeMessages');
  if (!input.records) {
    throw new AppError(ErrorCodes.EMPTY_EVENT);
  }
  const messages = readMessageByTopic_v2(topicsName, input.records);
  return messages;
};


export const readMessageByTopic_v2 = (topicsName: string[], records: kafkaEventDecodingByMiddlewareRecord) => {
  logger.debug('Function readMessageByTopic');
  let messages: DataEvent[] = [];
  const errors: any = [];

  const messagesByTopic = Object.values(records)
  for (let j = 0; j < messagesByTopic.length; j++) {
    const groupByTopic = messagesByTopic[j];

    groupByTopic.forEach(message => {
      messages.push(message.value);
    })
  }

  assignAuthorLoggerKey_v2(messages);
  return { messages, errors };
};

export const assignAuthorLoggerKey_v2 = (messages: DataEvent[]) => {
  try {
    if (messages.length > 0) {
      const eventData = messages[0];
      if (!eventData.author) {
        return;
      }
      const author = eventData.author.includes(USER_PREFIX)
        ? eventData.author.replace(USER_PREFIX, '')
        : eventData.author;
      logger.appendKeys({ author });
    }
  } catch (error) {
    logger.error(JSON.stringify({ error }));
  }
};

export const readMessageByTopic = (topicsName: string[], records: MSKRecord[][]) => {
  logger.debug('Function readMessageByTopic');
  const messages = [];
  const errors: any = [];

  for (const record of records) {
    const iRecord = record as MSKRecordEvent[];
    for (const recordData of iRecord) {
      if (!base64regex.test(recordData.value)) {
        errors.push({
          key: recordData.key,
          errorCode: ErrorCodes.VALUE_NOT_BASE64,
          errorMessage: ErrorMessages[ErrorCodes.VALUE_NOT_BASE64],
        });
        continue;
      }

      const msg = Buffer.from(recordData.value, 'base64').toString();
      logger.debug(`Incoming event: ${msg}`);
      const eventData = JSON.parse(msg);

      if (!topicsName.includes(eventData.type)) {
        errors.push({
          key: recordData.key,
          errorCode: ErrorCodes.INVALID_EVENT_TYPE,
          errorMessage: ErrorMessages[ErrorCodes.INVALID_EVENT_TYPE],
        });
        continue;
      }

      messages.push(msg);
    }
  }

  assignAuthorLoggerKey(messages);

  return { messages, errors };
};

export const assignAuthorLoggerKey = (messages: string[]) => {
  try {
    if (messages.length > 0) {
      const eventData = JSON.parse(messages[0]);
      if (!eventData.author) {
        return;
      }
      const author = eventData.author.includes(USER_PREFIX)
        ? eventData.author.replace(USER_PREFIX, '')
        : eventData.author;
      logger.appendKeys({ author });
    }
  } catch (error) {
    logger.error(JSON.stringify({ error }));
  }
};

export const existsContractEvent = async (transactionId: string, type: string) => {
  logger.debug(`Checking idempotence for transaction=${transactionId} and type=${type}`);
  let existsContractEvent = false;

  try {
    const params = {
      TableName: process.env.CONTRACT_EVENT_STORE_TABLE_NAME!,
      IndexName: indexTable.contract.byTransactionType,
      KeyConditionExpression: '#transaction = :transactionId and #type = :type',
      ScanIndexForward: false,
      ExpressionAttributeValues: {
        ':transactionId': transactionId,
        ':type': type,
      },
      ExpressionAttributeNames: {
        '#transaction': 'transaction',
        '#type': 'type',
      },
    };

    const { Items: contractEvent } = await dynamoDBAdapter.query(params);
    existsContractEvent = contractEvent ? contractEvent.length > 0 : false;

    if (existsContractEvent) {
      logger.warn(`Contract event already exists for transaction=${transactionId} and type=${type}`);
      return contractEvent;
    } else {
      logger.info(`Checking idempotence OK`);
      return false;
    }
  } catch (error) {
    logger.error(`Error in Checking idempotence for transaction=${transactionId} and type=${type}`);
    logger.error(JSON.stringify({ error }));
    return false;
  }
};

export const formatedFirstLetterCapital = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase();
}

export const formatedFullName = (name: string, lastname: string) => {
  const newName = name.split(' ').map(n => formatedFirstLetterCapital(n)).join(' ');
  const newLastname = lastname.split(' ').map(n => formatedFirstLetterCapital(n)).join(' ');
  return `${newName} ${newLastname}`
}
