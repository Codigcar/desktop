const aobj = require('aobj')
const userDetailsSkillsModel = require('../models/user_details_skills')

const userDetailModel = require('../models/user_details')
const skillsModel = require('../models/skills')
const { typeErrorMessages, typeMessages } = require('../helpers/enums')
const { logger } = require('../helpers/logger')
const UsersDetailsServices = require('../services/domain/users_details.service')
const SkillsServices = require('../services/domain/skills.service')
const UserSkillsServices = require('../services/domain/user_skills.service')

async function decorate(data) {
  const skill = await skillsModel.getOneWhere({
    equals: { id: data.skill_id },
    isNull: ['deleted_at'],
  })
  data.name = skill.name

  delete data.user_detail_id
  delete data.skill_id

  return data
}

module.exports = {
  datatable: () => async (req, res) => {
    const foundUser = await userDetailModel.getOneWhere({
      equals: { user_uuid: req.session.user_uuid },
    })

    if (!foundUser) {
      return res.json({
        status: false,
        message: typeErrorMessages.USER_NOT_FOUND,
        message_es: typeErrorMessages.USER_NOT_FOUND_ES,
      })
    }

    let foundSkill = await userDetailsSkillsModel.getAllWhere({
      equals: { user_detail_id: foundUser.id },
    })

    if (!foundSkill) {
      return res.json({
        status: false,
        message: typeErrorMessages.SKILL_NOT_FOUND,
        message_es: typeErrorMessages.SKILL_NOT_FOUND,
      })
    }

    let response = []
    response.data = foundSkill

    for (const i in response.data) {
      response.data[i] = await decorate(response.data[i])
    }
    res.json({
      status: true,
      message: typeMessages.GET_RESPONSE_MESSAGE,
      message_es: typeMessages.GET_RESPONSE_MESSAGE_ES,
      ...response,
    })
  },

  create: () => async (req, res, next) => {
    const { user_uuid } = req.session
    const { name, required = false } = req.body

    try {
      const usersDetailsServices = UsersDetailsServices.getInstance()
      const skillService = SkillsServices.getInstance()
      const userSkillsService = UserSkillsServices.getInstance()

      const getUserByUuid = await usersDetailsServices.findOne({
        attributes: ['id'],
        where: { user_uuid },
      })

      let getSkillByName = await skillService.findOne({
        where: { name },
      })

      if (!getSkillByName) {
        getSkillByName = await skillService.create({ name, required })
      }

      const created = await userSkillsService.create({
        user_detail_id: getUserByUuid.id,
        skill_id: getSkillByName.id,
      })

      res.json({
        status: true,
        message: typeMessages.POST_RESPONSE_MESSAGE,
        data: { ...created.dataValues, name },
      })
    } catch (error) {
      logger.error('🚀 ~ file: user_skills.js:90 ~ create: ~ error:', error)
      next(error)
    }
  },

  delete: () => async (req, res) => {
    let skillInput = aobj.extract(req.body, ['id'])

    let exists = await userDetailsSkillsModel.getOneWhere({
      equals: { id: skillInput.id },
    })

    if (!exists) {
      return res.json({
        status: false,
        message: typeErrorMessages.SKILL_NOT_FOUND,
        message_es: typeErrorMessages.SKILL_NOT_FOUND,
      })
    }

    let data = await userDetailsSkillsModel.delete(skillInput.id)

    res.json({
      status: true,
      message: typeMessages.DELETE_RESPONSE_MESSAGE,
      message_es: typeMessages.DELETE_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },

  deleteAllByUser: () => async (req, res) => {
    const foundUserDetail = await userDetailModel.getOneWhere({
      equals: { user_uuid: req.session.user_uuid },
    })

    if (!foundUserDetail) {
      return res.json({
        status: false,
        message: typeErrorMessages.USER_NOT_FOUND,
        message_es: typeErrorMessages.USER_NOT_FOUND_ES,
      })
    }

    const skillsByUser = await userDetailsSkillsModel.getAllWhere({
      equals: { user_detail_id: foundUserDetail.id },
    })

    if (!skillsByUser) {
      return res.json({
        status: false,
        message: typeErrorMessages.SKILL_NOT_FOUND,
        message_es: typeErrorMessages.SKILL_NOT_FOUND,
      })
    }

    const data = await Promise.all(
      skillsByUser.map((skill) => userDetailsSkillsModel.delete(skill.id)),
    )

    res.json({
      status: true,
      message: typeMessages.DELETE_RESPONSE_MESSAGE,
      message_es: typeMessages.DELETE_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },
}
