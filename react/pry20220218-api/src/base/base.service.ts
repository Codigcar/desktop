import { FindManyOptions, Repository } from 'typeorm'
import { BaseEntity } from './base.entity'
import { ObjectID } from 'mongodb'

export class BaseService<T extends BaseEntity> {
  constructor (private entityRepository: Repository<T>) {}

  async getAll () {
    return await this.entityRepository.find({})
  }

  async createOne (entity: any) {
    return await this.entityRepository.save(entity)
  }

  async findOne (_id: any) {
    return await this.entityRepository.findOneBy({ _id: new ObjectID(_id) })
  }

  async deleteOne (_id: any) {
    return await this.entityRepository.delete({ _id: new ObjectID(_id) })
  }

  async updateOne (_id: any, entity: any) {
    return await this.entityRepository.update(
      { _id: new ObjectID(_id) },
      entity,
    )
  }

  async getAllWithRelations (options: FindManyOptions<T>) {
    return await this.entityRepository.find(options)
  }
}
