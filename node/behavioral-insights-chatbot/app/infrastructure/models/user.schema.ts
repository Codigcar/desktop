import { Schema, model } from 'mongoose'
import { IUserEntity } from '../../domain/users/user.entity'

export interface IUserSchema extends IUserEntity, Document {}

const UserSchema = new Schema<IUserEntity>(
  {
    wa_id: { type: String },
    phone: { type: String },
    email: { type: String },
    name: { type: String },
    score: { type: Number },
    children_1_name: { type: String },
    children_1_birthdate: { type: String },
    fortress: { type: String },
    active_day: { type: Number },
    active_module: { type: Number },
    branch: {}
  },
  {
    timestamps: true,
    versionKey: false,
    // toJSON: {
    //   transform: function (doc, ret) {
    //     delete ret._id
    //   }
    // }
  },
)

const UserModel = model<IUserSchema>('users', UserSchema)

export default UserModel
