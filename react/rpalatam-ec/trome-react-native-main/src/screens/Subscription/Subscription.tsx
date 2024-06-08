import crashlytics from '@react-native-firebase/crashlytics'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Linking,
  Platform,
  TouchableOpacity,
} from 'react-native'
import NativeConfig from 'react-native-config'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import IsotipoElComercio from '../../assets/brands/elcomercio/isotipo.svg'
import IsotipoGestion from '../../assets/brands/gestion/isotipo.svg'
import Button from '../../components/Button'
import Box from '../../components/box'
import Ribbon from '../../components/ribbon'
import Typography from '../../components/typography'
import { useAuth } from '../../context/auth'
import { useThemeContext } from '../../context/theme'
import subscription from '../../services/subscription'
import { App } from '../../utils/config'
import type { SubscriptionDetail } from '../../services/subscription/subscription.types'

const { SafeAreaView, ScrollView, View } = Box
const { Paragraph } = Typography

const dateTimeFormat = new Intl.DateTimeFormat('es-PE')
const numberFormat = new Intl.NumberFormat('es-PE', {
  style: 'currency',
  currency: 'PEN',
})

const BENEFITS = [
  'Sin anuncios en la aplicación.',
  'Análisis e informes exclusivos.',
  'Navegación ilimitada desde todos tus dispositivos.',
  'Descuentos especiales del Club de beneficios.',
  'Soporte prioritario en la aplicación.',
]
const BASE_WEB_URL = App.select({
  elcomercio:
    NativeConfig.APP_ENVIRONMENT === 'production'
      ? 'https://elcomercio.pe'
      : 'https://elcomercio-elcomercio-sandbox.cdn.arcpublishing.com',
  gestion:
    NativeConfig.APP_ENVIRONMENT === 'production'
      ? 'https://gestion.pe'
      : 'https://elcomercio-gestion-sandbox.cdn.arcpublishing.com',
})

function billingInterval(interval: string, count: number) {
  const greaterThanOne = count > 1
  const dates: Record<string, string> = {
    day: greaterThanOne ? 'días' : 'día',
    week: greaterThanOne ? 'semanas' : 'semana',
    month: greaterThanOne ? 'meses' : 'mes',
    year: greaterThanOne ? 'años' : 'año',
  }
  return `${count} ${dates[interval] || interval}`
}

const Isotipo: React.FC = () => {
  const { currentTheme } = useThemeContext()

  const ISO = App.select({
    elcomercio: <IsotipoElComercio color="black" />,
    gestion: (
      <IsotipoGestion color={currentTheme === 'dark' ? 'white' : '#8F071F'} />
    ),
    default: null,
  })

  return (
    <View
      alignItems="center"
      bg={App.key === 'elcomercio' ? 'brand' : 'background'}
      borderRadius="sm"
      height={42}
      justifyContent="center"
      width={42}>
      <View width={28}>{ISO}</View>
    </View>
  )
}

const LandingButton: React.FC = () => {
  if (Platform.OS !== 'android') return null
  return (
    <Button
      onPress={() => {
        Linking.openURL(`${BASE_WEB_URL}/suscripciones/`)
      }}
      title="Suscribirme"
      type="primary"
    />
  )
}

const ManageButton: React.FC = () => (
  <TouchableOpacity
    activeOpacity={0.6}
    onPress={() => {
      Linking.openURL(`${BASE_WEB_URL}/mi-cuenta/`)
    }}>
    <View
      alignItems="center"
      backgroundColor="background"
      flexDirection="row"
      justifyContent="center"
      height={42}>
      <Paragraph color="coolGray-700">
        <Icon name="cog-outline" size={20} />
      </Paragraph>
      <View ml="0.5">
        <Paragraph color="coolGray-700" fontWeight="bold" textAlign="center">
          Gestionar tu suscripción
        </Paragraph>
      </View>
    </View>
  </TouchableOpacity>
)

const SubscriptionScreen: React.FC = () => {
  const { user, isSubscribed } = useAuth()
  const [subscriptions, setSubscriptions] = useState<SubscriptionDetail[]>()

  useEffect(() => {
    if (user.id && isSubscribed) {
      subscription
        ?.list(user.id)
        .then(setSubscriptions)
        .catch((error) => {
          crashlytics().recordError(error)
        })
    }
  }, [user.id, isSubscribed])

  return (
    <View bg="background" flex={1}>
      <Ribbon title="Suscripción" />
      <ScrollView flex={1} pt="1" px="1">
        <View bg="backgroundSecondary" borderRadius="md" px="1" py="1.25">
          {isSubscribed ? null : (
            <View alignItems="center">
              <Isotipo />
              <View my="0.75">
                <Paragraph
                  color="coolGray-700"
                  fontWeight="medium"
                  lineHeight="tight"
                  textAlign="center">
                  Suscríbete y empieza a disfrutar de todos nuestros beneficios
                </Paragraph>
              </View>
              <LandingButton />
            </View>
          )}
          {isSubscribed && !subscriptions ? (
            <View alignItems="center">
              <ActivityIndicator testID="loading" size="small" />
            </View>
          ) : null}
          {isSubscribed && subscriptions?.length === 0 ? (
            <View>
              <View alignItems="center" flexDirection="row" mb="0.75">
                <Isotipo />
                <View flex={1} ml="0.5">
                  <Paragraph
                    color="coolGray-700"
                    fontSize="lg"
                    fontWeight="bold">
                    Plan Suscriptor - Activo
                  </Paragraph>
                </View>
              </View>
              <View mt="0.75">
                <ManageButton />
              </View>
            </View>
          ) : null}
          {subscriptions?.map((detail) => {
            const item = detail.items[0]
            return (
              <View key={detail.id}>
                <View alignItems="center" flexDirection="row" mb="0.75">
                  <Isotipo />
                  <View flex={1} ml="0.5">
                    <Paragraph
                      color="coolGray-700"
                      fontSize="lg"
                      fontWeight="bold"
                      lineHeight="snug">
                      {detail.name}
                    </Paragraph>
                  </View>
                </View>
                {!item ? null : (
                  <Paragraph color="coolGray-700">
                    Facturación de {numberFormat.format(item.price)} cada{' '}
                    {billingInterval(item.interval, item.interval_count)}.
                  </Paragraph>
                )}
                {detail.status !== 'active' ? null : (
                  <Paragraph color="coolGray-700">
                    Tu plan se renovará automáticamente el{' '}
                    {dateTimeFormat.format(detail.next_billing_date * 1000)}.
                  </Paragraph>
                )}
                <View mt="0.75">
                  <ManageButton />
                </View>
              </View>
            )
          })}
        </View>
        <View mt="1.25">
          <View mb="0.5">
            <Paragraph color="coolGray-700" fontSize="lg" fontWeight="bold">
              Beneficios
            </Paragraph>
          </View>
          {BENEFITS.map((text, index) => (
            <View key={index} my="0.25" flexDirection="row">
              <Paragraph color="coolGray-700">
                <Icon name="check-circle-outline" size={20} />
              </Paragraph>
              <View flex={1} ml="0.5">
                <Paragraph color="coolGray-700">{text}</Paragraph>
              </View>
            </View>
          ))}
        </View>
        <SafeAreaView edges={['bottom']} />
      </ScrollView>
    </View>
  )
}

export default SubscriptionScreen
