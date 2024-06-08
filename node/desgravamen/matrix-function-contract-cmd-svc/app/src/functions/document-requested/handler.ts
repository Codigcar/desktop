import { injectLambdaContext } from '@aws-lambda-powertools/logger';
import { captureLambdaHandler } from '@aws-lambda-powertools/tracer';
import middy from '@middy/core';
import errorLogger from "@middy/error-logger";
import validator from "@middy/validator";
import eventNormalizer from '@middy/event-normalizer';
import { transpileSchema } from "@middy/validator/transpile";
import DocumentRequestedService from 'src/services/document-requested/service';
import { logger, tracer } from 'src/utils/logger.util';
import { consumeMessages_v2 } from 'src/utils/utils';
import { eventSchemaDocumentRequested } from 'src/utils/schema.util';

export const documentRequestedHandler = async (event: any) => {
  const {
    MSK_TOPIC_OFFER_AUTHORIZED,
    MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_REQUESTED
  } = process.env;

  try {
    const { messages, errors } = await consumeMessages_v2([MSK_TOPIC_OFFER_AUTHORIZED], event);
    const preparedMessages = await DocumentRequestedService.prepareMessages(MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_REQUESTED!, messages);
    await DocumentRequestedService.produceMessagesToTopic(MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_REQUESTED!, preparedMessages);

    if (errors.length !== 0) {
      logger.error('Error: ', JSON.stringify(errors));
      return errors;
    }

    return 'OK';
  } catch (error: any) {
    logger.error(JSON.stringify({ error }));
    throw error;
  }
};

export const handler = middy(documentRequestedHandler)
  .use(
    validator({
      eventSchema: transpileSchema(eventSchemaDocumentRequested),
    })
  )
  .use(eventNormalizer())
  .use(errorLogger())
  .use(injectLambdaContext(logger, { clearState: true }))
  .use(captureLambdaHandler(tracer));
