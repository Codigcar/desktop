import analytics from '@react-native-firebase/analytics'
import crashlytics from '@react-native-firebase/crashlytics'
import { FormHandles, SubmitHandler } from '@unform/core'
import { useRef, useState } from 'react'
import { Keyboard } from 'react-native'

import { useFormErrors } from '../components/Form'
import { ValidationErros } from '../components/Form/types'
import { useAuth } from '../context/auth'
import { useNotification } from '../context/notification'
import auth from '../services/auth'
import { App } from '../utils/config'
import * as Schema from '../utils/validation'
import type { AuthStackScreenProps } from '../routes/types'

type UseAuthLinkAccount = {
  errors: ValidationErros
  isSubmitted: boolean
  formRef: React.RefObject<FormHandles>
  setFieldError: (name: string, value: string | boolean) => Promise<void>
  linkingAccount: SubmitHandler
}

const AccountLinkingSchema = Schema.object().shape({
  email: Schema.string().email(),
  password: Schema.string().required(),
})

export const useAuthLinkAccount = (
  params: AuthStackScreenProps<'AccountLinking'>['route']['params'],
): UseAuthLinkAccount => {
  const formRef = useRef<FormHandles>(null)
  const { errors, setFieldError, setErrors } = useFormErrors({
    schema: AccountLinkingSchema,
    ref: formRef,
  })

  const { signin } = useAuth()
  const notification = useNotification()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const linkingAccount: SubmitHandler = async (data) => {
    try {
      setIsSubmitted(true)
      Keyboard.dismiss()
      await AccountLinkingSchema.validate(data)
      const linking_state = `${params.additional_parameters?.linking_state}`
      const token = await auth.accountLinking(
        data.email,
        data.password,
        linking_state,
      )
      await analytics().logLogin({ method: params.method })
      await auth.setToken(token)
      signin(params.method)
    } catch (error) {
      setIsSubmitted(false)
      let message = 'Ocurrió un error inesperado'
      if (error instanceof Schema.ValidationError) return setErrors(error.inner)
      if (error instanceof Error) {
        crashlytics().recordError(error)
        message = error.message
      }
      if (message.toLowerCase().includes('captcha')) {
        message = 'En estos momentos no podemos realizar la operación'
      }
      if (App.key === 'elcomercio') {
        setErrors({ common_error: message })
      } else {
        notification.show({ message, type: 'error' })
      }
    }
  }

  return {
    errors,
    formRef,
    isSubmitted,
    setFieldError,
    linkingAccount,
  }
}
