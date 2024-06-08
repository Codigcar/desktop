const Validator = require('validatorjs') // https://www.npmjs.com/package/validatorjs

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/
Validator.register(
  'strict',
  (value) => passwordRegex.test(value),
  'La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número',
)
Validator.register(
  'dni_or_ce',
  (value) => value === 'dni' || value === 'ce',
  "El tipo de documento debe ser 'dni' o 'ce'",
)

const validatorES = (body, rules, customMessages) =>
  new Promise((resolve) => {
    Validator.useLang('es')
    const validation = new Validator(body, rules, customMessages)
    validation.passes(() => resolve(null))
    validation.fails(() => resolve(validation.errors))
  })

const validatorEN = (body, rules, customMessages) =>
  new Promise((resolve) => {
    Validator.useLang('en')
    const validation = new Validator(body, rules, customMessages)
    validation.passes(() => resolve(null))
    validation.fails(() => resolve(validation.errors))
  })

const validator = (body, rules, customMessages, callback) => {
  Promise.all([
    validatorES(body, rules, customMessages),
    validatorEN(body, rules, customMessages),
  ])
    .then((errors) => {
      let err = {}
      if (errors[0]) err['es'] = errors[0].errors
      if (errors[1]) err['en'] = errors[1].errors
      callback(errors[0] && errors[1] ? err : null, errors[0] && errors[1])
    })
    .catch(() => callback(null, true))
}

module.exports = validator
