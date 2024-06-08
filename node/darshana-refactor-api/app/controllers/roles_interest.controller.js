const RolesInterestServices = require('../services/domain/roles_interest.service')
const { logger } = require('../helpers/logger.js')

module.exports = {
  datatable: () => async (req, res, next) => {
    try {
      const rolesInterestServices = RolesInterestServices.getInstance()

      const { page, length, order = [], ...where } = req.query
      const { data, last_page } = await rolesInterestServices.datatable({
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
        '🚀 ~ file: roles_interest.controller.js:25 ~ datatable: ~ error:',
        error,
      )
      next(error)
    }
  },
}
