const router = require('express').Router()
const express = require('express')
const multer = require('multer')
const upload = multer()

const validate = require('./middlewares/validate')
const sanitaze = require('./middlewares/sanitaze')
const { authorize } = require('./middlewares/auth')

const api = require('./controllers/api')
const users = require('./controllers/users.controller')
const user_skills = require('./controllers/user_skills')
const business_emails = require('./controllers/business_emails')
const user_followers = require('./controllers/user_followers')
const business = require('./controllers/business')
const jobs = require('./controllers/jobs')
const leads = require('./controllers/leads')
const notifications = require('./controllers/notifications')
const project_statuses = require('./controllers/project_statuses')
const project_skills = require('./controllers/project_skills')
const project_application_files = require('./controllers/project_application_files')
const job_statuses = require('./controllers/job_statuses')
const job_skills = require('./controllers/job_skills')
const news = require('./controllers/news')
const communities = require('./controllers/communities')
const topics = require('./controllers/topics')
const images = require('./controllers/images')
const files_s3 = require('./controllers/files_s3')
const chat = require('./controllers/chat')
const ubigeo = require('./controllers/ubigeo')
const timer = require('./controllers/timer')
const skills = require('./controllers/skills')
const work_modalities = require('./controllers/workmodalities')
const places_of_interest = require('./controllers/places_of_interest')
const user_places_of_interest = require('./controllers/user_places_of_interest')
const otp_controller = require('./controllers/otp.controller')

//----------------------------------USER---------------------------------------------

/**
 * @swagger
 * tags:
 *  name: Users
 */

/**
 * @swagger
 * /api/users/login:
 *  post:
 *   tags: [Users]
 *   summary: Login user
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        email:
 *          type: string
 *          description: email
 *          example: darshana@test.com
 *        password:
 *          type: string
 *          description: password
 *          example: 123123
 *      required:
 *        - email
 *        - password
 */
router.post(
  '/api/users/login',
  validate({
    email: 'required|email',
    password: 'required|string',
  }),
  sanitaze.preventxss(),
  users.login({ useAdminRole: false, useForumAdminRole: false }),
)

/**
 * @swagger
 * /api/users/login/google:
 *  post:
 *   tags: [Users]
 *   summary: Login user
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        google_id_token:
 *          type: string
 *          description: Google token
 */
router.post(
  '/api/users/login/google',
  validate({
    google_id_token: 'required|string',
  }),
  sanitaze.preventxss(),
  users.loginGoogle(),
)

/**
 * @swagger
 * /api/users/check/email:
 *  post:
 *   tags: [Users]
 *   summary: Login user
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        email:
 *          type: string
 *          description: email
 *          example: darshana@test.com
 */
router.post(
  '/api/users/check/email',
  validate({
    email: 'required|email',
  }),
  sanitaze.preventxss(),
  users.checkEmail(),
)

/**
 * @swagger
 * /api/users/check/algo_address:
 *  post:
 *   tags: [Users]
 *   summary: Login user
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        algo_address:
 *          type: string
 *          description: the name of the task
 *      example:
 *        algo_address: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 */
router.post(
  '/api/users/check/algo_address',
  validate({
    algo_address: 'required',
  }),
  sanitaze.preventxss(),
  users.checkAlgoAccount(),
)

/**
 * @swagger
 * /api/users/password:
 *  post:
 *   tags: [Users]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        new_password:
 *         type: string
 *         example: 123123
 *        confirm_new_password:
 *         type: string
 *         example: 123123
 */
router.post(
  '/api/users/password',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    new_password: 'required|string',
    confirm_new_password: 'required|string',
  }),
  sanitaze.preventxss(),
  users.updatePassword(),
)

/**
 * @swagger
 * /api/users/register:
 *  post:
 *   tags: [Users]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        email:
 *         type: string
 *         example: darshana@test.com
 *        name:
 *         type: string
 *        last_name:
 *         type: string
 *        phone:
 *         type: string
 *         example: +51 1 1234567
 *        password:
 *         type: string
 *         example: 123123
 *        purpose:
 *         type: string
 *        subtitle:
 *         type: string
 *        summary:
 *         type: string
 *        is_talent:
 *         type: boolean
 *        google_id_token:
 *         type: string
 *         description: optional
 *        algo_address:
 *         type: string
 *        lang:
 *         type: string
 *         example: EN
 *        profile_picture_url:
 *         type: string
 *        workplace_name:
 *         type: string
 *        start_date:
 *         type: date
 *         pattern: /([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/
 *         example: "2019-05-17"
 *        end_date:
 *         type: date
 *         pattern: /([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/
 *         example: "2019-05-17"
 *        work_here:
 *         type: boolean
 *        description:
 *         type: string
 *        position:
 *         type: string
 *        enable_business:
 *         type: boolean
 */
router.post(
  '/api/users/register',
  validate({
    email: 'required|email',
    name: 'required|string',
    last_name: 'required|string',
    phone: 'required|string',
    password: 'required|string',

    purpose: 'string',
    subtitle: 'string',
    summary: 'string',
    is_talent: 'required|boolean',
    google_id_token: 'string',

    algo_address: 'string',
    lang: 'required|string',
    profile_picture_url: 'string',

    workplace_name: 'string',
    start_date: 'date',
    end_date: 'date',
    work_here: 'boolean',
    description: 'string',
    position: 'string',
    enable_business: 'boolean',
  }),
  sanitaze.preventxss(),
  users.registerUser(),
)

/**
 * @swagger
 * /api/users/delete:
 *  delete:
 *   tags: [Users]
 *   responses:
 *    200
 */
router.delete(
  '/api/users/delete',
  authorize(process.env.WHIZ_API_ROLE_USER),
  sanitaze.preventxss(),
  users.deleteUser(),
)

/**
 * @swagger
 * /api/hackathon/users/register:
 *  post:
 *   tags: [Users]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        google_id_token:
 *         type: string
 *        email:
 *         type: string
 *         example: darshana@test.com
 *        password:
 *         type: string
 *         example: 123123
 *        confirm_password:
 *         type: string
 *         example: 123123
 *        name:
 *         type: string
 *        last_name:
 *         type: string
 *        document_type:
 *         type: string
 *         example: DNI
 *        document_number:
 *         type: string
 *        birthdate:
 *         type: date
 *         pattern: /([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/
 *         example: "2019-05-17"
 *        phone:
 *         type: string
 *         example: +51 1 1234567
 *         description: optional
 *        purpose:
 *         type: string
 *        subtitle:
 *         type: string
 *        google_token:
 *         type: string
 *        summary:
 *         type: string
 *        country_id:
 *         type: number
 *        city_id:
 *         type: number
 *        hackathon_id:
 *         type: number
 */
