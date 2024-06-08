import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert, Linking, Platform } from 'react-native'
import { getBundleId, hasGms } from 'react-native-device-info'
import SpInAppUpdates from 'sp-react-native-in-app-updates'

import { App } from './config'

const inAppUpdates = new SpInAppUpdates(true)
const STORE_IN_APP_UPDATE = '@app_update_alert'
const iosAppId = App.select({
  depor: '990848578',
  elcomercio: '793178800',
  gestion: '991224096',
  peru21: '991197788',
  trome: '991048862',
})

export async function checkNeedsUpdate(): Promise<boolean> {
  const storage = await AsyncStorage.getItem(STORE_IN_APP_UPDATE)
  const result = await inAppUpdates.checkNeedsUpdate()
  if (!result.shouldUpdate || storage === result.storeVersion) return false
  let URL = ''

  if (Platform.OS === 'ios') {
    URL = `itms-apps://apps.apple.com/app/apple-store/id${iosAppId}?pt=571734&ct=app_update&mt=8`
  }

  const gms = await hasGms()
  if (Platform.OS === 'android' && gms) {
    const bundleId = getBundleId().replace('.dev', '')
    URL = `market://details?id=${bundleId}&referrer=utm_source=app&utm_campaign=app_update`
  }

  if (!URL) return false

  const handleOnDismiss = () => {
    AsyncStorage.setItem(STORE_IN_APP_UPDATE, result.storeVersion)
  }

  const updateButton = {
    text: 'Actualizar',
    onPress: () => {
      handleOnDismiss()
      Linking.openURL(URL)
    },
  }

  Alert.alert(
    'Nueva versión disponible',
    'Actualízala ahora para tener las últimas funcionalidades de la aplicación',
    [{ text: 'Omitir', onPress: handleOnDismiss }, updateButton],
    { cancelable: true, onDismiss: handleOnDismiss },
  )
  return true
}
