const models = require('../models/index')

const ProjectStatusModel = models.project_statuses
const ProjectModel = models.projects
const BusinessModel = models.business
const CountryModel = models.countries
const UserDetailsModel = models.user_details

module.exports = {
  datatable: () => async (req, res) => {
    let { order = [] } = req.query
    const { column = null, dir = null } = order[0] ?? []

    const whereConditionl = {
      deleted_at: null,
      is_top: true,
      project_status_id: 1,
    }

    const options = {
      where: whereConditionl,
      order: [[column || 'id', dir || 'desc']],
      include: [
        {
          attributes: ['name', 'visible'],
          model: ProjectStatusModel,
        },
        {
          attributes: ['user_workplace_id', 'user_uuid'],
          model: BusinessModel,
          include: [
            {
              attributes: ['id', 'user_uuid'],
              model: UserDetailsModel,
              as: 'owner',
            },
          ],
        },
        {
          attributes: ['name', 'nombre'],
          model: CountryModel,
        },
      ],
    }

    const getProjects = await ProjectModel.findAll({
      attributes: ['id', 'name', 'description', 'project_status_id', 'is_top'],
      ...options,
    })

    res.json({ status: true, message: 'All projects top', data: getProjects })
  },

  enableTop: () => async (req, res, next) => {
    const { ids } = req.body

    // validar
    for (const id of ids) {
      const isValidId = await ProjectModel.findOne({
        where: { id: id, deleted_at: null, project_status_id: 1 },
      })

      if (!isValidId)
        return next({
          code: 404,
          message: `Project not found: ${id}`,
          message_es: `Proyecto no encontrado: ${id}`,
        })
    }

    // update
    for (const id of ids) {
      await ProjectModel.update(
        { is_top: true },
        { where: { id, is_top: false } },
      )
    }

    return res.status(200).json({
      status: true,
      message: 'Projects top enabled',
      message_es: 'Proyectos como destacado activado',
    })
  },

  disableTop: () => async (req, res, next) => {
    const { ids } = req.body

    // validar
    for (const id of ids) {
      const isValidId = await ProjectModel.findOne({
        where: { id, deleted_at: null, project_status_id: 1 },
      })

      if (!isValidId)
        return next({
          code: 404,
          message: `Project not found: ${id}`,
          message_es: `Proyecto no encontrado: ${id}`,
        })
    }

    // update
    for (const id of ids) {
      await ProjectModel.update(
        { is_top: false },
        { where: { id, is_top: true } },
      )
    }

    res.status(200).json({
      status: true,
      message: 'Projects top disabled',
      message_es: 'Proyectos como destacado removido',
    })
  },
}
