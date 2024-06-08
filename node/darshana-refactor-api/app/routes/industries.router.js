const express = require('express')
const router = express.Router()

const sanitaze = require('../middlewares/sanitaze')

const industriesController = require('../controllers/industries.controller')

router.get('/', sanitaze.preventxss(), industriesController.getAllIndustries())

module.exports = router
