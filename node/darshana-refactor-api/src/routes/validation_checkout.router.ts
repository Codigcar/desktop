const expressValidationCheckout = require('express')
const routerValidationCheckout = expressValidationCheckout.Router()

const validateVC = require('../middlewares/validate')

const validationCheckoutController = require('../controllers/validation_checkout.controller')

routerValidationCheckout.post(
  '/',
  validateVC({
    email: 'required|string',
    verification_number: 'required|number',
    is_per_month: 'required|boolean',
    payment_link: 'required|string',
  }),
  validationCheckoutController.create(),
)
routerValidationCheckout.get('/', validationCheckoutController.details())

//router.get('/', sanitaze.preventxss(), chatGptController.datatable())

module.exports = routerValidationCheckout
