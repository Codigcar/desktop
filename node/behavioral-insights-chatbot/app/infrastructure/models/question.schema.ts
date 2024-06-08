import { Schema, model } from 'mongoose'
import { IQuestionEntity } from '../../domain/questions/question.entity'

const schema = new Schema<IQuestionEntity>(
  {
    module_id: { type: Schema.Types.ObjectId, ref: 'module', required: true },
    day_id: { type: Schema.Types.ObjectId, ref: 'days', required: true },
    module: { type: Number },
    day: { type: Number},
    body: { type: String, required: false },
    idx: { type: Number, required: true },
    category: { type: String, required: true },
    is_waiting_answer: { type: Boolean, required: false },
    value: {},
    answers: {},
    response: {},
    show_question_if: {},
    rama: {}
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

const QuestionModel = model<IQuestionEntity>('questions', schema)

export default QuestionModel
