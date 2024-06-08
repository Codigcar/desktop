import { ERROR_CODES, OFFER_STATUS, UUID_REGEX } from 'src/utils/constants';
import { ERROR } from 'src/utils/errors';
import { logger } from 'src/utils/logger.util';

interface PostAuthorizer {
  acceptDataProtection: boolean;
  amountOfCredit: Number;
};

const validateRequest = (offerId: string, body: PostAuthorizer) => {
  if (!offerId) {
    logger.error(`OfferId not found: ${offerId}`)
  }

  if (!UUID_REGEX.test(offerId)) {
    logger.error(`Invalid offerId: must be in the format of uuid`)
  }

  if (!body) {
    logger.error(`Body not found.`)
  }

  const { acceptDataProtection, amountOfCredit } = body;

  if (acceptDataProtection == null) {
    throw new ERROR.BadRequestError(JSON.stringify({
      code: ERROR_CODES.INVALID_REQUEST,
      message: 'acceptDataProtection not found.',
      details: [{
        message: 'acceptDataProtection is required'
      }]
    }));
  }

  if (typeof acceptDataProtection !== 'boolean') {
    throw new ERROR.BadRequestError(JSON.stringify({
      code: ERROR_CODES.INVALID_REQUEST,
      message: 'acceptDataProtection is not valid.',
      details: [{
        message: 'acceptDataProtection must be of type boolean'
      }]
    }));
  }

  if (!amountOfCredit) {
    throw new ERROR.BadRequestError(JSON.stringify({
      code: ERROR_CODES.INVALID_REQUEST,
      message: 'amountOfCredit not found.',
      details: [{
        message: 'amountOfCredit is required'
      }]
    }));
  }

  if (typeof amountOfCredit !== 'number') {
    throw new ERROR.BadRequestError(JSON.stringify({
      code: ERROR_CODES.INVALID_REQUEST,
      message: 'amountOfCredit is not valid.',
      details: [{
        message: 'amountOfCredit must be of type number'
      }]
    }));
  }
};

const validateProductOffer = (productOffer: any, userDni: string, creditLine: number) => {
  const amountOfCredit = creditLine;

  if (productOffer.dni !== userDni) {
    throw new ERROR.InconsistencyError(JSON.stringify({
      code: ERROR_CODES.INCONSISTENCY_ERROR,
      message: 'Inconsistency error.',
      details: [{
        message: 'The user\'s dni does not correspond to the dni of the product offer'
      }]
    }));
  }

  if (productOffer.status !== OFFER_STATUS.READY) {
    if (productOffer.status === OFFER_STATUS.CONSUMED) {
      throw new ERROR.leadAcquiredError(JSON.stringify({
        code: ERROR_CODES.OFFER_CONSUMED,
        message: 'Offer failed precondition.',
        details: [{
          message: 'The offer has already been consumed.'
        }]
      }));
    }

    throw new ERROR.leadInactiveError(JSON.stringify({
      code: ERROR_CODES.OFFER_NOT_READY,
      message: 'Offer failed precondition.',
      details: [{
        message: 'The offer is not in \'ready\' status'
      }]
    }));
  }

  if (productOffer.maxCreditLine < amountOfCredit) {
    throw new ERROR.InvalidCreditError(JSON.stringify({
      code: ERROR_CODES.INVALID_CREDIT,
      message: `Invalid credit amount.`,
      details: [{
        message: 'The credit line was exceeded.'
      }]
    }));
  }

  if (productOffer.minCreditLine > amountOfCredit) {
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
  validateRequest,
  validateProductOffer
};
