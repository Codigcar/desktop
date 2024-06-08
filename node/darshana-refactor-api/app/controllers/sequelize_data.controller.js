const { logger } = require('../helpers/logger.js')
const SequelizeDataServices = require('../services/domain/sequelize_data.service.js')

module.exports = {
  datatable: () => async (req, res, next) => {
    try {
      const sequelizeDataServices = SequelizeDataServices.getInstance()

      const data = await sequelizeDataServices.getSequelizeData()
      const meta = await sequelizeDataServices.getSequelizeMeta()

      return res.json({
        status: true,
        seeds_migrations: data,
        table_migrations: meta,
      })
    } catch (error) {
      logger.error(
        '🚀 ~ file: sequelize_data.controller.js:38 ~ datatable: ~ error:',
        error,
      )
      next(error)
    }
  },
}
