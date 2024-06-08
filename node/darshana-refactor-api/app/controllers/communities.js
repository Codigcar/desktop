const aobj = require('aobj')
const { typeMessages, typeErrorMessages } = require('../helpers/enums')
const communitiesModel = require('../models/communities')

module.exports = {
  datatable: () => async (req, res) => {
    let response = await communitiesModel.datatable(req)

    res.json({
      status: true,
      message: typeMessages.GET_RESPONSE_MESSAGE,
      message_es: typeMessages.GET_RESPONSE_MESSAGE_ES,
      ...response,
    })
  },

  create: () => async (req, res) => {
    let communityInput = aobj.extract(req.body, [
      'title',
      'description',
      'image_url',
    ])

    let data = await communitiesModel.create(communityInput)

    res.json({
      status: true,
      message: typeMessages.POST_RESPONSE_MESSAGE,
      message_es: typeMessages.POST_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },

  patch: () => async (req, res) => {
    let communityInput = aobj.extract(req.body, [
      'id',
      'title',
      'description',
      'image_url',
    ])

    let exists = await communitiesModel.getOneWhere({
      equals: { id: communityInput.id },
    })

    if (!exists) {
      return res.json({
        status: false,
        message: typeErrorMessages.COMMUNITY_NOT_FOUND,
        message_es: typeErrorMessages.COMMUNITY_NOT_FOUND_ES,
      })
    }

    let data = await communitiesModel.update(communityInput)

    res.json({
      status: true,
      message: typeMessages.PATCH_RESPONSE_MESSAGE,
      message_es: typeMessages.PATCH_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },

  delete: () => async (req, res) => {
    let communityInput = aobj.extract(req.body, ['id'])

    let exists = await communitiesModel.getOneWhere({
      equals: { id: communityInput.id },
    })

    if (!exists) {
      return res.json({
        status: false,
        message: typeErrorMessages.COMMUNITY_NOT_FOUND,
        message_es: typeErrorMessages.COMMUNITY_NOT_FOUND_ES,
      })
    }

    let data = await communitiesModel.delete(communityInput.id)

    res.json({
      status: true,
      message: typeMessages.DELETE_RESPONSE_MESSAGE,
      message_es: typeMessages.DELETE_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },
}
