/* eslint-disable react-native/no-inline-styles */
import { useNavigation, useRoute } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import React from 'react'

import Loading from './Loading'
import Button from '../../components/Button'
import { FormItem } from '../../components/Form'
import Box from '../../components/box'
import Input from '../../components/input'
import Typography from '../../components/typography'
import { useAuthWithEmail } from '../../hooks/useAuthWithEmail'
import type { AuthStackScreenProps } from '../../routes/types'

const { ScrollView, View } = Box
const { Link, Title } = Typography

const LoginScreen: React.FC = () => {
  const navigation =
    useNavigation<AuthStackScreenProps<'SignIn'>['navigation']>()
  const { params } = useRoute<AuthStackScreenProps<'SignIn'>['route']>()

  const { isSubmitted, errors, signInEmail, formRef, setFieldError } =
    useAuthWithEmail()

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} bg="background">
      <View px="0.75" mb="1.5" mt="2">
        <Title color="heading" fontSize="3xl" letterSpacing="tighter">
          Ingresa con tu cuenta
        </Title>
      </View>
      <View pb="1.5" px="0.75" flex={1}>
        <Form ref={formRef} onSubmit={signInEmail}>
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
