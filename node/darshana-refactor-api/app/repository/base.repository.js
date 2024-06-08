class BaseRepository {
  constructor(model) {
    this.model = model
  }

  async datatable({
    page,
    length,
    order = [],
    attributes = null,
    include,
    ...where
  }) {
    try {
      const { column = null, dir = null } = order[0] ?? []
      const limit = parseInt(length) || 999999
      page = parseInt(page)

      const whereConditionl = {
        ...(where && where),
      }

      const options = {
        order: [[column ?? 'id', dir ?? 'asc']],
        offset: page ? --page * limit : undefined,
        limit,
        where: whereConditionl,
      }

      const count = await this.model.count(options)
      const last_page = Math.ceil(count / limit)
      const getAll = await this.model.findAll({
        ...(attributes && { attributes }),
        ...(include && { include }),
        ...options,
      })

      return {
        data: getAll,
        last_page,
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async getAll(options = {}) {
    return await this.model.findAll(options)
  }

  async getById(id) {
    return await this.model.findByPk(id)
  }

  async create(data) {
    return await this.model.create(data)
  }

  async update({ body, options }) {
    return await this.model.update(body, options)
  }

  async delete(id) {
    const model = await this.getById(id)
    return await model.destroy()
  }

  async destroyAll(options = {}) {
    return await this.model.destroy(options)
  }

  async findOne(options = {}) {
    return await this.model.findOne(options)
  }
}

module.exports = BaseRepository
