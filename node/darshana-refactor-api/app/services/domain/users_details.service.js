const { MODELS } = require('../../helpers/enums')
const UsersDetailsRepository = require('../../repository/user_details.repository')

class UsersDetailsServices {
  static instance = null

  constructor() {
    this.userDetailsRepository = new UsersDetailsRepository(MODELS.UserDetails)
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new UsersDetailsServices()
    }

    return this.instance
  }

  async getAll() {
    return await this.userDetailsRepository.getAll()
  }

  async datatable({ page, length, order = [], attributes, include, ...where }) {
    return await this.userDetailsRepository.datatable({
      page,
      length,
      order,
      attributes,
      // attributes: ['id', 'name_en', 'name_es'],
      include,
      ...where,
    })
  }

  async findOne(options) {
    const getUser = await this.userDetailsRepository.findOne(options)
    if (!getUser) throw new Error('User not found')
    return getUser
  }
}

module.exports = UsersDetailsServices
