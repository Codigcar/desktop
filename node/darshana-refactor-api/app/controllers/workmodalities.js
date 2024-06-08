const aobj = require('aobj')
const { typeMessages, typeErrorMessages } = require('../helpers/enums')
const workModalityModel = require('../models/work_modality')

module.exports = {
  datatable: () => async (req, res) => {
    let response = await workModalityModel.datatable(req)

    res.json({
      status: true,
      message: typeMessages.GET_RESPONSE_MESSAGE,
      message_es: typeMessages.GET_RESPONSE_MESSAGE_ES,
      ...response,
    })
  },

  create: () => async (req, res) => {
    let workModalityInput = aobj.extract(req.body, ['name', 'name_en'])

    let data = await workModalityModel.create(workModalityInput)

    res.json({
      status: true,
      message: typeMessages.POST_RESPONSE_MESSAGE,
      message_es: typeMessages.POST_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },

  delete: () => async (req, res) => {
    const { id } = req.params

    let exists = await workModalityModel.getOneWhere({ equals: { id: id } })

    if (!exists) {
      return res.json({
        status: false,
        message: typeErrorMessages.NOT_FOUND,
        message_es: typeErrorMessages.NOT_FOUND_ES,
      })
    }

    await workModalityModel.delete(id)

    res.json({
      status: true,
      message: typeMessages.DELETE_RESPONSE_MESSAGE,
      message_es: typeMessages.DELETE_RESPONSE_MESSAGE_ES,
      data: exists,
    })
  },
}
