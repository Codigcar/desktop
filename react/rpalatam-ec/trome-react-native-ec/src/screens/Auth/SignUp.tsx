import { Form } from '@unform/mobile'
import React, { useState } from 'react'
import { Platform } from 'react-native'

import { DataPrivacy, TermsAndConditions } from './Commons'
import Loading from './Loading'
import Button from '../../components/Button'
import { FormItem } from '../../components/Form'
import Box from '../../components/box'
import Input, { CheckboxInput } from '../../components/input'
import Typography from '../../components/typography'
import { useAuthWithEmail } from '../../hooks/useAuthWithEmail'
import { App } from '../../utils/config'

const { KeyboardAvoidingView, SafeAreaView, ScrollView, View } = Box
const { Title } = Typography

const RegisterScreen: React.FC = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(true)
  const [checkTreatment, setCheckTreatment] = useState(true)
  const { isSubmitted, errors, signUp, formRef, setFieldError } =
    useAuthWithEmail()

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={75}
      flex={1}>
      <ScrollView // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{ flexGrow: 1 }}
        bg="background">
        <View px="0.75" mt="2">
          <Title color="heading" fontSize="3xl" letterSpacing="tighter">
            Accede fácilmente
          </Title>
        </View>
        <View px="0.75" py="1.5">
          <Form ref={formRef} onSubmit={signUp}>
            {App.key === 'peru21' ? null : (
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
