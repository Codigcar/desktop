const countriesModel = require('../models/countries')
const citiesModel = require('../models/cities')
const { MODELS } = require('../helpers/enums')

module.exports = {
  getCountries: () => async (req, res) => {
    let result = await countriesModel.getAll()
    result.sort(function (a, b) {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      }
      return 0
    })
    res.json({ status: true, data: result })
  },

  getCities: () => async (req, res) => {
    const { country_id } = req.params

    const getCountry = await MODELS.Countries.findOne({
      where: { id: country_id },
    })

    if (!getCountry)
      return res.json({
        status: false,
        message: 'Country not found',
        message_es: 'Pais no encontrado',
      })

    const result = await MODELS.Cities.findAll({
      where: { country_iso2: getCountry.iso2 },
    })
    res.json({ status: true, data: result })
  },

  getCitiesAll: () => async (req, res) => {
    const result = await citiesModel.getAll()
    res.json({ status: true, data: result })
  },
}
