/* eslint-disable react-native/no-inline-styles */
import analytics from '@react-native-firebase/analytics'
import crashlytics from '@react-native-firebase/crashlytics'
import { useNavigation, useRoute } from '@react-navigation/native'
import { FormHandles, SubmitHandler } from '@unform/core'
import { Form } from '@unform/mobile'
import React, { useRef, useState } from 'react'
import { Keyboard } from 'react-native'

import Loading from './Loading'
import Button from '../../components/Button'
import { FormItem, useFormErrors } from '../../components/Form'
import Box from '../../components/box'
import Input from '../../components/input'
import Typography from '../../components/typography'
import { useAuth } from '../../context/auth'
import { useNotification } from '../../context/notification'
import auth from '../../services/auth'
import * as Schema from '../../utils/validation'
import type { AuthStackScreenProps } from '../../routes/types'

const { ScrollView, View } = Box
const { Link, Title } = Typography

const AccountLinkingSchema = Schema.object().shape({
  email: Schema.string().email(),
  password: Schema.string().required(),
})

const AccountLinkingScreen: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { errors, setFieldError, setErrors } = useFormErrors({
    schema: AccountLinkingSchema,
    ref: formRef,
  })
  const navigation =
    useNavigation<AuthStackScreenProps<'AccountLinking'>['navigation']>()
  const { params } = useRoute<AuthStackScreenProps<'AccountLinking'>['route']>()
  const { signin } = useAuth()
  const notification = useNotification()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit: SubmitHandler = async (data) => {
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
      await analytics().logLogin({
        method: params.method,
      })
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
      notification.show({ message, type: 'error' })
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} bg="background">
      <View px="0.75" mb="1.5" mt="2">
        <Title color="heading" fontSize="3xl" letterSpacing="tighter">
          Vincular cuentas
        </Title>
      </View>
      <View pb="1.5" px="0.75" flex={1}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <FormItem label="Correo electrónico" error={errors.email}>
            <Input
              defaultValue={params.email}
              name="email"
              type="email"
              autoCapitalize="none"
              autoFocus
              onValueChange={(newValue) => setFieldError('email', newValue)}
              returnKeyType="next"
              onSubmitEditing={() => {
                formRef.current?.getFieldRef('password').focus()
              }}
              accessibilityLabel="email"
            />
          </FormItem>
          <FormItem label="Contraseña" error={errors.password}>
            <Input.Password
              name="password"
              autoCapitalize="none"
              onValueChange={(newValue) => setFieldError('password', newValue)}
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm()
              }}
              accessibilityLabel="contraseña"
            />
          </FormItem>
          <Button
            title="Confirmar"
            type={isSubmitted ? 'secondary' : 'primary'}
            onPress={() => formRef.current?.submitForm()}
          />
        </Form>
        <View my="1.5">
          <Link
            textAlign="center"
            onPress={() => {
              navigation.navigate('Auth', { screen: 'ForgotPassword' })
            }}
            testID="forgot_password-button">
            ¿Olvidaste tu contraseña?
          </Link>
        </View>
      </View>
      {isSubmitted ? <Loading /> : null}
    </ScrollView>
  )
}

export default AccountLinkingScreen
