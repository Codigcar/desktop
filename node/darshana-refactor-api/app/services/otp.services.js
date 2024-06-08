const sendMail = require('../helpers/sendMail')
const recoveryCodesModel = require('../models/recovery_codes')

class OTPService {
  async generateCode() {
    let tries = 10
    let code = Math.random().toString().substring(2, 8)
    for (let i = 0; i < tries; i++) {
      const recoveryCode = await recoveryCodesModel.getOneWhere({
        equals: { code: code },
      })
      if (!recoveryCode) return code
      code = Math.random().toString().substring(2, 8)
    }
  }

  sendMailOTP({ name, last_name, email, lang, code }) {
    sendMail({
      to: {
        name,
        last_name,
        email,
      },
      variables: {
        WEB_URL: process.env.WEB_URL,
        code,
      },
      mail_path: `mails/templates/VerificationAccount-${lang}.html`,
      subject: lang == 'es' ? 'Codigo de Verificación' : 'Verification code',
    })
  }

  async generateOTP({ user_uuid, name, last_name, email, lang = 'en' }) {
    try {
      const code = await this.generateCode()

      const recoveryCodeInput = {
        user_uuid,
        code,
      }

      const exists = await recoveryCodesModel.getOneWhere({
        equals: { user_uuid },
      })

      if (exists) {
        await recoveryCodesModel.update({
          id: exists.id,
          ...recoveryCodeInput,
        })
      } else {
        await recoveryCodesModel.create(recoveryCodeInput)
      }

      this.sendMailOTP({ name, last_name, email, lang, code })

      return { status: true }
    } catch (error) {
      console.log({ error })
      return { status: false, message: error }
    }
  }

  async verify({ user_uuid, code }) {
    return await recoveryCodesModel.getOneWhere({
      equals: { user_uuid, code },
    })
  }
}

module.exports = new OTPService()
