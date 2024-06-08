import { useRef, useState } from 'react'
import { Keyboard } from 'react-native'

import { useFormErrors } from '../components/Form'
import { useNotification } from '../context/notification'
import auth from '../services/auth'
import * as Schema from '../utils/validation'
import type { ValidationErros } from '../components/Form/types'
import type { FormHandles, SubmitHandler } from '@unform/core'

type UseForgotPassword = {
  emailSent: boolean
  errors: ValidationErros
  formRef: React.RefObject<FormHandles>
  isSubmitted: boolean
  forgotPassword: SubmitHandler
  setFieldError: (name: string, value: string | boolean) => Promise<void>
}

const ForgotPasswordSchema = Schema.object().shape({
  email: Schema.string().required().email(),
})

export const useForgotPassword = (): UseForgotPassword => {
  const formRef = useRef<FormHandles>(null)
  const { errors, setFieldError, setErrors } = useFormErrors({
    schema: ForgotPasswordSchema,
    ref: formRef,
  })
  const notification = useNotification()
  const [emailSent, setEmailSent] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const forgotPassword: SubmitHandler = async (data) => {
    try {
      setIsSubmitted(true)
      Keyboard.dismiss()
      await ForgotPasswordSchema.validate(data)
      await auth.requestResetPassword(data.email)
      setEmailSent(true)
    } catch (error) {
      let message = 'Ocurrió un error inesperado'
      if (error instanceof Schema.ValidationError) return setErrors(error.inner)
      if (error instanceof Error) message = error.message

      notification.show({ message, type: 'error' })
    } finally {
      setIsSubmitted(false)
    }
  }

  return {
    emailSent,
    errors,
    formRef,
    isSubmitted,
    forgotPassword,
    setFieldError,
  }
}
