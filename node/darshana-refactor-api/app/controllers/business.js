const aobj = require('aobj')
const businessModel = require('../models/business')
const userWorkplacesModel = require('../models/user_workplaces')
const userDetailsModel = require('../models/user_details')
const { typeErrorMessages, typeMessages } = require('../helpers/enums')

async function decorate(data) {
  const workplaceBD = await userWorkplacesModel.getOneWhere({
    equals: { id: data.user_workplace_id },
    isNull: ['deleted_at'],
  })

  data.workplace = workplaceBD || null

  data.workplace_name = workplaceBD?.workplace_name || {}
  data.workplace_id = workplaceBD?.workplace_id || {}

  return data
}

module.exports = {
  getAllByUUID: () => async (req, res) => {
    const business = await businessModel.getAllWhere({
      equals: { user_uuid: req.session.user_uuid },
    })
    let response = []
    response.data = []

    for (const i in business) {
      response.data[i] = await decorate(business[i])
    }

    // filtrar repetidos workplace_name

    let hash = {}
    response.data = response.data.filter((business) =>
      hash[business.workplace?.workplace_name]
        ? false
        : (hash[business.workplace?.workplace_name] = true),
    )
    response.data = response.data.filter(
      (business) => business.workplace?.enable_business === true,
    )

    res.json({
      status: true,
      message: typeMessages.GET_RESPONSE_MESSAGE,
      message_es: typeMessages.GET_RESPONSE_MESSAGE_ES,
      ...response,
    })
  },

  create: () => async (req, res) => {
    let businessInput = aobj.extract(req.body, [
      'user_workplace_id',
      'profile_picture_url',
      'profile_banner_url',
    ])

    let user = await userDetailsModel.getOneWhere({
      equals: { user_uuid: req.session.user_uuid },
    })

    if (user.is_talent) {
      return res.json({
        status: false,
        message: typeErrorMessages.TALENT_NOT_ABLE_TO_CREATE_COMPANY,
        message_es: typeErrorMessages.TALENT_NOT_ABLE_TO_CREATE_COMPANY_ES,
      })
    }

    let workplace = await userWorkplacesModel.getOneWhere({
      equals: {
        id: businessInput.user_workplace_id,
        user_uuid: req.session.user_uuid,
      },
    })

    if (!workplace) {
      return res.json({
        status: false,
        message: typeErrorMessages.CENTRE_NOT_FOUND,
        message_es: typeErrorMessages.CENTRE_NOT_FOUND_ES,
      })
    }

    let existsBusinessWorkplace = await businessModel.getOneWhere({
      equals: { user_workplace_id: businessInput.user_workplace_id },
    })

    if (existsBusinessWorkplace) {
      await businessModel.update({
        id: existsBusinessWorkplace.id,
        deleted_at: null,
      })
      return res.json({
        status: true,
        message:
          'There is already an existing company associated to this centre of work, but now is enabled',
        message_es:
          'Ya existe una empresa asociada a este centro de trabajo, pero se habilito',
      })
    }

    businessInput.user_uuid = workplace.user_uuid
    let data = await businessModel.create(businessInput)

    res.json({
      status: true,
      message: typeMessages.POST_RESPONSE_MESSAGE,
      message_es: typeMessages.POST_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },

  patch: () => async (req, res) => {
    let businessInput = aobj.extract(req.body, [
      'id',
      'profile_picture_url',
      'profile_banner_url',
    ])

    let business = await businessModel.getOneWhere({
      equals: { id: businessInput.id, user_uuid: req.session.user_uuid },
    })

    if (!business) {
      return res.json({
        status: false,
        message: typeErrorMessages.COMPANY_NOT_FOUND,
        message_es: typeErrorMessages.COMPANY_NOT_FOUND_ES,
      })
    }

    const workplace = await userWorkplacesModel.getOneWhere({
      equals: { id: businessInput.id, user_uuid: req.session.user_uuid },
    })

    businessInput.user_uuid = workplace.user_uuid
    let data = await businessModel.update(businessInput)

    res.json({
      status: true,
      message: typeMessages.PATCH_RESPONSE_MESSAGE,
      message_es: typeMessages.PATCH_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },

  delete: () => async (req, res) => {
    let businessInput = aobj.extract(req.body, ['user_workplace_id'])
    let exists = false
    exists = await businessModel.getOneWhere({
      equals: {
        user_workplace_id: businessInput.user_workplace_id,
        user_uuid: req.session.user_uuid,
      },
    })
    if (!exists) {
      return res.json({
        status: false,
        message: typeErrorMessages.COMPANY_NOT_FOUND,
        message_es: typeErrorMessages.COMPANY_NOT_FOUND_ES,
      })
    }
    let data = businessModel.delete(exists.id)
    res.json({
      status: true,
      message: typeMessages.DELETE_RESPONSE_MESSAGE,
      message_es: typeMessages.DELETE_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },
}
