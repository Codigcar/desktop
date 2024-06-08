import { IUserEntity } from '../domain/users/user.entity'
import { IUserRepository } from '../domain/users/user.repository'
import { UserValue } from '../domain/users/user.value'
import { UserRepositoryImpl } from '../infrastructure/repositories/user.repository.impl'

export class UserServices {

  static instance: UserServices


  constructor(
    private readonly userRepository: IUserRepository,
  ) { }

  static getInstance() {
    if (!this.instance) {
      this.instance = new UserServices(
        UserRepositoryImpl.getInstance(),
      )
    }
    return this.instance
  }


  public registerUser = async (user: IUserEntity) => {
    const userNew = new UserValue(user)
    const userCreated = await this.userRepository.register(userNew)
    return userCreated
  }

  public listUser = async () => {
    const users = await this.userRepository.list()
    return users
  }

  public updateScore = async ({ waId, score }: { waId: string, score: number }) => {
    const getUser = await this.userRepository.findByWaId(waId)
    if (!getUser) throw new Error('User not found2')
    const newScore = Number(getUser.score) + Number(score)
    const updateUser = await this.userRepository.updateOne({ wa_id: waId }, { score: newScore })
    return updateUser
  }
  
  public updateUser = async({waId, updateObject}: any) => {
    const updateUser = await this.userRepository.findOneAndUpdate({
      conditions: { wa_id: waId },
      update: updateObject,
    })
    return updateUser
  }

  public getUserByWaId = async({waId}: any) => {
    const getUser:any = await this.userRepository.findByWaId(waId)
    return getUser
  }
}
