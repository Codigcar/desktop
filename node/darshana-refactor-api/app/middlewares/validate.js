const validator = require('../helpers/validator')

const validate =
  (validationRule = {}) =>
  (req, res, next) => {
    validator(req.body, validationRule, {}, (err) => {
      if (err) {
        res.status(412).send({
          status: false,
          message: 'Validation error',
          message_es: 'Error de validación',
          errors: err,
        })
      } else {
        next()
      }
    })
  }

module.exports = validate
