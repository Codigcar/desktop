import { DrawerContentComponentProps } from '@react-navigation/drawer'
import { useTheme } from '@shopify/restyle'
import React, { useCallback } from 'react'
import { Platform } from 'react-native'
import { getReadableVersion } from 'react-native-device-info'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Button from '../../components/Button'
import Box from '../../components/box'
import Menu from '../../components/menu'
import Typography from '../../components/typography'
import { useAuth } from '../../context/auth'
import { useMainNavigation } from '../../context/navigation'
import { useThemeContext } from '../../context/theme'
import useDebounceValue from '../../hooks/useDebounceValue'
import { Theme } from '../../theme'
import { App } from '../../utils/config'
import { ENABLE_AUTHENTICATION } from '../../utils/flags'
import history from '../../utils/history'
import { openInBrowser } from '../../utils/inappbrowser'
import { sendPostMessageToWebview } from '../../utils/refs'
import type { NavigationItem } from '../../utils/navigation'

const { SafeAreaView, ScrollView, View } = Box
const { Paragraph } = Typography
const isGestion = App.key === 'gestion'
const activeVerticalHomeScreen = App.select({ gestion: true, default: false })
const VERSION = getReadableVersion()

const FavoritePage = {
  id: 'favorite',
  name: 'Leer Luego',
  iconName: 'bookmark',
  path: { screen: 'Favorite' },
}

const LivePage = {
  id: 'live',
  name: 'En Vivo',
  iconName: 'radio-tower',
  path: { screen: 'News', params: { name: 'En Vivo', path: 'ultimo' } },
}

const ProfilePage = {
  id: 'profile',
  name: 'Perfil',
  iconName: 'account',
  path: { screen: 'Profile' },
}

const SettingsPage = {
  id: 'settings',
  name: 'Ajustes',
  iconName: 'cog',
  path: { screen: 'Settings' },
}

interface Subscreen {
  id: string
  name: string
  iconName: string
  path: {
    screen: string
    params?: Record<string, unknown>
  }
}

export const subscreens = App.select<Subscreen[]>({
  gestion: [LivePage, FavoritePage],
  peru21: [SettingsPage, FavoritePage],
  default: [ProfilePage, FavoritePage],
})

const Drawer: React.FC<DrawerContentComponentProps> = ({ navigation }) => {
  const { colors } = useTheme<Theme>()
  const { currentTheme } = useThemeContext()
  const scrollViewStyle = { flexGrow: 1 }
  const { isAuthenticated, isSubscribed } = useAuth()
  const { categories, mainNavigation } = useMainNavigation()
  const { debounceValue, triggerDebounceValue } = useDebounceValue()

  const handleMainNavigation = useCallback(
    ({ key, path, label, type }: NavigationItem) => {
      if (type === 'internal-page') history.push(path, { title: label })
      if (type === 'external-page') openInBrowser(path)

      if (type === 'category') {
        const category = categories.find((item) => item.key === key)
        if (category?.active && !activeVerticalHomeScreen) {
          history.push(path)
        } else {
          navigation.navigate('News', {
            section: {
              name: label,
              path: path.replace(/\/category\//, ''),
            },
          })
        }
      }
      navigation.closeDrawer()
    },
    [categories, navigation],
  )

  return (
    <ScrollView
      backgroundColor="background"
      contentContainerStyle={scrollViewStyle}
      alwaysBounceVertical={false}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <SafeAreaView edges={['top']} bg="backgroundSecondary">
        <Menu.Container
          py={isGestion ? '1' : '0'}
          px={isGestion ? '1.25' : '0'}
          bg="backgroundSecondary">
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('Search')
              navigation.closeDrawer()
            }}>
            <View
              style={{
                backgroundColor: !isGestion
                  ? colors.transparent
                  : currentTheme === 'dark'
                  ? colors['coolGray-600']
                  : `${colors.background}dd`,
              }}
              height={isGestion ? 40 : 52}
              px={isGestion ? '0.75' : '1.5'}
              flexDirection={isGestion ? 'row' : 'row-reverse'}
              alignItems="center">
              <View mr="0.5">
                <Icon name="magnify" size={18} color={colors.textTransparent} />
              </View>
              <View flex={1}>
                <Paragraph
                  fontSize="base"
                  color="textTransparent"
                  numberOfLines={1}>
                  Encuentra noticias, reportajes...
                </Paragraph>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <Menu.Container
            bg={isGestion ? 'transparent' : 'background'}
            px={isGestion ? '0' : '1'}
            py="0">
            {ENABLE_AUTHENTICATION && !isAuthenticated ? (
              <Menu.Item spacedItem>
                <Button
                  title="Iniciar sesión"
                  size="small"
                  onPress={() => {
                    navigation.navigate('Auth', { screen: 'InitialScreen' })
                    navigation.closeDrawer()
                  }}
                  type="primary"
                />
              </Menu.Item>
            ) : null}
            {isAuthenticated && Platform.OS === 'android' && !isSubscribed ? (
              <Menu.Item spacedItem>
                <Button
                  title="Suscribirme"
                  size="small"
                  testID="drawer-subscription-btn"
                  disabled={!debounceValue}
                  onPress={() => {
                    triggerDebounceValue()
                    sendPostMessageToWebview('Home', {
                      type: 'app.OPEN_PAYWALL_MODAL',
                    })
                    navigation.closeDrawer()
                  }}
                  type="primary"
                />
              </Menu.Item>
            ) : null}
          </Menu.Container>
        </Menu.Container>
      </SafeAreaView>
      <Menu.Container borderBottomWidth={1} borderBottomColor="separator">
        {subscreens.map(({ id, path, iconName, name }, i) => (
          <TouchableWithoutFeedback
            key={id}
            onPress={() => {
              navigation.navigate(path.screen, path.params)
              navigation.closeDrawer()
            }}>
            <Menu.Item
              marginBottom={i === subscreens.length - 1 ? '0' : '1'}
              suffix="chevron"
              prefix={<Icon name={iconName} size={22} color={colors.text} />}>
              <Paragraph fontSize="sm" color="text" fontWeight="bold">
                {name}
              </Paragraph>
            </Menu.Item>
          </TouchableWithoutFeedback>
        ))}
      </Menu.Container>
      <Menu.Container flex={1}>
        {mainNavigation.map((item, i) => (
          <TouchableWithoutFeedback
            key={i}
            onPress={() => handleMainNavigation(item)}>
            <Menu.Item
              suffix="chevron"
              marginBottom={i === mainNavigation.length - 1 ? '0' : '0.75'}>
              <Paragraph fontSize="sm" color="text" fontWeight="bold">
                {item.label}
              </Paragraph>
            </Menu.Item>
          </TouchableWithoutFeedback>
        ))}
      </Menu.Container>
      <Menu.Container borderTopColor="separator" borderTopWidth={1}>
        <Paragraph color="text" fontSize="sm">
          Versión {VERSION}
        </Paragraph>
      </Menu.Container>
    </ScrollView>
  )
}

export default Drawer
