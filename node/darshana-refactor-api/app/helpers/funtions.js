const { MODELS } = require('./enums')

async function getInfoUserByUUID({ user_uuid = '' }) {
  try {
    const userInfoJSON = await MODELS.WhizUserCacheModel.findOne({
      where: {
        user_uuid: user_uuid,
        deleted_at: null,
      },
    })
    if (!userInfoJSON) throw new Error('user not found')
    const infoUser = JSON.parse(userInfoJSON.response)
    return infoUser
  } catch (error) {
    throw new Error(`file: funtions.js:34 ~ getUserByUUID ~ error: ${error}`)
  }
}

module.exports = { getInfoUserByUUID }
