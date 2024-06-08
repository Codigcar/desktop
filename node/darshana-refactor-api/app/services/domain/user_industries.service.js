const { MODELS } = require('../../helpers/enums')
const IndustriesRepository = require('../../repository/industries.repository')

class UserIndustriesServices {
  static instance = null

  constructor(model) {
    this.industriesRepository = new IndustriesRepository(model)
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new UserIndustriesServices(MODELS.UsersIndustries)
    }

    return this.instance
  }

  async getAll() {
    return await this.industriesRepository.getAll()
  }

  async datatable({ page, length, order = [], ...where }) {
    return await this.industriesRepository.datatable({
      page,
      length,
      order,
      attributes: ['id', 'name_en', 'name_es'],
      ...where,
    })
  }

  async registerIndustriesByUser({ user_uuid, industry_id }) {
    return await this.industriesRepository.create({
      user_uuid,
      industry_id,
    })
  }

  async getAllIndustriesByUser({ user_uuid }) {
    const getLanguagesByUser = await this.industriesRepository.findOne({
      where: { user_uuid, deleted_at: null },
      attributes: ['id', 'user_uuid'],
      include: [
        {
          attributes: ['id', 'name_en', 'name_es'],
          model: MODELS.Industries,
        },
      ],
    })

    return getLanguagesByUser
  }

  async deleteAllIndustriesByUser({ user_uuid }) {
    return await this.industriesRepository.destroyAll({
      where: { user_uuid },
    })
  }

  async findOne(options = {}) {
    return await this.industriesRepository.findOne(options)
  }
}

module.exports = UserIndustriesServices
