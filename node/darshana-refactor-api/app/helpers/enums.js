const typeFavorites = {
  talent: 'talent',
  project: 'project',
  job: 'job',
}

const typeNotifications = {
  PROJ_APPLICATION_NEW: 'PROJ_APPLICATION_NEW',
  JOB_APPLICATION_NEW: 'JOB_APPLICATION_NEW',

  PROJ_REQ_END: 'PROJ_REQ_END',

  PROJ_HIRED_TALENT: 'PROJ_HIRED_TALENT',
  JOB_HIRED_TALENT: 'JOB_HIRED_TALENT',

  PROJ_UNHIRED_TALENT: 'PROJ_UNHIRED_TALENT',
  JOB_UNHIRED_TALENT: 'JOB_UNHIRED_TALENT',

  JOB_INV_NEW: 'JOB_INV_NEW',
  PROJ_INV_NEW: 'PROJ_INV_NEW',

  PROJ_START: 'PROJ_START',
  PROJ_END: 'PROJ_END',

  JOB_END: 'JOB_END',

  PROJ_FROM_POSTULATION_TO_SELECT_TALENT:
    'PROJ_FROM_POSTULATION_TO_SELECT_TALENT',
  JOB_FROM_POSTULATION_TO_SELECT_TALENT:
    'JOB_FROM_POSTULATION_TO_SELECT_TALENT',

  NEW_MESSAGE: 'NEW_MESSAGE',

  PROJ_UPLOADED_FILE: 'PROJ_UPLOADED_FILE',

  PROJ_APP_UPDATED_BY_USER: 'PROJ_APP_UPDATED_BY_USER',
  PROJ_APP_COUNTER_PROPOSAL_BY_USER: 'PROJ_APP_COUNTER_PROPOSAL_BY_USER',
}

