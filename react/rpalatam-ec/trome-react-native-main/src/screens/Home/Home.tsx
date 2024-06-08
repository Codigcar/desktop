import crashlytics from '@react-native-firebase/crashlytics'
import dynamicLinks, {
  FirebaseDynamicLinksTypes,
} from '@react-native-firebase/dynamic-links'
import inAppMessaging from '@react-native-firebase/in-app-messaging'
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import {
  Alert,
  AlertButton,
  AlertOptions,
  BackHandler,
  Platform,
  Share,
  StatusBar,
} from 'react-native'
import { getBuildNumber } from 'react-native-device-info'
import SplashScreen from 'react-native-splash-screen'
import * as StoreReview from 'react-native-store-review'
import {
  WebView,
  WebViewMessageEvent,
  WebViewNavigation,
} from 'react-native-webview'

import HOME_SCREEN_SHOWN from './homeShown'
import requestInterstitial from './requestInterstitial'
import styles from './styles'
import Box from '../../components/box'
import {
  BottomSheetCustomModal,
  BottomSheetModalProvider,
} from '../../containers/bottomSheet'
import ThemeSelector from '../../containers/themeSelector'
import { useAuth } from '../../context/auth'
import { useFavorites } from '../../context/favorites'
import { useMainNavigation } from '../../context/navigation'
import { useThemeContext } from '../../context/theme'
import { useTopics } from '../../context/topics'
import { App, webviewUrl } from '../../utils/config'
import {
  getRemoteValue,
  handleDynamicLink,
  requestUserPermission,
} from '../../utils/firebase'
import { ENABLE_SCREEN_STORY } from '../../utils/flags'
import history from '../../utils/history'
import { checkNeedsUpdate } from '../../utils/inAppUpdates'
import { openInBrowser } from '../../utils/inappbrowser'
import { sendFeedbackByEmail } from '../../utils/mailer'
import {
  HomeWebviewRef,
  PaywallWebviewRef,
  sendPostMessageToWebview,
} from '../../utils/refs'
import type { HomeStackScreenProps } from '../../routes/types'

interface ShouldStartLoadRequest extends WebViewNavigation {
  isTopFrame: boolean
}
const { View } = Box

const BUILD_NUMBER = getBuildNumber()
const statusBarColor = App.select({
  depor: '#007C31',
  elcomercio: '#997A00',
  gestion: '#841B24',
  peru21: '#094377',
  trome: '#000000',
})

const INJECTED_JAVASCRIPT = `
  window.__REACT_NATIVE_CONTEXT_TOPICS__ = true;
  window.__REACT_NATIVE_SCREENS_STORY__ = ${ENABLE_SCREEN_STORY};
  true;
`

