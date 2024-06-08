import 'reflect-metadata';
import { container } from 'tsyringe';
import { logger, tracer } from 'src/utils/logger.util';
import { CreateCardRequestedEntity } from './entity';
import { KafkaAdapter } from 'src/adapters/kafka';
import SecretsManagerAdapter from 'src/adapters/secretsmanager.adapter';
import { existsContractEvent } from 'src/utils/utils';
import { DataEvent } from 'src/utils/interfaces';
import DynamoDBAdapter from 'src/adapters/dynamodb.adapter';

const {
  MSK_TOPIC_CARD_REQUESTED
} = process.env;

class CreateCardRequestedService {
  async produceMessagesToTopic (topicName: any, messages: any)  {
    const secrets = await SecretsManagerAdapter.getSecretValue(process.env.SECRETS_MANAGER_MSK_NAME!);
    container.register('credentials', { useValue: JSON.parse(secrets.SecretString!) });
    const kafka = container.resolve(KafkaAdapter);
    await kafka.sendMessages(topicName, messages);
    container.clearInstances();
    logger.debug(`publishMessageByTopic '${topicName}' OK`);
  };
  
  @tracer.captureMethod({
    captureResponse: true,
  })
  async checkIfContractExists (cognitoUserName: any)  {
    logger.debug(`cognitoUserName: ${cognitoUserName}`);
    const contractByUsernameQueryParams = CreateCardRequestedEntity.contractByUsernameQueryParams(cognitoUserName);
    const result = await DynamoDBAdapter.query(contractByUsernameQueryParams);
    return (result.Count as number) > 0;
  };
  
  async prepareMessage (topicName: string, message: DataEvent)  {
    const newMessage = {
      ...message,
      time: Date.now(),
      type: topicName
    };
  
    return newMessage;
  };
  
  @tracer.captureMethod({
    captureResponse: true,
  })
  async saveContractEventStore (messages: DataEvent[]): Promise<void>  {
    for (const message of messages) {
      try {
        const jsonMessage = message;
        const { transaction: transactionId } = jsonMessage;
        const existsCreatCardRequestedEvent = await existsContractEvent(transactionId, MSK_TOPIC_CARD_REQUESTED!);
  
        if (existsCreatCardRequestedEvent) continue;
  
        const lastContract = await this.getLastContractRecordByTransactionId(transactionId);
        if (!lastContract) continue;
  
        const contractEventStoreData = this.newContractEventStoreData(lastContract);
        const contractEventStoreUpdateParams = CreateCardRequestedEntity.contractEventStoreUpdateParams(contractEventStoreData);
        await DynamoDBAdapter.put(contractEventStoreUpdateParams);
      } catch (error) {
        logger.error(JSON.stringify({ error }));
        throw error;
      }
    }
  };
  
  @tracer.captureMethod({
    captureResponse: true,
  })
  async getLastContractRecordByTransactionId (transactionId: any)  {
    const lastEventByTransactionIdQueryParams = CreateCardRequestedEntity.lastEventByTransactionIdQueryParams(transactionId);
    const lastContractRecord = await DynamoDBAdapter.query(lastEventByTransactionIdQueryParams);
    if (!(lastContractRecord.Items && lastContractRecord.Items.length > 0)) {
      const message = `No previous record was found contract with transactionId: '${transactionId}'.`;
      logger.info(message);
      return;
    }
  
    return lastContractRecord.Items[0];
  };
  
  newContractEventStoreData (contractEvent: any)  {
    const newContract: DataEvent = {
      ...contractEvent,
      id: contractEvent.id + 1,
      time: Date.now(),
      type: MSK_TOPIC_CARD_REQUESTED,
    };
  
    return newContract;
  };

}

export default new CreateCardRequestedService();
