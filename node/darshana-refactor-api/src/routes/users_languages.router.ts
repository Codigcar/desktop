const expressUsersLanguages = require('express')
const routerUsersLanguages = expressUsersLanguages.Router()
const usersLanguagesController = require('../controllers/users_languages.controller')
const validateUL = require('../middlewares/validate')

const { authorize: authorizeUserLanguages } = require('../middlewares/auth')

routerUsersLanguages.post(
  '/',
  authorizeUserLanguages(process.env.WHIZ_API_ROLE_USER),
  validateUL({
    language_id: 'required|number',
  }),
  usersLanguagesController.register_language(),
)
routerUsersLanguages.get(
  '/',
  authorizeUserLanguages(process.env.WHIZ_API_ROLE_USER),
  usersLanguagesController.datatable(),
)

routerUsersLanguages.delete(
  '/all',
  authorizeUserLanguages(process.env.WHIZ_API_ROLE_USER),
  usersLanguagesController.delete_all(),
)

module.exports = routerUsersLanguages
