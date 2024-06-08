const mysqlm = require('mysqlm')
const fs = require('fs')
const path = require('path')

let config = {
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  charset: process.env.CHARSET,
  typeCast(field, defaultTypeCast) {
    if (field.type === 'BIT' && field.length === 1) {
      try {
        const bytes = field.buffer()
        return bytes[0] === 1
      } catch (error) {
        return false
      }
    }
    return defaultTypeCast()
  },
}

if (process.env.SSL_CA_PATH) {
  config.ssl.ca = fs.readFileSync(path.join(__dirname, process.env.SSL_CA_PATH))
}
if (process.env.SSL_CA_PATH) {
  config.ssl.key = fs.readFileSync(
    path.join(__dirname, process.env.SSL_KEY_PATH),
  )
}
if (process.env.SSL_CA_PATH) {
  config.ssl.cert = fs.readFileSync(
    path.join(__dirname, process.env.SSL_CERT_PATH),
  )
}

const connection = mysqlm.connect(config)

module.exports = { ...connection, mysqlm }
