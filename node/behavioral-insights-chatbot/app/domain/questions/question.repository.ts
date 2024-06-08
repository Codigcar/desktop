import { IBaseRepository } from '../base.repository'
import { IQuestionEntity } from './question.entity'

export interface IQuestionRepository extends IBaseRepository<IQuestionEntity> {
}
