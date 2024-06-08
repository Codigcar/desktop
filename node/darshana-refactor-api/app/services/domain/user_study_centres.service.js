const { MODELS } = require('../../helpers/enums')
const UserStudyCentresRepository = require('../../repository/user_study_centres.repository')

class UserStudyCentresServices {
  static instance = null

  constructor() {
    this.userWorkplaceRepository = new UserStudyCentresRepository(
      MODELS.UserStudyCentres,
    )
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new UserStudyCentresServices()
    }

    return this.instance
  }

  async getAll({ page, length, order = [], attributes, include, ...where }) {
    return await this.userWorkplaceRepository.datatable({
      page,
      length,
      order,
      attributes,
      include,
      ...where,
    })
  }

  async datatable({ page, length, order = [], attributes, include, ...where }) {
    return await this.userWorkplaceRepository.datatable({
      page,
      length,
      order,
      attributes,
      include,
      ...where,
    })
  }

  async findOne(options) {
    const getUser = await this.userWorkplaceRepository.findOne(options)
    if (!getUser) throw new Error('User not found')
    return getUser
  }
}

module.exports = UserStudyCentresServices
