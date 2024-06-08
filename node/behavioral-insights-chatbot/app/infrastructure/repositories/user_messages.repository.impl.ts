import { IUserMessagesEntity } from "../../domain/user_messages/user_messages.entity";
import { IUserMessagesRepository } from "../../domain/user_messages/user_messages.repository";
import UserMessagesModel from "../models/user_messages.schema";
import { BaseRepositoryImpl } from "./base.repository.impl";

export class UserMessagesRepositoryImpl extends BaseRepositoryImpl<IUserMessagesEntity> implements IUserMessagesRepository {

    static instance: UserMessagesRepositoryImpl

    constructor() {
        super(UserMessagesModel)
    }

    static getInstance() {
        if (!this.instance) this.instance = new UserMessagesRepositoryImpl()
        return this.instance
    }
}