const express = require('express')
const router = express.Router()

const sanitaze = require('../middlewares/sanitaze')

const keys_controller = require('../controllers/keys.controller')

router.get('/', sanitaze.preventxss(), keys_controller.datatable())
router.post('/', sanitaze.preventxss(), keys_controller.create())

module.exports = router
