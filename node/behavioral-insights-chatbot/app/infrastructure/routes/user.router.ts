import { Router } from "express";
import { UserRepositoryImpl } from "../repositories/user.repository.impl";
import { UserServices } from "../../application/user.services";
import { UserController } from "../controllers/user.controller";


const userRouter = Router()
/* iniciar repo */
const userRepo = new UserRepositoryImpl()
const userServices = new UserServices(userRepo)
const userController = new UserController(userServices)

userRouter.post('/', userController.registerUser)
userRouter.get('/', userController.listUser)
userRouter.get('/', userController.deleteAllUsers)

export default userRouter