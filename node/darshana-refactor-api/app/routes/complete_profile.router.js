const express = require('express')
const router = express.Router()

const validate = require('../middlewares/validate')
const sanitaze = require('../middlewares/sanitaze')

const complete_controller = require('../controllers/complete_profile.controller')

router.post(
  '/',
  validate({
    email: 'required|email',
    lang: 'required|string',
  }),
  sanitaze.preventxss(),
  complete_controller.sendEmail(),
)

module.exports = router
