const express = require('express')
const router = express.Router()

// const validate = require('../middlewares/validate')
// const sanitaze = require('../middlewares/sanitaze')

const controller = require('../controllers/users.controller')

// router.post(
//   '/job/enable',
//   validate({
//     ids: 'required|array',
//   }),
//   sanitaze.preventxss(),
//   job_tops_controller.enableTop(),
// )

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
router.get('/api/talents', controller.getTalents())

/**
 * @swagger
 * /api/talents/byuserskill/:skill:
 *  get:
 *   tags: [Talents]
 *   responses:
 *    200:
 */
router.get('/api/talents/byuserskill/:skill', controller.getByUserSkill())
module.exports = router
