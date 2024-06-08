const express = require('express')
const router = express.Router()

const validate = require('../middlewares/validate.js')
const sanitaze = require('../middlewares/sanitaze.js')

const projects = require('../controllers/projects')
const { authorize } = require('../middlewares/auth.js')

/**
 * @swagger
 * tags:
 *  name: Projects
 */
/**
 * @swagger
 * /profile/{user_uuid}:
 *  get:
 *   tags: [Projects]
 *   responses:
 *    200:
 */
router.get('/profile/:user_uuid', projects.getByUserUUID())

/**
 * @swagger
 * /{id}:
 *  get:
 *   tags: [Projects]
 *   responses:
 *    200:
 */
router.get('/:id', projects.getById())

/**
 * @swagger
 * /byprojectskill/{skill}:
 *  get:
 *   tags: [Projects]
 *   responses:
 *    200:
 */
router.get('/byprojectskill/:skill', projects.getByProjectSkill())

/**
 * @swagger
 * :
 *  get:
 *   tags: [Projects]
 *   responses:
 *    200:
 */
router.get('', projects.datatable())

/**
 * @swagger
 * /api/posts:
 *  get:
 *   tags: [Projects]
 *   responses:
 *    200:
 */
router.get('/api/posts', projects.posts())

/**
 * @swagger
 * :
 *  post:
 *   tags: [Projects]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        body:
 *         type: string
 *        business_id:
 *         type: number
 *        weeks:
 *         type: number
 *        description:
 *         type: string
 *        end_date:
 *         type: date
 *         pattern: /([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/
 *         example: "2019-05-17"
 *        image_url:
 *         type: string
 *        mobile_image_url:
 *         type: string
 *        name:
 *         type: string
 *        price:
 *         type: number
 *         example: 1000
 *        skills:
 *         type: string
 *        topic_id:
 *         type: number
 *        files:
 *         type: array
 *         items:
 *          type: object
 *        work_modality_id:
 *         type: number
 *        country_id:
 *         type: number
 *        lang:
 *         type: string
 *         example: EN
 *        hourly_wage:
 *         type: number
 *         format: double
 *         example: 30
 *        category:
 *         type: string
 */
router.post(
  '',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    body: 'string',
    business_id: 'integer',
    weeks: 'numeric',
    description: 'string',
    end_date: 'string',
    image_url: 'string',
    mobile_image_url: 'string',
    name: 'string',
    price: 'numeric',
    skills: 'string',
    topic_id: 'numeric',
    // topic: "string",
    files: 'array',
    work_modality_id: 'required|number',
    country_id: 'required|number',
    lang: 'required|string',
    min_salary: 'string',
    max_salary: 'string',
    hourly_wage: 'integer',
    category: 'string',
  }),
  projects.create(),
)

/**
 * @swagger
 * /end:
 *  post:
 *   tags: [Projects]
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
  '/end',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    id: 'required|string',
    lang: 'required|string',
  }),
  projects.end(),
)

/**
 * @swagger
 * /start:
 *  post:
 *   tags: [Projects]
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
  '/start',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    id: 'required|string',
    lang: 'required|string',
  }),
  projects.start(),
)

/**
 * @swagger
 * :
 *  patch:
 *   tags: [Projects]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: number
 *        body:
 *         type: string
 *        business_id:
 *         type: number
 *        weeks:
 *         type: number
 *         example: 12
 *        description:
 *         type: string
 *        end_date:
 *         type: date
 *         pattern: /([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/
 *         example: "2019-05-17"
 *        image_url:
 *         type: string
 *        mobile_image_url:
 *         type: string
 *        name:
 *         type: string
 *        price:
 *         type: number
 *         example: 1000
 *        skills:
 *         type: array
 *         items:
 *          type: object
 *        topic_id:
 *         type: number
 *        files:
 *         type: array
 *         items:
 *          type: object
 *        work_modality_id:
 *         type: number
 *        country_id:
 *         type: number
 *        is_visible:
 *         type: boolean
 *        hourly_wage:
 *         type: number
 *         example: 30
 *         format: double
 *        category:
 *         type: string
 */
router.patch(
  '/',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    id: 'required|integer',
    body: 'string',
    business_id: 'integer',
    weeks: 'numeric',
    description: 'string',
    end_date: 'string',
    image_url: 'string',
    mobile_image_url: 'string',
    name: 'string',
    price: 'numeric',
    skills: 'string',
    topic_id: 'numeric',
    // topic: "string",
    files: 'array',
    work_modality_id: 'required|number',
    country_id: 'required|number',
    is_visible: 'boolean',
    min_salary: 'string',
    max_salary: 'string',
    hourly_wage: 'integer',
    category: 'string',
  }),
  //sanitaze.preventxss(),
  projects.patch(),
)

/**
 * @swagger
 * :
 *  delete:
 *   tags: [Projects]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *         type: number
 *        business_id:
 *         type: string
 *        recruiter_id:
 *         type: number
 */
router.delete(
  '/',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    id: 'required|integer',
    business_id: 'integer',
    recruiter_id: 'integer',
  }),
  sanitaze.preventxss(),
  projects.delete(),
)

// Puntuar talento

router.post(
  '/:projectId/talent-score',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    user_uuid: 'required',
    score: 'required',
    comment: 'string',
  }),
  sanitaze.preventxss(),
  projects.talentScore(),
)

router.patch(
  '/:projectId/talent-score',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validate({
    user_uuid: 'required',
    score: 'required',
    comment: 'string',
  }),
  sanitaze.preventxss(),
  projects.updateTalentScore(),
)

router.all(
  '/talent-score/all',
  sanitaze.preventxss(),
  projects.getAllTalentScore(),
)

module.exports = router
