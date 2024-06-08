const express = require('express')
const router = express.Router()

const sanitaze = require('../middlewares/sanitaze')
const recruiter_controller = require('../controllers/user_recruiter.controller')
const { authorize } = require('../middlewares/auth')

// obtener todos los talentos contratados
router.get(
  '/:user_uuid/hired_talents',
  authorize(process.env.WHIZ_API_ROLE_USER),
  sanitaze.preventxss(),
  recruiter_controller.getAllHiredTalents(),
)
module.exports = router
