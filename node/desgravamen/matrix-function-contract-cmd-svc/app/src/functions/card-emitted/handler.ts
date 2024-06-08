import { injectLambdaContext } from '@aws-lambda-powertools/logger';
import { captureLambdaHandler } from '@aws-lambda-powertools/tracer';
import middy from '@middy/core';
import { logger, tracer } from 'src/utils/logger.util';
import { consumeMessages_v2 } from 'src/utils/utils';

import validator from '@middy/validator';
import { transpileSchema } from '@middy/validator/transpile';
import { eventSchemaCardEmitted } from 'src/utils/schema.util';
import cardEmittedService from 'src/services/card-emitted/card-emitted.service';
import errorLogger from '@middy/error-logger';
import eventNormalizer from '@middy/event-normalizer';

const cardEmittedHandler = async (event: any) => {
  const { MSK_TOPIC_CARD_EMITTED } = process.env;
  try {
    logger.debug('event: ', JSON.stringify(event));
    const { messages, errors } = await consumeMessages_v2([MSK_TOPIC_CARD_EMITTED], event);
    await cardEmittedService.saveEvent(messages);

    if (errors.length !== 0) {
      logger.error('Error: ', JSON.stringify(errors));
      return errors;
    }

    return 'OK';
  } catch (error: any) {
    logger.error(error.message);
    throw error;
  }
};

export const handler = middy(cardEmittedHandler)
  .use(
    validator({
      eventSchema: transpileSchema(eventSchemaCardEmitted),
    })
  )
  .use(eventNormalizer())
  .use(errorLogger())
  .use(injectLambdaContext(logger, { clearState: true }))
  .use(captureLambdaHandler(tracer));