router.post(
  '/api/hackathon/users/register',
  validate({
    google_id_token: 'string',
    email: 'required|email',
    password: 'required|string',
    confirm_password: 'required|string',
    name: 'required|string',
    last_name: 'required|string',
    document_type: 'required|string',
    document_number: 'required|string',
    birthdate: 'string',
    phone: 'string',
    purpose: 'string',
    subtitle: 'string',
    google_token: 'string',
    summary: 'string',
    country_id: 'required|integer',
    city_id: 'integer',
    hackathon_id: 'integer',
  }),
  sanitaze.preventxss(),
  users.registerUserHackathon({ useAdminRole: false }),
)

/**
 * @swagger
 * /api/hackathon/admins/register:
 *  post:
 *   tags: [Users]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        email:
 *         type: string
 *         example: darshana@test.com
 *        password:
 *         type: string
 *         example: 123123
 *        name:
 *         type: string
 *        last_name:
 *         type: string
 *        document_type:
 *         type: string
 *         example: DNI
 *        document_number:
 *         type: string
 */
router.post(
  '/api/hackathon/admins/register',
  authorize(process.env.WHIZ_API_ROLE_ADMIN),
  validate({
    email: 'required|email',
    password: 'required|string',
    name: 'required|string',
    last_name: 'required|string',
    document_type: 'required|string',
    document_number: 'required|string',
  }),
  sanitaze.preventxss(),
  users.registerUserHackathon({ useAdminRole: true }),
)

/**
 * @swagger
 * /api/users/recovery/email:
 *  post:
 *   tags: [Users]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        email:
 *         type: string
 *         example: darshana@test.com
 *        lang:
 *         type: string
 *         example: EN
 */
router.post(
  '/api/users/recovery/email',
  validate({
    email: 'required|email',
    lang: 'required|string',
  }),
  sanitaze.preventxss(),
  users.sendPasswordRecoveryToken(),
)

/**
 * @swagger
 * /api/users/recovery/password:
 *  post:
 *   tags: [Users]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        code:
 *         type: string
 *        password:
 *         type: string
 *         example: 123123
 */
router.post(
  '/api/users/recovery/password',
  validate({
    code: 'required|string',
    password: 'required|string',
  }),
  sanitaze.preventxss(),
  users.updatePasswordByRecoveryToken(),
)

/**
 * @swagger
 * /api/users/info:
 *  patch:
 *   tags: [Users]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        name:
 *         type: string
 *        last_name:
 *         type: string
 *        email:
 *         type: string
 *         example: darshana@test.com
 *        phone:
 *         type: string
 *         example: +51 1 1234567
 *        country_id:
 *         type: string
 *        city_id:
 *         type: string
 *        subtitle:
 *         type: string
 *        summary:
 *         type: string
 *        facebook_url:
 *         type: string
 *         example: www.facebook.com/darshana
 *        twitter_url:
 *         type: string
 *         example: www.twitter.com/darshana
 *        linkedin_url:
 *         type: string
 *         example: https://www.linkedin.com/in/darshana-48a636207
 *        new_password:
 *         type: string
 *         example: 123123
 *        confirm_new_password:
 *         type: string
 *         example: 123123
 *        profile_picture_url:
 *         type: string
 *        profile_banner_url:
 *         type: string
 */
router.patch(
  '/api/users/info',
  authorize(process.env.WHIZ_API_ROLE_USER),
  sanitaze.preventxss(),
  users.updateUserInfo({ useForumAdminRole: false, useAdminRole: false }),
)

/**
 * @swagger
 * /api/users/update_algo_address:
 *  patch:
 *   tags: [Users]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        algo_address:
 *         type: string
 */
router.patch(
  '/api/users/update_algo_address',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    algo_address: 'string',
  }),
  sanitaze.preventxss(),
  users.updateUserAlgoAddress(),
)

/**
 * @swagger
 * /api/users/update_near_wallet:
 *  patch:
 *   tags: [Users]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        near_wallet:
 *         type: string
 */
router.patch(
  '/api/users/update_near_wallet',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    near_wallet: 'string',
  }),
  sanitaze.preventxss(),
  users.updateUserNearWallet(),
)

/**
 * @swagger
 * /api/users/paypal/check:
 *  post:
 *   tags: [Users]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        paypal_email:
 *         type: string
 *         example: darshana@test.com
 */
router.post(
  '/api/users/paypal/check',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    paypal_email: 'required|email',
  }),
  sanitaze.preventxss(),
  users.checkPaypalEmail(),
)

/**
 * @swagger
 * /api/users/paypal/email:
 *  get:
 *   tags: [Users]
 *   responses:
 *    200:
 */
router.get(
  '/api/users/paypal/email',
  authorize(process.env.WHIZ_API_ROLE_USER),
  users.getPaypalEmail(),
)

/**
 * @swagger
 * /api/users/paypal/email:
 *  post:
 *   tags: [Users]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        paypal_email:
 *         type: object
 *         example: darshana@test.com
 *        paypal_url:
 *         type: object
 *         example: paypal.me/darshana
 */
router.post(
  '/api/users/paypal/email',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    paypal_email: 'email',
    paypal_url: 'string',
  }),
  sanitaze.preventxss(),
  users.updatePaypalEmail(),
)

/**
 * @swagger
 * /api/users/paypal/unlink:
 *  get:
 *   tags: [Users]
 *   responses:
 *    200:
 */
router.get(
  '/api/users/paypal/unlink',
  authorize(process.env.WHIZ_API_ROLE_USER),
  users.unlinkPaypal(),
)

/**
 * @swagger
 * /api/users/betalent:
 *  patch:
 *   tags: [Users]
 *   summary: setter to talent=true
 */
router.patch(
  '/api/users/betalent',
  authorize(process.env.WHIZ_API_ROLE_USER),
  users.setTalent(),
)

/**
 * @swagger
 * /api/users/workplace_id/{workplace_id}:
 *  get:
 *   tags: [Users]
 *   responses:
 *    200:
 */
router.get('/api/users/workplace_id/:workplace_id', users.getByWorkplace())

/**
 * @swagger
 * /api/users/by_skills:
 *  get:
 *   tags: [Users]
 *   responses:
 *    200:
 */
router.get(
  '/api/users/by_skills',
  authorize(process.env.WHIZ_API_ROLE_USER),
  sanitaze.preventxss(),
  users.getBySkills(),
)

/**
 * @swagger
 * /api/users/forum/recovery/email:
 *  post:
 *   tags: [Users]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        subtitle:
 *         type: string
 *        summary:
 *         type: string
 *        profile_picture_url:
 *         type: string
 *        profile_banner_url:
 *         type: string
 */
router.post(
  '/api/users/forum/recovery/email',
  authorize(process.env.WHIZ_API_ROLE_ADMIN),
  validate({
    email: 'required|email',
  }),
  sanitaze.preventxss(),
  users.sendAdminForumPasswordRecoveryToken(),
)

//----------------------------------TALENTS---------------------------------------------

/**
 * @swagger
 * tags:
 *  name: Talents
 */

