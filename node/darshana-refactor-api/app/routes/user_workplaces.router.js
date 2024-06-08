'use strict'
const express = require('express')
const router = express.Router()
const controller = require('../controllers/user_workplaces.controller')
const controllerAdmin = require('../controllers/user_workplaces_admin.controller')
const validate = require('../middlewares/validate')
const sanitaze = require('../middlewares/sanitaze')
const { authorize } = require('../middlewares/auth')

/**
 * @swagger
 * tags:
 *  name: User_Workplaces
 */
/**
 * @swagger
 * /api/user_workplaces:
 *  get:
 *   tags: [User_Workplaces]
 *   responses:
 *    200:
 *     description: description
 */
router.get(
  '/',
  //   authorize(process.env.WHIZ_API_ROLE_USER),
  controller.datatable(),
)

/**
 * @swagger
 * /api/user_workplaces:
 *  post:
 *   tags: [User_Workplaces]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
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
  '/',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    workplace_name: 'required|string',
    start_date: 'date',
    end_date: 'date',
    work_here: 'boolean',
    description: 'string',
    position: 'string',
    enable_business: 'boolean',
    // workplace_id: "string",
  }),
  sanitaze.preventxss(),
  controller.create(),
)

/**
 * @swagger
 * /api/user_workplaces/search?workplace_name={workplace_name}:
 *  get:
 *   tags: [User_Workplaces]
 *   parameters:
 *    name
 *   responses:
 *    200:
 */
router.get('/search', sanitaze.preventxss(), controller.search())

/**
 * @swagger
 * /api/user_workplaces:
 *  patch:
 *   tags: [User_Workplaces]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: number
 *        worplace_name:
 *         type: string
 *        start_date:
 *         type: date
 *         pattern: /([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/
 *         example: "2019-05-17"
 *        end_state:
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
router.patch(
  '/',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    id: 'required|integer',
    workplace_name: 'required',
    start_date: 'date',
    end_date: 'date',
    work_here: 'boolean',
    description: 'string',
    position: 'string',
    enable_business: 'boolean',
  }),
  sanitaze.preventxss(),
  controller.patch(),
)

/**
 * @swagger
 * /api/user_workplaces:
 *  delete:
 *   tags: [User_Workplaces]
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
    id: 'number',
  }),
  sanitaze.preventxss(),
  controller.delete(),
)

router.post(
  '/verify',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    workplace_id: 'required',
  }),
  sanitaze.preventxss(),
  controller.verifiedWorkPlace(),
)
router.post(
  '/verifyTalent',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    workplace_list: 'required',
    email: 'required',
    user_uuid: 'required',
    is_talent: 'required',
  }),
  sanitaze.preventxss(),
  controller.verifiedWorkPlacesTalent(),
)
router.post(
  '/admin/create',
  // validate({
  //   user_uuid: 'required|string',
  //   start_date: 'required',
  //   end_date: 'required',
  //   description: 'required',
  //   work_here: 'required',
  //   position: 'required',
  //   workplace_name: 'required',
  //   enable_business: 'required'
  // }),
  sanitaze.preventxss(),
  controllerAdmin.create(),
)

router.get(
  '/list',
  authorize(process.env.WHIZ_API_ROLE_USER),
  sanitaze.preventxss(),
  controller.list(),
)

router.get(
  '/verify_status/list',
  sanitaze.preventxss(),
  controller.datatableVerifyStatus(),
)

module.exports = router
