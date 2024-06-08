import { injectLambdaContext } from '@aws-lambda-powertools/logger';
import { captureLambdaHandler } from '@aws-lambda-powertools/tracer';
import middy from '@middy/core';
import validator from '@middy/validator';
import { transpileSchema } from '@middy/validator/transpile';
import { eventSchemaAccountCreated } from 'src/utils/schema.util';
import { logger, tracer } from 'src/utils/logger.util';
import { consumeMessages_v2 } from 'src/utils/utils';
import accountCreatedService from 'src/services/account-created/account-created.service';
import errorLogger from '@middy/error-logger';
import eventNormalizer from '@middy/event-normalizer';

const accountCreatedHandler = async (event: any) => {
  const { MSK_TOPIC_ACCOUNT_CREATED } = process.env;
  try {
    logger.debug('event: ', JSON.stringify(event));
    const { messages, errors } = await consumeMessages_v2([MSK_TOPIC_ACCOUNT_CREATED], event);
    await accountCreatedService.saveEvent(messages);

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

export const handler = middy(accountCreatedHandler)
  .use(
    validator({
      eventSchema: transpileSchema(eventSchemaAccountCreated),
    })
  )
  .use(eventNormalizer())
  .use(errorLogger())
  .use(injectLambdaContext(logger, { clearState: true }))
  .use(captureLambdaHandler(tracer));
