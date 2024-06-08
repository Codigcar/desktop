import Identity from '@arc-publishing/sdk-identity'
import * as Sentry from '@sentry/browser'
import { FormikHelpers, useFormik } from 'formik'
import React, { useContext } from 'react'

import ERibbon from '../../components/eRibbon/index'
import { AppContext } from '../../context/app'
import CustomInputComponent from '../../system/input'
import Notification from '../../system/notification'
import { ARC_ERROR } from '../../tools/errors'
import { RouteComponentProps } from 'react-router-dom'

const ERROR_MESSAGES = {
  300040: 'Contraseña incorrecta',
  300083: 'Contraseña insegura',
  '0014b': 'Error en el servidor',
}

type ChangePasswordValues = {
  password: string
  passwordConfirm: string
  newPassword: string
}

const ChangePassword: React.FC<RouteComponentProps> = ({ history }) => {
  const { update } = useContext(AppContext)

  function getError(err) {
    const message = ERROR_MESSAGES[err.code]
    if (!message || err.code === '0014b') {
      console.error(err)
      Sentry.captureException(
        new Error(`${ARC_ERROR.UPDATE_PASSWORD} ${err.message}`),
      )
    }
    Notification.error({
      content:
        message || 'No se pudo actualizar tu contraseña. Vuelve a intentarlo',
    })
  }

  function onSubmit(
    values: ChangePasswordValues,
    { setSubmitting }: FormikHelpers<any>,
  ) {
    try {
      Identity.updatePassword(values.password, values.newPassword)
        .then(res => {
          if (res) {
            update && update({ dataUpdate: null })
            Notification.success({
              content: 'Tu contraseña fue actualizada',
            })
            history.replace('/profile')
          }
          setSubmitting(false)
        })
        .catch(err => {
          getError(err)
          setSubmitting(false)
        })
    } catch (err) {
      getError(err)
      setSubmitting(false)
    }
  }

  function validate(values: ChangePasswordValues) {
    const errors: {
      password?: string
      newPassword?: string
    } = {}
    if (!values.password) {
      errors.password = 'Este campo es requerido'
    }
    if (!values.newPassword) {
      errors.newPassword = 'Este campo es requerido'
    } else if (/\s/g.test(values.newPassword)) {
      errors.newPassword = 'No se permiten espacios vacíos'
    } else if (values.newPassword.length < 8) {
      errors.newPassword = 'Mínimo 8 caracteres'
    }
    return errors
  }

  const {
    isSubmitting,
    handleSubmit,
    errors,
    touched,
    getFieldProps,
  } = useFormik({
    onSubmit,
    validate,
    initialValues: {
      password: '',
      passwordConfirm: '',
      newPassword: '',
    },
  })

  return (
    <div className="internal-page">
      <ERibbon
        content={{ seccion: { nombre: 'Cambiar contraseña' } }}
        hideHamburger
        hideIconHome
        history={history}
      />
      <div className="safe-area-with-ribbon pt-48">
        <form
          className="form-profile"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <CustomInputComponent
            field={{
              ...getFieldProps('password'),
              name: 'password',
            }}
            form={{ errors, touched }}
            label="Contraseña actual"
            type="password"
            valid=""
          />
          <CustomInputComponent
            field={{
              ...getFieldProps('newPassword'),
              name: 'newPassword',
            }}
            label="Nueva contraseña"
            type="password"
            form={{ errors, touched }}
            valid=""
          />
          <button
            className="login-button"
            type="submit"
            disabled={isSubmitting}
          >
            Cambiar contraseña
          </button>
        </form>
      </div>
    </div>
  )
}

export default React.memo(ChangePassword)
