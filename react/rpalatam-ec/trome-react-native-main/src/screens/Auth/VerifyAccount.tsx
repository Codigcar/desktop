/* eslint-disable react-native/no-inline-styles */
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect } from 'react'

import Button from '../../components/Button'
import Box from '../../components/box'
import Typography from '../../components/typography'
import { useNotification } from '../../context/notification'
import useCountDown from '../../hooks/useCountDown'
import auth from '../../services/auth'
import type { AuthStackScreenProps } from '../../routes/types'

const { ScrollView, View } = Box
const { Link, Paragraph, Title } = Typography

const VerifyScreen: React.FC = () => {
  const navigation =
    useNavigation<AuthStackScreenProps<'VerifyAccount'>['navigation']>()
  const { params } = useRoute<AuthStackScreenProps<'VerifyAccount'>['route']>()
  const notification = useNotification()

  const { isComplete, startCounter, remainingTime, resetCounter } =
    useCountDown({
      initialTimeSeconds: 30,
      autoplay: true,
    })

  async function onPressResend() {
    try {
      await auth.requestVerifyEmail(params.emailToResend)
      resetCounter()
      startCounter()
    } catch (error) {
      let message = 'Ocurrió un error inesperado'
      if (error instanceof Error) message = error.message
      notification.show({ message, type: 'error' })
    }
  }

  useEffect(() => {
    if (params.emailToResend) {
      resetCounter()
      startCounter()
    }
  }, [params.emailToResend, resetCounter, startCounter])

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} bg="background">
      <View mt="2" px="0.75">
        <Title color="heading" fontSize="3xl" letterSpacing="tighter">
          Verifica tu cuenta
        </Title>
        <View my="0.75">
          <Paragraph color="coolGray-500">
            Te hemos enviado un correo de cambiar contraseña para confirmar tu
            cuenta. Si no te llegó puedes reenviarlo.
          </Paragraph>
        </View>
        <Button
          onPress={onPressResend}
          disabled={!isComplete}
          title={
            isComplete
              ? 'Reenviar correo'
              : `Reenviar correo en ${remainingTime}`
          }
          type={isComplete ? 'primary' : 'secondary'}
        />
      </View>
      <View my="1.5" px="0.75">
        <Paragraph color="coolGray-500" fontWeight="normal" textAlign="center">
          ¿Ya validaste tu cuenta?{' '}
          <Link
            onPress={() => {
              navigation.navigate('Auth', {
                screen: 'SignIn',
                params: { email: params.emailToResend },
              })
            }}
            testID="signin-link">
            Inicia sesión
          </Link>
        </Paragraph>
      </View>
    </ScrollView>
  )
}

export default VerifyScreen
