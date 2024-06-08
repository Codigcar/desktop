import 'react-native-gesture-handler'
import analytics from '@react-native-firebase/analytics'
import crashlytics from '@react-native-firebase/crashlytics'
import inAppMessaging from '@react-native-firebase/in-app-messaging'
import perf from '@react-native-firebase/perf'
import remoteConfig from '@react-native-firebase/remote-config'
import { createDrawerNavigator } from '@react-navigation/drawer'
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native'
import { CardStyleInterpolators } from '@react-navigation/stack'
import { useTheme } from '@shopify/restyle'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Platform, StatusBar } from 'react-native'
import { getApplicationName } from 'react-native-device-info'
import Orientation from 'react-native-orientation-locker'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import BottomTabBar from './containers/bottomTabBar'
import DrawerContent from './containers/drawer'
import { AuthProvider, useAuth } from './context/auth'
import { FavoritesProvider } from './context/favorites'
import { NavigationProvider } from './context/navigation'
import { NotificationProvider } from './context/notification'
import { SearchProvider } from './context/search'
import { ThemeProvider, useThemeContext } from './context/theme'
import { TopicsProvider } from './context/topics'
import ComScore from './modules/comscore'
import HMSAnalytics from './modules/hms-analytics'
import {
  AccountStack,
  AuthStack,
  HomeStack,
  MainStack,
  ProfileStack,
  RootStack,
} from './routes'
import * as AccountScreen from './screens/Account'
import * as AuthScreen from './screens/Auth'
import AuthorScreen from './screens/Author'
import CustomContentScreen from './screens/CustomContent'
import FavoriteScreen from './screens/Favorite'
import GalleryScreen from './screens/Gallery'
import HomeScreen, { HOME_SCREEN_SHOWN } from './screens/Home'
import NewsScreen from './screens/News'
import NotificationScreen from './screens/Notifications/Notifications'
import * as PaywallScreen from './screens/Paywall'
import ProfileScreen from './screens/Profile'
import SearchScreen from './screens/Search'
import SettingsScreen from './screens/Settings'
import StoryScreen from './screens/Story'
import SubscriptionScreen from './screens/Subscription'
import TagScreen from './screens/Tag'
import { Theme } from './theme'
import { App } from './utils/config'
import {
  activateRemoteConfig,
  initForegroundMessageHandler,
} from './utils/firebase'
import { ENABLE_AUTHENTICATION } from './utils/flags'
import type { DrawerParamList } from './routes/types'

export const AccountStackScreen = (): JSX.Element => {
  return (
    <AccountStack.Navigator
      initialRouteName="AccountOptions"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
      }}>
      <AccountStack.Screen
        name="AccountOptions"
        component={AccountScreen.MyAccount}
      />
      <AccountStack.Screen
        name="ChangePassword"
        component={AccountScreen.ChangePasswordScreen}
      />
      <AccountStack.Screen
        name="Information"
        component={AccountScreen.InformationScreen}
      />
    </AccountStack.Navigator>
  )
}

export const ProfileStackScreen = (): JSX.Element => {
  const { isAuthenticated } = useAuth()

  return (
    <ProfileStack.Navigator
      initialRouteName="ProfileOptions"
      screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <ProfileStack.Screen name="Account" component={AccountStackScreen} />
      ) : null}
      <ProfileStack.Screen name="Author" component={AuthorScreen} />
      <ProfileStack.Screen
        name="CustomContent"
        component={CustomContentScreen}
      />
      <ProfileStack.Screen name="Favorite" component={FavoriteScreen} />
      <ProfileStack.Screen
        name="Notifications"
        component={NotificationScreen}
      />
      <ProfileStack.Screen name="ProfileOptions" component={ProfileScreen} />
      <ProfileStack.Screen name="Subscription" component={SubscriptionScreen} />
      <ProfileStack.Screen name="Story" component={StoryScreen} />
      <ProfileStack.Screen name="Tag" component={TagScreen} />
    </ProfileStack.Navigator>
  )
}

const ProfileComponent = App.select({
  gestion: ProfileStackScreen,
  default: ProfileScreen,
})

