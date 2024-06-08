const aobj = require('aobj')
const userDetailsModel = require('../models/user_details')
const jobsModel = require('../models/jobs')
const jobApplicationsModel = require('../models/job_applications')
const businessModel = require('../models/business')
const recruitersModel = require('../models/recruiters')

const notifications = require('../models/notifications')
const sendMail = require('../helpers/sendMail')

const countryModel = require('../models/countries')
const workplaceModel = require('../models/workplaces')
const whiz = require('../services/whiz')
const {
  typeNotifications,
  typeFavorites,
  typeErrorMessages,
  typeMessages,
  MODELS,
} = require('../helpers/enums')
const favoriteModel = require('../models/user_favorites')

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

async function decorateApplication(a) {
  a.job = await jobsModel.getById(a.job_id)
  if (a.job) {
    a.job.owner = await getFullUserByUUID(a.job?.user_uuid)
    a.job.country = a.job?.country_id
      ? await countryModel.getOneWhere({ equals: { id: a.job?.country_id } })
      : null
    a.job.business = a.job?.business_id
      ? await businessModel.getById(a.job?.business_id)
      : null
    a.job.business.workplace = a.job?.business?.user_workplace_id
      ? await workplaceModel.getById(a.job.business.user_workplace_id)
      : null
    a.job.favorite = (await favoriteModel.getOneWhere({
      equals: {
        type: typeFavorites.job,
        user_uuid: a.user_uuid,
        favorite_uuid: a.job.id,
      },
    }))
      ? true
      : false
  }
  return a
}

