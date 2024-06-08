const models = require('../models/index')
const JobModel = models.job
const JobStatusModel = models.job_status
const BusinessModel = models.business
const UserWorkplaceModel = models.user_workplaces
const WorkModalityModel = models.work_modalities
const CountryModel = models.countries
const UserDetailsModel = models.user_details

module.exports = {
  datatable: () => async (req, res) => {
    let { order = [] } = req.query
    const { column = null, dir = null } = order[0] ?? []

    const whereConditionl = {
      deleted_at: null,
      is_top: true,
      job_status_id: 1,
    }

    const options = {
      where: whereConditionl,
      order: [[column || 'id', dir || 'desc']],
      include: [
        {
          attributes: ['name', 'visible'],
          model: JobStatusModel,
        },
        {
          attributes: ['user_workplace_id', 'user_uuid'],
          model: BusinessModel,
          include: [
            {
              attributes: ['id', 'user_uuid', 'profile_picture_url'],
              model: UserDetailsModel,
              as: 'owner',
            },
            {
              attributes: ['workplace_name'],
              model: UserWorkplaceModel,
            },
          ],
        },
        { attributes: ['name', 'name_en'], model: WorkModalityModel },
        {
          attributes: ['name', 'nombre'],
          model: CountryModel,
        },
      ],
    }

    const getJobs = await JobModel.findAll({
      attributes: [
        'id',
        'name',
        'description',
        'summary',
        'created_at',
        'end_date',
        'job_status_id',
        'is_top',
      ],
      ...options,
    })

    res.json({ status: true, message: 'All jobs top', data: getJobs })
  },

  enableTop: () => async (req, res, next) => {
    const { ids } = req.body

    // validar
    for (const id of ids) {
      const isValidId = await JobModel.findOne({
        where: { id: id, deleted_at: null, job_status_id: 1 },
      })

      if (!isValidId)
        return next({
          code: 404,
          message: `Job not found: ${id}`,
          message_es: `Trabajo no encontrado: ${id}`,
        })
    }

    // update
    for (const id of ids) {
      await JobModel.update({ is_top: true }, { where: { id, is_top: false } })
    }

    return res.status(200).json({
      status: true,
      message: 'Jobs top enabled',
      message_es: 'Trabajos como destacado activado',
    })
  },

  disableTop: () => async (req, res, next) => {
    const { ids } = req.body

    // validar
    for (const id of ids) {
      const isValidId = await JobModel.findOne({
        where: { id, deleted_at: null, job_status_id: 1 },
      })

      if (!isValidId)
        return next({
          code: 404,
          message: `Job not found: ${id}`,
          message_es: `Trabajo no encontrado: ${id}`,
        })
    }

    // update
    for (const id of ids) {
      await JobModel.update({ is_top: false }, { where: { id, is_top: true } })
    }

    res.status(200).json({
      status: true,
      message: 'Jobs top disabled',
      message_es: 'Trabajos como destacado removido',
    })
  },
}
