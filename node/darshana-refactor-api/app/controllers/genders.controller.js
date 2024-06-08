const { logger } = require('../helpers/logger')
const GenderServices = require('../services/domain/genders.service')
const UserGendersServices = require('../services/domain/user_genders.service')

module.exports = {
  getAllGenders: () => async (req, res, next) => {
    try {
      const gendersServices = GenderServices.getInstance()

      const { page, length, order = [], ...where } = req.query
      const { data, last_page } = await gendersServices.datatable({
        page,
        length,
        order,
        ...where,
      })

      return res.json({
        status: true,
        meta: {
          last_page,
        },
        data,
      })
    } catch (error) {
      logger.log(
        '🚀 ~ file: genders.controller.js:9 ~ datatable: ~ error:',
        error,
      )
      next(error)
    }
  },

  registerByUser: () => async (req, res, next) => {
    try {
      const userGendersServices = UserGendersServices.getInstance()
      // const user_uuid = '8b77e6a1-2efe-4ee8-a294-fd54856459f7'
      const { user_uuid } = req.session
      const { gender_id } = req.body

      const getGengerByUser = await userGendersServices.findOne({
        where: { user_uuid, deleted_at: null },
      })

      if (getGengerByUser) throw new Error('Gender already exists')

      const data = await userGendersServices.registerByUser({
        user_uuid,
        gender_id,
      })

      return res.json({
        status: true,
        data,
      })
    } catch (error) {
      logger.error(
        '🚀 ~ file: genders.controller.js:57 ~ registerByUser: ~ error:',
        error,
      )
      next(error)
    }
  },

  getAllByUser: () => async (req, res, next) => {
    try {
      const userGendersServices = UserGendersServices.getInstance()

      // const user_uuid = '8b77e6a1-2efe-4ee8-a294-fd54856459f7'
      const { user_uuid } = req.session
      const getGendersByUser = await userGendersServices.getAllByUser({
        user_uuid,
      })

      return res.json({
        status: true,
        data: getGendersByUser,
      })
    } catch (error) {
      logger.error(
        '🚀 ~ file: genders.controller.js:81 ~ getAllByUser: ~ error:',
        error,
      )
      next(error)
    }
  },

  updateGenderByUser: () => async (req, res, next) => {
    try {
      const userGendersServices = UserGendersServices.getInstance()

      const { user_uuid } = req.session
      // const user_uuid = '8b77e6a1-2efe-4ee8-a294-fd54856459f7'
      const { gender_id } = req.body

      const updated = await userGendersServices.updateByUser({
        user_uuid,
        body: { gender_id },
      })

      return res.json({
        status: true,
        message: 'Updated successfully',
        data: `Datos actualizados: ${updated}`,
      })
    } catch (error) {
      logger.error(
        '🚀 ~ file: industries.controller.js:121 ~ deleteAll: ~ error:',
        error,
      )
      next(error)
    }
  },
}
