import { render } from '@testing-library/react-native'
import React from 'react'
import { WebView } from 'react-native-webview'

import {
  HomeWebviewRef,
  PaywallWebviewRef,
  sendPostMessageToWebview,
} from '../refs'

describe('Refs', () => {
  it('Send postmessage to webview', () => {
    const fnHome = jest.fn()
    const fnPaywall = jest.fn()

    const { rerender } = render(<WebView ref={HomeWebviewRef} />)

    Object.defineProperty(HomeWebviewRef, 'current', {
      value: {
        injectJavaScript: fnHome,
      },
    })
    sendPostMessageToWebview('Home', { type: 'auth.SIGN_IN' })
    expect(fnHome).toBeCalledTimes(1)

    rerender(<WebView ref={PaywallWebviewRef} />)
    Object.defineProperty(PaywallWebviewRef, 'current', {
      value: {
        injectJavaScript: fnPaywall,
      },
    })
    sendPostMessageToWebview('Paywall', { type: 'auth.SIGN_IN' })
    expect(fnPaywall).toBeCalledTimes(1)
  })
})
