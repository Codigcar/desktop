import { Kafka } from 'kafkajs';
import { AppError, ErrorCodes } from 'src/utils/error';
import { kafkaProducer, MessageToTopic } from 'src/utils/interfaces';
import { inject, injectable } from 'tsyringe';
import { logger, tracer } from 'src/utils/logger.util';

@injectable()
export class KafkaAdapter {
  private readonly client: Kafka;
  private credentials: any
  
  constructor(@inject('credentials') value: any) {
    const {
      MSK_BROKERS,
      MSK_CLIENT_ID,
    } = process.env;

    this.credentials = value;

    this.client = new Kafka({
      brokers: MSK_BROKERS!.split(','),
      clientId: MSK_CLIENT_ID,
      ssl: true,
      sasl: {
        mechanism: 'scram-sha-512',
        ...this.credentials,
      }
    });
  }

  @tracer.captureMethod({
    captureResponse: true,
  })
  async sendMessages (topic: string, message: MessageToTopic[]): Promise<void> {
    const producer: kafkaProducer = this.client.producer();
    const promises = [];
    logger.info(`Topic to send message: ${topic}`);
  
    await producer.connect();
    promises.push(producer.send({
      topic,
      messages: message
    }));
  
    try {
      await Promise.all(promises);
    } catch (error) {
      throw new AppError(ErrorCodes.KAFKA_CLIENT_ERROR);
    }
  }
}
