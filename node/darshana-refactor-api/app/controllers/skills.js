const aobj = require('aobj')
const { typeMessages, typeErrorMessages, MODELS } = require('../helpers/enums')
const skillsModel = require('../models/skills')
const SkillsServices = require('../services/domain/skills.service')
const { logger } = require('../helpers/logger')

module.exports = {
  datatable: () => async (req, res, next) => {
    try {
      const skillsServices = SkillsServices.getInstance(MODELS.Skills)

      const { page, length, order = [], ...where } = req.query
      const { data, last_page } = await skillsServices.datatable({
        page,
        length,
        order,
        ...where,
      })

      return res.json({
        status: true,
        meta: {
          last_page,
        },
        data,
      })
    } catch (error) {
      logger.error('🚀 ~ file: skills.js:28 ~ datatable: ~ error:', error)
      next(error)
    }
  },

  create: () => async (req, res) => {
    let skillInput = aobj.extract(req.body, ['name'])

    let exists = await skillsModel.getOneWhere({
      equals: { name: skillInput.name },
    })

    if (exists) {
      return res.json({
        status: false,
        message: 'Skill already saved',
        message_es: 'Skill ya se guardo previamente',
      })
    }

    let data = await skillsModel.create(skillInput)

    res.json({
      status: true,
      message: typeMessages.POST_RESPONSE_MESSAGE,
      message_es: typeMessages.POST_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },

  update: () => async (req, res) => {
    let skillInput = aobj.extract(req.body, ['id', 'name'])

    let exists = await skillsModel.getOneWhere({
      equals: { id: skillInput.id },
    })

    if (!exists) {
      return res.json({
        status: false,
        message: typeErrorMessages.SKILL_NOT_FOUND,
        message_es: typeErrorMessages.SKILL_NOT_FOUND_ES,
      })
    }

    let data = await skillsModel.update(skillInput)

    res.json({
      status: true,
      message: typeMessages.PATCH_RESPONSE_MESSAGE,
      message_es: typeMessages.PATCH_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },

  delete: () => async (req, res) => {
    let skillInput = aobj.extract(req.body, ['id'])

    let exists = await skillsModel.getOneWhere({
      equals: { id: skillInput.id },
    })

    if (!exists) {
      return res.json({
        status: false,
        message: typeErrorMessages.SKILL_NOT_FOUND,
        message_es: typeErrorMessages.SKILL_NOT_FOUND_ES,
      })
    }

    let data = await skillsModel.delete(skillInput.id)

    res.json({
      status: true,
      message: typeMessages.DELETE_RESPONSE_MESSAGE,
      message_es: typeMessages.DELETE_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },
}
