const WhizSDK = require('whiz-sdk-node').default
const whizUserCacheModel = require('../models/whiz_user_cache')

const whizService = WhizSDK({
  apiUrl: process.env.WHIZ_API_URL,
  clientId: process.env.WHIZ_API_ID,
  clientSecret: process.env.WHIZ_API_SECRET,
})

whizService.getUser = async (user_uuid) => {
  let userCache = await whizUserCacheModel.getByUuid(user_uuid)
  if (userCache) return { status: true, type: 'cache', data: userCache }
  let user = await whizService.user.get(user_uuid)
  if (user.status) {
    await whizUserCacheModel.saveByUuid(user.data.uuid, user.data)
  }
  return user
}

whizService.refreshUser = async (user_uuid) => {
  let user = await whizService.user.get(user_uuid)
  if (user.status) {
    await whizUserCacheModel.saveByUuid(user.data.uuid, user.data)
  }
}

module.exports = whizService
