'use strict'
const express = require('express')
const router = express.Router()
const user_study_centres = require('../controllers/user_study_centres.controller')
const validate = require('../middlewares/validate')
const sanitaze = require('../middlewares/sanitaze')
const { authorize } = require('../middlewares/auth')

//----------------------------------USER_STUDY_CENTERS---------------------------------------------

/**
 * @swagger
 * tags:
 *  name: User_Study_Centres
 */
/**
 * @swagger
 * /api/user_study_centres:
 *  post:
 *   tags: [User_Study_Centres]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        name:
 *         type: string
 *        course_name:
 *         type: string
 *        description:
 *         type: string
 *        start_date:
 *         type: date
 *         pattern: /([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/
 *         example: "2019-05-17"
 *        end_date:
 *         type: date
 *         pattern: /([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/
 *         example: "2019-05-17"
 *        studying_here:
 *         type: boolean
 */
router.post(
  '/',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    name: 'required|string',
    course_name: 'required|string',
    description: 'required|string',
    start_date: 'required|date',
    end_date: 'date',
    studying_here: 'required|boolean',
  }),
  sanitaze.preventxss(),
  user_study_centres.create(),
)

/**
 * @swagger
 * /api/user_study_centres:
 *  patch:
 *   tags: [User_Study_Centres]
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
 *        course_name:
 *         type: string
 *        description:
 *         type: string
 *        start_date:
 *         type: date
 *         pattern: /([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/
 *         example: "2019-05-17"
 *        end_date:
 *         type: date
 *         pattern: /([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/
 *         example: "2019-05-17"
 */
router.patch(
  '/',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    id: 'required|integer',
    name: 'string',
    course_name: 'string',
    description: 'string',
    start_date: 'date',
    end_date: 'date',
  }),
  sanitaze.preventxss(),
  user_study_centres.patch(),
)

/**
 * @swagger
 * /api/user_study_centres:
 *  delete:
 *   tags: [User_Study_Centres]
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
  '/',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    id: 'integer',
  }),
  sanitaze.preventxss(),
  user_study_centres.delete(),
)

router.post(
  '/verify',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    study_id: 'number|required',
  }),
  sanitaze.preventxss(),
  user_study_centres.verifiedStudyCentresInit(),
)

router.post(
  '/admin/verify',
  // authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    study_id: 'number|required',
  }),
  sanitaze.preventxss(),
  user_study_centres.verifiedStudyCentresByAdmin(),
)

router.get(
  '/list',
  authorize(process.env.WHIZ_API_ROLE_USER),
  sanitaze.preventxss(),
  user_study_centres.getListByUuid(),
)

router.post(
  '/admin/create',
  sanitaze.preventxss(),
  user_study_centres.createByAdmin(),
)

module.exports = router
