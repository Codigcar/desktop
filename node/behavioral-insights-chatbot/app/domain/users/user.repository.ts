import { IBaseRepository } from '../base.repository'
import { IUserEntity } from './user.entity'

export interface IUserRepository extends IBaseRepository<IUserEntity> {
  findByWaId(waId: string): Promise<IUserEntity | null>
}
