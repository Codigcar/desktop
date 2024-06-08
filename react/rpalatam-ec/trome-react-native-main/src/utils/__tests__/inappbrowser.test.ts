import { Linking } from 'react-native'
import InAppBrowserClassMethods from 'react-native-inappbrowser-reborn'

import { openInBrowser } from '../inappbrowser'

describe('inapp browser', () => {
  test('open in browser', async () => {
    await openInBrowser('whatever url')
    expect(InAppBrowserClassMethods.open as jest.Mock).toHaveBeenCalledTimes(1)
  })
  test('open with Linking', async () => {
    InAppBrowserClassMethods.isAvailable = jest.fn().mockReturnValue(false)
    await openInBrowser('whatever url')
    expect(Linking.openURL as jest.Mock).toHaveBeenCalledTimes(1)
  })
})
