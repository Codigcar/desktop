const { MODELS } = require('../../helpers/enums')
const RolesInterestRepository = require('../../repository/roles_interest.repository')

class RolesInterestServices {
  static instance = null

  constructor() {
    this.rolesInterestRepository = new RolesInterestRepository(
      MODELS.RolesInterest,
    )
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new RolesInterestServices()
    }

    return this.instance
  }

  async getAll() {
    return await this.rolesInterestRepository.getAll()
  }

  async datatable({ page, length, order = [], ...where }) {
    return await this.rolesInterestRepository.datatable({
      page,
      length,
      order,
      attributes: ['id', 'name'],
      ...where,
    })
  }

  async findOne(options = {}) {
    const getRolByName = await this.rolesInterestRepository.findOne(options)
    if (!getRolByName) throw new Error('Not found rol interest')
    return getRolByName
  }
}

module.exports = RolesInterestServices
