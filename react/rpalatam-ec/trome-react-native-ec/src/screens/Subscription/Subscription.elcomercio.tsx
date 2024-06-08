import crashlytics from '@react-native-firebase/crashlytics'
import React, { useEffect, useState } from 'react'

import Button from '../../components/Button'
import Box from '../../components/box'
import Ribbon from '../../components/ribbon'
import Typography from '../../components/typography'
import { useAuth } from '../../context/auth'
import subscription from '../../services/subscription'
import { ORIGIN, SUBSCRIPTION_LANDING_URL } from '../../utils/constants'
import { openInBrowser } from '../../utils/inappbrowser'
import { cleanText } from '../../utils/tools'

const { View, ScrollView, SafeAreaView } = Box
const { Paragraph, Title } = Typography

const itemList: string[] = [
  'Sin anuncios en la app.',
  'Contenido Premium.',
  'Navegación ilimitada desde todos sus dispositivos.',
  'Descuentos especiales del Club de Suscriptores.',
]

const SubscriptionScreen: React.FC = () => {
  const { isSubscribed, user } = useAuth()
  const [lastActiveSubscription, setLastActiveSubscription] =
    useState<string>('')
  const lastNameUser = cleanText(user.last_name)
  const nameUser = cleanText(user.first_name)

  useEffect(() => {
    if (user.id && isSubscribed) {
      subscription
        ?.list(user.id)
        .then((subs) => {
          if (subs.length > 0) {
            setLastActiveSubscription(
              subs[subs.length - 1].name.trim().toLocaleLowerCase(),
            )
          }
        })
        .catch((error) => {
          crashlytics().recordError(error)
        })
    }
  }, [user.id, isSubscribed])

  return (
    <View bg="background.2" flex={1}>
      <Ribbon title="Mi suscripción" />

      <ScrollView backgroundColor="background.3" pt="0.5" flex={1}>
        {!isSubscribed ? (
          <View pt="2" px="1.5">
            <Paragraph color="text.5" fontWeight="bold" lineHeight="tight">
              {nameUser.toUpperCase()} {lastNameUser.toUpperCase()}
            </Paragraph>
            <Paragraph
              color="text.5"
              fontSize="xs"
              fontWeight="bold"
              lineHeight="tight">
              Todavía no eres suscriptor
            </Paragraph>
            <View mt="0.5">
              <Paragraph color="text.5">
                Suscríbete y disfruta de ventajas y beneficios que te ofrece El
                Comercio
              </Paragraph>
            </View>
            <View mt="1">
              <Button
                accessibilityLabel="suscribete"
                onPress={() => {
                  openInBrowser(`${SUBSCRIPTION_LANDING_URL}/?ref=app`)
                }}
                type="secondary"
                title="Suscríbete"
              />
            </View>
          </View>
        ) : null}

        {isSubscribed ? (
          <View pt="2" px="1.5">
            <Paragraph color="text.5" fontWeight="bold" lineHeight="tight">
              {nameUser.toUpperCase()} {lastNameUser.toUpperCase()}
            </Paragraph>
            <View mt="0.5">
              <Paragraph
                color="text.5"
                fontSize="xs"
                fontWeight="bold"
                lineHeight="tight">
                Plan suscriptor Activo
              </Paragraph>

              <Paragraph fontSize="xs" color="text.5">
                Tienes una suscripción {lastActiveSubscription}
              </Paragraph>
            </View>

            <View mt="1.5">
              <Button
                onPress={() => {
                  openInBrowser(`${ORIGIN}/mi-cuenta/?ref=ecr`)
                }}
                type="secondary"
                title="Gestionar tu suscripción"
              />
            </View>
          </View>
        ) : null}

        <View mt="2" px="2">
          <Title fontSize="2xl" fontWeight="bold" color="secondary">
            Beneficios
          </Title>
          <View mt="0.5">
            {itemList.map((item) => (
              <View mb="0.25" key={item} flexDirection="row">
                <View
                  width={3}
                  height={3}
                  bg="text.5"
                  mt="0.75"
                  mr="0.75"
                  borderRadius="sm"
                />
                <Title fontSize="xl" color="text.5">
                  {item}
                </Title>
              </View>
            ))}
          </View>
        </View>
        <SafeAreaView edges={['bottom']} />
      </ScrollView>
    </View>
  )
}

export default SubscriptionScreen
