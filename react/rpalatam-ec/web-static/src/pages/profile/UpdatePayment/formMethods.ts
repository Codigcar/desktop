import * as patterns from '../../../components/eCreditCard/creditCard.patterns'

type formValues = {
  cardNumber?: string
  expiryDate?: string
  cvv?: string
}

/**
 * Validations
 */

export function validate(values: formValues) {
  let errors: any = {}

  const cleanCardNumber = values.cardNumber?.replace(/\s/g, '')
  const validMatch = values.expiryDate!.match(/^(\d\d)\/(\d\d\d\d)$/)

  if (
    values.expiryDate === '' ||
    !patterns.cardExpiryDatePatterns.test(values.expiryDate!) ||
    !validMatch
  ) {
    errors.expiryDate = 'Fecha incorrecta'
  }

  if (validMatch) {
    const formMonth = Number(validMatch[1])
    const formYear = Number(validMatch[2])

    if (!(formMonth >= 0 && formMonth < 13)) {
      errors.expiryDate = 'Fecha incorrecta'
    }

    const formDate = new Date(formYear, formMonth - 1)
    if (formDate < new Date()) {
      errors.expiryDate = 'Fecha incorrecta'
    }
  }

  let validCvv = false
  const typeCVV = getCardType(`${values.cardNumber}`)
  if (patterns.cardCvvPatterns[typeCVV]?.matcher.test(`${values.cvv}`)) {
    validCvv = true
  }
  if (!validCvv) {
    errors.cvv = 'Código CVV inválido'
  }

  let validCard = false
  if (
    patterns.cardNumberPatterns.AMEX.completed.test(`${cleanCardNumber}`) ||
    patterns.cardNumberPatterns.DINERS.completed.test(`${cleanCardNumber}`) ||
    patterns.cardNumberPatterns.MASTERCARD.completed.test(
      `${cleanCardNumber}`,
    ) ||
    patterns.cardNumberPatterns.VISA.completed.test(`${cleanCardNumber}`)
  ) {
    validCard = true
  }
  if (!validCard) {
    errors.cardNumber = 'Número de tarjeta inválida'
  }
  return errors
}

/**
 * Utilities
 */

export const getCardType = (cardNumber: string): string => {
  const cleanedNumber = cardNumber.replace(/\s/g, '')
  let cardType = ''
  Object.keys(patterns.cardNumberPatterns).forEach(patternType => {
    if (!cardType) {
      if (
        patterns.cardNumberPatterns[patternType].completed.test(cleanedNumber)
      ) {
        cardType = patternType
      }
    }
  })
  return cardType
}

export const getMaxLengthByType = (cardNumber: string): number => {
  const cardType = getCardType(cardNumber)
  return patterns.cardCvvPatterns[cardType]?.maxLength || 3
}
