const { logger } = require('../helpers/logger.js')
const IndustriesServices = require('../services/domain/industries.service')
const UserIndustriesServices = require('../services/domain/user_industries.service')

module.exports = {
  getAllIndustries: () => async (req, res, next) => {
    try {
      const industriesServices = IndustriesServices.getInstance()

      const { page, length, order = [], ...where } = req.query
      const { data, last_page } = await industriesServices.datatable({
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
      logger.error(
        '🚀 ~ file: industries.controller.js:24 ~ getAll: ~ error:',
        error,
      )
      next(error)
    }
  },

  registerIndustriesByUser: () => async (req, res, next) => {
    try {
      const usersIndustriesServices = UserIndustriesServices.getInstance()
      // const user_uuid = '8b77e6a1-2efe-4ee8-a294-fd54856459f7'
      const { user_uuid } = req.session
      const { industry_id } = req.body

      const getIndustryByUser = await usersIndustriesServices.findOne({
        where: { user_uuid, deleted_at: null },
      })

      if (getIndustryByUser) throw new Error('Industry already exists')

      const data = await usersIndustriesServices.registerIndustriesByUser({
        user_uuid,
        industry_id,
      })

      return res.json({
        status: true,
        data,
      })
    } catch (error) {
      logger.error(
        '🚀 ~ file: industries.controller.js:24 ~ getAll: ~ error:',
        error,
      )
      next(error)
    }
  },

  getAllIndustriesByUser: () => async (req, res, next) => {
    try {
      const usersIndustriesServices = UserIndustriesServices.getInstance()

      // const user_uuid = '8b77e6a1-2efe-4ee8-a294-fd54856459f7'
      const { user_uuid } = req.session
      const getIndustryByUser =
        await usersIndustriesServices.getAllIndustriesByUser({
          user_uuid,
        })

      return res.json({
        status: true,
        data: getIndustryByUser,
      })
    } catch (error) {
      logger.error(
        '🚀 ~ file: industries.controller.js:88 ~ getAllIndustriesByUser: ~ error:',
        error,
      )
      next(error)
    }
  },

  deleteAllByUser: () => async (req, res, next) => {
    try {
      const usersIndustriesServices = UserIndustriesServices.getInstance()

      // const user_uuid = '8b77e6a1-2efe-4ee8-a294-fd54856459f7'
      const { user_uuid } = req.session

      const destroy = await usersIndustriesServices.deleteAllIndustriesByUser({
        user_uuid,
      })

      return res.json({
        status: true,
        message: 'Industries by user deleted',
        data: destroy,
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
