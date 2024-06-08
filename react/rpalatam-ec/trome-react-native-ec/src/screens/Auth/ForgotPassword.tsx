import { Form } from '@unform/mobile'
import React from 'react'

import Loading from './Loading'
import Button from '../../components/Button'
import { FormItem } from '../../components/Form'
import Box from '../../components/box'
import Input from '../../components/input'
import Typography from '../../components/typography'
import { useForgotPassword } from '../../hooks/useForgotPassword'

const { ScrollView, View } = Box
const { Paragraph, Title } = Typography

const ForgotScreen: React.FC = () => {
  const {
    emailSent,
    formRef,
    forgotPassword,
    errors,
    setFieldError,
    isSubmitted,
  } = useForgotPassword()

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} bg="background">
      <View px="0.75" mt="2">
        <Title color="heading" fontSize="3xl" letterSpacing="tighter">
          {emailSent ? 'Correo enviado' : 'Olvidé mi contraseña'}
        </Title>
      </View>
      <View mt="0.75" px="0.75">
        {emailSent ? (
          <Paragraph color="coolGray-500">
            Revisa tu correo electrónico para cambiar tu contraseña
          </Paragraph>
        ) : (
          <Paragraph color="coolGray-500">
            Ingresa tu correo electrónico para cambiar tu contraseña
          </Paragraph>
        )}
      </View>
      {emailSent ? null : (
        <View py="1.5" px="0.75">
          <Form ref={formRef} onSubmit={forgotPassword}>
            <FormItem label="Correo electrónico" error={errors.email}>
              <Input
                name="email"
                type="email"
                autoCapitalize="none"
                autoFocus
                onValueChange={(newValue) => setFieldError('email', newValue)}
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm()
                }}
                accessibilityLabel="email"
              />
            </FormItem>
            <Button
              title="Enviar"
              onPress={() => formRef.current?.submitForm()}
              type={isSubmitted ? 'secondary' : 'primary'}
            />
          </Form>
        </View>
      )}
      {isSubmitted ? <Loading /> : null}
    </ScrollView>
  )
}

export default ForgotScreen
