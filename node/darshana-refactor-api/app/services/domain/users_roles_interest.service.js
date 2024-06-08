const { MODELS } = require('../../helpers/enums')
const RolesInterestRepository = require('../../repository/roles_interest.repository')

class UsersRolesInterestServices {
  static instance = null

  constructor() {
    this.repository = new RolesInterestRepository(MODELS.UsersRolesInterest)
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new UsersRolesInterestServices()
    }

    return this.instance
  }

  async getAll() {
    return await this.repository.getAll()
  }

  async datatable({ page, length, order = [], ...where }) {
    return await this.repository.datatable({
      page,
      length,
      order,
      // attributes: ['id', 'name'],
      ...where,
    })
  }

  async create(data) {
    return await this.repository.create(data)
  }

  async deleteAll(options = {}) {
    return await this.repository.destroyAll(options)
  }
}

module.exports = UsersRolesInterestServices
