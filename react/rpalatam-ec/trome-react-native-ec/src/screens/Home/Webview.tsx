import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useRef } from 'react'
import { Platform } from 'react-native'
import { SceneRendererProps } from 'react-native-tab-view'
import { WebView } from 'react-native-webview'
import { ShouldStartLoadRequest } from 'react-native-webview/lib/WebViewTypes'

import styles from './styles'
import { openInBrowser } from '../../utils/inappbrowser'
import { getStackFromUrl } from '../../utils/navigation'
import type { HomeStackScreenProps } from '../../routes/types'

type Route = {
  key: string
  title: string
}

type SceneProps = SceneRendererProps & { focused: boolean; route: Route }
type Navigation = HomeStackScreenProps<'Feed'>['navigation']

const ORIGIN = 'https://elcomercio.pe'

export function getUrl(key: string): string {
  let pathname = `/${key}/`
  if (key === 'portada') pathname = '/'
  if (key === 'ultimo') pathname = '/ultimas-noticias/'
  if (key === 'tecnologia-e-sports') pathname = '/tecnologia/e-sports/'
  return ORIGIN + pathname
}

export function onShouldLoadRequest(
  req: ShouldStartLoadRequest,
  navigation: Navigation,
): boolean {
  const isTapped = Platform.select({
    ios: req.navigationType === 'click' || req.isTopFrame,
    default: true,
  })
  if (!isTapped) return true
  if (req.url.includes('?ref=ec')) return false
  if (req.url.includes('#google_vignette')) return false
  const stack = getStackFromUrl(req.url)
  if (!stack) openInBrowser(req.url)
  else if (stack.screen === 'Games') navigation.navigate('Games')
  else navigation.push(stack.screen, stack.params)
  return false
}

const INJECTED_JAVASCRIPT = `
  document.querySelectorAll('video').forEach(v => v.pause());
  true;
`

const WebViewScene: React.FC<SceneProps> = ({ route }) => {
  const navigation = useNavigation<Navigation>()
  const ref = useRef<WebView>(null)
  const uri = getUrl(route.key)

  useFocusEffect(() => {
    return () => {
      ref.current?.injectJavaScript(INJECTED_JAVASCRIPT)
    }
  })

  return (
    <WebView
      allowsInlineMediaPlayback
      decelerationRate="normal"
      onShouldStartLoadWithRequest={(req) => {
        const url = req.url.endsWith('/') ? req.url : `${req.url}/`
        if (url === uri) return true
        return onShouldLoadRequest(req, navigation)
      }}
      ref={ref}
      setSupportMultipleWindows={false}
      source={{ uri }}
      startInLoadingState
      style={styles.webview}
    />
  )
}

export default React.memo(WebViewScene)
