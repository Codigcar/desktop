const { MODELS } = require('../../helpers/enums')
const UserWorkplaceRepository = require('../../repository/user_workplaces.repository')

class UserWorkplaceServices {
  static instance = null

  constructor() {
    this.userWorkplaceRepository = new UserWorkplaceRepository(
      MODELS.UserWorkPlaces,
    )
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new UserWorkplaceServices()
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

  async verifyDirectWorkplace() {
    return await this.userWorkplaceRepository.update({})
  }

  async createByAdmin({
    user_uuid,
    start_date,
    end_date,
    description,
    work_here,
    position,
    workplace_name,
    enable_business,
    verify_status_id,
  }) {
    return await this.userWorkplaceRepository.create({
      user_uuid,
      start_date,
      end_date,
      description,
      work_here,
      position,
      workplace_name,
      enable_business,
      verify_status_id,
    })
  }
}

module.exports = UserWorkplaceServices
