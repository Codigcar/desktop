import crashlytics from '@react-native-firebase/crashlytics'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useTheme } from '@shopify/restyle'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, TouchableWithoutFeedback } from 'react-native'
import NativeConfig from 'react-native-config'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Box from '../../components/box'
import Typography from '../../components/typography'
import { useAuth } from '../../context/auth'
import subscription from '../../services/subscription'
import type { RootStackScreenProps } from '../../routes/types'
import type { Theme } from '../../theme'

const { SafeAreaView, View } = Box
const { Link, Paragraph } = Typography
const IS_PRODUCTION = NativeConfig.APP_ENVIRONMENT === 'production'

const ID_PLAN = IS_PRODUCTION ? 'OFIZGXJE4HHF' : 'OFV0LIPPEO2L'
const service = subscription?.plan(ID_PLAN)

type Plan = {
  price: number
  offer_price: number
}

const BENEFITS = [
  'Sin anuncios en la aplicación.',
  'Análisis e informes exclusivos.',
  'Navegación ilimitada desde todos tus dispositivos.',
  'Descuentos especiales del Club de beneficios.',
  'Soporte prioritario en la aplicación.',
]

const PaywallModalScreen: React.FC = () => {
  const navigation =
    useNavigation<RootStackScreenProps<'PaywallModal'>['navigation']>()
  const { params } = useRoute<RootStackScreenProps<'PaywallModal'>['route']>()
  const [plan, setPlan] = useState<Plan>()
  const { user, verifySubscription } = useAuth()
  const [isVerifying, setIsVerifying] = useState(false)
  const { colors } = useTheme<Theme>()

  useEffect(() => {
    service
      ?.then(({ price, offer }) => {
        setPlan({ price, offer_price: offer?.price || price })
      })
      .catch((error) => crashlytics().recordError(error))
  }, [])

  const handleRestore = async () => {
    if (!user.id)
      return navigation.navigate('Auth', { screen: 'InitialScreen' })
    setIsVerifying(true)
    await verifySubscription()
    setIsVerifying(false)
  }

  return (
    <View flex={1} flexDirection="column-reverse">
      <View
        bg="background"
        borderTopLeftRadius="xl"
        borderTopRightRadius="xl"
        zIndex={1}>
        <View
          bg="red-800"
          borderTopLeftRadius="xl"
          borderTopRightRadius="xl"
          p="1">
          <Paragraph color="white">{params.title}</Paragraph>
          <Paragraph
            color="white"
            fontSize="3xl"
            fontWeight="bold"
            lineHeight="10">
            Plan Digital
          </Paragraph>
        </View>
        {plan ? (
          <View
            alignItems="center"
            flexDirection="row"
            justifyContent="center"
            py="0.5">
            <View alignItems="center" flexDirection="row" mr="0.75">
              <View top={12}>
                <Paragraph
                  color="coolGray-800"
                  fontSize="4xl"
                  fontWeight="black">
                  s/
                </Paragraph>
              </View>
              <Paragraph color="coolGray-800" fontSize="6xl" fontWeight="black">
                {plan.offer_price}
              </Paragraph>
            </View>
            <View>
              <Paragraph
                color="coolGray-800"
                fontSize="sm"
                fontWeight="bold"
                lineHeight="none">
                AL MES{'\n'}DURANTE 1 MES
              </Paragraph>
              <Paragraph color="coolGray-800" fontSize="sm" fontWeight="light">
                LUEGO S/{plan.price} AL MES
              </Paragraph>
            </View>
          </View>
        ) : (
          <View py="1">
            <ActivityIndicator color="black" testID="loading" />
          </View>
        )}
        <View px="1">
          <View flexDirection="row">
            <View bg="separator" flex={1} height={1} mt="0.5" />
            <View top={-5} px="1">
              <Paragraph
                color="coolGray-700"
                textAlign="center"
                fontWeight="bold"
                letterSpacing="wide">
                BENEFICIOS
              </Paragraph>
            </View>
            <View bg="separator" flex={1} height={1} mt="0.5" />
          </View>
          {BENEFITS.map((beneficios, index) => (
            <View
              alignItems="flex-start"
              flexDirection="row"
              key={index}
              my="0.25">
              <View
                alignItems="center"
                borderColor="coolGray-700"
                borderRadius="full"
                borderWidth={1.5}
                height={16}
                justifyContent="center"
                mt="0.25"
                width={16}>
                <Icon color={colors['coolGray-800']} name="check" size={12} />
              </View>
              <View pl="0.5">
                <Paragraph color="coolGray-700" fontWeight="light">
                  {beneficios}
                </Paragraph>
              </View>
            </View>
          ))}
          <View
            alignItems="center"
            flexDirection="row"
            justifyContent="center"
            py="1">
            <Paragraph color="coolGray-700">
              ¿Ya tienes una suscripción?{' '}
            </Paragraph>
            {isVerifying ? (
              <Link>Validando...</Link>
            ) : (
              <Link onPress={handleRestore}>Restaurar</Link>
            )}
          </View>
        </View>
        <TouchableWithoutFeedback onPress={navigation.goBack}>
          <View
            alignItems="center"
            flexDirection="row"
            justifyContent="center"
            bg="black"
            py="0.5">
            <Paragraph color="white">Volver</Paragraph>
          </View>
        </TouchableWithoutFeedback>
        <SafeAreaView edges={['bottom']} bg="black" />
      </View>
      <TouchableWithoutFeedback onPress={navigation.goBack}>
        <View
          bg="black"
          opacity={0.5}
          testID="backdrop"
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
        />
      </TouchableWithoutFeedback>
    </View>
  )
}

export default PaywallModalScreen
