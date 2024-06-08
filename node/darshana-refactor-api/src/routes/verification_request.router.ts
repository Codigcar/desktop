const expressVerificationRequest = require('express')
const routerVerificationRequest = expressVerificationRequest.Router()

const validateVR = require('../middlewares/validate')

const { authorize } = require('../middlewares/auth')
const VerificationRequestController = require('../controllers/verification_request.controller')

routerVerificationRequest.post(
  '/',
  validateVR({
    email: 'required|string',
    emailTalent: 'required|string',
    urlLink: 'required|string',
  }),
  VerificationRequestController.create(),
)
routerVerificationRequest.get('/', VerificationRequestController.details())

routerVerificationRequest.patch(
  '/',

  authorize(process.env.WHIZ_API_ROLE_USER),
  validateVR({
    email: 'required|string',
    verification_number: 'required|number',
  }),
  VerificationRequestController.update(),
)

module.exports = routerVerificationRequest
