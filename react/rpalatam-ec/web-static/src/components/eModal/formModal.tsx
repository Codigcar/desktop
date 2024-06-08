import Identity from '@arc-publishing/sdk-identity'
import {
  SignUpProfile,
  UserProfile,
} from '@arc-publishing/sdk-identity/lib/sdk/userProfile'
import * as Sentry from '@sentry/browser'
import { Formik, Field } from 'formik'
import * as React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import ButtonCorreo from '../../system/button/correo'
import FacebookLogin from '../../system/button/facebook'
import GoogleLogin from '../../system/button/google'
import Notification from '../../system/notification'
import {
  getProfileUpdate,
  verifyCredential,
  signCustomize,
} from '../../tools/arc'
import { ARC_ERROR, ARC_ERROR_MESSAGES, logErrors } from '../../tools/errors'
import Icon from '../../system/icon'
import CustomInputComponent from '../../system/input'
import { RN_SCREENS_STORY, RN_SCREENS_STORY_V2 } from '../../tools/flags'
import NativeAPI from '../../tools/nativeApi'
import { newTrace } from '../../tools/suscription'
import {
  isFacebookActive,
  isGoogleActive,
  getDomain,
  pianoIdAvailable,
} from '../../tools/tools'

const PIANO_ID_AVAILABLE = pianoIdAvailable()

const MESSAGES = {
  'depor.com': ['Contenido premium', 'Eventos exclusivos', 'Grandes premios'],
  'elcomercio.pe': [
    'Acceder a más de 400 noticias nuevas al día e informes especiales',
    'Escuchar podcasts con las primeras noticias del día',
    'Guardar tus notas favoritas',
  ],
  'gestion.pe': [
    'Acceder a más de 100 noticias nuevas al día e informes especiales',
    'Guardar tus notas favoritas',
  ],
  'peru21.pe': ['Perú21 TV', 'Noticias del día', 'Notas premium'],
  'trome.pe': ['Beneficios exclusivos'],
}

const customize = signCustomize()

