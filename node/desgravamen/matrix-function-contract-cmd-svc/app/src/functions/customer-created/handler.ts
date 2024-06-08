import { injectLambdaContext } from '@aws-lambda-powertools/logger';
import { captureLambdaHandler } from '@aws-lambda-powertools/tracer';
import middy from '@middy/core';
import errorLogger from '@middy/error-logger';
import validator from '@middy/validator';
import eventNormalizer from '@middy/event-normalizer';
import { transpileSchema } from '@middy/validator/transpile';
import customerCreatedService from 'src/services/customer-created/service';
import { logger, tracer } from 'src/utils/logger.util';
import { eventSchemaCustomerCreated } from 'src/utils/schema.util';
import { consumeMessages_v2 } from 'src/utils/utils';

const customerCreatedHandler = async (event: any) => {
  const { MSK_TOPIC_CUSTOMER_CREATED } = process.env;

  try {
    logger.debug('Event', JSON.stringify(event));
    const { messages, errors } = await consumeMessages_v2([MSK_TOPIC_CUSTOMER_CREATED], event);

    logger.debug('Saving messages', JSON.stringify(JSON.stringify(messages)));
    await customerCreatedService.saveContractEventStore(messages);

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

export const handler = middy(customerCreatedHandler)
  .use(
    validator({
      eventSchema: transpileSchema(eventSchemaCustomerCreated),
    })
  )
  .use(eventNormalizer())
  .use(errorLogger())
  .use(injectLambdaContext(logger, { clearState: true }))
  .use(captureLambdaHandler(tracer));