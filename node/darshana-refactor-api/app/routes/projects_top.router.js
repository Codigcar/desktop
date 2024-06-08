const express = require('express')
const router = express.Router()

const tops_controller = require('../controllers/projects_top.controller')

router.get('/', tops_controller.datatable())

module.exports = router
