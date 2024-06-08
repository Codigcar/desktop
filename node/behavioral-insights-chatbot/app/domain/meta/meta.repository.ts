import { ISendMessageFactory } from '../../infrastructure/factory/utils/interfaces'

export interface IMetaRepository {
  getMessages(): ISendMessageFactory
}
