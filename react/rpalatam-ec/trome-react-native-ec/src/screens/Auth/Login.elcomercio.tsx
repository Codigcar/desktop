import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import React from 'react'
import { TouchableWithoutFeedback, useWindowDimensions } from 'react-native'

import CommonMessageError from './common/CommonMessageError'
import SocialMedia from './common/SocialMedia'
import IconChevronRight from '../../assets/icons/elcomercio/chevron-right.svg'
import IconClose from '../../assets/icons/elcomercio/close.svg'
import Button from '../../components/Button'
import { FormItem } from '../../components/Form'
import Box from '../../components/box'
import Input from '../../components/input'
import Bar from '../../components/progress/Bar'
import Typography from '../../components/typography'
import { useAuthWithEmail } from '../../hooks/useAuthWithEmail'
import { useAuthWithSocialMedia } from '../../hooks/useAuthWithSocialMedia'
import { SUBSCRIPTION_LANDING_URL } from '../../utils/constants'
import { openInBrowser } from '../../utils/inappbrowser'
import type { AuthStackScreenProps } from '../../routes/types'

const { View, ScrollView } = Box
const { Link, Paragraph } = Typography

const LoginScreen: React.FC = () => {
  const navigation =
    useNavigation<AuthStackScreenProps<'SignIn'>['navigation']>()
  const routes = navigation.getState().routes
  const prevRouteName: string = routes[routes.length - 2]?.name
  const window = useWindowDimensions()

  const {
    isSubmitted,
    errors: errorsEmail,
    signInEmail,
    formRef,
    setFieldError,
  } = useAuthWithEmail()
  const {
    signInSocialMedia,
    errors: errorsSocialMedia,
    isSubmitted: isSubmittedSocialMedia,
  } = useAuthWithSocialMedia()

  const error = errorsEmail.common_error ?? errorsSocialMedia.common_error

  return (
    <ScrollView
      bg="background.2"
      bounces={false}
      // eslint-disable-next-line react-native/no-inline-styles
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}>
      <View flex={1}>
        <View
          bg="background.2"
          borderBottomColor="primary"
          borderBottomWidth={1}
          elevation={3}
          px="1.5"
          py="1"
          shadowOffset={{ width: 0, height: 1 }}
          shadowOpacity={0.16}
          shadowRadius={2.22}
          shadowColor="black">
          <View alignSelf="flex-end" mb="0.25">
            <TouchableWithoutFeedback
              hitSlop={{ bottom: 4, left: 4, right: 4, top: 4 }}
              onPress={navigation.goBack}>
              <View height={12} width={12}>
                <IconClose accessibilityLabel="cerrar" fill="#C1C1C1" />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <Paragraph
            fontWeight="bold"
            color="secondary"
            textAlign="center"
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ fontSize: 22 }}>
            Inicia sesión
          </Paragraph>
          <Paragraph
            fontWeight="bold"
            color="text.5"
            fontSize="lg"
            textAlign="center">
            Ingresa con tu e-mail
          </Paragraph>
          {error ? (
            <View mt="0.5">
              <CommonMessageError error={error} />
            </View>
          ) : null}
        </View>
        {isSubmitted || isSubmittedSocialMedia ? (
          <Bar width={window.width} />
        ) : null}
        <View pt="1" px="1.5">
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
                disabled={isSubmitted}
                onPress={() => {
                  formRef.current?.submitForm()
                }}
                size="small"
                type="secondary"
              />
            </View>
          </Form>
          <SocialMedia
            isSubmitted={isSubmitted}
            signInSocialMedia={signInSocialMedia}
          />
        </View>
      </View>
      <View alignItems="center" py="3">
        {prevRouteName === 'PaywallModal' ? (
          <React.Fragment>
            <View mb="0.25">
              <Paragraph color="text.3">¿Todavía no estás suscrito?</Paragraph>
            </View>
            <TouchableWithoutFeedback
              hitSlop={{ bottom: 4, left: 4, right: 4, top: 4 }}
              onPress={() => {
                openInBrowser(`${SUBSCRIPTION_LANDING_URL}/?ref=app`)
              }}>
              <View alignItems="center" flexDirection="row">
                <Paragraph color="link" fontSize="base" textAlign="center">
                  Elige el plan que más te convenga
                </Paragraph>
                <View height={8} ml="0.25" top={1} width={8}>
                  <IconChevronRight fill="#1F92E6" />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <View mb="0.25">
              <Paragraph color="text.3">
                ¿Todavía no estás registrado?
              </Paragraph>
            </View>
            <TouchableWithoutFeedback
              hitSlop={{ bottom: 4, left: 4, right: 4, top: 4 }}
              onPress={() => {
                navigation.replace('SignUp')
              }}>
              <View alignItems="center" flexDirection="row">
                <Paragraph color="link" fontSize="base" textAlign="center">
                  Crea una cuenta gratis
                </Paragraph>
                <View height={8} ml="0.25" top={1} width={8}>
                  <IconChevronRight fill="#1F92E6" />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </React.Fragment>
        )}
      </View>
    </ScrollView>
  )
}

export default LoginScreen