const HomeStackNavigator: React.FC = () => {
  const FeedComponent = App.select({
    gestion: MainStackScreen,
    default: HomeScreen,
  })

  return (
    <HomeStack.Navigator
      initialRouteName="Feed"
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{ headerShown: false }}>
      <HomeStack.Screen
        name="Feed"
        component={FeedComponent}
        options={{ tabBarLabel: 'Inicio' }}
      />
      {App.key === 'gestion' ? (
        <HomeStack.Screen
          name="Profile"
          component={ProfileComponent}
          options={{
            tabBarLabel: 'Mi perfil',
          }}
        />
      ) : null}
    </HomeStack.Navigator>
  )
}

const HomeComponent = App.select({
  gestion: HomeScreen,
  default: HomeStackNavigator,
})

const MainStackScreen: React.FC = () => {
  const { isAuthenticated } = useAuth()

  return (
    <MainStack.Navigator initialRouteName="Home">
      <MainStack.Screen
        name="Home"
        component={HomeComponent}
        options={{ headerShown: false }}
      />
      <MainStack.Group
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          // Provisional fix for this issue https://github.com/react-navigation/react-navigation/issues/9883
          detachPreviousScreen: false,
          headerShown: false,
        }}>
        <MainStack.Screen name="News" component={NewsScreen} />
        <MainStack.Screen name="Favorite" component={FavoriteScreen} />
        <MainStack.Screen name="Search" component={SearchScreen} />
        <MainStack.Screen name="Story" component={StoryScreen} />
        <MainStack.Screen
          name="CustomContent"
          component={CustomContentScreen}
        />
        {isAuthenticated ? (
          <MainStack.Screen name="Account" component={AccountStackScreen} />
        ) : null}
        <MainStack.Screen name="Tag" component={TagScreen} />
        <MainStack.Screen name="Profile" component={ProfileScreen} />
        <MainStack.Screen name="Author" component={AuthorScreen} />
        <MainStack.Screen name="Settings" component={SettingsScreen} />
        <MainStack.Screen name="Subscription" component={SubscriptionScreen} />
        <MainStack.Screen name="Notifications" component={NotificationScreen} />
      </MainStack.Group>
    </MainStack.Navigator>
  )
}

