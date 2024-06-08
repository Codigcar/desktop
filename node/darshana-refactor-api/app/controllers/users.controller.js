const authMiddleware = require('../middlewares/auth')
const whiz = require('../services/whiz')
const aobj = require('aobj')
const shortid = require('shortid')
const userDetailsModel = require('../models/user_details')
const userFavoritesModel = require('../models/user_favorites')
const userWorkplacesModel = require('../models/user_workplaces')
const workplaces = require('../models/workplaces')
const userStudyCentresModel = require('../models/user_study_centres')
const recoveryCodesModel = require('../models/recovery_codes')

const userSkillsModel = require('../models/user_skills')

const userDetailsSkillsModel = require('../models/user_details_skills')

const skillsModel = require('../models/skills')

const countriesModel = require('../models/countries')
// const citiesModel = require('../models/cities')
const projectsModel = require('../models/projects')
const jobsModel = require('../models/jobs')
const recruiterModel = require('../models/recruiters')
const businessModel = require('../models/business')
const notifications = require('../models/notifications')
const projectApplicationsModel = require('../models/project_applications')
const jobApplicationsModel = require('../models/job_applications')
const sendMail = require('../helpers/sendMail')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const algosdk = require('algosdk')
const { v4: uuidv4 } = require('uuid')
const { typeFavorites, MODELS } = require('../helpers/enums')
const { logger } = require('../helpers/logger')
const OTPService = require('../services/otp.services')
const models = require('../models/index')
const Sequelize = require('sequelize')
const ValidationError = require('../helpers/validation_error')
const Op = Sequelize.Op

const UserDetailsModel = models.user_details

const milliseconds = (h = 0, m = 0, s = 0) => (h * 60 * 60 + m * 60 + s) * 1000

const PERCENTAGE_MIN_PROFILE = 60

async function verifyGoogleIDToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  })
  const payload = ticket.getPayload()
  const userid = payload['sub']
  return userid
}

async function getFullUserByUUID(user_uuid) {
  let userDetails =
    (await userDetailsModel.getOneWhere({
      equals: { user_uuid: user_uuid },
    })) || {}

  if (!userDetails) return

  try {
    if (!userDetails.is_talent) {
      let _recruiter = await recruiterModel.getOneWhere({
        equals: { user_uuid: user_uuid },
      })
      if (!_recruiter) {
        await recruiterModel.create({ user_uuid: user_uuid })
      }
    }
  } catch (error) {
    console.log(error)
  }
  let user = await whiz.getUser(user_uuid)
  userDetails.person = (user && user.data && user.data.person) || {}
  userDetails.projects = []
  userDetails.jobs = []

  userDetails.status = userDetails?.user_status
    ? userDetails?.user_status?.status
    : 'active'

  let applications = await projectApplicationsModel.getAllWhere({
    equals: { user_uuid: userDetails.user_uuid },
  })
  for (const a of applications) {
    let p = await projectsModel.getById(a.project_id)
    if (p) userDetails.projects.push({ ...p, application: a })
  }

  let job_applications = await jobApplicationsModel.getAllWhere({
    equals: { user_uuid: userDetails.user_uuid },
  })
  for (const a of job_applications) {
    let p = await jobsModel.getById(a.job_id)
    if (p) userDetails.jobs.push({ ...p, application: a })
  }

  // workplaces
  userDetails.workplaces =
    (await userWorkplacesModel.getAllWhere({
      equals: { user_uuid: userDetails.user_uuid },
    })) || []

  // workplaces
  for (const i in userDetails.workplaces) {
    userDetails.workplaces[i].business = await businessModel.getOneWhere({
      equals: { user_workplace_id: userDetails.workplaces[i].id },
    })
    if (userDetails.workplaces[i] && userDetails.workplaces[i].business) {
      if (!userDetails.workplaces[i].business.profile_picture_url)
        userDetails.workplaces[i].business.profile_picture_url =
          process.env.DEFAULT_PROFILE_PICTURE
    }
  }

  // study_centres
  userDetails.study_centres =
    (await userStudyCentresModel.getAllWhere({
      equals: { user_uuid: userDetails.user_uuid },
    })) || []
  const detailSkillsModelFound =
    (await userDetailsSkillsModel.getAllWhere({
      equals: { user_detail_id: userDetails.id },
    })) || []

  // skills
  userDetails.skills = []
  for (const skill of detailSkillsModelFound) {
    const skillFromBD = await skillsModel.getOneWhere({
      equals: { id: skill.skill_id },
      isNull: ['deleted_at'],
    })
    if (skillFromBD) userDetails.skills.push(skillFromBD)
  }

  // business
  userDetails.businesses = await businessModel.getAllWhere({
    equals: { user_uuid: userDetails.user_uuid },
  })

  // email
  userDetails.email = user && user.data && user.data.email

  // previous_month_income
  userDetails.previous_month_income = userDetails.projects
    .filter((p) => p.application && p.application.accepted)
    .filter(
      (p) => new Date(p.created_at).getMonth() - 1 == new Date().getMonth(),
    )
    .reduce((p, c) => p + (c.price_proposal || p.price), 0)

  // Notifications
  userDetails.notifications = (
    await notifications.getAllWhere({
      equals: { user_uuid: user_uuid, been_clicked: 0 },
    })
  ).sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

  // total_payments
  if (
    userDetails.projects &&
    !userDetails.is_talent &&
    userDetails.projects.length > 0
  ) {
    const total = userDetails.projects
      .filter((el) => el.project_status_id === 3)
      .reduce((ac, cu) => ac + cu.price, 0)
    userDetails.total_payments = total
  }

  // total_income
  if (userDetails.is_talent && userDetails.projects.length > 0) {
    const total = userDetails.projects
      .filter((el) => el.application.recieve_pay_at)
      .reduce((ac, cu) => ac + cu.application.talent_payment, 0)
    userDetails.last_month_income = userDetails.projects
      .filter((p) => p.application.recieve_pay_at)
      .filter(
        (p) => new Date(p.created_at).getMonth() === new Date().getMonth(),
      )
      .reduce((p, c) => p + c.application.talent_payment, 0)
    userDetails.total_income = total
  }
  return userDetails
}

