/* eslint-disable react-native/no-inline-styles */
import analytics from '@react-native-firebase/analytics'
import crashlytics from '@react-native-firebase/crashlytics'
import { useNavigation, useRoute } from '@react-navigation/native'
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
import * as Schema from '../../utils/validation'
import type { AuthStackScreenProps } from '../../routes/types'

const { KeyboardAvoidingView, SafeAreaView, ScrollView, View } = Box
const { Title } = Typography

const terms_and_privacy_policy = Schema.boolean().required()
const data_treatment = Schema.boolean()
const mobile_phone = Schema.string()
  .min(9, 'Mínimo 9 dígitos')
  .matches(/\d{13,}/i, 'Máximo 13 dígitos')

const SignUpOptInSchema = Schema.object().shape({
  terms_and_privacy_policy,
  data_treatment,
  mobile_phone,
})

const SignUpOptInWithEmailSchema = Schema.object().shape({
  email: Schema.string().email(),
  terms_and_privacy_policy,
  data_treatment,
  mobile_phone,
})

const SignUpOptInScreen: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const navigation =
    useNavigation<AuthStackScreenProps<'SignUpOptIn'>['navigation']>()
  const { params } = useRoute<AuthStackScreenProps<'SignUpOptIn'>['route']>()
  const { errors, setFieldError, setErrors } = useFormErrors({
    schema: params.need_email ? SignUpOptInWithEmailSchema : SignUpOptInSchema,
    ref: formRef,
  })

  const { signin } = useAuth()
  const notification = useNotification()

  const [toggleCheckBox, setToggleCheckBox] = useState(true)
  const [checkTreatment, setCheckTreatment] = useState(true)

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit: SubmitHandler = async (data) => {
    try {
      setIsSubmitted(true)
      Keyboard.dismiss()
      if (params.need_email) await SignUpOptInWithEmailSchema.validate(data)
      else await SignUpOptInSchema.validate(data)
      const response = await auth.signUpOptIn({
        ...data,
        input_state: params.additional_parameters?.input_state,
      })
      if ('access_token' in response) {
        await auth.setToken(response)
        await analytics().logSignUp({ method: params.method })
        return signin(params.method)
      }
      navigation.navigate('Auth', {
        screen: 'AccountLinking',
        params: {
          email: response.email,
          method: response.provider,
          additional_parameters: response.additional_parameters,
        },
      })
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
          <Form ref={formRef} onSubmit={handleSubmit}>
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
