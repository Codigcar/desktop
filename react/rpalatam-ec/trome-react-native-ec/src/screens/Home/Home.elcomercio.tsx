import {
  DrawerActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import SplashScreen from 'react-native-splash-screen'
import { TabBar, TabBarProps, TabView } from 'react-native-tab-view'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import WebViewScene from './Webview'
import HOME_SCREEN_SHOWN from './homeShown'
import styles from './styles'
import LogoComercio from '../../assets/brands/elcomercio/logo.svg'
import IconAccountCircle from '../../assets/icons/elcomercio/account-circle-outline.svg'
import Box from '../../components/box'
import Typography from '../../components/typography'
import { useMainNavigation } from '../../context/navigation'
import { requestUserPermission } from '../../utils/firebase'
import type { HomeStackScreenProps } from '../../routes/types'

const { View } = Box
const { Paragraph } = Typography

type Route = {
  key: string
  title: string
}

const CustomTabBar: React.FC<TabBarProps<Route>> = (props) => (
  <View
    bg="white"
    borderBottomColor="stroke.1"
    borderBottomWidth={1}
    flexDirection="row"
    justifyContent="center">
    <TabBar
      {...props}
      pressColor="#DEDEDE"
      indicatorStyle={styles.indicator}
      renderLabel={({ route, focused }) => (
        <View minWidth={64}>
          <Paragraph
            textAlign="center"
            color={focused ? 'black' : 'text.4'}
            fontSize="sm"
            fontWeight={focused ? 'bold' : 'normal'}>
            {route.title}
          </Paragraph>
          <View height={1}>
            <Paragraph color="transparent" fontSize="sm" fontWeight="bold">
              {route.title}
            </Paragraph>
          </View>
        </View>
      )}
      scrollEnabled
      style={styles.tabBar}
      tabStyle={styles.tab}
    />
  </View>
)

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeStackScreenProps<'Feed'>['navigation']>()
  const insets = useSafeAreaInsets()
  const layout = useWindowDimensions()

  const { categories } = useMainNavigation()
  const userRoutes = useMemo(() => {
    return categories
      .filter(({ active }) => active)
      .map((category) => ({
        key: category.key,
        title: category.label,
      }))
  }, [categories])

  const [routes, setRoutes] = useState<Route[]>(userRoutes)
  const routesKey = routes.map((route) => route.key).join(',')
  const [index, setIndex] = useState(0)
  const nextIndex = index >= routes.length ? 0 : index

  useEffect(() => {
    requestUserPermission()
    HOME_SCREEN_SHOWN.set(true)
  }, [])

  useEffect(() => {
    if (routes.length > 0) SplashScreen.hide()
  }, [routes.length])

  useFocusEffect(
    useCallback(() => {
      const key = userRoutes.map((route) => route.key).join(',')
      if (routesKey === key) return
      setRoutes(userRoutes)
    }, [routesKey, userRoutes]),
  )

  return (
    <View bg="background" flex={1}>
      <View bg="primary" style={{ paddingTop: Math.max(insets.top, 0) }}>
        <View
          alignItems="center"
          flexDirection="row"
          height={48}
          justifyContent="space-between"
          px="0.5">
          <View alignItems="center" flexDirection="row">
            <TouchableOpacity
              accessibilityLabel="Menu"
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              hitSlop={{ top: 4, left: 4, right: 4, bottom: 4 }}>
              <View
                width={22}
                height={22}
                alignItems="center"
                justifyContent="center">
                <Icon name="menu" color="#4D4D4D" size={24} />
              </View>
            </TouchableOpacity>
            <View ml="1">
              <LogoComercio height={27} width={169} viewBox="0 2 270 40" />
            </View>
          </View>
          <View width={22} height={22}>
            <TouchableOpacity
              accessibilityLabel="Perfil"
              hitSlop={{ top: 4, left: 4, right: 4, bottom: 4 }}
              onPress={() => navigation.navigate('Profile')}>
              <IconAccountCircle fill="#4D4D4D" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View bg="background" flex={1}>
        {routes.length > 0 ? (
          <TabView
            key={routesKey}
            navigationState={{ index: nextIndex, routes }}
            onIndexChange={setIndex}
            renderScene={(props) => {
              const focused = routes.indexOf(props.route) === nextIndex
              return <WebViewScene focused={focused} {...props} />
            }}
            initialLayout={{ width: layout.width }}
            lazy={({ route }) => route.key !== 'portada'}
            renderTabBar={CustomTabBar}
          />
        ) : null}
      </View>
    </View>
  )
}

export default HomeScreen
