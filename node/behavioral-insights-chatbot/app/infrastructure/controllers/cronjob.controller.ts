import cron, {ScheduleOptions} from "node-cron";
import {NextFunction, Request, Response} from 'express'
import {CronJobServices} from '../../application/cronjob.services'
// models
import UserModel from '../models/user.schema'
import QuestionModel from '../models/question.schema'
import UserQuestionsModel from '../models/user_questions.schema'
import {MetaServices} from "../../application/meta.services";
import {SendMessagesTurnIO} from "../factory/turnio/sendMessages.turnio";
import { UserRepositoryImpl } from "../repositories/user.repository.impl";
import logger from "../../utils/logger";

const variablesModule: Record<string, string[]> = {
    's1_d2': ['baby_name'],
    's2_d1': ['name', 'baby_name', 'score'],
    's2_d2': ['name'],
    's2_d3': ['name'],
    's3_d1': ['name', 'baby_name', 'score'],
    's4_d1': ['name', 'baby_name', 'score'],
    's5_d1': ['name', 'baby_name', 'score'],
    's6_d1': ['name', 'baby_name', 'score'],
    's8_d1': ['name', 'baby_name', 'score'],
    's9_d1': ['name', 'baby_name', 'score'],
    's10_d1': ['name', 'baby_name', 'score'],
    's11_d1': ['name', 'baby_name', 'score'],
}

export class CronJobController {
  options: ScheduleOptions

  constructor(private metaServices: MetaServices,
              private cronJobServices: CronJobServices,
              private sendMessagesTurnIO: SendMessagesTurnIO,
              private useRepository: UserRepositoryImpl,
              ) {
    this.options = {
      scheduled: true,
      timezone: process.env.CRONJOB_TIMEZONE,
    }
  }

  async startChatWithUsers() {
    try {
      const users = await UserModel.find().exec()
        console.log("users", users)

      for (const user of users) {
        const activeDay = user.active_day ?? 1;
        const activeWeek = user.active_module ?? 1;

        let currentTemplate = `s${activeWeek}_d${activeDay}`;
        //currentTemplate='s1_d1'

        console.log("currentTemplate", currentTemplate)

        const currentVariables = variablesModule[currentTemplate] ?? []

        const userVariables: string[] = currentVariables.map(variableKey => {
          // @ts-ignore
          return String(user[variableKey] ?? '')
        })

         console.log('user', userVariables.length)

        // Enviar mensaje de inicio del modulo.
          await this.sendMessagesTurnIO.sendMessageTemplate({
            waId: user.wa_id,
            body: currentTemplate,
            variables: userVariables
        })
      }
    } catch (error) {
      logger.error("🚀 -------------------------------------------------------------------------------------------🚀")
      logger.error("🚀 ~ file: cronjob.controller.ts:72 ~ CronJobController ~ startChatWithUsers ~ error:", JSON.stringify(error))
      logger.error("🚀 -------------------------------------------------------------------------------------------🚀")
      logger.error('Error starting chat with users: ', JSON.stringify(error))
    }
  }

  async sendReminderToInactiveUsers() {
    try {
      // get user_questions not answered.
      const inactiveUserQuestions = await UserQuestionsModel.find({
        status: 'read',
        has_answer: false,
      }).exec()

        console.log("inactiveUserQuestions", inactiveUserQuestions)

      for (const userQuestion of inactiveUserQuestions) {
        // get question info.
        const question = await QuestionModel.findOne({
          _id: userQuestion.question_id,
          is_waiting_answer: true,
        }).exec()

        if (question) {
          //TODO: Enviar mensaje de recordatorio al usuario
            await this.metaServices.sendNextQuestion({})
        }
      }
    } catch (error) {
      logger.error("🚀 ----------------------------------------------------------------------------------------------------🚀")
      logger.error("🚀 ~ file: cronjob.controller.ts:99 ~ CronJobController ~ sendReminderToInactiveUsers ~ error:", JSON.stringify(error))
      logger.error("🚀 ----------------------------------------------------------------------------------------------------🚀")
      logger.error('Error sending reminders to inactive users: ', JSON.stringify(error))
    }
  }

  public sendTemplateToUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { waId, module_number, day_number, waIds } = req.body
      if(waIds) {
        for (const waIdItem of waIds) {
          // const getUser:any = await this.useRepository.findByWaId(waIdItem)
          const getUser:any = await UserModel.findOne({ wa_id: waIdItem }) 
          
          logger.info("🚀 -----------------------------------------------------------------------------------------------------------------🚀")
          logger.info("🚀 ~ file: cronjob.controller.ts:123 ~ CronJobController ~ getUser?.branch.active_day:", getUser?.branch.active_day)
          logger.info("🚀 -----------------------------------------------------------------------------------------------------------------🚀")
          logger.info("🚀 -------------------------------------------------------------------------------------------------🚀")
          logger.info("🚀 ~ file: cronjob.controller.ts:126 ~ CronJobController ~ getUser.active_day:", getUser.active_day)
          logger.info("🚀 -------------------------------------------------------------------------------------------------🚀")
          if (!(Array.from(getUser?.branch.active_day).includes(day_number) && getUser.active_day === day_number)) return res.json({ status: false, message: 'Este usuario no se le puede enviar esta sección' })

          const getRama = getUser.branch.rama


          const get = await this.cronJobServices.sendMessage({
            waId: waIdItem,
            module: module_number,
            day: day_number,
            rama: getRama
          })

        }
        return res.json({ status: true, data: 'Success' })
      }

      // const { waId, module_number, day_number } = req.body
   
      const getUser:any = await this.useRepository.findByWaId(waId)

      if (!(Array.from(getUser?.branch.active_day).includes(day_number) && getUser.active_day === day_number)) return res.json({ status: false, message: 'Este usuario no se le puede enviar esta sección' })

      const getRama = getUser.branch.rama


      const get = await this.cronJobServices.sendMessage({
        waId,
        module: module_number,
        day: day_number,
        rama: getRama
      })
      // const get = await this.cronJobServices.startChatWithUsers()
      return res.json({ status: true, data: get })
    } catch (error:any) {
      logger.error("🚀 -----------------------------------------------------------------------🚀")
      logger.error("🚀 ~ file: cronjob.controller.ts:162 ~ CronJobController ~ error:", JSON.stringify(error.response.data))
      logger.error("🚀 -----------------------------------------------------------------------🚀")
      next(error)
    }
  }

  // setCronJobs() {
    // // Start actual module and day.
    // cron.schedule(
    //     '0 9 * * 1,3,5', // It will run every Monday, Wednesday, and Friday at 9:00 AM.
    //     () => {
    //       console.log('updating days on the database...')
    //       this.startChatWithUsers()
    //     },
    //     this.options,
    // ).start()

    // // Notify in case of waiting for a response.
    // cron.schedule(
    //     '*/30 * * * *', // It will run every 30 minutes... should only be sent to clients who have left the information on seen and only once per module.
    //     () => {
    //       console.log('reply notice...')
    //       this.sendReminderToInactiveUsers()
    //     },
    //     this.options,
    // ).start()

    // Test 1 min
      /*
    cron.schedule(
        '* * * * *',
        () => {
          console.log('test 1 min')
          this.startChatWithUsers()
            // this.sendReminderToInactiveUsers()
        },
        this.options,
    ).start();
       */
  // }
}
