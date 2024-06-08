const aobj = require('aobj')
const { typeMessages, typeErrorMessages } = require('../helpers/enums')
const projectStatusesModel = require('../models/project_statuses')

module.exports = {
  datatable: () => async (req, res) => {
    let response = await projectStatusesModel.datatable(req)

    res.json({
      status: true,
      message: typeMessages.GET_RESPONSE_MESSAGE,
      message_es: typeMessages.GET_RESPONSE_MESSAGE_ES,
      ...response,
    })
  },

  create: () => async (req, res) => {
    let projectStatusesInput = aobj.extract(req.body, ['name', 'visible'])
    let data = await projectStatusesModel.create(projectStatusesInput)

    res.json({
      status: true,
      message: typeMessages.POST_RESPONSE_MESSAGE,
      message_es: typeMessages.POST_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },

  patch: () => async (req, res) => {
    let projectStatusesInput = aobj.extract(req.body, ['id', 'name', 'visible'])

    let exists = await projectStatusesModel.getOneWhere({
      equals: { id: projectStatusesInput.id, user_uuid: req.session.user_uuid },
    })

    if (!exists) {
      return res.json({
        status: false,
        message: typeErrorMessages.NOT_FOUND,
        message_es: typeErrorMessages.NOT_FOUND_ES,
      })
    }

    let data = await projectStatusesModel.update(projectStatusesInput)

    res.json({
      status: true,
      message: typeMessages.PATCH_RESPONSE_MESSAGE,
      message_es: typeMessages.PATCH_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },

  delete: () => async (req, res) => {
    let projectStatusesInput = aobj.extract(req.body, ['id'])

    let exists = await projectStatusesModel.getOneWhere({
      equals: { id: projectStatusesInput.id, user_uuid: req.session.user_uuid },
    })

    if (!exists) {
      return res.json({
        status: false,
        message: typeErrorMessages.NOT_FOUND,
        message_es: typeErrorMessages.NOT_FOUND_ES,
      })
    }

    let data = await projectStatusesModel.delete(projectStatusesInput)

    res.json({
      status: true,
      message: typeMessages.DELETE_RESPONSE_MESSAGE,
      message_es: typeMessages.DELETE_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },
}
