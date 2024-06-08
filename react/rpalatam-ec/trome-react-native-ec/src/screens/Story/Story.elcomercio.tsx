import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Platform, Share, StyleSheet } from 'react-native'
import { getBuildNumber } from 'react-native-device-info'
import { WebView, WebViewMessageEvent } from 'react-native-webview'
import { ShouldStartLoadRequest } from 'react-native-webview/lib/WebViewTypes'

import Box from '../../components/box'
import { useAuth } from '../../context/auth'
import { useFavorites } from '../../context/favorites'
import { useTopics } from '../../context/topics'
import { webviewUrl } from '../../utils/config'
import * as flags from '../../utils/flags'
import { openInBrowser } from '../../utils/inappbrowser'
import { getStackFromUrl } from '../../utils/navigation'
import type { MainStackScreenProps } from '../../routes/types'

interface PostMessage {
  type: string
  payload?: Record<string, unknown>
}

const BUILD_NUMBER = getBuildNumber()

const INJECTED_JAVASCRIPT = `
  window.__REACT_NATIVE_CONTEXT_TOPICS__ = true;
  window.__REACT_NATIVE_SCREENS_AUTH_SIGNWALL__ = ${flags.ENABLE_SCREEN_AUTH_SIGNWALL};
  window.__REACT_NATIVE_SCREENS_PAYWALL_MODAL__ = ${flags.ENABLE_SCREEN_PAYWALL_MODAL};
  window.__REACT_NATIVE_SCREENS_STORY_V2__ = ${flags.ENABLE_SCREEN_STORY};
  true;
`

const StoryScreen: React.FC = () => {
  const navigation =
    useNavigation<MainStackScreenProps<'Story'>['navigation']>()
  const route = useRoute<MainStackScreenProps<'Story'>['route']>()
  const { pathname } = route.params

  const StoryRef = useRef<WebView>(null)
  const { isAuthenticated, isSubscribed, user } = useAuth()
  const { favorites, setFavorites } = useFavorites()
  const { subscribeToTopic, topics, unsubscribeFromTopic } = useTopics()
  const [webviewScreen, setWebviewScreen] = useState<string>()

  const url = `${webviewUrl}/news${pathname}#?version=${BUILD_NUMBER}`

  const sendMessage = (message: PostMessage) => {
    StoryRef.current?.injectJavaScript(
      `postMessage(${JSON.stringify(message)}, '*');`,
    )
  }

  const setTopics = (_topics: string[]) => {
    StoryRef.current?.injectJavaScript(`
      window.NATIVE_CONNECTION?.topics.setTopics(${JSON.stringify(_topics)});
      true;
    `)
  }

  const setReadLaterList = () => {
    StoryRef.current?.injectJavaScript(`
      window.NATIVE_CONNECTION?.favorites.setIds(${JSON.stringify(favorites)});
      true;
    `)
  }

  const sendSubscriptionStatus = useCallback(
    (type?: string) => {
      sendMessage({
        type: type || 'subscription.UPDATE_STATUS',
        payload: { status: isSubscribed },
      })
    },
    [isSubscribed],
  )

  const sendUserProfile = useCallback(() => {
    if (!user.id) return
    sendMessage({ type: 'auth.PROFILE', payload: { ...user } })
  }, [user])

  useEffect(() => {
    sendUserProfile()
  }, [isAuthenticated, sendUserProfile])

  useEffect(() => {
    sendSubscriptionStatus()
  }, [isSubscribed, sendSubscriptionStatus])

  useFocusEffect(
    useCallback(() => {
      if (isAuthenticated || webviewScreen !== 'SignwallModal') return
      navigation.goBack()
    }, [isAuthenticated, navigation, webviewScreen]),
  )

  useFocusEffect(
    useCallback(() => {
      if (isSubscribed || webviewScreen !== 'PaywallModal') return
      navigation.goBack()
    }, [isSubscribed, navigation, webviewScreen]),
  )

  const handlePostMessage = async (event: WebViewMessageEvent) => {
    try {
      const { payload, type } = JSON.parse(event.nativeEvent.data) || {}
      switch (type) {
        case 'init.WEB_LOADED':
          sendUserProfile()
          sendSubscriptionStatus()
          setReadLaterList()
          setTopics(topics)
          break
        case 'navigation.GO_BACK':
          navigation.goBack()
          break
        case 'navigation.NAVIGATE_TO_SCREEN':
          setWebviewScreen(payload.name)
          navigation.navigate(payload.name, payload.params)
          break
        case 'favorites.SET_LIST_OF_FAVORITES':
          payload.ids && setFavorites().ids(payload.ids as string[])
          break
        case 'share.SHARE':
          Share.share(
            Platform.select({
              ios: { url: payload.url },
              default: { message: payload.url },
            }),
            { dialogTitle: 'Compartir' },
          )
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
    } catch (_) {}
  }

  function handleRequest(req: ShouldStartLoadRequest): boolean {
    if (url === req.url) return true
    if (!req.url.startsWith('https://')) return false

    const isTapped = Platform.select({
      ios: req.navigationType === 'click' || req.isTopFrame,
      default: true,
    })

    if (!isTapped) return true

    const stack = getStackFromUrl(req.url)
    if (!stack) {
      openInBrowser(req.url)
      return false
    }

    if (stack.screen === 'Story') navigation.push(stack.screen, stack.params)
    else navigation.navigate(stack.screen, stack.params)
    return false
  }

  return (
    <Box.SafeAreaView bg="background.1" edges={['top']} flex={1}>
      <WebView
        allowsInlineMediaPlayback
        allowsFullscreenVideo
        bounces={false}
        injectedJavaScriptBeforeContentLoaded={INJECTED_JAVASCRIPT}
        mediaPlaybackRequiresUserAction={Platform.OS === 'ios'}
        onMessage={handlePostMessage}
        onShouldStartLoadWithRequest={handleRequest}
        ref={StoryRef}
        setSupportMultipleWindows={false}
        source={{ uri: url }}
        startInLoadingState
        style={styles.webview}
        testID="story-webview"
      />
    </Box.SafeAreaView>
  )
}

const styles = StyleSheet.create({
  webview: { flex: 1 },
})

export default StoryScreen
