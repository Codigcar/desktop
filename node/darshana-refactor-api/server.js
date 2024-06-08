// Load .env Enviroment Variables to process.env
require('dotenv').config()
const { inject, errorHandler } = require('./app/helpers/custom_errors')
// Patch express in order to use async / await syntax
inject()

// Load global modules
require('./app/helpers/global')

// Require Dependencies
const cookieParser = require('cookie-parser')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
// const multer = require('multer');
// Require Local Dependencies
const router = require('./app/router')

// Instantiate an Multer Uploader
// const upload = multer();

// Instantiate an Express Application
const app = express()

const { whizMiddleware, logger } = require('./app/helpers/logger')
app.use(whizMiddleware)

// cookieParser middleware
app.use(cookieParser())

// Configure Express App Instance
app.use((req, res, next) => {
  req.originalUrl === '/api/stripe/webhook' ||
  req.originalUrl === '/api/webhook'
    ? next()
    : express.json()(req, res, next)
})

app.use(cors())
app.use(helmet())

// Assign Routes
app.use('/', router)

// Add  Swagger
const swaggerUI = require('swagger-ui-express')
const swaggerJSDocs = require('swagger-jsdoc')
const { options } = require('./app/helpers/swaggerOptions')
const moment = require('moment')

const specs = swaggerJSDocs(options)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

// Handle not valid route
app.use('*', (req, res) => {
  res.status(404).json({
    status: false,
    message: `Endpoint '${req.originalUrl.substring(0, 30)}...' Not Found`,
  })
})

// Handle errors
app.use((err, req, res, next) => {
  // logger.error(err);
  errorHandler()(err, req, res, next)
}) // Respond to errors

// Open Server on selected Port
const server = require('http').Server(app)
const socketio = require('socket.io')
const io = socketio(server, {
  path: '/api/socket.io',
  cors: {
    origin: '*',
  },
})

const chatController = require('./app/controllers/chat')
const { MODELS } = require('./app/helpers/enums')
const sendMail = require('./app/helpers/sendMail')
const CronJob = require('node-cron')

io.on('connection', (socket) => {
  chatController.handleSocket(io, socket)
})

server.listen(process.env.PORT, () => {
  console.info(`Server listening on port ${process.env.PORT}`)
  logger.info(`Server listening on port ${process.env.PORT}`)
})

const now = new Date()
const utcHours = now.getUTCHours()
logger.warn(`🚀 ~ file: server.js:94 ~ utcHours: ${utcHours}`)
const utcMinutes = now.getUTCMinutes()
logger.warn(`🚀 ~ file: server.js:95 ~ utcMinutes: ${utcMinutes}`)

//TODO! enviar correo a los users cada día 9:00 AM
// const job = new CronJob(process.env.CRON_JOB_TIME, async function () {
CronJob.schedule(process.env.CRON_JOB_TIME, async function () {
  // CronJob.schedule('45 19 * * *', async function () {
  const lang = 'en'
  logger.warn(`🚀 ~ file: server.js:95 ~ job ~: ${process.env.CRON_JOB_TIME}`)
  logger.warn(
    `🚀 ~ file: server.js:96 ~ job ~: ${process.env.CRON_DAYS_DIFF_TO_COMPARE_FIRST}`,
  )
  logger.warn(
    `🚀 ~ file: server.js:97 ~ job ~: ${process.env.CRON_DAYS_DIFF_TO_COMPARE_SECOND}`,
  )
  logger.warn(
    `🚀 ~ file: server.js:98 ~ job ~: ${process.env.CRON_DAYS_DIFF_TO_COMPARE_THREE}`,
  )
  const now = moment()
  logger.warn(`🚀 ~ file: server.js:100 ~ moment(): ${now.toDate()}`)
  try {
    const fecha1 = moment()
      .startOf('day')
      .subtract(process.env.CRON_DAYS_DIFF_TO_COMPARE_FIRST, 'days')
    const fecha2 = moment()
      .startOf('day')
      .subtract(process.env.CRON_DAYS_DIFF_TO_COMPARE_SECOND, 'days')
    const fecha3 = moment()
      .startOf('day')
      .subtract(process.env.CORN_DAYS_DIFF_TO_COMPARE_THREE, 'days')
    const users = await MODELS.UserDetails.findAll({
      where: {
        [MODELS.Op.or]: [
          {
            createdAt: {
              [MODELS.Op.between]: [
                fecha1.toDate(),
                fecha1.endOf('day').toDate(),
              ],
            },
          },
          {
            createdAt: {
              [MODELS.Op.between]: [
                fecha2.toDate(),
                fecha2.endOf('day').toDate(),
              ],
            },
          },
          {
            createdAt: {
              [MODELS.Op.between]: [
                fecha3.toDate(),
                fecha3.endOf('day').toDate(),
              ],
            },
          },
        ],
        profile_percentage: { [MODELS.Op.lte]: 80 },
        deleted_at: null,
      },
    })
    logger.warn(`🚀 ~ file: server.js:112 ~ job ~ users: ${users.length}`)
    for (const user of users) {
      const userInfoJSON = await MODELS.WhizUserCacheModel.findOne({
        where: {
          user_uuid: user.user_uuid,
          deleted_at: null,
        },
      })
      if (!userInfoJSON) continue
      const infoUser = JSON.parse(userInfoJSON.response)
      sendMail({
        to: {
          name: infoUser.person.name,
          last_name: infoUser.person.last_name,
          email: infoUser.email,
        },
        variables: {
          talent: infoUser,
          WEB_URL: process.env.WEB_URL,
        },
        mail_path: `mails/templates/ProfileIncomplete-${lang}.html`,
        subject: lang == 'es' ? 'Completa tu perfil' : 'Complete your profile',
      })
    }
  } catch (error) {
    logger.error('🚀 ~ file: server.js:140 ~ job ~ error:', error)
  }
})
// job.start()
