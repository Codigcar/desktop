import { injectLambdaContext } from '@aws-lambda-powertools/logger';
import { captureLambdaHandler } from '@aws-lambda-powertools/tracer';
import middy from '@middy/core';
import errorLogger from '@middy/error-logger';
import validator from '@middy/validator';
import eventNormalizer from '@middy/event-normalizer';
import { transpileSchema } from '@middy/validator/transpile';
import DocumentCreatedService from 'src/services/document-created/service';
import { logger, tracer } from 'src/utils/logger.util';
import { eventSchemaDocumentCreated } from 'src/utils/schema.util';
import { consumeMessages_v2 } from 'src/utils/utils';

const documentCreatedHandler = async (event: any) => {
  const {
    MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_COMPLETED
  } = process.env;
  try {
    const { messages, errors } = await consumeMessages_v2([MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_COMPLETED], event);
    await DocumentCreatedService.saveEvent(messages as any);

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

export const handler = middy(documentCreatedHandler)
  .use(
    validator({
      eventSchema: transpileSchema(eventSchemaDocumentCreated),
    })
  )
  .use(eventNormalizer())
  .use(errorLogger())
  .use(injectLambdaContext(logger, { clearState: true }))
  .use(captureLambdaHandler(tracer));
