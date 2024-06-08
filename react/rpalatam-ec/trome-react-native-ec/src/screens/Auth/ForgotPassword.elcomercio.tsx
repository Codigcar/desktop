import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import React from 'react'
import {
  Platform,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native'

import IconClose from '../../assets/icons/elcomercio/close.svg'
import Button from '../../components/Button'
import { FormItem } from '../../components/Form'
import Box from '../../components/box'
import Input from '../../components/input/Input'
import Bar from '../../components/progress/Bar'
import Typography from '../../components/typography'
import { useForgotPassword } from '../../hooks/useForgotPassword'
import type { AuthStackScreenProps } from '../../routes/types'

const { KeyboardAvoidingView, View, ScrollView } = Box
const { Paragraph } = Typography

const ForgotPasswordScreen: React.FC = () => {
  const navigation =
    useNavigation<AuthStackScreenProps<'ForgotPassword'>['navigation']>()
  const window = useWindowDimensions()
  const {
    emailSent,
    formRef,
    forgotPassword,
    errors,
    setFieldError,
    isSubmitted,
  } = useForgotPassword()

  const progressBar = isSubmitted ? <Bar width={window.width} /> : null

  return (
    <View pt="1" flex={1} bg="background.2">
      <View alignSelf="flex-end" mb="0.25" px="1.25">
        <TouchableWithoutFeedback
          hitSlop={{
            top: 4,
            left: 4,
            right: 4,
            bottom: 4,
          }}
          onPress={navigation.goBack}
          testID="icon-close">
          <View width={14} height={14}>
            <IconClose fill="#9E9E9E" />
          </View>
        </TouchableWithoutFeedback>
      </View>
      {emailSent ? (
        <View alignSelf="center" width={240} mt="2">
          <Paragraph
            fontWeight="bold"
            color="text.5"
            fontSize="lg"
            textAlign="center">
            E-mail enviado. {'\n'}Revisa tu correo electrónico para cambiar tu
            contraseña
          </Paragraph>
        </View>
      ) : null}
      {!emailSent ? (
        <>
          <View
            borderBottomColor="primary"
            borderBottomWidth={1}
            px="1.25"
            pb="2">
            <Paragraph
              textAlign="center"
              color="secondary"
              fontWeight="bold"
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ fontSize: 22 }}>
              Olvidé mi contraseña
            </Paragraph>
            <Paragraph
              fontWeight="bold"
              color="text.5"
              fontSize="lg"
              textAlign="center">
              Ingresa con tu e-mail para cambiar tu contraseña
            </Paragraph>
          </View>
          {progressBar}
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={undefined}
            flex={1}>
            <ScrollView>
              <View pt="1" px="1.5">
                <Form ref={formRef} onSubmit={forgotPassword}>
                  <FormItem label="E-mail" error={errors.email}>
                    <Input
                      name="email"
                      type="email"
                      autoCapitalize="none"
                      autoFocus
                      onValueChange={(newValue) =>
                        setFieldError('email', newValue)
                      }
                      returnKeyType="send"
                      disabled={isSubmitted}
                      onSubmitEditing={() => {
                        formRef.current?.submitForm()
                      }}
                      accessibilityLabel="email"
                    />
                  </FormItem>
                  <View mt="1.5">
                    <Button
                      disabled={isSubmitted}
                      title="Enviar"
                      onPress={() => formRef.current?.submitForm()}
                      type="secondary"
                    />
                  </View>
                </Form>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </>
      ) : null}
    </View>
  )
}

export default ForgotPasswordScreen
