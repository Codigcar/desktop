const { getErrorByCode } = require('../config/err_codes')
const { logger } = require('../helpers/logger')

const WhizSDK = require('whiz-sdk-node').default
const whiz_api = WhizSDK({
  apiUrl: process.env.WHIZ_API_URL,
  clientId: process.env.WHIZ_API_ID,
  clientSecret: process.env.WHIZ_API_SECRET,
})

class ImagenService {
  async upload({ originalname, buffer, mimetype }) {
    try {
      const image = await whiz_api.image.upload({
        imageBuffer: buffer,
        mimeType: mimetype,
        image: {
          tableName: 'a',
          tableKey: 'b',
          fileName: originalname,
        },
      })
      console.log('image: ', JSON.stringify(image))
      let image_url =
        'https://cdn.whiz.pe/api/v2/image/' + image.data.shift().uuid + '/png'

      return {
        status: true,
        data: image_url,
      }
    } catch (error) {
      logger.error(
        '🚀 ~ file: images.services.js:33 ~ ImagenService ~ upload ~ error:',
        error,
      )
      return { status: false, ...getErrorByCode(12) }
    }
  }
}

module.exports = new ImagenService()
