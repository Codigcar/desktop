import analytics from '@react-native-firebase/analytics'
import { useNavigation } from '@react-navigation/native'
import { FormHandles, SubmitHandler } from '@unform/core'
import { useRef, useState } from 'react'
import { Keyboard } from 'react-native'

import { useFormErrors } from '../components/Form'
import { useAuth } from '../context/auth'
import { useNotification } from '../context/notification'
import auth from '../services/auth'
import { App } from '../utils/config'
import { ENABLE_VERIFY_ACCOUNT } from '../utils/flags'
import * as Schema from '../utils/validation'
import type { ValidationErros } from '../components/Form/types'
import type { RootStackScreenProps } from '../routes/types'

type UseAuthWithEmail = {
  formRef: React.RefObject<FormHandles>
  errors: ValidationErros
  isSubmitted: boolean
  signInEmail: SubmitHandler
  signUp: SubmitHandler
  setFieldError: (name: string, value: string | boolean) => Promise<void>
}

const withNameAndLastnameRequired = App.select({
  peru21: false,
  default: true,
})

const SignInSchema = Schema.object().shape({
  email: Schema.string().email(),
  password: Schema.string().required(),
})

const StringSchema = Schema.string()
  .matches(/\d+/i, 'Este campo no puede contener números')
  .matches(/\D{51,}/i, 'Máximo 50 caracteres')

const SignUpSchema = Schema.object().shape({
  first_name: withNameAndLastnameRequired
    ? StringSchema.required()
    : StringSchema,
  last_name: withNameAndLastnameRequired
    ? StringSchema.required()
    : StringSchema,
  email: Schema.string().email(),
  password: Schema.string()
    .min(8)
    .matches(/\s/g, 'No se permiten espacios vacíos')
    .required(),
  terminos: Schema.boolean().required(),
  data_treatment: Schema.boolean(),
})

export const useAuthWithEmail = (): UseAuthWithEmail => {
  const formRef = useRef<FormHandles>(null)
  const { errors, setFieldError, setErrors } = useFormErrors({
    schema: SignInSchema,
    ref: formRef,
  })
  const navigation = useNavigation<RootStackScreenProps<'Auth'>['navigation']>()
  const notification = useNotification()
  const { signin } = useAuth()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const signInEmail: SubmitHandler = async (data, { reset }) => {
    try {
      setIsSubmitted(true)
      Keyboard.dismiss()
      await SignInSchema.validate(data)
      await auth.login(data.email, data.password)
      const emailVerified = await auth.checkEmail()
      if (!emailVerified && ENABLE_VERIFY_ACCOUNT) {
        await auth.logout()
        await auth.requestVerifyEmail(data.email)
        setIsSubmitted(false)
        navigation.navigate('Auth', {
          screen: 'VerifyAccount',
          params: {
            emailToResend: data.email,
          },
        })
        formRef.current?.clearField('password')
      } else {
        await analytics().logLogin({ method: 'Email' })
        signin('email')
        reset()
      }
    } catch (error) {
      setIsSubmitted(false)
      let message = 'Ocurrió un error inesperado'
      if (error instanceof Schema.ValidationError) return setErrors(error.inner)
      if (error instanceof Error) message = error.message
      if (App.key === 'elcomercio') {
        setErrors({ common_error: message })
      } else {
        notification.show({ message, type: 'error' })
      }
    }
  }

  const signUp: SubmitHandler = async (data, { reset }) => {
    try {
      setIsSubmitted(true)
      Keyboard.dismiss()
      await SignUpSchema.validate(data)
      await auth.signUp(data)
      await analytics().logSignUp({ method: 'Email' })
      setIsSubmitted(false)
      if (!ENABLE_VERIFY_ACCOUNT) {
        await auth.login(data.email, data.password)
        signin('email')
      } else {
        navigation.navigate('Auth', {
          screen: 'VerifyAccount',
          params: { emailToResend: data.email },
        })
      }
      reset()
    } catch (error) {
      setIsSubmitted(false)
      let message = 'Ocurrió un error inesperado'
      if (error instanceof Schema.ValidationError) return setErrors(error.inner)
      if (error instanceof Error) message = error.message
      if (App.key === 'elcomercio') {
        setErrors({ common_error: message })
      } else {
        notification.show({ message, type: 'error' })
      }
    }
  }

  return {
    formRef,
    errors,
    signInEmail,
    signUp,
    setFieldError,
    isSubmitted,
  }
}
