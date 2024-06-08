const aobj = require('aobj')
const userDetailsModel = require('../models/user_details')
const projectsModel = require('../models/projects')
const projectApplicationsModel = require('../models/project_applications')
const businessModel = require('../models/business')
const recruitersModel = require('../models/recruiters')

const notifications = require('../models/notifications')
const sendMail = require('../helpers/sendMail')

const paypal = require('@paypal/checkout-server-sdk')
const payPalClient = require('../services/paypal_checkout')
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

async function decorateApplication(a) {
  a.project = await projectsModel.getById(a.project_id)

  if (a.project) {
    a.project.country =
      (await countryModel.getOneWhere({
        equals: { id: a.project?.country_id },
      })) || {}
    a.project.business =
      (await businessModel.getById(a.project?.business_id)) || {}
    a.project.business.workplace =
      (await workplaceModel.getById(a.project?.business.user_workplace_id)) ||
      {}
    a.project.favorite = (await favoriteModel.getOneWhere({
      equals: {
        type: typeFavorites.project,
        user_uuid: a.user_uuid,
        favorite_uuid: a.project.id,
      },
    }))
      ? true
      : false
  }

  return a
}

module.exports = {
  getByUUID: () => async (req, res) => {
    const { uuid } = req.params

    const projectsApplicationsByUser =
      await projectApplicationsModel.getAllWhere({
        equals: { user_uuid: uuid },
        isNull: ['deleted_at'],
      })

    if (projectsApplicationsByUser.length === 0) {
      return res.json({
        status: true,
        message: typeErrorMessages.APPLICATION_NOT_FOUND,
        message_es: typeErrorMessages.APPLICATION_NOT_FOUND_ES,
      })
    }
    let response = []
    response.data = []

    for (const i in projectsApplicationsByUser) {
      response.data[i] = await decorateApplication(
        projectsApplicationsByUser[i],
      )
    }
    res.json({
      status: true,
      message: typeMessages.GET_RESPONSE_MESSAGE,
      message_es: typeMessages.GET_RESPONSE_MESSAGE_ES,
      ...response,
    })
  },

  datatable: () => async (req, res) => {
    let response = await projectApplicationsModel.datatable(req)
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
          attributes: [
            'id',
            'name',
            'user_uuid',
            'image_url',
            'mobile_image_url',
            'createdAt',
            'description',
          ],
          model: MODELS.Project,
          include: [
            {
              attributes: ['id', 'name', 'visible'],
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
        // {
        //   attributes: ['user_uuid', 'project_id', 'comment', 'score'],
        //   model: MODELS.ProjectTalentQualifications,
        // // project_id: { [MODELS.Op.col]: 'project_applications.project_id' },
        // },
      ],
      where: whereConditionl,
    }
    //   // project_id: { [MODELS.Op.col]: 'project_applications.project_id' },

    const count = await MODELS.ProjectApplications.count(options)
    const last_page = Math.ceil(count / limit)
    const getProjectApplications = await MODELS.ProjectApplications.findAll({
      attributes: [
        'id',
        'user_uuid',
        'project_id',
        'proposal',
        'procedure_text',
        'accept_price',
        'price_proposal',
        'accept_time',
        'days',
        'ready_to_close',
        'accepted',
        'close_at_proposal',
        'recieve_pay_at',
        'send_pay_at',
        'recieve_pay_order_id',
        'send_pay_order_id',
        'talent_payment',
        'weeks',
        'shown_accepted_message',
        'algorand_transaction',
        'near_transaction',
        'updated',
        'salary_counter_proposal',
        'time_counter_proposal',
        'counter_proposal_status',
      ],
      ...options,
    })

    let getProjectsApplicationsAll = []
    for (const getProjectApplication of getProjectApplications) {
      if (!getProjectApplication?.project?.id) {
        getProjectsApplicationsAll.push({
          project_application: getProjectApplication,
          project_talent_qualifications: null,
        })
        continue
      }

      const getQualificationByTalent =
        await MODELS.ProjectTalentQualifications.findOne({
          attributes: ['user_uuid', 'project_id', 'comment', 'score'],
          where: {
            project_id: getProjectApplication?.project?.id,
            user_uuid: getProjectApplication?.user_uuid,
          },
        })
      getProjectsApplicationsAll.push({
        project_application: getProjectApplication,
        project_talent_qualifications: getQualificationByTalent,
      })
    }

    res.json({
      status: true,
      message: typeMessages.GET_RESPONSE_MESSAGE,
      message_es: typeMessages.GET_RESPONSE_MESSAGE_ES,
      meta: {
        last_page: last_page,
      },
      data: getProjectsApplicationsAll,
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
      req.body.close_at_proposal = daysToDate(days)
    }

    let projectApplicationsInput = aobj.extract(req.body, [
      'project_id',
      'proposal',
      'procedure_text',
      'accept_price',
      'accept_time',
      'price_proposal',
      'close_at_proposal',
      'weeks',
      'updated',
    ])

    let project = await projectsModel.getOneWhere({
      equals: { id: projectApplicationsInput.project_id },
    })

    if (!project) {
      return res.json({
        status: false,
        message: typeErrorMessages.PROJECT_NOT_FOUND,
        message_es: typeErrorMessages.PROJECT_NOT_FOUND_ES,
      })
    }

    if (!projectApplicationsInput.proposal) {
      return res.json({
        status: false,
        message: 'Proposal is required',
        message_es: 'Proposal es requerido',
      })
    }

    if (!projectApplicationsInput.procedure_text) {
      return res.json({
        status: false,
        message: 'procedure_text is required',
        message_es: 'procedure_text es requerido',
      })
    }

    if (projectApplicationsInput.price_proposal < 1) {
      return res.json({
        status: false,
        message: 'Price must be higher than 1$',
        message_es: 'Price debe ser mayor a 1$',
      })
    }

    projectApplicationsInput.accept_price =
      !projectApplicationsInput.price_proposal
    projectApplicationsInput.days = projectApplicationsInput.weeks * 7

    let existing = await projectApplicationsModel.getOneWhere({
      equals: {
        user_uuid: req.session.user_uuid,
        project_id: projectApplicationsInput.project_id,
      },
    })

    if (existing) {
      return res.json({
        status: false,
        message: 'You already have an application for this project',
        message_es: 'Ya tienes una postulación pendiente para este proyecto',
      })
    }
    projectApplicationsInput.user_uuid = req.session.user_uuid
    let data = await projectApplicationsModel.create(projectApplicationsInput)

    let talent_user = await getFullUserByUUID(req.session.user_uuid)

    if (project.business_id) {
      let business = await businessModel.getById(project.business_id)
      if (business) {
        await notifications.create({
          user_uuid: business.user_uuid,
          action:
            process.env.WEB_URL + '/recruiter/project-detail/' + project.id,
          been_read: 0,
          n_type: typeNotifications.PROJ_APPLICATION_NEW,
          project_name: project.name,
          person_name:
            talent_user.person.name + ' ' + talent_user.person.last_name,
        })
        let business_user = await getFullUserByUUID(business.user_uuid)
        if (business_user && talent_user) {
          sendMail({
            to: {
              name: business_user.person.name,
              last_name: business_user.person.last_name,
              email: business_user.person.email,
            },
            variables: {
              talent: talent_user,
              price: projectApplicationsInput.accept_price
                ? project.price
                : projectApplicationsInput.price_proposal,
              WEB_URL: process.env.WEB_URL,
              project: project,
            },
            mail_path: `mails/templates/NewProjectAplication-${req.body.lang}.html`,
            subject:
              req.body.lang == 'es'
                ? 'Nueva postulación recibida'
                : 'New postulation recieved',
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
    let input = aobj.extract(req.body, ['project_id', 'talent_user_uuid'])

    let talent_user = await getFullUserByUUID(input.talent_user_uuid)

    if (!talent_user) {
      return res.json({
        status: false,
        message: typeErrorMessages.TALENT_NOT_FOUND,
        message_es: typeErrorMessages.TALENT_NOT_FOUND_ES,
      })
    }

    let project = await projectsModel.getOneWhere({
      equals: { id: input.project_id },
    })

    if (!project) {
      return res.json({
        status: false,
        message: typeMessages.DELETE_RESPONSE_MESSAGE,
        message_es: typeMessages.DELETE_RESPONSE_MESSAGE_ES,
      })
    }

    if (project.deleted_at) {
      return res.json({
        status: false,
        message: typeErrorMessages.PROJECT_DELETED,
        message_es: typeErrorMessages.PROJECT_DELETED_ES,
      })
    }

    await notifications.create({
      user_uuid: talent_user.user_uuid,
      action: process.env.WEB_URL + '/talent/project/' + project.id,
      been_read: 0,
      n_type: typeNotifications.PROJ_INV_NEW,
      project_name: project.name,
      person_name: talent_user.person.name + ' ' + talent_user.person.last_name,
    })

    let business = await businessModel.getById(project.business_id)
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
          project_id: project.id,
          project_name: project.name,
          WEB_URL: process.env.WEB_URL,
        },
        mail_path: `mails/templates/InvitToProject-${req.body.lang}.html`,
        subject:
          req.body.lang == 'es'
            ? 'Invitacion a un proyecto'
            : 'Project invitation',
      })
    }

    res.json({
      status: true,
      message: 'Invitation sent',
      message_es: 'Invitacion enviada',
    })
  },

  patch: () => async (req, res) => {
    let exists = await projectApplicationsModel.getOneWhere({
      equals: { id: req.body.id, user_uuid: req.session.user_uuid },
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

    if (req.body.days || req.body.weeks) {
      req.body.days = req.body.days ? req.body.days : req.body.weeks * 7
      if (parseInt('' + req.body.days) < 1) {
        return res.json({
          status: false,
          message: 'The minimum is a working week (7 days)',
        })
      }
      req.body.close_at_proposal = daysToDate(req.body.days)
    }

    let projectApplicationsInput = aobj.extract(req.body, [
      'id',
      'proposal',
      'procedure_text',
      'accept_price',
      'days',
      'price_proposal',
      'accept_time',
      'close_at_proposal',
      'weeks',
      'shown_accepted_message',
    ])

    projectApplicationsInput.user_uuid = req.session.user_uuid
    projectApplicationsInput.updated = true

    let data = await projectApplicationsModel.update(projectApplicationsInput)

    let project = await projectsModel.getById(data.project_id)

    if (project.business_id) {
      let business = await businessModel.getById(project.business_id)
      let talent_user = await getFullUserByUUID(req.session.user_uuid)

      if (business.user_uuid) {
        await notifications.create({
          user_uuid: business.user_uuid,
          action:
            process.env.WEB_URL + '/recruiter/project-detail/' + project.id,
          been_read: 0,
          n_type: typeNotifications.PROJ_APP_UPDATED_BY_USER,
          project_name: project.name,
          person_name:
            talent_user.person.name + ' ' + talent_user.person.last_name,
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

  patchCounterProposal: () => async (req, res) => {
    let projectApplicationsInput = aobj.extract(req.body, [
      'id',
      'salary_counter_proposal',
      'time_counter_proposal',
    ])

    let exists = await projectApplicationsModel.getOneWhere({
      equals: { id: projectApplicationsInput.id },
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

    projectApplicationsInput.counter_proposal_status = 1

    let data = await projectApplicationsModel.update(projectApplicationsInput)

    let project = await projectsModel.getById(data.project_id)

    if (project.business_id) {
      let business = await businessModel.getById(project.business_id)
      let business_user = await getFullUserByUUID(project.user_uuid)
      let talent_user = await getFullUserByUUID(data.user_uuid)

      if (business.user_uuid) {
        await notifications.create({
          user_uuid: talent_user.user_uuid,
          action: process.env.WEB_URL + '/talent/project/' + project.id,
          been_read: 0,
          n_type: typeNotifications.PROJ_APP_COUNTER_PROPOSAL_BY_USER,
          project_name: project.name,
          person_name:
            business_user.person.name + ' ' + business_user.person.last_name,
        })
      }
    }

    res.json({
      status: true,
      message: 'Data updated successfully',
      data: await decorateApplication(data),
    })
  },

  patchAcceptCounterProposal: () => async (req, res) => {
    let input = aobj.extract(req.body, ['id'])

    let projectApplicatiom = await projectApplicationsModel.getOneWhere({
      equals: { id: input.id, user_uuid: req.session.user_uuid },
    })

    if (!projectApplicatiom) {
      return res.json({
        status: false,
        message: typeErrorMessages.APPLICATION_NOT_FOUND,
        message_es: typeErrorMessages.APPLICATION_NOT_FOUND_ES,
      })
    }

    if (projectApplicatiom.deleted_at) {
      return res.json({
        status: false,
        message: typeErrorMessages.APPLICATION_DELETED_MESSAGE,
        message_es: typeErrorMessages.APPLICATION_DELETED_MESSAGE_ES,
      })
    }

    projectApplicatiom.price_proposal =
      projectApplicatiom.salary_counter_proposal
    projectApplicatiom.weeks = projectApplicatiom.time_counter_proposal
    projectApplicatiom.counter_proposal_status = 2

    let data = await projectApplicationsModel.update(projectApplicatiom)

    res.json({
      status: true,
      message: typeMessages.PATCH_RESPONSE_MESSAGE,
      message_es: typeMessages.PATCH_RESPONSE_MESSAGE_ES,
      data: await decorateApplication(data),
    })
  },

  patchUpdated: () => async (req, res) => {
    let projectApplicationsInput = aobj.extract(req.body, ['id', 'updated'])

    let exists = await projectApplicationsModel.getOneWhere({
      equals: { id: projectApplicationsInput.id },
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

    let data = await projectApplicationsModel.update(projectApplicationsInput)

    res.json({
      status: true,
      message: typeMessages.PATCH_RESPONSE_MESSAGE,
      message_es: typeMessages.PATCH_RESPONSE_MESSAGE_ES,
      data: await decorateApplication(data),
    })
  },

  readyToClose: () => async (req, res) => {
    let projectApplicationsInput = aobj.extract(req.body, ['id'])

    let application = await projectApplicationsModel.getOneWhere({
      equals: {
        id: projectApplicationsInput.id,
        user_uuid: req.session.user_uuid,
      },
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

    projectApplicationsInput.ready_to_close = true

    let data = await projectApplicationsModel.update(projectApplicationsInput)

    let project = await projectsModel.getById(data.project_id)

    if (project.business_id) {
      let business = await businessModel.getById(project.business_id)
      let talent_user = await getFullUserByUUID(req.session.user_uuid)

      if (business.user_uuid) {
        await notifications.create({
          user_uuid: business.user_uuid,
          action:
            process.env.WEB_URL + '/recruiter/project-detail/' + project.id,
          been_read: 0,
          n_type: typeNotifications.PROJ_REQ_END,
          project_name: project.name,
          person_name:
            talent_user.person.name + ' ' + talent_user.person.last_name,
        })

        //Send to recruiter
        let business_user = await getFullUserByUUID(business.user_uuid)
        talent_user.name =
          talent_user.person.name + ' ' + talent_user.person.last_name
        sendMail({
          to: {
            name: business_user.person.name,
            last_name: business_user.person.last_name,
            email: business_user.person.email,
          },
          variables: {
            talent: talent_user,
            WEB_URL: process.env.WEB_URL,
            project: project,
            project_id: project.id,
          },
          mail_path: `mails/templates/ProjectRequestFinished-${req.body.lang}.html`,
          subject:
            req.body.lang == 'es'
              ? 'Solicitud finalizacionn proyecto'
              : 'Request to finish the project',
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
            project: project,
          },
          mail_path: `mails/templates/ProjectRequestFinishedAdmin-${req.body.lang}.html`,
          subject:
            req.body.lang == 'es'
              ? 'Solicitud finalizacionn proyecto'
              : 'Request to finish the project',
        })
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
    let input = aobj.extract(req.params, ['project_id'])

    let application = await projectApplicationsModel.getOneWhere({
      equals: {
        project_id: input.project_id,
        user_uuid: req.session.user_uuid,
      },
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

  closeProject: () => async (req, res) => {
    let projectApplicationsInput = aobj.extract(req.body, ['id'])

    let application = await projectApplicationsModel.getOneWhere({
      equals: { id: projectApplicationsInput.id },
    })

    if (!application) {
      return res.json({
        status: false,
        message: typeErrorMessages.APPLICATION_NOT_FOUND,
        message_es: typeErrorMessages.APPLICATION_NOT_FOUND_ES,
      })
    }

    // if(exists?.deleted_at) {
    //     return res.json({status: false, message: typeErrorMessages.APPLICATION_DELETED_MESSAGE, message_es: typeErrorMessages.APPLICATION_DELETED_MESSAGE_ES});
    // }

    if (!application.accepted) {
      return res.json({
        status: false,
        message: 'Proposal has not acepted',
        message_es: 'Propuesta no ha sido aceptada',
      })
    }

    if (!application.ready_to_close) {
      return res.json({
        status: false,
        message: 'Proposal is not ready to close the project',
        message_es: 'La propuesta no esta lista para cerrar el proyecto',
      })
    }

    let project = await projectsModel.getOneWhere({
      equals: { id: application.project_id },
    })

    if (!project) {
      return res.json({
        status: false,
        message: typeErrorMessages.PROJECT_NOT_FOUND,
        message_es: typeErrorMessages.PROJECT_NOT_FOUND_ES,
      })
    }

    if (!project.status) {
      return res.json({
        status: false,
        message: typeErrorMessages.PROJECT_DISABLE,
        message_es: typeErrorMessages.PROJECT_DISABLE_ES,
      })
    }

    if (project.project_status_id !== 2) {
      return res.json({
        status: false,
        message:
          'Project should be in "In progress" status to accept the proposal',
        message_es:
          'El proyecto debe estar en estado "En curso" para aceptar una propuesta',
      })
    }

    await projectsModel.update({ id: project.id, project_status_id: 3 })
    let data = await projectApplicationsModel.update(projectApplicationsInput)
    const talent_user = await getFullUserByUUID(application.user_uuid)
    sendMail({
      to: {
        name: talent_user.person.name,
        last_name: talent_user.person.last_name,
        email: talent_user.person.email,
      },
      variables: {
        project: project,
        WEB_URL: process.env.WEB_URL,
      },
      mail_path: `mails/templates/ProjectFinishedTalent-${req.body.lang}.html`,
      subject:
        req.body.lang == 'es' ? 'Proyecto Finalizado' : 'Finished project',
    })

    res.json({
      status: true,
      message: typeMessages.PATCH_RESPONSE_MESSAGE,
      message_es: typeMessages.PATCH_RESPONSE_MESSAGE_ES,
      data: await decorateApplication(data),
    })
  },

  pay: () => async (req, res) => {
    let application = await projectApplicationsModel.getById(
      req.body.application_id,
    )
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

    if (application.recieve_pay_at) {
      return res.json({
        status: false,
        message: 'Already paid',
        message_es: 'Propuesta pagada',
      })
    }
    let project = await projectsModel.getById(application.project_id)
    if (!project) {
      return res.json({
        status: false,
        message: typeErrorMessages.PROJECT_NOT_FOUND,
        message_es: typeErrorMessages.PROJECT_NOT_FOUND_ES,
      })
    }

    if (!(await user_uuidOwnsProjectId(req.session.user_uuid, project.id))) {
      return res.json({
        status: false,
        message: "You can't accept proposals for this project",
        message_es: 'No puedes aceptar propuestas para este proyecto',
      })
    }

    let price = application.accept_price
      ? project.price
      : application.price_proposal || project.price
    let user = await getFullUserByUUID(req.session.user_uuid)
    if (user.recruiter && user.recruiter.id != req.body.recruiter_id) {
      return res.json({
        status: false,
        message: 'User is not recruiter',
        message_es: 'El usuario no es el reclutador',
      })
    }

    const request = new paypal.orders.OrdersCreateRequest()
    request.prefer('return=representation')
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: price,
          },
        },
      ],
    })
    let order
    try {
      order = await payPalClient.client().execute(request)
      console.log('order executed')
    } catch (err) {
      console.error(err)
      return res.status(500).json({
        status: false,
        message: 'Paypal rejected payment',
        message_es: 'Paypal rechazo el pago',
      })
    }

    await projectApplicationsModel.update({
      id: application.id,
      recieve_pay_order_id: order.result.id,
    })

    res.status(200).json({
      status: true,
      data: {
        orderID: order.result.id,
      },
    })
  },

  accept: () => async (req, res) => {
    let application = await projectApplicationsModel.getOneWhere({
      equals: { id: req.body.application_id },
    })

    if (!application) {
      return res.json({
        status: false,
        message: typeErrorMessages.NOT_FOUND,
        message_es: typeErrorMessages.NOT_FOUND_ES,
      })
    }

    if (application.deleted_at) {
      return res.json({
        status: false,
        message: typeErrorMessages.APPLICATION_DELETED_MESSAGE,
        message_es: typeErrorMessages.APPLICATION_DELETED_MESSAGE_ES,
      })
    }

    if (application.accepted) {
      return res.json({
        status: false,
        message: 'Proposal already accepted',
        message_es: 'La propuesta ya fue aceptada',
      })
    }

    let project = await projectsModel.getOneWhere({
      equals: { id: application.project_id },
    })

    if (!project) {
      return res.json({
        status: false,
        message: typeErrorMessages.PROJECT_NOT_FOUND,
        message_es: typeErrorMessages.PROJECT_NOT_FOUND_ES,
      })
    }

    if (!(await user_uuidOwnsProjectId(req.session.user_uuid, project.id))) {
      return res.json({
        status: false,
        message: 'You cannot accept proposals for this project',
        message_es: 'No puedes aceptar propuestas para este proyecto',
      })
    }

    if (!project.status) {
      return res.json({
        status: false,
        message: typeErrorMessages.PROJECT_DISABLE,
        message_es: typeErrorMessages.PROJECT_DISABLE_ES,
      })
    }

    if (project.project_status_id !== 1) {
      return res.json({
        status: false,
        message:
          'The project must be in "Recruiting" status to accept a proposal',
        message_es:
          'El proyecto debe estar en estado "Reclutando" para aceptar una propuesta',
      })
    }

    if (application.project_id !== project.id) {
      return res.json({
        status: false,
        message: 'Proposal does not correspond to this project',
        message_es: 'Propuesta no corresponde a este proyecto',
      })
    }

    await projectsModel.update({ id: project.id, project_status_id: 2 })

    let data = await projectApplicationsModel.update({
      id: application.id,
      accepted: 1,
      recieve_pay_at: new Date(),
      shown_accepted_message: true,
    })

    if (data.user_uuid) {
      await notifications.create({
        user_uuid: data.user_uuid,
        action: process.env.WEB_URL + '/' + req.body.lang + '/projects',
        been_read: 0,
        n_type: 'APP_ACC',
        project_name: project.name,
      })
      let talent_user = await getFullUserByUUID(data.user_uuid)
      let recruiter_user = await getFullUserByUUID(req.session.user_uuid)
      sendMail({
        to: {
          name: talent_user.person.name,
          last_name: talent_user.person.last_name,
          email: talent_user.email,
        },
        variables: {
          recruiter: recruiter_user,
          project: project,
        },
        mail_path: '/' + req.body.lang + '/mail/proposal-accepted',
        subject:
          req.body.lang == 'es'
            ? 'Postulación aceptada'
            : 'Postulation accepted',
      })
    }

    res.json({
      status: true,
      message: typeMessages.PATCH_RESPONSE_MESSAGE,
      message_es: typeMessages.PATCH_RESPONSE_MESSAGE_ES,
      data: await decorateApplication(data),
    })
  },

  // cambiar etapa
  changeApplicationStatus: () => async (req, res) => {
    const { status } = req.body

    if (status == (null || undefined)) {
      return res.json({
        status: false,
        message: 'Status is required',
        message_es: 'Enviar el status es obligatorio',
      })
    }

    let application = await projectApplicationsModel.getOneWhere({
      equals: { id: req.body.application_id },
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

    if (status <= application.accepted) {
      return res.json({
        status: false,
        message: 'New status cannot be previous to the current one',
        message_es: 'El nuevo estado no puede ser previo al anterior',
      })
    }

    let project = await projectsModel.getOneWhere({
      equals: { id: application.project_id },
    })

    if (!project) {
      return res.json({
        status: false,
        message: typeErrorMessages.PROJECT_NOT_FOUND,
        message_es: typeErrorMessages.PROJECT_NOT_FOUND_ES,
      })
    }

    if (!(await user_uuidOwnsProjectId(req.session.user_uuid, project.id))) {
      return res.json({
        status: false,
        message: 'You cannot accept proposals for this project',
        message_es: 'No puedes aceptar propuestas para este proyecto',
      })
    }

    if (!project.status) {
      return res.json({
        status: false,
        message: typeErrorMessages.PROJECT_DISABLE,
        message_es: typeErrorMessages.PROJECT_DISABLE_ES,
      })
    }

    if (project.project_status_id !== 1) {
      return res.json({
        status: false,
        message:
          'The project must be in "Recruiting" status to accept a proposal',
        message_es:
          'El proyecto debe estar en estado "Reclutando" para aceptar una propuesta',
      })
    }

    if (application.project_id !== project.id) {
      return res.json({
        status: false,
        message: 'Proposal does not correspond to this project',
        message_es: 'Propuesta no corresponde a este proyecto',
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
      // cambia desde contratado a postulado
      if (application.accepted === 2) {
        await notifications.create({
          user_uuid: application.user_uuid,
          action: process.env.WEB_URL + '/talent/project/' + project.id,
          been_read: 0,
          n_type: typeNotifications.PROJ_UNHIRED_TALENT,
          project_name: project.name,
          person_name:
            talent_user.person.name + ' ' + talent_user.person.last_name,
        })
      }

      data = await projectApplicationsModel.update({
        id: application.id,
        accepted: status,
      })
    }

    // seleccionado
    if (status === 1) {
      // cambiar desde postulado a seleccionado
      if (application.accepted === 0) {
        await notifications.create({
          user_uuid: application.user_uuid,
          action: process.env.WEB_URL + '/talent/project/' + project.id,
          been_read: 0,
          n_type: typeNotifications.PROJ_FROM_POSTULATION_TO_SELECT_TALENT,
          project_name: project.name,
          person_name:
            talent_user.person.name + ' ' + talent_user.person.last_name,
        })
      }

      // cambia desde contratado a seleccionado
      if (application.accepted === 2) {
        await notifications.create({
          user_uuid: application.user_uuid,
          action: process.env.WEB_URL + '/talent/project/' + project.id,
          been_read: 0,
          n_type: typeNotifications.PROJ_UNHIRED_TALENT,
          project_name: project.name,
          person_name:
            talent_user.person.name + ' ' + talent_user.person.last_name,
        })
      }

      data = await projectApplicationsModel.update({
        id: application.id,
        accepted: status,
        shown_accepted_message: true,
      })
    }

    // contratado
    if (status === 2) {
      data = await projectApplicationsModel.update({
        id: application.id,
        accepted: status,
        recieve_pay_at: new Date(),
        // shown_accepted_message: true
      })

      if (data.user_uuid) {
        let talent_user = await getFullUserByUUID(application.user_uuid)
        let recruiter_user = await getFullUserByUUID(req.session.user_uuid)
        talent_user.name =
          talent_user.person.name + ' ' + talent_user.person.last_name
        recruiter_user.name =
          recruiter_user.person.name + ' ' + recruiter_user.person.last_name

        await notifications.create({
          user_uuid: talent_user.user_uuid,
          action: process.env.WEB_URL + '/talent/project/' + project.id,
          been_read: 0,
          n_type: typeNotifications.PROJ_HIRED_TALENT,
          project_name: project.name,
          person_name:
            talent_user.person.name + ' ' + talent_user.person.last_name,
        })

        sendMail({
          to: {
            name: talent_user.person.name,
            last_name: talent_user.person.last_name,
            email: talent_user.person.email,
          },
          variables: {
            project_name: project.name,
            project_id: project.id,
            WEB_URL: process.env.WEB_URL,
          },
          mail_path: `mails/templates/HiredToProject-${req.body.lang}.html`,
          subject:
            req.body.lang == 'es'
              ? 'Contratado a un proyecto'
              : 'Hired to project',
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
            project: project,
          },
          mail_path: `mails/templates/HiredToProjectAdmin-${req.body.lang}.html`,
          subject:
            req.body.lang == 'es'
              ? 'Contratado a un proyecto'
              : 'Hired to project',
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

  delete: () => async (req, res) => {
    let projectApplicationsInput = aobj.extract(req.body, ['id'])

    let exists = await projectApplicationsModel.getOneWhere({
      equals: {
        id: projectApplicationsInput.id,
        user_uuid: req.session.user_uuid,
      },
    })

    if (!exists) {
      return res.json({
        status: false,
        message: typeErrorMessages.APPLICATION_NOT_FOUND,
        message_es: typeErrorMessages.APPLICATION_NOT_FOUND_ES,
      })
    }

    let data = await projectApplicationsModel.delete(projectApplicationsInput)

    res.json({
      status: true,
      message: typeMessages.DELETE_RESPONSE_MESSAGE,
      message_es: typeMessages.DELETE_RESPONSE_MESSAGE_ES,
      data: data,
    })
  },

  changeWallet: () => async (req, res) => {
    let projectApplicationsInput = aobj.extract(req.body, [
      'id',
      'algorand_transaction',
      'near_transaction',
    ])

    let exists = await projectApplicationsModel.getOneWhere({
      equals: {
        id: projectApplicationsInput.id,
        user_uuid: req.session.user_uuid,
      },
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

    projectApplicationsInput.user_uuid = req.session.user_uuid

    let data = await projectApplicationsModel.update(projectApplicationsInput)

    res.json({
      status: true,
      message: typeMessages.PATCH_RESPONSE_MESSAGE,
      message_es: typeMessages.PATCH_RESPONSE_MESSAGE_ES,
      data: await decorateApplication(data),
    })
  },
}
