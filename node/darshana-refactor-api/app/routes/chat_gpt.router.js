'use strict'
const express = require('express')
const router = express.Router()
const validate = require('../middlewares/validate')
const sanitaze = require('../middlewares/sanitaze')
const chatGptController = require('../controllers/chat_gpt.controller')
router.post(
  '/',
  validate({
    prompt: 'required|string',
    user_uuid: 'required|string',
  }),
  chatGptController.queryPrompt(),
)
router.get('/', sanitaze.preventxss(), chatGptController.datatable())
module.exports = router
