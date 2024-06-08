/* eslint-disable react-native/no-inline-styles */
import analytics from '@react-native-firebase/analytics'
import { useNavigation } from '@react-navigation/native'
import { FormHandles, SubmitHandler } from '@unform/core'
import { Form } from '@unform/mobile'
import React, { useRef, useState } from 'react'
import { Keyboard, Platform } from 'react-native'

import { DataPrivacy, TermsAndConditions } from './Commons'
import Loading from './Loading'
import Button from '../../components/Button'
import { FormItem, useFormErrors } from '../../components/Form'
import Box from '../../components/box'
import Input, { CheckboxInput } from '../../components/input'
import Typography from '../../components/typography'
import { useAuth } from '../../context/auth'
import { useNotification } from '../../context/notification'
import auth from '../../services/auth'
import { App } from '../../utils/config'
import { ENABLE_VERIFY_ACCOUNT } from '../../utils/flags'
import * as Schema from '../../utils/validation'
import type { AuthStackScreenProps } from '../../routes/types'

const { KeyboardAvoidingView, SafeAreaView, ScrollView, View } = Box
const { Title } = Typography

const withNameAndLastnameRequired = App.select({
  peru21: false,
  default: true,
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

const RegisterScreen: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { errors, setFieldError, setErrors } = useFormErrors({
    schema: SignUpSchema,
    ref: formRef,
  })
  const [toggleCheckBox, setToggleCheckBox] = useState(true)
  const [checkTreatment, setCheckTreatment] = useState(true)
  const { signin } = useAuth()

  const navigation =
    useNavigation<AuthStackScreenProps<'SignUp'>['navigation']>()
  const notification = useNotification()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit: SubmitHandler = async (data, { reset }) => {
    try {
      setIsSubmitted(true)
      Keyboard.dismiss()
      await SignUpSchema.validate(data)
      const token = await auth.signUp(data)
      await analytics().logSignUp({ method: 'Email' })
      setIsSubmitted(false)
      if (!ENABLE_VERIFY_ACCOUNT) {
        await auth.setToken(token)
        signin('email')
        return
      }
      navigation.navigate('Auth', {
        screen: 'VerifyAccount',
        params: { emailToResend: data.email },
      })

      reset()
    } catch (error) {
      setIsSubmitted(false)
      let message = 'Ocurrió un error inesperado'
      if (error instanceof Schema.ValidationError) return setErrors(error.inner)
      if (error instanceof Error) message = error.message
      notification.show({ message, type: 'error' })
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={75}
      flex={1}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} bg="background">
        <View px="0.75" mt="2">
          <Title color="heading" fontSize="3xl" letterSpacing="tighter">
            Accede fácilmente
          </Title>
        </View>
        <View px="0.75" py="1.5">
          <Form ref={formRef} onSubmit={handleSubmit}>
            {!withNameAndLastnameRequired ? null : (
              <React.Fragment>
                <FormItem label="Nombre(s)" error={errors.first_name}>
                  <Input
                    name="first_name"
                    type="text"
                    autoFocus
                    returnKeyType="next"
                    onValueChange={(value) =>
                      setFieldError('first_name', value)
                    }
                    onSubmitEditing={() => {
                      formRef.current?.getFieldRef('last_name').focus()
                    }}
                    accessibilityLabel="nombre"
                  />
                </FormItem>
                <FormItem label="Apellido Paterno" error={errors.last_name}>
                  <Input
                    name="last_name"
                    type="text"
                    returnKeyType="next"
                    onValueChange={(value) => setFieldError('last_name', value)}
                    onSubmitEditing={() => {
                      formRef.current?.getFieldRef('email').focus()
                    }}
                    accessibilityLabel="apellido"
                  />
                </FormItem>
              </React.Fragment>
            )}
            <FormItem label="Correo electrónico" error={errors.email}>
              <Input
                name="email"
                type="email"
                autoCapitalize="none"
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
                onValueChange={(newValue) =>
                  setFieldError('password', newValue)
                }
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm()
                }}
                textContentType="newPassword"
                accessibilityLabel="contraseña"
              />
            </FormItem>
            <View mb="1">
              <CheckboxInput
                name="data_treatment"
                value={checkTreatment}
                onValueChange={(value) => {
                  setCheckTreatment(value)
                }}
                testID="data_treatment-checkbox">
                <DataPrivacy />
              </CheckboxInput>
            </View>
            <View mb="1.5">
              <CheckboxInput
                name="terminos"
                value={toggleCheckBox}
                onValueChange={(newValue) => {
                  setFieldError('terminos', newValue)
                  setToggleCheckBox(newValue)
                }}
                testID="terms-checkbox">
                <TermsAndConditions />
              </CheckboxInput>
            </View>
            <Button
              title="Registrarme"
              type={isSubmitted ? 'secondary' : 'primary'}
              onPress={() => formRef.current?.submitForm()}
            />
          </Form>
        </View>
        <SafeAreaView edges={['bottom']} />
        {isSubmitted ? <Loading /> : null}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen
