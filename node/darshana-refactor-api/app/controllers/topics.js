const aobj = require('aobj')
const { typeMessages, typeErrorMessages } = require('../helpers/enums')
const topicsModel = require('../models/topics')

module.exports = {
  datatable: () => async (req, res) => {
    let response = await topicsModel.datatable(req)

    res.json({
      status: true,
      message: typeMessages.GET_RESPONSE_MESSAGE,
      message_es: typeMessages.GET_RESPONSE_MESSAGE_ES,
      ...response,
    })
  },

  create: () => async (req, res) => {
    let topicInput = aobj.extract(req.body, ['name'])

    let data = await topicsModel.create(topicInput)

    res.json({
      status: true,
      message: typeMessages.POST_RESPONSE_MESSAGE,
      message_es: typeMessages.POST_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },

  delete: () => async (req, res) => {
    let topicInput = aobj.extract(req.body, ['id'])

    let exists = await topicsModel.getOneWhere({
      equals: { id: topicInput.id },
    })

    if (!exists) {
      return res.json({
        status: false,
        message: typeErrorMessages.NOT_FOUND,
        message_es: typeErrorMessages.NOT_FOUND_ES,
      })
    }

    let data = await topicsModel.delete(topicInput.id)

    res.json({
      status: true,
      message: typeMessages.DELETE_RESPONSE_MESSAGE,
      message_es: typeMessages.DELETE_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },
}
