import type { IUserQuestionsEntity } from '../domain/user_questions/user_questions.entity'
import type { IUserQuestionsRepository } from '../domain/user_questions/user_questions.repository'
import { UserQuestionsValue } from '../domain/user_questions/user_questions.value'
import { userQuestionsRepositoryImpl } from '../infrastructure/repositories/user_questions.repository.impl'

export class UserQuestionsServices {
  static instance: UserQuestionsServices

  constructor(private readonly userQuestionsRepository: IUserQuestionsRepository) {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new UserQuestionsServices(
        userQuestionsRepositoryImpl.getInstance(),
      )
    }
    return this.instance
  }


  public register = async (userQuestions: IUserQuestionsEntity) => {
    const valueNew = new UserQuestionsValue(userQuestions)
    const created = await this.userQuestionsRepository.register(valueNew)
    return created
  }

  public getLastQuestionByWaId = async (wa_id: string): Promise<IUserQuestionsEntity | null > => {
    const getQuestionByUser = await this.userQuestionsRepository.getLastQuestion(wa_id)
    // if(!getQuestionByUser) throw new Error('Question last inserted not found')
    return getQuestionByUser
  }
}
