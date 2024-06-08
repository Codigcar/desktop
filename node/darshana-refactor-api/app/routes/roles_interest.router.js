const express = require('express')
const router = express.Router()

const sanitaze = require('../middlewares/sanitaze')
const controller = require('../controllers/roles_interest.controller')

router.get('/', sanitaze.preventxss(), controller.datatable())

module.exports = router
