import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useTheme } from '@shopify/restyle'
import React from 'react'
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native'

import IconClub from '../../assets/icons/elcomercio/club-outline.svg'
import IconGames from '../../assets/icons/elcomercio/games-outline.svg'
import IconHome from '../../assets/icons/elcomercio/home-outline.svg'
import IconPrintEdition from '../../assets/icons/elcomercio/print-edition.svg'
import IconStar from '../../assets/icons/elcomercio/star-outline.svg'
import Box from '../../components/box'
import Typography from '../../components/typography'
import { useAuth } from '../../context/auth'
import { openInBrowser } from '../../utils/inappbrowser'
import type { HomeStackParamList } from '../../routes/types'
import type { Theme } from '../../theme'

const { SafeAreaView, View } = Box
const { Paragraph } = Typography

type OnPressParams = { isFocused: boolean; name: string }
type ScreenName = keyof HomeStackParamList
type Styles = {
  active: StyleProp<ViewStyle>
  default: StyleProp<ViewStyle>
}

const protectedScreens = ['MyNews']
const style = { flex: 1 }
const itemStyles: Styles = {
  active: {
    borderTopStartRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#FFF7D5',
    position: 'absolute',
    top: -8,
    left: -1,
    right: -1,
    bottom: 0,
    paddingBottom: 1,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 23,
  },
  default: {
    borderRightColor: '#9CA3AF',
    borderRightWidth: 0.3,
  },
}

function getIcon(screenName: ScreenName, color: string) {
  if (screenName === 'Feed') return <IconHome fill={color} />
  if (screenName === 'MyNews') return <IconStar fill={color} />
  if (screenName === 'Games') return <IconGames fill={color} />
  if (screenName === 'PrintEdition') return <IconPrintEdition fill={color} />
  if (screenName === 'Club') return <IconClub fill={color} />
}

const BottomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { colors } = useTheme<Theme>()
  const { isAuthenticated } = useAuth()
  const activeColor = colors['black-800']
  const inactiveColor = colors['text.4']

  const onPress = ({ isFocused, name }: OnPressParams) => {
    if (protectedScreens.includes(name) && !isAuthenticated)
      return navigation.navigate('Login')
    if (name === 'PrintEdition')
      return openInBrowser('https://web.peruquiosco.pe/')
    if (!isFocused) navigation.navigate(name)
  }

  return (
    <View
      bg="background.3"
      elevation={3}
      shadowOffset={{ width: 0, height: -2 }}
      shadowOpacity={0.16}
      shadowRadius={2}
      shadowColor="black">
      <View flexDirection="row">
        {state.routes.map((route, index) => {
          const isFocused = state.index === index
          const color = isFocused ? activeColor : inactiveColor
          const { options } = descriptors[route.key]
          const label = options.tabBarLabel || options.title || route.name
          const icon = getIcon(route.name as ScreenName, color)

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={{ selected: isFocused }}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={() => onPress({ isFocused, name: route.name })}
              style={style}
              testID={options.tabBarTestID}>
              <SafeAreaView
                alignItems="center"
                edges={['bottom']}
                justifyContent="center"
                pb="0.25"
                pt="0.5"
                style={isFocused ? itemStyles.active : itemStyles.default}>
                {icon ? (
                  <View height={16} width={16} mb="0.25">
                    {icon}
                  </View>
                ) : null}
                <Paragraph
                  fontSize="xxs"
                  fontWeight={isFocused ? 'bold' : 'normal'}
                  style={{ color }}>
                  {label}
                </Paragraph>
              </SafeAreaView>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

export default BottomTabBar
