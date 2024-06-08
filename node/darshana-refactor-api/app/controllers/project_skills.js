const aobj = require('aobj')
const { typeMessages, typeErrorMessages } = require('../helpers/enums')
const projectsModel = require('../models/projects')
const projectSkillsModel = require('../models/project_skills')
const skillsModel = require('../models/skills')

async function decorate(data) {
  const skill = await skillsModel.getOneWhere({
    equals: { id: data.skill_id },
    isNull: ['deleted_at'],
  })
  data.name = skill.name
  delete data.skill_id

  return data
}

module.exports = {
  datatable: () => async (req, res) => {
    let response = await projectSkillsModel.datatable(req)

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

  create: () => async (req, res) => {
    let skillInput = aobj.extract(req.body, ['project_id', 'name'])

    const foundProject = await projectsModel.getOneWhere({
      equals: { id: skillInput.project_id },
    })

    if (!foundProject) {
      return res.json({
        status: false,
        message: typeErrorMessages.PROJECT_NOT_FOUND,
        message_es: typeErrorMessages.PROJECT_NOT_FOUND_ES,
      })
    }

    let foundSkill = await skillsModel.getOneWhere({
      equals: { name: skillInput.name },
    })

    if (!foundSkill) {
      foundSkill = await skillsModel.create(skillInput)
    }

    let data = await projectSkillsModel.create({
      project_id: skillInput.project_id,
      skill_id: foundSkill.id,
    })

    res.json({
      status: true,
      message: typeMessages.POST_RESPONSE_MESSAGE,
      message_es: typeMessages.POST_RESPONSE_MESSAGE_ES,
      data: await decorate(data),
    })
  },

  delete: () => async (req, res) => {
    let skillInput = aobj.extract(req.body, ['id'])

    let exists = await projectSkillsModel.getOneWhere({
      equals: { id: skillInput.id },
    })

    if (!exists) {
      return res.json({
        status: false,
        message: typeErrorMessages.SKILL_NOT_FOUND,
        message_es: typeErrorMessages.SKILL_NOT_FOUND_ES,
      })
    }

    let data = await projectSkillsModel.delete(skillInput.id)

    res.json({
      status: true,
      message: typeMessages.DELETE_RESPONSE_MESSAGE,
      message_es: typeMessages.DELETE_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },
}
