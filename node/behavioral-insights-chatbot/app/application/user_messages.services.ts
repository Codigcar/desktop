import type { IUserQuestionsEntity } from '../domain/user_questions/user_questions.entity'
import { UserQuestionsValue } from '../domain/user_questions/user_questions.value'
import { IUserMessagesEntity } from '../domain/user_messages/user_messages.entity'
import { IUserMessagesRepository } from '../domain/user_messages/user_messages.repository'
import { UserMessagesValue } from '../domain/user_messages/user_messages.value'
import { UserMessagesRepositoryImpl } from '../infrastructure/repositories/user_messages.repository.impl'

export class UserMessagesServices {
  static instance: UserMessagesServices

  constructor(
    private readonly userMessagesRepository: IUserMessagesRepository,
  ) {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new UserMessagesServices(
        UserMessagesRepositoryImpl.getInstance(),
      )
    }
    return this.instance
  }

  public register = async (userMessage: IUserMessagesEntity) => {
    const userMessageNew = new UserMessagesValue(userMessage)
    const userMessageCreated = await this.userMessagesRepository.register(
      userMessageNew,
    )
    return userMessageCreated
  }

  public findOneAndUpdate = async ({
    userQuestionId,
    waId,
    message,
    idx,
    fromQuestion,
    module,
    day,
  }: {
    userQuestionId: string
    waId: string
    message: string
    idx: number
    fromQuestion: string
    module: number
    day: number
  }) => {
    const getUserMessageDB = await this.userMessagesRepository.findOneAndUpdate(
      {
        conditions: { user_question_id: userQuestionId },
        update: {
          userQuestionId,
          wa_id: waId,
          message,
          idx,
          from_question: fromQuestion,
          module: module,
          day: day,
        },
        upsert: true, // en caso no lo encuentra, crea un registro
      },
    )

    return getUserMessageDB
  }

  public getCountAnswersToA = async ({ waId }: { waId: string }) => {
    const questionsToEvaluar = [
      'Siento un vacio y mucha tristeza cuando estoy sola o con mi bebe\n\nA. SÍ \nB. NO',
      'A veces duermo mucho y descuido a mi bebe y otras veces no tengo sueño pero tampoco puedo cuidar a mi bebe\n\nA. SÍ \nB. NO',
      'Por mi estado de ánimo, no soy una madre responsable, descuido mucho a mi bebe\n\nA. SÍ \nB. NO',
      'Con frecuencia cambio de emociones, de la tristeza pasó a la cólera/irritabilidad\n\nA. SÍ \nB. NO',
      'La otra vez pensé en hacerme daño o dañar a mi bebe y me sentí culpable solo pensarlo\n\nA. SÍ \nB. NO',
      'Aunque amo a mi bebe, a veces he pensado que me arrepiento de haber sido madre\n\nA. SÍ \nB. NO',
      'La otra vez pensé que mi bebe estaria mejor sin mi y tambien pense que yo estaría mejor sin él\n\nA. SÍ \nB. NO',
      'Últimamente no siento conexión emocional hacia mi bebe\n\nA. SÍ \nB. NO',
      'Siempre he sido nerviosa y por eso no puedo evitar esta sensación de no saber qué hacer con mi bebe y me siento culpable\n\nA. SÍ \nB. NO',
      'Desde que nació mi bebe me he aislado y no tengo ganas de ver gente\n\nA. SÍ \nB. NO',
    ]

    let count = 0
    for (const question of questionsToEvaluar) {
      const getAnswersCount = await this.userMessagesRepository.findOneByObject(
        {
          wa_id: waId,
          message: question,
        },
      )
      if (!getAnswersCount) return
      const { message } = getAnswersCount

      if (message.toLocaleLowerCase() == 'a') count++
    }
    // if(count < 5) {

    // }
  }
}