/**
 * @swagger
 * /api/talents:
 *  get:
 *   tags: [Talents]
 *   responses:
 *    200:
 *      description: Get all talents
 */
router.get('/api/talents', users.getTalents())

/**
 * @swagger
 * /api/talents/byuserskill/:skill:
 *  get:
 *   tags: [Talents]
 *   responses:
 *    200:
 */
router.get('/api/talents/byuserskill/:skill', users.getByUserSkill())

/**
 * @swagger
 * /api/users/talents:
 *  get:
 *   tags: [Talents]
 *   responses:
 *    200:
 */
router.get(
  '/api/users/talents',
  authorize(process.env.WHIZ_API_ROLE_USER),
  users.getTalents(),
)

/**
 * @swagger
 * /api/users/favorites/{type}:
 *  get:
 *   tags: [Talents]
 *   responses:
 *    200:
 */
router.get(
  '/api/users/favorites',
  authorize(process.env.WHIZ_API_ROLE_USER),
  users.getFavorites(),
)

/**
 * @swagger
 * /api/users/favorites/toggle/{user_uuid}:
 *  post:
 *   tags: [Talents]
 *   responses:
 *    200:
 */
router.post(
  '/api/users/favorites/toggle/:user_uuid',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    type: 'string|required',
  }),
  users.toggleFavorite(),
)

/**
 * @swagger
 * /api/users/id/{id}:
 *  get:
 *   tags: [Talents]
 *   responses:
 *    200:
 */
router.get('/api/users/id/:id', users.getById())

/**
 * @swagger
 * /api/users/uuid/{user_uuid}:
 *  get:
 *   tags: [Talents]
 *   responses:
 *    200:
 */
router.get('/api/users/uuid/:user_uuid', users.getByUUID())

/**
 * @swagger
 * /api/users/token/status:
 *  get:
 *   tags: [Talents]
 *   responses:
 *    200:
 */
router.get(
  '/api/users/token/status',
  authorize(process.env.WHIZ_API_ROLE_USER),
  users.status(),
)

/**
 * @swagger
 * /api/users/percentage_of_profile/{lang}:
 *  get:
 *   tags: [Talents]
 *   responses:
 *    200:
 */
router.get(
  '/api/users/percentage_of_profile/:lang',
  users.percentageOfProfile(),
)

//----------------------------------ADMIN---------------------------------------------

/**
 * @swagger
 * /api/admin/login:
 *  post:
 *   tags: [Admin]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        email:
 *         type: string
 *         example: darshana@test.com
 *        password:
 *         type: string
 *         example: 123123
 */
router.post(
  '/api/admin/login',
  validate({
    email: 'required|email',
    password: 'required|string',
  }),
  sanitaze.preventxss(),
  users.login({ useAdminRole: true, useForumAdminRole: false }),
)

/**
 * @swagger
 * /api/admin/token/status:
 *  get:
 *   tags: [Admin]
 *   responses:
 *    200:
 *     description: description
 */
router.get(
  '/api/admin/token/status',
  authorize(process.env.WHIZ_API_ROLE_ADMIN),
  users.status(),
)

/**
 * @swagger
 * /api/forum/token/status:
 *  get:
 *   tags: [Admin]
 *   responses:
 *    200:
 *     description: description
 */
router.get(
  '/api/forum/token/status',
  authorize(process.env.WHIZ_API_ROLE_FORUM_ADMIN),
  users.status(),
)

//----------------------------------USER_SKILLS---------------------------------------------

/**
 * @swagger
 * tags:
 *  name: User_skills
 */
/**
 * @swagger
 * /api/delete:
 *  delete:
 *   tags: [User_skills]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: number
 */
router.delete(
  '/api/delete',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    id: 'required|integer',
  }),
  sanitaze.preventxss(),
  user_skills.delete(),
)

/**
 * @swagger
 * /api/user_skills:
 *  get:
 *   tags: [User_skills]
 *   responses:
 *    200:
 */
router.get(
  '/api/user_skills',
  authorize(process.env.WHIZ_API_ROLE_USER),
  user_skills.datatable(),
)

/**
 * @swagger
 * /api/user_skills:
 *  post:
 *   tags: [User_skills]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        name:
 *         type: string
 */
router.post(
  '/api/user_skills',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    name: 'required|string',
  }),
  sanitaze.preventxss(),
  user_skills.create(),
)

/**
 * @swagger
 * /api/user_skills:
 *  delete:
 *   tags: [User_skills]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: number
 */
router.delete(
  '/api/user_skills',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    id: 'required|integer',
  }),
  sanitaze.preventxss(),
  user_skills.delete(),
)

/**
 * @swagger
 * /api/user_skills/all:
 *  delete:
 *   tags: [User_skills]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: number
 */
router.delete(
  '/api/user_skills/all',
  authorize(process.env.WHIZ_API_ROLE_USER),
  sanitaze.preventxss(),
  user_skills.deleteAllByUser(),
)

//----------------------------------SKILLS---------------------------------------------

/**
 * @swagger
 * tags:
 *  name: Skills
 */
/**
 * @swagger
 * /api/skills:
 *  get:
 *   tags: [Skills]
 *   responses:
 *    200:
 */
router.get('/api/skills', skills.datatable())

/**
 * @swagger
 * /api/skills:
 *  post:
 *   tags: [Skills]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        name:
 *         type: string
 */
router.post(
  '/api/skills',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    name: 'required|string',
  }),
  sanitaze.preventxss(),
  skills.create(),
)

/**
 * @swagger
 * /api/skills:
 *  put:
 *   tags: [Skills]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: string
 *        name:
 *         type: string
 */
router.put(
  '/api/skills',
  validate({
    id: 'required|numeric',
    name: 'required|string',
  }),
  sanitaze.preventxss(),
  skills.update(),
)

/**
 * @swagger
 * /api/skills:
 *  delete:
 *   tags: [Skills]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: string
 */
router.delete(
  '/api/skills',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    id: 'required|integer',
  }),
  sanitaze.preventxss(),
  skills.delete(),
)

//----------------------------------USER_FOLLOWERS---------------------------------------------

/**
 * @swagger
 * tags:
 *  name: User_Followers
 */
/**
 * @swagger
 * /api/user_followers:
 *  get:
 *   tags: [User_Followers]
 *   responses:
 *    200:
 */
router.get(
  '/api/user_followers',
  authorize(process.env.WHIZ_API_ROLE_USER),
  user_followers.datatable(),
)

/**
 * @swagger
 * /api/user_followers:
 *  post:
 *   tags: [User_Followers]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        name:
 *         type: string
 */
router.post(
  '/api/user_followers',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    name: 'required|string',
  }),
  sanitaze.preventxss(),
  user_followers.create(),
)

/**
 * @swagger
 * /api/user_followers:
 *  delete:
 *   tags: [User_Followers]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: number
 */
