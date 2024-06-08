import { Platform } from 'react-native'

import { App } from '../config'
import {
  activateRemoteConfig,
  handleDynamicLink,
  initBackgroundMessageHandler,
  initForegroundMessageHandler,
  requestUserPermission,
} from '../firebase'

const mockActive = jest.fn()
const mockSetConfigSettings = jest.fn()
const mockSetDefaults = jest.fn()
jest.mock('@react-native-firebase/remote-config', () => () => ({
  activate: mockActive,
  getValue: jest.fn(),
  setConfigSettings: mockSetConfigSettings,
  setDefaults: mockSetDefaults,
}))

describe('firebase', () => {
  it('Active remote config by Appkey', async () => {
    type Keys = typeof App.key[]
    type Specs = Record<string, unknown>
    const keys: Keys = ['depor', 'elcomercio', 'gestion', 'peru21', 'trome']
    for (const key of keys) {
      App.key = key
      Platform.select = jest.fn(
        (specs: Specs) => specs.android || specs.default,
      )
      await activateRemoteConfig()
      const [androidValues] = mockSetDefaults.mock.calls.reverse()[0]
      expect(JSON.stringify(androidValues)).toMatchSnapshot(`${key}.android`)
      Platform.select = jest.fn((specs: Specs) => specs.ios || specs.default)
      await activateRemoteConfig()
      const [iosValues] = mockSetDefaults.mock.calls.reverse()[0]
      expect(JSON.stringify(iosValues)).toMatchSnapshot(`${key}.ios`)
    }
  })

  it('set config settings by environment', async () => {
    await activateRemoteConfig()
    expect(mockSetConfigSettings).toHaveBeenLastCalledWith({
      minimumFetchIntervalMillis: 43200000,
      fetchTimeMillis: 10000,
    })
    process.env.NODE_ENV = 'development'
    await activateRemoteConfig()
    expect(mockSetConfigSettings).toHaveBeenLastCalledWith({
      minimumFetchIntervalMillis: 3000,
      fetchTimeMillis: 10000,
    })
    process.env.NODE_ENV = 'test'
  })

  it('Request user permission', async () => {
    expect(await requestUserPermission()).toBeFalsy()
  })

  it('Return formatted message from DynamicLink', () => {
    const link = { url: 'https://depor.com/', minimumAppVersion: null }
    expect(handleDynamicLink(link)).toEqual(
      JSON.stringify({
        content: link.url,
        type: 'pushHistory',
      }),
    )
    expect(
      handleDynamicLink({ url: '', minimumAppVersion: 12 }),
    ).toBeUndefined()
  })

  it('Set foreground message handler', () => {
    const unSubscription = initForegroundMessageHandler()
    expect(unSubscription()).toBe('onMessageResponse')
  })

  it('Set background message handler', () => {
    expect(initBackgroundMessageHandler()).toBeUndefined()
  })
})
