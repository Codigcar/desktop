import { Schema, model } from 'mongoose'

const schema = new Schema(
  {
    name: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

const MessageTypesModel = model('message_types', schema)

export default MessageTypesModel
