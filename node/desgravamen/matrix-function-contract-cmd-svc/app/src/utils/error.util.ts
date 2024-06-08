import { IErrorMessage, IMessage } from 'src/interfaces/error.interface';
import { logger } from 'src/utils/logger.util';
import { NotFound } from 'http-errors';
import { ErrorCodes } from 'src/enums/errorCodes.enum';

const processInvalidRequestDetails = (details: IMessage[] | any): IMessage[] => {
  const messages: IMessage[] = [];

  for (const detail of details) {
    messages.push({
      message: `${detail.message}`,
    });
  }

  return messages;
};

export const createErrorMessage = (code: string, message: string, details: IMessage[] = []): IErrorMessage => {
  const messages: IMessage[] = code === ErrorCodes.INVALID_REQUEST ? processInvalidRequestDetails(details) : details;

  return {
    code,
    message,
    details: messages,
  };
};

export const customizeErrorMessage = (params: string) => {
  const [code, message, messageDetails] = params.split(',');
  const details: IMessage[] = JSON.parse(messageDetails);
  logger.info('view params', { viewParams: { code, message, details } });

  return createErrorMessage(code, message, details);
};
