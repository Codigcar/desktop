import { NextFunction, Request, Response } from 'express'
import { Schema, connect, model, models } from 'mongoose'
import { SEM1_D1 } from '../../seeds/rama_1/semana_1/dia1'
import { SEM1_D2 } from '../../seeds/rama_1/semana_1/dia2'
import QuestionModel from '../models/question.schema'
import UserMessagesModel from '../models/user_messages.schema'
import UserQuestionsModel from '../models/user_questions.schema'
import UserModel from '../models/user.schema'
import BitdataLogsModel from '../models/bitdatasLogs.schema'

export function transformArraysToOneFunction(array: any[]) {
  const singleObject1 = array.reduce((acc: any, curr: any) => {
    return { ...acc, ...curr }
  }, {})

  return singleObject1
}

export class MetadataController {
  public getMetadata = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const getLast: any = await BitdataLogsModel.find().sort({ _id: -1 })
      const idx = ++getLast[0].idx

      await BitdataLogsModel.create({
        idx,
        message: 'Iniciado',
        status: 'inProcess',
      })

      res.json({
        status: true,
        message: 'Request started',
        idx: idx
      })

      const seeds: any = []
      const preLists: any = []
      const getAllQuestion: any = await QuestionModel.find()

      const creandoKeys = Array.from(getAllQuestion).map((item: any) => {
        // ingresando primera fila de info
        preLists.push({
          [`B${item.rama}-M${item.module}-D${item.day}-${item.idx}`]:
            item.value.body,
        })

        return {
          [`B${item.rama}-M${item.module}-D${item.day}-${item.idx}`]: {
            type: {},
            default: '',
          },
        }
      })

      seeds.push(transformArraysToOneFunction(preLists))
      const combinedObject = Object.assign({}, ...creandoKeys, {
        ABC_wa_id: { type: {} },
      })

      let MetadataModel: any

      try {
        MetadataModel = model('bitdatas')
      } catch (error) {
        const BitDataSchema = new Schema(combinedObject, {
          timestamps: true,
          versionKey: false,
        })
        MetadataModel = model('bitdatas', BitDataSchema)
      }
      await MetadataModel.deleteMany({})

      const getAllUsers = await UserModel.find()

      for (const usuario of getAllUsers) {
        const preSeeds = []
        const getAllMessagesQuestions: any = await UserMessagesModel.find({
          wa_id: usuario.wa_id,
        }).populate('user_question_id', '', UserQuestionsModel)
        for (const messagesFromUser of getAllMessagesQuestions) {
          const messageContestado = messagesFromUser.message

          const getAllQuestions: any = await UserQuestionsModel.findOne({
            _id: messagesFromUser.user_question_id,
          }).populate('question_id', '', QuestionModel)

          const getPreguntaQueFueEnviada = getAllQuestions.question_id
          const item = getPreguntaQueFueEnviada
          preSeeds.push({
            [`B${item.rama}-M${item.module}-D${item.day}-${item.idx}`]:
              messageContestado,
          })
        }
        preSeeds.push({ ABC_wa_id: usuario.wa_id })
        /* ultima estapa */
        // const singleObject = preSeeds.reduce((acc:any, curr:any) => {
        //     return { ...acc, ...curr };
        // }
        seeds.push(transformArraysToOneFunction(preSeeds))
      }

      await MetadataModel.insertMany(seeds)
      await BitdataLogsModel.findOneAndUpdate(
        { idx },
        {
          message: 'Finalizado',
          status: 'finish',
        },
      )
    } catch (error) {
      const getLast: any = await BitdataLogsModel.find().sort({ _id: -1 })
      const idx = ++getLast[0].idx
      await BitdataLogsModel.findOneAndUpdate(
        { idx },
        {
          message: JSON.stringify(error),
          status: 'error',
        },
      )

      console.log(
        '🚀 --------------------------------------------------------------------------------------🚀',
      )
      console.log(
        '🚀 ~ file: metadata.controller.ts:6 ~ MetadataController ~ getMetadata= ~ error:',
        error,
      )
      console.log(
        '🚀 --------------------------------------------------------------------------------------🚀',
      )
      next(error)
    }
  }
}
