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
const countryMode = require('../models/countries')
const countryModel = require('../models/countries')
const favoriteModel = require('../models/user_favorites')
const jobsModel = require('../models/jobs')
const notifications = require('../models/notifications')
const projectApplicationsModel = require('../models/project_applications')
const projectsFilesModel = require('../models/project_application_files')
const projectSkillsModel = require('../models/project_skills.js')
const projectsModel = require('../models/projects.js')
const recruitersModel = require('../models/recruiters.js')
const sendMail = require('../helpers/sendMail.js')
const skillsModel = require('../models/skills.js')
const topicsModel = require('../models/topics.js')
const userDetailsModel = require('../models/user_details.js')
const userWorkplacesModel = require('../models/user_workplaces.js')
const whiz = require('../services/whiz.js')
const { logger } = require('../helpers/logger.js')

// const Sequelize = require('sequelize')
// const models = require('../models')
const subtractDays = require('../helpers/dates')

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

async function user_uuidOwnsProjectId(user_uuid, project_id) {
  let project = await projectsModel.getById(project_id)

  if (project.business_id) {
    let business = await businessModel.getById(project.business_id)

    if (business.user_uuid === user_uuid) {
      return true
    }
  }

  if (project.recruiter_id) {
    let recruiter = await recruitersModel.getById(project.recruiter_id)

    if (recruiter.user_uuid === project.recruiter_id) {
      return true
    }
  }

  return false
}

async function decorateProject(project, user_uuid = '') {
  if (!project) return project
  let u = {}
  project.topic = (
    (await topicsModel.getById(project.topic_id)) || { name: '' }
  ).name
  project.business = null
  project.recruiter = null
  if (project.business_id) {
    let business = await businessModel.getById(project.business_id)
    if (business) {
      if (business.user_workplace_id) {
        let workplace = await userWorkplacesModel.getById(
          business.user_workplace_id,
        )
        if (workplace) business.workplace = workplace
      }
      if (business.user_uuid) {
        u = await getFullUserByUUID(business.user_uuid)
        if (u) {
          if (!u.profile_picture_url)
            u.profile_picture_url = process.env.DEFAULT_PROFILE_PICTURE
        }
        project.owner = u
        project.owner.city = await cityModel.getOneWhere({
          equals: { id: u.city_id },
        })
        project.owner.country = await countryModel.getOneWhere({
          equals: { id: u.country_id },
        })
      }
      project.business = business
    }
  }

  let applications =
    (await projectApplicationsModel.getAllWhere({
      equals: { project_id: project.id },
    })) || null

  for (const application of applications) {
    application.qualification =
      await MODELS.ProjectTalentQualifications.findOne({
        where: {
          project_id: project.id,
          user_uuid: application.user_uuid,
          deleted_at: null,
        },
        attributes: ['score', 'comment'],
      })

    application.user = await getFullUserByUUID(application.user_uuid)
    if (application.user)
      application.user.favorite = (await favoriteModel.getOneWhere({
        equals: {
          type: typeFavorites.talent,
          user_uuid: user_uuid,
          favorite_uuid: application.user_uuid,
        },
      }))
        ? true
        : false
  }

  project.applications = applications

  // project skills
  const skills = await projectSkillsModel.getAllWhere({
    equals: { project_id: project.id },
  })

  project.skills = []
  for (const skill of skills) {
    const skillFromBD = await skillsModel.getOneWhere({
      equals: { id: skill.skill_id },
      isNull: ['deleted_at'],
    })
    if (skillFromBD) {
      project.skills.push(skillFromBD)
    }
  }

  // files
  const files = await projectsFilesModel.getAllWhere({
    equals: { project_id: project.id },
  })
  for (const file of files) {
    const user = await getFullUserByUUID(file.user_uuid)
    file.user = user?.person
  }
  project.files = files

  project.country =
    (await countryMode.getOneWhere({ equals: { id: project.country_id } })) ||
    {}
  project.favorite = (await favoriteModel.getOneWhere({
    equals: {
      type: typeFavorites.project,
      user_uuid: user_uuid,
      favorite_uuid: project.id,
    },
  }))
    ? true
    : false

  return project
}