router.delete(
  '/api/user_followers',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    id: 'required|integer',
  }),
  sanitaze.preventxss(),
  user_followers.delete(),
)

//----------------------------------BUSINESS_EMAILS---------------------------------------------

/**
 * @swagger
 * tags:
 *  name: Business_Emails
 */

/**
 * @swagger
 * /api/business_emails:
 *  get:
 *   tags: [Business_Emails]
 *   responses:
 *    200:
 */
router.get(
  '/api/business_emails',
  authorize(process.env.WHIZ_API_ROLE_USER),
  business_emails.datatable(),
)

/**
 * @swagger
 * /api/business_emails:
 *  post:
 *   tags: [Business_Emails]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        business_id:
 *         type: number
 *        email:
 *         type: string
 *         example: darshana@test.com
 */
router.post(
  '/api/business_emails',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    business_id: 'required|integer',
    email: 'required|email',
  }),
  sanitaze.preventxss(),
  business_emails.create(),
)

/**
 * @swagger
 * /api/business_emails:
 *  delete:
 *   tags: [Business_Emails]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: number
 */
router.delete(
  '/api/business_emails',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    id: 'required|integer',
  }),
  sanitaze.preventxss(),
  business_emails.delete(),
)

//----------------------------------BUSINESS---------------------------------------------

/**
 * @swagger
 * tags:
 *  name: Business
 */
/**
 * @swagger
 * /api/business:
 *  get:
 *   tags: [Business]
 *   responses:
 *    200:
 */
router.get(
  '/api/business',
  authorize(process.env.WHIZ_API_ROLE_USER),
  sanitaze.preventxss(),
  business.getAllByUUID(),
)

/**
 * @swagger
 * /api/business:
 *  post:
 *   tags: [Business]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        user_workplace_id:
 *         type: number
 *        profile_picture_url:
 *         type: string
 *        profile_banner_url:
 *         type: string
 */
router.post(
  '/api/business',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    user_workplace_id: 'required|integer',
    profile_picture_url: 'string',
    profile_banner_url: 'string',
  }),
  sanitaze.preventxss(),
  business.create(),
)

/**
 * @swagger
 * /api/business:
 *  patch:
 *   tags: [Business]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: number
 *        profile_picture_url:
 *         type: string
 *        profile_banner_url:
 *         type: string
 */
router.patch(
  '/api/business',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    id: 'required|integer',
    profile_picture_url: 'string',
    profile_banner_url: 'string',
  }),
  sanitaze.preventxss(),
  business.patch(),
)

/**
 * @swagger
 * /api/business:
 *  delete:
 *   tags: [Business]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: number
 */
router.delete(
  '/api/business',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    user_workplace_id: 'integer',
  }),
  sanitaze.preventxss(),
  business.delete(),
)

//----------------------------------PROJECT_SKILLS---------------------------------------------

/**
 * @swagger
 * tags:
 *  name: Project_Skills
 */
/**
 * @swagger
 * /api/project_skills:
 *  get:
 *   tags: [Project_Skills]
 *   responses:
 *    200:
 */
router.get('/api/project_skills', project_skills.datatable())

//----------------------------------PROJECT_STATUSES---------------------------------------------

/**
 * @swagger
 * tags:
 *  name: Project_statuses
 */
/**
 * @swagger
 * /api/project_statuses:
 *  get:
 *   tags: [Project_statuses]
 *   responses:
 *    200:
 */
router.get('/api/project_statuses', project_statuses.datatable())

/**
 * @swagger
 * /api/project_statuses:
 *  post:
 *   tags: [Project_statuses]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        name:
 *         type: string
 *        visible:
 *         type: boolean
 */
router.post(
  '/api/project_statuses',
  authorize(process.env.WHIZ_API_ROLE_ADMIN),
  validate({
    name: 'required|string',
    visible: 'required|boolean',
  }),
  sanitaze.preventxss(),
  project_statuses.create(),
)

/**
 * @swagger
 * /api/project_statuses:
 *  patch:
 *   tags: [Project_statuses]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: string
 *        name:
 *         type: string
 *        visible:
 *         type: boolean
 */
router.patch(
  '/api/project_statuses',
  authorize(process.env.WHIZ_API_ROLE_ADMIN),
  validate({
    id: 'required|integer',
    name: 'string',
    visible: 'boolean',
  }),
  sanitaze.preventxss(),
  project_statuses.patch(),
)

/**
 * @swagger
 * /api/project_statuses:
 *  delete:
 *   tags: [Project_statuses]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: string
 */
router.delete(
  '/api/project_statuses',
  authorize(process.env.WHIZ_API_ROLE_ADMIN),
  validate({
    id: 'required|integer',
  }),
  sanitaze.preventxss(),
  project_statuses.delete(),
)

//----------------------------------JOBS---------------------------------------------

/**
 * tags:
 *  name: Jobs
 */
/**
 * @swagger
 * /api/jobs/profile/{user_uuid}:
 *  get:
 *   tags: [Jobs]
 *   responses:
 *    200:
 */
router.get('/api/jobs/profile/:user_uuid', jobs.getByUserUUID())

/**
 * @swagger
 * /api/jobs/{id}:
 *  get:
 *   tags: [Jobs]
 *   responses:
 *    200:
 */
router.get('/api/jobs/:id', jobs.getById())

/**
 * @swagger
 * /api/jobs/end:
 *  post:
 *   tags: [Jobs]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: number
 *        lang:
 *         type: string
 *         example: EN
 */
router.post(
  '/api/jobs/end',
  validate({
    id: 'required|string',
    lang: 'required|string',
  }),
  authorize(process.env.WHIZ_API_ROLE_USER),
  jobs.end(),
)

/**
 * @swagger
 * /api/jobs/byjobskill/{skill}:
 *  get:
 *   tags: [Jobs]
 *   responses:
 *    200:
 */
router.get('/api/jobs/byjobskill/:skill', jobs.getByJobSkill())

/**
 * @swagger
 * /api/jobs:
 *  get:
 *   tags: [Jobs]
 *   responses:
 *    200:
 */
router.get('/api/jobs', jobs.datatable())

/**
 * @swagger
 * /api/jobs:
 *  post:
 *   tags: [Jobs]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        business_id:
 *         type: number
 *        name:
 *         type: string
 *        description:
 *         type: string
 *        functions:
 *         type: string
 *        status:
 *         type: boolean
 *        contract_type:
 *         type: string
 *        summary:
 *         type: string
 *        salary:
 *         type: string
 *         example: 1000
 *        contract_time:
 *         type: string
 *        work_modality_id:
 *         type: number
 *        country_id:
 *         type: number
 *        lang:
 *         type: string
 *         example: EN
 *        hourly_wage:
 *         type: number
 *         example: 30
 *         format: double
 *        category:
 *         type: string
 *        is_visible:
 *         type: boolean
 */
