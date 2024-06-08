'use strict'
const express = require('express')
const router = express.Router()
const sanitaze = require('../middlewares/sanitaze')
const controller = require('../controllers/genders.controller')
router.get('/', sanitaze.preventxss(), controller.getAllGenders())
module.exports = router
