import { IUserQuestionsEntity } from '../../domain/user_questions/user_questions.entity'
import { IUserQuestionsRepository } from '../../domain/user_questions/user_questions.repository'
import QuestionModel from '../models/question.schema'
import UserQuestionsModel from '../models/user_questions.schema'
import { BaseRepositoryImpl } from './base.repository.impl'

export class userQuestionsRepositoryImpl
  extends BaseRepositoryImpl<IUserQuestionsEntity>
  implements IUserQuestionsRepository
{

  static instance: userQuestionsRepositoryImpl

  constructor() {
    super(UserQuestionsModel)
  }

  static getInstance() {
    if(!this.instance) this.instance = new userQuestionsRepositoryImpl()
    return this.instance
  }


  async getLastQuestion(wa_id: string): Promise<IUserQuestionsEntity | null> {
    try {
      return await UserQuestionsModel.findOne({ wa_id }).sort({ _id: -1 }).populate('question_id', '', QuestionModel)
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
