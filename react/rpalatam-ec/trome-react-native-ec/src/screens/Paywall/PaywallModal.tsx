import crashlytics from '@react-native-firebase/crashlytics'
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, TouchableWithoutFeedback } from 'react-native'
import NativeConfig from 'react-native-config'

import IconChevronRight from '../../assets/icons/elcomercio/chevron-right.svg'
import IconClose from '../../assets/icons/elcomercio/close.svg'
import Button from '../../components/Button'
import Box from '../../components/box'
import Typography from '../../components/typography'
import { useAuth } from '../../context/auth'
import subscription from '../../services/subscription'
import { App } from '../../utils/config'
import { SUBSCRIPTION_LANDING_URL } from '../../utils/constants'
import { openInBrowser } from '../../utils/inappbrowser'
import type { RootStackScreenProps } from '../../routes/types'

const { ScrollView, View } = Box
const { Paragraph } = Typography
const IS_PRODUCTION = NativeConfig.APP_ENVIRONMENT === 'production'

const config = App.select({
  elcomercio: {
    id: IS_PRODUCTION ? 'OFXNNU0EQ383' : 'OFRIYIS4I1L7',
  },
})
const service = subscription?.plan(config?.id || '')

type Plan = {
  price: number
  offer_price: number
}

const PaywallModalScreen: React.FC = () => {
  const navigation =
    useNavigation<RootStackScreenProps<'PaywallModal'>['navigation']>()
  const { params } = useRoute<RootStackScreenProps<'PaywallModal'>['route']>()
  const [plan, setPlan] = useState<Plan>()
  const { user, verifySubscription } = useAuth()
  const [isVerifying, setIsVerifying] = useState(false)

  useEffect(() => {
    service
      ?.then(({ price, offer }) => {
        setPlan({ price, offer_price: offer?.price || price })
      })
      .catch((error) => {
        crashlytics().recordError(error)
      })
  }, [])

  const handleRestore = async () => {
    if (!user.id) return navigation.navigate('Login')
    setIsVerifying(true)
    await verifySubscription()
    setIsVerifying(false)
  }

  return (
    <ScrollView bg="background.2" bounces={false} flex={1} pt="1">
      <View px="1.25">
        <View alignSelf="flex-end" mb="0.25">
          <TouchableWithoutFeedback
            hitSlop={{ bottom: 4, left: 4, right: 4, top: 4 }}
            onPress={() => navigation.goBack()}>
            <View height={12} width={12}>
              <IconClose accessibilityLabel="cerrar" fill="#C1C1C1" />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <Paragraph
          color="text.5"
          fontSize="lg"
          fontWeight="bold"
          lineHeight="6"
          textAlign="center">
          {params.title}
        </Paragraph>
        <View py="0.75">
          <Paragraph
            color="text.3"
            fontSize="3xl"
            lineHeight="8"
            textAlign="center"
            fontWeight="light">
            Elige el plan que más te convenga
          </Paragraph>
        </View>
        <View alignItems="center" flexDirection="row" justifyContent="center">
          <Paragraph color="text.4" fontSize="base" textAlign="center">
            ¿Ya tienes una suscripción?{' '}
          </Paragraph>
          {isVerifying ? (
            <Paragraph color="link" fontSize="base" textAlign="center">
              Validando...
            </Paragraph>
          ) : (
            <TouchableWithoutFeedback
              hitSlop={{ bottom: 4, left: 4, right: 4, top: 4 }}
              onPress={handleRestore}>
              <View alignItems="center" flexDirection="row">
                <Paragraph color="link" fontSize="base" textAlign="center">
                  Restaurar
                </Paragraph>
                <View height={8} ml="0.25" top={1} width={8}>
                  <IconChevronRight fill="#1F92E6" />
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
      </View>
      <View
        bg="primary"
        elevation={3}
        mb="1"
        mt="2.5"
        pb="2"
        pt="1"
        px="1.5"
        shadowOffset={{ width: 0, height: 3 }}
        shadowOpacity={0.32}
        shadowColor="black">
        {plan ? (
          <React.Fragment>
            <Paragraph
              color="white"
              fontSize="xl"
              fontWeight="black"
              lineHeight="6"
              textAlign="center"
              textTransform="uppercase">
              Plan Digital Mensual
            </Paragraph>
            <View
              alignItems="center"
              flexDirection="row"
              justifyContent="center">
              <View alignItems="center" flexDirection="row" mr="0.75">
                <View top={12}>
                  <Paragraph color="black" fontSize="4xl" fontWeight="black">
                    s/
                  </Paragraph>
                </View>
                <Paragraph color="black" fontSize="6xl" fontWeight="black">
                  {plan.offer_price}
                </Paragraph>
              </View>
              <Paragraph
                color="black"
                fontSize="xl"
                fontWeight="medium"
                lineHeight="6">
                El primer{'\n'}mes
              </Paragraph>
            </View>
            <Paragraph
              color="black"
              fontSize="xl"
              lineHeight="6"
              textAlign="center">
              Luego S/{plan.price} al mes
            </Paragraph>
            <View mt="1.25">
              <Button
                title="VER PLANES"
                onPress={() => {
                  openInBrowser(`${SUBSCRIPTION_LANDING_URL}/?ref=app`)
                }}
              />
            </View>
          </React.Fragment>
        ) : (
          <View pt="1">
            <ActivityIndicator color="black" testID="loading" />
          </View>
        )}
      </View>
      <View mb="2">
        <Paragraph
          color="text.3"
          fontSize="xl"
          fontWeight="bold"
          lineHeight="8"
          textAlign="center">
          Contenidos exclusivos{'\n'}+{'\n'}
          Navegación ilimitada{'\n'}+{'\n'}
          Club de Suscriptores{'\n'}+{'\n'}
          Sin anuncios en la app
        </Paragraph>
      </View>
    </ScrollView>
  )
}

export default PaywallModalScreen
