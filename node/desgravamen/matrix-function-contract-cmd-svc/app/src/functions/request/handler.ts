import { injectLambdaContext } from '@aws-lambda-powertools/logger';
import { captureLambdaHandler } from '@aws-lambda-powertools/tracer';
import middy from '@middy/core';
import { logger, tracer } from 'src/utils/logger.util';
import validator from '@middy/validator';
import { transpileSchema } from '@middy/validator/transpile';
import { schemaRequestInput } from 'src/utils/schema.util';
import contractRequestedService from 'src/services/request/request.service';
import errorLogger from '@middy/error-logger';

const requestHandler = async (event: any) => {
  try {
    logger.debug('event: ', JSON.stringify(event));
    await contractRequestedService.saveEvent([event]);
    return 'OK';
  } catch (error: any) {
    logger.error(error.message);
    throw error;
  }
};

export const handler = middy(requestHandler)
  .use(
    validator({
      eventSchema: transpileSchema(schemaRequestInput),
    })
  )
  .use(errorLogger())
  .use(injectLambdaContext(logger, { clearState: true }))
  .use(captureLambdaHandler(tracer));
