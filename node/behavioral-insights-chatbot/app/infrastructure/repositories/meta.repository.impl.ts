import { SendMessages360Dialog } from '../factory/360dialog/sendMessages.360dialog'
import { SendMessagesMeta } from '../factory/meta/sendMessages.meta'
import { ISendMessageFactory } from '../factory/utils/interfaces'

import type { IMetaRepository } from '../../domain/meta/meta.repository'
import { SendMessagesTurnIO } from '../factory/turnio/sendMessages.turnio'

type Iconfig = 'meta' | '360dialog' | 'turnIO'

export class MetaRepositoryImpl implements IMetaRepository {
  private messages: any = null
  private config: Iconfig = 'turnIO'
  static instance: MetaRepositoryImpl

  constructor() {
    if (this.config === 'turnIO') {
      this.messages = new SendMessagesTurnIO()
    }
    if (this.config === '360dialog') {
      this.messages = new SendMessages360Dialog()
    }
    if (this.config === 'meta') {
      this.messages = new SendMessagesMeta()
    }
  }

  static getInstance() {
    if(!this.instance) {
      this.instance = new MetaRepositoryImpl()
    }
    return this.instance
  }
  getMessages(): ISendMessageFactory {
    return this.messages
  }
}
