import { injectLambdaContext } from '@aws-lambda-powertools/logger';
import { captureLambdaHandler } from '@aws-lambda-powertools/tracer';
import middy from '@middy/core';
import validator from '@middy/validator';
import { transpileSchema } from '@middy/validator/transpile';
import { logger, tracer } from 'src/utils/logger.util';
import { consumeMessages_v2 } from 'src/utils/utils';
import { eventSchemaOfferAcquisitionCompleted } from '../../utils/schema.util';
import offerAcquisitionCompletedService from 'src/services/offer-acquisition-completed/offer-acquisition-completed.service';
import errorLogger from '@middy/error-logger';
import eventNormalizer from '@middy/event-normalizer';

const offerAcquisitionCompletedHandler = async (event: any) => {
  const { MSK_TOPIC_ACCOUNT_CREATED, MSK_TOPIC_CARD_EMITTED } = process.env;

  try {
    logger.debug('offerAcquisitionCompletedHandler: ', JSON.stringify(event));
    const { messages, errors } = await consumeMessages_v2([MSK_TOPIC_ACCOUNT_CREATED, MSK_TOPIC_CARD_EMITTED], event);
    await offerAcquisitionCompletedService.completeAcquisitions(messages);

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

export const handler = middy(offerAcquisitionCompletedHandler)
  .use(
    validator({
      eventSchema: transpileSchema(eventSchemaOfferAcquisitionCompleted),
    })
  )
  .use(eventNormalizer())
  .use(errorLogger())
  .use(injectLambdaContext(logger, { clearState: true }))
  .use(captureLambdaHandler(tracer));
