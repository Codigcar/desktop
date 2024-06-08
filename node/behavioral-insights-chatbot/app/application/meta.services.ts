import type { IMetaEntity } from '../domain/meta/meta.entity'
import type { IMetaRepository } from '../domain/meta/meta.repository'
import { IQuestionRepository } from '../domain/questions/question.repository'
import { IUserMessagesRepository } from '../domain/user_messages/user_messages.repository'
import { IUserQuestionsRepository } from '../domain/user_questions/user_questions.repository'
import { IUserEntity } from '../domain/users/user.entity'
import { IUserRepository } from '../domain/users/user.repository'
import { Row } from '../infrastructure/factory/360dialog/interfaces.360dialog'
import QuestionModel from '../infrastructure/models/question.schema'
import { MetaRepositoryImpl } from '../infrastructure/repositories/meta.repository.impl'
import { QuestionRepositoryImpl } from '../infrastructure/repositories/question.repository.impl'
import { UserRepositoryImpl } from '../infrastructure/repositories/user.repository.impl'
import { UserMessagesRepositoryImpl } from '../infrastructure/repositories/user_messages.repository.impl'
import { userQuestionsRepositoryImpl } from '../infrastructure/repositories/user_questions.repository.impl'
import { Type } from '../seeds/interfaces'
import RabbitMQ from '../rabbitmq'
import {
  IButtonsInteractive,
  IRequestToSendContactBody,
} from '../utils/interfaces/meta.interface'
import { IUserMessagesEntity } from '../domain/user_messages/user_messages.entity'
import BranchesRandom from '../utils/random/random'
import logger from '../utils/logger'

type IRequestMessage = {
  waId: string
  body: string
  buttons?: IButtonsInteractive
  type: Type
  mode?: 'sendNextQuestion' | 'ignoreStatusOfMessage'
  getNextQuestionId?: any
  contact?: IRequestToSendContactBody[]
  sections?: Row[]
  // category?: string
}

export class MetaServices {
  static instance: MetaServices

  constructor(
    private readonly userRepository: IUserRepository,
    private readonly metaRepository: IMetaRepository,
    private readonly questionRepository: IQuestionRepository,
    private readonly userQuestionsRepository: IUserQuestionsRepository,
    private readonly userMessageRepository: IUserMessagesRepository,
  ) {}

  static getInstance() {
    if (!this.instance) {
      const userQuestionsRepo = new userQuestionsRepositoryImpl()
      const userMessageRepo = new UserMessagesRepositoryImpl()
      this.instance = new MetaServices(
        UserRepositoryImpl.getInstance(),
        MetaRepositoryImpl.getInstance(),
        QuestionRepositoryImpl.getInstance(),
        userQuestionsRepositoryImpl.getInstance(),
        userMessageRepo,
      )
    }
    return this.instance
  }

  public isConnectWebhook = (hub: any) => {
    const verifyToken = hub['hub.verify_token']
    return verifyToken === process.env.META_HOOK_TOKEN
  }

  public sendMessageByType = async ({
    waId,
    body,
    buttons,
    contact,
    type,
    sections,
  }: IRequestMessage) => {
    
    logger.info("🚀 -------------------------------------------------------------------------------------------------------🚀")
    logger.info("🚀 ~ file: meta.services.ts:79 ~ MetaServices ~ returnawaitthis.metaRepository.getMessages ~ body:", JSON.stringify({
      waId,
      body,
      buttons,
      contact,
      type,
      sections,
    }))
    logger.info("🚀 -------------------------------------------------------------------------------------------------------🚀")
      if (type === 'audio') {
        return await this.metaRepository.getMessages().sendMessageAudio({
          waId,
          body,
        })
      }
      if (type === 'image') {
        return await this.metaRepository.getMessages().sendMessageImage({
          waId,
          body,
        })
      }
      if (type === 'sticker') {
        return await this.metaRepository.getMessages().sendMessageSticker({
          waId,
          body,
        })
      }

      if (type === 'interactive') {
        return await this.metaRepository.getMessages().sendMessageInteractive({
          waId,
          body,
          buttons: buttons ?? [{ title: 'A' }],
        })
      }
      if (type === 'template') {
        return await this.metaRepository.getMessages().sendMessageTemplate({
          waId,
          body,
        })
      }
      if (type === 'contact') {
        return await this.metaRepository.getMessages().sendMessageContact({
          waId,
          contact: [],
        })
      }
      if (type === 'pdf') {
        return await this.metaRepository.getMessages().sendMessagePDF({
          waId,
          body,
        })
      }
      if (type === 'interactive-list') {
        if (!sections) return
        return await this.metaRepository.getMessages().sendMessageInteractiveList({
          waId,
          body,
          sections,
        })
      }
      return await this.metaRepository.getMessages().sendMessageText({
        waId,
        body,
      })
  }

  public sendMessage = async (body: IRequestMessage) => {
      const getInstance = RabbitMQ.getInstance()
      getInstance.sendTURNIO({message:body})
  }

