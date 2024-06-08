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
import {
  CardStyleInterpolators,
  TransitionPresets,
} from '@react-navigation/stack'
import { useTheme } from '@shopify/restyle'
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { Platform, StatusBar } from 'react-native'
import { getApplicationName } from 'react-native-device-info'
import Orientation from 'react-native-orientation-locker'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import BottomTabBar from './containers/bottomTabBar'
import { AuthProvider, useAuth } from './context/auth'
import { FavoritesProvider } from './context/favorites'
import { NavigationProvider } from './context/navigation'
import { NotificationProvider } from './context/notification'
import { SearchProvider } from './context/search'
import { ThemeProvider, useThemeContext } from './context/theme'
import { TopicsProvider } from './context/topics'
import { useSubscriptionOnboarding } from './hooks/useSubscriptionOnboarding'
import ComScore from './modules/comscore'
import HMSAnalytics from './modules/hms-analytics'
import {
  AccountStack,
  AuthStack,
  HomeStack,
  MainStack,
  RootStack,
} from './routes'
import * as AccountScreen from './screens/Account'
import * as AuthScreen from './screens/Auth'
import AuthorScreen from './screens/Author'
import ClubScreen from './screens/Club'
import CustomContentScreen from './screens/CustomContent'
import FavoriteScreen from './screens/Favorite'
import GalleryScreen from './screens/Gallery'
import GamesScreen from './screens/Games'
import HomeScreen, { HOME_SCREEN_SHOWN } from './screens/Home'
import InterestScreen from './screens/Interests'
import MyNewsScreen from './screens/MyNews'
import NewsScreen from './screens/News'
import NewslettersScreen from './screens/Newsletters'
import NotificationScreen from './screens/Notifications/Notifications'
import * as PaywallScreen from './screens/Paywall'
import * as PodcastScreen from './screens/Podcast'
import ProfileScreen from './screens/Profile'
import SearchScreen from './screens/Search'
import SettingsScreen from './screens/Settings'
import StoryScreen from './screens/Story'
import * as SubscriptionScreen from './screens/Subscription'
import TagScreen from './screens/Tag'
import { Theme } from './theme'
import { App } from './utils/config'
import {
  activateRemoteConfig,
  initForegroundMessageHandler,
} from './utils/firebase'
import { ENABLE_AUTHENTICATION } from './utils/flags'
import type { DrawerParamList } from './routes/types'

const PrintEditionScreen = () => null

const AccountStackScreen: React.FC = () => {
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

const HomeStackNavigator: React.FC = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="Feed"
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{ headerShown: false }}>
      <HomeStack.Screen
        name="Feed"
        component={HomeScreen}
        options={{
          tabBarLabel: App.key === 'elcomercio' ? 'Portada' : 'Inicio',
        }}
      />
      {App.key === 'gestion' ? (
        <HomeStack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ tabBarLabel: 'Mi perfil' }}
        />
      ) : null}
      {App.key === 'elcomercio' ? (
        <React.Fragment>
          <HomeStack.Screen
            name="MyNews"
            component={MyNewsScreen}
            options={{ tabBarLabel: 'Mis noticias' }}
          />
          <HomeStack.Screen
            name="Games"
            component={GamesScreen}
            options={{ tabBarLabel: 'Juegos' }}
          />
          <HomeStack.Screen
            name="PrintEdition"
            component={PrintEditionScreen}
            options={{ tabBarLabel: 'Ed. Impresa' }}
          />
          <HomeStack.Screen
            name="Club"
            component={ClubScreen}
            options={{ tabBarLabel: 'Club' }}
          />
        </React.Fragment>
      ) : null}
    </HomeStack.Navigator>
  )
}