async function createUserWorkPlace(req) {
  let userWorkPlaceInput = aobj.extract(req.body, [
    'user_uuid',
    'start_date',
    'end_date',
    'description',
    'work_here',
    'position',
    'workplace_name',
    'enable_business',
  ])

  if (!userWorkPlaceInput?.workplace_name) {
    await whiz.user.delete(userWorkPlaceInput.user_uuid)
    return {
      status: false,
      message: 'Workplace_name is required',
      message_es: 'Workplace_name es requerido',
    }
  }

  const enableBusiness = userWorkPlaceInput.enable_business

  if (
    userWorkPlaceInput.description &&
    userWorkPlaceInput.description.length > 500
  ) {
    return {
      status: false,
      message: 'Subtitle must be less than 150',
      message_es: 'El subtitulo debe contener menos de 150 caracteres',
    }
  }

  if (userWorkPlaceInput.work_here) {
    delete userWorkPlaceInput.end_date
  }

  //workplace
  let workplaceFound = await workplaces.getOneWhere({
    equals: { name: userWorkPlaceInput.workplace_name },
  })
  if (!workplaceFound) {
    workplaceFound = await workplaces.create({
      name: userWorkPlaceInput.workplace_name,
    })
  }
  userWorkPlaceInput.workplace_name = workplaceFound.name
  userWorkPlaceInput.workplace_id = workplaceFound.id

  let data = await userWorkplacesModel.create(userWorkPlaceInput)

  data.business = await businessModel.getOneWhere({
    equals: { user_workplace_id: data.id },
  })

  // crear business
  if (enableBusiness && !data.business) {
    businessModel.create({
      user_workplace_id: data.id,
      user_uuid: data.user_uuid,
    })
  }

  return { status: true, data: data }
}

async function generateRecoveryCode() {
  let tries = 10
  let code = shortid.generate()
  for (let i = 0; i < tries; i++) {
    let recoveryCode = await recoveryCodesModel.getOneWhere({
      equals: { code: code },
    })
    if (!recoveryCode) {
      return code
    }
    code = shortid.generate()
  }
  return shortid.generate() + shortid.generate()
}

async function decorateUser(user) {
  if (!user) return user

  let u = await whiz.getUser(user.user_uuid)
  logger.debug('🚀 ~ file: users.js:293 ~ decorateUser ~ u:', u)

  if (u.status) {
    logger.debug('🚀 ~ file: users.js:296 ~ decorateUser ~ u.status:', u.status)
    if (u.data.person) {
      logger.debug(
        '🚀 ~ file: users.js:298 ~ decorateUser ~ u.data.person:',
        u.data.person,
      )
      user.name = u.data.person.name
      user.last_name = u.data.person.last_name
    }
  } else {
    logger.debug('🚀 ~ file: users.js:304 ~ decorateUser ~ user:', user)
    user.name = ''
    user.last_name = ''
  }

  user.skills = []

  const detailSkillsModelFound =
    (await userDetailsSkillsModel.getAllWhere({
      equals: { user_detail_id: user.id },
    })) || []
  // logger.debug("🚀 ~ file: users.js:311 ~ decorateUser ~ detailSkillsModelFound:", detailSkillsModelFound)

  for (const skill of detailSkillsModelFound) {
    const skillFromBD = await skillsModel.getOneWhere({
      equals: { id: skill.skill_id },
      isNull: ['deleted_at'],
    })
    logger.debug(
      '🚀 ~ file: users.js:321 ~ decorateUser ~ skillFromBD:',
      skillFromBD,
    )
    if (skillFromBD) user.skills.push(skillFromBD)
  }

  let details = await userDetailsModel.getOneWhere({
    equals: { user_uuid: user.user_uuid },
  })
  logger.debug('🚀 ~ file: users.js:328 ~ decorateUser ~ details:', details)

  let result = { ...details, ...user }
  logger.debug('🚀 ~ file: users.js:330 ~ decorateUser ~ result:', result)

  if (result) {
    if (!result.profile_picture_url)
      result.profile_picture_url = process.env.DEFAULT_PROFILE_PICTURE
    // logger.debug("🚀 ~ file: users.js:336 ~ decorateUser ~ result:", result)
  }
  return result
}

async function sendMailIncompleteProfile(user, lang) {
  try {
    let mongoUser = await whiz.getUser(user.user_uuid)
    user.person = (mongoUser && mongoUser.data && mongoUser.data.person) || {}
    user.person.email = mongoUser?.data?.email

    if (user?.profile_percentage <= PERCENTAGE_MIN_PROFILE) {
      sendMail({
        to: {
          name: user.person.name,
          last_name: user.person.last_name,
          email: user.person.email,
        },
        variables: {
          talent: user,
          WEB_URL: process.env.WEB_URL,
        },
        mail_path: `mails/templates/ProfileIncomplete-${lang}.html`,
        subject: lang == 'es' ? 'Completa tu perfil' : 'Complete your profile',
      })
    }
  } catch (error) {
    console.log(error)
  }
}

