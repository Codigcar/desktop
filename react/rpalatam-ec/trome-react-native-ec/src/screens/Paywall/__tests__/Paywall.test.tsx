import { act, render } from '@testing-utils/library'
import React from 'react'

import PaywallScreen from '../Paywall'

const postmessage = (data: string | { [key: string]: string }) => ({
  nativeEvent: { data },
})

const URL = 'https://elcomercio.pe/suscripcionesdigitales'
const SCRIPT = 'console.log("inject")'
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    goBack: jest.fn(),
  })),
  useRoute: jest.fn(() => ({
    params: {
      url: URL,
      injectedJavaScriptBeforeContentLoaded: SCRIPT,
    },
  })),
}))

const mockVerifyFn = jest.fn()
jest.mock('../../../context/auth', () => ({
  useAuth: jest.fn(() => ({
    verifySubscription: mockVerifyFn,
  })),
}))

describe('Paywall', () => {
  it('Mount screen', async () => {
    const { getByTestId, toJSON } = render(<PaywallScreen />)

    await act(async () => {
      expect(toJSON()).toMatchSnapshot()
    })

    const webview = getByTestId('paywall-screen')
    expect(webview.props.source.uri).toBe(URL)
    expect(webview.props.injectedJavaScriptBeforeContentLoaded).toBe(SCRIPT)

    // Send postmessages
    const data = { type: 'Test' }
    webview.props.onMessage(postmessage(data))
    webview.props.onMessage(postmessage(JSON.stringify(data)))

    // Verify Subscripcion
    webview.props.onMessage(postmessage('successful_purchase'))
    expect(mockVerifyFn).toBeCalled()

    // Go Back
    webview.props.onMessage(postmessage('navigation.GO_BACK'))
  })
})
