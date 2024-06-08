import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import router from './infrastructure/routes'
import logger from './utils/logger'

export default class Server {
  private app: express.Application

  constructor() {
    this.app = express()
    this.app.listen(process.env.PORT, () =>
      logger.info(`App listen in port ${process.env.PORT}`),
    )
  }

  public middlewares() {
    this.app.use(logger.init())
    this.app.use(cors())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json())
    this.app.use(morgan('tiny'))
  }

  public routes() {
    this.app.use('/api', router)
  }

  public handleErrors() {
    this.app.use((err: any, req: any, res: any, next: any) => {
      this.errorHandler(err, req, res, next)
    })
  }

  public errorHandler(err: any, req: any, res: any, next: any) {
    if (err) {
      let message = 'An error ocurred, try again later'
      let message_es = 'A ocurrido un error, intentelo de nuevo en unos minutos'

      try {
        message = err.message
        message_es = err.message_es
      } catch (error) {
        logger.error('🚀 ~ file:1 ~ error:', JSON.stringify(error))
      }

      try {
        message = err.json.message
      } catch (error) {
        logger.error('🚀 ~ file: custom_errors.js:47 ~ error:',JSON.stringify(error))
      }

      try {
        if (err.sqlState) {
          if (err.fatal === true) {
            message =
              'Database didnt repond correctly, contact server administrator'
            logger.error(JSON.stringify(err))
          } else {
            message = err.sqlMessage
          }
        }
      } catch (error) {
        logger.error(
          '🚀 ~ file: custom_errors.js:61 ~ error:',
          JSON.stringify(error),
        )
      }

      if (typeof err === 'string') message = err

      if (err.code < 100 && err.code > 600) err.code = 400

      res.status(err.code || 400).json({
        status: false,
        message,
        message_es,
      })
    } else {
      next()
    }
  }
}
