import { useRoute } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import React, { useState } from 'react'
import { Platform } from 'react-native'

import { DataPrivacy, TermsAndConditions } from './Commons'
import Button from '../../components/Button'
import { FormItem } from '../../components/Form'
import Box from '../../components/box'
import Input, { CheckboxInput } from '../../components/input'
import Ribbon from '../../components/ribbon'
import { useAuthOptin } from '../../hooks/useAuthOptin'
import type { AuthStackScreenProps } from '../../routes/types'

const { KeyboardAvoidingView, SafeAreaView, ScrollView, View } = Box

const SignUpOptInScreen: React.FC = () => {
  const { params } = useRoute<AuthStackScreenProps<'SignUpOptIn'>['route']>()
  const { errors, formRef, isSubmitted, signUpOptin, setFieldError } =
    useAuthOptin(params)

  const [toggleCheckBox, setToggleCheckBox] = useState(true)
  const [checkTreatment, setCheckTreatment] = useState(true)

  return (
    <View bg="background.2" flex={1}>
      <Ribbon loading={isSubmitted} title="Último paso para el registro" />
      <KeyboardAvoidingView
        keyboardVerticalOffset={undefined}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        flex={1}>
        <ScrollView
          // eslint-disable-next-line react-native/no-inline-styles
          contentContainerStyle={{ flexGrow: 1 }}
          flex={1}
          px="1.5">
          <View pt="1.5" pb="2">
            <Form ref={formRef} onSubmit={signUpOptin}>
              {params.need_email ? (
                <FormItem label="Correo electrónico" error={errors.email}>
                  <Input
                    name="email"
                    type="email"
                    autoCapitalize="none"
                    autoFocus
                    onValueChange={(newValue) =>
                      setFieldError('email', newValue)
                    }
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
                disabled={isSubmitted}
                onPress={() => formRef.current?.submitForm()}
                title="Registrarme"
                type="secondary"
              />
            </Form>
            <SafeAreaView edges={['bottom']} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

export default SignUpOptInScreen