const AuthStackScreen: React.FC = () => {
  const { colors } = useTheme<Theme>()
  return (
    <AuthStack.Navigator
      initialRouteName="InitialScreen"
      screenOptions={{
        cardStyle: { backgroundColor: colors.background },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        title: '',
      }}>
      <AuthStack.Screen
        name="AccountLinking"
        component={AuthScreen.AccountLinkingScreen}
      />
      <AuthStack.Screen
        name="ForgotPassword"
        component={AuthScreen.ForgotPasswordScreen}
      />
      <AuthStack.Screen
        name="InitialScreen"
        component={AuthScreen.InitialScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen name="SignIn" component={AuthScreen.SignInScreen} />
      <AuthStack.Screen name="SignUp" component={AuthScreen.SignUpScreen} />
      <AuthStack.Screen
        name="SignUpOptIn"
        component={AuthScreen.SignUpOptInScreen}
      />
      <AuthStack.Screen
        name="VerifyAccount"
        component={AuthScreen.VerifyAccountScreen}
      />
    </AuthStack.Navigator>
  )
}

const MainComponent = App.select({
  gestion: HomeStackNavigator,
  default: MainStackScreen,
})

export const RootStackScreen: React.FC = () => {
  const { isAuthenticated, isSubscribed } = useAuth()
  const { colors } = useTheme<Theme>()
  const { currentTheme } = useThemeContext()
  const initialRouteMain = HOME_SCREEN_SHOWN.get() || isAuthenticated

  return (
    <>
      <StatusBar
        barStyle={currentTheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <RootStack.Navigator
        initialRouteName={initialRouteMain ? 'Main' : 'Auth'}
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}>
        <RootStack.Screen
          name="Main"
          component={MainComponent}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Paywall"
          component={PaywallScreen.PaywallLandingScreen}
          options={({ route }) => ({
            headerBackTitle: '',
            title: route.params.title,
          })}
        />
        <RootStack.Screen
          name="Gallery"
          component={GalleryScreen}
          options={{
            headerShown: false,
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        {!ENABLE_AUTHENTICATION || isAuthenticated ? (
          <React.Fragment />
        ) : (
          <RootStack.Screen
            name="Auth"
            component={AuthStackScreen}
            options={{ headerShown: false, animationEnabled: false }}
          />
        )}
        {isAuthenticated ? null : (
          <RootStack.Screen
            component={AuthScreen.SignwallModalScreen}
            name="SignwallModal"
            options={{
              headerShown: false,
              gestureEnabled: false,
              presentation: 'transparentModal',
            }}
          />
        )}
        {isSubscribed ? null : (
          <RootStack.Screen
            name="PaywallModal"
            component={PaywallScreen.PaywallModalScreen}
            options={{
              headerShown: false,
              presentation: 'transparentModal',
            }}
          />
        )}
      </RootStack.Navigator>
    </>
  )
}

const Drawer = createDrawerNavigator<DrawerParamList>()
const drawerStyle = { width: '85%' }
const swipeEdgeWidth = App.select({ gestion: undefined, default: -100 })

export const AppNavigator: React.FC = () => {
  const [remoteValuesActivated, setRemoteValuesActivated] = useState(false)
  const { isAuthenticated } = useAuth()

  const navigationRef = useRef<NavigationContainerRef<never>>(null)
  const routeKey =
    useRef<{ key: string | undefined; name: string | undefined }>()

  const asyncConfigInit = useCallback(async () => {
    crashlytics().log('Activate and fetch remote config')
    try {
      const activated = await activateRemoteConfig()
      setRemoteValuesActivated(true)
      await inAppMessaging().setMessagesDisplaySuppressed(true)
      if (!activated) {
        const trace = await perf().startTrace('remote_config_fetch')
        await remoteConfig().fetch()
        await trace.stop()
      }
    } catch (error) {
      crashlytics().recordError(error as Error)
    }
  }, [])

  useEffect(() => {
    const unsubscribe = initForegroundMessageHandler()
    return unsubscribe
  }, [])

  useEffect(() => {
    Orientation.lockToPortrait()
    asyncConfigInit()
  }, [asyncConfigInit])

  useEffect(() => {
    ComScore.initialize({
      appName: getApplicationName(),
      publisherID: '8429002',
    })

    const initHMS = async () => {
      try {
        const { response } = await HMSAnalytics.getInstance()
        if (response) await HMSAnalytics.setAnalyticsEnabled(true)
      } catch (_) {}
    }
    initHMS()
  }, [])

  const onStateChange = () => {
    const previousRouteKey = routeKey.current?.key
    const route = navigationRef.current?.getCurrentRoute()
    if (route?.name && previousRouteKey !== route?.key) {
      analytics().logScreenView({ screen_name: `${route.name}Screen` })
    }
    routeKey.current = { key: route?.key, name: route?.name }
  }

  if (!remoteValuesActivated || isAuthenticated === undefined) return null

  return (
    <NavigationProvider>
      <NotificationProvider>
        <FavoritesProvider>
          <TopicsProvider>
            <NavigationContainer
              ref={navigationRef}
              onReady={() => {
                const route = navigationRef.current?.getCurrentRoute()
                routeKey.current = { key: route?.key, name: route?.name }
              }}
              onStateChange={onStateChange}>
              <Drawer.Navigator
                initialRouteName="App"
                drawerContent={(props) => <DrawerContent {...props} />}
                screenOptions={{
                  drawerHideStatusBarOnOpen: Platform.OS === 'ios',
                  drawerStyle,
                  swipeEdgeWidth,
                }}>
                <Drawer.Screen
                  name="App"
                  component={RootStackScreen}
                  options={{ headerShown: false }}
                />
              </Drawer.Navigator>
            </NavigationContainer>
          </TopicsProvider>
        </FavoritesProvider>
      </NotificationProvider>
    </NavigationProvider>
  )
}

function AppWrapper(): JSX.Element {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <AuthProvider>
          <SearchProvider>
            <AppNavigator />
          </SearchProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}

export default AppWrapper
