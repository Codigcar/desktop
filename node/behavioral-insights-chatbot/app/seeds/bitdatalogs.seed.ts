import BitdataLogsModel from '../infrastructure/models/bitdatasLogs.schema'

const seed = [
  {
    idx: 1,
    status: 'init',
    message: 'init',
  },
]

export const BitdataLogsSeed = async () => {
  await BitdataLogsModel.deleteMany({})
  await BitdataLogsModel.insertMany(seed)
}
