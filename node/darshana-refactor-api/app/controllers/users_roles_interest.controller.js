const { logger } = require('../helpers/logger.js')
const RolesInterestServices = require('../services/domain/roles_interest.service')
const UsersDetailsServices = require('../services/domain/users_details.service')
const { typeMessages, MODELS } = require('../helpers/enums')
const UsersRolesInterestServices = require('../services/domain/users_roles_interest.service')

module.exports = {
  datatable: () => async (req, res, next) => {
    try {
      const usersDetailsServices = UsersDetailsServices.getInstance()

      const { user_uuid } = req.session
      // const user_uuid = 'ecb1ba13-d4d3-4920-b6da-b3b6eb92fe68'
      const { page, length, order = [], ...where } = req.query

      const { data, last_page } = await usersDetailsServices.datatable({
        page,
        length,
        order,
        attributes: ['user_uuid', 'full_name'],
        include: [
          {
            attributes: ['id', 'name'],
            model: MODELS.RolesInterest,
          },
        ],
        user_uuid,
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
        '🚀 ~ file: users_roles_interest.controller.js:25 ~ datatable: ~ error:',
        error,
      )
      next(error)
    }
  },

  registerRolByUser: () => async (req, res, next) => {
    try {
      const usersDetailsServices = UsersDetailsServices.getInstance()
      const rolesInterestServices = RolesInterestServices.getInstance()
      const usersRolesInterestServices =
        UsersRolesInterestServices.getInstance()

      const { name } = req.body
      const { user_uuid } = req.session
      // const user_uuid = 'ecb1ba13-d4d3-4920-b6da-b3b6eb92fe68'

      const getUserByUuid = await usersDetailsServices.findOne({
        attributes: ['id'],
        where: { user_uuid, deleted_at: null },
      })

      const getRolByName = await rolesInterestServices.findOne({
        where: { name },
      })

      const created = await usersRolesInterestServices.create({
        user_details_id: getUserByUuid.dataValues.id,
        roles_interest_id: getRolByName.id,
      })

      res.json({
        status: true,
        message: typeMessages.POST_RESPONSE_MESSAGE,
        data: created,
      })
    } catch (error) {
      logger.error(
        '🚀 ~ file: users_roles_interest.controller.js:37 ~ registerRolByUser: ~ error:',
        error,
      )
      next(error)
    }
  },

  deleteAllByUser: () => async (req, res) => {
    // const { name } = req.body
    const { user_uuid } = req.session
    // const user_uuid = 'ecb1ba13-d4d3-4920-b6da-b3b6eb92fe68'

    const usersDetailsServices = UsersDetailsServices.getInstance()
    // const rolesInterestServices = RolesInterestServices.getInstance()
    const usersRolesInterestServices = UsersRolesInterestServices.getInstance()

    const getUserByUuid = await usersDetailsServices.findOne({
      attributes: ['id'],
      where: { user_uuid, deleted_at: null },
    })

    const deleted = await usersRolesInterestServices.deleteAll({
      where: { user_details_id: getUserByUuid.id },
    })

    res.json({
      status: true,
      message: typeMessages.DELETE_RESPONSE_MESSAGE,
      message_es: typeMessages.DELETE_RESPONSE_MESSAGE_ES,
      data: deleted,
    })
  },
}
