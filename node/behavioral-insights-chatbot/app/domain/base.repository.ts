export interface IBaseRepository<T> {
  register(entity: T): Promise<T | undefined>
  list(): Promise<T[] | undefined>
  updateOne(filter:any, update: any): Promise<T | undefined>
  delete(id: string): Promise<boolean | undefined>
  get(id: string): Promise<T | undefined>
  getById(id: any): Promise<T | undefined>
  findOneByObject(
    object: any, 
    selects?: string, 
    populate?: {
      fk: string
      select: string
      model: any
    }
  ): Promise<T | undefined>
  findOneAndUpdate({
    conditions,
    update,
    options,
    populate,
    upsert,
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
  }): Promise<T | undefined>
}
