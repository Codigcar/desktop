const { typeMessages, MODELS } = require('../helpers/enums')
const { logger } = require('../helpers/logger.js')

module.exports = {
  getAllProjectByStatus: () => async (req, res, next) => {
    try {
      const { user_uuid } = req.params
      let { page, length, order = [], ...where } = req.query

      const { column = null, dir = null } = order[0] ?? []
      const limit = parseInt(length) || 999999
      page = parseInt(page)

      const whereConditionl = {
        deleted_at: null,
        '$project.user_uuid$': user_uuid,
        ...(where && where),
      }

      const options = {
        order: [[column ?? 'id', dir ?? 'desc']],
        offset: page ? --page * limit : undefined,
        limit,
        include: [
          {
            attributes: ['id', 'name', 'user_uuid'],
            model: MODELS.Project,
          },
          {
            attributes: ['user_uuid', 'project_id', 'comment', 'score'],
            model: MODELS.ProjectTalentQualifications,
          },
          {
            attributes: ['user_uuid', 'full_name', 'subtitle'],
            model: MODELS.UserDetails,
          },
        ],
        where: whereConditionl,
      }

      const count = await MODELS.ProjectApplications.count(options)
      const last_page = Math.ceil(count / limit)
      const getProjects = await MODELS.ProjectApplications.findAll({
        attributes: ['id', 'user_uuid'],
        ...options,
      })

      res.json({
        status: true,
        message: typeMessages.GET_RESPONSE_MESSAGE,
        message_es: typeMessages.GET_RESPONSE_MESSAGE_ES,
        meta: {
          last_page: last_page,
        },
        data: getProjects,
      })
    } catch (error) {
      logger.error(
        '🚀 ~ file: recruiter.router.js:57 ~ getAllHiredTalents: ~ error:',
        error,
      )
      next(error)
    }
  },
}
