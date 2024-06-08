const jwt = require('jsonwebtoken')
const aobj = require('aobj')
const whizService = require('../services/whiz')
const userModel = require('../models/users_cache')
const userDetailsModel = require('../models/user_details')

const milliseconds = (h = 0, m = 0, s = 0) => (h * 60 * 60 + m * 60 + s) * 1000

let generateToken = ({ uuid, role }) => {
  return encodeToken({
    uuid,
    role,
    expires_at: Date.now() + milliseconds(24), // 24 Hours require(now
  })
}

let encodeToken = (value) => {
  return jwt.sign(value, process.env.SECRET)
}

let decodeToken = (value) => {
  try {
    return jwt.verify(value, process.env.SECRET)
  } catch (error) {
    return null
  }
}

let verifyHeaders = (headers = {}) => {
  if (!aobj.has(headers, 'authorization')) {
    return {
      status: false,
      message: 'No se encontró la cabezera Authorization',
    }
  }
  const authorization = headers.authorization
  if (!authorization.startsWith('Bearer ')) {
    return { status: false, message: 'Access token no es valido' }
  }
  return {
    status: true,
    token: authorization.substring(7, authorization.length),
  }
}

let validateUser = async (uuid) => {
  let user = await userModel.getByUuid(uuid)
  if (!user) {
    const response = await whizService.user.get(uuid)
    user = await userModel.create({
      full_name:
        response.data.person.name + ' ' + response.data.person.last_name,
      uuid,
    })
  }
  return user
}

let authorize = (role) => async (req, res, next) => {
  let headersVerification = verifyHeaders(req.headers)

  if (headersVerification.status !== true) {
    return res.json(headersVerification)
  }

  const authorizationToken = headersVerification.token
  const token = decodeToken(authorizationToken)
  if (!token) {
    return res.json({ status: false, message: 'Error en el token' })
  }
  if (role && role !== token.role) {
    return res.json({ status: false, message: 'Rol de token incorrecto' })
  }
  if (
    token.role !== process.env.WHIZ_API_ROLE_ADMIN &&
    token.role !== process.env.WHIZ_API_ROLE_FORUM_ADMIN &&
    token.role !== process.env.WHIZ_API_ROLE_USER
  ) {
    return res.json({ status: false, message: 'Rol de token desconocido' })
  }
  const user = await validateUser(token.uuid)
  let ud = await userDetailsModel.getOneWhere({
    equals: { user_uuid: token.uuid },
  })
  if (!ud && token.role == process.env.WHIZ_API_ROLE_USER)
    return res.json({ status: false, message: 'Usuario no registrado' })
  if (!req.session) req.session = {}
  req.session.user_uuid = token.uuid
  req.session.role_uuid = token.role
  req.session.role = token.role
  req.session.user_name = (user && user.full_name) || ''
  req.session.token = authorizationToken
  await next()
}

module.exports = {
  generateToken,
  decodeToken,
  verifyHeaders,
  authorize,
}
