const express = require('express')
const router = express.Router()

const validate = require('../middlewares/validate.js')
const sanitaze = require('../middlewares/sanitaze.js')

const job_applications = require('../controllers/job_applications.js')
const { authorize } = require('../middlewares/auth.js')
/**
 * @swagger
 * tags:
 *  name: Job_Applications
 */
/**
 * @swagger
 * /api:
 *  get:
 *   tags: [Job_Applications]
 *   responses:
 *    200:
 */
router.get('/', job_applications.datatable())
router.get(
  '/all',
  sanitaze.preventxss(),
  job_applications.getAllWithSequelize(),
)
/**
 * @swagger
 * /api/{uuid}:
 *  get:
 *   tags: [Job_Applications]
 *   responses:
 *    200:
 */
router.get('/:uuid', job_applications.getByUUID())

/**
 * @swagger
 * /api/check/to/{job_id}:
 *  get:
 *   tags: [Job_Applications]
 *   responses:
 *    200:
 */
router.get(
  '/check/to/:job_id',
  authorize(process.env.WHIZ_API_ROLE_USER),
  job_applications.check(),
)

/**
 * @swagger
 * /api/invite_talent:
 *  post:
 *   tags: [Job_Applications]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        job_id:
 *         type: string
 *        talent_id:
 *         type: string
 *        lang:
 *         type: string
 *         example: EN
 */
router.post(
  '/invite_talent',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    job_id: 'required|string',
    talent_user_uuid: 'required|string',
  }),
  job_applications.invite_talent(),
)

/**
 * @swagger
 * /api:
 *  post:
 *   tags: [Job_Applications]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        job_id:
 *         type: string
 *        summary:
 *         type: string
 *        experience:
 *         type: string
 *        file_url:
 *         type: string
 *        file_name:
 *         type: string
 *        file_size:
 *         type: string
 *         example: 2300
 *        lang:
 *         type: string
 *         example: EN
 */
router.post(
  '/',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    job_id: 'integer',
    summary: 'string',
    experience: 'string',
    file_url: 'string',
    file_name: 'string',
    file_size: 'string',
    lang: 'required|string',
    updated: 'boolean',
  }),
  sanitaze.preventxss(),
  job_applications.create(),
)

/**
 * @swagger
 * /api:
 *  patch:
 *   tags: [Job_Applications]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: number
 *        summary:
 *         type: string
 *        experience:
 *         type: string
 *        file_url:
 *         type: string
 *        file_name:
 *         type: string
 *        file_size:
 *         type: string
 *         example: 2300
 *        time_proposal:
 *         type: string
 *        close_at_proposal:
 *         type: string
 *        lang:
 *         type: string
 *         example: EN
 */
router.patch(
  '/',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    id: 'required|integer',
    summary: 'string',
    experience: 'string',
    file_url: 'string',
    file_name: 'string',
    file_size: 'string',
    time_proposal: 'numeric',
    close_at_proposal: 'string',
    lang: 'string',
    updated: 'boolean',
  }),
  sanitaze.preventxss(),
  job_applications.patch(),
)

/**
 * @swagger
 * /api/updated:
 *  patch:
 *   tags: [Job_Applications]
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
  job_applications.patch(),
)

/**
 * @swagger
 * /api:
 *  delete:
 *   tags: [Job_Applications]
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
  job_applications.delete(),
)

/**
 * @swagger
 * /api/select:
 *  post:
 *   tags: [Job_Applications]
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
  '/api/select',
  authorize(process.env.WHIZ_API_ROLE_USER),
  sanitaze.preventxss(),
  job_applications.select(),
)

/**
 * @swagger
 * /api/changeApplicationStatus:
 *  post:
 *   tags: [Job_Applications]
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
  job_applications.changeApplicationStatus(),
)

/**
 * @swagger
 * /api/unselect:
 *  post:
 *   tags: [Job_Applications]
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
  '/unselect',
  authorize(process.env.WHIZ_API_ROLE_USER),
  sanitaze.preventxss(),
  job_applications.unselect(),
)

/**
 * @swagger
 * /api/readytoclose:
 *  post:
 *   tags: [Job_Applications]
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
  '/readytoclose',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    id: 'required|integer',
  }),
  sanitaze.preventxss(),
  job_applications.readyToClose(),
)

/**
 * @swagger
 * /api/closeproject:
 *  post:
 *   tags: [Job_Applications]
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
  '/closeproject',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    id: 'required|integer',
  }),
  sanitaze.preventxss(),
  job_applications.closeJob(),
)

/**
 * @swagger
 * /api/update_wallet:
 *  patch:
 *   tags: [Job_Applications]
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
  job_applications.changeWallet(),
)

module.exports = router
