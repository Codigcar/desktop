import { useNavigation } from '@react-navigation/native'
import { FormHandles, SubmitHandler } from '@unform/core'
import { useRef, useState } from 'react'
import { Keyboard } from 'react-native'
import { ValidationErros } from '../components/Form/types'
import { useFormErrors } from '../components/Form/utils'
import { useNotification } from '../context/notification'
import { RootStackScreenProps } from '../routes/types'
import auth from '../services/auth'
import { App } from '../utils/config'
import * as Schema from '../utils/validation'

type UseAuthChangePassword = {
  formRef: React.RefObject<FormHandles>
  errors: ValidationErros
  isSubmitted: boolean
  changePassword: SubmitHandler
  setFieldError: (name: string, value: string | boolean) => Promise<void>
}

const ChangePasswordSchema = Schema.object().shape({
  oldPassword: Schema.string().required(),
  newPassword: Schema.string()
    .min(8)
    .matches(/\s/g, 'No se permiten espacios en blanco')
    .required(),
})

export const useAuthChangePassword = (): UseAuthChangePassword => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const notification = useNotification()
  const navigation = useNavigation<RootStackScreenProps<'Auth'>['navigation']>()

  const formRef = useRef<FormHandles>(null)
  const { errors, setFieldError, setErrors } = useFormErrors({
    ref: formRef,
    schema: ChangePasswordSchema,
  })

  const changePassword: SubmitHandler = async (data, { reset }) => {
    try {
      setIsSubmitted(true)
      Keyboard.dismiss()
      await ChangePasswordSchema.validate(data)
      await auth.updatePassword(data.oldPassword, data.newPassword)
      notification.show({
        message: 'Tu contraseña ha sido cambiada',
        type: 'success',
      })
      if (App.key === 'elcomercio') {
        setIsSubmitted(false)
        reset()
        return
      }
      navigation.navigate('Main', {
        screen: 'Home',
        params: { screen: 'Feed' },
      })
    } catch (err) {
      if (err instanceof Schema.ValidationError) {
        setErrors(err.inner)
      } else if (err instanceof Error) {
        notification.show({ message: err.message, type: 'error' })
      }
      setIsSubmitted(false)
    }
  }

  return {
    errors,
    formRef,
    isSubmitted,
    changePassword,
    setFieldError,
  }
}
