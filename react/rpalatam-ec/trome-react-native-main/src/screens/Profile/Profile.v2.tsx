import { useNavigation, useScrollToTop } from '@react-navigation/native'
import { useTheme } from '@shopify/restyle'
import React, { useRef } from 'react'
import { Alert, ScrollView } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Button from '../../components/Button'
import Box from '../../components/box'
import SafeAreaView from '../../components/box/SafeAreaView'
import Menu from '../../components/menu'
import PremiumBadge from '../../components/premiumBadge'
import Ribbon from '../../components/ribbon'
import Tag from '../../components/tag'
import Typography from '../../components/typography'
import {
  BottomSheetCustomModal,
  BottomSheetModalProvider,
} from '../../containers/bottomSheet'
import ThemeSelector from '../../containers/themeSelector'
import { useAuth } from '../../context/auth'
import { useThemeContext } from '../../context/theme'
import { App } from '../../utils/config'
import { openInBrowser } from '../../utils/inappbrowser'
import { sendFeedbackByEmail } from '../../utils/mailer'
import type { MainStackScreenProps } from '../../routes/types'
import type { BoxProps, Theme } from '../../theme'

const { View } = Box
const { Item } = Menu
const { Paragraph } = Typography

const COOKIE_URL = App.select({
  trome: 'https://trome.pe/politica-de-cookies/',
  gestion: 'https://gestion.pe/politica-de-cookies/',
})

const ENABLE_GO_BACK = App.select({
  trome: true,
  default: false,
})

interface SectionItem {
  id: string
  title: string
  subtitle?: string
  action: () => void
  prefix?: React.ReactNode
  suffix?: React.ReactNode | 'chevron'
  tag?: React.ReactNode
  section?: keyof StructProfile
}

type Items =
  | 'mi-cuenta'
  | 'suscripcion'
  | 'mi-contenido'
  | 'notificaciones'
  | 'leer-luego'
  | 'apariencia'
  | 'enviar-comentarios'
  | 'cookies'

type StructProfile = {
  cuenta?: Items[]
  preferencias?: Items[]
  soporte?: Items[]
  legal?: Items[]
}

const SECTIONS_TO_SHOW: StructProfile = App.select({
  trome: {
    cuenta: ['mi-cuenta'],
    preferencias: [
      'mi-contenido',
      'notificaciones',
      'leer-luego',
      'apariencia',
    ],
    legal: ['cookies'],
  },
  default: {
    cuenta: ['mi-cuenta', 'suscripcion'],
    preferencias: [
      'mi-contenido',
      'notificaciones',
      'leer-luego',
      'apariencia',
    ],
    soporte: ['enviar-comentarios'],
    legal: ['cookies'],
  },
})

const ProfileItem: React.FC<SectionItem> = ({
  id,
  title,
  subtitle,
  action,
  prefix,
  suffix,
  tag,
  section,
}) => {
  const itemsToShowBySection = SECTIONS_TO_SHOW[section as keyof StructProfile]
  if (!itemsToShowBySection?.includes(id as Items)) return null

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

const ProfileSection: React.FC<{ title: string }> = ({ title, children }) => {
  return (
    <Item
      borderBottomColor={
        title === 'legal' ? 'background' : 'backgroundSecondary'
      }
      borderBottomWidth={14}>
      <View borderBottomColor="separator" borderBottomWidth={1} px="1.5" py="1">
        <Paragraph color="coolGray-500" fontSize="xs" fontWeight="bold">
          {title.toUpperCase()}
        </Paragraph>
      </View>
      {children}
    </Item>
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

  const ref = useRef<ScrollView>(null)
  useScrollToTop(ref)

  const protectedScreen = (callback: () => void) => {
    if (user.id) return callback()
    navigation.navigate('Auth', { screen: 'InitialScreen' })
  }

  const stylesTag = App.select<BoxProps>({
    trome: { bg: 'primary' },
    default: {
      bg: currentTheme === 'light' ? 'badgeFont' : 'link',
    },
  })

  const ITEMS: SectionItem[] = [
    {
      id: 'mi-cuenta',
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
      id: 'suscripcion',
      title: 'Suscripción',
      subtitle: 'Detalles de la suscripción',
      action: () => navigation.navigate('Subscription'),
      prefix: <Icon name="wallet" size={26} color={colors.text} />,
      suffix: 'chevron',
    },
    {
      id: 'mi-contenido',
      title: 'Mi contenido',
      subtitle: 'Personalizar las secciones',
      action: () => navigation.navigate('CustomContent'),
      prefix: <Icon name="view-list" size={26} color={colors.text} />,
      suffix: 'chevron',
    },
    {
      id: 'notificaciones',
      title: 'Notificaciones',
      subtitle: 'Recibe notificaciones del contenido',
      action: () => navigation.navigate('Notifications'),
      prefix: <Icon name="bell" size={26} color={colors.text} />,
      suffix: 'chevron',
      tag: (
        <Tag mr="1.5" {...stylesTag}>
          Nuevo
        </Tag>
      ),
    },
    {
      id: 'leer-luego',
      title: 'Leer luego',
      subtitle: 'Todas las noticias guardadas',
      action: () => navigation.navigate('Favorite'),
      prefix: <Icon name="bookmark" size={26} color={colors.text} />,
      suffix: 'chevron',
    },
    {
      id: 'apariencia',
      title: 'Apariencia',
      subtitle: 'Ajustar el tema de la aplicación',
      action: () => modalThemeRef.current?.present(),
      prefix: <Icon name="brightness-4" size={26} color={colors.text} />,
    },
    {
      id: 'enviar-comentarios',
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
    {
      id: 'cookies',
      title: 'Política de cookies',
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      action: () => openInBrowser(COOKIE_URL!),
      prefix: <Icon name="cookie" size={26} color={colors.text} />,
      suffix: <Icon name="open-in-new" size={26} color={colors.text} />,
    },
  ]

  return (
    <BottomSheetModalProvider>
      <View bg="background" flex={1}>
        {ENABLE_GO_BACK ? <Ribbon /> : <SafeAreaView edges={['top']} />}
        <ScrollView ref={ref}>
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

          <ProfileSection title="cuenta">
            {ITEMS.map((props, i) => (
              <ProfileItem key={i} section="cuenta" {...props} />
            ))}
          </ProfileSection>

          <ProfileSection title="preferencias">
            {ITEMS.map((props, i) => (
              <ProfileItem key={i} section="preferencias" {...props} />
            ))}
          </ProfileSection>

          {App.key === 'gestion' ? (
            <ProfileSection title="soporte">
              {ITEMS.map((props, i) => (
                <ProfileItem key={i} section="soporte" {...props} />
              ))}
            </ProfileSection>
          ) : null}

          <ProfileSection title="legal">
            {ITEMS.map((props, i) => (
              <ProfileItem key={i} section="legal" {...props} />
            ))}
          </ProfileSection>
        </ScrollView>

        <BottomSheetCustomModal ref={modalThemeRef} snapPoints={[250]}>
          <ThemeSelector />
        </BottomSheetCustomModal>
      </View>
    </BottomSheetModalProvider>
  )
}

export default Profile
