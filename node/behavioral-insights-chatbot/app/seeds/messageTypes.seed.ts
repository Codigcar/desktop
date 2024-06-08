import MessageTypesModel from "../infrastructure/models/messageTypes.schema"

const seed = [
    {
      name: 'text',
    },
    {
      name: 'audio',
    },
    {
      name: 'image',
    },
  ]
  
  export const MessageTypesSeed = async () => {
      await MessageTypesModel.deleteMany({})
      await MessageTypesModel.insertMany(seed)
  }