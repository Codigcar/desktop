import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@shopify/restyle'
import { Form } from '@unform/mobile'
import React, { useState } from 'react'
import {
  Platform,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native'

import { DataPrivacy, TermsAndConditions } from './Commons'
import CommonMessageError from './common/CommonMessageError'
import SocialMedia from './common/SocialMedia'
import IconAlertCircle from '../../assets/icons/elcomercio/alert-circle.svg'
import IconChevronRight from '../../assets/icons/elcomercio/chevron-right.svg'
import IconClose from '../../assets/icons/elcomercio/close.svg'
import Button from '../../components/Button'
import { FormItem } from '../../components/Form'
import Box from '../../components/box'
import Input, { CheckboxInput } from '../../components/input'
import Bar from '../../components/progress/Bar'
import Typography from '../../components/typography'
import { useAuthWithEmail } from '../../hooks/useAuthWithEmail'
import { useAuthWithSocialMedia } from '../../hooks/useAuthWithSocialMedia'
import type { RootStackScreenProps } from '../../routes/types'
import type { Theme } from '../../theme'

const { KeyboardAvoidingView, View, ScrollView } = Box
const { Paragraph } = Typography

const SignUpScreen: React.FC = () => {
  const navigation =
    useNavigation<RootStackScreenProps<'SignwallModal'>['navigation']>()
  const { colors } = useTheme<Theme>()
  const window = useWindowDimensions()

  const {
    isSubmitted: isSubmittedAuth,
    errors: errorsEmail,
    signUp,
    formRef,
    setFieldError,
  } = useAuthWithEmail()
  const {
    signInSocialMedia,
    errors: errorsSocialMedia,
    isSubmitted: isSubmittedSocialMedia,
  } = useAuthWithSocialMedia()
  const [toggleCheckBox, setToggleCheckBox] = useState(true)
  const [checkTreatment, setCheckTreatment] = useState(true)

  const errors = errorsEmail.common_error ?? errorsSocialMedia.common_error

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled={Platform.OS === 'ios'}
      keyboardVerticalOffset={20}
      flex={1}>
      <ScrollView bg="background.2" py="0.5">
        <View borderBottomColor="primary" borderBottomWidth={1} pt="1" pb="1.5">
          <View alignSelf="flex-end" mr="1.5">
            <TouchableWithoutFeedback
              onPress={() => navigation.goBack()}
              testID="icon-close">
              <View width={14} height={14}>
                <IconClose fill="#9E9E9E" />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <Paragraph
            textAlign="center"
            color="secondary"
            fontWeight="bold"
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ fontSize: 22 }}>
            Regístrate
          </Paragraph>
          <Paragraph
            fontWeight="bold"
            color={'text.5'}
            fontSize="lg"
            textAlign="center">
            Crea una cuenta gratis con tu e-mail
          </Paragraph>
          <View
            alignItems="center"
            flex={1}
            flexDirection="row"
            justifyContent="center"
            pt="0.25">
            <TouchableWithoutFeedback
              testID="already-account"
              onPress={() => {
                navigation.replace('Login')
              }}>
              <Paragraph textAlign="center" fontSize="base" color="blue-400">
                Ya tengo una cuenta
              </Paragraph>
            </TouchableWithoutFeedback>
            <View width={8} height={8} ml="0.25">
              <IconChevronRight fill={colors['blue-400']} />
            </View>
          </View>
        </View>
        {isSubmittedAuth || isSubmittedSocialMedia ? (
          <Bar width={window.width} />
        ) : null}
        {/* Form */}
        <View p="1.5">
          <CommonMessageError error={errors} />
          <Form ref={formRef} onSubmit={signUp}>
            <FormItem label="Nombre(s)" error={errorsEmail.first_name}>
              <Input
                autoFocus
                name="first_name"
                type="text"
                returnKeyType="next"
                onValueChange={(value) => setFieldError('first_name', value)}
                onSubmitEditing={() => {
                  formRef.current?.getFieldRef('last_name').focus()
                }}
                accessibilityLabel="nombre"
              />
            </FormItem>
            <FormItem label="Apellido Paterno" error={errorsEmail.last_name}>
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
            <FormItem label="Correo electrónico" error={errorsEmail.email}>
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
            <FormItem label="Contraseña" error={errorsEmail.password}>
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

            {/* Politicas */}
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
              {errorsEmail.terminos ? (
                <View mt="0.5" ml="2">
                  <Paragraph color="danger" fontSize="sm" fontWeight="medium">
                    <IconAlertCircle width={14} height={14} fill="#E30000" />{' '}
                    Debes aceptar los Términos y Condiciones
                  </Paragraph>
                </View>
              ) : null}
            </View>
            <View my="1">
              <Button
                disabled={isSubmittedAuth || isSubmittedSocialMedia}
                title="Registrarme"
                type="secondary"
                size="small"
                onPress={() => formRef.current?.submitForm()}
              />
            </View>

            {/* Redes Sociales */}
            <SocialMedia
              isSubmitted={isSubmittedSocialMedia}
              signInSocialMedia={signInSocialMedia}
              title="O regístrate con"
            />
          </Form>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SignUpScreen
