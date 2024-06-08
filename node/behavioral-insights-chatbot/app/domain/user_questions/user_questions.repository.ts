import { IBaseRepository } from '../base.repository'
import { IUserQuestionsEntity } from './user_questions.entity'

export interface IUserQuestionsRepository extends IBaseRepository<IUserQuestionsEntity> {
    getLastQuestion(wa_id: string): Promise<IUserQuestionsEntity | null>
}
