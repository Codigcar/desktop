const https = require("https");
import dayjs from "dayjs";
import { inject, injectable } from "inversify";
import { SecretManagerClient } from "../clients/SecretManagerClient";
import TYPES from "../common/types";
import dynamodbUtil from "../utils/dynamodb.util";
import { logger } from "../utils/logger";
import { Validator } from "../utils/Validator";

@injectable()
export class I2CService {
  constructor(
    @inject(TYPES.Validator) private readonly validator: Validator,
    @inject(TYPES.SecretManagerClient)
    private readonly secretManagerClient: SecretManagerClient
  ) {}

  async getPaymentOrder(data) {
    const [paymentOrders, lastPaymentEvent] = await Promise.all([
      this.getPaymentOrderOfI2C(data),
      this.getLastPaymentEvent(data.user),
    ]);
    this.addFlagForPaymentInProcess(paymentOrders, lastPaymentEvent);
    return this.getDebtPaymentOrdersFromPaymentOrders(paymentOrders);
  }

  async getPaymentOrderOfI2C(data): Promise<any[]> {
    // TODO: Remove TLS workaround for localhost development environment.
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const connectionData = await this.secretManagerClient.getConnectionData();
    logger.info(`id : ${connectionData.id} - Provider : I2C`);
    this.validator.checkObject(data);
    this.validator.checkReference(data.reference);
    const date = new Date().toLocaleDateString("en", {
      timeZone: "America/Lima",
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    const requestData = {
      getCardholderStatement: {
        acquirer: {
          id: connectionData.id,
          userId: connectionData.userId,
          password: connectionData.password,
        },
        card: {
          referenceId: data.reference,
        },
        noOfStatementMonth: "1",
        statementDate: date,
      },
    };
    const postBody = JSON.stringify(requestData);
    logger.info(`Request ${postBody}`);
    const options = {
      hostname: process.env.I2C_HOST,
      port: process.env.I2C_PORT,
      path: process.env.I2C_PATH,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    return new Promise((resolve, reject) => {
      const httpsRequest = https.request(options, (res) => {
        logger.debug(`statusCode: ${res.statusCode}`);
        let response: any;
        res.on("data", (data) => {
          response = JSON.parse(data.toString());
          logger.info(`Response ${JSON.stringify(response)}`);
        });
        res.on("end", () => {
          let paymentOrders = [];
          if (response.getCardholderStatementResponse.responseCode != "00") {
            throw new Error(JSON.stringify(response));
          }

          const cardHolderStatementResponse =
            response.getCardholderStatementResponse;

          const statements = cardHolderStatementResponse.statements.statement;

          statements.forEach((statement) => {
            const remainingStatementBalanceTmp =
              statement.remainingStatementBalance
                ? Number(statement.remainingStatementBalance)
                : 0;

            let statementDateTo;
            if (statement.statementDateTo) {
              statementDateTo = this.formatDate(statement.statementDateTo);
            }

            const dateToday = new Date().toLocaleDateString("sv", {
              timeZone: "America/Lima",
            });

            const type = statementDateTo
              ? statementDateTo >= dateToday // 14 feb > 12 feb
                ? "open"
                : "closed"
              : "open";

            const list = ['open','mora','open']
            paymentOrders.push({
              id: cardHolderStatementResponse.customerId,
              type, //cerrado
              status: remainingStatementBalanceTmp == 0 ? "paid" : "pending", // pendiente
              dueDate: this.formatDate(statement.paymentDueDate),
              startDate: this.formatDate(statement.statementDateFrom),
              endDate: this.formatDate(statementDateTo),
              statementDate: this.formatDate(statement.statementDate),
              total: {
                amount:
                  Number(statement.statementBalance) > 0
                    ? 0
                    : Number(statement.statementBalance) * -1,
                currency: "PEN",
              },
              pending: {
                amount: statement.remainingStatementBalance
                  ? Number(statement.remainingStatementBalance)
                  : 0,
                currency: "PEN",
              },
              minimum: {
                amount: Number(statement.remainingMinimumPayment),
                currency: "PEN",
              },
            });
          });
          logger.info(
            `Payment Order not validated ${JSON.stringify(paymentOrders)}`
          );
          resolve(this.filterValidPaymentOrders(paymentOrders));
        });
      });
      httpsRequest.on("error", (error) => {
        logger.error(error);
        reject(error);
      });
      httpsRequest.write(postBody);
      httpsRequest.end();
    });
  }

  private formatDate(date) {
    return date
      ? new Date(date).toISOString().substring(0, 10)
      : new Date().toISOString().substring(0, 10);
  }

  private filterValidPaymentOrders(paymentOrders): any[] {
    const validatedPaymentOrders = [];
    paymentOrders.sort((firstPaymentOrder, secondPaymentOrder) => {
      return (
        new Date(firstPaymentOrder["statementDate"]).getTime() -
        new Date(secondPaymentOrder["statementDate"]).getTime()
      );
    });
    const closedPaymentOrder = paymentOrders.filter((paymentOrder) => {
      return paymentOrder["type"] === "closed";
    });
    const openPaymentOrder = paymentOrders.find((paymentOrder) => {
      return paymentOrder["type"] === "open";
    });
    if (closedPaymentOrder) {
      validatedPaymentOrders.push(closedPaymentOrder);
    }
    if (openPaymentOrder) {
      validatedPaymentOrders.push(openPaymentOrder);
    }
    logger.info(
      `Validated Payment Order ${JSON.stringify(validatedPaymentOrders)}`
    );
    return validatedPaymentOrders;
  }

  private async getLastPaymentEvent(author: string) {
    try {
      const result = await dynamodbUtil.getItems({
        TableName: process.env.DYNAMODB_TABLE_PAYMENTS_EVENTS,
        IndexName: "by-author-and-time",
        KeyConditionExpression: "#author = :author",
        ExpressionAttributeNames: {
          "#author": "author",
        },
        ExpressionAttributeValues: {
          ":author": author,
        },
        ScanIndexForward: false,
        Limit: 1,
      });
      const lastPaymentEvent = result?.Items[0];
      logger.debug(
        "Last Payment Event",
        `${JSON.stringify({ lastPaymentEvent })}`
      );
      return lastPaymentEvent;
    } catch (error) {
      logger.error(error);
    }
  }

  private addFlagForPaymentInProcess(paymentOrders: any[], lastPaymentEvent) {
    const hasPaymentInProcess = this.hasPaymentInProcess(lastPaymentEvent);
    paymentOrders.forEach((paymentOrder) => {
      paymentOrder.hasPaymentInProcess = false;
      if (paymentOrder.type == "closed" && paymentOrder.pending.amount > 0) {
        paymentOrder.hasPaymentInProcess = hasPaymentInProcess;
      }
    });
  }

  private hasPaymentInProcess(lastPaymentEvent): boolean {
    let hasPaymentInProcess = false;
    if (
      !lastPaymentEvent ||
      lastPaymentEvent.type != process.env.PAYMENTS_EVENTS_TYPE_COMPLETED
    ) {
      return hasPaymentInProcess;
    }
    const today = dayjs();
    const timeOfLastPaymentEvent = dayjs(lastPaymentEvent.time);
    const i2cDelayForServiceGetcardholderstatementInMinutes = Number(
      process.env.I2C_DELAY_FOR_SERVICE_GETCARDHOLDERSTATEMENT_IN_MINUTES
    );
    const limitOnTheDayToAssumeI2cDelay = today.subtract(
      i2cDelayForServiceGetcardholderstatementInMinutes,
      "minute"
    );
    if (timeOfLastPaymentEvent.diff(limitOnTheDayToAssumeI2cDelay) > 0) {
      hasPaymentInProcess = true;
    }
    return hasPaymentInProcess;
  }
  private getDebtPaymentOrdersFromPaymentOrders(paymentOrders: any[]): any[] {
    const date = new Date().toLocaleDateString("en", {
      timeZone: "America/Lima",
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });

    const closedDebtPaymentOrders = paymentOrders[0].filter((paymentOrder) => {
      return (
        dayjs(date, "DD/MM/YYYY").isAfter(
          dayjs(paymentOrder.dueDate, "YYYY-MM-DD")
        ) &&
        paymentOrder.minimum.amount > 0 &&
        paymentOrder.status === "pending"
      );
    });
    const debtPaymentOrders = closedDebtPaymentOrders.concat(paymentOrders[1]);
    logger.debug(
      "Debt Payment Orders: ",
      JSON.stringify({ debtPaymentOrders })
    );
    return debtPaymentOrders;
  }
}
