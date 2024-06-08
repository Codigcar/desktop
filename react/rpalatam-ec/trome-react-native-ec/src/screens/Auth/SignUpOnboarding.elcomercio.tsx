import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@shopify/restyle'
import React, { useEffect } from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import SplashScreen from 'react-native-splash-screen'

import LogoComercio from '../../assets/brands/elcomercio/logo.svg'
import IconChevronRight from '../../assets/icons/elcomercio/chevron-right.svg'
import IconClose from '../../assets/icons/elcomercio/close.svg'
import Box from '../../components/box/index'
import Typography from '../../components/typography/index'
import { useAuth } from '../../context/auth'
import { MainStackScreenProps } from '../../routes/types'
import { Theme } from '../../theme/index'
import { SIGNUP_ONBOARDING_SHOWN } from '../../utils/constants'
import { storage } from '../../utils/storage'
import { cleanText } from '../../utils/tools'

const { SafeAreaView, ScrollView, View } = Box
const { Paragraph, Title } = Typography

const BENEFITS = [
  'Navegar por la portada',
  'Navegar por las secciones',
  'Leer las noticias',
  'Personalizar tus preferencias de lectura',
  'Guardar notas para lectura posterior',
]

const SignUpOnboarding: React.FC = () => {
  const navigation =
    useNavigation<MainStackScreenProps<'SignUpOnboarding'>['navigation']>()
  const { colors } = useTheme<Theme>()
  const { user } = useAuth()

  const nameUser = cleanText(user.first_name)
  const lastNameUser = cleanText(user.last_name)

  const goBack = () => {
    storage.set(SIGNUP_ONBOARDING_SHOWN, true)
    navigation.goBack()
  }

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <View bg="background.2" flex={1}>
      <ScrollView bounces={false}>
        <View bg="primary" flexDirection="column" py="1.5" px="1.5">
          <SafeAreaView edges={['top']} />
          <View
            alignItems="center"
            flexDirection="row"
            justifyContent="space-between">
            <LogoComercio height={27} width={169} viewBox="0 2 270 40" />
            <TouchableWithoutFeedback
              hitSlop={{ bottom: 4, left: 4, right: 4, top: 4 }}
              onPress={goBack}
              testID="icon-close">
              <View height={15} width={15}>
                <IconClose fill="#9E9E9E" />
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View mt="5">
            <View mb="0.25">
              <Paragraph color="black" fontSize="4xl" fontWeight="light">
                Hola
              </Paragraph>
              <Paragraph
                color="black"
                fontSize="xl"
                fontWeight="bold"
                letterSpacing="widest"
                lineHeight="7">
                {nameUser.toUpperCase()} {lastNameUser.toUpperCase()}
              </Paragraph>
            </View>
            <Title color="white" fontSize="4xl" fontWeight="bold">
              ¡Gracias por registrarte!
            </Title>
          </View>
        </View>
        <View py="1.25" pl="1.5" pr="2">
          <Paragraph
            color="text.5"
            fontWeight="bold"
            fontSize="2xl"
            letterSpacing="wider">
            Disfruta de tus beneficios
          </Paragraph>
          {BENEFITS.map((beneficios, index) => (
            <View
              alignItems="flex-start"
              flexDirection="row"
              key={index}
              py="0.25">
              <View mr="0.5" top={6} width={12} height={16}>
                <IconChevronRight fill={colors['text.3']} />
              </View>
              <Paragraph color="text.3" fontSize="2xl" fontWeight="light">
                {beneficios}
              </Paragraph>
            </View>
          ))}
        </View>
        <SafeAreaView edges={['bottom']} />
      </ScrollView>
    </View>
  )
}

export default SignUpOnboarding
