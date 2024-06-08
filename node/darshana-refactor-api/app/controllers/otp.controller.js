const userDetailsModel = require('../models/user_details')
const whiz = require('../services/whiz')
const OTPService = require('../services/otp.services')

module.exports = {
  generate: () => async (req, res) => {
    const { email, lang } = req.body

    const isValidUser = await whiz.user.getByEmail({
      email,
      role: process.env.WHIZ_API_ROLE_USER,
    })

    if (!isValidUser.status)
      return res.status(404).json({
        status: false,
        message: 'User not found',
        message_es: isValidUser.message,
      })

    const userDetails = await userDetailsModel.getOneWhere({
      equals: { user_uuid: isValidUser.data.uuid },
    })

    if (!userDetails)
      return res.status(404).json({
        status: false,
        message: 'User not found in the database',
        message_es: 'Usuario no encontrado en esta base de datos',
      })

    // email verificado
    if (userDetails.verify_email === '1')
      return res.status(404).json({
        status: false,
        message: 'User already active',
        message_es: 'El usuario ya se encuentra verificado',
      })

    const { data } = isValidUser

    const response = await OTPService.generateOTP({
      user_uuid: data.uuid,
      name: data.person.name,
      last_name: data.person.last_name,
      email: data.email,
      lang,
    })

    if (!response.status)
      res.json({
        status: false,
        message: response.message,
      })

    res.json({
      status: true,
      message: 'Email sent with verification code',
      message_es: 'Correo enviado con el código de verificación',
    })
  },

  verify: () => async (req, res) => {
    const { email, code } = req.body
    const isValidUser = await whiz.user.getByEmail({
      email,
      role: process.env.WHIZ_API_ROLE_USER,
    })

    if (!isValidUser.status)
      return res.status(404).json({
        status: false,
        message: 'User not found',
        message_es: isValidUser.message,
      })

    const { data } = isValidUser

    const getCodeModel = await OTPService.verify({
      user_uuid: data.uuid,
      code,
    })

    if (!getCodeModel)
      return res.status(404).json({
        status: false,
        message: 'Invalid code',
        message_es: 'El Código no es válido',
      })

    const userDetails = await userDetailsModel.getOneWhere({
      equals: { user_uuid: getCodeModel.user_uuid },
    })

    if (!userDetails)
      return res.status(404).json({
        status: false,
        message: 'User not found in the database',
        message_es: 'Usuario no encontrado en esta base de datos',
      })

    await userDetailsModel.update({ id: userDetails.id, verify_email: true })

    return res.json({
      status: true,
      message: 'Email verified',
      message_es: 'Correo ya se encuentra verificado',
    })
  },
}
