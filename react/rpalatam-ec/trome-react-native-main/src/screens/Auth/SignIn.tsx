/* eslint-disable react-native/no-inline-styles */
import analytics from '@react-native-firebase/analytics'
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
import { ENABLE_VERIFY_ACCOUNT } from '../../utils/flags'
import * as Schema from '../../utils/validation'
import type { AuthStackScreenProps } from '../../routes/types'

const { ScrollView, View } = Box
const { Link, Title } = Typography

const SignInSchema = Schema.object().shape({
  email: Schema.string().email(),
  password: Schema.string().required(),
})

const LoginScreen: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { errors, setFieldError, setErrors } = useFormErrors({
    schema: SignInSchema,
    ref: formRef,
  })
  const navigation =
    useNavigation<AuthStackScreenProps<'SignIn'>['navigation']>()
  const { params } = useRoute<AuthStackScreenProps<'SignIn'>['route']>()
  const { signin } = useAuth()
  const notification = useNotification()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit: SubmitHandler = async (data, { reset }) => {
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
        await analytics().logLogin({
          method: 'Email',
        })
        signin('email')
        reset()
      }
    } catch (error) {
      setIsSubmitted(false)
      let message = 'Ocurrió un error inesperado'
      if (error instanceof Schema.ValidationError) return setErrors(error.inner)
      if (error instanceof Error) message = error.message
      notification.show({ message, type: 'error' })
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} bg="background">
      <View px="0.75" mb="1.5" mt="2">
        <Title color="heading" fontSize="3xl" letterSpacing="tighter">
          Ingresa con tu cuenta
        </Title>
      </View>
      <View pb="1.5" px="0.75" flex={1}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <FormItem label="Correo electrónico" error={errors.email}>
            <Input
              defaultValue={params?.email}
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
            title="Iniciar sesión"
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

export default LoginScreen
