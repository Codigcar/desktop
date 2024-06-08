const aobj = require('aobj')
const { typeMessages, typeErrorMessages } = require('../helpers/enums')
const placesOfInterestModel = require('../models/places_of_interest')

module.exports = {
  datatable: () => async (req, res) => {
    let response = await placesOfInterestModel.datatable(req)

    res.json({
      status: true,
      message: typeMessages.GET_RESPONSE_MESSAGE,
      message_es: typeMessages.GET_RESPONSE_MESSAGE_ES,
      ...response,
    })
  },

  create: () => async (req, res) => {
    let placeOfInteresInput = aobj.extract(req.body, ['name'])

    let exists = await placesOfInterestModel.getOneWhere({
      equals: { name: placeOfInteresInput.name },
    })

    if (exists) {
      return res.json({
        status: false,
        message: 'Place of interest already saved',
        message_es: 'Puesto de interes ya existe',
      })
    }

    let data = await placesOfInterestModel.create(placeOfInteresInput)

    res.json({
      status: true,
      message: typeMessages.POST_RESPONSE_MESSAGE,
      message_es: typeMessages.POST_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },

  delete: () => async (req, res) => {
    let placeOfInteresInput = aobj.extract(req.body, ['id'])

    let exists = await placesOfInterestModel.getOneWhere({
      equals: { id: placeOfInteresInput.id },
    })

    if (!exists) {
      return res.json({
        status: false,
        message: typeErrorMessages.NOT_FOUND,
        message_es: typeErrorMessages.NOT_FOUND_ES,
      })
    }

    let data = await placesOfInterestModel.delete(placeOfInteresInput.id)

    res.json({
      status: true,
      message: typeMessages.DELETE_RESPONSE_MESSAGE,
      message_es: typeMessages.DELETE_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },

  update: () => async (req, res) => {
    let placeOfInteresInput = aobj.extract(req.body, ['id', 'name'])

    let exists = await placesOfInterestModel.getOneWhere({
      equals: { id: placeOfInteresInput.id },
    })

    if (!exists) {
      return res.json({
        status: false,
        message: typeErrorMessages.NOT_FOUND,
        message_es: typeErrorMessages.NOT_FOUND_ES,
      })
    }

    let data = await placesOfInterestModel.update(placeOfInteresInput)

    res.json({
      status: true,
      message: typeMessages.PATCH_RESPONSE_MESSAGE,
      message_es: typeMessages.PATCH_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },
}
