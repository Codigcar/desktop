const express = require('express')
const router = express.Router()
const sanitaze = require('../middlewares/sanitaze')
const validate = require('../middlewares/validate')
const { authorize } = require('../middlewares/auth')
const controller = require('../controllers/genders.controller')

router.get(
  '/',
  authorize(process.env.WHIZ_API_ROLE_USER),
  controller.getAllByUser(),
)
router.post(
  '/',
  authorize(process.env.WHIZ_API_ROLE_USER),
  sanitaze.preventxss(),
  validate({
    gender_id: 'required|number',
  }),
  controller.registerByUser(),
)

router.patch(
  '/',
  authorize(process.env.WHIZ_API_ROLE_USER),
  controller.updateGenderByUser(),
)

module.exports = router
