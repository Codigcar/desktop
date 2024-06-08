export const ARC_ERROR = {
  EMAIL_GET_PROFILE: '[ARC] Error al acceder al perfil con email.',
  EMAIL_REGISTER: '[ARC] Error al crear una cuenta con email',
  EMAIL_LOGIN: '[ARC] Error al iniciar sesión con email.',
  RESET: '[ARC] Error al recuperar contraseña',
  VALID_EMAIL: '[ARC] Error al intentar enviar un correo de validación',
  UPDATE_PASSWORD: '[ARC] Error al intentar actualizar la contraseña',
  SUBSCRIPTIONS_ACTIVE: '[ARC] Error al ingresar a mi suscripción',
}

export const ARC_ERROR_MESSAGES = {
  300009: 'Email inválido',
  300011: 'Acceso denegado',
  100014: 'La cuenta está bloqueada',
  300020: 'No se encontró el perfil',
  300023: 'El usuario ya existe',
  300031: 'El usuario ya existe',
  300037: 'La contraseña debe ser restablecida',
  300039: 'El usuario ya existe',
  300040: 'Correo y/o contraseña incorrecta',
  300083: 'Contraseña insegura',
}

export const logErrors = (err, file = '.js') => {
  if (err instanceof TypeError) {
    // sentencias para manejar excepciones TypeError
    console.error(file, err)
  } else if (err instanceof RangeError) {
    // sentencias para manejar excepciones RangeError
    console.error(file, err)
  } else if (err instanceof EvalError) {
    // sentencias para manejar excepciones EvalError
    console.error(file, err)
  } else {
    console.error(file, JSON.stringify(err))
  }
}
