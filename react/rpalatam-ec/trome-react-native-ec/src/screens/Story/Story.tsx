import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import { useTheme } from '@shopify/restyle'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Alert, Platform, Share, TouchableOpacity } from 'react-native'
import { getBuildNumber } from 'react-native-device-info'
import { URL } from 'react-native-url-polyfill'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  WebView,
  WebViewMessageEvent,
  WebViewNavigation,
} from 'react-native-webview'

import FontSizeSelector, { getFontSize } from './FontSizeSelector'
import Box from '../../components/box'
import Ribbon from '../../components/ribbon'
import Typography from '../../components/typography'
import {
  BottomSheetCustomModal,
  BottomSheetModalProvider,
} from '../../containers/bottomSheet'
import { useAuth } from '../../context/auth'
import { useFavorites } from '../../context/favorites'
import { useNotification } from '../../context/notification'
import { useThemeContext } from '../../context/theme'
import Content from '../../services/arc/Content'
import { webviewUrl } from '../../utils/config'
import * as flags from '../../utils/flags'
import { openInBrowser } from '../../utils/inappbrowser'
import { HomeWebviewRef as StoryRef } from '../../utils/refs'
import { getDomain } from '../../utils/tools'
import type { MainStackScreenProps } from '../../routes/types'
import type { Theme } from '../../theme'

interface ShouldStartLoadRequest extends WebViewNavigation {
  isTopFrame: boolean
}

interface PostMessage {
  type: string
  payload?: Record<string, unknown>
}

const { View } = Box
const { Paragraph } = Typography
const BUILD_NUMBER = getBuildNumber()
const HOSTNAME = getDomain()

const stories = Content.stories({
  params: { sourceInclude: 'canonical_url' },
})

const snapPoints = Platform.OS === 'android' ? [112] : [140]

type Hook = {
  show(): void
}

type ValidateNavigationUrl =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { screen: any; params?: Record<string, unknown> } | undefined

const useReadLaterNotify = (): Hook => {
  const navigation =
    useNavigation<MainStackScreenProps<'Story'>['navigation']>()
  const notification = useNotification()

  const show = useCallback(() => {
    notification.show({
      message: 'Agregado a leer luego',
      type: 'success',
      duration: 3000,
      action: () => (
        <TouchableOpacity
          activeOpacity={0.6}
          hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}
          onPress={() => {
            notification.hide()
            navigation.navigate('Favorite')
          }}>
          <Paragraph color="white" fontSize="sm" fontWeight="bold">
            Ir a leer luego
          </Paragraph>
        </TouchableOpacity>
      ),
    })
  }, [navigation, notification])

  return { show }
}

const validateNavigationUrl = (url: string): ValidateNavigationUrl => {
  const slug = new RegExp('/[\\w-]+/([\\w-]+)/?')
  const { pathname } = new URL(url)

  if (pathname.endsWith('-noticia/')) {
    return { screen: 'Story', params: { pathname } }
  }

  const match = url.match(slug)
  if (!match) return
  const [, subsection] = match

  if (pathname.startsWith('/autor/')) {
    return { screen: 'Author', params: { path: subsection } }
  }

  if (pathname.startsWith('/noticias/')) {
    return { screen: 'Tag', params: { path: subsection } }
  }
}

