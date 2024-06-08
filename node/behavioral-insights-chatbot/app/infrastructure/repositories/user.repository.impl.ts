import { IUserEntity } from '../../domain/users/user.entity'
import { IUserRepository } from '../../domain/users/user.repository'
import { UserValue } from '../../domain/users/user.value'
import UserModel from '../models/user.schema'
import { BaseRepositoryImpl } from './base.repository.impl'

export class UserRepositoryImpl extends BaseRepositoryImpl<IUserEntity> implements IUserRepository {
  
  static instance: UserRepositoryImpl

  constructor() {
    super(UserModel)
  }

  static getInstance() {
    if(!this.instance) this.instance = new UserRepositoryImpl()
    return this.instance
  }

  async findByWaId(waId: string): Promise<IUserEntity | null> {
    const get = await UserModel.findOne({ wa_id: waId })
    if(!get) throw new Error('User not found3')
    const getUser = new UserValue(get)
    return getUser
  }
}
