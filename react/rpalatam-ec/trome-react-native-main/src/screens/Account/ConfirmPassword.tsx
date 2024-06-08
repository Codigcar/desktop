import crashlytics from '@react-native-firebase/crashlytics'
import { FormHandles, SubmitHandler } from '@unform/core'
import { Form } from '@unform/mobile'
import React, { useRef } from 'react'
import { Keyboard, Platform } from 'react-native'

import Button from '../../components/Button'
import { FormItem, useFormErrors } from '../../components/Form'
import Box from '../../components/box'
import Input from '../../components/input'
import Typography from '../../components/typography'
import { useAuth } from '../../context/auth'
import { useNotification } from '../../context/notification'
import auth from '../../services/auth'
import * as Schema from '../../utils/validation'

const { View } = Box
const { Paragraph } = Typography

type FormValues = {
  password: string
}

type Props = {
  setIsSubmitted: (isLoading: boolean) => void
  onSubmit: () => void
}

const ConfirmSchema = Schema.object().shape({
  password: Schema.string()
    .matches(/\s/g, 'No se permiten espacios en blanco')
    .min(8)
    .required(),
})

const ConfirmPassword: React.FC<Props> = ({ setIsSubmitted, onSubmit }) => {
  const { user } = useAuth()
  const formRef = useRef<FormHandles>(null)
  const notification = useNotification()
  const { errors, setErrors, setFieldError } = useFormErrors({
    ref: formRef,
    schema: ConfirmSchema,
  })

  const handleSubmit: SubmitHandler<FormValues> = async ({ password }) => {
    try {
      Keyboard.dismiss()
      setIsSubmitted(true)
      await ConfirmSchema.validate({ password })
      await auth.login(user.email || '', password)
      onSubmit()
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

  return (
    <View minHeight={Platform.OS === 'ios' ? 520 : 500} p="0.75" zIndex={5}>
      <View>
        <View mb="1">
          <Paragraph color="coolGray-700" fontWeight="bold">
            Confirmar cambios
          </Paragraph>
        </View>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <FormItem label="Contraseña" error={errors.password}>
            <Input.Password
              testID="input-password"
              name="password"
              autoFocus
              onSubmitEditing={() => formRef.current?.submitForm()}
              onValueChange={(value) => setFieldError('password', value)}
              returnKeyType="send"
            />
          </FormItem>
          <Button
            testID="btn-confirm-password"
            onPress={() => formRef.current?.submitForm()}
            title="Actualizar"
            type="primary"
          />
        </Form>
      </View>
    </View>
  )
}

export default ConfirmPassword
