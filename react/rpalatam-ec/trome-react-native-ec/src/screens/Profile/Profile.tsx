import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@shopify/restyle'
import React, { useRef } from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Button from '../../components/Button'
import Box from '../../components/box'
import Menu from '../../components/menu'
import Typography from '../../components/typography'
import {
  BottomSheetCustomModal,
  BottomSheetModalProvider,
} from '../../containers/bottomSheet'
import ThemeSelector from '../../containers/themeSelector'
import { useAuth } from '../../context/auth'
import { App } from '../../utils/config'
import { ENABLE_NOTIFICATIONS } from '../../utils/flags'
import { openInBrowser } from '../../utils/inappbrowser'
import { sendFeedbackByEmail } from '../../utils/mailer'
import { cleanText } from '../../utils/tools'
import type { MainStackScreenProps } from '../../routes/types'
import type { BoxProps, Theme } from '../../theme'

const { SafeAreaView, View } = Box
const { Item } = Menu
const { Paragraph } = Typography

const COOKIE_URL = App.select({
  depor: 'https://depor.com/politicas-cookies/',
  elcomercio: 'https://elcomercio.pe/politica-de-cookies/',
  gestion: 'https://gestion.pe/politica-de-cookies/',
  peru21: 'https://peru21.pe/politicas-de-cookies/',
  trome: 'https://trome.pe/politica-de-cookies/',
})

const itemProps: BoxProps = {
  borderBottomColor: 'separator',
  borderBottomWidth: 1,
  px: '1.5',
  py: '1',
}

const Profile: React.FC = () => {
  const navigation =
    useNavigation<MainStackScreenProps<'Profile'>['navigation']>()
  const { colors } = useTheme<Theme>()

  const modalThemeRef = useRef<BottomSheetCustomModal>(null)

  const { isSubscribed, user } = useAuth()
  const { email, first_name } = user
  const name = cleanText(first_name)

  return (
    <BottomSheetModalProvider>
      <View bg="background" flex={1}>
        <SafeAreaView edges={['top']} bg="backgroundSecondary">
          <View
            alignSelf="flex-start"
            justifyContent="center"
            height={48}
            px="0.5">
            <TouchableWithoutFeedback onPress={navigation.goBack}>
              <Icon
                size={32}
                name="chevron-left"
                color={colors['coolGray-700']}
              />
            </TouchableWithoutFeedback>
          </View>
          <View alignItems="center" flexDirection="row" px="1.5" pb="1">
            <View flex={1}>
              <Paragraph color="coolGray-700" fontSize="sm" fontWeight="bold">
                Bienvenido(a) {name}
              </Paragraph>
              {!email ? null : (
                <Paragraph color="text" fontSize="sm">
                  {email}
                </Paragraph>
              )}
            </View>
            {user.id ? null : (
              <View width={140}>
                <Button
                  title="Iniciar sesión"
                  size="small"
                  onPress={() => {
                    navigation.navigate('Auth', { screen: 'InitialScreen' })
                  }}
                  type="primary"
                />
              </View>
            )}
          </View>
        </SafeAreaView>
        <View>
          <TouchableWithoutFeedback
            onPress={() => {
              if (!user.id) {
                navigation.navigate('Auth', { screen: 'InitialScreen' })
                return
              }
              navigation.navigate('Account', { screen: 'AccountOptions' })
            }}>
            <Item
              {...itemProps}
              prefix={<Icon name="account" size={26} color={colors.text} />}
              suffix="chevron">
              <View>
                <Paragraph color="coolGray-700" fontSize="sm" fontWeight="bold">
                  Mi cuenta
                </Paragraph>
                <Paragraph color="text" fontSize="sm">
                  Editar información
                </Paragraph>
              </View>
            </Item>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('Main', { screen: 'Subscription' })
            }}>
            <Item
              {...itemProps}
              prefix={<Icon name="wallet" size={26} color={colors.text} />}
              suffix="chevron">
              <View>
                <Paragraph color="coolGray-700" fontSize="sm" fontWeight="bold">
                  Suscripción
                </Paragraph>
                <Paragraph color="text" fontSize="sm">
                  Detalles de la suscripción
                </Paragraph>
              </View>
            </Item>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate('Main', { screen: 'CustomContent' })
            }>
            <Item
              {...itemProps}
              prefix={<Icon name="view-list" size={26} color={colors.text} />}
              suffix="chevron">
              <View>
                <Paragraph color="coolGray-700" fontSize="sm" fontWeight="bold">
                  Mi contenido
                </Paragraph>
                <Paragraph color="text" fontSize="sm">
                  Personalizar las secciones
                </Paragraph>
              </View>
            </Item>
          </TouchableWithoutFeedback>
          {ENABLE_NOTIFICATIONS ? (
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate('Main', { screen: 'Notifications' })
              }>
              <Item
                {...itemProps}
                prefix={<Icon name="bell" size={26} color={colors.text} />}
                suffix="chevron">
                <View>
                  <Paragraph
                    color="coolGray-700"
                    fontSize="sm"
                    fontWeight="bold">
                    Notificaciones
                  </Paragraph>
                  <Paragraph color="text" fontSize="sm">
                    Recibe notificaciones del contenido
                  </Paragraph>
                </View>
              </Item>
            </TouchableWithoutFeedback>
          ) : null}
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Main', { screen: 'Favorite' })}>
            <Item
              {...itemProps}
              prefix={<Icon name="bookmark" size={26} color={colors.text} />}
              suffix="chevron">
              <View>
                <Paragraph color="coolGray-700" fontSize="sm" fontWeight="bold">
                  Leer luego
                </Paragraph>
                <Paragraph color="text" fontSize="sm">
                  Todas las noticias guardadas
                </Paragraph>
              </View>
            </Item>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => modalThemeRef.current?.present()}>
            <Item
              {...itemProps}
              prefix={
                <Icon name="brightness-4" size={26} color={colors.text} />
              }>
              <View>
                <Paragraph color="coolGray-700" fontSize="sm" fontWeight="bold">
                  Apariencia
                </Paragraph>
                <Paragraph color="text" fontSize="sm">
                  Ajustar el tema de la aplicación
                </Paragraph>
              </View>
            </Item>
          </TouchableWithoutFeedback>
          {!isSubscribed ? null : (
            <TouchableWithoutFeedback
              onPress={() => {
                sendFeedbackByEmail({ id: user.id, email: user.email })
              }}>
              <Item
                {...itemProps}
                prefix={<Icon name="email" size={26} color={colors.text} />}>
                <View>
                  <Paragraph
                    color="coolGray-700"
                    fontSize="sm"
                    fontWeight="bold">
                    Enviar comentario
                  </Paragraph>
                  <Paragraph color="text" fontSize="sm">
                    Tu opinión nos ayuda a mejorar
                  </Paragraph>
                </View>
              </Item>
            </TouchableWithoutFeedback>
          )}
          <TouchableWithoutFeedback onPress={() => openInBrowser(COOKIE_URL)}>
            <Item {...itemProps}>
              <View>
                <Paragraph color="coolGray-700" fontSize="sm" fontWeight="bold">
                  Política de cookies
                </Paragraph>
              </View>
            </Item>
          </TouchableWithoutFeedback>
        </View>
        <BottomSheetCustomModal ref={modalThemeRef} snapPoints={[250]}>
          <ThemeSelector />
        </BottomSheetCustomModal>
      </View>
    </BottomSheetModalProvider>
  )
}

export default Profile
