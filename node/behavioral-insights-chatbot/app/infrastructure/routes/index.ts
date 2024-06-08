import { Router } from "express";
import userRouter from "./user.router";
import metaRouter from "./meta.router";
import cronjobRouter from "./cronjob.router";
import bitDataRouter from "./bitData.router";


const router = Router()
router.use('/users', userRouter)
router.use('/meta', metaRouter)
router.use('/cronjob', cronjobRouter)
router.use('/bitdata', bitDataRouter)
export default router