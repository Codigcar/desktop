import { config } from 'dotenv'
config()
import Server from './server'
import { MongoDB } from './utils/db/mongo.db'
import RabbitMQ from './rabbitmq'

const server = new Server()
const db = new MongoDB()

server.middlewares()
db.dbInitConnect()
server.routes()
server.handleErrors()
!(process.env.IS_ENABLE_RABBITMQ === 'false') && RabbitMQ.getInstance()
