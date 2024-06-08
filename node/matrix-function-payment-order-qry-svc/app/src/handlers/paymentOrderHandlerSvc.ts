'use strict';

import container from '../common/container';
import TYPES from '../common/types';
import { injectLambdaContext } from '@aws-lambda-powertools/logger';
import { captureLambdaHandler } from '@aws-lambda-powertools/tracer';
import middy from '@middy/core';
import { logger, tracer } from '../utils/logger';

import { I2CService } from "../services/I2CService";

const i2CService = container.get<I2CService>(TYPES.I2CService);

const paymentOrder = async (event) => {
    try {
        const paymentOrder = await i2CService.getPaymentOrder(event);
        logger.info(`${paymentOrder}`);
        return paymentOrder;
    } catch (error) {
        logger.error(`Get payment order error ${error}`);
        throw error;
    }
};

module.exports.main = middy(paymentOrder)
  .use(injectLambdaContext(logger, { clearState: true }))
  .use(captureLambdaHandler(tracer));
