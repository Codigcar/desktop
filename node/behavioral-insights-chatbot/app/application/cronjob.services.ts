import { IMetaRepository } from '../domain/meta/meta.repository'
import { IQuestionEntity } from '../domain/questions/question.entity'
import { IQuestionRepository } from '../domain/questions/question.repository'
import { IUserQuestionsRepository } from '../domain/user_questions/user_questions.repository'
import { IUserEntity } from '../domain/users/user.entity'
import { IUserRepository } from '../domain/users/user.repository'
import { MetaRepositoryImpl } from '../infrastructure/repositories/meta.repository.impl'
import { QuestionRepositoryImpl } from '../infrastructure/repositories/question.repository.impl'
import { UserRepositoryImpl } from '../infrastructure/repositories/user.repository.impl'
import { userQuestionsRepositoryImpl } from '../infrastructure/repositories/user_questions.repository.impl'

type IMessage = {
  waId: string
  module: number
  day: number
  rama: number
}
export class CronJobServices {
  static instance: CronJobServices

  constructor(
    private readonly metaRepository: IMetaRepository,
    private readonly questionRepository: IQuestionRepository,
    private readonly userQuestionRepository: IUserQuestionsRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new CronJobServices(
        MetaRepositoryImpl.getInstance(),
        QuestionRepositoryImpl.getInstance(),
        userQuestionsRepositoryImpl.getInstance(),
        UserRepositoryImpl.getInstance(),
      )
    }
    return this.instance
  }

  private getVariables = async (
    waId: string,
    getQuestionTemplate: IQuestionEntity | undefined,
  ) => {
    let variables: string[] = []

    const getUser = await this.userRepository.findByWaId(waId)
    if (!getUser) throw new Error('getUser not found1')
    const columns = getQuestionTemplate?.value?.needDataFrom?.columns ?? []
    for (const column of columns) {
      const variable = String(getUser[column as keyof IUserEntity])
      variables.push(variable)
    }

    return variables
  }

  public startChatWithUsers = async () => {
    const getAllUsers = await this.userRepository.list()

    if (!getAllUsers) throw new Error('getAllUsers not found')

    for (const user of getAllUsers) {
      // if (!Array.from(user.branch).includes(user.active_day)) continue

      this.sendMessage({
        waId: user.wa_id,
        module: user.active_module,
        day: user.active_day,
        rama: 1,
      })
    }

    return getAllUsers
  }

  public sendMessage = async ({
    waId,
    module: moduleNumber,
    day: dayNumber,
    rama: ramaNumber,
  }: IMessage) => {
    let objectToSend: any = {
      module: moduleNumber,
      day: dayNumber,
      category: 'template',
    }

    const isPrivacyQuestions = moduleNumber === 1 && dayNumber === 0

    if (!isPrivacyQuestions) {
      objectToSend.rama = ramaNumber
    }

    const getQuestionTemplate = await this.questionRepository.findOneByObject(
      objectToSend,
    )

    if (!getQuestionTemplate) throw new Error('Question not found')

    const getVariables = await this.getVariables(waId, getQuestionTemplate)

    let messageSended: any = null

    // if (Boolean(process.env.IS_ENABLE_TEMPLATES_MOCK)) {
    //   messageSended = await this.metaRepository.getMessages().sendMessageText({
    //     waId,
    //     body: getQuestionTemplate.body,
    //   })
    // } else {
      messageSended = await this.metaRepository
        .getMessages()
        .sendMessageTemplate({
          waId,
          body: getQuestionTemplate.value.body,
          variables: getVariables,
        })
    // }

    await this.userQuestionRepository.register({
      wa_id: waId,
      question_id: getQuestionTemplate._id,
      message_id: messageSended?.messages[0]?.id,
      status: 'X',
      has_answer: false,
    })

    return messageSended
  }
}
