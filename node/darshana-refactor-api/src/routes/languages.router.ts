const expressLanguages = require('express')
const routerLanguages = expressLanguages.Router()
const languagesController = require('../controllers/languages.controller')

routerLanguages.get('/', languagesController.datatable())

module.exports = routerLanguages
