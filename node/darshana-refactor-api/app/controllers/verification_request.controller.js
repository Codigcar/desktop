'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
module.exports = {
  create: () => (request, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      var _a
      const { MODELS } = require('../helpers/enums')
      try {
        const getCheckouts = yield MODELS.ValidationCheckoutModel.findAll({
          where: {
            email: request.body.email,
          },
          order: [['createdAt', 'DESC']],
        })
        if (getCheckouts.length < 0) {
          throw 'no hay datos '
        }
        if (
          ((_a = getCheckouts[0].datavalues) === null || _a === void 0
            ? void 0
            : _a.verification_number) > 0
        ) {
          throw 'verification number bajos'
        }
        const verificationNumberCurrent =
          getCheckouts[0].dataValues.verification_number
        const newVerificationNumber = verificationNumberCurrent - 1
        yield MODELS.ValidationCheckoutModel.update(
          { verification_number: newVerificationNumber },
          {
            where: {
              id: getCheckouts[0].id,
            },
          },
        )
        const verificationRequest =
          yield MODELS.VerificationRequestModel.create({
            email_talent: request.body.emailTalent,
            url_link: request.body.urlLink,
          })
        return res.status(200).json({
          status: true,
          data: verificationRequest.dataValues,
        })
      } catch (err) {
        console.log('🚀 ~ err:', err)
        return res.status(400).json({ error: 'ocurrio un error' })
      }
    }),
  update: () => (request, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const { MODELS } = require('../helpers/enums')
      try {
        const getCheckouts = yield MODELS.ValidationCheckoutModel.findAll({
          where: {
            email: request.body.email,
          },
          order: [['createdAt', 'DESC']],
        })
        if (getCheckouts.length < 0) {
          throw 'no hay datos '
        }
        yield MODELS.ValidationCheckoutModel.update(
          { verification_number: request.body.verification_number },
          {
            where: {
              id: getCheckouts[0].id,
            },
          },
        )
        const verificationCurrent =
          yield MODELS.ValidationCheckoutModel.findByPk(getCheckouts[0].id)
        console.log('verificationCurrent', verificationCurrent)
        return res.status(200).json({
          status: true,
          data: verificationCurrent.dataValues,
        })
      } catch (err) {
        console.log('🚀 ~ err:', err)
        return res.status(400).json({ error: 'ocurrio un error' })
      }
    }),
  details: () => (request, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const { MODELS } = require('../helpers/enums')
      try {
        const getCheckouts = yield MODELS.ValidationCheckoutModel.findAll({
          where: {
            email: request.query.email,
          },
          order: [['createdAt', 'DESC']],
        })
        return res.status(200).json({ data: getCheckouts })
      } catch (err) {
        console.log('🚀 ~ err:', err)
        res.status(400).send(`Webhook Error: ${err.message}`)
        return
      }
    }),
}
