const aobj = require('aobj')
const { typeMessages, typeErrorMessages } = require('../helpers/enums')
const newsModel = require('../models/news')

module.exports = {
  datatable: () => async (req, res) => {
    let response = await newsModel.datatable(req)

    res.json({
      status: true,
      message: typeMessages.GET_RESPONSE_MESSAGE,
      message_es: typeMessages.GET_RESPONSE_MESSAGE_ES,
      ...response,
    })
  },

  create: () => async (req, res) => {
    let newsInput = aobj.extract(req.body, [
      'title',
      'description',
      'body',
      'image_url',
      'white_image',
    ])

    let data = await newsModel.create(newsInput)

    res.json({
      status: true,
      message: typeMessages.POST_RESPONSE_MESSAGE,
      message_es: typeMessages.POST_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },

  patch: () => async (req, res) => {
    let newsInput = aobj.extract(req.body, [
      'id',
      'title',
      'description',
      'body',
      'image_url',
      'white_image',
    ])

    let exists = await newsModel.getOneWhere({ equals: { id: newsInput.id } })

    if (!exists) {
      return res.json({
        status: false,
        message: typeErrorMessages.NOT_FOUND,
        message_es: typeErrorMessages.NOT_FOUND_ES,
      })
    }

    let data = await newsModel.update(newsInput)

    res.json({
      status: true,
      message: typeMessages.PATCH_RESPONSE_MESSAGE,
      message_es: typeMessages.PATCH_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },

  delete: () => async (req, res) => {
    let newsInput = aobj.extract(req.body, ['id'])

    let exists = await newsModel.getOneWhere({ equals: { id: newsInput.id } })

    if (!exists) {
      return res.json({
        status: false,
        message: typeErrorMessages.NOT_FOUND,
        message_es: typeErrorMessages.NOT_FOUND_ES,
      })
    }

    let data = await newsModel.delete(newsInput.id)

    res.json({
      status: true,
      message: typeMessages.DELETE_RESPONSE_MESSAGE,
      message_es: typeMessages.DELETE_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },
}
