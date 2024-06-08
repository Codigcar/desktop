import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useRef, useState } from 'react'
import { StatusBar, StyleProp, ViewStyle } from 'react-native'
import { WebView } from 'react-native-webview'

import Box from '../../components/box'
import Ribbon from '../../components/ribbon'
import { openInBrowser } from '../../utils/inappbrowser'
import { getStackFromUrl } from '../../utils/navigation'
import type { MainStackScreenProps } from '../../routes/types'

const { View } = Box

const PODCAST_URL = 'https://elcomercio.pe/podcast/'
const pagination = new RegExp('^' + PODCAST_URL + '[\\w-]+/\\d+/$')

const Podcast: React.FC = () => {
  const navigation =
    useNavigation<MainStackScreenProps<'Podcast'>['navigation']>()
  const { params } = useRoute<MainStackScreenProps<'Podcast'>['route']>()
  const program = params?.program || ''

  const ref = useRef<WebView>(null)
  const [isLoading, setIsLoading] = useState(false)
  const style: StyleProp<ViewStyle> = { opacity: isLoading ? 0 : 1 }

  const path = PODCAST_URL + program
  const uri = path.endsWith('/') ? path : `${path}/`

  StatusBar.setHidden(false)

  return (
    <View bg="background.2" flex={1}>
      <Ribbon title="Podcast" loading={isLoading} />
      <WebView
        decelerationRate="normal"
        onLoadEnd={() => setIsLoading(false)}
        onLoadStart={() => setIsLoading(true)}
        onNavigationStateChange={(req) => {
          const url = req.url.endsWith('/') ? req.url : `${req.url}/`
          if (url === uri || pagination.test(url)) return

          ref.current?.stopLoading()
          setIsLoading(false)

          const stack = getStackFromUrl(req.url)
          if (!stack) return openInBrowser(req.url)
          navigation.push(stack.screen, stack.params)
        }}
        originWhitelist={['https://', 'whatsapp://']}
        ref={ref}
        setSupportMultipleWindows={false}
        source={{ uri }}
        style={style}
        testID="podcast-webview"
      />
    </View>
  )
}

export default Podcast
