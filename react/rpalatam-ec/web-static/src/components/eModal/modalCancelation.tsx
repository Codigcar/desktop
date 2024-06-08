import classNames from 'classnames'
import { useFormik } from 'formik'
import React, { useCallback, useEffect, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './modal.css'
import '../../system/input/input.css'

import ModalText from './modalCancelText'
import Icon from '../../system/icon'
import Notification from '../../system/notification'
import { dateFormat } from '../../tools/tools'

type CancelationSteps = 'initialize' | 'benefits' | 'date' | 'confirm'
type ModalCancelationProps = {
  modalRef: any
  subscriptionDate: number
  cancelMethod: any
  brand: string
  callback: any
}

const reasonOptions = [
  {
    label: 'El precio es elevado',
    id: 'expensive',
  },
  {
    label: 'Cuenta con otra suscripción',
    id: 'unneeded',
  },
  {
    label: 'No estoy interesado en el contenido',
    id: 'uninterested',
  },
  {
    label: 'Otro motivo',
    id: 'customReason',
  },
]

type InitialValues = { reason?: string; detailReason?: string }

const ModalCancelation: React.FC<ModalCancelationProps> = ({
  modalRef,
  subscriptionDate,
  cancelMethod,
  brand,
  callback,
}) => {
  const [step, setStep] = useState<CancelationSteps>('initialize')
  const date = new Date(subscriptionDate)

  function validate(values: InitialValues) {
    const errors: InitialValues = {}
    if (!values.reason) {
      errors.reason = 'Debe especificar una razón'
    }
    if (values.reason === 'Otro motivo') {
      if (
        !values.detailReason ||
        values.detailReason.replace(/\s$/, '').length < 10
      ) {
        errors.detailReason = 'Mínimo 10 caracteres'
      }
      if (/['"!#%$&/<>]/g.test(values.detailReason!)) {
        errors.detailReason = 'Formato incorrecto o caracteres inválidos'
      }
    }

    return errors
  }

  async function submitCancelation(
    values: InitialValues,
    { setSubmitting, resetForm },
  ) {
    try {
      const reason =
        values.reason === 'Otro motivo'
          ? values.detailReason?.replace(/\s$/, '')
          : values.reason
      setSubmitting(true)
      await cancelMethod(reason)
      window.dataLayer?.push({
        event: 'SuscriptionActivity',
        category: 'PWA_Paywall',
        action: 'pwa_paywall_success_anulacion',
      })
      setSubmitting(false)
      modalRef.remove()
      Notification.success({
        content: 'Se anuló su suscripción correctamente',
        duration: 3,
      })
      resetForm()
    } catch (error) {
      if (error.code === '300059') {
        Notification.error({
          content: 'La suscripción ya se encuentra anulada',
          duration: 3,
        })
        modalRef.remove()
      } else {
        Notification.error({
          content: 'Ocurrió un error con la anulación, inténtelo nuevamente.',
          duration: 3,
        })
      }
      resetForm()
    } finally {
      callback()
    }
  }

  function renderContent() {
    switch (step) {
      case 'initialize':
        return ModalText[brand]?.initialize() || null
      case 'benefits':
        return ModalText[brand]?.benefits() || null
      case 'date':
        return (
          <p>
            Ten en cuenta que solo tendrás acceso a tu plan digital hasta el
            <b>{` ${dateFormat(`${date}`, 'small_v2')}`}</b>
          </p>
        )
      default:
        return ''
    }
  }

  function changeScene() {
    if (step === 'initialize') {
      setStep('benefits')
    } else if (step === 'benefits') {
      setStep('date')
    } else if (step === 'date') {
      setStep('confirm')
    } else if (step === 'confirm') {
      window.dataLayer?.push({
        event: 'SuscriptionActivity',
        category: 'PWA_Paywall',
        action: 'pwa_paywall_btn_close_anulacion',
      })
      modalRef.remove()
    }
  }

  const tagEventsHandler = useCallback(() => {
    switch (step) {
      case 'initialize':
        window.dataLayer?.push({
          event: 'SuscriptionActivity',
          category: 'PWA_Paywall',
          action: 'pwa_paywall_open_anulacion_step1',
        })
        break
      case 'benefits':
        window.dataLayer?.push({
          event: 'SuscriptionActivity',
          category: 'PWA_Paywall',
          action: 'pwa_paywall_open_anulacion_step2',
        })
        break
      case 'date':
        window.dataLayer?.push({
          event: 'SuscriptionActivity',
          category: 'PWA_Paywall',
          action: 'pwa_paywall_open_anulacion_step3',
        })
        break
      case 'confirm':
        window.dataLayer?.push({
          event: 'SuscriptionActivity',
          category: 'PWA_Paywall',
          action: 'pwa_paywall_open_anulacion_step4',
        })
        break
      default:
        throw new Error('Step should be initialized')
    }
  }, [step])

  const {
    values,
    handleSubmit,
    handleChange,
    isSubmitting,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      reason: '',
      detailReason: '',
    },
    onSubmit: submitCancelation,
    validate,
  })

  useEffect(() => {
    tagEventsHandler()
  }, [tagEventsHandler])

  function handleAnulationClick() {
    window.dataLayer?.push({
      event: 'SuscripcionActivity',
      category: 'PWA_Paywall',
      action: 'pwa_paywall_btn_finalizar_anulacion',
    })
  }

  function handleCloseModal() {
    modalRef.remove()
    window.dataLayer?.push({
      event: 'SuscriptionActivity',
      category: 'PWA_Paywall',
      action: 'pwa_paywall_btn_close_anulacion',
    })
  }

  function handleChangeArea(
    e: React.ChangeEvent<HTMLTextAreaElement>,
    setFieldValue: (field: string, value: any) => any,
  ) {
    const { value } = e.target
    const sanitizedValue = value.replace(/^\s/, '').replace(/\s{2,}/g, ' ')
    setFieldValue('detailReason', sanitizedValue)
  }

  return (
    <div className="is-modal">
      <div className="is-modal__content">
        <TransitionGroup>
          <CSSTransition
            key={step}
            timeout={{ enter: 450, exit: 450 }}
            classNames="fadeBottom"
          >
            <>
              <div className="register-content">
                <form onSubmit={handleSubmit}>
                  <div className="modal-cancel__head">
                    <h5 className="font-serif">Finalizar suscripción</h5>
                  </div>
                  <div className="modal-cancel__body">{renderContent()}</div>
                  {step === 'confirm' ? (
                    <div className="register-modal">
                      <div className="modal-cancel__body">
                        <p>
                          Antes de hacer efectiva la anulación, por favor,
                          cuéntanos los motivos por los que deseas anular tu
                          suscripción
                        </p>
                      </div>
                      <div className="modal-cancel__options-wrapper">
                        {reasonOptions.map(({ id, label }, i) => (
                          <label
                            htmlFor={id}
                            key={i}
                            className={classNames('modal-cancel__option', {
                              active: values.reason === label,
                            })}
                          >
                            <div className="modal-cancel__option-icon">
                              <Icon type="ios-checkmark" />
                            </div>
                            {label}
                            <input
                              type="radio"
                              name="reason"
                              value={label}
                              onChange={handleChange}
                              id={id}
                            />
                          </label>
                        ))}
                        {values.reason === 'Otro motivo' ? (
                          <>
                            <textarea
                              name="detailReason"
                              className={classNames(
                                'modal-cancel__option',
                                'area',
                                {
                                  active: values.reason === 'Otro motivo',
                                  invalid:
                                    errors.detailReason && touched.detailReason,
                                },
                              )}
                              placeholder="Ingresa el motivo de tu anulación"
                              value={values.detailReason}
                              onChange={e => handleChangeArea(e, setFieldValue)}
                              autoFocus
                            />
                            <span className="modal-cancel__error-message">
                              {errors.detailReason}
                            </span>
                          </>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                  <>
                    {step === 'confirm' ? (
                      <button
                        type="submit"
                        className="modal-cancel__button"
                        disabled={
                          values.reason === '' ||
                          !!errors.detailReason ||
                          isSubmitting
                        }
                        onClick={handleAnulationClick}
                      >
                        {isSubmitting ? 'Anulando...' : 'Anular suscripción'}
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="modal-cancel__button"
                        onClick={changeScene}
                      >
                        Continuar con la anulación
                      </button>
                    )}
                    <div className="modal-cancel-other-options">
                      <div>
                        <div>¿No deseas cancelar tu suscripción?</div>
                        <button type="button" onClick={handleCloseModal}>
                          Volver a mi suscripción
                        </button>
                      </div>
                    </div>
                  </>
                </form>
              </div>
            </>
          </CSSTransition>
        </TransitionGroup>
        <button type="button" className="btn-close" onClick={handleCloseModal}>
          Cerrar
        </button>
      </div>
    </div>
  )
}

export default ModalCancelation
