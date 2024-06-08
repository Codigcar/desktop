const sendMail = require('../helpers/sendMail')
const whizService = require('../services/whiz')

const getUserByEmail = async ({ email }) => {
  return await whizService.user.getByEmail({
    email: email,
    role: process.env.WHIZ_API_ROLE_USER,
  })
}

module.exports = {
  sendEmail: () => async (req, res) => {
    const { email, lang } = req.body
    const getUser = await getUserByEmail({ email })

    if (!getUser.status)
      return res.status(404).json({
        status: false,
        message: `User not found: ${email}`,
        message_es: `Usuario no encontrado: ${email}`,
      })

    sendMail({
      to: {
        name: getUser.data.person.name,
        last_name: getUser.data.person.last_name,
        email: getUser.data.email,
      },
      variables: {
        WEB_URL: process.env.WEB_URL,
      },
      mail_path: `mails/templates/complete-profile-${lang}.html`,
      subject: lang == 'es' ? 'Completa tu perfil' : 'Complete your profile',
    })

    res.json({
      status: true,
      message: 'Email sended',
      message_es: 'Correo enviado',
    })
  },
}