async function getCompleteUser(user_uuid) {
  //Return -1 if the user is disabled
  let userDetails =
    (await userDetailsModel.getOneWhere({
      equals: { user_uuid: user_uuid },
    })) || {}

  let user = await whiz.getUser(user_uuid)
  userDetails.person = (user && user.data && user.data.person) || {}

  if (user?.data) {
    // email
    userDetails.userData = {}
    userDetails.userData.email = user?.data?.email
    userDetails.userData.phone = userDetails?.phone
    userDetails.userData.country_id = userDetails?.country_id
    userDetails.userData.city_id = userDetails?.city_id
    userDetails.userData.facebook_url = userDetails?.facebook_url
    userDetails.userData.linkedin_url = userDetails?.linkedin_url
    userDetails.userData.twitter_url = userDetails?.twitter_url
    userDetails.userData.discord_url = userDetails?.discord_url
    userDetails.userData.name = userDetails?.person?.name
    userDetails.userData.last_name = userDetails?.person?.last_name
    userDetails.userData.profession = userDetails?.subtitle
    userDetails.userData.description = userDetails?.summary
  }

  // workplaces
  userDetails.userData.workplaces =
    (await userWorkplacesModel.getAllWhere({
      equals: { user_uuid: userDetails.user_uuid },
    })) || []

  // study_centres
  userDetails.userData.study_centres =
    (await userStudyCentresModel.getAllWhere({
      equals: { user_uuid: userDetails.user_uuid },
    })) || []

  // skills
  const detailSkillsModelFound =
    (await userDetailsSkillsModel.getAllWhere({
      equals: { user_detail_id: userDetails.id },
    })) || []

  userDetails.userData.skills = []

  for (const skill of detailSkillsModelFound) {
    const skillFromBD = await skillsModel.getOneWhere({
      equals: { id: skill.skill_id },
      isNull: ['deleted_at'],
    })

    if (skillFromBD) userDetails.userData.skills.push(skillFromBD)
  }
  //----------------User Percentage----------------
  let contAtributes = 0
  if (userDetails?.userData?.workplaces?.length > 0) contAtributes++
  if (userDetails?.userData?.study_centres?.length > 0) contAtributes++
  if (userDetails?.userData?.skills?.length > 0) contAtributes++

  const totalProperties = Object.keys(userDetails.userData).length
  const atributes = Object.values(userDetails.userData)

  atributes.map((item) => {
    if (typeof item === 'object') return
    if (item && item != '') contAtributes++
  })
  userDetails.profile_percentage = (contAtributes / totalProperties) * 100
  //------------------------------------------------

  return userDetails
}

