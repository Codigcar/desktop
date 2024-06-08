export const cardNumberPatterns = {
  VISA: {
    completed: /^(4)(\d{12}|\d{15})$|^(606374\d{10}$)/,
    dinamyc: '^4[0-9]',
  },
  MASTERCARD: {
    completed: /^(5[1-5]\d{14}$)|^(2(?:2(?:2[1-9]|[3-9]\d)|[3-6]\d\d|7(?:[01]\d|20))\d{12}$)/,
    dinamyc: '^5[1-5][0-9]',
  },
  AMEX: {
    completed: /^3[47][0-9]{13}$/,
    dinamyc: '^3[47][0-9]',
  },
  DINERS: {
    completed: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    dinamyc: '^3(?:0[0-5]|[68][0-9])[0-9]',
  },
}

export const cardCvvPatterns = {
  VISA: {
    matcher: /^\d{3}$/,
    maxLength: 3,
  },
  MASTERCARD: {
    matcher: /^\d{3}$/,
    maxLength: 3,
  },
  AMEX: {
    matcher: /^\d{3,4}$/,
    maxLength: 4,
  },
  DINERS: {
    matcher: /^\d{3}$/,
    maxLength: 3,
  },
}

export const cardExpiryDatePatterns = /^\d{2}\/\d{4}/
