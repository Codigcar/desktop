const { MODELS } = require('../../helpers/enums')
const GenderRepository = require('../../repository/genders.repository')

class UserGendersServices {
  static instance = null

  constructor(model) {
    this.genderRepository = new GenderRepository(model)
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new UserGendersServices(MODELS.UserGenders)
    }

    return this.instance
  }

  async findOne(options = {}) {
    return await this.genderRepository.findOne(options)
  }

  async registerByUser({ user_uuid, gender_id }) {
    return await this.genderRepository.create({
      user_uuid,
      gender_id,
    })
  }

  async getAllByUser({ user_uuid }) {
    const getGenderByUser = await this.genderRepository.findOne({
      where: { user_uuid, deleted_at: null },
      attributes: ['id', 'user_uuid'],
      include: [
        {
          attributes: ['id', 'name_en', 'name_es'],
          model: MODELS.Genders,
        },
      ],
    })

    return getGenderByUser
  }

  async deleteAllByUser({ user_uuid }) {
    return await this.genderRepository.destroyAll({
      where: { user_uuid },
    })
  }

  async updateByUser({ body, user_uuid }) {
    return await this.genderRepository.update({
      body,
      options: { where: { user_uuid } },
    })
  }
}

module.exports = UserGendersServices
