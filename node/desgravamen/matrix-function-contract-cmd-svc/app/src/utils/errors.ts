class leadAcquiredError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class leadInactiveError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class UserNotFoundError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class OfferNotFoundError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class LeadNotFoundError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class ContractNotFoundError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class InvalidCreditError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class InconsistencyError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class NotAnyRecordFound extends Error {
  constructor(message: string) {
    super(message ? message : 'No previous records found.')
  }
}

class DynamoPut extends Error {
  constructor(message: string) {
    super(message);
  }
}

export const ERROR = {
  leadAcquiredError,
  leadInactiveError,
  UserNotFoundError,
  OfferNotFoundError,
  ContractNotFoundError,
  BadRequestError,
  InvalidCreditError,
  InconsistencyError,
  NotAnyRecordFound,
  DynamoPut,
  LeadNotFoundError
};
