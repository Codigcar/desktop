import { injectLambdaContext } from '@aws-lambda-powertools/logger';
import { captureLambdaHandler } from '@aws-lambda-powertools/tracer';
import middy from '@middy/core';
import errorLogger from '@middy/error-logger';
import validator from '@middy/validator';
import eventNormalizer from '@middy/event-normalizer';
import { transpileSchema } from '@middy/validator/transpile';
import CreateCardRequestedService from 'src/services/create-card-requested/service';
import { logger, tracer } from 'src/utils/logger.util';
import { eventSchemaCreateCardRequested } from 'src/utils/schema.util';
import { consumeMessages, consumeMessages_v2 } from 'src/utils/utils';

const createCardRequestedHandler = async (event: any) => {
  const {
    MSK_TOPIC_CUSTOMER_VALIDATED,
  } = process.env;
  
  try {
    const { messages, errors } = await consumeMessages_v2([MSK_TOPIC_CUSTOMER_VALIDATED], event);
    await CreateCardRequestedService.saveContractEventStore(messages);

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

export const handler = middy(createCardRequestedHandler)
  .use(
    validator({
      eventSchema: transpileSchema(eventSchemaCreateCardRequested),
    })
  )
  .use(eventNormalizer())
  .use(errorLogger())
  .use(injectLambdaContext(logger, { clearState: true }))
  .use(captureLambdaHandler(tracer));
