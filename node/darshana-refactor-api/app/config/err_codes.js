const err_codes = [
  {
    message: 'Register failed',
    err_code: 1,
  },
  {
    message: 'The user was soft deleted',
    err_code: 2,
  },
  {
    message: 'Email is already being used, please try another one',
    err_code: 3,
  },
  {
    message:
      'The patient already have 1 appointment from current date, please try again tomorrow',
    err_code: 4,
  },
  {
    message: 'Product not found',
    err_code: 5,
  },
  {
    message: 'Unit Type not found',
    err_code: 6,
  },
  {
    message: 'Category not found',
    err_code: 7,
  },
  {
    message: 'Product sku is already registered',
    err_code: 8,
  },
  {
    message:
      'Appointment rate must be a valid integer between 0 and 10 (inclusive)',
    err_code: 9,
  },
  {
    message:
      'Appointment rate_app must be a valid integer between 0 and 10 (inclusive)',
    err_code: 10,
  },
  {
    message: 'Appointment doest belong to this doctor',
    err_code: 11,
  },
  {
    message: 'Couldnt upload image',
    err_code: 12,
  },
  {
    message: 'Appointment doesnt belong to current user',
    err_code: 13,
  },
  {
    message: 'Status not found',
    err_code: 14,
  },
  {
    message:
      'Invalid account. Role is Doctor but user is not associated to any doctor',
    err_code: 15,
  },
  {
    message:
      "There's another user using this email, please try again with a diferent one",
    err_code: 16,
  },
  {
    message: "There's another doctor using this medical school number",
    err_code: 17,
  },
  {
    message: 'id not found',
    err_code: 18,
  },
  {
    message: 'Register failed',
    err_code: 19,
  },
  {
    message: 'Missing parameters',
    err_code: 20,
  },
  {
    message: 'User is not registered',
    err_code: 21,
  },
  {
    message: 'User account is disabled',
    err_code: 22,
  },
  {
    message: "Invalid login attempt, password doesn't match",
    err_code: 23,
  },
  {
    message: 'Authorization Token is not valid',
    err_code: 24,
  },
  {
    message: 'Authorization Token expired',
    err_code: 25,
  },
  {
    message: 'User account that generated this access token is disabled',
    err_code: 26,
  },
  {
    message: 'You didnt pass the header Authorization',
    err_code: 27,
  },
  {
    message: 'Cannot read Authorization header. Must be Bearer <token>',
    err_code: 28,
  },
  {
    message: 'Access denied, action not allowed',
    err_code: 29,
  },
  {
    message: 'Unable to show api info',
    err_code: 30,
  },
  {
    message: 'Missing parameters in request body',
    err_code: 31,
  },
  {
    message: 'Missing parameters in request params',
    err_code: 32,
  },
  {
    message: 'Missing parameters in request query',
    err_code: 33,
  },
  {
    message: 'Req body is empty!',
    err_code: 34,
  },
  {
    message: 'Max amount of pending appointments per doctor reached',
    err_code: 35,
  },
  {
    message: 'Max amount of registered appointments per day reached',
    err_code: 36,
  },
  {
    message: 'Access token doesnt have a doctors id, please log in as doctor',
    err_code: 37,
  },
  {
    message: 'The appointment was soft deleted',
    err_code: 38,
  },
  {
    message: 'Patient not found',
    err_code: 39,
  },
  {
    message: 'Appointment is closed',
    err_code: 40,
  },
  {
    message:
      'Theres another chat associated to this appointment, close the previous chat before openning a new one',
    err_code: 41,
  },
  {
    message: 'Chat code not found',
    err_code: 42,
  },
  {
    message: 'Chat is closed',
    err_code: 43,
  },
  {
    message: 'Message object must have chat_code.',
    err_code: 44,
  },
  {
    message: 'Message object must have message.',
    err_code: 45,
  },
  {
    message: 'Message object cant have both doctors_id and patients_id.',
    err_code: 46,
  },
  {
    message: 'Message object must have doctors_id or patients_id.',
    err_code: 47,
  },
  {
    message: 'Chat table doctors id is not same as recieved doctors id',
    err_code: 48,
  },
  {
    message: 'Chat table patients id is not same as recieved patients id',
    err_code: 49,
  },
  {
    message: 'Patient is not registered as user',
    err_code: 50,
  },
  {
    message: 'Hay campos erróneos en la petición',
    err_code: 51,
  },
  {
    message: `Max amount of login attempts reached, please try again in ${process.env.MAX_LOGIN_ATTEMPTS_REACHED_WAIT_MINUTES} minutes`,
    err_code: 52,
  },
  {
    message: `Type must be 'ingreso' or 'salida'`,
    err_code: 53,
  },
]

function getErrorByCode(err_code = 0) {
  let c = err_codes.find((v) => v.err_code == err_code)
  return (
    c || {
      err_code: 0,
      message: 'Something went wrong',
    }
  )
}

module.exports = {
  getErrorByCode,
  err_codes,
}