router.post(
  '/api/jobs',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    business_id: 'integer',
    name: 'string',
    description: 'string',
    functions: 'string',
    status: 'boolean',
    contract_type: 'string',
    summary: 'string',
    salary: 'string',

    contract_time: 'string',

    is_visible: 'boolean',
    work_modality_id: 'required|number',
    country_id: 'required|number',
    lang: 'required|string',
    min_salary: 'string',
    max_salary: 'string',
    hourly_wage: 'integer',
    category: 'string',
  }),
  jobs.create(),
)

/**
 * @swagger
 * /api/jobs:
 *  patch:
 *   tags: [Jobs]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: string
 *        business_id:
 *         type: string
 *        recruiter_id:
 *         type: string
 *        name:
 *         type: string
 *        description:
 *         type: string
 *        status:
 *         type: number
 *        contract_type:
 *         type: string
 *        summary:
 *         type: string
 *        functions:
 *         type: string
 *        requirements:
 *         type: string
 *        salary:
 *         type: number
 *         format: double
 *         example: 1000
 *        image_url:
 *         type: string
 *        end_date:
 *         type: date
 *         pattern: /([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/
 *         example: "2019-05-17"
 *        work_modality_id:
 *         type: string
 *        country_id:
 *         type: string
 *        hourly_wage:
 *         type: number
 *         example: 30
 *         format: double
 *        category:
 *         type: string
 */
router.patch(
  '/api/jobs',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    id: 'required|integer',
    business_id: 'integer',
    recruiter_id: 'integer',
    name: 'string',
    description: 'string',
    status: 'boolean',
    contract_type: 'string',
    summary: 'string',
    functions: 'string',
    requirements: 'string',
    salary: 'string',
    image_url: 'string',
    end_date: 'string',
    work_modality_id: 'required|number',
    country_id: 'required|number',
    min_salary: 'string',
    max_salary: 'string',
    hourly_wage: 'integer',
    category: 'string',
  }),
  jobs.patch(),
)

/**
 * @swagger
 * /api/jobs:
 *  delete:
 *   tags: [Jobs]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: integer
 *        business_id:
 *         type: integer
 *        recruiter_id:
 *         type: integer
 */
router.delete(
  '/api/jobs',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    id: 'required|integer',
    business_id: 'integer',
    recruiter_id: 'integer',
  }),
  sanitaze.preventxss(),
  jobs.delete(),
)

//----------------------------------JOB_SKILLS---------------------------------------------

/**
 * @swagger
 *  tags:
 *   name: Job_Skills
 */

/**
 * @swagger
 * /api/job_skills:
 *  get:
 *   tags: [Job_Skills]
 *   responses:
 *    200:
 */
router.get('/api/job_skills', job_skills.datatable())

/**
 * @swagger
 * /api/job_skills/autocomplete:
 *  get:
 *   tags: [Job_Skills]
 *   responses:
 *    200:
 */
router.get('/api/job_skills/autocomplete', job_skills.getAutocomplete())

//----------------------------------JOB_STATUSES---------------------------------------------

/**
 * @swagger
 *  tags:
 *   name: Job_Statuses
 */

/**
 * @swagger
 * /api/job_statuses:
 *  get:
 *   tags: [Job_Statuses]
 *   responses:
 *    200:
 */
router.get('/api/job_statuses', job_statuses.datatable())

/**
 * @swagger
 * /api/job_statuses:
 *  post:
 *   tags: [Job_Statuses]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        name:
 *         type: string
 *        visible:
 *         type: boolean
 */
router.post(
  '/api/job_statuses',
  validate({
    name: 'required|string',
    visible: 'required|boolean',
  }),
  sanitaze.preventxss(),
  job_statuses.create(),
)

/**
 * @swagger
 * /api/job_statuses:
 *  patch:
 *   tags: [Job_Statuses]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: number
 *        name:
 *         type: string
 *        visible:
 *         type: boolean
 */
router.patch(
  '/api/job_statuses',
  authorize(process.env.WHIZ_API_ROLE_ADMIN),
  validate({
    id: 'required|integer',
    name: 'string',
    visible: 'boolean',
  }),
  sanitaze.preventxss(),
  job_statuses.patch(),
)

/**
 * @swagger
 * /api/job_statuses:
 *  delete:
 *   tags: [Job_Statuses]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: number
 */
router.delete(
  '/api/job_statuses',
  authorize(process.env.WHIZ_API_ROLE_ADMIN),
  validate({
    id: 'required|integer',
  }),
  sanitaze.preventxss(),
  job_statuses.delete(),
)

//----------------------------------TOPICS---------------------------------------------

/**
 * @swagger
 * tags:
 *  name: Topics
 */
/**
 * @swagger
 * /api/topics:
 *  get:
 *   tags: [Topics]
 *   responses:
 *    200
 */
router.get('/api/topics', topics.datatable())

/**
 * @swagger
 * /api/topics:
 *  post:
 *   tags: [Topics]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        name:
 *         type: string
 */
router.post(
  '/api/topics',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    name: 'required|string',
  }),
  sanitaze.preventxss(),
  topics.create(),
)

/**
 * @swagger
 * /api/topics:
 *  delete:
 *   tags: [Topics]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: number
 */
router.delete(
  '/api/topics',
  authorize(process.env.WHIZ_API_ROLE_ADMIN),
  validate({
    id: 'required|integer',
    name: 'string',
  }),
  sanitaze.preventxss(),
  topics.delete(),
)

//----------------------------------PROJECT_APPLICATION_FILES---------------------------------------------

/**
 * @swagger
 * tags:
 *  name: Project_Application_Files
 */
/**
 * @swagger
 * /api/project_application_files:
 *  get:
 *   tags: [Project_Application_Files]
 *   responses:
 *    200:
 */
router.get(
  '/api/project_application_files',
  authorize(process.env.WHIZ_API_ROLE_USER),
  project_application_files.datatable(),
)

/**
 * @swagger
 * /api/project_application_files:
 *  post:
 *   tags: [Project_Application_Files]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        project_id:
 *         type: number
 *        file_url:
 *         type: string
 *        file_name:
 *         type: string
 *        file_size:
 *         type: string
 *         example: 2300
 */
router.post(
  '/api/project_application_files',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    project_id: 'required|integer',
    file_url: 'string',
    file_name: 'string',
    file_size: 'string',
  }),
  sanitaze.preventxss(),
  project_application_files.create(),
)

/**
 * @swagger
 * /api/project_application_files:
 *  patch:
 *   tags: [Project_Application_Files]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        project_id:
 *         type: number
 *        file_url:
 *         type: string
 *        file_name:
 *         type: string
 *        file_size:
 *         type: string
 *         example: 2300
 */
router.patch(
  '/api/project_application_files',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    id: 'required|integer',
    project_id: 'required|integer',
    file_url: 'string',
    file_name: 'string',
    file_size: 'string',
  }),
  sanitaze.preventxss(),
  project_application_files.patch(),
)

