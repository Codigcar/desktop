import {IUserEntity} from '../../domain/users/user.entity'
import {IUserSchema} from '../models/user.schema'

export class UserMapper {
  static userDBToEntity(userDB: IUserSchema): IUserEntity {
    return {
      wa_id: userDB.wa_id,
      name: userDB.name,
      email: userDB.email,
      phone: userDB.phone,
      score: userDB.score,
      children_1_name: userDB.children_1_name,
      children_1_birthdate: userDB.children_1_birthdate,
      fortress: userDB.fortress,
      active_day: userDB.active_day,
      active_module: userDB.active_module,
      branch: userDB.branch,
    }
  }
}
