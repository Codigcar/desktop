import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@shopify/restyle'
import React, { useRef } from 'react'
import { Alert } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Button from '../../components/Button'
import Box from '../../components/box'
import SafeAreaView from '../../components/box/SafeAreaView'
import Menu from '../../components/menu'
import PremiumBadge from '../../components/premiumBadge'
import Tag from '../../components/tag'
import Typography from '../../components/typography'
import {
  BottomSheetCustomModal,
  BottomSheetModalProvider,
} from '../../containers/bottomSheet'
import ThemeSelector from '../../containers/themeSelector'
import { useAuth } from '../../context/auth'
import { useThemeContext } from '../../context/theme'
import { openInBrowser } from '../../utils/inappbrowser'
import { sendFeedbackByEmail } from '../../utils/mailer'
import type { MainStackScreenProps } from '../../routes/types'
import type { Theme } from '../../theme'

const { View, ScrollView } = Box
const { Item } = Menu
const { Paragraph } = Typography

const COOKIE_URL = 'https://gestion.pe/politica-de-cookies/'

type Sections = {
  title: string
  items: SectionItem[]
}[]

type SectionItem = {
  title: string
  subtitle?: string
  action: () => void
  prefix?: React.ReactNode
  suffix?: React.ReactNode | 'chevron'
  tag?: React.ReactNode
}

const ProfileItem: React.FC<SectionItem> = ({
  title,
  subtitle,
  action,
  prefix,
  suffix,
  tag,
}) => {
  return (
    <TouchableWithoutFeedback onPress={action}>
      <Item
        borderBottomColor="separator"
        borderBottomWidth={1}
        prefix={prefix}
        px="1.5"
        py="1"
        suffix={suffix}>
        <View flexDirection="row">
          <View flex={1}>
            <Paragraph color="coolGray-700" fontSize="sm" fontWeight="bold">
              {title}
            </Paragraph>
            {subtitle ? (
              <Paragraph color="text" fontSize="sm">
                {subtitle}
              </Paragraph>
            ) : null}
          </View>
          {tag || null}
        </View>
      </Item>
    </TouchableWithoutFeedback>
  )
}

const Profile: React.FC = () => {
  const navigation =
    useNavigation<MainStackScreenProps<'Profile'>['navigation']>()
  const modalThemeRef = useRef<BottomSheetCustomModal>(null)
  const { colors } = useTheme<Theme>()
  const { currentTheme } = useThemeContext()
  const { user, isSubscribed } = useAuth()
  const { email, first_name = '' } = user
  const name = /^(undefined|null|-)$/i.test(first_name) ? '' : first_name

  const protectedScreen = (callback: () => void) => {
    if (user.id) return callback()
    navigation.navigate('Auth', { screen: 'InitialScreen' })
  }

  const SECTIONS: Sections = [
    {
      title: 'CUENTA',
      items: [
        {
          title: 'Mi cuenta',
          subtitle: 'Editar información',
          action: () =>
            protectedScreen(() =>
              navigation.navigate('Account', { screen: 'AccountOptions' }),
            ),
          prefix: <Icon name="account" size={26} color={colors.text} />,
          suffix: 'chevron',
        },
        {
          title: 'Suscripción',
          subtitle: 'Detalles de la suscripción',
          action: () => navigation.navigate('Main', { screen: 'Subscription' }),
          prefix: <Icon name="wallet" size={26} color={colors.text} />,
          suffix: 'chevron',
        },
      ],
    },
    {
      title: 'PREFERENCIAS',
      items: [
        {
          title: 'Mi contenido',
          subtitle: 'Personalizar las secciones',
          action: () =>
            navigation.navigate('Main', { screen: 'CustomContent' }),
          prefix: <Icon name="view-list" size={26} color={colors.text} />,
          suffix: 'chevron',
        },
        {
          title: 'Notificaciones',
          subtitle: 'Recibe notificaciones del contenido',
          action: () =>
            navigation.navigate('Main', { screen: 'Notifications' }),
          prefix: <Icon name="bell" size={26} color={colors.text} />,
          suffix: 'chevron',
          tag: (
            <Tag bg={currentTheme === 'light' ? 'badgeFont' : 'link'} mr="1.5">
              Nuevo
            </Tag>
          ),
        },
        {
          title: 'Leer luego',
          subtitle: 'Todas las noticias guardadas',
          action: () => navigation.navigate('Main', { screen: 'Favorite' }),
          prefix: <Icon name="bookmark" size={26} color={colors.text} />,
          suffix: 'chevron',
        },
        {
          title: 'Apariencia',
          subtitle: 'Ajustar el tema de la aplicación',
          action: () => modalThemeRef.current?.present(),
          prefix: <Icon name="brightness-4" size={26} color={colors.text} />,
        },
      ],
    },
    {
      title: 'SOPORTE',
      items: [
        {
          title: 'Enviar comentarios',
          subtitle: 'Tu opinión nos ayuda a mejorar',
          action: () =>
            isSubscribed
              ? sendFeedbackByEmail({ id: user.id, email: user.email })
              : Alert.alert('Beneficio para suscriptor', undefined, [
                  {
                    text: 'OK',
                    style: 'cancel',
                  },
                ]),
          prefix: <Icon name="email" size={26} color={colors.text} />,
          suffix: <Icon name="open-in-new" size={26} color={colors.text} />,
          tag: <PremiumBadge brand="gestion" showOnlyIcon />,
        },
      ],
    },
    {
      title: 'LEGAL',
      items: [
        {
          title: 'Política de cookies',
          action: () => openInBrowser(COOKIE_URL),
          prefix: <Icon name="cookie" size={26} color={colors.text} />,
          suffix: <Icon name="open-in-new" size={26} color={colors.text} />,
        },
      ],
    },
  ]

  return (
    <BottomSheetModalProvider>
      <View bg="background" flex={1}>
        <SafeAreaView edges={['top']} />
        <ScrollView>
          <View alignItems="center" flexDirection="row" px="1.5" py="1">
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
                  size="small"
                  title="Iniciar sesión"
                  type="primary"
                  onPress={() => {
                    navigation.navigate('Auth', { screen: 'InitialScreen' })
                  }}
                />
              </View>
            )}
          </View>

          {SECTIONS.map(({ items, title }, index) => (
            <View key={index}>
              <Item
                borderBottomColor={
                  index === SECTIONS.length - 1
                    ? 'background'
                    : 'backgroundSecondary'
                }
                borderBottomWidth={14}>
                <View
                  borderBottomColor="separator"
                  borderBottomWidth={1}
                  px="1.5"
                  py="1">
                  <Paragraph
                    color="coolGray-500"
                    fontSize="xs"
                    fontWeight="bold">
                    {title}
                  </Paragraph>
                </View>
                {items.map((props, i) => (
                  <ProfileItem key={i} {...props} />
                ))}
              </Item>
            </View>
          ))}
        </ScrollView>

        <BottomSheetCustomModal ref={modalThemeRef} snapPoints={[250]}>
          <ThemeSelector />
        </BottomSheetCustomModal>
      </View>
    </BottomSheetModalProvider>
  )
}

export default Profile