module.exports = {
  datatable: () => async (req, res) => {
    let response = await jobApplicationsModel.datatable(req)
    for (const i in response.data) {
      response.data[i] = await decorateApplication(response.data[i])
    }
    res.json({
      status: true,
      message: typeMessages.GET_RESPONSE_MESSAGE,
      message_es: typeMessages.GET_RESPONSE_MESSAGE_ES,
      ...response,
    })
  },

  getAllWithSequelize: () => async (req, res) => {
    let { page, length, order = [], ...where } = req.query

    const { column = null, dir = null } = order[0] ?? []
    const limit = parseInt(length) || 999999
    page = parseInt(page)

    const whereConditionl = {
      ...(where && where),
    }

    const options = {
      order: [[column ?? 'id', dir ?? 'desc']],
      offset: page ? --page * limit : undefined,
      limit,
      include: [
        {
          attributes: ['id', 'name', 'user_uuid', 'createdAt', 'summary'],
          model: MODELS.Job,
          include: [
            {
              attributes: ['id', 'name', 'visible'],
              model: MODELS.JobStatus,
            },
            {
              attributes: ['user_workplace_id', 'user_uuid'],
              model: MODELS.Business,
              include: [
                {
                  attributes: ['id', 'user_uuid', 'profile_picture_url'],
                  model: MODELS.UserDetails,
                  as: 'owner',
                },
                {
                  attributes: ['workplace_name'],
                  model: MODELS.UserWorkplace,
                },
              ],
            },
            { attributes: ['name', 'name_en'], model: MODELS.WorkModality },
            {
              attributes: ['name', 'nombre'],
              model: MODELS.Country,
            },
          ],
        },
        {
          attributes: [
            'id',
            'user_uuid',
            'full_name',
            'subtitle',
            'profile_picture_url',
          ],
          model: MODELS.UserDetails,
        },
      ],
      where: whereConditionl,
    }

    const count = await MODELS.JobApplications.count(options)
    const last_page = Math.ceil(count / limit)
    const getJobsApplications = await MODELS.JobApplications.findAll({
      attributes: [
        'user_uuid',
        'job_id',
        'summary',
        'experience',
        'file_url',
        'file_name',
        'file_size',
        'time_proposal',
        'selected',
        'close_at_proposal',
        'algorand_transaction',
        'near_transaction',
        'ready_to_close',
        'updated',
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
      data: getJobsApplications,
    })
  },

  getById: () => async (req, res) => {
    let response = await jobApplicationsModel.getById(req.params.id)

    if (!response) {
      return res.json({
        status: false,
        message: typeErrorMessages.APPLICATION_NOT_FOUND,
        message_es: typeErrorMessages.APPLICATION_NOT_FOUND_ES,
      })
    }

    if (response.deleted_at) {
      return res.json({
        status: false,
        message: typeErrorMessages.APPLICATION_DELETED_MESSAGE,
        message_es: typeErrorMessages.APPLICATION_DELETED_MESSAGE_ES,
      })
    }

    res.json({
      status: true,
      message: typeMessages.GET_RESPONSE_MESSAGE,
      message_es: typeMessages.GET_RESPONSE_MESSAGE_ES,
      data: await decorateApplication(response),
    })
  },

  getByUUID: () => async (req, res) => {
    const { uuid } = req.params

    const jobsApplicationsByUser = await jobApplicationsModel.getAllWhere({
      equals: { user_uuid: uuid },
      isNull: ['deleted_at'],
    })

    if (jobsApplicationsByUser.length === 0) {
      return res.json({
        status: true,
        message: typeErrorMessages.APPLICATION_NOT_FOUND,
        message_es: typeErrorMessages.APPLICATION_NOT_FOUND_ES,
      })
    }
    let response = []
    response.data = []

    for (const i in jobsApplicationsByUser) {
      response.data[i] = await decorateApplication(jobsApplicationsByUser[i])
    }
    res.json({
      status: true,
      message: typeMessages.GET_RESPONSE_MESSAGE,
      message_es: typeMessages.GET_RESPONSE_MESSAGE_ES,
      ...response,
    })
  },

  create: () => async (req, res) => {
    if (req.body.days) {
      if (parseInt('' + req.body.days) < 1) {
        return res.json({
          status: false,
          message: 'The minimum is a working day (8 hours)',
        })
      }
      req.body.close_at_proposal = daysToDate(req.body.days)
    }
    let jobApplicationsInput = aobj.extract(req.body, [
      'job_id',
      'summary',
      'experience',
      'file_url',
      'file_name',
      'file_size',
      'updated',
    ])

    let job = await jobsModel.getOneWhere({
      equals: { id: jobApplicationsInput.job_id },
    })

    if (!job) {
      return res.json({
        status: false,
        message: typeErrorMessages.JOB_NOT_FOUND,
        message_es: typeErrorMessages.JOB_NOT_FOUND_ES,
      })
    }

    if (!jobApplicationsInput.file_url) {
      return res.json({
        status: false,
        message: 'File URL ' + typeErrorMessages.IS_REQUIRED,
        message_es: 'File URL ' + typeErrorMessages.IS_REQUIRED_ES,
      })
    }

    if (!jobApplicationsInput.file_name) {
      return res.json({
        status: false,
        message: 'File name ' + typeErrorMessages.IS_REQUIRED,
        message_es: 'Nombre del archivo ' + typeErrorMessages.IS_REQUIRED_ES,
      })
    }

    if (!jobApplicationsInput.file_size) {
      return res.json({
        status: false,
        message: 'File size ' + typeErrorMessages.IS_REQUIRED,
        message_es: 'Tamaño del archivo ' + typeErrorMessages.IS_REQUIRED_ES,
      })
    }

    if (!jobApplicationsInput.summary) {
      return res.json({
        status: false,
        message: 'Summary ' + typeErrorMessages.IS_REQUIRED,
        message_es: 'Resumen ' + typeErrorMessages.IS_REQUIRED_ES,
      })
    }

    if (!jobApplicationsInput.experience) {
      return res.json({
        status: false,
        message: 'Experience ' + typeErrorMessages.IS_REQUIRED,
        message_es: 'Experiencia ' + typeErrorMessages.IS_REQUIRED_ES,
      })
    }

    jobApplicationsInput.selected = 0

    let existing = await jobApplicationsModel.getOneWhere({
      equals: {
        user_uuid: req.session.user_uuid,
        job_id: jobApplicationsInput.job_id,
      },
    })

    if (existing) {
      return res.json({
        status: false,
        message: typeErrorMessages.ALREADY_PENDING_APPLICATION,
        message_es: typeErrorMessages.ALREADY_PENDING_APPLICATION_ES,
      })
    }

    jobApplicationsInput.user_uuid = req.session.user_uuid
    let data = await jobApplicationsModel.create(jobApplicationsInput)

    let talent_user = await getFullUserByUUID(req.session.user_uuid)

    if (job.business_id) {
      let business = await businessModel.getById(job.business_id)
      if (business) {
        const business_user = await getFullUserByUUID(business.user_uuid)
        await notifications.create({
          user_uuid: business.user_uuid,
          action: process.env.WEB_URL + '/recruiter/job-detail/' + job.id,
          been_read: 0,
          n_type: typeNotifications.JOB_APPLICATION_NEW,
          project_name: job.name,
          person_name:
            talent_user.person.name + ' ' + talent_user.person.last_name,
        })
        if (business_user && talent_user) {
          sendMail({
            to: {
              name: business_user.person.name,
              last_name: business_user.person.last_name,
              email: business_user.person.email,
            },
            variables: {
              talent: talent_user,
              WEB_URL: process.env.WEB_URL,
              job: job,
            },
            mail_path: `mails/templates/NewFulltimeJobApplication-${req.body.lang}.html`,
            subject:
              req.body.lang == 'es'
                ? typeMessages.NEW_POSTULATION_RECEIVED_ES
                : typeMessages.NEW_POSTULATION_RECEIVED_ES,
          })
        }
      }
    }

    res.json({
      status: true,
      message: typeMessages.POST_RESPONSE_MESSAGE,
      message_es: typeMessages.POST_RESPONSE_MESSAGE_ES,
      data: await decorateApplication(data),
    })
  },

  invite_talent: () => async (req, res) => {
    let input = aobj.extract(req.body, ['job_id', 'talent_user_uuid'])

    let talent_user = await getFullUserByUUID(input.talent_user_uuid)

    if (!talent_user) {
      return res.json({
        status: false,
        message: typeErrorMessages.TALENT_NOT_FOUND,
        message_es: typeErrorMessages.TALENT_NOT_FOUND_ES,
      })
    }

    let job = await jobsModel.getOneWhere({ equals: { id: input.job_id } })

    if (!job) {
      return res.json({
        status: false,
        message: typeErrorMessages.JOB_NOT_FOUND,
        message_es: typeErrorMessages.JOB_NOT_FOUND_ES,
      })
    }

    if (job.deleted_at) {
      return res.json({
        status: false,
        message: typeErrorMessages.JOB_DELETED,
        message_es: typeErrorMessages.JOB_DELETED_ES,
      })
    }

    await notifications.create({
      user_uuid: talent_user.user_uuid,
      action: process.env.WEB_URL + '/talent/job/' + job.id,
      been_read: 0,
      n_type: typeNotifications.JOB_INV_NEW,
      project_name: job.name,
      person_name: talent_user.person.name + ' ' + talent_user.person.last_name,
    })

    let business = await businessModel.getById(job.business_id)
    if (business) {
      const business_user = await getFullUserByUUID(business.user_uuid)
      sendMail({
        to: {
          name: talent_user.person.name,
          last_name: talent_user.person.last_name,
          email: talent_user.person.email,
        },
        variables: {
          talent: talent_user,
          recruiter: business_user,
          job_name: job.name,
          job_id: job.id,
          WEB_URL: process.env.WEB_URL,
        },
        mail_path: `mails/templates/InvitToJob-${req.body.lang}.html`,
        subject:
          req.body.lang == 'es' ? 'Invitacion a un trabajo' : 'Job invitation',
      })
    }

    res.json({
      status: true,
      message: typeMessages.INVITATION_SENT,
      message_es: typeMessages.INVITATION_SENT_ES,
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
      req.body.close_at_proposal = daysToDate(req.body.days)
    }
    let jobApplicationsInput = aobj.extract(req.body, [
      'id',
      'proposal',
      'procedure_text',
      'updated',
    ])

    let exists = await jobApplicationsModel.getOneWhere({
      equals: { id: jobApplicationsInput.id, user_uuid: req.session.user_uuid },
    })

    if (!exists) {
      return res.json({
        status: false,
        message: typeErrorMessages.APPLICATION_NOT_FOUND,
        message_es: typeErrorMessages.APPLICATION_NOT_FOUND_ES,
      })
    }

    if (exists.deleted_at) {
      return res.json({
        status: false,
        message: typeErrorMessages.APPLICATION_DELETED_MESSAGE,
        message_es: typeErrorMessages.APPLICATION_DELETED_MESSAGE_ES,
      })
    }

    jobApplicationsInput.user_uuid = req.session.user_uuid
    jobApplicationsInput.updated = true
    let data = await jobApplicationsModel.update(jobApplicationsInput)

    res.json({
      status: true,
      message: typeMessages.PATCH_RESPONSE_MESSAGE,
      message_es: typeMessages.PATCH_RESPONSE_MESSAGE_ES,
      data: await decorateApplication(data),
    })
  },

  patchUpdated: () => async (req, res) => {
    let jobApplicationsInput = aobj.extract(req.body, ['id', 'updated'])

    let exists = await jobApplicationsModel.getOneWhere({
      equals: { id: jobApplicationsInput.id, user_uuid: req.session.user_uuid },
    })

    if (!exists) {
      return res.json({
        status: false,
        message: typeErrorMessages.APPLICATION_NOT_FOUND,
        message_es: typeErrorMessages.APPLICATION_NOT_FOUND_ES,
      })
    }

    if (exists.deleted_at) {
      return res.json({
        status: false,
        message: typeErrorMessages.APPLICATION_DELETED_MESSAGE,
        message_es: typeErrorMessages.APPLICATION_DELETED_MESSAGE_ES,
      })
    }

    let data = await jobApplicationsModel.update(jobApplicationsInput)

    res.json({
      status: true,
      message: typeMessages.PATCH_RESPONSE_MESSAGE,
      message_es: typeMessages.PATCH_RESPONSE_MESSAGE_ES,
      data: await decorateApplication(data),
    })
  },

  readyToClose: () => async (req, res) => {
    let jobApplicationsInput = aobj.extract(req.body, ['id'])

    let application = await jobApplicationsModel.getOneWhere({
      equals: { id: jobApplicationsInput.id, user_uuid: req.session.user_uuid },
    })

    if (!application) {
      return res.json({
        status: false,
        message: typeErrorMessages.APPLICATION_NOT_FOUND,
        message_es: typeErrorMessages.APPLICATION_NOT_FOUND_ES,
      })
    }

    if (application.deleted_at) {
      return res.json({
        status: false,
        message: typeErrorMessages.APPLICATION_DELETED_MESSAGE,
        message_es: typeErrorMessages.APPLICATION_DELETED_MESSAGE_ES,
      })
    }

    if (application.ready_to_close) {
      return res.json({
        status: false,
        message: typeErrorMessages.PROPOSAL_ALREADY_CLOSED,
        message_es: typeErrorMessages.PROPOSAL_ALREADY_CLOSED_ES,
      })
    }

    jobApplicationsInput.ready_to_close = true

    let data = await jobApplicationsModel.update(jobApplicationsInput)

    let job = await jobsModel.getById(data.job_id)

    let noti = {
      user_uuid: null,
      action:
        process.env.WEB_URL + '/' + req.body.lang + '/job/details/' + job.id,
      been_read: 0,
      n_type: typeNotifications.PROJ_REQ_END,
      job_name: job.name,
    }

    if (job.business_id) {
      let business = await businessModel.getById(job.business_id)

      if (business.user_uuid) {
        noti.user_uuid = business.user_uuid
        await notifications.create(noti)
      }
    }

    if (job.recruiter_id) {
      let recruiter = await recruitersModel.getById(job.recruiter_id)

      if (recruiter.user_uuid) {
        noti.user_uuid = recruiter.user_uuid
        await notifications.create(noti)
      }
    }

    res.json({
      status: true,
      message: typeMessages.PROPOSAL_READY_TO_CLOSE,
      message_es: typeMessages.PROPOSAL_READY_TO_CLOSE_ES,
      data: await decorateApplication(data),
    })
  },

  check: () => async (req, res) => {
    let input = aobj.extract(req.params, ['job_id'])

    let application = await jobApplicationsModel.getOneWhere({
      equals: { job_id: input.job_id, user_uuid: req.session.user_uuid },
    })

    if (!application) {
      return res.json({
        status: false,
        message: typeErrorMessages.APPLICATION_NOT_FOUND,
        message_es: typeErrorMessages.APPLICATION_NOT_FOUND_ES,
      })
    }

    if (application.deleted_at) {
      return res.json({
        status: false,
        message: typeErrorMessages.APPLICATION_DELETED_MESSAGE,
        message_es: typeErrorMessages.APPLICATION_DELETED_MESSAGE_ES,
      })
    }

    res.json({
      status: true,
      message: typeMessages.GET_RESPONSE_MESSAGE,
      message_es: typeMessages.GET_RESPONSE_MESSAGE_ES,
      data: await decorateApplication(application),
    })
  },

  closeJob: () => async (req, res) => {
    let jobApplicationsInput = aobj.extract(req.body, ['id'])

    let application = await jobApplicationsModel.getOneWhere({
      equals: { id: jobApplicationsInput.id },
    })

    if (!application) {
      return res.json({
        status: false,
        message: typeErrorMessages.APPLICATION_NOT_FOUND,
        message_es: typeErrorMessages.APPLICATION_NOT_FOUND_ES,
      })
    }

    if (application.deleted_at) {
      return res.json({
        status: false,
        message: typeErrorMessages.APPLICATION_DELETED_MESSAGE,
        message_es: typeErrorMessages.APPLICATION_DELETED_MESSAGE_ES,
      })
    }

    if (!application.selected) {
      return res.json({
        status: false,
        message: typeErrorMessages.PROPOSAL_NO_ACCEPTED,
        message_es: typeErrorMessages.PROPOSAL_NO_ACCEPTED_ES,
      })
    }

    let job = await jobsModel.getOneWhere({
      equals: { id: application.job_id },
    })

    if (!job) {
      return res.json({
        status: false,
        message: typeErrorMessages.JOB_NOT_FOUND,
        message_es: typeErrorMessages.JOB_NOT_FOUND_ES,
      })
    }

    if (job.deleted_at) {
      return res.json({
        status: false,
        message: typeErrorMessages.JOB_DELETED,
        message_es: typeErrorMessages.JOB_DELETED_ES,
      })
    }

    if (!(await user_uuidOwnsJobId(req.session.user_uuid, job.id))) {
      return res.json({
        status: false,
        message: typeErrorMessages.PROPOSAL_NOT_ACCEPTED,
        message_es: typeErrorMessages.PROPOSAL_NOT_ACCEPTED_ES,
      })
    }

    if (!job.status) {
      return res.json({
        status: false,
        message: typeErrorMessages.JOB_DISABLE,
        message_es: typeErrorMessages.JOB_DISABLE_ES,
      })
    }

    let data = await jobApplicationsModel.update(jobApplicationsInput)

    res.json({
      status: true,
      message: typeMessages.PATCH_RESPONSE_MESSAGE,
      message_es: typeMessages.PATCH_RESPONSE_MESSAGE_ES,
      data: await decorateApplication(data),
    })
  },

  // cambiar etapa
  changeApplicationStatus: () => async (req, res) => {
    const { status, lang } = req.body

    if (status == (null || undefined)) {
      return res.json({
        status: false,
        message: 'Status is required',
        message_es: 'Enviar el status es obligatorio',
      })
    }

    let jobApplicationsInput = aobj.extract(req.body, ['application_id'])

    let application = await jobApplicationsModel.getOneWhere({
      equals: { id: jobApplicationsInput.application_id },
    })

    if (!application) {
      return res.json({
        status: false,
        message: typeErrorMessages.APPLICATION_NOT_FOUND,
        message_es: typeErrorMessages.APPLICATION_NOT_FOUND_ES,
      })
    }

    if (application.deleted_at) {
      return res.json({
        status: false,
        message: typeErrorMessages.APPLICATION_DELETED_MESSAGE,
        message_es: typeErrorMessages.APPLICATION_DELETED_MESSAGE_ES,
      })
    }

    let job = await jobsModel.getOneWhere({
      equals: { id: application.job_id },
    })

    if (!job) {
      return res.json({
        status: false,
        message: typeErrorMessages.JOB_NOT_FOUND,
        message_es: typeErrorMessages.JOB_NOT_FOUND_ES,
      })
    }

    if (job.deleted_at) {
      return res.json({
        status: false,
        message: typeErrorMessages.JOB_DELETED,
        message_es: typeErrorMessages.JOB_DELETED_ES,
      })
    }

    if (!job.status) {
      return res.json({
        status: false,
        message: typeErrorMessages.JOB_DISABLE,
        message_es: typeErrorMessages.JOB_DISABLE_ES,
      })
    }

    if (job.job_status_id !== 1) {
      return res.json({
        status: false,
        message: 'The job must be in "Recruiting" status to select a proposal',
        message_es:
          'El trabajo debe estar en estado "Reclutando" para aceptar una propuesta',
      })
    }

    if (application.job_id !== job.id) {
      return res.json({
        status: false,
        message: 'Proposal does not correspond to this job',
        message_es: 'Propuesta no corresponde a este trabajo',
      })
    }

    let talent_user = await getFullUserByUUID(application.user_uuid)

    if (!talent_user) {
      return res.json({
        status: false,
        message: typeErrorMessages.TALENT_NOT_FOUND,
        message_es: typeErrorMessages.TALENT_NOT_FOUND_ES,
      })
    }

    let data = {}

    // postulado
    if (status === 0) {
      if (application.selected === 2) {
        await notifications.create({
          user_uuid: application.user_uuid,
          action: process.env.WEB_URL + '/talent/job/' + job.id,
          been_read: 0,
          n_type: typeNotifications.JOB_UNHIRED_TALENT,
          project_name: job.name,
          person_name:
            talent_user.person.name + ' ' + talent_user.person.last_name,
        })
      }

      data = await jobApplicationsModel.update({
        id: application.id,
        selected: status,
      })
    }

    // seleccionado
    if (status === 1) {
      // cambiar desde postulado a seleccionado
      if (application.selected === 0) {
        await notifications.create({
          user_uuid: application.user_uuid,
          action: process.env.WEB_URL + '/talent/job/' + job.id,
          been_read: 0,
          n_type: typeNotifications.JOB_FROM_POSTULATION_TO_SELECT_TALENT,
          project_name: job.name,
          person_name:
            talent_user.person.name + ' ' + talent_user.person.last_name,
        })
      }

      // cambia desde contratado a seleccionado
      if (application.selected === 2) {
        await notifications.create({
          user_uuid: application.user_uuid,
          action: process.env.WEB_URL + '/talent/job/' + job.id,
          been_read: 0,
          n_type: typeNotifications.JOB_UNHIRED_TALENT,
          project_name: job.name,
          person_name:
            talent_user.person.name + ' ' + talent_user.person.last_name,
        })
      }

      data = await jobApplicationsModel.update({
        id: application.id,
        selected: status,
      })
    }

    // contratado
    if (status === 2) {
      data = await jobApplicationsModel.update({
        id: application.id,
        selected: status,
      })

      if (data) {
        let talent_user = await getFullUserByUUID(application.user_uuid)
        let recruiter_user = await getFullUserByUUID(req.session.user_uuid)
        talent_user.name =
          talent_user.person.name + ' ' + talent_user.person.last_name
        recruiter_user.name =
          recruiter_user.person.name + ' ' + recruiter_user.person.last_name

        await notifications.create({
          user_uuid: talent_user.user_uuid,
          action: process.env.WEB_URL + '/talent/job/' + job.id,
          been_read: 0,
          n_type: typeNotifications.JOB_HIRED_TALENT,
          project_name: job.name,
          person_name:
            talent_user.person.name + ' ' + talent_user.person.last_name,
        })
        //Send email to admin
        sendMail({
          to: {
            name: process.env.ADMIN_NAME,
            last_name: process.env.ADMIN_LAST_NAME,
            email: process.env.EMAIL_ADMIN_EMAIL,
          },
          variables: {
            WEB_URL: process.env.WEB_URL,
            talent: talent_user,
            recruiter: recruiter_user,
            job: job,
          },
          mail_path: `mails/templates/HiredToJobAdmin-${lang}.html`,
          subject:
            lang == 'es'
              ? 'Se seleccionó un talento para un trabajo'
              : 'Talent selected for Job',
        })

        sendMail({
          to: {
            name: talent_user.person.name,
            last_name: talent_user.person.last_name,
            email: talent_user.person.email,
          },
          variables: {
            job_name: job.name,
            job_id: job.id,
            WEB_URL: process.env.WEB_URL,
          },
          mail_path: `mails/templates/HiredToJob-${req.body.lang}.html`,
          subject:
            req.body.lang == 'es' ? 'Contratado a un empleo' : 'Hired to job',
        })
      }
    }

    res.json({
      status: true,
      message: typeMessages.PATCH_RESPONSE_MESSAGE,
      message_es: typeMessages.PATCH_RESPONSE_MESSAGE_ES,
      data: await decorateApplication(data),
    })
  },

  select: () => async (req, res) => {
    let jobApplicationsInput = aobj.extract(req.body, ['id'])

    let application = await jobApplicationsModel.getOneWhere({
      equals: { id: jobApplicationsInput.id },
    })

    if (!application) {
      return res.json({
        status: false,
        message: typeErrorMessages.APPLICATION_NOT_FOUND,
        message_es: typeErrorMessages.APPLICATION_NOT_FOUND_ES,
      })
    }

    if (application.deleted_at) {
      return res.json({
        status: false,
        message: typeErrorMessages.APPLICATION_DELETED_MESSAGE,
        message_es: typeErrorMessages.APPLICATION_DELETED_MESSAGE_ES,
      })
    }

    let job = await jobsModel.getOneWhere({
      equals: { id: application.job_id },
    })

    if (!job) {
      return res.json({
        status: false,
        message: typeErrorMessages.JOB_NOT_FOUND,
        message_es: typeErrorMessages.JOB_NOT_FOUND_ES,
      })
    }

    if (job.deleted_at) {
      return res.json({
        status: false,
        message: typeErrorMessages.JOB_DELETED,
        message_es: typeErrorMessages.JOB_DELETED_ES,
      })
    }

    if (!job.status) {
      return res.json({
        status: false,
        message: typeErrorMessages.JOB_DISABLE,
        message_es: typeErrorMessages.JOB_DISABLE_ES,
      })
    }

    if (job.job_status_id !== 1) {
      return res.json({
        status: false,
        message: 'The job must be in "Recruiting" status to select a proposal',
        message_es:
          'El proyecto debe estar en estado "Reclutando" para aceptar una propuesta',
      })
    }

    if (application.job_id !== job.id) {
      return res.json({
        status: false,
        message: 'Proposal does not correspond to this job',
        message_es: 'Propuesta no corresponde a este proyecto',
      })
    }
    await jobsModel.update({ id: job.id, job_status_id: 2 })

    let data = await jobApplicationsModel.update({
      id: application.id,
      selected: 1,
    })

    if (data) {
      let talent_user = await getFullUserByUUID(application.user_uuid)
      let recruiter_user = await getFullUserByUUID(req.session.user_uuid)
      talent_user.name =
        talent_user.person.name + ' ' + talent_user.person.last_name
      recruiter_user.name =
        recruiter_user.person.name + ' ' + recruiter_user.person.last_name
      //Send email to admin
      sendMail({
        to: {
          name: process.env.ADMIN_NAME,
          last_name: process.env.ADMIN_LAST_NAME,
          email: process.env.EMAIL_ADMIN_EMAIL,
        },
        variables: {
          talent: talent_user,
          recruiter: recruiter_user,
          job: job,
        },
        mail_path: '/' + req.body.lang + '/mail/proposal-accepted-job',
        subject:
          req.body.lang == 'es'
            ? 'Se seleccionó un talento para un trabajo'
            : 'Talent selected for Job',
      })
    }

    res.json({
      status: true,
      message: typeMessages.PATCH_RESPONSE_MESSAGE,
      message_es: typeMessages.PATCH_RESPONSE_MESSAGE_ES,
      data: await decorateApplication(data),
    })
  },

  unselect: () => async (req, res) => {
    let jobApplicationsInput = aobj.extract(req.body, ['id'])

    let application = await jobApplicationsModel.getOneWhere({
      equals: { id: jobApplicationsInput.id },
    })
    let user = await getFullUserByUUID(application.user_uuid)

    if (!application) {
      return res.json({
        status: false,
        message: typeErrorMessages.APPLICATION_NOT_FOUND,
        message_es: typeErrorMessages.APPLICATION_NOT_FOUND_ES,
      })
    }

    if (application.deleted_at) {
      return res.json({
        status: false,
        message: typeErrorMessages.APPLICATION_DELETED_MESSAGE,
        message_es: typeErrorMessages.APPLICATION_DELETED_MESSAGE_ES,
      })
    }

    let job = await jobsModel.getOneWhere({
      equals: { id: application.job_id },
    })

    if (!job) {
      return res.json({
        status: false,
        message: typeErrorMessages.JOB_NOT_FOUND,
        message_es: typeErrorMessages.JOB_NOT_FOUND_ES,
      })
    }

    if (job.deleted_at) {
      return res.json({
        status: false,
        message: typeErrorMessages.JOB_DELETED,
        message_es: typeErrorMessages.JOB_DELETED_ES,
      })
    }

    if (!job.status) {
      return res.json({
        status: false,
        message: typeErrorMessages.JOB_DISABLE,
        message_es: typeErrorMessages.JOB_DISABLE_ES,
      })
    }

    if (job.job_status_id !== 1) {
      return res.json({
        status: false,
        message: 'The job must be in "Recruiting" status to select a proposal',
        message_es:
          'El proyecto debe estar en estado "Reclutando" para aceptar una propuesta',
      })
    }

    if (application.job_id !== job.id) {
      return res.json({
        status: false,
        message: 'Proposal does not correspond to this job',
        message_es: 'Propuesta no corresponde a este proyecto',
      })
    }

    let data = await jobApplicationsModel.update({
      id: application.id,
      selected: 0,
    })

    if (user) {
      await notifications.create({
        user_uuid: user.user_uuid,
        action:
          process.env.WEB_URL +
          '/' +
          req.body.lang +
          '/job/apply/' +
          application.job_id +
          '/status',
        been_read: 0,
        n_type: 'JOB_UNSELECT',
        person_name: req.session.user_name,
      })
    }

    res.json({
      status: true,
      message: typeMessages.PATCH_RESPONSE_MESSAGE,
      message_es: typeMessages.PATCH_RESPONSE_MESSAGE_ES,
      data: await decorateApplication(data),
    })
  },

  // contratado
  hired: () => async (req, res) => {
    let jobApplicationsInput = aobj.extract(req.body, ['id'])

    let application = await jobApplicationsModel.getOneWhere({
      equals: { id: jobApplicationsInput.id },
    })

    if (!application) {
      return res.json({
        status: false,
        message: typeErrorMessages.APPLICATION_NOT_FOUND,
        message_es: typeErrorMessages.APPLICATION_NOT_FOUND_ES,
      })
    }

    if (application.deleted_at) {
      return res.json({
        status: false,
        message: typeErrorMessages.APPLICATION_DELETED_MESSAGE,
        message_es: typeErrorMessages.APPLICATION_DELETED_MESSAGE_ES,
      })
    }

    let job = await jobsModel.getOneWhere({
      equals: { id: application.job_id },
    })

    if (!job) {
      return res.json({
        status: false,
        message: typeErrorMessages.JOB_NOT_FOUND,
        message_es: typeErrorMessages.JOB_NOT_FOUND_ES,
      })
    }

    if (job.deleted_at) {
      return res.json({
        status: false,
        message: typeErrorMessages.JOB_DELETED,
        message_es: typeErrorMessages.JOB_DELETED_ES,
      })
    }

    if (!job.status) {
      return res.json({
        status: false,
        message: typeErrorMessages.JOB_DISABLE,
        message_es: typeErrorMessages.JOB_DISABLE_ES,
      })
    }

    if (job.job_status_id !== 1) {
      return res.json({
        status: false,
        message: 'The job must be in "Recruiting" status to select a proposal',
        message_es:
          'El proyecto debe estar en estado "Reclutando" para aceptar una propuesta',
      })
    }

    if (application.job_id !== job.id) {
      return res.json({
        status: false,
        message: 'Proposal does not correspond to this job',
        message_es: 'Propuesta no corresponde a este proyecto',
      })
    }
    await jobsModel.update({ id: job.id, job_status_id: 2 })

    let data = await jobApplicationsModel.update({
      id: application.id,
      selected: 1,
    })

    if (data) {
      let talent_user = await getFullUserByUUID(application.user_uuid)
      let recruiter_user = await getFullUserByUUID(req.session.user_uuid)
      talent_user.name =
        talent_user.person.name + ' ' + talent_user.person.last_name
      recruiter_user.name =
        recruiter_user.person.name + ' ' + recruiter_user.person.last_name
      //Send email to admin
      sendMail({
        to: {
          name: process.env.ADMIN_NAME,
          last_name: process.env.ADMIN_LAST_NAME,
          email: process.env.EMAIL_ADMIN_EMAIL,
        },
        variables: {
          talent: talent_user,
          recruiter: recruiter_user,
          job: job,
        },
        mail_path: '/' + req.body.lang + '/mail/proposal-accepted-job',
        subject:
          req.body.lang == 'es'
            ? 'Se seleccionó un talento para un trabajo'
            : 'Talent selected for Job',
      })
    }

    res.json({
      status: true,
      message: typeMessages.PATCH_RESPONSE_MESSAGE,
      message_es: typeMessages.PATCH_RESPONSE_MESSAGE_ES,
      data: await decorateApplication(data),
    })
  },

  unhired: () => async (req, res) => {
    let jobApplicationsInput = aobj.extract(req.body, ['id'])

    let application = await jobApplicationsModel.getOneWhere({
      equals: { id: jobApplicationsInput.id },
    })
    let user = await getFullUserByUUID(application.user_uuid)

    if (!application) {
      return res.json({
        status: false,
        message: typeErrorMessages.APPLICATION_NOT_FOUND,
        message_es: typeErrorMessages.APPLICATION_NOT_FOUND_ES,
      })
    }

    if (application.deleted_at) {
      return res.json({
        status: false,
        message: typeErrorMessages.APPLICATION_DELETED_MESSAGE,
        message_es: typeErrorMessages.APPLICATION_DELETED_MESSAGE_ES,
      })
    }

    let job = await jobsModel.getOneWhere({
      equals: { id: application.job_id },
    })

    if (!job) {
      return res.json({
        status: false,
        message: typeErrorMessages.JOB_NOT_FOUND,
        message_es: typeErrorMessages.JOB_NOT_FOUND_ES,
      })
    }

    if (job.deleted_at) {
      return res.json({
        status: false,
        message: typeErrorMessages.JOB_DELETED,
        message_es: typeErrorMessages.JOB_DELETED_ES,
      })
    }

    if (!job.status) {
      return res.json({
        status: false,
        message: typeErrorMessages.JOB_DISABLE,
        message_es: typeErrorMessages.JOB_DISABLE_ES,
      })
    }

    if (job.job_status_id !== 1) {
      return res.json({
        status: false,
        message: 'The job must be in "Recruiting" status to select a proposal',
        message_es:
          'El proyecto debe estar en estado "Reclutando" para aceptar una propuesta',
      })
    }

    if (application.job_id !== job.id) {
      return res.json({
        status: false,
        message: 'Proposal does not correspond to this job',
        message_es: 'Propuesta no corresponde a este proyecto',
      })
    }

    let data = await jobApplicationsModel.update({
      id: application.id,
      selected: 0,
    })

    if (user) {
      await notifications.create({
        user_uuid: user.user_uuid,
        action:
          process.env.WEB_URL +
          '/' +
          req.body.lang +
          '/job/apply/' +
          application.job_id +
          '/status',
        been_read: 0,
        n_type: 'JOB_UNSELECT',
        person_name: req.session.user_name,
      })
    }

    res.json({
      status: true,
      message: typeMessages.PATCH_RESPONSE_MESSAGE,
      message_es: typeMessages.PATCH_RESPONSE_MESSAGE_ES,
      data: await decorateApplication(data),
    })
  },

  delete: () => async (req, res) => {
    let jobApplicationsInput = aobj.extract(req.body, ['id'])

    let exists = await jobApplicationsModel.getOneWhere({
      equals: { id: jobApplicationsInput.id, user_uuid: req.session.user_uuid },
    })

    if (!exists) {
      return res.json({
        status: false,
        message: typeErrorMessages.NOT_FOUND,
        message_es: typeErrorMessages.NOT_FOUND_ES,
      })
    }

    let data = await jobApplicationsModel.delete(jobApplicationsInput)

    res.json({
      status: true,
      message: typeMessages.DELETE_RESPONSE_MESSAGE,
      message_es: typeMessages.DELETE_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },

  changeWallet: () => async (req, res) => {
    let jobApplicationsInput = aobj.extract(req.body, [
      'id',
      'algorand_transaction',
      'near_transaction',
    ])

    let exists = await jobApplicationsModel.getOneWhere({
      equals: { id: jobApplicationsInput.id, user_uuid: req.session.user_uuid },
    })

    if (!exists) {
      return res.json({
        status: false,
        message: typeErrorMessages.NOT_FOUND,
        message_es: typeErrorMessages.NOT_FOUND_ES,
      })
    }

    if (exists.deleted_at) {
      return res.json({
        status: false,
        message: typeErrorMessages.APPLICATION_DELETED_MESSAGE,
        message_es: typeErrorMessages.APPLICATION_DELETED_MESSAGE_ES,
      })
    }

    jobApplicationsInput.user_uuid = req.session.user_uuid

    let data = await jobApplicationsModel.update(jobApplicationsInput)

    res.json({
      status: true,
      message: typeMessages.PATCH_RESPONSE_MESSAGE,
      message_es: typeMessages.PATCH_RESPONSE_MESSAGE_ES,
      data: await decorateApplication(data),
    })
  },
}
