import AsyncStorage from '@react-native-async-storage/async-storage'
import { Interstitial } from 'react-native-ad-manager'

import { STORAGE_OPEN_INTERSTITIAL } from '../../../utils/constants'
import requestInterstitial from '../requestInterstitial'

const mockCrashlyticsLog = jest.fn()
jest.mock('@react-native-firebase/crashlytics', () => () => ({
  log: mockCrashlyticsLog,
}))

describe('request interstitial', () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
    jest.clearAllMocks()
  })

  it('show interstitial', async () => {
    expect(await AsyncStorage.getItem(STORAGE_OPEN_INTERSTITIAL)).toBeNull()
    const setAdUnitID = jest.spyOn(Interstitial, 'setAdUnitID')
    const requestAd = jest.spyOn(Interstitial, 'requestAd')
    const showAd = jest.spyOn(Interstitial, 'showAd')
    await requestInterstitial()
    expect(setAdUnitID).toBeCalled()
    expect(requestAd).toBeCalled()
    expect(showAd).toBeCalled()
    expect(await AsyncStorage.getItem(STORAGE_OPEN_INTERSTITIAL)).not.toBeNull()
  })

  it('do not request if it is less than 30 minutes since last seen', async () => {
    const requestAd = jest.spyOn(Interstitial, 'requestAd')
    const THIRTY_MINUTES_AGO = (Date.now() - 30 * 1000 * 60).toString()
    await AsyncStorage.setItem(STORAGE_OPEN_INTERSTITIAL, THIRTY_MINUTES_AGO)
    await requestInterstitial()
    expect(requestAd).not.toBeCalled()
  })

  it('do request if it is more than 30 minutes since last seen', async () => {
    const requestAd = jest.spyOn(Interstitial, 'requestAd')
    const THIRTY_ONE_MINUTES_AGO = (Date.now() - 31 * 1000 * 60).toString()
    await AsyncStorage.setItem(
      STORAGE_OPEN_INTERSTITIAL,
      THIRTY_ONE_MINUTES_AGO,
    )
    await requestInterstitial()
    expect(requestAd).toBeCalled()
  })

  it('save log error in crashlytics', async () => {
    const error = new Error('error')
    jest.spyOn(Interstitial, 'requestAd').mockRejectedValue(error)
    Interstitial.requestAd = jest.fn().mockRejectedValueOnce(error)
    await requestInterstitial()
    expect(mockCrashlyticsLog).toBeCalledWith(JSON.stringify(error))
  })
})
