import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@shopify/restyle'
import React, { useCallback } from 'react'
import { Alert, TouchableWithoutFeedback } from 'react-native'

import IconAccountCircleUotline from '../../assets/icons/elcomercio/account-circle-outline.svg'
import IconChevronLeft from '../../assets/icons/elcomercio/chevron-left.svg'
import IconChevronRight from '../../assets/icons/elcomercio/chevron-right.svg'
import Button from '../../components/Button'
import Box from '../../components/box'
import Menu from '../../components/menu'
import Ribbon from '../../components/ribbon'
import Typography from '../../components/typography'
import { useAuth } from '../../context/auth'
import { useThemeContext } from '../../context/theme'
import { SUBSCRIPTION_LANDING_URL } from '../../utils/constants'
import { openInBrowser } from '../../utils/inappbrowser'
import { cleanText } from '../../utils/tools'
import type { MainStackScreenProps } from '../../routes/types'
import type { Theme } from '../../theme'

const { SafeAreaView, View, ScrollView } = Box
const { Paragraph } = Typography
const { Item } = Menu

type ItemList = {
  title: string
  subtitle: string
  action?: () => void
}

const useListItem = () => {
  const navigation =
    useNavigation<MainStackScreenProps<'Profile'>['navigation']>()
  const { user } = useAuth()

  const protectedScreen = useCallback(
    (callback: () => void) => {
      if (user.id) return callback()
      navigation.navigate('Login')
    },
    [navigation, user.id],
  )

  const listItem: ItemList[] = [
    {
      title: 'Mi cuenta',
      subtitle: 'Edite su información',
      action: () =>
        protectedScreen(() =>
          navigation.navigate('Account', { screen: 'AccountOptions' }),
        ),
    },
    {
      title: 'Mi suscripción',
      subtitle: 'Detalles de tu suscripción',
      action: () => protectedScreen(() => navigation.navigate('Subscription')),
    },
    {
      title: 'Mis intereses',
      subtitle: 'Selecciona los temas que más te interesan',
      action: () => protectedScreen(() => navigation.navigate('Interests')),
    },
    {
      title: 'Ordenar secciones',
      subtitle: 'Organice el orden de las secciones',
      action: () => protectedScreen(() => navigation.navigate('CustomContent')),
    },
    {
      title: 'Alertas',
      subtitle: 'Reciba notificaciones de contenido',
      action: () => protectedScreen(() => navigation.navigate('Notifications')),
    },
    {
      title: 'Newsletters',
      subtitle: 'Seleccione los boletines que quiere recibir',
      action: () => navigation.navigate('Newsletters'),
    },
    {
      title: 'Leer Luego',
      subtitle: 'Todas tus noticias guardadas',
      action: () => protectedScreen(() => navigation.navigate('Favorite')),
    },
  ]

  return { listItem }
}

const ProfileScreen: React.FC = () => {
  const navigation =
    useNavigation<MainStackScreenProps<'Profile'>['navigation']>()

  const { colors } = useTheme<Theme>()
  const { currentTheme } = useThemeContext()
  const { listItem } = useListItem()
  const { isAuthenticated, isSubscribed, user, signout } = useAuth()

  const lastNameUser = cleanText(user.last_name)
  const nameUser = cleanText(user.first_name)

  const handleLogout = () => {
    Alert.alert(nameUser || 'Confirmación', '¿Estás seguro de cerrar sesión?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        onPress: signout,
        text: 'Cerrar sesión',
        style: 'destructive',
      },
    ])
  }
  const buttonType = currentTheme === 'dark' ? 'primary' : 'default'

  return (
    <View bg="background.2" flex={1}>
      <Ribbon
        LeftComponent={() => {
          return (
            <View alignItems="center" flexDirection="row">
              <TouchableWithoutFeedback
                hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}
                onPress={navigation.goBack}
                testID="goback-button">
                <View height={16} width={16}>
                  <IconChevronLeft
                    fill={colors['stroke.1']}
                    height={16}
                    width={16}
                  />
                </View>
              </TouchableWithoutFeedback>
              <View alignItems="center" flexDirection="row" ml="1.25">
                <View mr="0.5">
                  <IconAccountCircleUotline
                    fill={colors['text.1']}
                    height={20}
                    width={20}
                  />
                </View>
                <Paragraph
                  textAlign="center"
                  color="text.1"
                  fontSize="lg"
                  fontWeight="black">
                  Mi Perfil
                </Paragraph>
              </View>
            </View>
          )
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {!isAuthenticated ? (
          <View p="1.5" backgroundColor="background.3">
            <Paragraph color="text.5">
              ¡Hola!{'\n'}
              Crea <Paragraph fontWeight="bold">
                una cuenta gratis
              </Paragraph>{' '}
              para navegar por la app
            </Paragraph>
            <View mt="1">
              <Button
                title="¡REGÍSTRATE!"
                type={buttonType}
                onPress={() => {
                  navigation.navigate('SignUp')
                }}
              />
            </View>
          </View>
        ) : null}

        {isAuthenticated && !isSubscribed ? (
          <View p="1.5" backgroundColor="background.3">
            <Paragraph color="text.5">Hola</Paragraph>
            <Paragraph color="text.5" fontWeight="bold" lineHeight="tight">
              {nameUser.toUpperCase()} {lastNameUser.toUpperCase()}
            </Paragraph>
            <Paragraph color="text.5" fontSize="xs" fontWeight="medium">
              {user.email}
            </Paragraph>
            <Paragraph color="text.5" fontSize="xs">
              Todavía no eres suscriptor
            </Paragraph>
            <View mt="1">
              <Button
                onPress={() => {
                  openInBrowser(`${SUBSCRIPTION_LANDING_URL}/?ref=app`)
                }}
                type={buttonType}
                title="¡SUSCRÍBETE!"
              />
            </View>
          </View>
        ) : null}

        {isSubscribed ? (
          <View p="1.5" backgroundColor="background.3">
            <Paragraph color="text.5">Hola</Paragraph>
            <Paragraph color="text.5" fontWeight="bold" lineHeight="tight">
              {nameUser.toUpperCase()} {lastNameUser.toUpperCase()}
            </Paragraph>
            <Paragraph color="text.5" fontSize="xs" fontWeight="medium">
              {user.email}
            </Paragraph>
            <Paragraph color="text.5" fontSize="xs">
              Tienes una suscripción activa
            </Paragraph>
          </View>
        ) : null}

        <View px="1.5" py="0.5">
          {listItem.map((item, index) => (
            <TouchableWithoutFeedback key={index} onPress={item.action}>
              <Item
                prefix={
                  item.subtitle ? (
                    <IconChevronRight
                      fill={colors['stroke.1']}
                      height={10}
                      width={10}
                    />
                  ) : (
                    <View height={10} width={10} />
                  )
                }
                borderBottomColor="stroke.1"
                borderBottomWidth={1}
                height={72}>
                <Paragraph color="text.3" fontWeight="medium">
                  {item.title}
                </Paragraph>
                <Paragraph color="text.4" fontSize="xs">
                  {item.subtitle}
                </Paragraph>
              </Item>
            </TouchableWithoutFeedback>
          ))}

          {isAuthenticated ? (
            <TouchableWithoutFeedback onPress={handleLogout}>
              <Item px="1.5" py="0.75">
                <Paragraph color="text.4">Cerrar sesión</Paragraph>
              </Item>
            </TouchableWithoutFeedback>
          ) : null}
        </View>
        <SafeAreaView edges={['bottom']} />
      </ScrollView>
    </View>
  )
}

export default ProfileScreen
