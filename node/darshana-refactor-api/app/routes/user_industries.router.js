const express = require('express')
const router = express.Router()
const sanitaze = require('../middlewares/sanitaze')
const industriesController = require('../controllers/industries.controller')
const validate = require('../middlewares/validate')
const { authorize } = require('../middlewares/auth')

router.get(
  '/',
  authorize(process.env.WHIZ_API_ROLE_USER),
  industriesController.getAllIndustriesByUser(),
)
router.post(
  '/',
  authorize(process.env.WHIZ_API_ROLE_USER),
  sanitaze.preventxss(),
  validate({
    industry_id: 'required|number',
  }),
  industriesController.registerIndustriesByUser(),
)

router.delete(
  '/',
  authorize(process.env.WHIZ_API_ROLE_USER),
  industriesController.deleteAllByUser(),
)

module.exports = router