/**
 * @swagger
 * /api/project_application_files:
 *  delete:
 *   tags: [Project_Application_Files]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: number
 */
router.delete(
  '/api/project_application_files',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    id: 'required|integer',
  }),
  sanitaze.preventxss(),
  project_application_files.delete(),
)

//----------------------------------NEWS---------------------------------------------

/**
 * @swagger
 * tags:
 *  name: News
 */
/**
 * @swagger
 * /api/news:
 *  get:
 *   tags: [News]
 *   responses:
 *    200:
 */
router.get('/api/news', news.datatable())

/**
 * @swagger
 * /api/news:
 *  post:
 *   tags: [News]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        title:
 *         type: string
 *        description:
 *         type: string
 *        body:
 *         type: string
 *        image_url:
 *         type: string
 *        white_image:
 *         type: boolean
 */
router.post(
  '/api/news',
  authorize(process.env.WHIZ_API_ROLE_ADMIN),
  validate({
    title: 'string',
    description: 'string',
    body: 'string',
    image_url: 'string',
    white_image: 'boolean',
  }),
  sanitaze.preventxss(),
  news.create(),
)

/**
 * @swagger
 * /api/news:
 *  patch:
 *   tags: [News]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: number
 *        title:
 *         type: string
 *        description:
 *         type: string
 *        body:
 *         type: string
 *        image_url:
 *         type: string
 *        white_image:
 *         type: boolean
 */
router.patch(
  '/api/news',
  authorize(process.env.WHIZ_API_ROLE_ADMIN),
  validate({
    id: 'required|integer',
    title: 'string',
    description: 'string',
    body: 'string',
    image_url: 'string',
    white_image: 'boolean',
  }),
  sanitaze.preventxss(),
  news.patch(),
)

/**
 * @swagger
 * /api/news:
 *  delete:
 *   tags: [News]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: number
 */
router.delete(
  '/api/news',
  authorize(process.env.WHIZ_API_ROLE_ADMIN),
  validate({
    id: 'required|integer',
  }),
  sanitaze.preventxss(),
  news.delete(),
)

//----------------------------------COMMUNITIES---------------------------------------------

/**
 * @swagger
 * tags:
 *  name: Communities
 */
/**
 * @swagger
 * /api/communities:
 *  get:
 *   tags: [Communities]
 *   responses:
 *    200:
 */
router.get('/api/communities', communities.datatable())

/**
 * @swagger
 * /api/communities:
 *  post:
 *   tags: [Communities]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        title:
 *         type: string
 *        description:
 *         type: string
 *        image_url:
 *         type: string
 */
router.post(
  '/api/communities',
  authorize(process.env.WHIZ_API_ROLE_ADMIN),
  validate({
    title: 'string',
    description: 'string',
    image_url: 'string',
  }),
  sanitaze.preventxss(),
  communities.create(),
)

/**
 * @swagger
 * /api/communities:
 *  patch:
 *   tags: [Communities]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: number
 *        title:
 *         type: string
 *        description:
 *         type: string
 *        image_url:
 *         type: string
 */
router.patch(
  '/api/communities',
  authorize(process.env.WHIZ_API_ROLE_ADMIN),
  validate({
    id: 'required|integer',
    title: 'string',
    description: 'string',
    image_url: 'string',
  }),
  sanitaze.preventxss(),
  communities.patch(),
)

/**
 * @swagger
 * /api/communities:
 *  delete:
 *   tags: [Communities]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: number
 */
router.delete(
  '/api/communities',
  authorize(process.env.WHIZ_API_ROLE_ADMIN),
  validate({
    id: 'required|integer',
  }),
  sanitaze.preventxss(),
  communities.delete(),
)

//----------------------------------LEADS---------------------------------------------

/**
 * @swagger
 * tags:
 *  name: Leads
 */
/**
 * @swagger
 * /api/leads:
 *  get:
 *   tags: [Leads]
 *   responses:
 *    200:
 */
router.get('/api/leads', leads.datatable())

/**
 * @swagger
 * /api/leads:
 *  post:
 *   tags: [Leads]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        title:
 *         type: string
 *        query_type:
 *         type: string
 *        description:
 *         type: string
 *        email:
 *         type: string
 *         example: darshana@test.com
 */
router.post(
  '/api/leads',
  validate({
    title: 'string',
    query_type: 'string',
    description: 'string',
    email: 'string',
  }),
  sanitaze.preventxss(),
  leads.create(),
)

/**
 * @swagger
 * /api/leads:
 *  patch:
 *   tags: [Leads]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: number
 *        title:
 *         type: string
 *        query_type:
 *         type: string
 *        description:
 *         type: string
 *        email:
 *         type: string
 *         example: darshana@test.com
 */
router.patch(
  '/api/leads',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    id: 'required|integer',
    title: 'string',
    query_type: 'string',
    description: 'string',
    email: 'string',
  }),
  sanitaze.preventxss(),
  leads.patch(),
)

/**
 * @swagger
 * /api/leads:
 *  delete:
 *   tags: [Leads]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: number
 */
router.delete(
  '/api/leads',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    id: 'required|integer',
  }),
  sanitaze.preventxss(),
  leads.delete(),
)

//----------------------------------NOTIFICATIONS---------------------------------------------

/**
 * @swagger
 * tags:
 *  name: Notifications
 */
/**
 * @swagger
 * /api/notifications:
 *  get:
 *   tags: [Notifications]
 *   responses:
 *    200:
 */
router.get(
  '/api/notifications',
  authorize(process.env.WHIZ_API_ROLE_USER),
  notifications.datatable(),
)

/**
 * @swagger
 * /api/notifications:
 *  post:
 *   tags: [Notifications]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        message:
 *         type: string
 *        query_type:
 *         type: boolean
 */
router.post(
  '/api/notifications',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    message: 'string',
    query_type: 'boolean',
  }),
  sanitaze.preventxss(),
  notifications.create(),
)

/**
 * @swagger
 * /api/notifications/example/new_message:
 *  post:
 *   tags: [Notifications]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        to_user_uuid:
 *         type: string
 */
router.post(
  '/api/notification/example/new_message',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    to_user_uuid: 'string',
  }),
  sanitaze.preventxss(),
  notifications.createNotificatonNewMessageExample(),
)

/**
 * @swagger
 * /api/notifications:
 *  patch:
 *   tags: [Notifications]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: number
 *        message:
 *         type: string
 *        query_type:
 *         type: boolean
 */
router.patch(
  '/api/notifications',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    id: 'required|integer',
    message: 'string',
    query_type: 'boolean',
  }),
  sanitaze.preventxss(),
  notifications.patch(),
)

/**
 * @swagger
 * /api/notification/read:
 *  get:
 *   tags: [Notifications]
 *   responses:
 *    200:
 */
router.get(
  '/api/notification/read',
  authorize(process.env.WHIZ_API_ROLE_USER),
  sanitaze.preventxss(),
  notifications.read(),
)

