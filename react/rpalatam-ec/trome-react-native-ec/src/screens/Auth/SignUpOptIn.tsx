/* eslint-disable react-native/no-inline-styles */
import { useRoute } from '@react-navigation/native'
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
import { useAuthOptin } from '../../hooks/useAuthOptin'
import type { AuthStackScreenProps } from '../../routes/types'

const { KeyboardAvoidingView, SafeAreaView, ScrollView, View } = Box
const { Title } = Typography

const SignUpOptInScreen: React.FC = () => {
  const { params } = useRoute<AuthStackScreenProps<'SignUpOptIn'>['route']>()
  const { errors, formRef, isSubmitted, signUpOptin, setFieldError } =
    useAuthOptin(params)

  const [toggleCheckBox, setToggleCheckBox] = useState(true)
  const [checkTreatment, setCheckTreatment] = useState(true)

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={75}
      flex={1}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} bg="background">
        <View px="0.75" mt="2">
          <Title color="heading" fontSize="3xl" letterSpacing="tighter">
            Último paso para el registro
          </Title>
        </View>
        <View px="0.75" py="1.5">
          <Form ref={formRef} onSubmit={signUpOptin}>
            {params.need_email ? (
              <FormItem label="Correo electrónico" error={errors.email}>
                <Input
                  name="email"
                  type="email"
                  autoCapitalize="none"
                  autoFocus
                  onValueChange={(newValue) => setFieldError('email', newValue)}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    formRef.current?.getFieldRef('mobile_phone').focus()
                  }}
                  accessibilityLabel="email"
                />
              </FormItem>
            ) : null}
            <FormItem label="Número de celular" error={errors.mobile_phone}>
              <Input
                name="mobile_phone"
                type="phone"
                autoFocus={!params.need_email}
                defaultValue=""
                keyboardType="numeric"
                onValueChange={(value) => {
                  setFieldError('mobile_phone', value)
                }}
                onSubmitEditing={() => {
                  formRef.current?.submitForm()
                }}
                returnKeyType="send"
                accessibilityLabel="celular"
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
                name="terms_and_privacy_policy"
                value={toggleCheckBox}
                onValueChange={(newValue) => {
                  setFieldError('terms_and_privacy_policy', newValue)
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

export default SignUpOptInScreen
