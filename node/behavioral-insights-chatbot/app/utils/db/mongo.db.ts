import { connect } from 'mongoose'
import { ModulesSeed } from '../../seeds/module.seed'
import { DaySeed } from '../../seeds/day.seed'
import { MessageTypesSeed } from '../../seeds/messageTypes.seed'
import { UsersSeed } from '../../seeds/users.seed'
import { QuestionSeedRama1 } from '../../seeds/question.seed.rama1'
import { QuestionSeedRama2 } from '../../seeds/question.seed.rama2'
import UserQuestionsModel from '../../infrastructure/models/user_questions.schema'
import UserMessagesModel from '../../infrastructure/models/user_messages.schema'
import { QuestionSeedRama0 } from '../../seeds/question.seed.rama0'
import QuestionModel from '../../infrastructure/models/question.schema'
import { QuestionSeedRama4 } from '../../seeds/question.seed.rama4'
import logger from '../logger'
import { QuestionSeedRama3 } from '../../seeds/question.seed.rama3'
import BitdataLogsModel from '../../infrastructure/models/bitdatasLogs.schema'
import { BitdataLogsSeed } from '../../seeds/bitdatalogs.seed'

const DB_URI = `${process.env.DB_URI}`
// const DB_URI =
//   'mongodb+srv://juntina:juntina@cluster0.opxqja3.mongodb.net/juntina'

export class MongoDB {
  public dbInitConnect = async () => {
    await connect(DB_URI)
      .then((db) => {
        logger.info('DB Mongo connected to:', db.connection.name)
        this.seeds()
      })
      .catch((err) => logger.error('Error DB: ', JSON.stringify(err)))
  }

  public seeds = async () => {


    // ModulesSeed()
    //   .then(() => logger.info('DB Modules seeded!!'))
    //   .catch((err) => logger.info('Error Modules seeded: ', err))
    // DaySeed()
    //   .then(() => logger.info('DB DaySeed!!'))
    //   .catch((err) => logger.info('Error DaySeed: ', err))
    // MessageTypesSeed()
    //   .then(() => logger.info('DB MessageTypesSeed!!'))
    //   .catch((err) => logger.info('Error MessageTypesSeed: ', err))

    logger.info("🚀 ---------------------------------------------------------------------------------------------------------------------🚀")
    logger.info("🚀 ~ file: mongo.db.ts:41 ~ MongoDB ~ seeds= ~ process.env.IS_ENABLE_RESET_TABLES:", process.env.IS_ENABLE_RESET_TABLES)
    logger.info("🚀 ---------------------------------------------------------------------------------------------------------------------🚀")
    logger.info("🚀 -------------------------------------------------------------------------------------------🚀")
    logger.info("🚀 ~ file: mongo.db.ts:53 ~ MongoDB ~ seeds= ~ IS_ENABLE_RUN_SEEDERS:", process.env.IS_ENABLE_RUN_SEEDERS)
    logger.info("🚀 -------------------------------------------------------------------------------------------🚀")
    logger.info("🚀 -------------------------------------------------------------------------------------------🚀")
    logger.info("🚀 ~ file: mongo.db.ts:54 ~ MongoDB ~ seeds= ~ IS_ENABLE_RABBITMQ:", process.env.IS_ENABLE_RABBITMQ)
    logger.info("🚀 -------------------------------------------------------------------------------------------🚀")

    if (process.env.IS_ENABLE_RESET_TABLES === 'true') {
      await UserQuestionsModel.deleteMany({})
      await UserMessagesModel.deleteMany({})

      await QuestionModel.deleteMany({})
      await BitdataLogsModel.deleteMany({})
    }
    
    if (process.env.IS_ENABLE_RUN_SEEDERS === 'true') {
      BitdataLogsSeed()
      .then(() => logger.info('DB BitDataLogs !!!'))
      .catch((err) => logger.error('Error BitDataLogs: ', JSON.stringify(err)))
    } else {
      logger.info('Los BitDataLogs están deshabilitados.')
    }

    //* Rama 0
    if (process.env.IS_ENABLE_RUN_SEEDERS === 'true') {
      QuestionSeedRama0()
      .then(() => logger.info('DB QuestionSeed - rama0!!'))
      .catch((err) => logger.error('Error QuestionSeed: ', JSON.stringify(err)))
    } else {
      logger.info('Los seeders están deshabilitados.')
    }
    
    // //* Rama 1
    if (process.env.IS_ENABLE_RUN_SEEDERS === 'true') {
      QuestionSeedRama1()
        .then(() => logger.info('DB QuestionSeed - rama1!!'))
        .catch((err) => logger.error('Error QuestionSeed: ', JSON.stringify(err)))
    } else {
      logger.info('Los seeders están deshabilitados.')
    }

    // //* Rama 2
    if (process.env.IS_ENABLE_RUN_SEEDERS === 'true') {
      QuestionSeedRama2()
        .then(() => logger.info('DB QuestionSeed - rama2!!'))
        .catch((err) => logger.error('Error QuestionSeed: ', JSON.stringify(err)))
    } else {
      logger.info('Los seeders están deshabilitados.')
    }

    // //* Rama 3
    if (process.env.IS_ENABLE_RUN_SEEDERS === 'true') {
      QuestionSeedRama3()
        .then(() => logger.info('DB QuestionSeed - rama3!!'))
        .catch((err) => logger.error('Error QuestionSeed: ', JSON.stringify(err)))
    } else {
      logger.info('Los seeders están deshabilitados.')
    }
    

    // //* Rama 4
    if (process.env.IS_ENABLE_RUN_SEEDERS === 'true') {
      QuestionSeedRama4()
        .then(() => logger.info('DB QuestionSeed - rama4!!'))
        .catch((err) => logger.error('Error QuestionSeed: ', JSON.stringify(err)))
    } else {
      logger.info('Los seeders están deshabilitados.')
    }

    // UsersSeed()
    //   .then(() => logger.info('UsersSeed QuestionSeed!!'))
    //   .catch((err) => logger.info('Error UsersSeed: ', err))
  }
}