/**
 * @swagger
 * /api/notification/clicked/{id}:
 *  get:
 *   tags: [Notifications]
 *   responses:
 *    200:
 */
router.get(
  '/api/notification/clicked/:id',
  authorize(process.env.WHIZ_API_ROLE_USER),
  sanitaze.preventxss(),
  notifications.clicked(),
)

/**
 * @swagger
 * /api/notifications:
 *  delete:
 *   tags: [Notifications]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: number
 */
router.delete(
  '/api/notifications',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    id: 'required|integer',
  }),
  sanitaze.preventxss(),
  notifications.delete(),
)

//----------------------------------CHAT---------------------------------------------

/**
 * @swagger
 * tags:
 *  name: Chat
 */
/**
 * @swagger
 * /api/chats:
 *  get:
 *   tags: [Chat]
 *   responses:
 *    200:
 */
router.get(
  '/api/chats',
  authorize(process.env.WHIZ_API_ROLE_USER),
  chat.getChats(),
)

/**
 * @swagger
 * /api/chats/{user_uuid}:
 *  get:
 *   tags: [Chat]
 *   responses:
 *    200:
 */
router.get(
  '/api/chat/:user_uuid',
  authorize(process.env.WHIZ_API_ROLE_USER),
  chat.getChatWithUser(),
)

/**
 * @swagger
 * /api/chats/get_unread_messages{user_uuid}:
 *  get:
 *   tags: [Chat]
 *   responses:
 *    200:
 */
router.get(
  '/api/chats/get_unread_messages/:user_uuid',
  authorize(process.env.WHIZ_API_ROLE_USER),
  chat.getUnreadMessages(),
)

/**
 * @swagger
 * /api/chats/total_no_read/{user_uuid}:
 *  get:
 *   tags: [Chat]
 *   responses:
 *    200:
 */
router.get(
  '/api/chats/total_no_read/:user_uuid',
  authorize(process.env.WHIZ_API_ROLE_USER),
  chat.getTotalNoReadChats(),
)

/**
 * @swagger
 * /api/chats/example/new_message:
 *  post:
 *   tags: [Chat]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        to_user_uuid:
 *         type: string
 */
router.post(
  '/api/chats/example/new_message',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    to_user_uuid: 'string',
  }),
  sanitaze.preventxss(),
  chat.createnNewMessageExample(),
)

//----------------------------------TIMER---------------------------------------------

/**
 * @swagger
 * tags:
 *  name: Timer
 */
/**
 * @swagger
 * /api/timer:
 *  get:
 *   tags: [Timer]
 *   responses:
 *    200:
 */
router.get(
  '/api/timer',
  authorize(process.env.WHIZ_API_ROLE_USER),
  timer.getTimer(),
)

/**
 * @swagger
 * /api/timers:
 *  get:
 *   tags: [Timer]
 *   responses:
 *    200:
 */
router.get(
  '/api/timers',
  authorize(process.env.WHIZ_API_ROLE_USER),
  timer.getTimers(),
)

/**
 * @swagger
 * /api/timer/start:
 *  post:
 *   tags: [Timer]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        project_id:
 *         type: string
 */
router.post(
  '/api/timer/start',
  authorize(process.env.WHIZ_API_ROLE_USER),
  timer.start(),
)

/**
 * @swagger
 * /api/timer/stop:
 *  post:
 *   tags: [Timer]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: string
 */
router.post(
  '/api/timer/stop',
  authorize(process.env.WHIZ_API_ROLE_USER),
  timer.stop(),
)

/**
 * @swagger
 * /api/timer/pause:
 *  post:
 *   tags: [Timer]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: string
 */
router.post(
  '/api/timer/pause',
  authorize(process.env.WHIZ_API_ROLE_USER),
  timer.pause(),
)

/**
 * @swagger
 * /api/timer/resume:
 *  post:
 *   tags: [Timer]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: string
 */
router.post(
  '/api/timer/resume',
  authorize(process.env.WHIZ_API_ROLE_USER),
  timer.resume(),
)

//----------------------------------WORK_MODALITY---------------------------------------------
/**
 * @swagger
 * tags:
 *  name: Work_Modality
 */
/**
 * @swagger
 * /api/work_modalities:
 *  get:
 *   tags: [Work_Modality]
 *   responses:
 *    200:
 */
router.get('/api/work_modalities', work_modalities.datatable())

/**
 * @swagger
 * /api/work_modalities:
 *  post:
 *   tags: [Work_Modality]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        name:
 *         type: string
 *        name_en:
 *         type: string
 */
router.post(
  '/api/work_modalities',
  validate({
    name: 'required|string',
    name_en: 'required|string',
  }),
  authorize(process.env.WHIZ_API_ROLE_USER),
  work_modalities.create(),
)

/**
 * @swagger
 * /api/work_modalities/{id}:
 *  delete:
 *   tags: [Work_Modality]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 */
router.delete(
  '/api/work_modalities/:id',
  authorize(process.env.WHIZ_API_ROLE_USER),
  work_modalities.delete(),
)

//----------------------------------IMAGE---------------------------------------------

/**
 * @swagger
 * tags:
 *  name: Image
 */
/**
 * @swagger
 * /api/image:
 *  post:
 *   tags: [Image]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        file:
 *         type: file
 */
router.post('/api/image', authorize(), upload.single('image'), images.upload())

//----------------------------------FILE---------------------------------------------

/**
 * @swagger
 * tags:
 *  name: File
 */
/**
 * @swagger
 * /api/file:
 *  post:
 *   tags: [File]
 *   summary: Login user
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        file:
 *         type: file
 */
router.post('/api/file', files_s3.upload())

/**
 * @swagger
 * /api/file/{file_id}:
 *  get:
 *   tags: [File]
 *   parameters:
 *    file_id
 *   responses:
 *    200:
 *      description: list api
 */
router.get('/api/file/:file_id', files_s3.download())

//----------------------------------UBIGEO---------------------------------------------

/**
 * @swagger
 * tags:
 *  name: Ubigeo
 */
/**
 * @swagger
 * /api/countries:
 *  get:
 *   tags: [Ubigeo]
 *   responses:
 *    200:
 */
router.get('/api/countries', ubigeo.getCountries())

/**
 * @swagger
 * /api/cities/{country_id}:
 *  get:
 *   tags: [Ubigeo]
 *   responses:
 *    200:
 */
router.get('/api/cities/:country_id', ubigeo.getCities())

/**
 * @swagger
 * /api/citiesAll:
 *  get:
 *   tags: [Ubigeo]
 *   responses:
 *    200:
 */
router.get('/api/citiesAll', ubigeo.getCitiesAll())

//----------------------------------PLACES_OF_INTEREST---------------------------------------------

/**
 * @swagger
 * tags:
 *  name: Places_of_interest
 */
