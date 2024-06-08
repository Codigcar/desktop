const { getErrorByCode } = require('../config/err_codes')
const aobj = require('aobj')

module.exports = (options = { body: [], params: [], query: [] }) => {
  return (req, res, next) => {
    if (aobj.has(req.body, options.body) !== true) {
      return res.status(400).json({
        status: false,
        ...getErrorByCode(31),
        missing: options.body.filter((v) => !Object.keys(req.body).includes(v)),
        required: options.body,
      })
    }
    if (aobj.has(req.params, options.params) !== true) {
      return res.status(400).json({
        status: false,
        ...getErrorByCode(32),
        missing: options.params.filter(
          (v) => !Object.keys(req.params).includes(v),
        ),
        required: options.params,
      })
    }
    if (aobj.has(req.query, options.query) !== true) {
      return res.status(400).json({
        status: false,
        ...getErrorByCode(33),
        missing: options.query.filter(
          (v) => !Object.keys(req.query).includes(v),
        ),
        required: options.query,
      })
    }
    next()
  }
}
