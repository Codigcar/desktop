import { injectLambdaContext } from '@aws-lambda-powertools/logger';
import { captureLambdaHandler } from '@aws-lambda-powertools/tracer';
import middy from '@middy/core';
import validator from '@middy/validator';
import { transpileSchema } from '@middy/validator/transpile';
import errorLogger from '@middy/error-logger';
import eventNormalizer from '@middy/event-normalizer';
import { logger, tracer } from 'src/utils/logger.util';
import { consumeMessages_v2 } from 'src/utils/utils';
import { eventSchemaRollback } from 'src/utils/schema.util';
import rollbackService from 'src/services/rollback/rollback.service';

const rollbackHandler = async (event: any) => {

  const topics = [
    process.env.MSK_TOPIC_CARD_REGISTER_FAILED,
    process.env.MSK_TOPIC_CUSTOMER_CREATION_FAILED,
    process.env.MSK_TOPIC_DOCUMENT_TEMPLATE_RENDER_FAILED,
  ];

  try {
    logger.debug('offerAcquisitionCompletedHandler: ', JSON.stringify(event));
    const { messages, errors } = await consumeMessages_v2(topics, event);

    await rollbackService.rollbackByTopic(messages);

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

export const handler = middy(rollbackHandler)
  .use(validator({ eventSchema: transpileSchema(eventSchemaRollback) }))
  .use(eventNormalizer())
  .use(errorLogger())
  .use(injectLambdaContext(logger, { clearState: true }))
  .use(captureLambdaHandler(tracer));