  public isLessThan5times = async ({ waId, from_questions, your_answer_is, if_less_than, module }:{ waId: string, from_questions: string[], your_answer_is: string[], if_less_than: number, module: number}) => {
    let count = 0
    for (const question of from_questions) {
      const getAnswersCount = await this.userMessageRepository.findOneByObject(
        {
          wa_id: waId,
          from_question: question,
          module: module,
        },
      )
      if (!getAnswersCount) continue
      const { message } = getAnswersCount

      if (your_answer_is.includes(message)) count++
    }
    if(count < if_less_than) return true
    return false
  }

  public changeIsLastMessageOfDay = async ({ waId }: { waId: string }) => {
    const getLastQuestion = await this.userQuestionsRepository.getLastQuestion(waId)
    if(!getLastQuestion) return null

    await this.userQuestionsRepository.findOneAndUpdate({
      conditions: { message_id: getLastQuestion.message_id },
      update: {
        is_last_message_of_day: true
      },
    })
  }

  public updateUserQuestionSended = async ({
    messageId,
    updateObject,
    waId,
  }: {
    messageId: string
    updateObject: any
    waId: string
  }) => {
    const getUserQuestionDB =
      await this.userQuestionsRepository.findOneAndUpdate({
        conditions: { message_id: messageId, wa_id: waId,},
        update: updateObject,
        populate: {
          fk: 'question_id',
          select: '',
          model: QuestionModel,
        },
      })
    // if (!getUserQuestionDB) return null

    return getUserQuestionDB
  }

  public getUserQuestionByMessageId = async({messageId, waId}: {messageId: string, waId: string}) => {
    const getUserQuestionDB =
    await this.userQuestionsRepository.findOneByObject({
      message_id: messageId,
      wa_id: waId,
    },'',{
      fk: 'question_id',
      select: '',
      model: QuestionModel,
    })

    return getUserQuestionDB
  }

  public _addOneIndex(prevIndex:number) {
    const nextQuestionIdx = ++prevIndex
    return nextQuestionIdx
  }

  public async _getNextQuestion(nextQuestionIdx: number, ramaNumber: number) {
    const getNextQuestion: any = await this.questionRepository.findOneByObject({
      idx: nextQuestionIdx,
      rama: ramaNumber,
    })
    return getNextQuestion
  }

  private _getNextModuleAndDay(currentModule: number, currentDay: number, currentRama: number, isFromRama0?: boolean):any {
    let nextDay = currentDay.valueOf()
    let nextModule = currentModule.valueOf()
    
    if (currentRama === 1) {

      if(isFromRama0) {
        nextDay = 1
        nextModule= 1
        return { nextDay, nextModule }
      }

      if(currentDay < 5) {
        nextDay = currentDay + 2
        return { nextDay, nextModule }
      }
      nextDay = 1
      nextModule = currentModule + 1
      return { nextDay, nextModule }
    }

    if (currentRama === 2) {
      if(isFromRama0) {
        nextDay = 1
        nextModule= 1
        return { nextDay, nextModule }
      }

      if(currentDay < 5) {
        nextDay = currentDay + 4
        return { nextDay, nextModule }
      }
      nextDay = 1
      nextModule = currentModule + 1
      return { nextDay, nextModule }

    }

    if (currentRama === 4) {
      if(isFromRama0) {
        nextDay = 5
        nextModule= 1
        return { nextDay, nextModule }
      }

      nextDay = 5
      nextModule = currentModule + 1
      return { nextDay, nextModule }
    }

  }

  private _showQuestionIf = async(getNextQuestion:any, nextQuestionIdx: number, waId: string, ramaNumber: number): Promise<any> => {
      if(!getNextQuestion.show_question_if) {
        return getNextQuestion
      }

      const { counter_question  } = getNextQuestion.show_question_if
      let getNextQuestionBackup = getNextQuestion

      if (!counter_question) {
        const { from_question, your_answer_is, module  } = getNextQuestion.show_question_if
        const payload = {
          from_question: from_question,
          module: module,
          wa_id: waId,
        }
        const getPrevQuestion = await this.userMessageRepository.findOneByObject(payload)
        
        const isTrue = !Array.from(your_answer_is).includes(getPrevQuestion?.message)
        if(isTrue) {
          // TODO, saltar a la siguientep pregunta
          const nextQuestionIdx2 = this._addOneIndex(nextQuestionIdx)
          getNextQuestionBackup = await this._getNextQuestion(nextQuestionIdx2, ramaNumber)
          return await this._showQuestionIf(getNextQuestionBackup , nextQuestionIdx2, waId, ramaNumber)
        }  else {
          return getNextQuestion
        }
      }
  }

