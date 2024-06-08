import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert, Linking, Platform } from 'react-native'

import { checkNeedsUpdate } from '../inAppUpdates'

jest.mock('react-native-device-info', () => ({
  getBundleId: jest.fn(() => 'com.eeec.gestion.dev'),
  hasGms: jest.fn(() => true),
}))

jest.mock('sp-react-native-in-app-updates', () => {
  return jest.fn().mockImplementation(() => ({
    checkNeedsUpdate: jest
      .fn()
      .mockResolvedValue({ shouldUpdate: true, storeVersion: '2.0' })
      .mockResolvedValueOnce({ shouldUpdate: false, storeVersion: '1.0' }),
  }))
})

const STORE_IN_APP_UPDATE = '@app_update_alert'

beforeEach(async () => {
  await AsyncStorage.clear()
})

describe('in app updates', () => {
  it('return false if no update required', async () => {
    await expect(checkNeedsUpdate()).resolves.toBeFalsy()
  })

  it('return false if the modal was displayed', async () => {
    await AsyncStorage.setItem(STORE_IN_APP_UPDATE, '2.0')
    await expect(checkNeedsUpdate()).resolves.toBeFalsy()
  })

  it('return false if the OS is other than android or iOS', async () => {
    Platform.OS = 'web'
    await expect(checkNeedsUpdate()).resolves.toBeFalsy()
  })

  it('skip update', async () => {
    Platform.OS = 'ios'
    const spy = jest.spyOn(Alert, 'alert')
    await checkNeedsUpdate()
    const [[, , buttons]] = spy.mock.calls.reverse()
    await expect(AsyncStorage.getItem(STORE_IN_APP_UPDATE)).resolves.toBeNull()
    buttons?.[0].onPress?.()
    await expect(AsyncStorage.getItem(STORE_IN_APP_UPDATE)).resolves.toBe('2.0')
  })

  describe('store', () => {
    const update = async () => {
      const spy = jest.spyOn(Alert, 'alert')
      await checkNeedsUpdate()
      const [[, , buttons]] = spy.mock.calls.reverse()
      buttons?.[1].onPress?.()
    }

    it('open store', async () => {
      const spyLink = jest.spyOn(Linking, 'openURL')
      await expect(
        AsyncStorage.getItem(STORE_IN_APP_UPDATE),
      ).resolves.toBeNull()
      await update()
      await expect(AsyncStorage.getItem(STORE_IN_APP_UPDATE)).resolves.toBe(
        '2.0',
      )
      expect(spyLink).toBeCalledTimes(1)
    })

    it('valid link for play store', async () => {
      Platform.OS = 'android'
      const spyLink = jest.spyOn(Linking, 'openURL')
      await update()
      expect(spyLink).toHaveBeenLastCalledWith(
        expect.stringContaining('market://details?id=com.eeec.gestion&'),
      )
    })

    it('valid link for app store', async () => {
      Platform.OS = 'ios'
      const spyLink = jest.spyOn(Linking, 'openURL')
      await update()
      expect(spyLink).toHaveBeenLastCalledWith(
        expect.stringContaining(
          'itms-apps://apps.apple.com/app/apple-store/id',
        ),
      )
    })
  })
})
