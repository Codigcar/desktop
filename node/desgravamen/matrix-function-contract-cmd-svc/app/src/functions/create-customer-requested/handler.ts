import { injectLambdaContext } from '@aws-lambda-powertools/logger';
import { captureLambdaHandler } from '@aws-lambda-powertools/tracer';
import middy from '@middy/core';
import errorLogger from '@middy/error-logger';
import validator from '@middy/validator';
import eventNormalizer from '@middy/event-normalizer';
import { transpileSchema } from '@middy/validator/transpile';
import createCustomerRequestedService from 'src/services/create-customer-requested/service';
import { logger, tracer } from 'src/utils/logger.util';
import { eventSchemaCreateCustomerRequested } from 'src/utils/schema.util';
import { consumeMessages_v2 } from 'src/utils/utils';

export const createCustomerRequestedHandler = async (event: any) => {
  const {
    MSK_TOPIC_OFFER_AUTHORIZED,
    MSK_TOPIC_CUSTOMER_REQUESTED
  } = process.env;

  try {
    logger.debug('Event', JSON.stringify(event));
    const { messages, errors } = await consumeMessages_v2([MSK_TOPIC_OFFER_AUTHORIZED], event);
    const filteredMessages = await createCustomerRequestedService.filterMessages(messages);
    const preparedMessages = await createCustomerRequestedService.prepareMessages(MSK_TOPIC_CUSTOMER_REQUESTED, filteredMessages);
    logger.debug('Outcoming messages', JSON.stringify(preparedMessages));

    await createCustomerRequestedService.produceMessagesToTopic(MSK_TOPIC_CUSTOMER_REQUESTED, preparedMessages);

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

export const handler = middy(createCustomerRequestedHandler)
  .use(
    validator({
      eventSchema: transpileSchema(eventSchemaCreateCustomerRequested),
    })
  )
  .use(eventNormalizer())
  .use(errorLogger())
  .use(injectLambdaContext(logger, { clearState: true }))
  .use(captureLambdaHandler(tracer));
