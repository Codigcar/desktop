const ImageService = require('../services/images.services')

module.exports = {
  upload: () => async (req, res) => {
    const { originalname, buffer, mimetype } = req.file
    const response = await ImageService.upload({
      originalname,
      buffer,
      mimetype,
    })
    if (!response.status) {
      return res.status(400).json(response)
    }

    return res.json(response)
  },
}
