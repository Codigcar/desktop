const aobj = require('aobj')
const { typeMessages, typeErrorMessages } = require('../helpers/enums')
const jobStatusesModel = require('../models/job_statuses')

module.exports = {
  datatable: () => async (req, res) => {
    let response = await jobStatusesModel.datatable(req)

    res.json({
      status: true,
      message: typeMessages.GET_RESPONSE_MESSAGE,
      message_es: typeMessages.GET_RESPONSE_MESSAGE_ES,
      ...response,
    })
  },

  create: () => async (req, res) => {
    let jobStatusesInput = aobj.extract(req.body, ['name', 'visible'])
    let data = await jobStatusesModel.create(jobStatusesInput)

    res.json({
      status: true,
      message: typeMessages.POST_RESPONSE_MESSAGE,
      message_es: typeMessages.POST_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },

  patch: () => async (req, res) => {
    let jobStatusesInput = aobj.extract(req.body, ['id', 'name', 'visible'])

    let exists = await jobStatusesModel.getOneWhere({
      equals: { id: jobStatusesInput.id, user_uuid: req.session.user_uuid },
    })

    if (!exists) {
      return res.json({
        status: false,
        message: typeErrorMessages.NOT_FOUND,
        message_es: typeErrorMessages.NOT_FOUND_ES,
      })
    }

    let data = await jobStatusesModel.update(jobStatusesInput)

    res.json({
      status: true,
      message: typeMessages.PATCH_RESPONSE_MESSAGE,
      message_es: typeMessages.PATCH_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },

  delete: () => async (req, res) => {
    let jobStatusesInput = aobj.extract(req.body, ['id'])

    let exists = await jobStatusesModel.getOneWhere({
      equals: { id: jobStatusesInput.id, user_uuid: req.session.user_uuid },
    })

    if (!exists) {
      return res.json({
        status: false,
        message: typeErrorMessages.NOT_FOUND,
        message_es: typeErrorMessages.NOT_FOUND_ES,
      })
    }

    let data = await jobStatusesModel.delete(jobStatusesInput)

    res.json({
      status: true,
      message: typeMessages.DELETE_RESPONSE_MESSAGE,
      message_es: typeMessages.DELETE_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },
}
