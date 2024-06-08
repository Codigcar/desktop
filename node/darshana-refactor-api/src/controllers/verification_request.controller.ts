module.exports = {
  create: () => async (request: any, res: any) => {
    const { MODELS } = require('../helpers/enums')
    try {
      const getCheckouts = await MODELS.ValidationCheckoutModel.findAll({
        where: {
          email: request.body.email,
        },
        order: [['createdAt', 'DESC']],
      })

      if (getCheckouts.length < 0) {
        throw 'no hay datos '
      }

      if (getCheckouts[0].datavalues?.verification_number > 0) {
        throw 'verification number bajos'
      }
      const verificationNumberCurrent =
        getCheckouts[0].dataValues.verification_number

      const newVerificationNumber = verificationNumberCurrent - 1

      await MODELS.ValidationCheckoutModel.update(
        { verification_number: newVerificationNumber },
        {
          where: {
            id: getCheckouts[0].id,
          },
        },
      )
      const verificationRequest = await MODELS.VerificationRequestModel.create({
        email_talent: request.body.emailTalent,
        url_link: request.body.urlLink,
      })
      return res.status(200).json({
        status: true,
        data: verificationRequest.dataValues,
      })
    } catch (err: any) {
      console.log('🚀 ~ err:', err)
      return res.status(400).json({ error: 'ocurrio un error' })
    }
  },

  update: () => async (request: any, res: any) => {
    const { MODELS } = require('../helpers/enums')
    try {
      const getCheckouts = await MODELS.ValidationCheckoutModel.findAll({
        where: {
          email: request.body.email,
        },
        order: [['createdAt', 'DESC']],
      })

      if (getCheckouts.length < 0) {
        throw 'no hay datos '
      }

      await MODELS.ValidationCheckoutModel.update(
        { verification_number: request.body.verification_number },
        {
          where: {
            id: getCheckouts[0].id,
          },
        },
      )
      const verificationCurrent = await MODELS.ValidationCheckoutModel.findByPk(
        getCheckouts[0].id,
      )
      console.log('verificationCurrent', verificationCurrent)
      return res.status(200).json({
        status: true,
        data: verificationCurrent.dataValues,
      })
    } catch (err: any) {
      console.log('🚀 ~ err:', err)
      return res.status(400).json({ error: 'ocurrio un error' })
    }
  },
  details: () => async (request: any, res: any) => {
    const { MODELS } = require('../helpers/enums')

    try {
      const getCheckouts = await MODELS.ValidationCheckoutModel.findAll({
        where: {
          email: request.query.email,
        },
        order: [['createdAt', 'DESC']],
      })
      return res.status(200).json({ data: getCheckouts })
    } catch (err: any) {
      console.log('🚀 ~ err:', err)
      res.status(400).send(`Webhook Error: ${err.message}`)
      return
    }
  },
}
