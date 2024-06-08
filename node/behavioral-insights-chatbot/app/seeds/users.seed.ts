import { IUserEntity } from '../domain/users/user.entity'
import UserModel from '../infrastructure/models/user.schema'
import BranchesRandom from '../utils/random/random'

const userList: IUserEntity[] = [
  {
    wa_id: '51946100691',
    phone: '946100691',
    email: 'carlos.castilla@10pearls.com',
    name: '',
    score: 2,
    children_1_name: '',
    children_1_birthdate: '',
    fortress: '',
    active_day: 0,
    active_module: 1,
    branch: null,
  },
]

export const UsersSeed = async () => {
  const usersWithBranches = userList.map((userItem) => {
    const getBranch = BranchesRandom.getInstance().getRamaAleatoria()
    return {
      ...userItem,
      branch: getBranch,
    }
  })

  await UserModel.deleteMany({})
  await UserModel.insertMany(usersWithBranches)
  // await UserModel.insertMany(userList)
}
