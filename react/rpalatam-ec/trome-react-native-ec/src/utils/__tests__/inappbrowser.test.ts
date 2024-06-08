import { Linking } from 'react-native'
import InAppBrowserClassMethods from 'react-native-inappbrowser-reborn'

import { openInBrowser } from '../inappbrowser'

describe('inapp browser', () => {
  it('open no http links with Linking', async () => {
    const openURL = jest.spyOn(Linking, 'openURL')
    await openInBrowser('whatsapp://share')
    expect(openURL).toBeCalledWith('whatsapp://share')
  })

  it('open in app browser', async () => {
    const open = jest.spyOn(InAppBrowserClassMethods, 'open')
    await openInBrowser('https://domain.com')
    expect(open).toBeCalledWith('https://domain.com', undefined)
  })

  it('open with Linking when InAppBrowser in unavailable', async () => {
    const openURL = jest.spyOn(Linking, 'openURL')
    InAppBrowserClassMethods.isAvailable = jest.fn().mockReturnValue(false)
    await openInBrowser('https://domain.com')
    expect(openURL).toBeCalledWith('https://domain.com')
  })
})
