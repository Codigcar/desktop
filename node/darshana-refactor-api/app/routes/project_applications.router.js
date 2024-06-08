const express = require('express')
const router = express.Router()

const validate = require('../middlewares/validate.js')
const sanitaze = require('../middlewares/sanitaze.js')

const project_applications = require('../controllers/project_applications.js')
const { authorize } = require('../middlewares/auth.js')
/**
 * @swagger
 * tags:
 *  name: Project_Applications
 */
/**
 * @swagger
 * /api/project_applications:
 *  get:
 *   tags: [Project_Applications]
 *   responses:
 *    200:
 */
router.get('/', project_applications.datatable())

router.get(
  '/all',
  sanitaze.preventxss(),
  project_applications.getAllWithSequelize(),
)

/**
 * @swagger
 * /api/project_applications/{uuid}:
 *  get:
 *   tags: [Project_Applications]
 *   responses:
 *    200:
 */
router.get('/:uuid', project_applications.getByUUID())

/**
 * @swagger
 * /api/project_applications/check/to/{project_id}:
 *  get:
 *   tags: [Project_Applications]
 *   responses:
 *    200:
 */
router.get(
  '/check/to/:project_id',
  authorize(process.env.WHIZ_API_ROLE_USER),
  project_applications.check(),
)

/**
 * @swagger
 * /api/project_applications/invite_talent:
 *  post:
 *   tags: [Project_Applications]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        project_id:
 *         type: string
 *        talent_user_uuid:
 *         type: string
 */
router.post(
  '/invite_talent',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    project_id: 'required|string',
    talent_user_uuid: 'required|string',
  }),
  project_applications.invite_talent(),
)

/**
 * @swagger
 * /api/project_applications:
 *  post:
 *   tags: [Project_Applications]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        accept_price:
 *         type: boolean
 *        accept_time:
 *         type: boolean
 *        weeks:
 *         type: number
 *         example: 12
 *        lang:
 *         type: string
 *         example: EN
 *        price_proposal:
 *         type: number
 *         example: 1000
 *        procedure_text:
 *         type: string
 *        project_id:
 *         type: number
 *        proposal:
 *         type: string
 *        close_at_proposal:
 *         type: date
 *         pattern: /([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/
 *         example: "2019-05-17"
 */
router.post(
  '/',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    accept_price: 'boolean',
    accept_time: 'boolean',
    // days:"numeric",
    weeks: 'numeric',

    price_proposal: 'numeric',
    procedure_text: 'string',
    project_id: 'integer',
    proposal: 'string',

    close_at_proposal: 'string',
    lang: 'required|string',
    updated: 'boolean',
  }),
  sanitaze.preventxss(),
  project_applications.create(),
)

/**
 * @swagger
 * /api/project_applications/changeApplicationStatus:
 *  post:
 *   tags: [Project_Applications]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        application_id:
 *         type: number
 *        status:
 *         type: number
 *        lang:
 *         type: string
 *         example: EN
 */
router.post(
  '/changeApplicationStatus',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    application_id: 'required|integer',
    status: 'required|integer',
    lang: 'required|string',
  }),
  sanitaze.preventxss(),
  project_applications.changeApplicationStatus(),
)

/**
 * @swagger
 * /api/project_applications:
 *  patch:
 *   tags: [Project_Applications]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: integer
 *        proposal:
 *         type: string
 *        procedure_text:
 *         type: string
 *        accept_price:
 *         type: boolean
 *        price_proposal:
 *         type: number
 *         example: 1000
 *        accept_time:
 *         type: boolean
 *        days:
 *         type: integer
 *         example: 12
 *        lang:
 *         type: string
 *         example: EN
 *        shown_accepted_message:
 *         type: boolean
 *        weeks:
 *         type: number
 *         example: 12
 */
router.patch(
  '/',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    id: 'required|integer',
    proposal: 'string',
    procedure_text: 'string',
    accept_price: 'boolean',
    days: 'integer',
    price_proposal: 'numeric',
    accept_time: 'boolean',
    lang: 'string',
    shown_accepted_message: 'boolean',
    weeks: 'integer',
  }),
  sanitaze.preventxss(),
  project_applications.patch(),
)

/**
 * @swagger
 * /api/project_applications/counter_proposal:
 *  patch:
 *   tags: [Project_Applications]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: number
 *        salary_counter_proposal:
 *         type: number
 *         example: 1000
 *        time_counter_proposal:
 *         type: number
 */
router.patch(
  '/counter_proposal',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    id: 'required|integer',
    salary_counter_proposal: 'numeric',
    time_counter_proposal: 'numeric',
  }),
  project_applications.patchCounterProposal(),
)

/**
 * @swagger
 * /api/project_applications/accept_counter_proposal:
 *  patch:
 *   tags: [Project_Applications]
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
router.patch(
  '/accept_counter_proposal',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    id: 'required|integer',
  }),
  project_applications.patchAcceptCounterProposal(),
)

/**
 * @swagger
 * /api/project_applications/updated:
 *  patch:
 *   tags: [Project_Applications]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: number
 *        updated:
 *         type: boolean
 */
router.patch(
  '/updated',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    id: 'required|integer',
    updated: 'required|boolean',
  }),
  project_applications.patchUpdated(),
)

/**
 * @swagger
 * /api/project_applications:
 *  delete:
 *   tags: [Project_Applications]
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
  '/',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    id: 'required|integer',
  }),
  sanitaze.preventxss(),
  project_applications.delete(),
)

/**
 * @swagger
 * /api/project_applications/pay:
 *  post:
 *   tags: [Project_Applications]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        application_id:
 *         type: number
 *        recruiter_id:
 *         type: number
 */
router.post(
  '/pay',
  authorize(process.env.WHIZ_API_ROLE_USER),
  project_applications.pay(),
)

/**
 * @swagger
 * /api/project_applications/accept:
 *  post:
 *   tags: [Project_Applications]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        application_id:
 *         type: number
 */
router.post(
  '/accept',
  authorize(process.env.WHIZ_API_ROLE_USER),
  sanitaze.preventxss(),
  project_applications.accept(),
)

/**
 * @swagger
 * /api/project_applications/readytoclose:
 *  post:
 *   tags: [Project_Applications]
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
router.post(
  '/readytoclose',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    id: 'required|integer',
  }),
  sanitaze.preventxss(),
  project_applications.readyToClose(),
)

/**
 * @swagger
 * /api/project_applications/closeproject:
 *  post:
 *   tags: [Project_Applications]
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
  '/closeproject',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    id: 'required|integer',
    lang: 'required|string',
  }),
  sanitaze.preventxss(),
  project_applications.closeProject(),
)

/**
 * @swagger
 * /api/project_applications/update_wallet:
 *  patch:
 *   tags: [Project_Applications]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: number
 *        algorand_transaction:
 *         type: string
 *        near_transaction:
 *         type: string
 */
router.patch(
  '/update_wallet',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    id: 'required|integer',
    algorand_transaction: 'string',
    near_transaction: 'string',
  }),
  sanitaze.preventxss(),
  project_applications.changeWallet(),
)
module.exports = router
