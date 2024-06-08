const aobj = require('aobj')
const businessEmailsModel = require('../models/business_emails')
const businessModel = require('../models/business')
const { typeErrorMessages, typeMessages } = require('../helpers/enums')

module.exports = {
  datatable: () => async (req, res) => {
    let response = await businessEmailsModel.datatable(req)

    res.json({
      status: true,
      message: typeMessages.GET_RESPONSE_MESSAGE,
      message_es: typeMessages.GET_RESPONSE_MESSAGE_ES,
      ...response,
    })
  },

  create: () => async (req, res) => {
    let businessEmailInput = aobj.extract(req.body, ['business_id', 'email'])

    let business = await businessModel.getById(businessEmailInput.business_id)

    if (business.user_uuid !== req.session.user_uuid) {
      return res.json({
        status: false,
        message: typeErrorMessages.CANT_ADD_EMAIL_TO_COMPANY,
        message_es: typeErrorMessages.CANT_ADD_EMAIL_TO_COMPANY_ES,
      })
    }

    let data = await businessEmailsModel.create(businessEmailInput)

    res.json({
      status: true,
      message: typeMessages.POST_RESPONSE_MESSAGE,
      message_es: typeMessages.POST_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },

  delete: () => async (req, res) => {
    let businessEmailInput = aobj.extract(req.body, ['id'])

    let exists = await businessEmailsModel.getOneWhere({
      equals: { id: businessEmailInput.id, user_uuid: req.session.user_uuid },
    })

    if (!exists) {
      return res.json({
        status: false,
        message: typeErrorMessages.RECORD_NOT_FOUND,
        message_es: typeErrorMessages.RECORD_NOT_FOUND_ES,
      })
    }

    let business = await businessModel.getById(exists.business_id)

    if (business.user_uuid !== req.session.user_uuid) {
      return res.json({
        status: false,
        message: typeErrorMessages.CANT_ADD_EMAIL_TO_COMPANY,
        message_es: typeErrorMessages.CANT_ADD_EMAIL_TO_COMPANY_ES,
      })
    }

    let data = await businessEmailsModel.delete(businessEmailInput.id)

    res.json({
      status: true,
      message: typeMessages.DELETE_RESPONSE_MESSAGE,
      message_es: typeMessages.DELETE_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },
}
