'use strict';

class Producer {
  private sendCb;

  constructor({ sendCb }: { sendCb: any}) {
    this.sendCb = sendCb;
  }

  async connect() {
    return Promise.resolve();
  }

  async send ({ topic, messages }: { topic: string, messages: any }) {
    this.sendCb({ topic, messages });
  }

  async disconnect() {
    return Promise.resolve();
  }
}

const kafkajs: any = jest.genMockFromModule('kafkajs');

kafkajs.Kafka = class Kafka {
  private brokers;
  private clientId;
  private topics: any;

  constructor(config: any) {
    this.brokers = config.brokers;
    this.clientId = config.clientId;
    this.topics = {};
  }

  _sendCb ({ topic, messages }: { topic: string, messages: any; }) {
  }

  producer() {
    return new Producer({
      sendCb: this._sendCb.bind(this),
    });
  }
};

module.exports = kafkajs;
