const aobj = require('aobj')

const {
  typeFavorites,
  typeNotifications,
  typeMessages,
  typeErrorMessages,
  MODELS,
} = require('../helpers/enums')
const businessModel = require('../models/business')
const cityModel = require('../models/cities')
const countryModel = require('../models/countries')
const favoriteModel = require('../models/user_favorites')
const jobApplicationsModel = require('../models/job_applications')
const jobSkillsModel = require('../models/job_skills')
const jobsModel = require('../models/jobs')
const notifications = require('../models/notifications')
const recruitersModel = require('../models/recruiters')
const sendMail = require('../helpers/sendMail')
const skillsModel = require('../models/skills')
const topicsModel = require('../models/topics')
const userDetailsModel = require('../models/user_details')
const userWorkplacesModel = require('../models/user_workplaces')
const whiz = require('../services/whiz')
const workModalityModel = require('../models/work_modality')

const models = require('../models')
const Sequelize = require('sequelize')
const subtractDays = require('../helpers/dates')

const JobModel = models.job
const JobStatusModel = models.job_status
const BusinessModel = models.business
const UserWorkplaceModel = models.user_workplaces
const WorkModalityModel = models.work_modalities
const CountryModel = models.countries
const UserDetailsModel = models.user_details

const Op = Sequelize.Op

function daysToDate(days) {
  return new Date(Date.now() + parseFloat('' + days) * 24 * 60 * 60 * 1000)
}

async function getFullUserByUUID(user_uuid) {
  let userDetails = await userDetailsModel.getOneWhere({
    equals: { user_uuid: user_uuid },
  })
  let user = await whiz.getUser(user_uuid)
  if (user && userDetails) {
    userDetails.person = (user && user.data && user.data.person) || {}
    userDetails.person.email = (user && user.data && user.data.email) || {}
    if (!userDetails.profile_picture_url)
      userDetails.profile_picture_url = process.env.DEFAULT_PROFILE_PICTURE
  }
  return userDetails
}

async function user_uuidOwnsJobId(user_uuid, job_id) {
  let job = await jobsModel.getById(job_id)

  if (job.business_id) {
    let business = await businessModel.getById(job.business_id)

    if (business.user_uuid === user_uuid) {
      return true
    }
  }

  if (job.recruiter_id) {
    let recruiter = await recruitersModel.getById(job.recruiter_id)

    if (recruiter.user_uuid === job.recruiter_id) {
      return true
    }
  }

  return false
}

async function decorateJob(job, user_logueado_uuid = '') {
  if (!job) return job

  let ownerUser = {}
  job.topic = ((await topicsModel.getById(job.topic_id)) || { name: '' }).name
  job.business = null
  job.recruiter = null
  if (job.business_id) {
    let business = await businessModel.getById(job.business_id)
    if (business) {
      if (business.user_workplace_id) {
        let workplace = await userWorkplacesModel.getById(
          business.user_workplace_id,
        )
        if (workplace) business.workplace = workplace
      }
      if (business.user_uuid) {
        ownerUser = await getFullUserByUUID(business.user_uuid)
        if (ownerUser) {
          if (!ownerUser.profile_picture_url)
            ownerUser.profile_picture_url = process.env.DEFAULT_PROFILE_PICTURE
        }
        job.owner = ownerUser
        job.owner.city = await cityModel.getOneWhere({
          equals: { id: ownerUser.city_id },
        })
        job.owner.country = await countryModel.getOneWhere({
          equals: { id: ownerUser.country_id },
        })
      }
      job.business = business
    }
  }

  let applications = await jobApplicationsModel.getAllWhere({
    equals: { job_id: job.id },
  })
  for (const application of applications) {
    application.user = await getFullUserByUUID(application.user_uuid)
    application.user.url_cv = application.file_url
  }
  job.applications = applications

  // job skills
  const skills = await jobSkillsModel.getAllWhere({
    equals: { job_id: job.id },
  })

  job.skills = []
  for (const skill of skills) {
    const skillFromBD = await skillsModel.getOneWhere({
      equals: { id: skill.skill_id },
      isNull: ['deleted_at'],
    })
    if (skillFromBD) {
      job.skills.push(skillFromBD)
    }
  }
  job.work_modality =
    (await workModalityModel.getOneWhere({
      equals: { id: job.work_modality_id },
    })) || {}
  job.country =
    (await countryModel.getOneWhere({ equals: { id: job.country_id } })) || {}
  job.favorite = (await favoriteModel.getOneWhere({
    equals: {
      type: typeFavorites.job,
      user_uuid: user_logueado_uuid,
      favorite_uuid: job.id,
    },
  }))
    ? true
    : false

  return job
}

