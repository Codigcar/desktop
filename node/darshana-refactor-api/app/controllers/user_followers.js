const aobj = require('aobj')
const { typeMessages, typeErrorMessages } = require('../helpers/enums')
const userFollowersModel = require('../models/user_followers')

module.exports = {
  datatable: () => async (req, res) => {
    let response = await userFollowersModel.datatable(req)

    res.json({
      status: true,
      message: typeMessages.GET_RESPONSE_MESSAGE,
      message_es: typeMessages.GET_RESPONSE_MESSAGE_ES,
      ...response,
    })
  },

  create: () => async (req, res) => {
    let userFollowerInput = aobj.extract(req.body, ['followed_user_uuid'])

    userFollowerInput.user_uuid = req.session.user_uuid
    let data = await userFollowersModel.create(userFollowerInput)

    res.json({
      status: true,
      message: typeMessages.POST_RESPONSE_MESSAGE,
      message_es: typeMessages.POST_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },

  delete: () => async (req, res) => {
    let userFollowerInput = aobj.extract(req.body, ['id'])

    let exists = await userFollowersModel.getOneWhere({
      equals: { id: userFollowerInput.id, user_uuid: req.session.user_uuid },
    })

    if (!exists) {
      return res.json({
        status: false,
        message: typeErrorMessages.NOT_FOUND,
        message_es: typeErrorMessages.NOT_FOUND_ES,
      })
    }

    let data = await userFollowersModel.delete(userFollowerInput.id)

    res.json({
      status: true,
      message: typeMessages.DELETE_RESPONSE_MESSAGE,
      message_es: typeMessages.DELETE_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },
}
