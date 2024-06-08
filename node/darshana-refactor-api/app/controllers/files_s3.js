const multer = require('multer')
var multerS3 = require('multer-s3')
var aws = require('aws-sdk')
const { typeErrorMessages } = require('../helpers/enums')
const { logger } = require('../helpers/logger')

const config = {
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS,
}
const s3 = new aws.S3(config)

const upload_file = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET,
    key: function (req, file, cb) {
      req.fileName = Date.now() + '_' + file.originalname
      cb(null, req.fileName)
    },
  }),
}).single('file')

module.exports = {
  download: () => async (req, res) => {
    let fileKey = req.params.file_id
    console.log('Trying to download file', fileKey)
    const options = {
      Bucket: process.env.S3_BUCKET,
      Key: fileKey,
    }
    res.attachment(fileKey)
    let fileStream = s3.getObject(options).createReadStream()
    fileStream.pipe(res)
  },

  upload: () => async (req, res) => {
    upload_file(req, res, (error) => {
      if (error) {
        logger.error('Couldnt upload file')
        logger.error(error)
        return res.status(400).json({
          status: false,
          message: typeErrorMessages.CANT_UPLOAD_FILE,
          message_es: typeErrorMessages.CANT_UPLOAD_FILE_ES,
        })
      } else {
        res.json({
          status: true,
          data: req.file,
        })
      }
    })
  },
}