module.exports = {
  getById: () => async (req, res) => {
    const { id } = req.params

    const getJobById = await jobsModel.getById(id)
    if (!getJobById) throw new Error(`Job with ${id} not found`)

    const getJob = await MODELS.Job.findOne({
      where: { id: id, deleted_at: null },
      attributes: ['id'],
      include: [
        {
          attributes: ['user_workplace_id', 'user_uuid'],
          model: BusinessModel,
          include: [
            {
              attributes: ['id', 'user_uuid', 'profile_picture_url'],
              model: UserDetailsModel,
              as: 'owner',
              include: [
                {
                  attributes: ['industry_id'],
                  model: MODELS.UsersIndustries,
                  include: [
                    {
                      attributes: ['name_en', 'name_es'],
                      model: MODELS.Industries,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    })

    res.json({
      status: true,
      message: typeMessages.GET_RESPONSE_MESSAGE,
      message_es: typeMessages.GET_RESPONSE_MESSAGE_ES,
      job: getJob,
      data: await decorateJob(getJobById),
    })
  },

  end: () => async (req, res) => {
    const { id, lang } = req.body

    // const job = await jobsModel.getById(id)
    const job = await MODELS.Job.findOne({
      where: { id, deleted_at: null },
    })

    if (!job) {
      return res.json({
        status: false,
        message: typeErrorMessages.JOB_NOT_FOUND,
        message_es: typeErrorMessages.JOB_NOT_FOUND_ES,
      })
    }

    if (job.job_status_id === 3) {
      return res.json({
        status: false,
        message: typeErrorMessages.JOB_COMPLETED,
        message_es: typeErrorMessages.JOB_COMPLETED_ES,
      })
    }

    const applications = await jobApplicationsModel.getAllWhere({
      equals: { job_id: job.id, selected: 2 },
    })

    if (!applications) {
      return res.json({
        status: false,
        message: 'Job without hired talents',
        message_es: 'Puesto de trabajo sin talentos contratados',
      })
    }

    let talents = []

    for (const application of applications) {
      let talent = await getFullUserByUUID(application.user_uuid)
      talents.push(talent)
    }

    if (!talents.length) {
      return res.json({
        status: false,
        message: typeErrorMessages.TALENT_NOT_FOUND,
        message_es: typeErrorMessages.TALENT_NOT_FOUND_ES,
      })
    }

    const user_owns_job = await user_uuidOwnsJobId(
      req.session.user_uuid,
      job.id,
    )

    if (!user_owns_job) {
      return res.json({
        status: false,
        message: 'You do not own the job',
        message_es: 'No eres dueño del proyecto',
      })
    }

    const recruiter = await getFullUserByUUID(req.session.user_uuid)

    await jobsModel.update({
      id: job.id,
      job_status_id: 3,
    })

    for (const application of applications) {
      await notifications.create({
        user_uuid: application.user_uuid,
        action: process.env.WEB_URL + '/talent/job/' + job.id,
        been_read: 0,
        n_type: typeNotifications.JOB_END,
        project_name: job.name,
        person_name: recruiter.person.name + ' ' + recruiter.person.last_name,
      })
    }

    for (const talent of talents) {
      talent.name = talent.person.name + ' ' + talent.person.last_name
      sendMail({
        to: {
          name: talent.person.name,
          last_name: talent.person.last_name,
          email: talent.person.email,
        },
        variables: {
          job: job,
          job_id: job.id,
          job_name: job.name,
          WEB_URL: process.env.WEB_URL,
        },
        mail_path: `mails/templates/JobFinishedTalent-${req.body.lang}.html`,
        subject: req.body.lang == 'es' ? 'Trabajo Finalizado' : 'Finished Job',
      })
    }

    //Send email to admin
    sendMail({
      to: {
        name: process.env.ADMIN_NAME,
        last_name: process.env.ADMIN_LAST_NAME,
        email: process.env.EMAIL_ADMIN_EMAIL,
      },
      variables: {
        job: job,
        talents: talents,
        recruiter: recruiter,
        WEB_URL: process.env.WEB_URL,
      },
      mail_path: `mails/templates/JobFinishedAdmin-${req.body.lang}.html`,
      subject: req.body.lang == 'es' ? 'Trabajo Finalizado' : 'Finished Job',
    })

    // enviar mails a los talentos no seleccionados
    const getJobsApplications = await MODELS.Job.findOne({
      attributes: ['name'],
      include: [
        {
          attributes: ['selected', 'user_uuid'],
          model: MODELS.JobApplications,
        },
        {
          attributes: ['id', 'user_workplace_id'],
          model: MODELS.Business,
          include: [
            {
              attributes: ['id', 'user_uuid', 'workplace_name'],
              model: MODELS.UserWorkPlaces,
            },
          ],
        },
      ],
      where: {
        id: id,
        '$job_applications.selected$': { [MODELS.Op.between]: [0, 1] },
      },
    })

    if (
      getJobsApplications?.job_applications &&
      getJobsApplications?.job_applications?.length > 0
    ) {
      for (const talentNoSelected of getJobsApplications.job_applications) {
        const userInfoJSON = await MODELS.WhizUserCacheModel.findOne({
          where: {
            user_uuid: talentNoSelected.user_uuid,
            deleted_at: null,
          },
        })
        if (!userInfoJSON) continue
        const infoUser = JSON.parse(userInfoJSON.response)
        sendMail({
          to: {
            name: infoUser.person.name,
            last_name: infoUser.person.last_name,
            email: infoUser.email,
          },
          variables: {
            WEB_URL: process.env.WEB_URL,
            talent: infoUser,
            job_name: getJobsApplications.name,
            workplace_name:
              getJobsApplications.business.user_workplace.workplace_name,
          },
          mail_path: `mails/templates/close-job-${lang}.html`,
          subject: lang == 'es' ? 'Gracias por aplicar' : 'Thanks for applying',
        })
      }
    }

    res.json({
      status: true,
      message: 'Job ended',
      message_es: 'Puesto de trabajo finalizado',
    })
  },

  getByJobSkill: () => async (req, res) => {
    let jobs = await jobsModel.getAllWhere({ isNull: ['deleted_at'] })
    let result = []

    for (const p of jobs) {
      let skills = await jobSkillsModel.getAllWhere({
        equals: { job_id: p.id },
      })
      if (
        skills
          .map((v) => (v.name + '').toLowerCase().trim())
          .includes((req.params.skill + '').toLowerCase().trim())
      ) {
        result.push(p)
      }
    }

    for (const i in result) {
      result[i] = await decorateJob(result[i])
    }

    res.json({
      status: true,
      message: typeMessages.GET_RESPONSE_MESSAGE,
      message_es: typeMessages.GET_RESPONSE_MESSAGE_ES,
      data: result,
    })
  },

  datatable: () => async (req, res) => {
    let {
      page,
      length,
      order = [],
      search,
      from_date,
      end_date,
      user_logueado_uuid,
      ...where
    } = req.query

    console.log(user_logueado_uuid)

    const { column = null, dir = null } = order[0] ?? []
    const limit = parseInt(length) || 999999
    page = parseInt(page)

    let currentDate = ''

    // is number
    if (+from_date) currentDate = subtractDays(Number(from_date))

    const whereConditionl = {
      deleted_at: null,
      ...(end_date && {
        end_date: { [Op.gte]: end_date === 'current' ? new Date() : end_date },
      }),
      ...(from_date && {
        created_at: { [Op.gte]: currentDate },
      }),
      ...(search?.value.length > 0 && {
        name: { [Op.like]: '%' + search?.value + '%' },
      }),
      ...(where && where),
    }

    const options = {
      where: whereConditionl,
      order: [[column || 'id', dir || 'desc']],
      offset: page ? --page * limit : undefined,
      limit,
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
              include: [
                {
                  attributes: ['industry_id'],
                  model: MODELS.UsersIndustries,
                  include: [
                    {
                      attributes: ['name_en', 'name_es'],
                      model: MODELS.Industries,
                    },
                  ],
                },
              ],
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

    const count = await JobModel.count(options)
    const last_page = Math.ceil(count / limit)
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

    res.json({
      status: true,
      message: typeMessages.GET_RESPONSE_MESSAGE,
      message_es: typeMessages.GET_RESPONSE_MESSAGE_ES,
      // ...responseJobs,
      meta: {
        last_page: last_page,
      },
      data: getJobs,
    })
  },

  getByUserUUID: () => async (req, res) => {
    let response = []
    response.data = []
    let jobs = []

    jobs = await jobsModel.getAllWhere({
      equals: { user_uuid: req.params.user_uuid },
      isNull: ['deleted_at'],
    })
    for (const i in jobs) {
      response.data[i] = await decorateJob(jobs[i])
    }

    res.json({
      status: true,
      message: typeMessages.GET_RESPONSE_MESSAGE,
      message_es: typeMessages.GET_RESPONSE_MESSAGE_ES,
      ...response,
    })
  },

  create: () => async (req, res) => {
    let jobsInput = aobj.extract(req.body, [
      'business_id',
      'contract_type',
      'description',
      'end_date',
      'name',
      'salary',
      'summary',
      'contract_time',
      'is_visible',
      'work_modality_id',
      'country_id',
      'min_salary',
      'max_salary',
      'hourly_wage',
      'category',
      'stripe_id',
    ])

    if (jobsInput.salary < 0) {
      return res.json({
        status: false,
        message: 'Salary must be higher than 0$',
        message_es: 'Salario debe ser mayor a 0',
      })
    }

    if (jobsInput.business_id) {
      let business = await businessModel.getOneWhere({
        equals: { id: jobsInput.business_id, user_uuid: req.session.user_uuid },
      })

      if (!business) {
        return res.json({
          status: false,
          message: typeErrorMessages.BUSINESS_NOT_FOUND,
          message_es: typeErrorMessages.BUSINESS_NOT_FOUND_ES,
        })
      }
    } else if (jobsInput.recruiter_id) {
      let business = await recruitersModel.getOneWhere({
        equals: {
          id: jobsInput.recruiter_id,
          user_uuid: req.session.user_uuid,
        },
      })

      if (!business) {
        return res.json({
          status: false,
          message: typeErrorMessages.RECRUITER_NOT_FOUND,
          message_es: typeErrorMessages.RECRUITER_NOT_FOUND_ES,
        })
      }
    } else {
      return res.json({
        status: false,
        message: 'Must include recruiter_id or business_id',
      })
    }

    if (jobsInput.is_visible == null) {
      jobsInput.is_visible = true
    }

    jobsInput.user_uuid = req.session.user_uuid
    jobsInput.job_status_id = 1
    jobsInput.status = 1
    jobsInput.is_visible = true
    let data = await jobsModel.create(jobsInput)

    if (req.body.skills) {
      let habs = [
        ...new Set(
          req.body.skills
            .split(',')
            .map((v) => v.trim())
            .filter((v) => !!v),
        ),
      ]
      for (const h of habs) {
        let foundSkill = await skillsModel.getOneWhere({ equals: { name: h } })

        if (!foundSkill) {
          foundSkill = await skillsModel.create({ name: h })
        }

        await jobSkillsModel.create({
          job_id: data.id,
          skill_id: foundSkill.id,
        })
      }
    }

    const user = await getFullUserByUUID(req.session.user_uuid)
    const { name, last_name, email } = user.person

    sendMail({
      to: {
        name,
        last_name,
        email,
      },
      variables: {
        WEB_URL: process.env.WEB_URL,
      },
      mail_path: `mails/templates/FulltimeJobCreated-${req.body.lang}.html`,
      subject:
        req.body.lang == 'es' ? '¡Nuevo Empleo creado!' : 'New job created!',
    })

    res.json({
      status: true,
      message: typeMessages.POST_RESPONSE_MESSAGE,
      message_es: typeMessages.POST_RESPONSE_MESSAGE_ES,
      data: await decorateJob(data),
    })
  },

  patch: () => async (req, res) => {
    if (req.body.days) {
      if (parseInt('' + req.body.days) < 1) {
        return res.json({
          status: false,
          message: 'The minimum is a working day (8 hours)',
        })
      }
      req.body.expected_close_at = daysToDate(req.body.days)
    }
    let jobsInput = aobj.extract(req.body, [
      'id',
      'business_id',
      'contract_type',
      'description',
      'end_date',
      'name',
      'salary',
      'summary',
      'contract_time',
      'country_id',
      'work_modality_id',
      'is_visible',
      'min_salary',
      'max_salary',
      'hourly_wage',
      'category',
    ])
    let job = await jobsModel.getOneWhere({
      equals: { id: jobsInput.id, user_uuid: req.session.user_uuid },
    })

    if (!job) {
      return res.json({
        status: false,
        message: typeErrorMessages.CENTRE_NOT_FOUND,
        message_es: typeErrorMessages.CENTRE_NOT_FOUND_ES,
      })
    }

    if (job.job_status_id !== 1) {
      return res.json({
        status: false,
        message: 'Puesto de trabajo ya fue iniciado y no se puede modificar',
      })
    }

    if (jobsInput.business_id) {
      let business = await businessModel.getOneWhere({
        equals: { id: jobsInput.business_id, user_uuid: req.session.user_uuid },
      })

      if (!business) {
        return res.json({
          status: false,
          message: typeErrorMessages.BUSINESS_NOT_FOUND,
          message_es: typeErrorMessages.BUSINESS_NOT_FOUND_ES,
        })
      }
    } else if (jobsInput.recruiter_id) {
      let business = await recruitersModel.getOneWhere({
        equals: {
          id: jobsInput.recruiter_id,
          user_uuid: req.session.user_uuid,
        },
      })

      if (!business) {
        return res.json({
          status: false,
          message: typeErrorMessages.RECRUITER_NOT_FOUND,
          message_es: typeErrorMessages.RECRUITER_NOT_FOUND_ES,
        })
      }
    } else {
      return res.json({
        status: false,
        message: 'Se debe incluir recruiter_id o business_id',
      })
    }

    let data = await jobsModel.update(jobsInput)

    if (req.body.skills) {
      let prev_skills = await jobSkillsModel.getAllWhere({
        equals: { job_id: data.id },
      })
      await Promise.all(prev_skills.map((v) => jobSkillsModel.delete(v.id)))

      let habs = [
        ...new Set(
          req.body.skills
            .split(',')
            .map((v) => v.trim())
            .filter((v) => !!v),
        ),
      ]
      for (const h of habs) {
        let foundSkill = await skillsModel.getOneWhere({ equals: { name: h } })

        if (!foundSkill) {
          foundSkill = await skillsModel.create({ name: h })
        }

        await jobSkillsModel.create({
          job_id: data.id,
          skill_id: foundSkill.id,
        })
      }
    }

    res.json({
      status: true,
      message: typeMessages.PATCH_RESPONSE_MESSAGE,
      message_es: typeMessages.PATCH_RESPONSE_MESSAGE_ES,
      data: await decorateJob(data),
    })
  },

  delete: () => async (req, res) => {
    let jobsInput = aobj.extract(req.body, [
      'id',
      'business_id',
      'recruiter_id',
    ])

    const job = await jobsModel.getOneWhere({
      equals: { id: jobsInput.id, user_uuid: req.session.user_uuid },
    })

    if (!job) {
      return res.json({
        status: false,
        message: typeErrorMessages.CENTRE_NOT_FOUND,
        message_es: typeErrorMessages.CENTRE_NOT_FOUND_ES,
      })
    }

    const jobApplications = await jobApplicationsModel.getAllWhere({
      equals: { job_id: job.id },
    })
    if (jobApplications.length > 0) {
      jobApplications.forEach(async (element) => {
        console.log(element)
        await jobApplicationsModel.update({
          ...element,
          deleted_at: new Date(),
        })
      })
    }

    const data = await jobsModel.update({
      ...job,
      deleted_at: new Date(),
    })

    res.json({
      status: true,
      message: typeMessages.DELETE_RESPONSE_MESSAGE,
      message_es: typeMessages.DELETE_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },
}
