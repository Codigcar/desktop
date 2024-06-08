const models = require('../models')
const ApiKeysModel = models.api_keys

module.exports = {
  create: () => async (req, res) => {
    const create = await ApiKeysModel.create()

    res.json({
      status: true,
      message: 'Key created',
      message_es: 'Llave creado',
      data: create,
    })
  },

  datatable: () => async (req, res) => {
    const getAll = await ApiKeysModel.findAll({
      where: { deleted_at: null },
    })

    res.json({ status: true, message: 'All keys', data: getAll })
  },
}
