import { IQuestionEntity } from '../../domain/questions/question.entity'
import { IQuestionRepository } from '../../domain/questions/question.repository'
import QuestionModel from '../models/question.schema'
import { BaseRepositoryImpl } from './base.repository.impl'

export class QuestionRepositoryImpl
  extends BaseRepositoryImpl<IQuestionEntity>
  implements IQuestionRepository
{
  static instance: QuestionRepositoryImpl

  constructor() {
    super(QuestionModel)
  }

  static getInstance() {
    if(!this.instance) this.instance = new QuestionRepositoryImpl()
    return this.instance
  }

  
}
