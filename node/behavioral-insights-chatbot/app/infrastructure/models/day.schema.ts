import { Schema, model } from 'mongoose'

const schema = new Schema(
  {
    module_id: { type: Schema.Types.ObjectId, ref: 'modules' },
    number: { type: Number },
    name: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

const DayModel = model('days', schema)

export default DayModel
