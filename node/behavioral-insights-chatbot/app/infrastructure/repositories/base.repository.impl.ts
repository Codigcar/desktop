import { Error } from 'mongoose'
import { IBaseRepository } from '../../domain/base.repository'

export class BaseRepositoryImpl<T> implements IBaseRepository<T> {
  constructor(private readonly model: any) {}
  async register(entity: any): Promise<T | undefined> {
    try {
      return await this.model.create(entity)
    } catch (error: any) {
      throw new Error(error)
    }
  }
  async list(): Promise<T[] | undefined> {
    try {
      return await this.model.find()
    } catch (error: any) {
      throw new Error(error)
    }
  }
  async updateOne(filter: any, update: any): Promise<T> {
    try {
      return await this.model.updateOne(filter, update)
    } catch (error: any) {
      throw new Error(error)
    }
  }
  async delete(id: string): Promise<boolean | undefined> {
    try {
      return await this.model.delete(id)
    } catch (error: any) {
      throw new Error(error)
    }
  }
  async get(id: string): Promise<T | undefined> {
    try {
      return await this.model.get(id)
    } catch (error: any) {
      throw new Error(error)
    }
  }
  async getById(id: any): Promise<T | undefined> {
    try {
      // return await this.model.findOne(id)
      return await this.model.findById(id)
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async findOneByObject(
    object: any, 
    selects?: string,
    populate?: {
      fk: string
      select: string
      model: any
    }
    ): Promise<T | undefined> {
    try {
      if (populate) {
        return await this.model
          .findOne(object, selects)
          .populate(populate.fk, populate.select, populate.model)
      }
      return await this.model.findOne(object, selects)
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async findOneAndUpdate({
    conditions,
    update,
    options,
    populate,
    upsert = false,
  }: {
    conditions: any
    update: any
    options?: any
    populate?: {
      fk: string
      select: string
      model: any
    }
    upsert?: boolean
  }): Promise<T | undefined> {
    try {
      const newOptions = {
        // new: true,
        ...(upsert && { upsert: true }),
        ...options,
      }
      if (populate) {
        return await this.model
          .findOneAndUpdate(conditions, update, newOptions)
          .populate(populate.fk, populate.select, populate.model)
      }
      return await this.model.findOneAndUpdate(conditions, update, newOptions)
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
