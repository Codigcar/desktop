import { Router } from 'express'
import { MetaController } from '../controllers/meta2.controller'
import { MetaServices } from '../../application/meta.services'
import { UserRepositoryImpl } from '../repositories/user.repository.impl'
import { UserQuestionsServices } from '../../application/user_questions.services'
import { userQuestionsRepositoryImpl } from '../repositories/user_questions.repository.impl'
import { UserServices } from '../../application/user.services'
import { UserMessagesServices } from '../../application/user_messages.services'

const metaRouter = Router()

const userRepo = new UserRepositoryImpl()
const userQuestionsRepo = new userQuestionsRepositoryImpl()

const userQuestionsServices = new UserQuestionsServices(userQuestionsRepo)
const userServices = new UserServices(userRepo)

const metaController = new MetaController(
  MetaServices.getInstance(),
  userQuestionsServices,
  userServices,
  UserMessagesServices.getInstance()
)

metaRouter.get('/webhook', metaController.connectWebhook)
metaRouter.post('/webhook', metaController.handleWhatsAppHook)
metaRouter.post('/test', metaController.testEndpoint)

export default metaRouter
