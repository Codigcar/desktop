export class AppError extends Error {
  errorCode: string;

  constructor(errorCode: string) {
    const message: string = ErrorMessages[errorCode as keyof typeof ErrorMessages];
    super(message);
    this.errorCode = errorCode;

    Object.setPrototypeOf(this, AppError.prototype);
  }

  getErrorMessage() {
    return 'Error: ' + this.message;
  }
}

export enum ErrorCodes {
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  INVALID_EVENT_TYPE = 'INVALID_EVENT_TYPE',
  EMPTY_EVENT = 'EMPTY_EVENT',
  VALUE_NOT_BASE64 = 'VALUE_NOT_BASE64',
  KAFKA_CLIENT_ERROR = 'KAFKA_CLIENT_ERROR',
  EVENT_NOT_FOUND = 'EVENT_NOT_FOUND',
};

export enum ErrorMessages {
  'INTERNAL_SERVER_ERROR' = 'Internal server error.',
  'INVALID_EVENT_TYPE' = 'The event type is invalid.',
  'EMPTY_EVENT' = 'The event has no content.',
  'VALUE_NOT_BASE64' = 'The event value is not Base64 encoded.',
  'KAFKA_CLIENT_ERROR' = 'There is an error with the kafka client.'
};
