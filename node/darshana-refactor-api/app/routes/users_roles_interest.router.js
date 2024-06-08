'use strict'
const express = require('express')
const router = express.Router()
const controller = require('../controllers/users_roles_interest.controller')
const validateUL = require('../middlewares/validate')
const { authorize } = require('../middlewares/auth')

router.post(
  '/',
  authorize(process.env.WHIZ_API_ROLE_USER),
  validateUL({
    name: 'required|string',
  }),
  controller.registerRolByUser(),
)
router.get(
  '/',
  authorize(process.env.WHIZ_API_ROLE_USER),
  controller.datatable(),
)
router.delete(
  '/all',
  authorize(process.env.WHIZ_API_ROLE_USER),
  controller.deleteAllByUser(),
)
module.exports = router
