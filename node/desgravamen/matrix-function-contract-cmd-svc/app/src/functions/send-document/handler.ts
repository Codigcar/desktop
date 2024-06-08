import { injectLambdaContext } from '@aws-lambda-powertools/logger';
import { captureLambdaHandler } from '@aws-lambda-powertools/tracer';
import middy from '@middy/core';
import validator from '@middy/validator';
import eventNormalizer from '@middy/event-normalizer';
import { transpileSchema } from '@middy/validator/transpile';
import errorLogger from '@middy/error-logger';
import { logger, tracer } from 'src/utils/logger.util';
import { consumeMessages_v2 } from 'src/utils/utils';
import { eventSchemaSendDocument } from 'src/utils/schema.util';
import sendDocumentService from 'src/services/send-document/send-document.service';

const sendDocumentHandler = async (event: any) => {
  const topics = [
    process.env.MSK_TOPIC_CONTRACT_RELEASED,
    process.env.MSK_TOPIC_DOCUMENT_CREATED,
  ];

  try {
    logger.debug('sendDocumentHandler: ', JSON.stringify(event));
    const { messages, errors } = await consumeMessages_v2(topics, event);

    const filteredMessages = await sendDocumentService.filterMessages(messages);

    if (filteredMessages?.length! > 0) {
      await sendDocumentService.saveEvent(filteredMessages);
    }

    if (errors.length !== 0) {
      logger.error('Error: ', JSON.stringify(errors));
      return errors;
    }

    return 'OK';
  } catch (error) {
    logger.error(JSON.stringify({ error }));
    throw error;
  }
};

export const handler = middy(sendDocumentHandler)
  .use(validator({ eventSchema: transpileSchema(eventSchemaSendDocument) }))
  .use(eventNormalizer())
  .use(errorLogger())
  .use(injectLambdaContext(logger, { clearState: true }))
  .use(captureLambdaHandler(tracer));
