import ModuleModel from "../infrastructure/models/module.schema"

const seedModules = [
    {
      number: 1,
      name: 'Módulo Marita y la Lactancia Materna',
    },
    {
      number: 2,
      name: 'Sandra y la prevención de anemia',
    },
  ]
  
  export const ModulesSeed = async () => {
      await ModuleModel.deleteMany({})
      await ModuleModel.insertMany(seedModules)
  }