class Logger {
  static instance: Logger
  private loggerInstance: any

  static getInstance() {
    if (!this.instance) {
      this.instance = new Logger()
    }
    return this.instance
  }

  constructor() {
    this.loggerInstance = require('whiz-logger')({
      environment: process.env.ENVIRONMENT || 'local',
      awsConfig: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        region: process.env.AWS_REGION,
      },
      projectName: process.env.LOG_GROUP_NAME,
      level: 'debug',
      enabledRequestId: true,
    })
  }

  info(...body:any) {
    this.loggerInstance.whizLogger.info(body)
  }
  
  debug(...body:any) {
    this.loggerInstance.whizLogger.debug(body)
  }
  
  error(...body:any) {
    this.loggerInstance.whizLogger.error(body)
  }

  init() {
    return this.loggerInstance.frameworks.express
  }
}
const logger = new Logger()
export default logger
