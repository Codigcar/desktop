import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { DrawerActions } from '@react-navigation/native'
import { useTheme } from '@shopify/restyle'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Box from '../../components/box'
import Typography from '../../components/typography'
import { useAuth } from '../../context/auth'
import { useThemeContext } from '../../context/theme'
import { App } from '../../utils/config'
import type { HomeStackParamList } from '../../routes/types'
import type { Theme } from '../../theme'

const { SafeAreaView, View } = Box
const { Paragraph } = Typography

type OnPressParams = { isFocused: boolean; name: string }
type ScreenName = keyof HomeStackParamList
type Icons = { [key in ScreenName]: string }

const protectedScreens = ['MyNews']
const style = { flex: 1 }

function getIconName(screenName: ScreenName) {
  const icons: Icons = {
    Feed: 'home',
    Profile: 'account',
  }
  return icons[screenName]
}

const BottomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { currentTheme } = useThemeContext()
  const { colors } = useTheme<Theme>()
  const { isAuthenticated } = useAuth()
  const activeColor = currentTheme === 'light' ? colors.link : colors.text
  const inactiveColor = colors['coolGray-400']

  const onPress = ({ isFocused, name }: OnPressParams) => {
    if (protectedScreens.includes(name) && !isAuthenticated)
      return navigation.navigate('Login')
    if (!isFocused) navigation.navigate(name)
  }

  return (
    <SafeAreaView
      bg="background"
      edges={['bottom']}
      elevation={3}
      shadowOffset={{ width: 0, height: -2 }}
      shadowOpacity={0.16}
      shadowRadius={2}
      shadowColor="black"
      borderTopColor="backgroundSecondary"
      borderTopWidth={1}>
      <View alignItems="center" height={48} flexDirection="row" px="0.5">
        {App.key === 'gestion' ? (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="secciones"
            onPress={() => {
              navigation.dispatch(DrawerActions.openDrawer())
            }}
            style={style}
            testID="sections">
            <View alignItems="center">
              <Icon name="menu" size={25} color={inactiveColor} />

              <Paragraph fontSize="xxs" style={{ color: inactiveColor }}>
                Secciones
              </Paragraph>
            </View>
          </TouchableOpacity>
        ) : null}

        {state.routes.map((route, index) => {
          const isFocused = state.index === index
          const color = isFocused ? activeColor : inactiveColor
          const { options } = descriptors[route.key]
          const label = options.tabBarLabel || options.title || route.name
          const iconName = getIconName(route.name as ScreenName)

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={{ selected: isFocused }}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={() => onPress({ isFocused, name: route.name })}
              style={style}
              testID={options.tabBarTestID}>
              <View alignItems="center" height="100%" justifyContent="center">
                {iconName ? (
                  <Icon name={iconName} color={color} size={24} />
                ) : null}
                <Paragraph
                  fontSize="xxs"
                  fontWeight={isFocused ? 'bold' : 'normal'}
                  style={{ color }}>
                  {label}
                </Paragraph>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    </SafeAreaView>
  )
}

export default BottomTabBar