const RegisterModal: React.FC<any> = props => {
  const { blocking, callback, children, modalRef, type, track } = props
  const [step, setStep] = React.useState(() =>
    PIANO_ID_AVAILABLE ? 'loginNativeSide' : type,
  )
  const [prevSteps, setPrevSteps] = React.useState<string[]>([])
  const [latestEmail, setLatestEmail] = React.useState('')
  const [resendAvailable, setResendAvailable] = React.useState<boolean>(false)
  const [timeToResend, setTimeToResend] = React.useState(30)
  const dataTreatmentInput = React.createRef<HTMLInputElement>()

  const domain = getDomain()

  React.useEffect(() => {
    if (step === 'verifyEmail') {
      const timeout = setTimeout(() => {
        setTimeToResend(timeToResend - 1)
      }, 1000)

      if (timeToResend === 0) {
        setResendAvailable(true)
        clearTimeout(timeout)
      }

      return () => {
        clearTimeout(timeout)
      }
    } else {
      setResendAvailable(false)
      setTimeToResend(30)
    }
  }, [timeToResend, step])

  function getSocialMediaButtons() {
    const google = isGoogleActive()
    const facebook = isFacebookActive()
    return facebook || google ? (
      <div className="button__fb-wrapper">
        {facebook ? <FacebookLogin callback={callback} track={track} /> : null}
        {google ? <GoogleLogin callback={callback} track={track} /> : null}
        {step === 'registerWithEmail' ? (
          <p>o regístrate con tu correo</p>
        ) : null}
      </div>
    ) : null
  }

  function validateForm(values) {
    const errors: {
      email?: string
      password?: string
      terminos?: string
      mobilePhone?: string
    } = {}
    if (!values.email) {
      errors.email = 'Este campo es requerido'
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i.test(values.email)
    ) {
      errors.email = 'Correo inválido'
    }
    if (step === 'loginWithEmail' && !values.password) {
      errors.password = 'Este campo es requerido'
    }
    if (step === 'registerWithEmail') {
      if (!values.password) {
        errors.password = 'Este campo es requerido'
      } else if (/\s/g.test(values.password)) {
        errors.password = 'No se permiten espacios vacíos'
      } else if (values.password.length < 8) {
        errors.password = 'Mínimo 8 caracteres'
      }
      if (!values.terminos) {
        errors.terminos = 'Es necesario aceptar los términos'
      }
      if (
        domain === 'gestion.pe' &&
        localStorage.getItem('expInputPhoneRequired') &&
        !values.mobilePhone
      ) {
        errors.mobilePhone = 'Este campo es requerido'
      }
      if (
        values.mobilePhone &&
        (String(values.mobilePhone).length < 9 ||
          String(values.mobilePhone).length > 12)
      ) {
        errors.mobilePhone = 'Se aceptan entre 9 y 12 dígitos'
      }
    }
    return errors
  }

  async function onSubmitForm(values, { setSubmitting }) {
    const emailRegexPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    async function loginWithEmail() {
      try {
        await Identity.login(values.email, values.password, {
          cookie: true,
          rememberMe: true,
        })
        const user = (await Identity.getUserProfile()) as UserProfile
        if (!emailRegexPattern.test(`${user.displayName}`)) {
          callback('success', user)
        } else if (!user.emailVerified) {
          await Identity.requestVerifyEmail(latestEmail)
          await Identity.logout()
          setStep('verifyEmail')
          blocking && setPrevSteps([])
        } else {
          callback('success', user)
        }
        newTrace.loginWithEmail(user, track)
      } catch (error) {
        if (error.code === '130051') {
          await Identity.requestVerifyEmail(latestEmail)
          setStep('verifyEmail')
          blocking && setPrevSteps([])
        } else {
          errorLogin(error)
        }
      }
    }

    if (step === 'registerWithEmail') {
      const dataTreatment = dataTreatmentInput.current?.checked
      const update = getProfileUpdate(
        { email: values.email },
        'email',
        track.category === 'swh',
        dataTreatment,
      )
      const _profile: SignUpProfile = { ...update, emailVerified: false }
      if (values.mobilePhone) {
        update['contacts'] = [{ phone: values.mobilePhone, type: 'PRIMARY' }]
      }
      try {
        await Identity.signUp(
          {
            userName: values.email,
            credentials: values.password,
          },
          _profile,
          true,
          true,
        )
        await Identity.logout()
        setStep('verifyEmail')
      } catch (err) {
        const message = ARC_ERROR_MESSAGES[err.code]
        Notification.error({
          content:
            message || 'Hubo un error en el registro. Inténtalo nuevamente.',
        })
        if (!message) {
          logErrors(err, 'formModal.js')
          const error = new Error(`${ARC_ERROR.EMAIL_REGISTER} ${err.message}`)
          Sentry.captureException(error)
        }
        setSubmitting(false)
      }
      return
    }

    async function resetPassword() {
      await Identity.requestResetPassword(values.email)
      setStep('resetPasswordConfirm')
      setPrevSteps([])
    }

    function errorResetPassword(err) {
      Notification.error({
        content: 'Hubo un error al restablecer la contraseña.',
      })
      logErrors(err, 'formModal.js')
      const error = `${ARC_ERROR.RESET} ${err.message}`
      Sentry.captureMessage(error)
      setSubmitting(false)
    }

    if (step === 'resetPassword') {
      try {
        await resetPassword()
      } catch (err) {
        if (err.code === '300030') {
          try {
            await verifyCredential(values.email, '', '1')
            await setTimeout(async () => {
              try {
                await resetPassword()
              } catch (error) {
                if (error.code === '300030') {
                  Notification.error({ content: 'El correo no existe.' })
                  setSubmitting(false)
                  return
                }
                errorResetPassword(error)
              }
            }, 1000)
          } catch (error) {
            Notification.error({ content: 'El correo no existe.' })
            setSubmitting(false)
          }
        } else {
          errorResetPassword(err)
        }
      }
      return
    }

    function errorLogin(err) {
      const error = ARC_ERROR_MESSAGES[err.code]
      if (!error) {
        logErrors(err, 'formModal.js')
        const errLogin = new Error(`${ARC_ERROR.EMAIL_LOGIN} ${err.message}`)
        Sentry.captureException(errLogin)
      }
      Notification.error({
        content:
          error || 'Hubo un error al iniciar sesión. Inténtalo nuevamente.',
      })
      setSubmitting(false)
    }

    try {
      await loginWithEmail()
    } catch (err) {
      if (
        err.code === '300037' ||
        err.code === '300030' ||
        err.code === '300040'
      ) {
        try {
          const data = await verifyCredential(
            values.email,
            values.password,
            '1',
          )
          if (data.retry) {
            window.dataLayer?.push({
              event: 'SuscriptionActivity',
              category: 'PWA_Sign_Wall_Hard',
              action: 'pwa_swh_relogin_user',
              label: window.location.href.replace(window.location.origin, ''),
              value: 0,
            })
            await setTimeout(async () => {
              try {
                await loginWithEmail()
              } catch (error) {
                errorLogin(error)
              }
            }, 1000)
          } else {
            Notification.error({
              content: 'Correo y/o contraseña incorrecta',
            })
            setSubmitting(false)
          }
        } catch {
          errorLogin(err)
        }
      } else {
        errorLogin(err)
      }
    }
  }

  function handleVerifyEmail() {
    Identity.requestVerifyEmail(latestEmail)
      .then(res => {
        if (res) {
          setStep('default')
          setPrevSteps([])
          Notification.success({
            content: 'Te hemos enviado un correo para verificar tu email',
            duration: 6,
          })
        } else {
          modalRef.remove()
          Notification.error({
            content: 'No pudimos verificar tu cuenta. Inténtalo mas tarde',
          })
        }
      })
      .catch(err => {
        modalRef.remove()
        if (err.code === '300050') {
          Notification.success({
            content: 'Email verificado correctamente',
            duration: 5,
          })
        } else {
          const error = new Error(`${ARC_ERROR.VALID_EMAIL} ${err.message}`)
          Sentry.captureException(error)
          Notification.error({
            content: 'No pudimos verificar tu cuenta. Inténtalo más tarde.',
          })
        }
      })
  }

  function getContent() {
    const beneficios = MESSAGES[domain]
    const isPhoneRequired = localStorage.getItem('expInputPhoneRequired')
    switch (step) {
      case 'facebook':
        return (
          <>
            {children}
            {getSocialMediaButtons()}
            <div className="register-other-options">
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setStep('loginWithEmail')
                    setPrevSteps([...prevSteps, 'facebook'])
                  }}
                >
                  Ingresar con tu email
                </button>
              </div>
            </div>
          </>
        )
      case 'registerWithEmail':
      case 'loginWithEmail':
        return (
          <>
            <div className="swh-message">
              <h5 className="font-serif">
                {step === 'loginWithEmail'
                  ? 'Ingresa con tu cuenta'
                  : 'Accede fácilmente'}
              </h5>
            </div>
            {step === 'registerWithEmail' ? getSocialMediaButtons() : null}
            <Formik
              initialValues={{
                email: '',
                password: '',
                terminos: false,
                mobilePhone: '',
              }}
              validate={validateForm}
              onSubmit={onSubmitForm}
            >
              {({
                errors,
                isSubmitting,
                handleChange,
                handleSubmit,
                handleBlur,
                touched,
                values,
              }) => (
                <form
                  className={
                    isPhoneRequired
                      ? 'form-register__test-b'
                      : 'form-register__test-a'
                  }
                  onSubmit={handleSubmit}
                  autoComplete="off"
                >
                  <CustomInputComponent
                    field={{
                      name: 'email',
                      value: values.email,
                      onChange: evt => {
                        setLatestEmail(evt.target.value)
                        handleChange(evt)
                      },
                      onBlur: handleBlur,
                    }}
                    label="Correo electronico"
                    type="email"
                    form={{ errors, touched }}
                    valid=""
                    mode="email"
                    disabled={isSubmitting}
                  />
                  <Field
                    name="password"
                    component={CustomInputComponent}
                    label="Contraseña"
                    type="password"
                  />
                  {step === 'registerWithEmail' ? (
                    <>
                      {domain === 'gestion.pe' ? (
                        <>
                          <Field
                            name="mobilePhone"
                            component={CustomInputComponent}
                            label="Teléfono"
                            type="text"
                            valid="number"
                            mode="tel"
                          />
                          <span className="input-required">
                            (*) campos obligatorios
                          </span>
                        </>
                      ) : null}
                      <div className="input-checkbox">
                        {domain !== 'elcomercio.pe' &&
                        domain !== 'gestion.pe' ? null : (
                          <div className="input-group-checkbox">
                            <label htmlFor="terminos">
                              Autorizo el uso de mis datos para{' '}
                              <a
                                href={customize.tratamientoDatos}
                                rel="noopener noreferrer"
                                target="_blank"
                              >
                                fines adicionales
                              </a>
                            </label>
                            <div style={{ position: 'relative' }}>
                              <input
                                name="dataTreatment"
                                type="checkbox"
                                defaultChecked
                                className="text-input"
                                ref={dataTreatmentInput}
                              />
                              <Icon type="ios-checkmark" />
                            </div>
                          </div>
                        )}
                        <div className="input-group-checkbox">
                          <label htmlFor="terminos">
                            Al crear la cuenta, acepto los{' '}
                            <a
                              href={customize.terminos}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              Términos y Condiciones
                            </a>
                            {' y '}
                            <a
                              href={customize.politicas}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              Políticas de Privacidad
                            </a>
                          </label>
                          <div style={{ position: 'relative' }}>
                            <input
                              name="terminos"
                              type="checkbox"
                              onChange={handleChange}
                              checked={values.terminos}
                              className={
                                errors.terminos && touched.terminos
                                  ? 'text-input error'
                                  : 'text-input'
                              }
                            />
                            <Icon type="ios-checkmark" />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : null}
                  <button
                    className="login-button"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {step === 'loginWithEmail'
                      ? 'Iniciar sesión'
                      : 'Registrarme'}
                  </button>
                </form>
              )}
            </Formik>
            {step === 'loginWithEmail' ? (
              <div className="register-other-options">
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setStep('resetPassword')
                      setPrevSteps([...prevSteps, 'loginWithEmail'])
                    }}
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
              </div>
            ) : (
              <div className="register-other-options">
                {beneficios ? (
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        setStep('bonusRegister')
                        setPrevSteps([...prevSteps, 'registerWithEmail'])
                      }}
                    >
                      Conoce los beneficios de registrarte
                    </button>
                  </div>
                ) : null}
              </div>
            )}
          </>
        )
      case 'resetPassword':
        return (
          <>
            <div className="swh-message">
              <h5 className="font-serif">Olvidé mi contraseña</h5>
              <p>Ingresa tu correo electrónico para cambiar tu contraseña</p>
            </div>
            <Formik
              initialValues={{
                email: '',
              }}
              validate={validateForm}
              onSubmit={onSubmitForm}
            >
              {({ isSubmitting, handleSubmit }) => (
                <form onSubmit={handleSubmit} autoComplete="off">
                  <Field
                    name="email"
                    component={CustomInputComponent}
                    label="Correo electrónico"
                    type="email"
                    inputmode="email"
                  />
                  <button
                    className="login-button"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Enviar
                  </button>
                </form>
              )}
            </Formik>
          </>
        )
      case 'resetPasswordConfirm':
        return (
          <div className="swh-message" style={{ marginBottom: '1.5em' }}>
            <h5 className="font-serif">Correo enviado</h5>
            <p>Revisa tu correo electrónico para cambiar tu contraseña.</p>
          </div>
        )
      case 'bonusRegister':
        return (
          <>
            <div className="swh-message">
              <h5 className="font-serif">Beneficios</h5>
            </div>
            <ul className="swh-message benefit-list">
              {beneficios.map((beneficio, index) => (
                <li key={index}>
                  <Icon type="outline-check_circle" />
                  <p>{beneficio}</p>
                </li>
              ))}
            </ul>
          </>
        )
      case 'loginNativeSide':
        return (
          <div>
            {children}
            <ul className="swh-message benefit-list">
              {beneficios?.map((beneficio, index) => (
                <li key={index}>
                  <Icon type="outline-check_circle" />
                  <p>{beneficio}</p>
                </li>
              ))}
            </ul>
            <button
              className="login-button"
              onClick={() => {
                NativeAPI.navigate('Auth', { screen: 'InitialScreen' })
              }}
            >
              {domain === 'depor.com' ? '¡Inscríbete aquí!' : '¡Únete hoy!'}
            </button>
          </div>
        )
      case 'verifyEmail':
        return (
          <>
            <div className="swh-message">
              <h5 className="font-serif">Verifica tu cuenta</h5>
              <p>
                Te hemos enviado un correo de confirmación. Si no te llegó
                puedes reenviarlo
              </p>
            </div>
            <button
              className="login-button"
              type="button"
              onClick={handleVerifyEmail}
              disabled={!resendAvailable}
            >
              {resendAvailable
                ? 'Reenviar correo'
                : `Reenviar correo en ${timeToResend}`}
            </button>
            <div className="register-other-options">
              ¿Ya validaste tu cuenta?{' '}
              <button
                type="button"
                onClick={() => {
                  setStep('loginWithEmail')
                }}
              >
                Inicia sesión
              </button>
            </div>
          </>
        )
      default:
        return (
          <div>
            {children}
            {getSocialMediaButtons()}
            <ButtonCorreo
              onClick={() => {
                setStep('loginWithEmail')
                setPrevSteps([...prevSteps, 'default'])
              }}
            />
            <div className="register-other-options">
              <div>
                {'¿Aún no tienes una cuenta? '}
                <button
                  type="button"
                  onClick={() => {
                    setStep('registerWithEmail')
                    setPrevSteps([...prevSteps, 'default'])
                  }}
                >
                  Regístrate
                </button>
              </div>
            </div>
          </div>
        )
    }
  }

  function getFooterButton() {
    let typeButton
    if (prevSteps.length > 0) {
      typeButton = 'back'
    } else if (blocking) {
      typeButton = 'portrait'
    }
    if (step === 'verifyEmail') {
      typeButton = blocking ? 'portrait' : 'close'
    }

    const STORY_ENABLED = RN_SCREENS_STORY() || RN_SCREENS_STORY_V2()
    switch (typeButton) {
      case 'back':
        return (
          <button
            className="btn-close"
            type="button"
            onClick={() => {
              const prevStep = [...prevSteps]
              const nextStep = prevStep.pop()
              setStep(nextStep)
              setPrevSteps(prevStep)
            }}
          >
            Volver
          </button>
        )
      case 'portrait':
        return (
          <button
            className="btn-close"
            type="button"
            onClick={() => {
              if (STORY_ENABLED) return NativeAPI.navigateGoBack()
              callback('escape')
            }}
          >
            {STORY_ENABLED ? 'Volver' : 'Volver a la portada'}
          </button>
        )
      case 'close':
      default:
        return (
          <button
            className="btn-close"
            type="button"
            onClick={() => {
              modalRef.remove()
            }}
          >
            Cerrar
          </button>
        )
    }
  }

  return (
    <div className="register-modal">
      <TransitionGroup>
        <CSSTransition
          key={step}
          timeout={{ enter: 450, exit: 450 }}
          classNames="fadeBottom"
        >
          <div className="register-content login-simplified">
            {getContent()}
          </div>
        </CSSTransition>
      </TransitionGroup>
      {getFooterButton()}
    </div>
  )
}

export default React.memo(RegisterModal)
