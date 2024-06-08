'use strict'
const expressValidationStripe = require('express')
const routerValidationStripe = expressValidationStripe.Router()
const validateSt = require('../middlewares/validate')
const validationStripeController = require('../controllers/validation_checkout.controller')
routerValidationStripe.post('/webhook', validationStripeController.create())
routerValidationStripe.post(
  '/checkout',
  validateSt({
    priceId: 'required|string',
    domain: 'required|string',
  }),
  validationStripeController.checkout(),
)
routerValidationStripe.get('/prices', validationStripeController.prices())
routerValidationStripe.get('/verify', validationStripeController.verify())
//router.get('/', sanitaze.preventxss(), chatGptController.datatable())
module.exports = routerValidationStripe
