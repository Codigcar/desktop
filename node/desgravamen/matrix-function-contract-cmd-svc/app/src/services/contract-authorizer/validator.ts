import { ERROR_CODES, OFFER_STATUS, LEAD_STATUS } from 'src/utils/constants';
import { ERROR } from 'src/utils/errors';

const validateLead = (lead: any, userDni: string, acceptDataProtection: boolean, amountOfCredit: number) => {

  if (lead.dni !== userDni) {
    throw new ERROR.InconsistencyError(JSON.stringify({
      code: ERROR_CODES.INCONSISTENCY_ERROR,
      message: 'Inconsistency error.',
      details: [{
        message: 'The user\'s dni does not correspond to the dni of the lead'
      }]
    }));
  }

  if (lead.status !== LEAD_STATUS.ACTIVE && lead.status !== LEAD_STATUS.RESERVED) {
    if (lead.status === LEAD_STATUS.ACQUIRED) {
      throw new ERROR.leadAcquiredError(JSON.stringify({
        code: ERROR_CODES.LEAD_ACQUIRED,
        message: 'Lead failed precondition.',
        details: [{
          message: 'The lead has already been acquired.'
        }]
      }));
    }

    throw new ERROR.leadInactiveError(JSON.stringify({
      code: ERROR_CODES.LEAD_NOT_ACTIVE,
      message: 'Lead failed precondition.',
      details: [{
        message: 'The lead is not in \'active\' status'
      }]
    }));
  }

  if (lead.maxCreditLine < amountOfCredit) {
    throw new ERROR.InvalidCreditError(JSON.stringify({
      code: ERROR_CODES.INVALID_CREDIT,
      message: `Invalid credit amount.`,
      details: [{
        message: 'The credit line was exceeded.'
      }]
    }));
  }

  if (lead.minCreditLine > amountOfCredit) {
    throw new ERROR.InvalidCreditError(JSON.stringify({
      code: ERROR_CODES.INVALID_CREDIT,
      message: 'Invalid credit amount.',
      details: [{
        message: 'The credit line is less than authorized.'
      }]
    }));
  }
};

export {
  validateLead
};
