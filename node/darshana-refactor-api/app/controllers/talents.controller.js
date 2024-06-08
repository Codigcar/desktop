const models = require('../models/index')

const UserDetailsModel = models.user_details

module.exports = {
  enableTop: () => async (req, res, next) => {
    const { ids } = req.body

    // validar
    for (const id of ids) {
      const isValidId = await UserDetailsModel.findOne({
        where: { id: id, deleted_at: null },
      })

      if (!isValidId)
        return next({
          code: 404,
          message: `Talent not found: ${id}`,
          message_es: `Talent no encontrado: ${id}`,
        })
    }

    // update
    for (const id of ids) {
      await UserDetailsModel.update(
        { is_top: true },
        { where: { id, is_top: false } },
      )
    }

    return res.status(200).json({
      status: true,
      message: 'Talents top enabled',
      message_es: 'Talentos como destacado activado',
    })
  },

  disableTop: () => async (req, res, next) => {
    const { ids } = req.body

    // validar
    for (const id of ids) {
      const isValidId = await UserDetailsModel.findOne({
        where: { id, deleted_at: null },
      })

      if (!isValidId)
        return next({
          code: 404,
          message: `Talent not found: ${id}`,
          message_es: `Talento no encontrado: ${id}`,
        })
    }

    // update
    for (const id of ids) {
      await UserDetailsModel.update(
        { is_top: false },
        { where: { id, is_top: true } },
      )
    }

    res.status(200).json({
      status: true,
      message: 'Talents top disabled',
      message_es: 'Talentos como destacado removido',
    })
  },
}
