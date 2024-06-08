const chatMessagesModel = require('../models/chat_messages')
const notificationsModel = require('../models/notifications')
const sanitizeHtml = require('sanitize-html')

const userDetailsModel = require('../models/user_details')
const whiz = require('../services/whiz')
const {
  typeNotifications,
  typeMessages,
  typeErrorMessages,
} = require('../helpers/enums')

let sockets = {}
let io

notificationsModel.getEmitter().on('notification', (n) => {
  console.log({ n })
  if (io) {
    try {
      io.to(sockets[n.user_uuid]).emit('notification', n)
    } catch (error) {
      console.log(error)
    }
  }
})

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
  handleSocket: (_io, socket) => {
    io = _io
    console.log('Socket connected')
    socket.on('user_uuid', (user_uuid) => {
      sockets[user_uuid] = socket.id
    })
    socket.on('sendmessage', async (payload) => {
      payload.message = sanitizeHtml(payload.message + '')
        .substring(0, 512)
        .trim()
      if (payload.from_user_uuid && payload.to_user_uuid && payload.message) {
        const from_user = await getFullUserByUUID(payload.from_user_uuid)

        if (payload.message.length < 1) return
        if (payload.message.length >= 512) return

        await notificationsModel.create({
          user_uuid: payload.to_user_uuid,
          action: process.env.WEB_URL + `/message/${payload.from_user_uuid}`,
          been_read: 0,
          been_clicked: 0,
          n_type: typeNotifications.NEW_MESSAGE,
          project_name: 'New message recieved',
          person_name: from_user.person.name + ' ' + from_user.person.last_name,
        })

        let msg = await chatMessagesModel.create({
          from_user_uuid: payload.from_user_uuid,
          to_user_uuid: payload.to_user_uuid,
          message: payload.message,
        })
        socket.emit('message', msg)
        socket.to(sockets[payload.to_user_uuid]).emit('message', msg)
      }
    })
  },

  getChatWithUser: () => async (req, res) => {
    let existingChat = await chatMessagesModel.getAllWhere({
      equals: {
        from_user_uuid: req.params.user_uuid,
        to_user_uuid: req.session.user_uuid,
      },
    })
    let existingChatInverse = await chatMessagesModel.getAllWhere({
      equals: {
        from_user_uuid: req.session.user_uuid,
        to_user_uuid: req.params.user_uuid,
      },
    })

    let messages = [...existingChat, ...existingChatInverse].sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at),
    )

    let user = await getFullUserByUUID(req.params.user_uuid)

    existingChat.forEach(function (obj) {
      obj.been_read = true
      chatMessagesModel.update(obj)
    })

    res.json({
      status: true,
      message: typeMessages.GETTING_MESSAGE,
      message_es: typeMessages.GETTING_MESSAGE_ES,
      data: {
        user,
        messages,
      },
    })
  },

  getChats: () => async (req, res) => {
    let existingChat = await chatMessagesModel.getAllWhere({
      equals: { from_user_uuid: req.session.user_uuid },
    })
    let existingChatInverse = await chatMessagesModel.getAllWhere({
      equals: { to_user_uuid: req.session.user_uuid },
    })

    existingChat.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    existingChatInverse.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at),
    )

    let chat = [...existingChat, ...existingChatInverse]

    let users = []

    for (const i in chat) {
      if (chat[i].from_user_uuid !== req.session.user_uuid) {
        let u = await getFullUserByUUID(chat[i].from_user_uuid)
        if (users.find((v) => v.user_uuid == chat[i].from_user_uuid)) continue
        users.push({
          user_uuid: chat[i].from_user_uuid,
          name: u.person.name + ' ' + u.person.last_name,
          profile_picture_url: u.profile_picture_url,
          read: chat[i].been_read,
        })
      } else if (chat[i].to_user_uuid !== req.session.user_uuid) {
        let u = await getFullUserByUUID(chat[i].to_user_uuid)
        if (users.find((v) => v.user_uuid == chat[i].to_user_uuid)) continue
        users.push({
          user_uuid: chat[i].to_user_uuid,
          name: u.person.name + ' ' + u.person.last_name,
          profile_picture_url: u.profile_picture_url,
        })
      }
    }

    res.json({
      status: true,
      message: typeMessages.GETTING_MESSAGE,
      message_es: typeMessages.GETTING_MESSAGE_ES,
      data: users,
    })
  },

  createnNewMessageExample: () => async (req, res) => {
    const { to_user_uuid, message } = req.body
    const from_user_uuid = req.session.user_uuid

    if (!to_user_uuid) {
      return res.json({
        status: false,
        message: typeErrorMessages.USER_UUID_NOTIFICATION,
        message_es: typeErrorMessages.USER_UUID_NOTIFICATION_ES,
      })
    }
    const to_user = await getFullUserByUUID(to_user_uuid)
    const from_user = await getFullUserByUUID(from_user_uuid)

    const msg = await chatMessagesModel.create({
      from_user_uuid: from_user_uuid,
      to_user_uuid: to_user_uuid,
      message: message,
    })

    res.json({
      status: true,
      message: typeMessages.NOTIFICATION_SENT,
      message_es: typeMessages.NOTIFICATION_SENT_ES,
      from_user,
      to_user,
      msg,
    })
  },

  getUnreadMessages: () => async (req, res) => {
    let existingChat = await chatMessagesModel.getAllWhere({
      equals: {
        from_user_uuid: req.params.user_uuid,
        to_user_uuid: req.session.user_uuid,
        been_read: 0,
      },
    })

    res.json({
      status: true,
      message: typeMessages.GETTING_UNREAD_MESSAGE,
      message_es: typeMessages.GETTING_UNREAD_MESSAGE_ES,
      existingChat,
    })
  },

  getTotalNoReadChats: () => async (req, res) => {
    let totalNoReadChats = await chatMessagesModel.getAllWhere({
      equals: {
        to_user_uuid: req.params.user_uuid,
        been_read: 0,
      },
    })

    res.json({
      status: true,
      message: typeMessages.GETTING_MESSAGE,
      message_es: typeMessages.GETTING_MESSAGE_ES,
      data: totalNoReadChats.length,
    })
  },
}
