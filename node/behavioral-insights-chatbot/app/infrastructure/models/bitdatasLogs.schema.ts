import { Schema, model } from 'mongoose'

const schema = new Schema(
  {
    idx: {},
    message: {},
    status: {}
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

const BitdataLogsModel = model('bitdatalogs', schema)

export default BitdataLogsModel
