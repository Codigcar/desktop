import Identity from '@arc-publishing/sdk-identity'
import { useFormik, FormikHelpers } from 'formik'
import React, { useContext } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import * as Sentry from '@sentry/browser'

import ERibbon from '../../components/eRibbon/index'
import { AppContext } from '../../context/app'
import CustomInputComponent from '../../system/input'
import Notification from '../../system/notification'
import { ARC_ERROR, ARC_ERROR_MESSAGES, logErrors } from '../../tools/errors'

const ERROR_MESSAGES = {
  ...ARC_ERROR_MESSAGES,
  300040: 'Contraseña incorrecta',
  '0014b': 'Error en el servidor',
}

interface FormValues {
  password: string
}

const PasswordView: React.FC<RouteComponentProps> = ({ history }) => {
  const { dataUpdate, profile, signIn } = useContext(AppContext)
  function onSubmit(
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>,
  ) {
    Identity.login(profile!.email, values.password, {
      cookie: true,
      rememberMe: true,
    })
      .then(() => {
        Identity.updateUserProfile(dataUpdate)
          .then(res => {
            signIn({ profile: res })
            history.replace('/profile/user')
            Notification.success({
              content: 'Tus datos fueron actualizados',
            })
            setSubmitting(false)
          })
          .catch(err => {
            Notification.error({
              content: 'No se pudo actualizar tu perfil. Inténtalo nuevamente.',
            })
            console.error('Err Update', err)
            setSubmitting(false)
          })
      })
      .catch(err => {
        const error = ERROR_MESSAGES[err.code]
        if (!error) {
          logErrors(err, 'ConfirmPassword.js')
          const errLogin = new Error(`${ARC_ERROR.EMAIL_LOGIN} ${err.message}`)
          Sentry.captureException(errLogin)
        }
        Notification.error({
          content:
            error || 'No se pudo actualizar tu perfil. Inténtalo nuevamente.',
        })
        console.error('Err Update', err)
        setSubmitting(false)
      })
  }

  function validate(values) {
    const errors: {
      password?: string
    } = {}
    if (!values.password) {
      errors.password = 'Este campo es requerido'
    }
    return errors
  }

  const initialValues: FormValues = {
    password: '',
  }

  const {
    handleSubmit,
    isSubmitting,
    errors,
    touched,
    getFieldProps,
  } = useFormik({
    onSubmit,
    initialValues,
    validate,
  })

  return (
    <div className="internal-page">
      <div className="page-view">
        <ERibbon
          content={{ seccion: { nombre: 'Confirmación' } }}
          hideHamburger
          hideIconHome
          history={history}
        />
        <div className="content-page-view">
          <form
            className="form-profile"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <CustomInputComponent
              form={{ errors, touched }}
              field={{
                ...getFieldProps('password'),
                name: 'password',
              }}
              label="Contraseña"
              type="password"
              valid=""
            />
            <p>Para confirmar tus cambios ingresa tu contraseña</p>
            <button
              className="login-button"
              type="submit"
              disabled={isSubmitting}
            >
              Actualizar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default React.memo(PasswordView)
