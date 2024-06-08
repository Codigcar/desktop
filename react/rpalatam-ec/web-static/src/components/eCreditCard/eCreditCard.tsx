import React, { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import './creditCard.css'

import LOGOAMEX from '../../assets/images/icon_american.svg'
import LOGODINERS from '../../assets/images/icon_diners.svg'
import LOGOMASTERCARD from '../../assets/images/icon_mastercard.svg'
import ICONSECURITY from '../../assets/images/icon_security.svg'
import LOGOVISA from '../../assets/images/icon_visa.svg'

import * as CardPatterns from './creditCard.patterns'

type CreditCardProps = {
  cardNumber?: string
  dateExp?: string
  cvv?: string
  initialCardType: 'VISA' | 'MASTERCARD' | 'AMEX' | 'DINERS CLUB' | 'default'
  lastFour: string
  editing?: boolean
  editingCvv?: boolean
}

const ECreditCard: React.FC<CreditCardProps> = ({
  cardNumber,
  dateExp,
  editing,
  lastFour,
  initialCardType,
  cvv,
  editingCvv,
}) => {
  const [formatedCardNumber, setFormatedCardNumber] = useState('')
  const [currentCardType, setCurrentCardType] = useState(() => initialCardType)

  const getLogoCard = useCallback(() => {
    switch (currentCardType.toUpperCase()) {
      case 'AMEX':
        return LOGOAMEX
      case 'MASTERCARD':
        return LOGOMASTERCARD
      case 'VISA':
        return LOGOVISA
      case 'DINERS CLUB':
        return LOGODINERS
      default:
        return ''
    }
  }, [currentCardType])

  const updateCardType = useCallback(() => {
    const cleanCardNumber = `${cardNumber}`.replace(/\s/g, '')
    if (editing) {
      if (
        cleanCardNumber.match(
          new RegExp(CardPatterns.cardNumberPatterns.VISA.dinamyc),
        )
      ) {
        setCurrentCardType('VISA')
      }
      if (
        cleanCardNumber.match(
          new RegExp(CardPatterns.cardNumberPatterns.AMEX.dinamyc),
        )
      ) {
        setCurrentCardType('AMEX')
      }
      if (
        cleanCardNumber.match(
          new RegExp(CardPatterns.cardNumberPatterns.DINERS.dinamyc),
        )
      ) {
        setCurrentCardType('DINERS CLUB')
      }
      if (
        cleanCardNumber.match(
          new RegExp(CardPatterns.cardNumberPatterns.MASTERCARD.dinamyc),
        )
      ) {
        setCurrentCardType('MASTERCARD')
      }
    } else {
      setCurrentCardType(initialCardType)
    }
  }, [cardNumber, editing, initialCardType])

  useEffect(() => {
    updateCardType()
    setFormatedCardNumber(
      `${cardNumber}`
        .replace(/\s/g, '')
        .match(/.{1,4}/g)
        ?.join(' ')
        .substr(0, 19) || '',
    )
  }, [cardNumber, updateCardType, setFormatedCardNumber])

  const classes = classNames(
    'CreditCard',
    {
      active: editingCvv,
    },
    `card-${currentCardType.toLowerCase()}`,
  )

  return (
    <div className={classes}>
      <div className="CreditCard__front">
        <figure className="CreditCard__element CreditCard__icon-security">
          <img src={ICONSECURITY} alt="security-icon" />
        </figure>
        <figure className="CreditCard__element CreditCard__image">
          <img src={getLogoCard()} alt="card-type" />
        </figure>
        <div className="CreditCard__section-bottom">
          <div className="CreditCard__number">
            {!editing ? `**** **** **** ${lastFour}` : formatedCardNumber}
          </div>
          <div className="CreditCard__dateExp">{dateExp}</div>
        </div>
      </div>
      <div className="CreditCard__back">
        <div className="CreditCard__back-band" />
        <div className="CreditCard__cvv">
          <div className="CreditCard__cvv-band"></div>
          {cvv || '***'}
        </div>
      </div>
    </div>
  )
}

export default React.memo(ECreditCard)
