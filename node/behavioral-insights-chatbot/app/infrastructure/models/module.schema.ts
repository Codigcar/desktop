import { Schema, model } from 'mongoose'

const ModuleSchema = new Schema(
  {
    number: { type: Number },
    name: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

const ModuleModel = model('module', ModuleSchema)

export default ModuleModel
