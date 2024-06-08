import analytics from '@react-native-firebase/analytics'
import crashlytics from '@react-native-firebase/crashlytics'
import { useNavigation } from '@react-navigation/native'
import { FormHandles, SubmitHandler } from '@unform/core'
import { useRef, useState } from 'react'
import { Keyboard } from 'react-native'

import { useFormErrors } from '../components/Form'
import { useAuth } from '../context/auth'
import { useNotification } from '../context/notification'
import auth from '../services/auth'
import * as Schema from '../utils/validation'
import type { ValidationErros } from '../components/Form/types'
import type { RootStackScreenProps } from '../routes/types'

type Params = {
  method: string
  need_email: boolean
  additional_parameters?: Record<string, string | boolean> | undefined
}

type useAuthOption = {
  formRef: React.RefObject<FormHandles>
  errors: ValidationErros
  isSubmitted: boolean
  signUpOptin: SubmitHandler
  setFieldError: (name: string, value: string | boolean) => Promise<void>
}

const terms_and_privacy_policy = Schema.boolean().required()
const data_treatment = Schema.boolean()
const mobile_phone = Schema.string()
  .min(9, 'Mínimo 9 dígitos')
  .matches(/\d{13,}/i, 'Máximo 13 dígitos')

const SignUpOptInSchema = Schema.object().shape({
  terms_and_privacy_policy,
  data_treatment,
  mobile_phone,
})

const SignUpOptInWithEmailSchema = Schema.object().shape({
  email: Schema.string().email(),
  terms_and_privacy_policy,
  data_treatment,
  mobile_phone,
})

export const useAuthOptin = (params: Params): useAuthOption => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { signin } = useAuth()
  const formRef = useRef<FormHandles>(null)
  const navigation = useNavigation<RootStackScreenProps<'Auth'>['navigation']>()
  const notification = useNotification()

  const { errors, setFieldError, setErrors } = useFormErrors({
    schema: params.need_email ? SignUpOptInWithEmailSchema : SignUpOptInSchema,
    ref: formRef,
  })

  const signUpOptin: SubmitHandler = async (data) => {
    try {
      setIsSubmitted(true)
      Keyboard.dismiss()
      if (params.need_email) await SignUpOptInWithEmailSchema.validate(data)
      else await SignUpOptInSchema.validate(data)
      const response = await auth.signUpOptIn({
        ...data,
        input_state: params.additional_parameters?.input_state,
      })
      if ('access_token' in response) {
        await auth.setToken(response)
        await analytics().logSignUp({ method: params.method })
        return signin(params.method)
      }
      navigation.replace('Auth', {
        screen: 'AccountLinking',
        params: {
          email: response.email,
          method: response.provider,
          additional_parameters: response.additional_parameters,
        },
      })
    } catch (error) {
      setIsSubmitted(false)
      let message = 'Ocurrió un error inesperado'
      if (error instanceof Schema.ValidationError) return setErrors(error.inner)
      if (error instanceof Error) {
        crashlytics().recordError(error)
        message = error.message
      }
      notification.show({ message, type: 'error' })
    }
  }

  return {
    errors,
    formRef,
    isSubmitted,
    signUpOptin,
    setFieldError,
  }
}
