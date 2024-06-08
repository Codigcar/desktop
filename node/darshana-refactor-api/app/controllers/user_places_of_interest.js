const aobj = require('aobj')
const userPlacesOfInterestModel = require('../models/user_places_of_interest')
const userDetailModel = require('../models/user_details')
const placesOfInterestModel = require('../models/places_of_interest')
const { typeErrorMessages, typeMessages } = require('../helpers/enums')

async function decorate(data) {
  const placesOfInterest = await placesOfInterestModel.getOneWhere({
    equals: { id: data.place_of_interest_id },
  })
  data.name = placesOfInterest.name

  delete data.user_detail_id
  delete data.place_of_interest_id

  return data
}

module.exports = {
  datatable: () => async (req, res) => {
    const foundUser = await userDetailModel.getOneWhere({
      equals: { user_uuid: req.query.user_uuid },
    })

    if (!foundUser) {
      return res.json({
        status: false,
        message: typeErrorMessages.USER_NOT_FOUND,
        message_es: typeErrorMessages.USER_NOT_FOUND_ES,
      })
    }

    let foundPlacesOfInterest = await userPlacesOfInterestModel.getAllWhere({
      equals: { user_detail_id: foundUser.id },
    })

    if (!foundPlacesOfInterest) {
      return res.json({
        status: false,
        message: typeErrorMessages.NOT_FOUND,
        message_es: typeErrorMessages.NOT_FOUND_ES,
      })
    }

    let response = []
    response.data = foundPlacesOfInterest

    for (const i in response.data) {
      response.data[i] = await decorate(response.data[i])
    }
    res.json({
      status: true,
      message: typeMessages.GET_RESPONSE_MESSAGE,
      message_es: typeMessages.GET_RESPONSE_MESSAGE_ES,
      ...response,
    })
  },

  create: () => async (req, res) => {
    let placeOfInteresInput = aobj.extract(req.body, ['name'])

    const foundUser = await userDetailModel.getOneWhere({
      equals: { user_uuid: req.body.user_uuid },
    })

    if (!foundUser) {
      return res.json({
        status: false,
        message: typeErrorMessages.USER_NOT_FOUND,
        message_es: typeErrorMessages.USER_NOT_FOUND_ES,
      })
    }

    let foundPlacesOfInterest = await placesOfInterestModel.getOneWhere({
      equals: { name: placeOfInteresInput.name },
    })

    if (!foundPlacesOfInterest) {
      foundPlacesOfInterest = await placesOfInterestModel.create(
        placeOfInteresInput,
      )
    }

    if (!req.body.ignore_user_uuid) {
      placeOfInteresInput.user_uuid = req.session.user_uuid
    }

    let data = await userPlacesOfInterestModel.create({
      user_detail_id: foundUser.id,
      place_of_interest_id: foundPlacesOfInterest.id,
    })

    res.json({
      status: true,
      message: typeMessages.POST_RESPONSE_MESSAGE,
      message_es: typeMessages.POST_RESPONSE_MESSAGE_ES,
      data: await decorate(data),
    })
  },

  delete: () => async (req, res) => {
    let exists = await userPlacesOfInterestModel.getOneWhere({
      equals: { id: req.query.id },
    })

    if (!exists) {
      return res.json({
        status: false,
        message: typeErrorMessages.NOT_FOUND,
        message_es: typeErrorMessages.NOT_FOUND_ES,
      })
    }

    let data = await userPlacesOfInterestModel.delete(exists.id)

    res.json({
      status: data,
      message: typeMessages.DELETE_RESPONSE_MESSAGE,
      message_es: typeMessages.DELETE_RESPONSE_MESSAGE_ES,
    })
  },

  deleteAllByUser: () => async (req, res) => {
    const foundUserDetail = await userDetailModel.getOneWhere({
      equals: { user_uuid: req.query.user_uuid },
    })

    if (!foundUserDetail) {
      return res.json({
        status: false,
        message: typeErrorMessages.USER_NOT_FOUND,
        message_es: typeErrorMessages.USER_NOT_FOUND_ES,
      })
    }

    const userPlacesOfInterestId = await userPlacesOfInterestModel.getAllWhere({
      equals: { user_detail_id: foundUserDetail.id },
    })

    if (!userPlacesOfInterestId) {
      return res.json({
        status: false,
        message: typeErrorMessages.NOT_FOUND,
        message_es: typeErrorMessages.NOT_FOUND_ES,
      })
    }

    const placeOfInterestByUser = await Promise.all(
      userPlacesOfInterestId.map((placesOfInterest) =>
        userPlacesOfInterestModel.delete(placesOfInterest.id),
      ),
    )

    res.json({
      status: true,
      message: typeMessages.DELETE_RESPONSE_MESSAGE,
      message_es: typeMessages.DELETE_RESPONSE_MESSAGE_ES,
      data: placeOfInterestByUser,
    })
  },
}
