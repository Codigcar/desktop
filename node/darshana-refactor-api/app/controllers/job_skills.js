const aobj = require('aobj')
const { typeMessages, typeErrorMessages } = require('../helpers/enums')
const jobSkillsModel = require('../models/job_skills')

module.exports = {
  datatable: () => async (req, res) => {
    let response = await jobSkillsModel.datatable(req)

    res.json({
      status: true,
      message: typeMessages.GET_RESPONSE_MESSAGE,
      message_es: typeMessages.GET_RESPONSE_MESSAGE_ES,
      ...response,
    })
  },

  getAutocomplete: () => async (req, res) => {
    let data = await jobSkillsModel.getAll()
    let result = {}
    for (const skill of data) {
      result[(skill.name + '').toLowerCase()] = skill
    }

    res.json({
      status: true,
      message: typeMessages.GET_RESPONSE_MESSAGE,
      message_es: typeMessages.GET_RESPONSE_MESSAGE_ES,
      data: Object.values(result),
    })
  },

  create: () => async (req, res) => {
    let skillInput = aobj.extract(req.body, ['job_id', 'name'])

    let exists = await jobSkillsModel.getOneWhere({ equals: skillInput })

    if (exists) {
      return res.json({
        status: false,
        message: 'Skill already saved',
        message_es: 'La habilidad ya se encuentra registrada',
      })
    }

    let data = await jobSkillsModel.create(skillInput)

    res.json({
      status: true,
      message: typeMessages.POST_RESPONSE_MESSAGE,
      message_es: typeMessages.POST_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },

  delete: () => async (req, res) => {
    let skillInput = aobj.extract(req.body, ['id'])

    let exists = await jobSkillsModel.getOneWhere({
      equals: { id: skillInput.id },
    })

    if (!exists) {
      return res.json({
        status: false,
        message: typeErrorMessages.NOT_FOUND,
        message_es: typeErrorMessages.NOT_FOUND_ES,
      })
    }

    let data = await jobSkillsModel.delete(skillInput.id)

    res.json({
      status: true,
      message: typeMessages.DELETE_RESPONSE_MESSAGE,
      message_es: typeMessages.DELETE_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },
}
