import { IBaseRepository } from "../base.repository";
import { IUserMessagesEntity } from "./user_messages.entity";


export interface IUserMessagesRepository extends IBaseRepository<IUserMessagesEntity> {}