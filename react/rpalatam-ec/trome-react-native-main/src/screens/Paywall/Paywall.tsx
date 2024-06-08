import { useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { WebView, WebViewMessageEvent } from 'react-native-webview'

import styles from './styles'
import Box from '../../components/box'
import { useAuth } from '../../context/auth'
import { HomeWebviewRef, PaywallWebviewRef } from '../../utils/refs'
import type { RootStackScreenProps } from '../../routes/types'

const PaywallScreen: React.FC = () => {
  const { verifySubscription } = useAuth()
  const navigation =
    useNavigation<RootStackScreenProps<'Paywall'>['navigation']>()
  const route = useRoute<RootStackScreenProps<'Paywall'>['route']>()

  function handlePostMessage(event: WebViewMessageEvent) {
    const { data } = event.nativeEvent

    if (data === 'navigation.GO_BACK') {
      navigation.goBack()
      return
    }

    let payload
    try {
      payload = JSON.parse(data)
    } catch (_) {
      payload = data
    } finally {
      const message = JSON.stringify(payload)
      HomeWebviewRef.current?.injectJavaScript(`postMessage(${message}, '*');`)
      if (payload === 'successful_purchase') verifySubscription()
    }
  }

  return (
    <Box.View bg="white" flex={1}>
      <WebView
        ref={PaywallWebviewRef}
        source={{
          uri: route.params.url,
        }}
        style={styles.webview}
        injectedJavaScriptBeforeContentLoaded={
          route.params.injectedJavaScriptBeforeContentLoaded
        }
        onMessage={handlePostMessage}
        incognito
        renderLoading={() => (
          <ActivityIndicator
            color="#0089ff"
            size="large"
            style={styles.activityIndicator}
          />
        )}
        startInLoadingState
        testID="paywall-screen"
      />
    </Box.View>
  )
}

export default PaywallScreen