const StoryScreen: React.FC = () => {
  const navigation =
    useNavigation<MainStackScreenProps<'Story'>['navigation']>()
  const route = useRoute<MainStackScreenProps<'Story'>['route']>()
  const { id: storyId, pathname } = route.params
  const { colors } = useTheme<Theme>()

  const modalRef = useRef<BottomSheetCustomModal>(null)
  const { isAuthenticated, isSubscribed, user, verifySubscription } = useAuth()
  const { favorites, toggleFavorite } = useFavorites()
  const isFavorite = storyId ? favorites.includes(storyId) : undefined
  const notification = useReadLaterNotify()
  const { currentTheme } = useThemeContext()
  const webview_URL = `${webviewUrl}/story/${storyId}#?version=${BUILD_NUMBER}`
  const [webviewScreen, setWebviewScreen] = useState<string>()

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

  const handleStoryError = useCallback(() => {
    Alert.alert(
      'Nota perdida',
      'No hemos encontrado la noticia que buscabas.',
      [
        {
          onPress: navigation.goBack,
          text: 'Volver',
          style: 'default',
        },
      ],
    )
  }, [navigation.goBack])

  useEffect(() => {
    if (storyId && pathname) return
    const query = storyId ? { id: storyId } : { pathname: pathname as string }
    stories
      .get(query)
      .then((story) => {
        const params = { id: story.id, pathname: story.url }
        navigation.setParams(params as Record<string, string>)
      })
      .catch(() => {
        handleStoryError()
      })
    return () => {
      stories.abort()
    }
  }, [navigation, storyId, pathname, handleStoryError])

  const sendMessage = (message: PostMessage) => {
    StoryRef.current?.injectJavaScript(
      `postMessage(${JSON.stringify(message)}, '*');`,
    )
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
    if (!user?.id) return
    sendMessage({ type: 'auth.PROFILE', payload: { ...user } })
  }, [user])

  useEffect(() => {
    sendUserProfile()
  }, [isAuthenticated, sendUserProfile])

  useEffect(() => {
    sendSubscriptionStatus()
  }, [isSubscribed, sendSubscriptionStatus])

  const INJECT_THEME = useMemo(() => {
    return `
      window.NATIVE_CONNECTION?.mode.setNightMode(${currentTheme === 'dark'});
      true;
    `
  }, [currentTheme])

  useEffect(() => {
    StoryRef.current?.injectJavaScript(INJECT_THEME)
  }, [INJECT_THEME])

  const handlePostMessage = async (event: WebViewMessageEvent) => {
    try {
      const { type, payload } = JSON.parse(event.nativeEvent.data) || {}
      switch (type) {
        case 'init.WEB_LOADED':
          sendUserProfile()
          sendSubscriptionStatus()
          StoryRef.current?.injectJavaScript(INJECT_THEME)
          break
        case 'navigation.GO_BACK':
          navigation.goBack()
          break
        case 'navigation.NAVIGATE_TO_SCREEN':
          setWebviewScreen(payload.name)
          navigation.navigate(payload.name, payload.params)
          break
        case 'subscription.CHECK_ACCESS': {
          if (!user.id) {
            navigation.navigate('Auth', { screen: 'InitialScreen' })
            sendSubscriptionStatus('subscription.CHECK_ACCESS_CALLBACK')
            return
          }
          await verifySubscription()
          sendSubscriptionStatus('subscription.CHECK_ACCESS_CALLBACK')
          break
        }
        default:
          break
      }
    } catch (_) {}
  }

  function handleRequest(request: ShouldStartLoadRequest): boolean {
    if (webview_URL === request.url) return true

    const isTapped = Platform.select({
      ios: request.navigationType === 'click' || request.isTopFrame,
      default: true,
    })

    if (!isTapped) return true

    const stack = validateNavigationUrl(request.url)
    if (!stack) {
      openInBrowser(request.url)
      return false
    }

    if (stack.screen === 'Story') {
      navigation.push(stack.screen, stack.params)
    } else {
      navigation.navigate(stack.screen, stack.params)
    }
    return false
  }

  function handleShare() {
    const url = `https://${HOSTNAME}${pathname}`
    Share.share(
      Platform.select({
        ios: { url },
        default: { message: url },
      }),
      { dialogTitle: 'Compartir' },
    )
  }

  function handleFontSizeChange(size: string, prevSize: string) {
    StoryRef.current?.injectJavaScript(`
      document.body.classList.remove('zoom-${prevSize}');
      document.body.classList.add('zoom-${size}');
      true;
    `)
  }

  const config = JSON.stringify({
    fontSize: getFontSize(),
    mode: currentTheme === 'dark',
  })

  const INJECTED_JAVASCRIPT = `
    document.cookie = 'eeecappuser=${JSON.stringify(user)};'
    window.__REACT_NATIVE_CONTEXT_TOPICS__ = true;
    window.__REACT_NATIVE_SCREENS_AUTH_SIGNWALL__ = ${
      flags.ENABLE_SCREEN_AUTH_SIGNWALL
    };
    window.__REACT_NATIVE_SCREENS_STORY_V2__ = ${flags.ENABLE_SCREEN_STORY};
    window.__REACT_NATIVE_SCREENS_PAYWALL_MODAL__ = ${
      flags.ENABLE_SCREEN_PAYWALL_MODAL
    };
    window.sessionStorage.setItem('config', '${config}');
    true;
  `

  return (
    <BottomSheetModalProvider>
      <View bg="background" flex={1} testID="story-screen">
        <Ribbon
          RigthComponent={() => {
            if (!storyId || !pathname) return null
            return (
              <Box.View testID="options" flexDirection="row">
                <View mr="0.5">
                  <TouchableOpacity
                    onPress={() => {
                      toggleFavorite(storyId)
                      if (!isFavorite) notification.show()
                    }}
                    testID="button-bookmark">
                    <Box.View
                      width={32}
                      height={32}
                      alignItems="center"
                      justifyContent="center">
                      <Icon
                        name="bookmark"
                        size={24}
                        color={
                          isFavorite ? colors.link : colors['coolGray-700']
                        }
                      />
                    </Box.View>
                  </TouchableOpacity>
                </View>
                <View mr="0.5">
                  <TouchableOpacity onPress={handleShare} testID="button-share">
                    <Box.View
                      width={32}
                      height={32}
                      alignItems="center"
                      justifyContent="center">
                      <Icon
                        name="share-variant"
                        color={colors['coolGray-700']}
                        size={24}
                      />
                    </Box.View>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      modalRef.current?.present()
                    }}
                    testID="button-font_size">
                    <Box.View
                      width={32}
                      height={32}
                      alignItems="center"
                      flexDirection="row"
                      justifyContent="center">
                      <Paragraph
                        color="coolGray-700"
                        fontSize="xl"
                        fontWeight="bold">
                        A
                      </Paragraph>
                      <Paragraph
                        lineHeight="9"
                        color="coolGray-700"
                        fontSize="base"
                        fontWeight="bold">
                        a
                      </Paragraph>
                    </Box.View>
                  </TouchableOpacity>
                </View>
              </Box.View>
            )
          }}
        />
        {storyId ? (
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
            source={{
              uri: webview_URL,
            }}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ flex: 1, backgroundColor: colors.background }}
            testID="story-webview"
          />
        ) : null}
        <BottomSheetCustomModal
          ref={modalRef}
          snapPoints={snapPoints}
          enableContentPanningGesture={false}>
          <FontSizeSelector onSizeChange={handleFontSizeChange} />
        </BottomSheetCustomModal>
      </View>
    </BottomSheetModalProvider>
  )
}

export default StoryScreen
