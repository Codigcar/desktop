import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import React from 'react'
import { Platform, useWindowDimensions } from 'react-native'

import Banner from './common/Banner'
import CommonMessageError from './common/CommonMessageError'
import SocialMedia from './common/SocialMedia'
import Button from '../../components/Button'
import { FormItem } from '../../components/Form'
import Box from '../../components/box'
import Input from '../../components/input'
import Bar from '../../components/progress/Bar'
import Typography from '../../components/typography'
import { useAuthWithEmail } from '../../hooks/useAuthWithEmail'
import { useAuthWithSocialMedia } from '../../hooks/useAuthWithSocialMedia'
import type { RootStackScreenProps } from '../../routes/types'

const { View, ScrollView, KeyboardAvoidingView } = Box
const { Link, Paragraph } = Typography

const SignwallModalScreen: React.FC = () => {
  const navigation =
    useNavigation<RootStackScreenProps<'SignwallModal'>['navigation']>()
  const window = useWindowDimensions()

  const {
    isSubmitted: isSubmittedAuth,
    errors: errorsEmail,
    signInEmail,
    formRef,
    setFieldError,
  } = useAuthWithEmail()
  const {
    errors: errorsSocialMedia,
    isSubmitted: isSubmittedSocialMedia,
    signInSocialMedia,
  } = useAuthWithSocialMedia()

  const navigateToRegister = (): void => {
    navigation.navigate('SignUp')
  }

  const errors = errorsEmail.common_error ?? errorsSocialMedia.common_error

  return (
    <View bg="background.2" flex={1}>
      <Banner
        title="¿No tienes cuenta? Regístrate para seguir navegando. Es gratis"
        onPress={navigateToRegister}
      />
      {isSubmittedAuth || isSubmittedSocialMedia ? (
        <Bar width={window.width} />
      ) : null}
      <KeyboardAvoidingView
        enabled={Platform.OS === 'ios'}
        behavior="padding"
        keyboardVerticalOffset={50}
        flex={1}>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <View px="1.5" py="1">
            <Paragraph
              fontWeight="bold"
              color={'text.5'}
              fontSize={'lg'}
              textAlign="center">
              ¿Ya tienes cuenta?{'\n'}Ingresa con tu e-mail
            </Paragraph>
            <CommonMessageError error={errors} />
            <Form ref={formRef} onSubmit={signInEmail}>
              <FormItem label="E-mail" error={errorsEmail.email}>
                <Input
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
                  accessibilityLabel="contraseña"
                />
              </FormItem>
              <Link
                fontSize="sm"
                fontWeight="normal"
                onPress={() => {
                  navigation.navigate('RecoveryPassword')
                }}>
                Olvidé mi contraseña
              </Link>
              <View pt="1.25">
                <Button
                  title="Ingresar"
                  disabled={isSubmittedAuth}
                  onPress={() => {
                    formRef.current?.submitForm()
                  }}
                  size="small"
                  type="secondary"
                />
              </View>
            </Form>
            <SocialMedia
              isSubmitted={isSubmittedSocialMedia}
              signInSocialMedia={signInSocialMedia}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

export default SignwallModalScreen
