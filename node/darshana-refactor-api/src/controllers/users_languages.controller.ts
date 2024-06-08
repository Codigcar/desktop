module.exports = {
  datatable: () => async (req: any, res: any, next: any) => {
    const { MODELS } = require('../helpers/enums')
    const { logger } = require('../helpers/logger.js')

    const { user_uuid } = req.session

    try {
      const getLanguagesByUser = await MODELS.UsersLanguages.findAll({
        where: { '$user_detail.user_uuid$': user_uuid, deleted_at: null },
        attributes: ['id'],
        include: [
          {
            attributes: ['user_uuid', 'full_name'],
            model: MODELS.UserDetails,
          },
          {
            attributes: ['id', 'name_en', 'name_es'],
            model: MODELS.Languages,
          },
        ],
      })

      return res.json({
        status: true,
        data: getLanguagesByUser,
      })
    } catch (error) {
      logger.error(
        '🚀 ~ file: users_languages.controller.ts:27 ~ datatable: ~ error:',
        error,
      )
      next(error)
    }
  },

  register_language: () => async (req: any, res: any, next: any) => {
    const { MODELS } = require('../helpers/enums')
    const { logger } = require('../helpers/logger.js')

    const { user_uuid } = req.session
    const { language_id } = req.body
    try {
      const getUser = await MODELS.UserDetails.findOne({
        where: { user_uuid, deleted_at: null },
      })

      if (!getUser)
        return res.status(404).json({
          status: false,
          message: 'User not found',
          message_es: 'Usuario no encontrado',
        })

      const register = await MODELS.UsersLanguages.create({
        user_details_id: getUser.id,
        language_id,
      })

      return res.json({
        status: true,
        data: { ...register.dataValues, user_uuid: getUser.user_uuid },
      })
    } catch (error) {
      logger.error(
        '🚀 ~ file: users_languages.controller.ts:53 ~ register_language: ~ error:',
        error,
      )
      next(error)
    }
  },

  delete_all: () => async (req: any, res: any, next: any) => {
    const { MODELS } = require('../helpers/enums')
    const { logger } = require('../helpers/logger.js')

    const { user_uuid } = req.session
    try {
      const getUser = await MODELS.UserDetails.findOne({
        where: { user_uuid, deleted_at: null },
      })

      if (!getUser)
        return res.status(404).json({
          status: false,
          message: 'User not found',
          message_es: 'Usuario no encontrado',
        })

      const deleteAll = await MODELS.UsersLanguages.destroy({
        where: { user_details_id: getUser.id },
      })

      return res.json({
        status: true,
        data: deleteAll,
      })
    } catch (error) {
      logger.log(
        '🚀 ~ file: users_languages.controller.ts:81 ~ delete_all: ~ error:',
        error,
      )
      next(error)
    }
  },
}
