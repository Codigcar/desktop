import {Router} from 'express'
import {CronJobController} from '../controllers/cronjob.controller'
import {MetaRepositoryImpl} from '../repositories/meta.repository.impl'
import {QuestionRepositoryImpl} from '../repositories/question.repository.impl'
import {CronJobServices} from '../../application/cronjob.services'
import {userQuestionsRepositoryImpl} from '../repositories/user_questions.repository.impl';
import { MetaServices } from '../../application/meta.services'
import { SendMessagesTurnIO } from '../factory/turnio/sendMessages.turnio'
import { UserRepositoryImpl } from '../repositories/user.repository.impl'

const cronjobRouter = Router()
/* iniciar repo */
const metaRepo = new MetaRepositoryImpl()
const metaServices = MetaServices.getInstance()
const questionRepo = new QuestionRepositoryImpl()
const userQuestionRepo = new userQuestionsRepositoryImpl()
const userRepo = new UserRepositoryImpl()
const cronjobServices = new CronJobServices(metaRepo, questionRepo,  userQuestionRepo, userRepo)
const sendMessageTurnIO = new SendMessagesTurnIO();

const cronjobController = new CronJobController(metaServices, cronjobServices, sendMessageTurnIO, userRepo)

cronjobRouter.post('/', cronjobController.sendTemplateToUser)

// cronjobController.setCronJobs();

export default cronjobRouter
