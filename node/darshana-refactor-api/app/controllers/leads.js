const aobj = require('aobj')
const { typeMessages, typeErrorMessages } = require('../helpers/enums')
const leadsModel = require('../models/leads')
const whiz = require('../services/whiz')

module.exports = {
  datatable: () => async (req, res) => {
    let response = await leadsModel.datatable(req)

    res.json({
      status: true,
      message: typeMessages.GET_RESPONSE_MESSAGE,
      message_es: typeMessages.GET_RESPONSE_MESSAGE_ES,
      ...response,
    })
  },

  create: () => async (req, res) => {
    let leadsInput = aobj.extract(req.body, [
      'title',
      'query_type',
      'description',
      'email',
    ])

    if (req.session && req.session.user_uuid) {
      leadsInput.user_uuid = req.session.user_uuid
    }

    let data = await leadsModel.create(leadsInput)

    console.log('sending email')
    try {
      let r = await whiz.mail.send({
        from: {
          email: process.env.EMAIL_SENDER_EMAIL,
          name: process.env.EMAIL_SENDER_NAME,
        },
        to: {
          email: process.env.EMAIL_SUPPORT_TO,
          name: process.env.EMAIL_SUPPORT_TO,
        },
        subject: 'Darshana Support',
        content: `
                <h5>Email: ${data.email}</h5>
                <h5>Titulo: ${data.title}</h5>
                <h5>Consulta: ${data.query_type}</h5>
                <h5>Descripcion: ${data.description}</h5>
                `,
      })
      if (r.status !== true) throw r.message
      console.log('email sended')
    } catch (error) {
      console.log('email errored')
    }

    res.json({
      status: true,
      message: typeMessages.POST_RESPONSE_MESSAGE,
      message_es: typeMessages.POST_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },

  patch: () => async (req, res) => {
    let leadsInput = aobj.extract(req.body, [
      'id',
      'title',
      'query_type',
      'description',
      'email',
    ])
    leadsInput.user_uuid = req.session.user_uuid

    let exists = await leadsModel.getOneWhere({ equals: { id: leadsInput.id } })

    if (!exists) {
      return res.json({
        status: false,
        message: typeErrorMessages.NOT_FOUND,
        message_es: typeErrorMessages.NOT_FOUND_ES,
      })
    }

    let data = await leadsModel.update(leadsInput)

    res.json({
      status: true,
      message: typeMessages.PATCH_RESPONSE_MESSAGE,
      message_es: typeMessages.PATCH_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },

  delete: () => async (req, res) => {
    let leadsInput = aobj.extract(req.body, ['id'])

    let exists = await leadsModel.getOneWhere({ equals: { id: leadsInput.id } })

    if (!exists) {
      return res.json({
        status: false,
        message: typeErrorMessages.NOT_FOUND,
        message_es: typeErrorMessages.NOT_FOUND_ES,
      })
    }

    let data = await leadsModel.delete(leadsInput)

    res.json({
      status: true,
      message: typeMessages.DELETE_RESPONSE_MESSAGE,
      message_es: typeMessages.DELETE_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },
}
