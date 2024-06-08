import { injectLambdaContext } from '@aws-lambda-powertools/logger';
import { captureLambdaHandler } from '@aws-lambda-powertools/tracer';
import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import errorLogger from '@middy/error-logger';
import { validateLead } from 'src/services/contract-authorizer/validator';
import { ERROR } from 'src/utils/errors';
import { logger, tracer } from 'src/utils/logger.util';
import contractAuthorizerService from 'src/services/contract-authorizer/service';
import { InputVtl } from 'src/utils/interfaces';
import { JsonResponse } from 'src/utils/response';

const contractAuthorizerHandler = async (event: any) => {
  try {
    logger.info(`event: ${JSON.stringify(event)}`);

    const input: InputVtl = event;

    const { user, leadId, acceptDataProtection, amountOfCredit } = input;

    logger.appendKeys({ author: user });

    const { userData, userDocumentNumber } = await contractAuthorizerService.getCognitoUserData(user);
    logger.debug(`userData: ${JSON.stringify(userData)}, userDocumentNumber=${userDocumentNumber}`);

    const lead = await contractAuthorizerService.findLeadById(leadId);

    validateLead(lead, userDocumentNumber, acceptDataProtection, amountOfCredit);

    const contractData = contractAuthorizerService.prepareContractData(userData, userDocumentNumber, lead, acceptDataProtection, amountOfCredit);

    const contractEventStoreData = contractAuthorizerService.newEventContractStoreData(contractData);

    await contractAuthorizerService.saveContractEventStore(contractEventStoreData);
    logger.debug(`save ContractEventStoreData: ${JSON.stringify(contractEventStoreData)}`);

    return JSON.stringify({
      message: "Offer accepted.",
      transactionId: contractData.contractId,
    });

  } catch (error: any) {
    logger.error(error.message);
    const errorResponse = getErrorResponse(error);
    throw new Error(JSON.stringify(errorResponse));
  }
}

const getErrorResponse = (error: any) => {
  const errorMessage = JSON.parse(error.message);

  if (
    error instanceof ERROR.UserNotFoundError ||
    error instanceof ERROR.LeadNotFoundError
  ) {
    return JsonResponse._404(
      errorMessage.code,
      errorMessage.message,
      errorMessage.details
    );
  } else if (
    error instanceof ERROR.leadAcquiredError ||
    error instanceof ERROR.leadInactiveError ||
    error instanceof ERROR.InvalidCreditError
  ) {
    return JsonResponse._412(
      errorMessage.code,
      errorMessage.message,
      errorMessage.details
    );
  } else if (error instanceof ERROR.InconsistencyError) {
    return JsonResponse._custom(
      500,
      errorMessage.code,
      errorMessage.message,
      errorMessage.details
    );
  }

  return JsonResponse._500("Something went wrong", []);
};

export const handler = middy(contractAuthorizerHandler)
  .use(errorLogger())
  .use(httpErrorHandler())
  .use(injectLambdaContext(logger, { clearState: true, logEvent: true }))
  .use(captureLambdaHandler(tracer));