const MainStackScreen: React.FC = () => {
  const { isAuthenticated, isSubscribed } = useAuth()
  const { showOnboarding: showOnboardingSubscriber, showOnboardingSignUp } =
    useSubscriptionOnboarding()

  useLayoutEffect(() => {
    if (isAuthenticated) showOnboardingSignUp()
  }, [isAuthenticated, showOnboardingSignUp])

  useLayoutEffect(() => {
    if (isSubscribed) showOnboardingSubscriber()
  }, [isSubscribed, showOnboardingSubscriber])

  return (
    <MainStack.Navigator initialRouteName="Home">
      <MainStack.Screen
        name="Home"
        component={HomeStackNavigator}
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
        <MainStack.Screen name="Newsletters" component={NewslettersScreen} />
        <MainStack.Screen name="Notifications" component={NotificationScreen} />
        <MainStack.Screen name="Interests" component={InterestScreen} />
        <MainStack.Screen name="Settings" component={SettingsScreen} />
        <MainStack.Screen
          name="Subscription"
          component={SubscriptionScreen.SubscriptionScreen}
        />
        <MainStack.Screen
          name="SubscriptionOnboarding"
          component={SubscriptionScreen.SubscriptionOnboardingScreen}
        />
        <MainStack.Screen
          name="SignUpOnboarding"
          component={AuthScreen.SignUpOnboarding}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Podcast"
          component={PodcastScreen.PodcastScreen}
        />
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
        options={{ headerShown: App.key !== 'elcomercio' }}
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
      <AuthStack.Screen name="SignIn" component={AuthScreen.LoginScreen} />
      <AuthStack.Screen name="SignUp" component={AuthScreen.SignUpScreen} />
      <AuthStack.Screen
        name="SignUpOptIn"
        component={AuthScreen.SignUpOptInScreen}
        options={{ headerShown: App.key !== 'elcomercio' }}
      />
      <AuthStack.Screen
        name="VerifyAccount"
        component={AuthScreen.VerifyAccountScreen}
      />
    </AuthStack.Navigator>
  )
}

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
          component={MainStackScreen}
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
        {!ENABLE_AUTHENTICATION || isAuthenticated ? null : (
          <RootStack.Screen
            name="Auth"
            component={AuthStackScreen}
            options={{ headerShown: false, animationEnabled: false }}
          />
        )}
        <RootStack.Group
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
            ...TransitionPresets.ModalPresentationIOS,
          }}>
          {isAuthenticated ? null : (
            <React.Fragment>
              <RootStack.Screen
                component={AuthScreen.LoginScreen}
                name="Login"
                options={{ title: 'Inicia sesión' }}
              />
              <RootStack.Screen
                component={AuthScreen.SignUpScreen}
                name="SignUp"
                options={{ title: 'Regístrate' }}
              />
              <RootStack.Screen
                component={AuthScreen.SignwallModalScreen}
                name="SignwallModal"
                options={{ title: 'Inicia sesión' }}
              />
              <RootStack.Screen
                name="RecoveryPassword"
                component={AuthScreen.ForgotPasswordScreen}
                options={{ title: 'Olvidé mi contraseña' }}
              />
            </React.Fragment>
          )}
          {isSubscribed ? null : (
            <RootStack.Screen
              name="PaywallModal"
              component={PaywallScreen.PaywallModalScreen}
            />
          )}
        </RootStack.Group>
      </RootStack.Navigator>
    </>
  )
}

const DrawerContent = App.select({
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  elcomercio: require('./containers/menu').default,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  default: require('./containers/drawer').default,
})
const drawerStyle = App.select({
  elcomercio: { width: '100%' },
  default: { width: '85%' },
})

const Drawer = createDrawerNavigator<DrawerParamList>()

const AppNavigator: React.FC = () => {
  const [remoteValuesActivated, setRemoteValuesActivated] = useState(false)
  const { isAuthenticated } = useAuth()

  const navigationRef = useRef<NavigationContainerRef<never>>(null)
  const routeNameRef = useRef<string>()

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

  if (!remoteValuesActivated || isAuthenticated === undefined) return null

  return (
    <NavigationProvider>
      <NotificationProvider>
        <FavoritesProvider>
          <TopicsProvider>
            <NavigationContainer
              ref={navigationRef}
              onReady={() => {
                routeNameRef.current =
                  navigationRef.current?.getCurrentRoute()?.name
              }}
              onStateChange={async () => {
                const previousRouteName = routeNameRef.current
                const currentRouteName =
                  navigationRef.current?.getCurrentRoute()?.name

                if (previousRouteName !== currentRouteName) {
                  analytics().logScreenView({
                    screen_name: `${currentRouteName}Screen`,
                  })
                }
                routeNameRef.current = currentRouteName
              }}>
              <Drawer.Navigator
                initialRouteName="App"
                drawerContent={(props) => <DrawerContent {...props} />}
                screenOptions={{
                  drawerHideStatusBarOnOpen: Platform.OS === 'ios',
                  drawerStyle,
                  swipeEdgeWidth: -100,
                  swipeMinDistance: 200,
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