  public sendNextQuestion = async ({ waId }: any) => {
    const getLastQuestion:any = await this.userQuestionsRepository.getLastQuestion(waId)
    if (!getLastQuestion) return null

    if (getLastQuestion.is_last_message_of_day) return null
    
    const nextQuestionIdx = this._addOneIndex(getLastQuestion.question_id.idx)
    let getNextQuestion = await this._getNextQuestion(nextQuestionIdx, getLastQuestion.question_id.rama)

    //TODO -> ya no siguiente pregunta, significa que aquí termina en día
    if (!getNextQuestion) {
      const currentModule = getLastQuestion.question_id.module
      const currentDay = getLastQuestion.question_id.day
      const currentRama = getLastQuestion.question_id.rama

      if(currentRama === 0) {
        const getRamaNumber = BranchesRandom.getInstance().getRamaAleatoria()
  
          await this.userRepository.findOneAndUpdate({
            conditions: { wa_id: waId },
            update: {
              branch: getRamaNumber
            }
          })
          const responseGet = this._getNextModuleAndDay(currentModule, currentDay, getRamaNumber.rama, true)
          const { nextDay, nextModule } = responseGet
          const resp2 = await this.userRepository.findOneAndUpdate({
            conditions: { wa_id: waId },
            update: {
              active_day: nextDay,
              active_module: nextModule
            }
          })
          return null
      }
      
      const { nextDay, nextModule } = this._getNextModuleAndDay(currentModule, currentDay, currentRama)

      // TODO -> actualizar que debe ir al siguiente modulo o día
      await this.userRepository.findOneAndUpdate({
        conditions: { wa_id: waId },
        update: {
          active_day: nextDay,
          active_module: nextModule
        }
      })
      return null
    }

    const response = await this._showQuestionIf(getNextQuestion, nextQuestionIdx, waId, getLastQuestion.question_id.rama)
    if(response) {
      getNextQuestion = response
    }

    const { value, category } = getNextQuestion
    let bodyText = value.body
    let typeText = value.type

    if(getNextQuestion.show_question_if) {
      const { counter_question  } = getNextQuestion.show_question_if

      if (counter_question) {
      const { module, from_questions, your_answer_is, if_less_than  } = counter_question
        const isLessThan5Times = await this.isLessThan5times({
          waId,
          from_questions,
          your_answer_is,
          if_less_than,
          module,
          // rama: getNextQuestion.rama
        })
        const textToSend = isLessThan5Times ? getNextQuestion.value.less_than : getNextQuestion.value.major_than 
        bodyText = textToSend.body
        typeText = textToSend.type
      }
    }

    // TODO -> reemplaza los {{x}} en el bodyText
    if (value?.needDataFrom) {
      if (value?.needDataFrom?.model === 'users') {
        const getUser = await this.userRepository.findByWaId(waId)
        if (!getUser) return
        const columns = value?.needDataFrom?.columns
        if (!columns) return
        for (const column of columns) {
          bodyText = String(bodyText).replace(
            `{{${column}}}`,
            String(`${getUser[column as keyof IUserEntity]}`),
          )
        }
      }
      if(value?.needDataFrom?.model === 'user_messages') {
        const { columns, from_question, module} = value?.needDataFrom 
        if (!columns) return
        const getUserMessage = await this.userMessageRepository.findOneByObject({
          wa_id: waId,
          from_question: from_question,
          module: module
        })
        // if(!getUserMessage) return
        if(getUserMessage) {
          for (const column of columns) {
            bodyText = String(bodyText).replace(
              `{{${column}}}`,
              String(`${getUserMessage[column as keyof IUserMessagesEntity]}`),
            )
          }
        }
      }
    }

    const bodySendMessage = {
      waId,
      body: bodyText,
      type: typeText,
      buttons: value?.buttons,
      sections: value?.sections,
      mode: 'sendNextQuestion',
      getNextQuestionId: getNextQuestion._id,
    }
    logger.info("🚀 -----------------------------------------------------------------------------------------------------🚀")
    logger.info("🚀 ~ file: meta.services.ts:477 ~ MetaServices ~ sendNextQuestion= ~ bodySendMessage:", JSON.stringify(bodySendMessage))
    logger.info("🚀 -----------------------------------------------------------------------------------------------------🚀")

    await this.sendMessage({
      waId,
      body: bodyText,
      type: typeText,
      buttons: value?.buttons,
      sections: value?.sections,
      mode: 'sendNextQuestion',
      getNextQuestionId: getNextQuestion._id,
    })
  }


  public findAnswerCorrect = ({ answers, optionSelected }: any) => {
    const option = Array.from(answers).filter((answer: any) => {
      const isCorrect =
        optionSelected?.toLowerCase() === answer.option.toLowerCase()
      return isCorrect
    })
    return option
  }

  public sendConsoleContact = async ({ waId }: { waId: string }) => {
    await this.sendMessage({
      waId,
      type: 'text',
      body: 'Amiga te comparto el contacto de una nutricionista especializada para que  puedas programar una llamada y resolver tus dudas sobre nutrición de tu bebé.',
    })

    await this.sendMessage({
      waId,
      body: '',
      type: 'contact',
      contact: [
        {
          name: {
            first_name: 'John',
            formatted_name: 'John Smith',
            last_name: 'Smith',
          },
          phones: [
            {
              phone: '+1 (650) 555-1234',
              type: 'WORK',
              wa_id: '16505551234',
            },
          ],
        },
      ],
    })
  }
}
