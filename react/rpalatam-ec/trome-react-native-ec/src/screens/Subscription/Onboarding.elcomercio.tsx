import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@shopify/restyle'
import React from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

import LogoComercio from '../../assets/brands/elcomercio/logo.svg'
import IconChevronRight from '../../assets/icons/elcomercio/chevron-right.svg'
import IconClose from '../../assets/icons/elcomercio/close.svg'
import Button from '../../components/Button'
import Box from '../../components/box/index'
import Typography from '../../components/typography/index'
import { useAuth } from '../../context/auth'
import { useThemeContext } from '../../context/theme'
import { MainStackScreenProps } from '../../routes/types'
import { Theme } from '../../theme/index'
import { cleanText } from '../../utils/tools'

const { SafeAreaView, ScrollView, View } = Box
const { Paragraph, Title } = Typography

const BENEFITS = [
  'Acceso ilimitado',
  'Ofertas del Club',
  'Newsletters exclusivas',
  'Juegos',
  'Guardar contenidos',
]

const SubscriptionOnboarding: React.FC = () => {
  const navigation =
    useNavigation<
      MainStackScreenProps<'SubscriptionOnboarding'>['navigation']
    >()
  const { colors } = useTheme<Theme>()
  const { currentTheme } = useThemeContext()
  const { user } = useAuth()

  const nameUser = cleanText(user.first_name)
  const lastNameUser = cleanText(user.last_name)

  return (
    <View bg="background.2" flex={1}>
      <ScrollView bounces={false} flex={1}>
        <View bg="primary" flexDirection="column" py="1.5" px="1.5">
          <SafeAreaView edges={['top']} />
          <View
            alignItems="center"
            flexDirection="row"
            justifyContent="space-between">
            <LogoComercio height={27} width={169} viewBox="0 2 270 40" />
            <TouchableWithoutFeedback
              hitSlop={{ bottom: 4, left: 4, right: 4, top: 4 }}
              onPress={navigation.goBack}
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
                letterSpacing="widest">
                {nameUser.toUpperCase()} {lastNameUser.toUpperCase()}
              </Paragraph>
            </View>
            <Title color="white" fontSize="4xl" fontWeight="bold">
              ¡Gracias por suscribirte!
            </Title>
          </View>
        </View>
        <View py="1.25" px="1.5">
          <Paragraph color="text.5" fontWeight="bold" fontSize="2xl">
            Disfruta de tus beneficios
          </Paragraph>
          {BENEFITS.map((beneficios, index) => (
            <View alignItems="center" flexDirection="row" key={index} py="0.25">
              <View mr="0.5" width={16} height={16}>
                <IconChevronRight fill={colors['text.3']} />
              </View>
              <Paragraph color="text.3" fontSize="xl" fontWeight="light">
                {beneficios}
              </Paragraph>
            </View>
          ))}

          <View mt="1.5">
            <Button
              size="default"
              title="Quiero conocer mis beneficios"
              testID="benefits-button"
              type={currentTheme === 'dark' ? 'primary' : 'default'}
            />
          </View>
        </View>
        <SafeAreaView edges={['bottom']} />
      </ScrollView>
    </View>
  )
}

export default SubscriptionOnboarding
