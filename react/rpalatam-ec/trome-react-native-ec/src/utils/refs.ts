import React from 'react'
import { WebView } from 'react-native-webview'

export const HomeWebviewRef = React.createRef<WebView>()
export const PaywallWebviewRef = React.createRef<WebView>()

type TypeKey =
  | 'auth.LOGOUT'
  | 'auth.SIGN_IN'
  | 'auth.PROFILE'
  | 'auth.UPDATE_PROFILE'
  | 'app.ON_DISMISS_ALERT'
  | 'app.ON_PRESS_ALERT'
  | 'app.OPEN_SIGNWALL_MODAL'
  | 'app.OPEN_PAYWALL_MODAL'
  | 'favorites.TOGGLE_FAVORITE'
  | 'subscription.UPDATE_STATUS'

type Message = {
  type: TypeKey
  payload?: {
    [key: string]: unknown
  }
}

export const sendPostMessageToWebview = (
  webview: 'Home' | 'Paywall',
  data: Message,
): void => {
  switch (webview) {
    case 'Home':
      HomeWebviewRef.current?.injectJavaScript(
        `postMessage(${JSON.stringify(data)}, '*');`,
      )
      break
    case 'Paywall':
      PaywallWebviewRef.current?.injectJavaScript(
        `postMessage(${JSON.stringify(data)}, '*');`,
      )
      break
    default:
      break
  }
}
