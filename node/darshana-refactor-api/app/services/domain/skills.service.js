const { MODELS } = require('../../helpers/enums')
const SkillsRepository = require('../../repository/skills.repository')

class SkillsServices {
  static instance = null

  constructor() {
    this.skillsRepository = new SkillsRepository(MODELS.Skills)
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new SkillsServices()
    }

    return this.instance
  }

  async getAll() {
    return await this.skillsRepository.getAll()
  }

  async datatable({ page, length, order = [], ...where }) {
    return await this.skillsRepository.datatable({
      page,
      length,
      order,
      attributes: ['id', 'name', 'required'],
      ...where,
    })
  }

  async findOne(options) {
    const getSkill = await this.skillsRepository.findOne(options)
    return getSkill
  }

  async create(data) {
    return await this.skillsRepository.create(data)
  }
}

module.exports = SkillsServices
