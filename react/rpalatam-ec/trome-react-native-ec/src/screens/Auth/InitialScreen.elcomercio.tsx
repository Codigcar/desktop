import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@shopify/restyle'
import React, { useEffect } from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import SplashScreen from 'react-native-splash-screen'

import LogoComercio from '../../assets/brands/elcomercio/logo.svg'
import IconChevronRight from '../../assets/icons/elcomercio/chevron-right.svg'
import IconClose from '../../assets/icons/elcomercio/close.svg'
import Button from '../../components/Button'
import Box from '../../components/box/index'
import Typography from '../../components/typography/index'
import { AuthStackScreenProps } from '../../routes/types'
import { Theme } from '../../theme'

const { SafeAreaView, ScrollView, View } = Box
const { Paragraph } = Typography

const BENEFITS = [
  'Navega por la portada',
  'Navega por las secciones',
  'Lee las noticias',
]

const InitialScreen: React.FC = () => {
  const { colors } = useTheme<Theme>()
  const navigation =
    useNavigation<AuthStackScreenProps<'InitialScreen'>['navigation']>()

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  const navigateToHome = () => {
    navigation.replace('Main', {
      screen: 'Home',
      params: { screen: 'Feed' },
    })
  }

  const navigateToLogin = () => {
    navigation.navigate('Login')
  }

  const navigateToSignUp = () => {
    navigation.navigate('SignUp')
  }

  return (
    <View bg="background.2" flex={1}>
      <ScrollView bounces={false} flex={1} showsVerticalScrollIndicator={false}>
        <View bg="primary" flexDirection="column" py="1.5" px="1.5">
          <SafeAreaView edges={['top']} />
          <View
            alignItems="center"
            flexDirection="row"
            justifyContent="space-between">
            <LogoComercio height={27} width={169} viewBox="0 2 270 40" />
            <TouchableWithoutFeedback
              hitSlop={{ bottom: 4, left: 4, right: 4, top: 4 }}
              onPress={navigateToHome}
              testID="icon-close">
              <View height={15} width={15}>
                <IconClose fill="#9E9E9E" />
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View mt="5">
            <Paragraph color="black" fontSize="4xl" fontWeight="light">
              ¡Hola!
            </Paragraph>
            {BENEFITS.map((beneficios, index) => (
              <View
                alignItems="center"
                flexDirection="row"
                key={index}
                py="0.25">
                <View mr="0.5" width={12} height={16}>
                  <IconChevronRight fill={colors['text.3']} />
                </View>
                <Paragraph color="text.3" fontSize="2xl" fontWeight="light">
                  {beneficios}
                </Paragraph>
              </View>
            ))}
          </View>
        </View>
        <View py="1.5" px="1.5">
          <Paragraph
            color="text.5"
            fontWeight="bold"
            fontSize="2xl"
            textAlign="center">
            ¿Ya tienes cuenta?
          </Paragraph>
          <View pt="0.25" pb="1.25">
            <Paragraph
              color="text.3"
              fontSize="2xl"
              fontWeight="light"
              textAlign="center">
              Disfruta de una experiencia personalizada.
            </Paragraph>
          </View>
          <Button
            title="Ingresar"
            testID="benefits-button"
            type="secondary"
            onPress={navigateToLogin}
          />
        </View>
      </ScrollView>
      <View flex={1 / 6}>
        <View mb="0.25">
          <Paragraph color="text.3" textAlign="center">
            ¿Todavía no estás registrado?
          </Paragraph>
        </View>
        <TouchableWithoutFeedback
          hitSlop={{ bottom: 4, left: 4, right: 4, top: 4 }}
          onPress={navigateToSignUp}>
          <View alignItems="center" flexDirection="row" justifyContent="center">
            <Paragraph color="link" textAlign="center">
              Crea una cuenta gratis
            </Paragraph>
            <View height={8} ml="0.25" top={1} width={8}>
              <IconChevronRight fill="#1F92E6" />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

export default InitialScreen
