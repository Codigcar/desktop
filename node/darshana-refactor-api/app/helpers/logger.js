const logger = require('whiz-logger')({
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

module.exports = {
  logger: logger.whizLogger,
  whizMiddleware: logger.frameworks.express,
}
