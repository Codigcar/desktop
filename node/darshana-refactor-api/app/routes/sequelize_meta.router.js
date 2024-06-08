'use strict'
const express = require('express')
const router = express.Router()
const controller = require('../controllers/sequelize_data.controller')

router.get('/', controller.datatable())
module.exports = router
