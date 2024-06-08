const crypto = require('crypto')

async function hash(value, secret) {
  return crypto.createHmac('sha256', secret).update(value).digest('hex')
}

module.exports = hash