/**
 * @swagger
 * /api/places_of_interest:
 *  post:
 *   tags: [Places_of_interest]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        name:
 *         type: string
 */
router.post(
  '/api/places_of_interest',
  validate({
    name: 'required|name',
  }),
  places_of_interest.create(),
)

/**
 * @swagger
 * /api/places_of_interest:
 *  patch:
 *   tags: [Places_of_interest]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: number
 *        name:
 *         type: string
 */
router.patch(
  '/api/places_of_interest',
  validate({
    id: 'required|integer',
    name: 'required|string',
  }),
  places_of_interest.update(),
)

/**
 * @swagger
 * /api/places_of_interest:
 *  get:
 *   tags: [Places_of_interest]
 *   responses:
 *    200:
 */
router.get('/api/places_of_interest', places_of_interest.datatable())

/**
 * @swagger
 * /api/places_of_interest:
 *  delete:
 *   tags: [Places_of_interest]
 *   responses:
 *    200:
 */
router.delete('/api/places_of_interest', places_of_interest.delete())

/**
 * @swagger
 * /api/user_places_of_interest:
 *  post:
 *   tags: [Places_of_interest]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        name:
 *         type: string
 */
router.post(
  '/api/user_places_of_interest',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    name: 'required|string',
  }),
  user_places_of_interest.create(),
)

/**
 * @swagger
 * /api/user_places_of_interest:
 *  get:
 *   tags: [Places_of_interest]
 *   responses:
 *    200:
 */
router.get(
  '/api/user_places_of_interest',
  authorize(process.env.WHIZ_API_ROLE_USER),
  user_places_of_interest.datatable(),
)

/**
 * @swagger
 * /api/user_places_of_interest:
 *  delete:
 *   tags: [Places_of_interest]
 *   responses:
 *    200:
 */
router.delete(
  '/api/user_places_of_interest',
  authorize(process.env.WHIZ_API_ROLE_USER),
  user_places_of_interest.delete(),
)

/**
 * @swagger
 * /api/user_places_of_interest/delete_by_user:
 *  delete:
 *   tags: [Places_of_interest]
 *   responses:
 *    200:
 */
router.delete(
  '/api/user_places_of_interest/delete_by_user',
  user_places_of_interest.deleteAllByUser(),
)

//----------------------------------API---------------------------------------------

/**
 * @swagger
 * tags:
 *  name: Api
 */
/**
 * @swagger
 * /api/info:
 *  get:
 *   tags: [Api]
 *   responses:
 *    200:
 *      description: Info api
 */
router.get('/api/info', api.getApiInfo())

/**
 * @swagger
 * /api/errors:
 *  get:
 *   tags: [Api]
 *   responses:
 *    200:
 *      description: Errrors api
 */
router.get('/api/errors', authorize(), api.getErrors())

/**
 * @swagger
 * /api/logs:
 *  get:
 *   tags: [Api]
 *   responses:
 *    200:
 *      description: Logs api
 */
router.get('/api/logs', authorize(), api.getLogs())

/**
 * @swagger
 * /api/list:
 *  get:
 *   tags: [Api]
 *   responses:
 *    200:
 *      description: list api
 */
router.get('/api/logs/list', authorize(), api.getLogsList())

//----------------------------------OTHERS---------------------------------------------

/**
 * @swagger
 * tags:
 *  name: Others
 */
/**
 * @swagger
 * /api/temporalUpdateUsersPProfile:
 *  post:
 *   tags: [Others]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 */
router.post('/api/temporalUpdateUsersPProfile', users.updatePercentageUser())

/**
 * @swagger
 * /api/temporalFillFullName:
 *  post:
 *   tags: [Others]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 */
router.post('/api/temporalFillFullName', users.temporalFillFullName())

/**
 * @swagger
 * tags:
 *  name: OTP
 */

/**
 * @swagger
 * /api/auth/otp:
 *  post:
 *   tags: [OTP]
 *   requestBody:
 *    required: true
 *    description: Generar y enviar codigo de verificación
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        email:
 *         type: string
 *         example: talentotest@mailinator.com
 *        lang:
 *         type: string
 *         example: es
 */
router.post(
  '/api/auth/otp',
  validate({
    email: 'required|email',
    lang: 'required',
  }),
  sanitaze.preventxss(),
  otp_controller.generate(),
)

/**
 * @swagger
 * /api/auth/otp/verify:
 *  post:
 *   tags: [OTP]
 *   requestBody:
 *    required: true
 *    description: Verificar correo del usuario
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        email:
 *         type: string
 *         example: talentotest@mailinator.com
 *        code:
 *         type: string
 *         example: 574770
 */

router.post(
  '/api/auth/otp/verify',
  validate({
    email: 'required|email',
    code: 'required|numeric',
  }),
  sanitaze.preventxss(),
  otp_controller.verify(),
)

router.use('/api/keys', require('./routes/api_keys.router'))
router.use('/api/transactions', require('./routes/transaction.router'))
router.use('/api/complete_profile', require('./routes/complete_profile.router'))
router.use('/api/opportunities', require('./routes/opportunities.router.js'))
router.use('/api/tops', require('./routes/tops.router.js'))
router.use('/api/projects', require('./routes/projects.router.js'))
router.use(
  '/api/project_applications',
  require('./routes/project_applications.router'),
)
router.use(
  '/api/job_applications',
  require('./routes/job_applications.router.js'),
)
router.use('/api/projects_top', require('./routes/projects_top.router.js'))
router.use('/api/stripe', require('./routes/stripe.router.js'))
router.use('/api/users/recruiter', require('./routes/user_recruiter.router.js'))
router.use('/api/users/talent', require('./routes/user_recruiter.router.js'))
router.use('/api/chat_gpt', require('./routes/chat_gpt.router.js'))
router.use('/api/languages', require('./routes/languages.router.js'))
router.use('/api/me/languages', require('./routes/users_languages.router'))
router.use('/api/industries', require('./routes/industries.router'))
router.use('/api/me/industries', require('./routes/user_industries.router'))
router.use('/api/roles_interest', require('./routes/roles_interest.router'))
router.use(
  '/api/me/roles_interest',
  require('./routes/users_roles_interest.router'),
)
router.use('/api/genders', require('./routes/genders.router'))
router.use('/api/me/genders', require('./routes/user_genders.router'))
router.use('/api/utc', require('./routes/utc.router'))
router.use('/api/user_workplaces', require('./routes/user_workplaces.router'))
router.use('/api/sequelize', require('./routes/sequelize_meta.router'))
router.use(
  '/api/user_study_centres',
  require('./routes/user_study_centres.router'),
)
router.use(
  '/api/validation_checkout',
  require('./routes/validation_checkout.router.js'),
)
router.use(
  '/api',
  express.raw({ type: 'application/json' }),
  require('./routes/stripe.router.js'),
)
router.use(
  '/api/verification_request',
  require('./routes/verification_request.router.js'),
)
module.exports = router