module.exports = {
  getById: () => async (req, res, next) => {
    try {
      const { id } = req.params

      const getProjectById = await projectsModel.getById(id)
      if (!getProjectById) throw new Error(`project with ${id} not found`)

      const getProject = await MODELS.Project.findOne({
        attributes: ['id'],
        where: { id: id, deleted_at: null },
        include: [
          {
            attributes: ['user_workplace_id', 'user_uuid'],
            model: MODELS.Business,
            include: [
              {
                attributes: ['id', 'user_uuid', 'profile_picture_url'],
                model: MODELS.UserDetails,
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
        project: getProject,
        data: await decorateProject(getProjectById),
      })
    } catch (error) {
      logger.error('🚀 ~ file: projects.js:202 ~ getById: ~ error:', error)
      next(error)
    }
  },

  start: () => async (req, res) => {
    const { id, lang } = req.body

    const project = await MODELS.Project.findOne({
      where: { id, deleted_at: null },
    })

    if (!project) {
      return res.json({
        status: false,
        message: typeErrorMessages.PROJECT_NOT_FOUND,
        message_es: typeErrorMessages.PROJECT_NOT_FOUND_ES,
      })
    }

    if (project.project_status_id === 2) {
      return res.json({
        status: false,
        message: typeErrorMessages.PROJECT_COMPLETED,
        message_es: typeErrorMessages.PROJECT_COMPLETED_ES,
      })
    }

    const applications = await MODELS.ProjectApplications.findAll({
      where: { project_id: project.id, accepted: 2 },
    })

    if (!applications) {
      return res.json({
        status: false,
        message: 'Project without hired talents',
        message_es: 'Proyecto sin talentos contratados',
      })
    }

    const user_owns_project = await user_uuidOwnsProjectId(
      req.session.user_uuid,
      project.id,
    )

    if (!user_owns_project) {
      return res.json({
        status: false,
        message: 'You do not own the project',
        message_es: 'No eres el creador del proyecto',
      })
    }

    let talents = []

    for (const application of applications) {
      let talent = await getFullUserByUUID(application.user_uuid)
      application.accept_price
        ? (talent.price_proposal = project.price)
        : (talent.price_proposal = application.price_proposal)
      talents.push(talent)
    }

    if (!talents.length) {
      return res.json({
        status: false,
        message: typeErrorMessages.TALENT_NOT_FOUND,
        message_es: typeErrorMessages.TALENT_NOT_FOUND_ES,
      })
    }

    const recruiter = await getFullUserByUUID(req.session.user_uuid)

    // actualizar status del proyecto a 2 (iniciado)
    await projectsModel.update({
      id: project.id,
      project_status_id: 2,
    })

    for (const application of applications) {
      await notifications.create({
        user_uuid: application.user_uuid,
        action: process.env.WEB_URL + '/talent/project/' + project.id,
        been_read: 0,
        n_type: typeNotifications.PROJ_START,
        project_name: project.name,
        person_name: recruiter.person.name + ' ' + recruiter.person.last_name,
      })
    }

    //Enviar mail a talentos contratados
    for (const talent of talents) {
      talent.name = talent.person.name + ' ' + talent.person.last_name
      sendMail({
        to: {
          name: talent.person.name,
          last_name: talent.person.last_name,
          email: talent.person.email,
        },
        variables: {
          project: project,
          WEB_URL: process.env.WEB_URL,
          project_id: project.id,
        },
        mail_path: `mails/templates/ProjectStartedTalent-${lang}.html`,
        subject: lang == 'es' ? 'Proyecto Iniciado' : 'Started Project',
      })
    }

    //Enviar mail al admin de Darshana
    sendMail({
      to: {
        name: process.env.ADMIN_NAME,
        last_name: process.env.ADMIN_LAST_NAME,
        email: process.env.EMAIL_ADMIN_EMAIL,
      },
      variables: {
        project: project,
        talents: talents,
        recruiter: recruiter,
        applications: applications,
        WEB_URL: process.env.WEB_URL,
      },
      mail_path: `mails/templates/ProjectStartedAdmin-${lang}.html`,
      subject: lang == 'es' ? 'Proyecto Iniciado' : 'Started Project',
    })

    //  enviar emails a los postulados no aceptados
    const getProjectApplications = await MODELS.Project.findOne({
      attributes: ['name'],
      include: [
        {
          attributes: ['accepted', 'user_uuid'],
          model: MODELS.ProjectApplications,
        },
      ],
      where: {
        id: id,
        '$project_applications.accepted$': { [MODELS.Op.between]: [0, 1] },
      },
    })

    // enviar mails a los talentos no seleccionados
    if (
      getProjectApplications?.project_applications &&
      getProjectApplications?.project_applications?.length > 0
    ) {
      for (const talentNoSelected of getProjectApplications.project_applications) {
        const userInfoJSON = await MODELS.WhizUserCacheModel.findOne({
          where: {
            user_uuid: talentNoSelected.user_uuid,
            deleted_at: null,
          },
        })
        if (!userInfoJSON) return
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
            project_name: getProjectApplications.name,
          },
          mail_path: `mails/templates/close-project-${lang}.html`,
          subject: lang == 'es' ? 'Gracias por aplicar' : 'Thanks for applying',
        })
      }
    }

    res.json({
      status: true,
      project,
      message: 'Project started',
      message_es: 'Proyecto iniciado',
    })
  },

  end: () => async (req, res) => {
    let project = await projectsModel.getById(req.body.id)

    if (!project) {
      return res.json({
        status: false,
        message: typeErrorMessages.PROJECT_NOT_FOUND,
        message_es: typeErrorMessages.PROJECT_NOT_FOUND_ES,
      })
    }

    if (project.deleted_at) {
      return res.json({
        status: false,
        message: typeErrorMessages.PROJECT_DELETED,
        message_es: typeErrorMessages.PROJECT_DELETED_ES,
      })
    }

    if (project.project_status_id === 3) {
      return res.json({
        status: false,
        message: typeErrorMessages.PROJECT_COMPLETED,
        message_es: typeErrorMessages.PROJECT_COMPLETED_ES,
      })
    }

    let applications = await projectApplicationsModel.getAllWhere({
      equals: { project_id: project.id, accepted: 2 },
    })

    if (!applications) {
      return res.json({
        status: false,
        message: 'Project without hired talents',
        message_es: 'Proyecto sin talentos contratados',
      })
    }

    let talents = []

    for (const application of applications) {
      let talent = await getFullUserByUUID(application.user_uuid)
      application.accept_price
        ? (talent.price_proposal = project.price)
        : (talent.price_proposal = application.price_proposal)
      talents.push(talent)
    }

    if (!talents.length) {
      return res.json({
        status: false,
        message: typeErrorMessages.TALENT_NOT_FOUND,
        message_es: typeErrorMessages.TALENT_NOT_FOUND_ES,
      })
    }

    const user_owns_project = await user_uuidOwnsProjectId(
      req.session.user_uuid,
      project.id,
    )

    if (!user_owns_project) {
      return res.json({
        status: false,
        message: 'You do not own the project',
        message_es: 'No eres dueño del proyecto',
      })
    }

    const recruiter = await getFullUserByUUID(req.session.user_uuid)

    for (const application of applications) {
      await notifications.create({
        user_uuid: application.user_uuid,
        action: process.env.WEB_URL + '/talent/project/' + project.id,
        been_read: 0,
        n_type: typeNotifications.PROJ_END,
        project_name: project.name,
        person_name: recruiter.person.name + ' ' + recruiter.person.last_name,
      })
    }

    await projectsModel.update({
      id: project.id,
      project_status_id: 3,
    })

    //Send email to talents
    for (const talent of talents) {
      talent.name = talent.person.name + ' ' + talent.person.last_name
      sendMail({
        to: {
          name: talent.person.name,
          last_name: talent.person.last_name,
          email: talent.person.email,
        },
        variables: {
          project: project,
          WEB_URL: process.env.WEB_URL,
        },
        mail_path: `mails/templates/ProjectFinishedTalent-${req.body.lang}.html`,
        subject:
          req.body.lang == 'es' ? 'Proyecto Finalizado' : 'Finished Project',
      })
    }

    //Send email to recruiter
    sendMail({
      to: {
        name: recruiter.person.name,
        last_name: recruiter.person.last_name,
        email: recruiter.person.email,
      },
      variables: {
        project: project,
        talents: talents,
        recruiter: recruiter,
        WEB_URL: process.env.WEB_URL,
      },
      mail_path: `mails/templates/ProjectFinishedRecruiter-${req.body.lang}.html`,
      subject:
        req.body.lang == 'es' ? 'Proyecto Finalizado' : 'Finished Project',
    })

    //Send email to admin
    sendMail({
      to: {
        name: process.env.ADMIN_NAME,
        last_name: process.env.ADMIN_LAST_NAME,
        email: process.env.EMAIL_ADMIN_EMAIL,
      },
      variables: {
        project: project,
        talents: talents,
        recruiter: recruiter,
        applications: applications,
        WEB_URL: process.env.WEB_URL,
      },
      mail_path: `mails/templates/ProjectFinishedAdmin-${req.body.lang}.html`,
      subject:
        req.body.lang == 'es' ? 'Proyecto Finalizado' : 'Finished Project',
    })

    res.json({
      status: true,
      message: 'Project ended',
      message_es: 'Proyecto finalizado',
    })
  },

  getByProjectSkill: () => async (req, res) => {
    let projects = await projectsModel.getAllWhere({ isNull: ['deleted_at'] })
    let result = []

    for (const p of projects) {
      let skills = await projectSkillsModel.getAllWhere({
        equals: { project_id: p.id },
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
      result[i] = await decorateProject(result[i])
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
      project_status_id = 1,
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
      project_status_id,
      ...(end_date && {
        end_date: {
          [MODELS.Op.gte]: end_date === 'current' ? new Date() : end_date,
        },
      }),
      ...(from_date && {
        created_at: { [MODELS.Op.gte]: currentDate },
      }),
      ...(search?.value.length > 0 && {
        name: { [MODELS.Op.like]: '%' + search?.value + '%' },
      }),
      ...(where && where),
    }

    const options = {
      where: whereConditionl,
      order: [[column ?? 'id', dir ?? 'desc']],
      offset: page ? --page * limit : undefined,
      limit,
      include: [
        {
          attributes: ['name', 'visible'],
          model: MODELS.ProjectStatus,
        },
        {
          attributes: ['user_workplace_id', 'user_uuid'],
          model: MODELS.Business,
          include: [
            {
              attributes: ['id', 'user_uuid'],
              model: MODELS.UserDetails,
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
              model: MODELS.UserWorkplace,
            },
          ],
        },
        {
          attributes: ['name', 'nombre'],
          model: MODELS.Country,
        },
      ],
    }

    const count = await MODELS.Project.count(options)
    const last_page = Math.ceil(count / limit)
    const getProjects = await MODELS.Project.findAll({
      attributes: [
        'id',
        'name',
        'description',
        'project_status_id',
        'is_top',
        'image_url',
        'mobile_image_url',
      ],
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
  },

  posts: () => async (req, res) => {
    let projects = await projectsModel.datatable(req)
    let jobs = await jobsModel.datatable(req)

    for (const i in projects.data) {
      projects.data[i] = await decorateProject(projects.data[i])
      projects.data[i].project = true
    }

    for (const i in jobs.data) {
      jobs.data[i] = await decorateProject(jobs.data[i])
      jobs.data[i].job = true
    }

    const data = [...projects.data, ...jobs.data]

    data.sort((a, b) => b.created_at - a.created_at)

    res.json({
      status: true,
      message: typeMessages.GET_RESPONSE_MESSAGE,
      message_es: typeMessages.GET_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },

  getByUserUUID: () => async (req, res) => {
    let response = []
    response.data = []
    let projects = []

    projects = await projectsModel.getAllWhere({
      equals: { user_uuid: req.params.user_uuid },
      isNull: ['deleted_at'],
    })

    for (const i in projects) {
      response.data[i] = await decorateProject(projects[i])
    }

    res.json({
      status: true,
      message: typeMessages.GET_RESPONSE_MESSAGE,
      message_es: typeMessages.GET_RESPONSE_MESSAGE_ES,
      ...response,
    })
  },

  create: () => async (req, res) => {
    if (req.body.weeks) {
      const days = req.body.weeks * 7
      if (parseInt('' + days) < 1) {
        return res.json({
          status: false,
          message: 'The minimum is a working week (7 days)',
        })
      }
      req.body.expected_close_at = daysToDate(days)
    }

    let projectsInput = aobj.extract(req.body, [
      'body',
      'business_id',
      'weeks',
      'description',
      'end_date',
      'image_url',
      'mobile_image_url',
      'name',
      'price',

      'topic_id',
      'work_modality_id',
      'country_id',
      'min_salary',
      'max_salary',
      'hourly_wage',
      'category',
      'is_visible',
      'stripe_id',
    ])

    if (projectsInput.price < 0) {
      return res.json({
        status: false,
        message: 'Price must be higher than 0$',
        message_es: 'Precio debe ser mayor a 0$',
      })
    }

    if (projectsInput.business_id) {
      let business = await businessModel.getOneWhere({
        equals: {
          id: projectsInput.business_id,
          user_uuid: req.session.user_uuid,
        },
      })

      if (!business) {
        return res.json({
          status: false,
          message: typeErrorMessages.BUSINESS_NOT_FOUND,
          message_es: typeErrorMessages.BUSINESS_NOT_FOUND_ES,
        })
      }
    } else if (projectsInput.recruiter_id) {
      let business = await recruitersModel.getOneWhere({
        equals: {
          id: projectsInput.recruiter_id,
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
        message_es: 'Debe incluir recruiter_id o business_id',
      })
    }

    if (projectsInput.is_visible == null) {
      projectsInput.is_visible = true
    }

    projectsInput.user_uuid = req.session.user_uuid
    projectsInput.project_status_id = 1
    projectsInput.status = 1
    projectsInput.days = projectsInput.weeks * 7

    let data = await projectsModel.create(projectsInput)

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
        let skillFound = await skillsModel.getOneWhere({ equals: { name: h } })

        if (!skillFound) {
          skillFound = await skillsModel.create({ name: h })
        }

        await projectSkillsModel.create({
          project_id: data.id,
          skill_id: skillFound.id,
        })
      }
    }

    if (req.body.files.length > 0) {
      await Promise.all(
        req.body.files.map((file) => {
          projectsFilesModel.create({
            user_uuid: req.session.user_uuid,
            project_id: data.id,
            file_name: file.file_name,
            file_url: file.file_url,
            file_size: file.file_size,
          })
        }),
      )
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
      mail_path: `mails/templates/ProjectCreated-${req.body.lang}.html`,
      subject:
        req.body.lang == 'es'
          ? '¡Nuevo Proyecto creado!'
          : 'New project created!',
    })

    res.json({
      status: true,
      message: typeMessages.POST_RESPONSE_MESSAGE,
      message_es: typeMessages.POST_RESPONSE_MESSAGE_ES,
      data: await decorateProject(data),
    })
  },

  patch: () => async (req, res) => {
    if (req.body.weeks) {
      const days = req.body.weeks * 7
      if (parseInt('' + days) < 1) {
        return res.json({
          status: false,
          message: 'The minimum is a working week (7 days)',
        })
      }
      req.body.expected_close_at = daysToDate(days)
    }

    const files = req.body.files

    let projectsInput = aobj.extract(req.body, [
      'id',
      'body',
      'business_id',

      'weeks',

      'description',
      'end_date',
      'image_url',
      'mobile_image_url',
      'name',
      'price',
      'topic_id',

      'expected_close_at',
      'work_modality_id',
      'country_id',
      'is_visible',
      'min_salary',
      'max_salary',
      'hourly_wage',
      'category',
    ])

    let project = await projectsModel.getOneWhere({
      equals: { id: projectsInput.id },
    })

    if (!project) {
      return res.json({
        status: false,
        message: typeErrorMessages.PROJECT_NOT_FOUND,
        message_es: typeErrorMessages.PROJECT_NOT_FOUND_ES,
      })
    }

    if (project.project_status_id !== 1 && !files) {
      return res.json({
        status: false,
        message: 'Project already started and it is not able to be updated',
        message_es: 'Proyecto ya fue iniciado y no se puede modificar',
      })
    }

    let business
    if (projectsInput.business_id) {
      business = await businessModel.getOneWhere({
        equals: { id: projectsInput.business_id },
      })

      if (!business) {
        return res.json({
          status: false,
          message: typeErrorMessages.BUSINESS_NOT_FOUND,
          message_es: typeErrorMessages.BUSINESS_NOT_FOUND_ES,
        })
      }
    } else if (projectsInput.recruiter_id) {
      business = await recruitersModel.getOneWhere({
        equals: {
          id: projectsInput.recruiter_id,
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
        message: 'business_id should be included',
        message_es: 'Se debe incluir business_id',
      })
    }

    let data = await projectsModel.update(projectsInput)

    if (req.body.skills) {
      let prev_skills = await projectSkillsModel.getAllWhere({
        equals: { project_id: data.id },
      })
      await Promise.all(prev_skills.map((v) => projectSkillsModel.delete(v.id)))
      let habs = [
        ...new Set(
          req.body.skills
            .split(',')
            .map((v) => v.trim())
            .filter((v) => !!v),
        ),
      ]
      for (const h of habs) {
        let skillFound = await skillsModel.getOneWhere({ equals: { name: h } })

        if (!skillFound) {
          skillFound = await skillsModel.create({ name: h })
        }

        await projectSkillsModel.create({
          project_id: data.id,
          skill_id: skillFound.id,
        })
      }
    }

    if (req.body.files) {
      const { files: filesFromInput } = req.body
      const filesFromBD = await projectsFilesModel.getAllWhere({
        equals: { project_id: data.id },
        isNull: ['deleted_at'],
      })

      for (const file of filesFromBD) {
        const found = filesFromInput.find(
          (fileFromInput) => fileFromInput.id == file.id,
        )
        !found &&
          (await projectsFilesModel
            .deleteFrom()
            .where('id', '=', file.id)
            .one())
      }

      const respToUpdate = await projectsFilesModel.getAllWhere({
        equals: { project_id: data.id },
        isNull: ['deleted_at'],
      })

      const respUpdated = await Promise.all(
        filesFromInput.map((file) => {
          const toUpdate = respToUpdate.find(
            (respFile) => respFile.id == file.id,
          )
          if (toUpdate) {
            return projectsFilesModel.update({
              id: file.id,
              project_id: data.id,
              user_uuid: file.user_uuid,
              file_name: file.file_name,
              file_url: file.file_url,
              file_size: file.file_size,
            })
          } else {
            return projectsFilesModel.create({
              user_uuid: req.session.user_uuid,
              project_id: data.id,
              file_name: file.file_name,
              file_url: file.file_url,
              file_size: file.file_size,
            })
          }
        }),
      )
      if (!respUpdated) {
        return res.json({ status: false, message: respUpdated })
      }

      let business_user = await getFullUserByUUID(business.user_uuid)
      let talent_user = await getFullUserByUUID(req.session.user_uuid)
      talent_user.name =
        talent_user.person.name + ' ' + talent_user.person.last_name

      await notifications.create({
        user_uuid: business.user_uuid,
        action: process.env.WEB_URL + '/talent/project/' + project.id,
        been_read: 0,
        n_type: typeNotifications.PROJ_UPLOADED_FILE,
        project_name: project.name,
        person_name: talent_user.name,
      })
      sendMail({
        to: {
          name: business_user.person.name,
          last_name: business_user.person.last_name,
          email: business_user.person.email,
        },
        variables: {
          talent: talent_user,
          WEB_URL: process.env.WEB_URL,
          project_id: data.id,
          project: project,
        },
        mail_path: `mails/templates/TalentUploadFile-${req.body.lang}.html`,
        subject: req.body.lang == 'es' ? 'Archivo subido' : 'Uploaded file',
      })
    }

    res.json({
      status: true,
      message: typeMessages.PATCH_RESPONSE_MESSAGE,
      message_es: typeMessages.PATCH_RESPONSE_MESSAGE_ES,
      data: await decorateProject(data),
    })
  },

  delete: () => async (req, res) => {
    let projectsInput = aobj.extract(req.body, [
      'id',
      'business_id',
      'recruiter_id',
    ])

    const project = await projectsModel.getOneWhere({
      equals: { id: projectsInput.id, user_uuid: req.session.user_uuid },
    })

    if (!project) {
      return res.json({
        status: false,
        message: typeErrorMessages.PROJECT_NOT_FOUND,
        message_es: typeErrorMessages.PROJECT_NOT_FOUND_ES,
      })
    }

    const projectApplications = await projectApplicationsModel.getAllWhere({
      equals: { project_id: project.id },
    })
    if (projectApplications.length > 0) {
      projectApplications.forEach(async (element) => {
        await projectApplicationsModel.update({
          ...element,
          deleted_at: new Date(),
        })
      })
    }

    // const data = await projectsModel.delete(projectsInput.id);

    const data = await projectsModel.update({
      ...project,
      deleted_at: new Date(),
    })

    res.json({
      status: true,
      message: typeMessages.DELETE_RESPONSE_MESSAGE,
      message_es: typeMessages.DELETE_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },

  talentScore: () => async (req, res, next) => {
    const { projectId } = req.params
    const { user_uuid, score, comment } = req.body

    try {
      const getQualification = await MODELS.ProjectTalentQualifications.findOne(
        {
          where: { project_id: projectId, user_uuid, deleted_at: null },
        },
      )

      if (getQualification) {
        return res.status(404).json({
          status: false,
          message: 'Qualification already',
          message_es: 'Usuario ya calificado',
        })
      }

      const response = await MODELS.ProjectTalentQualifications.create({
        user_uuid,
        project_id: projectId,
        score,
        comment,
      })

      res.json({
        status: true,
        data: response,
      })
    } catch (error) {
      logger.error(
        '🚀 ~ file: projects.js:1092 ~ talentScore: ~ error:',
        error.message,
      )
      next(error)
    }
  },

  updateTalentScore: () => async (req, res, next) => {
    const { projectId } = req.params
    const { user_uuid, score, comment } = req.body

    try {
      let getScore = await MODELS.ProjectTalentQualifications.findOne({
        attributes: ['uuid', 'score', 'comment'],
        where: { project_id: projectId, user_uuid: user_uuid },
      })

      if (!getScore) {
        return res.status(404).json({
          status: false,
          message: 'Not found',
          message_es: 'No encontrado',
        })
      }

      getScore.score = score
      getScore.comment = comment

      await getScore.save({ fields: ['score', 'comment'] })

      res.json({
        status: true,
        data: getScore,
      })
    } catch (error) {
      logger.error(
        '🚀 ~ file: projects.js:1138 ~ updateTalentScore: ~ error:',
        error,
      )
      next(error)
    }
  },

  getAllTalentScore: () => async (req, res, next) => {
    try {
      let getScore = await MODELS.ProjectTalentQualifications.findAll()

      res.json({
        status: true,
        data: getScore,
      })
    } catch (error) {
      logger.error(
        '🚀 ~ file: projects.js:1216 ~ getAllTalentScore: ~ error:',
        error,
      )
      next(error)
    }
  },
}