const typeErrorMessages = {
  JOB_ALREADY_DELETED: 'Job is already deleted',
  JOB_ALREADY_DELETED_ES: 'El empleo ya esta eliminado',

  JOB_DELETED: 'Job is deleted',
  JOB_DELETED_ES: 'El empleo se encuentra eliminado',

  JOB_NOT_FOUND: 'Job not found',
  JOB_NOT_FOUND_ES: 'Empleo no encontrado',

  JOB_DISABLE: 'Job is not active',
  JOB_DISABLE_ES: 'El empleo no esta activo',

  JOB_COMPLETED: 'Job has been completed',
  JOB_COMPLETED_ES: 'Puesto de trabajo ya se encuentra finalizado',

  PROJECT_NOT_FOUND: 'Project not found',
  PROJECT_NOT_FOUND_ES: 'Proyecto no encontrado',

  PROJECT_DELETED: 'Project is deleted',
  PROJECT_DELETED_ES: 'El projecto se encuentra eliminado',

  PROJECT_DISABLE: 'Project is not active',
  PROJECT_DISABLE_ES: 'El proyecto no esta activo',

  PROJECT_COMPLETED: 'Project has been completed',
  PROJECT_COMPLETED_ES: 'El proyecto ha sido completado',

  PROPOSAL_NO_ACCEPTED: 'Proposal not accepted',
  PROPOSAL_NO_ACCEPTED_ES: 'Propuesta no aceptada',

  PROPOSAL_ALREADY_CLOSED: 'Proposal has already been marked as ready to close',
  PROPOSAL_ALREADY_CLOSED_ES:
    'La propuesta ya se encuentra marcado como lista para cerrar',

  PROPOSAL_NOT_ACCEPTED: 'Proposal was not accepted',
  PROPOSAL_NOT_ACCEPTED_ES: 'La propuesta no fue aceptada',

  APPLICATION_DELETED_MESSAGE: 'The application is deleted',
  APPLICATION_DELETED_MESSAGE_ES: 'La aplicacion se encuentra eliminada',

  APPLICATION_NOT_FOUND: 'The application is not found',
  APPLICATION_NOT_FOUND_ES: 'La aplicacion se fue encontrada',

  CENTRE_NOT_FOUND: 'Centre of work not found',
  CENTRE_NOT_FOUND_ES: 'Centro de trabajo no encontrado',

  RECORD_NOT_FOUND: 'Registro no encontrado',
  RECORD_NOT_FOUND_ES: 'Record not found',

  COMPANY_NOT_FOUND: 'Company not found',
  COMPANY_NOT_FOUND_ES: 'Empresa no encontrada',

  BUSINESS_NOT_FOUND: 'Business not found',
  BUSINESS_NOT_FOUND_ES: 'Negocio no encontrado',

  RECRUITER_NOT_FOUND: 'Recruiter not found',
  RECRUITER_NOT_FOUND_ES: 'Reclutador no encontrado',

  USER_UUID_NOTIFICATION:
    'Enter the user_uuid of the user to send the notification',
  USER_UUID_NOTIFICATION_ES:
    'Ingresar el user_uuid del usuario a enviar la notificatión',

  CANT_ADD_EMAIL_TO_COMPANY: "You can't add emails to this company",
  CANT_ADD_EMAIL_TO_COMPANY_ES: 'No puedes agregar emails a esta compañia',

  TALENT_NOT_ABLE_TO_CREATE_COMPANY:
    'Talent user is not able to create a company',
  TALENT_NOT_ABLE_TO_CREATE_COMPANY_ES:
    'Un usuario talento no puede crear una empresa',

  COMMUNITY_NOT_FOUND: 'Comunidad no encontrada',
  COMMUNITY_NOT_FOUND_ES: 'Comunidad no encontrada',

  CANT_UPLOAD_FILE: 'Cant upload file',
  CANT_UPLOAD_FILE_ES: 'No se pudo subir el archivo',

  NOT_FOUND: 'Not found',
  NOT_FOUND_ES: 'No encontrado',

  IS_REQUIRED: 'is required',
  IS_REQUIRED_ES: 'es requerido',

  ALREADY_ACTIVATED: 'Already activated',
  ALREADY_ACTIVATED_ES: 'Ya se encuentra activado',

  ALREADY_ARCHIVED: 'Already archived',
  ALREADY_ARCHIVED_ES: 'Ya se encuentra archivado',

  COMMENT_ALREADY_FEATURED: 'The comment is already featured',
  COMMENT_ALREADY_FEATURED_ES: 'El comentario ya se encuentra destacado',

  COMMENT_ALREADY_DELETED: 'The comment is already deleted',
  COMMENT_ALREADY_DELETED_ES: 'El comentario ya se encuentra eliminado',

  USER_ALREADY_DELETED: 'The user is already deleted',
  USER_ALREADY_DELETED_ES: 'El usuario ya se encuentra eliminado',

  USER_ALREADY_EXIST: 'User already exist',
  USER_ALREADY_EXIST_ES: 'El usuario ya se encuentra registrado',

  USER_NOT_FOUND: 'User not found',
  USER_NOT_FOUND_ES: 'Usuario no encontrado',

  BANNED: 'Banned',
  BANNED_ES: 'Baneado',

  LABEL_ALREADY_EXIST: 'The label already exist',
  LABEL_ALREADY_EXIST_ES: 'La etiqueta ya existe',

  TITLE_ALREADY_REGISTERED: 'The title is already registered',
  TITLE_ALREADY_REGISTERED_ES: 'El titulo ya se encuentra registrado',

  COMMENT_ALREADY_SUSPENDED: 'The comment is already suspended',
  COMMENT_ALREADY_SUSPENDED_ES: 'El comentario ya se encuentra suspendido',

  POST_ALREADY_SUSPENDED: 'The post is already suspended',
  POST_ALREADY_SUSPENDED_ES: 'El post ya se encuentra suspendido',

  HACKATON_NOT_FOUND: 'Active hackathon not found',
  HACKATON_NOT_FOUND_ES: 'No se encontró una hackathon activa',

  ALREADY_PENDING_APPLICATION:
    'You already have a pending application for this project',
  ALREADY_PENDING_APPLICATION_ES:
    'Ya tienes una postulación pendiente para este proyecto',

  TALENT_NOT_FOUND: 'Talent not found',
  TALENT_NOT_FOUND_ES: 'Talento no encontrado',

  SKILL_NOT_FOUND: 'SKill not found',
  SKILL_NOT_FOUND_ES: 'Habilidad no encontrada',

  TIMER_NOT_FOUND: 'Timer not found',
  TIMER_NOT_FOUND_ES: 'Tiempo no encontrado',
}

