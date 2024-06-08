import { Schema, model } from 'mongoose'
import { IUserQuestionsEntity } from '../../domain/user_questions/user_questions.entity'


const UserQuestionsSchema = new Schema<IUserQuestionsEntity>(
  {
    wa_id: { type: String, required: true },
    question_id: { type: Schema.Types.ObjectId, ref: 'questions', required: true },
    message_id: { type: String, required: false },
    status: { type: String, required: false },
    has_answer: { type: Boolean, required: true },
    is_last_message_of_day: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

const UserQuestionsModel = model('user_question', UserQuestionsSchema)

export default UserQuestionsModel
