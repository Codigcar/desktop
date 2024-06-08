import { IQuestionEntity } from '../domain/questions/question.entity'
import { IQuestionRepository } from '../domain/questions/question.repository'

export class QuestionServices {
  constructor(private readonly questionRepository: IQuestionRepository) {}

  public getNextQuestion = async(num: number) => {
    const nextQuestionNumber = num++
    const getNextQuestion = await this.questionRepository.findOneByObject({num: nextQuestionNumber}, 'id')
    if(!getNextQuestion) throw new Error('Question last inserted not found')
    return getNextQuestion
  }
}
