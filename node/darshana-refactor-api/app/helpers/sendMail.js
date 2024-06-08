const whiz = require('../services/whiz')
const ejs = require('ejs')
const fetch = require('node-fetch')
const { logger } = require('../helpers/logger')

async function sendMail({ to, variables, mail_path, subject = '' }) {
  console.log('sending email')
  try {
    const pathEmail = process.env.WEB_URL + '/' + mail_path
    let get_html = await fetch(pathEmail)
    let raw_html = await get_html.text()
    let template = ejs.compile(raw_html)
    const email = {
      sender: {
        email: process.env.EMAIL_SENDER_EMAIL,
        name: process.env.EMAIL_SENDER_NAME,
      },
      addressee: { email: to.email, name: to.name + ' ' + to.last_name },
      subject: subject,
      template: template(variables),
    }
    let r = await whiz.mail.send(email)
    if (r.status !== true) throw r.message
    console.log('email sended')
  } catch (error) {
    logger.error(
      '🚀 ~ file: sendMail.js:26 ~ sendMail ~ error:',
      JSON.stringify(error),
    )
  }
}

module.exports = sendMail
