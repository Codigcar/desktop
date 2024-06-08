const express = require('express')
const router = express.Router()

const sanitaze = require('../middlewares/sanitaze.js')

const transaction_controller = require('../controllers/transactions.controller')

router.get('/', sanitaze.preventxss(), transaction_controller.getTransaction())

module.exports = router
