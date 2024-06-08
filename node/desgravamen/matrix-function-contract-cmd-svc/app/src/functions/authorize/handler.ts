import { injectLambdaContext } from '@aws-lambda-powertools/logger';
import { captureLambdaHandler } from '@aws-lambda-powertools/tracer';
import middy from '@middy/core';
import errorLogger from '@middy/error-logger';
import { logger, tracer } from 'src/utils/logger.util';
import contractAuthorizerService from 'src/services/authorize/service';
import eventNormalizer from '@middy/event-normalizer';
import { consumeMessages_v2 } from 'src/utils/utils';

const authorizeHandler = async (event: any) => {
  logger.info(event);
  const { MSK_TOPIC_CHALLENGE_APPROVED } = process.env;
  try {
    const { messages, errors } = await consumeMessages_v2([MSK_TOPIC_CHALLENGE_APPROVED], event);

    if (errors.length !== 0) {
      logger.error('Error: ', JSON.stringify(errors));
      return errors;
    }
    const newItem = await contractAuthorizerService.saveEvent(messages);

    return newItem;
  } catch (error: any) {
    logger.error(error);
  }
};

export const handler = middy(authorizeHandler)
  .use(eventNormalizer())
  .use(errorLogger())
  .use(injectLambdaContext(logger, { clearState: true }))
  .use(captureLambdaHandler(tracer));