module.exports = {
  getFullUserByUUID,
  decorateUser,

  registerUser: () => async (req, res) => {
    const { lang } = req.body
    let userInput = aobj.extract(req.body, [
      'email',
      'password',
      'name',
      'last_name',
      'phone',
    ])

    let userDetailsInput = aobj.extract(req.body, [
      'purpose',
      'subtitle',
      'summary',
      'is_talent',
      'algo_address',
      'profile_picture_url',
      'default_cover_image_url',
    ])

    if (req.body.google_id_token) {
      let google_id = await verifyGoogleIDToken(req.body.google_id_token)
      userDetailsInput.google_id = google_id
    }

    let userExists = await whiz.user.getByEmail({
      email: userInput.email,
      role: process.env.WHIZ_API_ROLE_USER,
    })

    logger.debug(
      '🚀 ~ file: users.js:470 ~ registerUser: ~ userExists:',
      userExists,
    )

    if (userExists.status) {
      return res.json({
        status: false,
        message: 'Email already in use',
        message_es: 'Correo ya esta en uso',
      })
    }

    let response = await whiz.user.createWithPerson({
      person: {
        name: userInput.name,
        last_name: userInput.last_name,
        phone: userInput.phone,
        document_type: 'DNI',
        document_number: uuidv4(),
      },
      user: {
        email: userInput.email,
        role: process.env.WHIZ_API_ROLE_USER,
        password: userInput.password,
      },
    })

    logger.debug(
      '🚀 ~ file: users.js:496 ~ registerUser: ~ response:',
      response,
    )

    if (!response || !response.status) {
      return res.json({
        status: false,
        message: response.message || 'Couldnt create user',
        message_es: response.message || 'No se pudo crear el usuario',
        error: response.data,
      })
    }

    if (!userDetailsInput.is_talent) {
      req.body.user_uuid = response.data.uuid
      let userDetailWorkPlace = await createUserWorkPlace(req)
      if (!userDetailWorkPlace.status) {
        return res.json({
          status: false,
          message: 'Error creating the user: ' + userDetailWorkPlace?.message,
          message_es:
            'Error creando el usuario: ' + userDetailWorkPlace?.message_es,
        })
      }
    }

    userDetailsInput.user_uuid = response.data.uuid
    userDetailsInput.phone = userInput.phone
    userDetailsInput.verify_email = false

    let profilePercentage = {}
    profilePercentage.email = userInput?.email
    profilePercentage.last_name = userInput?.last_name
    profilePercentage.name = userInput?.name
    profilePercentage.phone = userInput?.phone
    profilePercentage.city_id = ''
    profilePercentage.country_id = ''
    profilePercentage.profession = ''
    profilePercentage.description = ''
    profilePercentage.facebook_url = ''
    profilePercentage.linkedin_url = ''
    profilePercentage.twitter_url = ''
    profilePercentage.discord_url = ''
    profilePercentage.workplaces = ''
    profilePercentage.study_centres = ''
    profilePercentage.skills = ''

    const totalProperties = Object.keys(profilePercentage).length
    const atributes = Object.values(profilePercentage)
    let contAtributes = 0
    atributes.map((item) => {
      if (item && item != '') contAtributes++
    })
    userDetailsInput.profile_percentage =
      (contAtributes / totalProperties) * 100
    userDetailsInput.full_name = userInput?.name + ' ' + userInput?.last_name

    logger.debug(
      '🚀 ~ file: users.js:552 ~ registerUser: ~ userDetailsInput:',
      userDetailsInput,
    )

    let details = await userDetailsModel.create(userDetailsInput)

    logger.debug('🚀 ~ file: users.js:557 ~ registerUser: ~ details:', details)

    let user = await getFullUserByUUID(details.user_uuid)

    logger.debug('🚀 ~ file: users.js:559 ~ registerUser: ~ user:', user)

    if (user.person) {
      user.name = user.person.name + ' ' + user.person.last_name
    } else {
      user.name = userDetailsInput.name
    }

    sendMail({
      to: user,
      variables: {
        WEB_URL: process.env.WEB_URL,
      },
      mail_path: `mails/templates/Welcome-${req.body.lang}.html`,
      subject:
        req.body.lang == 'es' ? 'Bienvenido a Darshana' : 'Welcome to Darshana',
    })

    const OTP = await OTPService.generateOTP({
      user_uuid: details.user_uuid,
      name: userInput.name,
      last_name: userInput.last_name,
      email: userInput.email,
      lang,
    })

    logger.debug('🚀 ~ file: users.js:586 ~ registerUser: ~ OTP:', OTP)

    if (!OTP?.status)
      return res.status(403).json({ status: false, message: OTP.message })

    res.json({
      status: true,
      message:
        'Successfully registered, we have sent a verification code to your email',
      message_es:
        'Registro exitoso, hemos enviado un código de verificación a tu correo',
    })
  },

  deleteUser: () => async (req, res, next) => {
    try {
      const userUUID = req.session.user_uuid

      let userDetails = await userDetailsModel.getOneWhere({
        equals: { user_uuid: userUUID },
      })

      let projects = []
      let jobs = []
      let ownProjects = []
      let ownJobs = []

      let applications = await projectApplicationsModel.getAllWhere({
        equals: { user_uuid: userUUID },
        isNull: ['deleted_at'],
      })
      for (const a of applications) {
        let p = await projectsModel.getAllWhere({
          equals: { id: a.project_id },
          isNull: ['deleted_at'],
          notEquals: { status: 2 },
        })
        if (p) projects.push({ ...p, application: a })
      }

      let job_applications = await jobApplicationsModel.getAllWhere({
        equals: { user_uuid: userUUID },
        isNull: ['deleted_at'],
      })
      for (const a of job_applications) {
        let p = await jobsModel.getAllWhere({
          equals: { id: a.project_id },
          isNull: ['deleted_at'],
          notEquals: { status: 2 },
        })
        if (p) jobs.push({ ...p, application: a })
      }

      if (!userDetails.is_talent) {
        ownProjects = await projectsModel.getAllWhere({
          equals: { user_uuid: userUUID },
          isNull: ['deleted_at'],
          notEquals: { status: 2 },
        })

        ownJobs = await jobsModel.getAllWhere({
          equals: { user_uuid: userUUID },
          isNull: ['deleted_at'],
          notEquals: { status: 2 },
        })
      }

      if (
        projects.length == 0 &&
        jobs.length == 0 &&
        ownProjects.length == 0 &&
        ownJobs.length == 0
      ) {
        userDetails.state = 'deleted'
        userDetails.deleted_at = new Date()

        await userDetailsModel.update(userDetails)

        res.json({
          status: true,
          message: 'User deleted!',
          message_es: '¡Usuario eliminado!',
        })
      } else {
        res.json({
          status: false,
          message: 'Error deleting the account!',
          message_es: '¡Error deleting the account!',
        })
      }
    } catch (error) {
      next(error)
    }
  },

  registerUserHackathon: (args) => async (req, res) => {
    let userInput = aobj.extract(req.body, [
      'email',
      'password',
      'name',
      'last_name',
      'document_type',
      'document_number',
      'birthdate',
      'phone',
      'hackathon_id',
    ])

    let role = args.useAdminRole
      ? process.env.WHIZ_API_ROLE_ADMIN
      : process.env.WHIZ_API_ROLE_USER
    let userExists = await whiz.user.getByEmail({
      email: req.body.email,
      role: role,
    })

    if (userExists.status) {
      let responseLogin = await whiz.user.login({
        email: req.body.email,
        password: req.body.password,
        role: role,
      })
      if (responseLogin.status) {
        return res.json({
          status: true,
          message: 'Logged in',
          message_es: 'Login exitoso',
          access_token: authMiddleware.generateToken({
            uuid: responseLogin.data.uuid,
            role,
          }),
          data: await getFullUserByUUID(responseLogin.data.uuid),
        })
      }
    }

    let userDetailsInput = aobj.extract(req.body, [
      'purpose',
      'country_id',
      'subtitle',
      'summary',
      'is_talent',
    ])

    if (req.body.google_id_token) {
      let google_id = await verifyGoogleIDToken(req.body.google_id_token)
      userDetailsInput.google_id = google_id
    }

    userDetailsInput.is_talent =
      userDetailsInput.is_talent === '1' ||
      userDetailsInput.is_talent === 'true' ||
      userDetailsInput.is_talent === true

    if (req.body.password !== req.body.confirm_password) {
      return res.json({
        status: false,
        message: 'Passwords do not match',
        message_es: 'Las contraseñas no coinciden',
      })
    }

    let country = await countriesModel.getById(req.body.country_id)

    if (!country) {
      return res.json({
        status: false,
        message: 'Invalid Country',
        message_es: 'Pais no registrado',
      })
    }

    userDetailsInput.country_id = country.id

    let response = await whiz.user.create({
      ...userInput,
      role: process.env.WHIZ_API_ROLE_USER,
    })

    if (!response.status) {
      return res.json({
        status: false,
        message: response.message || 'Couldnt create user',
        message_es: response.message || 'No se pudo crear el usuario',
        error: response.data,
      })
    }

    userDetailsInput.user_uuid = response.data.uuid
    userDetailsInput.full_name = userInput?.name + ' ' + userInput?.last_name

    let details = await userDetailsModel.create(userDetailsInput)

    if (!details.is_talent) {
      await recruiterModel.create({
        user_uuid: details.user_uuid,
        profile_picture_url: details.profile_picture_url,
        profile_banner_url: details.profile_banner_url,
      })
    }

    let u = await getFullUserByUUID(details.user_uuid)

    if (u.person) {
      u.name = u.person.name + ' ' + u.person.last_name
    } else {
      u.name = userDetailsInput.name
    }

    sendMail({
      to: u,
      variables: u,
      mail_path: '/' + req.body.lang + '/mail/register',
      subject:
        req.body.lang == 'es' ? 'Bienvenido a Darshana' : 'Welcome to Darshana',
    })

    res.json({
      status: true,
      message: 'Register successfully',
      message_es: 'Registrado con exito',
    })
  },

  registerHackathonAdmin: () => async (req, res) => {
    let userInput = aobj.extract(req.body, [
      'email',
      'password',
      'name',
      'last_name',
      'document_type',
      'document_number',
    ])

    let userExists = await whiz.user.getByEmail({
      email: userInput.email,
      role: process.env.WHIZ_API_ROLE_USER,
    })

    if (userExists.status) {
      return res.json({
        status: true,
        message: 'User already registered',
        message_es: 'Usuario ya registrado',
      })
    }

    let response = await whiz.user.create({
      ...userInput,
      role: process.env.WHIZ_API_ROLE_ADMIN,
    })

    if (!response.status) {
      return res.json({
        status: false,
        message: response.message || 'Couldnt create user',
        message_es: response.message || 'No se pudo crear el usuario',
        error: response.data,
      })
    }

    res.json({
      status: true,
      message: 'Register successfully',
      message_es: 'Registrado con exito',
    })
  },

  checkEmail: () => async (req, res) => {
    let email = req.body.email

    let userExists = await whiz.user.getByEmail({
      email: email,
      role: process.env.WHIZ_API_ROLE_USER,
    })

    if (userExists.status) {
      let userDetailsExists = await userDetailsModel.getOneWhere({
        equals: { user_uuid: userExists.data.uuid },
      })
      if (userDetailsExists) {
        return res.json({
          status: false,
          message: 'Email already in use',
          message_es: 'Correo ya esta en uso',
        })
      }
    }

    res.json({
      status: true,
      message: 'Email available',
      message_es: 'Correo disponible',
    })
  },

  updateUserInfo:
    ({ useAdminRole, useForumAdminRole }) =>
    async (req, res, next) => {
      try {
        let role = process.env.WHIZ_API_ROLE_USER
        if (useAdminRole) role = process.env.WHIZ_API_ROLE_ADMIN
        if (useForumAdminRole) role = process.env.WHIZ_API_ROLE_FORUM_ADMIN

        console.log('🚀 ~ file: users.js:938 ~ role:', role)

        const { user_uuid } = req.session
        const { name, last_name, phone, ...userDetailsInput } = req.body

        const user = await whiz.user.get(user_uuid)
        if (!user.status) throw new ValidationError('User not found')

        const updatedUser = await whiz.user.updateWithPerson({
          user: user.data.uuid,
          person: user.data.person.uuid,
          body: {
            person: {
              name: name,
              last_name: last_name,
              phone: phone,
              documentType: 'DNI',
              documentNumber: uuidv4(),
            },
          },
        })

        if (!updatedUser.status)
          throw new ValidationError('Error to update user')
        await whiz.refreshUser(user.data.uuid)

        userDetailsInput.full_name =
          updatedUser?.data?.person?.name +
          ' ' +
          updatedUser?.data?.person?.last_name

        await MODELS.UserDetails.update(
          { ...userDetailsInput },
          { where: { user_uuid } },
        )

        res.json({
          status: true,
          message: 'Success updated user',
          message_es: 'Datos actualizados con exito',
        })
      } catch (error) {
        logger.error('🚀 ~ file: users.controller.js:1140 ~ error:', error)
        next(error)
      }
    },

  updateUserAlgoAddress: () => async (req, res) => {
    let detailsInput = aobj.extract(req.body, ['algo_address'])

    let details = await userDetailsModel.getOneWhere({
      equals: { user_uuid: req.session.user_uuid },
    })

    if (details) {
      detailsInput.id = details.id
      details = await userDetailsModel.update(detailsInput)
    }

    res.json({
      status: true,
      message: 'Datos actualizados con exito',
      data: details,
    })
  },

  updateUserNearWallet: () => async (req, res) => {
    let detailsInput = aobj.extract(req.body, ['near_wallet'])

    let details = await userDetailsModel.getOneWhere({
      equals: { user_uuid: req.session.user_uuid },
    })
    if (details) {
      detailsInput.id = details.id
      details = await userDetailsModel.update(detailsInput)
    }

    res.json({
      status: true,
      message: 'Datos actualizados con exito',
      data: details,
    })
  },

  updatePaypalEmail: () => async (req, res) => {
    let detailsInput = aobj.extract(req.body, ['paypal_email', 'paypal_url'])

    let details = await userDetailsModel.getOneWhere({
      equals: { user_uuid: req.session.user_uuid },
    })
    if (details) {
      detailsInput.id = details.id
      details = await userDetailsModel.update(detailsInput)
    } else {
      detailsInput.user_uuid = req.session.user_uuid
      details = await userDetailsModel.create(detailsInput)
    }

    res.json({
      status: true,
      message: 'Datos actualizados con exito',
      data: details,
    })
  },

  checkPaypalEmail: () => async (req, res) => {
    let paypal_email = req.body.paypal_email

    res.json({
      status: true,
      message: 'Valid paypal email',
      message_es: 'Correo de paypal valido',
      data: paypal_email,
    })
  },

  getPaypalEmail: () => async (req, res) => {
    let details = await userDetailsModel.getOneWhere({
      equals: { user_uuid: req.session.user_uuid },
    })

    if (!details.paypal_email) {
      return res.json({
        status: false,
        message: 'User does not have a paypal email',
        message_es: 'El usuario no tiene correo de paypal valido',
      })
    }

    res.json({
      status: true,
      message: 'User have a paypal email',
      message_es: 'El usuario tiene correo de paypal valido',
    })
  },

  unlinkPaypal: () => async (req, res) => {
    let details = await userDetailsModel.getOneWhere({
      equals: { user_uuid: req.session.user_uuid },
    })

    if (details) {
      details = await userDetailsModel.update({
        id: details.id,
        paypal_email: null,
        paypal_url: null,
      })
    }

    res.json({
      status: true,
      message: 'Datos actualizados con exito',
      data: details,
    })
  },

  setTalent: () => async (req, res) => {
    let details = await userDetailsModel.getOneWhere({
      equals: { user_uuid: req.session.user_uuid },
    })

    logger.debug('🚀 ~ file: users.js:1254 ~ setTalent: ~ details:', details)

    details = await userDetailsModel.update({
      id: details.id,
      is_talent: true,
    })

    logger.debug('🚀 ~ file: users.js:1261 ~ setTalent: ~ details:', details)

    res.json({
      status: true,
      message: 'Datos actualizados con exito',
      data: details,
    })
  },

  getTalents: () => async (req, res, next) => {
    try {
      let {
        page,
        length,
        order = [],
        search,
        user_logueado_uuid,
        job_status_id,
        language_en,
        language_es,
        skill,
        rol_interest,
        user_workplace_verify_status,
        ...where
      } = req.query
      console.log(user_logueado_uuid)
      console.log(job_status_id)

      const isSkillPlusPlus = (skillNew) => skillNew === 'C  '
      const isSkillAngular2Plus = (skillNew) => skillNew === 'Angular 2 '

      if (Array.isArray(skill)) {
        skill?.forEach((item, index) => {
          if (isSkillPlusPlus(item)) skill[index] = 'C++'
          if (isSkillAngular2Plus(item)) skill[index] = 'Angular 2+'
        })
      } else {
        if (isSkillPlusPlus(skill)) skill = 'C++'
        if (isSkillAngular2Plus(skill)) skill = 'Angular 2+'
      }

      const { column = null, dir = null } = order[0] ?? []
      const limit = parseInt(length) || 999999
      page = parseInt(page)

      const whereConditionl = {
        deleted_at: null,
        is_talent: 1,
        ...(search?.value.length > 0 && {
          full_name: { [Op.like]: '%' + search?.value + '%' },
        }),
        ...(where && where),
      }

      const include = []

      if (user_workplace_verify_status) {
        include.push({
          attributes: ['id', 'verify_status_id'],
          model: MODELS.UserWorkPlaces,
          where: {
            verify_status_id: user_workplace_verify_status,
          },
        })
      }

      if (language_en || language_es)
        include.push({
          attributes: ['id', 'name_en', 'name_es'],
          model: MODELS.Languages,
          where: {
            ...(language_en && {
              name_en: language_en,
            }),
            ...(language_es && {
              name_es: language_es,
            }),
          },
        })
      if (skill) {
        include.push({
          attributes: ['id', 'name', 'required'],
          model: MODELS.Skills,
          where: {
            name: skill,
          },
        })
      }
      if (rol_interest) {
        include.push({
          attributes: ['id', 'name'],
          model: MODELS.RolesInterest,
          where: {
            name: rol_interest,
          },
        })
      }

      const options = {
        include,
        where: whereConditionl,
        order: [[column || 'id', dir || 'asc']],
      }

      const getUsers = await UserDetailsModel.findAll({
        attributes: [
          'id',
          'user_uuid',
          'full_name',
          'subtitle',
          'summary',
          'profile_picture_url',
          'is_top',
          'profile_percentage',
        ],
        ...options,
        offset: page ? --page * limit : undefined,
        limit,
      })
      const getUsersCount = await UserDetailsModel.findAll({
        attributes: ['id'],
        ...options,
      })

      const count = getUsersCount.length
      const last_page = Math.ceil(count / limit)

      res.json({
        status: true,
        message: 'Listando usuarios',
        count,
        length: getUsers.length,
        meta: {
          last_page: last_page,
        },
        data: getUsers,
      })
    } catch (error) {
      next(error)
    }
  },

  getByUserSkill: () => async (req, res) => {
    let talents = await userDetailsModel.getAllWhere({
      equals: { is_talent: 1 },
    })
    let result = []

    for (const t of talents) {
      let skills = (await userSkillsModel.getAll()).filter(
        (s) => s.user_uuid == t.user_uuid,
      )
      if (
        skills
          .map((v) => (v.name + '').toLowerCase().trim())
          .includes((req.params.skill + '').toLowerCase().trim())
      ) {
        result.push(t)
      }
    }

    for (const i in result) {
      result[i] = await getFullUserByUUID(result[i].user_uuid)
    }

    res.json({
      status: true,
      message: 'Listando datos',
      data: result,
    })
  },

  getFavorites: () => async (req, res) => {
    let response = {}
    response = await userFavoritesModel.datatable(req)
    const { data } = response

    for (const [, item] of data.entries()) {
      const { type, favorite_uuid } = item

      if (type === typeFavorites.talent) {
        const detail = await userDetailsModel.getOneWhere({
          equals: { user_uuid: favorite_uuid },
        })
        const user = await whiz.getUser(favorite_uuid)
        if (!detail) {
          return res.json({ status: false, message: 'User not found' })
        }
        item.favorite_uuid_detail = detail
        item.favorite_uuid_detail.user = user.data
      }

      if (type === typeFavorites.project) {
        const detail = await projectsModel.getOneWhere({
          equals: { id: favorite_uuid },
        })
        if (!detail) {
          return res.json({ status: false, message: 'Project not found' })
        }
        item.favorite_uuid_detail = detail
      }

      if (type === typeFavorites.job) {
        const detail = await jobsModel.getOneWhere({
          equals: { id: favorite_uuid },
        })
        if (!detail) {
          return res.json({ status: false, message: 'Job not found' })
        }
        item.favorite_uuid_detail = detail
      }
    }

    res.json({
      status: true,
      message: 'Listando favoritos',
      ...response,
    })
  },

  toggleFavorite: () => async (req, res) => {
    const { type } = req.body
    const favorite_uuid = req.params.user_uuid

    if (type === typeFavorites.talent) {
      const user = await userDetailsModel.getOneWhere({
        equals: { user_uuid: favorite_uuid },
      })
      if (!user) {
        return res.json({ status: false, message: 'User not found' })
      }
    }

    if (type === typeFavorites.project) {
      const project = await projectsModel.getOneWhere({
        equals: { id: favorite_uuid },
      })
      if (!project) {
        return res.json({ status: false, message: 'Project not found' })
      }
    }

    if (type === typeFavorites.job) {
      const job = await jobsModel.getOneWhere({
        equals: { id: favorite_uuid },
      })
      if (!job) {
        return res.json({ status: false, message: 'Job not found' })
      }
    }

    let fav = await userFavoritesModel.getOneWhere({
      equals: { user_uuid: req.session.user_uuid, favorite_uuid, type },
    })

    if (fav) {
      await userFavoritesModel.delete(fav.id)
      return res.json({
        status: true,
        message: 'No longer a favorite',
        favorite: false,
      })
    }

    await userFavoritesModel.create({
      user_uuid: req.session.user_uuid,
      favorite_uuid,
      type,
    })
    res.json({ status: true, message: 'Favorite added', favorite: true })
  },

  getByUUID: () => async (req, res) => {
    let response = await userDetailsModel.getOneWhere({
      equals: { user_uuid: req.params.user_uuid },
    })

    if (!response) {
      return res.json({ status: false, message: 'Usuario no encontrado' })
    }

    res.json({
      status: true,
      message: 'Obteniendo usuario',
      data: await getFullUserByUUID(response.user_uuid),
    })
  },

  getById: () => async (req, res) => {
    let response = await userDetailsModel.getById(req.params.id)

    if (!response) {
      return res.json({ status: false, message: 'Usuario no encontrado' })
    }

    res.json({
      status: true,
      message: 'Obteniendo usuario',
      data: await getFullUserByUUID(response.user_uuid),
    })
  },

  getByWorkplace: () => async (req, res) => {
    let user_workplaces = await userWorkplacesModel.getAllWhere({
      equals: { workplace_id: req.params.workplace_id },
    })
    let response = []

    for (let user_workplace of user_workplaces) {
      response.push(await getFullUserByUUID(user_workplace.user_uuid))
    }

    if (!response) {
      return res.json({ status: false, message: 'Usuarios no encontrados' })
    }

    res.json({
      status: true,
      message: 'Obteniendo usuarios',
      data: response,
    })
  },

  getBySkills: () => async (req, res) => {
    let skills = (await userSkillsModel.getAll()).filter((h) =>
      req.query.skills.includes(h.id),
    )

    let user_uuids = skills.map((h) => h.user_uuid)

    let response = await userDetailsModel.datatable(req, { user_uuids })

    res.json({
      status: true,
      message: 'Listando usuarios',
      ...response,
    })
  },

  updatePassword: () => async (req, res) => {
    if (req.body.new_password !== req.body.confirm_new_password) {
      return res.json({
        status: false,
        message:
          'La nueva contraseña no coinciden con la confirmación de nueva contraseña',
      })
    }

    let user = await whiz.getUser(req.session.user_uuid)
    if (!user.status) {
      return res.json({
        status: false,
        message: user.message || 'Usuario no encontrado',
        error: user.data,
      })
    }

    let response = await whiz.user.updateWithPerson({
      user: req.session.user_uuid,
      person: user.data.person.uuid,
      body: {
        user: {
          password: req.body.new_password,
        },
      },
    })

    await whiz.refreshUser(req.session.user_uuid)

    if (!response.status) {
      return res.json({
        status: false,
        message: response.message || 'No se pudo actualizar el usuario',
        error: response.data,
      })
    }

    res.json({
      status: true,
      message: 'Contraseña actualizada',
    })
  },

  sendAdminForumPasswordRecoveryToken: () => async (req, res) => {
    let response = await whiz.user.getByEmail({
      email: req.body.email,
      role: process.env.WHIZ_API_ROLE_FORUM_ADMIN,
    })

    if (!response.status) {
      return res.json({
        status: false,
        message: response.message || 'Correo no registrado',
        error: response.data,
      })
    }

    let recoveryCodeInput = {
      user_uuid: response.data.uuid,
      code: await generateRecoveryCode(),
      expires_at: new Date(Date.now() + milliseconds(1)), // 3 hours from now
    }

    let existingCodes = await recoveryCodesModel.getAllWhere({
      equals: { user_uuid: recoveryCodeInput.user_uuid },
    })
    if (existingCodes.length > 0) {
      for (const existingCode of existingCodes) {
        await recoveryCodesModel.delete(existingCode.id)
      }
    }

    await recoveryCodesModel.create(recoveryCodeInput)

    sendMail({
      to: {
        name: response.data.person.name,
        last_name: response.data.person.last_name,
        email: response.data.email,
      },
      variables: {
        name: response.data.person.name + ' ' + response.data.person.last_name,
        email: response.data.email,
        code: recoveryCodeInput.code,
      },
      mail_path: '/' + req.body.lang + '/mail/temp-mail-recover-admin-forum',
      subject:
        req.body.lang == 'es'
          ? 'Recuperar Contraseña'
          : 'Recover your password',
    })

    res.json({
      status: true,
      message: 'Mail de recuperación de contraseña enviado',
    })
  },

  sendEmailBy: () => async (req, res) => {
    let response = await whiz.user.getByEmail({
      email: req.body.email,
      role: process.env.WHIZ_API_ROLE_USER,
    })

    if (!response.status) {
      return res.json({
        status: false,
        message: response.message || 'Correo no registrado',
        error: response.data,
      })
    }

    sendMail({
      to: {
        name: response.data.person.name,
        last_name: response.data.person.last_name,
        email: response.data.email,
      },
      variables: {
        name: response.data.person.name + ' ' + response.data.person.last_name,
        email: response.data.email,
        body: req.body.message,
      },
      mail_path: '/mail/temp-send-mail',
      subject: req.body.subject,
    })

    res.json({
      status: true,
      message: 'Mail personalizado enviado',
    })
  },

  sendPasswordRecoveryToken: () => async (req, res) => {
    let response = await whiz.user.getByEmail({
      email: req.body.email,
      role: process.env.WHIZ_API_ROLE_USER,
    })

    if (!response.status) {
      return res.json({
        status: false,
        message: response.message || 'Correo no registrado',
        error: response.data,
      })
    }

    let recoveryCodeInput = {
      user_uuid: response.data.uuid,
      code: await generateRecoveryCode(),
      expires_at: new Date(Date.now() + milliseconds(3)), // 3 hours from now
    }

    let existingCodes = await recoveryCodesModel.getAllWhere({
      equals: { user_uuid: recoveryCodeInput.user_uuid },
    })
    if (existingCodes.length > 0) {
      for (const existingCode of existingCodes) {
        await recoveryCodesModel.delete(existingCode.id)
      }
    }

    await recoveryCodesModel.create(recoveryCodeInput)

    sendMail({
      to: {
        name: response.data.person.name,
        last_name: response.data.person.last_name,
        email: response.data.email,
      },
      variables: {
        WEB_URL: process.env.WEB_URL,
        code: recoveryCodeInput.code,
      },
      mail_path: `/mails/templates/RecoverPassword-${req.body.lang}.html`,
      subject:
        req.body.lang == 'es'
          ? 'Recuperar Contraseña'
          : 'Recover your password',
    })

    res.json({
      status: true,
      message: 'Mail de recuperación de contraseña enviado',
    })
  },

  updatePasswordByRecoveryToken: () => async (req, res) => {
    let recoveryCode = await recoveryCodesModel.getOneWhere({
      equals: { code: req.body.code },
    })

    if (!recoveryCode) {
      return res.json({ status: false, message: 'Codigo no encontrado' })
    }

    let user = await whiz.getUser(recoveryCode.user_uuid)

    if (!user.status) {
      return res.json({
        status: false,
        message: user.message || 'Usuario no encontrado',
        error: user.data,
      })
    }

    let response = await whiz.user.updateWithPerson({
      user: user.data.uuid,
      person: user.data.person.uuid,
      body: {
        user: {
          password: req.body.password,
        },
      },
    })

    await whiz.refreshUser(recoveryCode.user_uuid)

    if (!response.status) {
      return res.json({
        status: false,
        message: response.message || 'No se pudo encontrar el usuario',
        error: response.data,
      })
    }

    await recoveryCodesModel.delete(recoveryCode.id)

    res.json({
      status: true,
      message: 'Contraseña actualizada',
    })
  },

  login:
    ({ useAdminRole, useForumAdminRole }) =>
    async (req, res) => {
      let role = process.env.WHIZ_API_ROLE_USER

      if (useAdminRole) {
        role = process.env.WHIZ_API_ROLE_ADMIN
      }

      if (useForumAdminRole) {
        role = process.env.WHIZ_API_ROLE_FORUM_ADMIN
      }

      let userInput = aobj.extract(req.body, ['email', 'password'])

      let userExists = await whiz.user.getByEmail({
        email: userInput.email,
        role: role,
      })

      if (!userExists.status) {
        return res.json({
          status: false,
          message: 'Email and/or password incorrect',
          message_es: 'Correo y/o contraseña incorrectos',
        })
      }

      let response = await whiz.user.login({ ...userInput, role: role })

      if (!response.status) {
        return res.json({ status: false, message: response.message })
      }

      // guardarlo en bd local
      let userDetailsExists = await userDetailsModel.getOneWhere({
        equals: { user_uuid: userExists.data.uuid },
      })

      logger.debug(
        '🚀 ~ file: users.js:1798 ~ userDetailsExists:',
        userDetailsExists,
      )

      let userDetailsInput = {
        is_talent: true,
      }
      if (!userDetailsExists) {
        userDetailsInput.user_uuid = userExists.data.uuid
        await userDetailsModel.create(userDetailsInput)
      }

      logger.debug(
        '🚀 ~ file: users.js:1806 ~ userDetailsInput:',
        userDetailsInput,
      )

      if (userDetailsExists.state === 'deleted') {
        res.status(404).json({
          status: false,
          message: 'Email and/or password incorrect',
          message_es: 'Correo y/o contraseña incorrectos',
        })
      }
      logger.debug(
        '🚀 ~ file: users.js:1812 ~ userDetailsExists:',
        userDetailsExists,
      )

      // verify_email = false
      if (userDetailsExists.verify_email === '0') {
        return res.status(403).json({
          status: false,
          message: 'Email is not verified',
          message_es: 'Correo electrónico no está verificado',
        })
      }
      logger.debug(
        '🚀 ~ file: users.js:1821 ~ userDetailsExists:',
        userDetailsExists,
      )

      res.json({
        status: true,
        message: 'Login exitoso',
        access_token: authMiddleware.generateToken({
          uuid: response.data.uuid,
          role,
        }),
        data: await getFullUserByUUID(response.data.uuid),
      })
    },

  loginGoogle: () => async (req, res) => {
    let role = process.env.WHIZ_API_ROLE_USER

    let google_id = await verifyGoogleIDToken(req.body.google_id_token)

    let user = await userDetailsModel.getOneWhere({ equals: { google_id } })

    if (!user) {
      return res.json({ status: false, message: 'Usuario no encontrado' })
    }

    let response = await whiz.getUser(user.user_uuid)

    res.json({
      status: true,
      message: 'Login exitoso',
      access_token: authMiddleware.generateToken({
        uuid: response.data.uuid,
        role,
      }),
      data: await getFullUserByUUID(response.data.uuid),
    })
  },

  status: () => async (req, res) => {
    res.json({
      status: true,
      message: 'Token valido',
      access_token: req.session.token,
      data: await getFullUserByUUID(req.session.user_uuid),
    })
  },

  checkAlgoAccount: () => async (req, res) => {
    const algodToken = {
      'X-API-Key': process.env.ALGO_API_KEY || '',
    }
    const algodServer = process.env.ALGO_SERVER || ''
    const algodPort = process.env.ALGO_PORT || ''
    const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort)

    try {
      const response = await algosdk.isValidAddress(req.body.algo_address)
      return response
        ? res.json({
            status: true,
            message: 'algo address validado',
            is_valid: response,
            algo_client: algodClient,
          })
        : res.json({
            status: false,
            message: 'el algo address ingresado no es valido',
          })
    } catch (err) {
      return res.json({
        status: false,
        message:
          'Por lo pronto no podemos validar el address. Inténtelo más tarde luego.',
      })
    }
  },

  percentageOfProfile: () => async (req, res) => {
    let listUsers = await userDetailsModel.getAll()
    listUsers.map(async (item) => {
      await sendMailIncompleteProfile(item, req.params.lang)
    })
    res.json({
      status: true,
    })
  },

  updatePercentageUser: () => async (req, res) => {
    let listUsers = await userDetailsModel.getAll()
    listUsers.map(async (item) => {
      let userData = await getCompleteUser(item.user_uuid)
      let userToUpdate = {}
      userToUpdate.id = userData.id
      userToUpdate.profile_percentage = userData.profile_percentage
      await userDetailsModel.update(userToUpdate)
    })
    res.json({
      status: true,
    })
  },

  temporalFillFullName: () => async (req, res) => {
    let listUsers = await userDetailsModel.getAll()
    for (const item of listUsers) {
      let userData = await whiz.getUser(item.user_uuid)
      let userToUpdate = {}
      userToUpdate.id = item.id
      userToUpdate.full_name =
        userData?.data?.person?.name + ' ' + userData?.data?.person?.last_name
      await userDetailsModel.update(userToUpdate)
    }
    res.json({
      status: true,
    })
  },
}