const setTopics = (topics: string[]) => {
  HomeWebviewRef.current?.injectJavaScript(`
    window.NATIVE_CONNECTION?.topics.setTopics(${JSON.stringify(topics)});
    true;
  `)
}

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeStackScreenProps<'Feed'>['navigation']>()
  const [loadedWebview, setLoadedWebview] = useState(false)

  const { isAuthenticated, isSubscribed, user, verifySubscription } = useAuth()
  const { sendCategoriesToWebview, setListOfCategory, categories } =
    useMainNavigation()
  const { fetchFavoritesStories, sendFavoritesToWebview, setFavorites } =
    useFavorites()
  const { sendThemeToWebview } = useThemeContext()
  const { subscribeToTopic, topics, unsubscribeFromTopic, setDefaultTopics } =
    useTopics()
  const modalRef = useRef<BottomSheetCustomModal>(null)

  function handleRequest(request: ShouldStartLoadRequest): boolean {
    const { isTopFrame, loading, navigationType, url } = request

    if (!url || !/^https?/.test(url)) return false

    const isInternalLink = /\/\/(pwa|[a-z-0-9]+\.(loca|ngrok))\./.test(url)
    const isExternalLink = navigationType === 'click' || isTopFrame || loading

    if (isExternalLink && !isInternalLink) openInBrowser(url)

    return isInternalLink || !isExternalLink
  }

  type AlertParams = {
    title: string
    message?: string
    buttons?: AlertButton[]
    options?: AlertOptions
  }

  const sendAlert = ({ title, message, buttons, options }: AlertParams) => {
    const btns = buttons?.map((button) => ({
      ...button,
      onPress: () => {
        sendPostMessageToWebview('Home', {
          type: 'app.ON_PRESS_ALERT',
          payload: { text: button?.text },
        })
      },
    }))
    const opts = {
      cancelable: options?.cancelable,
      onDismiss: () => {
        sendPostMessageToWebview('Home', {
          type: 'app.ON_DISMISS_ALERT',
          payload: { cancelable: options?.cancelable },
        })
      },
    }
    Alert.alert(title, message, btns, opts)
  }

  async function handlePostMessage(event: WebViewMessageEvent) {
    try {
      const { content, payload, type } =
        JSON.parse(event.nativeEvent.data) || {}

      switch (type) {
        case 'init.WEB_LOADED':
          sendFavoritesToWebview().ids()
          setTopics(topics)
          if (categories.length > 0) sendCategoriesToWebview()
          setLoadedWebview(true)
          sendThemeToWebview()
          if (isAuthenticated && user.id) {
            const message = { type: 'auth.PROFILE', payload: user }
            HomeWebviewRef.current?.injectJavaScript(
              `postMessage(${JSON.stringify(message)}, '*');`,
            )
          }
          break
        case 'onShare':
          await Share.share({
            message: `${content.title} ${content.url}`,
          })
          break
        case 'navigation.NAVIGATE_TO_SCREEN':
          navigation.navigate(payload.name, payload.params)
          break
        case 'paywall.SEND_POSTMESSAGE_TO_PAYWALL_SCREEN':
          PaywallWebviewRef.current?.injectJavaScript(
            `postMessage(${JSON.stringify(payload)}, '*');`,
          )
          break
        case 'inAppMessaging.TRIGGER_EVENT':
          await inAppMessaging().triggerEvent(payload.eventId)
          break
        case 'inAppMessaging.HIDE_MESSAGES':
          await inAppMessaging().setMessagesDisplaySuppressed(payload.enabled)
          break
        case 'navigation.OPEN_DRAWER':
          navigation.dispatch(DrawerActions.openDrawer())
          break
        case 'app.SEND_ALERT':
          sendAlert(payload)
          break
        case 'categories.SET_LIST_OF_CATEGORY':
          await setListOfCategory(payload.categories)
          break
        case 'favorites.SET_LIST_OF_FAVORITES':
          payload.ids && setFavorites().ids(payload.ids as string[])
          break
        case 'favorites.GET_STORIES_BY_ID': {
          const stories = await fetchFavoritesStories()
          setFavorites().stories(stories)
          break
        }
        case 'subscription.CHECK_ACCESS': {
          const message = JSON.stringify({
            type: 'subscription.CHECK_ACCESS_CALLBACK',
            payload: { status: isSubscribed },
          })
          const inject = HomeWebviewRef.current?.injectJavaScript
          if (!user.id) {
            navigation.navigate('Auth', { screen: 'InitialScreen' })
            inject?.(`postMessage(${message}, '*');`)
            return
          }
          verifySubscription().then(() => {
            inject?.(`postMessage(${message}, '*');`)
          })
          break
        }
        case 'app.OPEN_MODE_SHEET':
          modalRef.current?.present()
          break
        case 'app.SEND_FEEDBACK_BY_EMAIL':
          sendFeedbackByEmail({ id: user.id, email: user.email })
          break
        case 'app.STORE_REVIEW':
          if (StoreReview.isAvailable) StoreReview.requestReview()
          break
        case 'topics.SUBSCRIBE_TO_TOPIC':
          subscribeToTopic(payload.topic).then(() => {
            setTopics([...topics, payload.topic])
          })
          break
        case 'topics.UNSUBSCRIBE_FROM_TOPIC':
          unsubscribeFromTopic(payload.topic).then(() => {
            setTopics(topics.filter((topic) => topic !== payload.topic))
          })
          break
        default:
          break
      }
    } catch (error) {
      crashlytics().recordError(error as Error)
    }
  }

  function onLink(link: FirebaseDynamicLinksTypes.DynamicLink | null) {
    const message = handleDynamicLink(link)
    message &&
      HomeWebviewRef.current?.injectJavaScript(`postMessage(${message}, '*');`)
  }

  const onMessage = useCallback(
    (remoteMessage: FirebaseMessagingTypes.RemoteMessage | null) => {
      const pathname = remoteMessage?.data?.note_url
      if (!pathname) return
      if (ENABLE_SCREEN_STORY) {
        navigation.navigate('Main', { screen: 'Story', params: { pathname } })
        return
      }
      history.push(`${pathname}?ref=notification`)
      navigation.navigate('Feed')
    },
    [navigation],
  )

  const initConfig = useCallback(() => {
    messaging().onNotificationOpenedApp(onMessage)
    messaging().getInitialNotification().then(onMessage)
    dynamicLinks().getInitialLink().then(onLink)
  }, [onMessage])

  useEffect(() => {
    if (loadedWebview) initConfig()
  }, [initConfig, loadedWebview])

  useEffect(() => {
    if (!loadedWebview) return
    requestUserPermission()
      .then(() => setDefaultTopics())
      .finally(() => {
        inAppMessaging().setMessagesDisplaySuppressed(false)
      })
  }, [loadedWebview, setDefaultTopics])

  useEffect(() => {
    const subscribe = () => {
      if (isAuthenticated) {
        initConfig()
        navigation.removeListener('focus', subscribe)
      }
    }
    navigation.addListener('focus', subscribe)
    return () => {
      navigation.removeListener('focus', subscribe)
    }
  }, [initConfig, isAuthenticated, navigation])

  const handleHomeStart = useCallback(async () => {
    try {
      const needsUpdate = await checkNeedsUpdate()
      if (needsUpdate) return
    } catch (_) {}
    if (isSubscribed || isSubscribed === undefined) return
    if (!HOME_SCREEN_SHOWN.get()) return
    if (getRemoteValue('interstitial_home').asString() !== 'enabled') return
    await requestInterstitial()
  }, [isSubscribed])

  useLayoutEffect(() => {
    if (loadedWebview) {
      SplashScreen.hide()
      handleHomeStart()
    }
  }, [navigation, handleHomeStart, loadedWebview])

  const backAction = useCallback(() => {
    if (navigation.isFocused()) {
      HomeWebviewRef.current?.goBack()
      return true
    }
    return false
  }, [navigation])

  useEffect(() => {
    HOME_SCREEN_SHOWN.set(true)
  }, [])

  useEffect(() => {
    crashlytics().log('Webview Mount')
    const unsubscribeOnLink = dynamicLinks().onLink(onLink)
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    )
    return () => {
      unsubscribeOnLink()
      backHandler.remove()
    }
  }, [backAction])

  return (
    <BottomSheetModalProvider>
      <StatusBar backgroundColor={statusBarColor} barStyle="default" />
      <View bg="primary" flex={1} overflow="hidden">
        <WebView
          ref={HomeWebviewRef}
          source={{
            uri: `${webviewUrl}/#?version=${BUILD_NUMBER}`,
          }}
          style={styles.webview}
          onMessage={handlePostMessage}
          onShouldStartLoadWithRequest={handleRequest}
          mediaPlaybackRequiresUserAction={Platform.OS === 'ios'}
          allowsInlineMediaPlayback
          allowsFullscreenVideo
          injectedJavaScriptBeforeContentLoaded={INJECTED_JAVASCRIPT}
          startInLoadingState={!HOME_SCREEN_SHOWN.get()}
          testID="home-screen"
        />
        <BottomSheetCustomModal ref={modalRef} snapPoints={[250]}>
          <ThemeSelector />
        </BottomSheetCustomModal>
      </View>
    </BottomSheetModalProvider>
  )
}

export default HomeScreen