const typeMessages = {
  GET_RESPONSE_MESSAGE: 'Getting data',
  GET_RESPONSE_MESSAGE_ES: 'Listando datos',

  POST_RESPONSE_MESSAGE: 'Data stored successfully',
  POST_RESPONSE_MESSAGE_ES: 'Datos registrados con exito',

  PATCH_RESPONSE_MESSAGE: 'Data updated successfully',
  PATCH_RESPONSE_MESSAGE_ES: 'Datos actualizados correctamente',

  DELETE_RESPONSE_MESSAGE: 'Data deleted successfully',
  DELETE_RESPONSE_MESSAGE_ES: 'Datos eliminados correctamente',

  GETTING_MESSAGE: 'Getting chat',
  GETTING_MESSAGE_ES: 'Retornando chat',

  NOTIFICATION_SENT: 'Notification sent',
  NOTIFICATION_SENT_ES: 'Notificacion enviada',

  GETTING_UNREAD_MESSAGE: 'Getting unread messages',
  GETTING_UNREAD_MESSAGE_ES: 'Obteniendo mensajes no leidos',

  SENDING_EMAIL: 'Sending emails',
  SENDING_EMAIL_ES: 'Enviando correos',

  USER_REMOVED: 'User removed',
  USER_REMOVED_ES: 'Usuario desactivado',

  NEW_POSTULATION_RECEIVED: 'New postulation received',
  NEW_POSTULATION_RECEIVED_ES: 'Nueva postulación recibida',

  INVITATION_SENT: 'Invitation sent',
  INVITATION_SENT_ES: 'Invitacion enviada',

  PROPOSAL_READY_TO_CLOSE: 'Proposal marked as ready to close',
  PROPOSAL_READY_TO_CLOSE_ES: 'Propuesta marcada como lista para cerrar',
}

const Sequelize = require('sequelize')
const models = require('../models')

const MODELS = {
  UserWorkplace: models.user_workplaces,
  UserWorkplaceVerifyStatus: models.user_workplaces_verify_status,
  UserWorkPlaces: models.user_workplaces,
  ProjectStatus: models.project_statuses,
  Business: models.business,
  Country: models.countries,
  UserDetails: models.user_details,
  Project: models.projects,
  ProjectTalentQualifications: models.project_talent_qualifications,
  ProjectApplications: models.project_applications,
  WhizUserCache: models.whiz_user_cache,
  Op: Sequelize.Op,
  WhizUserCacheModel: models.whiz_user_cache,
  Job: models.job,
  JobApplications: models.job_applications,
  JobStatus: models.job_status,
  WorkModality: models.work_modalities,
  ChatGpt: models.chat_gpt,
  Cities: models.cities,
  Countries: models.countries,
  Languages: models.languages,
  UsersLanguages: models.users_languages,
  Industries: models.industries,
  UsersIndustries: models.users_industries,
  RolesInterest: models.roles_interest,
  Skills: models.skills,
  UsersSkills: models.user_details_skills,
  Genders: models.genders,
  UserGenders: models.user_genders,
  UsersRolesInterest: models.users_roles_interest,
  SequelizeData: models.sequelize_data,
  SequelizeMeta: models.sequelize_meta,
  UserStudyCentres: models.user_study_centres,
  ValidationCheckoutModel: models.validation_checkout,
  VerificationRequestModel: models.verification_request,
}

module.exports = {
  typeFavorites: typeFavorites,
  typeNotifications: typeNotifications,
  typeErrorMessages: typeErrorMessages,
  typeMessages: typeMessages,
  MODELS: MODELS,
}
