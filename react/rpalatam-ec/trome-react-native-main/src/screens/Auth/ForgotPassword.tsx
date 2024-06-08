/* eslint-disable react-native/no-inline-styles */
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
import { useNotification } from '../../context/notification'
import auth from '../../services/auth'
import * as Schema from '../../utils/validation'

const { ScrollView, View } = Box
const { Paragraph, Title } = Typography

const ForgotPasswordSchema = Schema.object().shape({
  email: Schema.string().email(),
})

const ForgotScreen: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { errors, setFieldError, setErrors } = useFormErrors({
    schema: ForgotPasswordSchema,
    ref: formRef,
  })
  const [emailSent, setEmailSent] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const notification = useNotification()

  const handleSubmit: SubmitHandler = async (data) => {
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

  return (
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
          <Form ref={formRef} onSubmit={handleSubmit}>
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
