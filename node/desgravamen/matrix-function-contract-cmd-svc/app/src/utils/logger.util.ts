import { LogFormatter, Logger } from '@aws-lambda-powertools/logger';
import { Tracer } from '@aws-lambda-powertools/tracer';
import {
  LogAttributes,
  UnformattedAttributes,
} from '@aws-lambda-powertools/logger/lib/types';
import { formatTimestamp } from './date.util';

const logLevels: any = {
  dev: 'debug',
  qa: 'debug',
  uat: 'verbose',
  prod: 'info',
};
const environment: string = process.env.ENV || 'dev';
class CustomLogFormatter extends LogFormatter {
  formatAttributes(attributes: UnformattedAttributes): LogAttributes {
    return {
      message: attributes.message,
      xRayTraceId: attributes.xRayTraceId || '?',
      loggerName: attributes.lambdaContext?.functionName,
      service: attributes.serviceName,
      timestamp: formatTimestamp(attributes.timestamp),
      level: attributes.logLevel.toLowerCase(),
      env: attributes.environment,
      serviceVersion: attributes.lambdaContext?.functionVersion,
      functionInfo: {
        memoryLimitInMB: attributes.lambdaContext?.memoryLimitInMB,
        coldStart: attributes.lambdaContext?.coldStart,
      },
      requestId: attributes.lambdaContext?.awsRequestId,
    };
  }
}

const customLogFormatter = new CustomLogFormatter();

const logger = new Logger({
  logLevel: process.env.LOG_LEVEL || logLevels[environment],
  logFormatter: customLogFormatter,
  environment,
});

const tracer = new Tracer({
  serviceName: process.env.POWERTOOLS_SERVICE_NAME,
});

export { logger, tracer };
