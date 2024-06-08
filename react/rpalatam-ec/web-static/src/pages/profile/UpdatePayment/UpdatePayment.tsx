import { FormikHelpers, useFormik } from 'formik'
import React, { useCallback, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import ECreditCard from '../../../components/eCreditCard'
import ERibbon from '../../../components/eRibbon'
import InputComponent from '../../../system/input'
import './payment.css'

import * as methods from './formMethods'

type UpdatePaymentProps = {
  updateMethod: (data: any) => Promise<void>
  cardType: 'VISA' | 'MASTERCARD' | 'DINERS CLUB' | 'AMEX'
  lastFour: string
  callback?: any
}

const UpdatePayment: React.FC<UpdatePaymentProps & RouteComponentProps> = ({
  history,
  updateMethod = () => {},
  cardType,
  lastFour,
  callback,
}) => {
  const [edittingCvv, setEdittingCvv] = useState(false)

  const onSubmit = useCallback(
    async (values, { setSubmitting }: FormikHelpers<any>) => {
      setSubmitting(true)
      setEdittingCvv(false)
      try {
        await updateMethod({
          number: values.cardNumber.replace(/\s/g, ''),
          exp_month: values.expiryDate.split('/')[0],
          exp_year: values.expiryDate.split('/')[1],
          method: methods.getCardType(values.cardNumber),
          cvv: values.cvv,
        })
        history.goBack()
        setSubmitting(false)
        callback()
      } catch (error) {
        console.error(error)
        setSubmitting(false)
      }
    },
    [updateMethod, callback, history],
  )

  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue,
    isSubmitting,
  } = useFormik({
    onSubmit,
    initialValues: {
      cvv: '',
      cardNumber: '',
      expiryDate: '',
    },
    validate: methods.validate,
  })

  return (
    <section className="internal-page">
      <ERibbon
        content={{
          seccion: {
            nombre: 'Método de Pago',
          },
        }}
        history={history}
      />
      <div className="safe-area-pt-48 safe-area-pb pt-48">
        <div className="UpdatePayment__form-wrapper">
          <ECreditCard
            cardNumber={values.cardNumber}
            editing={!!values.cardNumber}
            dateExp={values.expiryDate}
            initialCardType={cardType}
            lastFour={lastFour || '****'}
            cvv={values.cvv}
            editingCvv={edittingCvv}
          />
          <form onSubmit={handleSubmit} className="UpdatePayment__form">
            <InputComponent
              field={{
                onChange: (e: React.FormEvent<HTMLInputElement>) => {
                  const maskedStr =
                    e.currentTarget.value
                      .replace(/[\s-.\D]/g, '')
                      .match(/.{1,4}/g)
                      ?.join(' ')
                      .substr(0, 19) || ''
                  setFieldValue('cardNumber', maskedStr)
                },
                name: 'cardNumber',
                value: values.cardNumber,
                onBlur: handleBlur,
                maxLength: 19,
                autoComplete: 'cc-number',
              }}
              label="Número de tarjeta"
              form={{ touched, errors }}
              valid="number"
              type="tel"
              mode="numeric"
            />
            <div className="PaymentForm__input-group">
              <InputComponent
                field={{
                  name: 'expiryDate',
                  value: values.expiryDate,
                  onChange: (e: React.FormEvent<HTMLInputElement>) => {
                    const { value } = e.currentTarget
                    const formatedValue = value
                      .replace(/\D/g, '')
                      .split('')
                      .reduce((prev, current, index) => {
                        return index === 2
                          ? `${prev}/${current}`
                          : `${prev}${current}`
                      }, '')
                    setFieldValue('expiryDate', formatedValue)
                  },
                  maxLength: 7,
                }}
                valid="number"
                form={{ touched, errors }}
                label="F. de vencimiento"
                type="tel"
              />
              <InputComponent
                field={{
                  name: 'cvv',
                  value: values.cvv,
                  onChange: e => {
                    setEdittingCvv(true)
                    handleChange(e)
                  },
                  onFocus: () => {
                    setEdittingCvv(true)
                  },
                  onBlur: () => {
                    setEdittingCvv(false)
                  },
                  maxLength: methods.getMaxLengthByType(values.cardNumber),
                }}
                label="CVV"
                form={{ touched, errors }}
                type="tel"
                valid="number"
              />
            </div>
            <button
              className="login-button"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Actualizando...' : 'Actualizar'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default UpdatePayment
