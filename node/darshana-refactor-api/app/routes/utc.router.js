'use strict'
const express = require('express')
const router = express.Router()
const controller = require('../controllers/utc')

router.get('/', controller.datatable())

module.exports = router
