const whizService = require('../services/whiz')

const models = require('../models')

const Sequelize = require('sequelize')

const JobApplicationModel = models.job_applications
const JobModel = models.job
const JobStatusModel = models.job_status

const ProjectModel = models.projects
const ProjectApplicationModel = models.project_applications
const ProjectStatusModel = models.project_statuses

const TopicModel = models.topics
const ApiKeysModel = models.api_keys
const BusinessModel = models.business
const UserWorkplaceModel = models.user_workplaces
const CountryModel = models.countries

const Op = Sequelize.Op

const getUserByEmail = async ({ email }) => {
  return await whizService.user.getByEmail({
    email: email,
    role: process.env.WHIZ_API_ROLE_USER,
  })
}

module.exports = {
  getTransaction: () => async (req, res) => {
    const { api_key } = req.query
    let { emails } = req.query

    if (!api_key)
      return res.status(400).json({
        status: false,
        message: 'api_key not found',
        message_es: 'api_key no encontrado',
      })

    if (!emails)
      return res.status(400).json({
        status: false,
        message: 'emails not found',
        message_es: 'emails no encontrado',
      })

    emails =
      emails.startsWith('"') || emails.startsWith('["')
        ? JSON.parse(emails)
        : emails

    let usersList = []
    let transactions = []

    const getApiKey = await ApiKeysModel.findOne({
      where: { uuid: api_key, deleted_at: null },
    })

    if (!getApiKey)
      return res.status(400).json({
        status: false,
        message: 'Key not found',
        message_es: 'Llave no válido',
      })

    if (typeof emails === 'string') {
      const getUser = await getUserByEmail({ email: emails })

      if (!getUser.status)
        return res.status(403).json({
          status: false,
          message: `User not found: ${emails}`,
          message_es: `Usuario no encontrado: ${emails}`,
        })

      usersList.push({
        uuid: getUser.data.uuid,
        email: getUser.data.email,
      })
    } else {
      for (const email of emails) {
        const getUser = await getUserByEmail({ email })

        if (!getUser.status)
          return res.status(404).json({
            status: false,
            message: `User not found: ${email}`,
            message_es: `Usuario no encontrado: ${email}`,
          })

        usersList.push({
          uuid: getUser.data.uuid,
          email: getUser.data.email,
        })
      }
    }

    for (const { uuid, email } of usersList) {
      const jobTransaction = await JobApplicationModel.findAll({
        attributes: ['algorand_transaction', 'near_transaction'],
        where: {
          user_uuid: uuid,
          [Op.or]: [
            { algorand_transaction: { [Op.not]: null } },
            { near_transaction: { [Op.not]: null } },
          ],
          '$job.job_status_id$': 3,
        },
        include: [
          {
            attributes: [
              'id',
              'name',
              'status',
              'contract_type',
              // "summary",
              'salary',
              'end_date',
              'contract_time',
              'is_visible',
              'user_uuid',
              'min_salary',
              'max_salary',
              'hourly_wage',
              'category',
            ],
            model: JobModel,
            include: {
              attributes: ['name'],
              model: JobStatusModel,
            },
          },
        ],
      })

      const projectTransaction = await ProjectApplicationModel.findAll({
        attributes: ['algorand_transaction', 'near_transaction'],
        where: {
          user_uuid: uuid,
          [Op.or]: [
            { algorand_transaction: { [Op.not]: null } },
            { near_transaction: { [Op.not]: null } },
          ],
          '$project.project_status_id$': 3,
        },
        include: [
          {
            attributes: [
              'id',
              'name',
              'description',
              'price',
              'days',
              'end_date',
              'expected_close_at',
              'weeks',
              'min_salary',
              'max_salary',
              'hourly_wage',
              'category',
            ],
            model: ProjectModel,
            include: [
              {
                attributes: ['name'],
                model: TopicModel,
              },
              {
                attributes: ['name'],
                model: ProjectStatusModel,
              },
              {
                attributes: ['user_workplace_id'],
                model: BusinessModel,
                include: [
                  {
                    attributes: ['workplace_name'],
                    model: UserWorkplaceModel,
                  },
                ],
              },
              {
                attributes: ['name', 'nombre'],
                model: CountryModel,
              },
            ],
          },
        ],
      })

      transactions.push({
        email,
        jobs: jobTransaction,
        projects: projectTransaction,
      })
    }

    res.json({ status: true, data: transactions })
  },
}
