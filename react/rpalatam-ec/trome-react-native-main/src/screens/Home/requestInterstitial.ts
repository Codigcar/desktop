import AsyncStorage from '@react-native-async-storage/async-storage'
import crashlytics from '@react-native-firebase/crashlytics'
import { Interstitial } from 'react-native-ad-manager'
import NativeConfig from 'react-native-config'

import { App } from '../../utils/config'
import { STORAGE_OPEN_INTERSTITIAL } from '../../utils/constants'

const AD_UNIT_ID =
  NativeConfig.APP_ENVIRONMENT === 'production'
    ? `/28253241/${App.key}/pwa/home/principal/intersticial`
    : '/6499/example/interstitial'

async function requestInterstitial(): Promise<void> {
  try {
    const lastSeenTime = await AsyncStorage.getItem(STORAGE_OPEN_INTERSTITIAL)
    const timeDifference = Date.now() - Number(lastSeenTime)
    const minutes = Math.floor(timeDifference / 1000 / 60)
    if (minutes <= 30) return
    Interstitial.setAdUnitID(AD_UNIT_ID)
    await Interstitial.requestAd()
    await Interstitial.showAd()
    await AsyncStorage.setItem(STORAGE_OPEN_INTERSTITIAL, Date.now().toString())
  } catch (error) {
    crashlytics().log(JSON.stringify(error))
  }
}

export default requestInterstitial
