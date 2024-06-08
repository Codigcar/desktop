const { MODELS } = require('../../helpers/enums')
const GenderRepository = require('../../repository/genders.repository')

class GenderServices {
  static instance = null

  constructor(model) {
    this.genderRepository = new GenderRepository(model)
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new GenderServices(MODELS.Genders)
    }

    return this.instance
  }

  async datatable({ page, length, order = [], ...where }) {
    return await this.genderRepository.datatable({
      page,
      length,
      order,
      attributes: ['id', 'name_en', 'name_es'],
      ...where,
    })
  }
}

module.exports = GenderServices
