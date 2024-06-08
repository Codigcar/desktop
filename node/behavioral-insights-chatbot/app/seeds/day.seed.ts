import DayModel from "../infrastructure/models/day.schema"

const seed = [
    {
      module_id: '64b8e3cb6cba1c88a769fde4',
      number: 1,
      name: 'Lactancia y la historia de Marita',
    },
  ]
  
  export const DaySeed = async () => {
      await DayModel.deleteMany({})
      await DayModel.insertMany(seed)
  }