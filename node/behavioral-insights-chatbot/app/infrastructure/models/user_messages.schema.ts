import { Schema, model } from 'mongoose'
import { IUserMessagesEntity } from '../../domain/user_messages/user_messages.entity'

const UserSchema = new Schema<IUserMessagesEntity>(
  {
    wa_id: { type: String, required: true },
    message: { type: String, required: true },
    user_question_id: { type: Schema.Types.ObjectId,ref:'user_question', required: true },
    idx: { type: Number },
    from_question: { type: String },
    module: { type: Number },
    day: { type: Number },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

const UserMessagesModel = model('user_message', UserSchema)

export default UserMessagesModel
