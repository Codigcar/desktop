const { MODELS } = require('../../helpers/enums')
const SequelizeRepository = require('../../repository/sequelize.repository')

class SequelizeDataServices {
  static instance = null

  constructor() {
    this.sequelizeDataRepository = new SequelizeRepository(MODELS.SequelizeData)
    this.sequelizeMetaRepository = new SequelizeRepository(MODELS.SequelizeMeta)
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new SequelizeDataServices()
    }

    return this.instance
  }

  async getSequelizeData() {
    return await this.sequelizeDataRepository.getAll({
      attributes: ['name'],
    })
  }

  async getSequelizeMeta() {
    return await this.sequelizeMetaRepository.getAll({
      attributes: ['name'],
    })
  }
}

module.exports = SequelizeDataServices
