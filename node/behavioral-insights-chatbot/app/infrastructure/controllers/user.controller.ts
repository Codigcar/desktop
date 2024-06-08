import { NextFunction, Request, Response } from 'express'
import { UserServices } from '../../application/user.services'
import UserModel from '../models/user.schema'
import logger from '../../utils/logger'

export class UserController {
  constructor(private userServices: UserServices) {}

  public registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { body } = req
      const payload = {
        ...body,
        // wa_id: '51946100691',
        phone: '',
        email: '',
        name: '',
        score: 2,
        children_1_name: '',
        children_1_birthdate: '',
        fortress: '',
        active_day: 0,
        active_module: 1,
        branch: {
          name: 'rama0',
          active_day: [0],
          rama: 0,
        },
      }
      const user = await this.userServices.registerUser(payload)
      return res.json({
        status: true,
        body: user,
      })
    } catch (error) {
      logger.error('🚀 ~ file: user.controller.ts:16 ~ UserController ~ registerUser= ~ error:',JSON.stringify(error))
      next(error)
    }
  }

  public listUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userServices.listUser()
      res.json({
        status: true,
        body: users,
      })
    } catch (error) {
      logger.error('🚀 ~ file: user.controller.ts:29 ~ UserController ~ listUser= ~ error:',JSON.stringify(error))
      next(error)
    }
  }

  public deleteAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await UserModel.deleteMany({})
      return res.json({
        status: true,
        body: 'usuarios eliminados',
      })
    } catch (error) {
      logger.error( '🚀 ~ file: user.controller.ts:29 ~ UserController ~ listUser= ~ error:',JSON.stringify(error))
      next(error)
    }
  }
}
