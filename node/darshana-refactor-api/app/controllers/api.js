const { getErrorByCode, err_codes } = require('../config/err_codes')
const fs = require('fs').promises
const path = require('path')

module.exports = {
  getErrors: () => async (req, res) => {
    res.json({
      status: true,
      data: err_codes,
    })
  },

  getApiInfo: () => async (req, res) => {
    try {
      const package = require('../../package.json')
      res.json({
        status: true,
        data: {
          name: package.name,
          version: package.version,
        },
      })
    } catch (error) {
      res.json({
        status: false,
        ...getErrorByCode(30),
      })
    }
  },

  getLogsList: () => async (req, res) => {
    try {
      let files = await fs.readdir(path.join(__dirname, '../../logs'))
      res.json({
        status: true,
        data: files,
      })
    } catch (error) {
      res.json({
        status: false,
        ...getErrorByCode(30),
      })
    }
  },

  getLogs: () => async (req, res) => {
    try {
      let files = await fs.readdir(path.join(__dirname, '../../logs'))

      files = files.filter((f) => f == req.query.log)

      if (files.length > 1) {
        return res.json({
          status: false,
          message: 'Solo puedes ver un archivo .log por consulta',
        })
      }
      if (files.length < 1) {
        return res.json({
          status: false,
          message: 'Archivo .log no encontrado',
        })
      }

      return res.download(path.join(__dirname, '../../logs', files[0]))
    } catch (error) {
      console.log(error)
      res.json({
        status: false,
        ...getErrorByCode(30),
        error,
      })
    }
  },
}
