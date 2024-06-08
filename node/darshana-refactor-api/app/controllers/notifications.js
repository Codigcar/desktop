const aobj = require('aobj')
const {
  typeNotifications,
  typeMessages,
  typeErrorMessages,
} = require('../helpers/enums')
const notificationsModel = require('../models/notifications')

const userDetailsModel = require('../models/user_details')
const whiz = require('../services/whiz')

async function getFullUserByUUID(user_uuid) {
  let userDetails = await userDetailsModel.getOneWhere({
    equals: { user_uuid: user_uuid },
  })
  let user = await whiz.getUser(user_uuid)
  if (user && userDetails) {
    userDetails.person = (user && user.data && user.data.person) || {}
    userDetails.person.email = (user && user.data && user.data.email) || {}
    if (!userDetails.profile_picture_url)
      userDetails.profile_picture_url = process.env.DEFAULT_PROFILE_PICTURE
  }
  return userDetails
}

module.exports = {
  datatable: () => async (req, res) => {
    let response = await notificationsModel.datatable(req)

    res.json({
      status: true,
      message: typeMessages.GET_RESPONSE_MESSAGE,
      message_es: typeMessages.GET_RESPONSE_MESSAGE_ES,
      ...response,
    })
  },

  create: () => async (req, res) => {
    let notificationInput = aobj.extract(req.body, ['message', 'been_read'])
    let data = await notificationsModel.create(notificationInput)

    res.json({
      status: true,
      message: typeMessages.POST_RESPONSE_MESSAGE,
      message_es: typeMessages.POST_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },

  patch: () => async (req, res) => {
    let notificationInput = aobj.extract(req.body, [
      'id',
      'message',
      'been_read',
    ])

    let exists = await notificationsModel.getOneWhere({
      equals: { id: notificationInput.id },
    })

    if (!exists) {
      return res.json({
        status: false,
        message: typeErrorMessages.NOT_FOUND,
        message_es: typeErrorMessages.NOT_FOUND_ES,
      })
    }

    let data = await notificationsModel.update(notificationInput)

    res.json({
      status: true,
      message: typeMessages.PATCH_RESPONSE_MESSAGE,
      message_es: typeMessages.PATCH_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },

  read: () => async (req, res) => {
    let notis = await notificationsModel.getAllWhere({
      equals: { user_uuid: req.session.user_uuid },
    })

    for (const n of notis) {
      await notificationsModel.update({
        id: n.id,
        been_read: 1,
      })
    }

    res.json({
      status: true,
      message: typeMessages.PATCH_RESPONSE_MESSAGE,
      message_es: typeMessages.PATCH_RESPONSE_MESSAGE_ES,
    })
  },

  clicked: () => async (req, res) => {
    let notificationInput = { id: req.params.id, been_clicked: 1 }

    let exists = await notificationsModel.getOneWhere({
      equals: { id: notificationInput.id, user_uuid: req.session.user_uuid },
    })

    if (!exists) {
      return res.json({
        status: false,
        message: typeErrorMessages.NOT_FOUND,
        message_es: typeErrorMessages.NOT_FOUND_ES,
      })
    }

    let data = await notificationsModel.update(notificationInput)

    res.json({
      status: true,
      message: typeMessages.PATCH_RESPONSE_MESSAGE,
      message_es: typeMessages.PATCH_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },

  delete: () => async (req, res) => {
    let notificationInput = aobj.extract(req.body, ['id'])

    let exists = await notificationsModel.getOneWhere({
      equals: { id: notificationInput.id },
    })

    if (!exists) {
      return res.json({
        status: false,
        message: typeErrorMessages.NOT_FOUND,
        message_es: typeErrorMessages.NOT_FOUND_ES,
      })
    }

    let data = await notificationsModel.delete(notificationInput)

    res.json({
      status: true,
      message: typeMessages.DELETE_RESPONSE_MESSAGE,
      message_es: typeMessages.DELETE_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },

  createNotificatonNewMessageExample: () => async (req, res) => {
    const { to_user_uuid } = req.body
    const from_user_uuid = req.session.user_uuid

    if (!to_user_uuid) {
      return res.json({
        status: false,
        message: 'Ingresar el user_uuid del usuario a enviar la notificatión',
      })
    }
    const to_user = await getFullUserByUUID(to_user_uuid)
    const from_user = await getFullUserByUUID(from_user_uuid)

    await notificationsModel.create({
      user_uuid: to_user_uuid,
      action: process.env.WEB_URL + `/message/${to_user_uuid}`,
      been_read: 0,
      been_clicked: 0,
      n_type: typeNotifications.NEW_MESSAGE,
      project_name: 'New message ',
      person_name: from_user.person.name + ' ' + from_user.person.last_name,
    })

    res.json({
      status: true,
      message: typeMessages.NOTIFICATION_SENT,
      message_es: typeMessages.NOTIFICATION_SENT_ES,
      from_user,
      to_user,
    })
  },
}
