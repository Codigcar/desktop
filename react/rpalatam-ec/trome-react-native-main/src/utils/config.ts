import crashlytics from '@react-native-firebase/crashlytics'
import NativeConfig from 'react-native-config'
import { getBundleId } from 'react-native-device-info'

type AppKey = 'depor' | 'elcomercio' | 'gestion' | 'peru21' | 'trome'

const bundleId = getBundleId()
const [key] = bundleId.match(/depor|elcomercio|gestion|peru21|trome/i) || []

if (!key) {
  crashlytics().recordError(new Error(`Unknown bundleId: ${bundleId}`))
  throw new Error('Unknown Bundle Id')
}

interface AppStatic {
  key: AppKey
  select<T>(
    specifics:
      | ({ [key in AppKey]?: T } & { default: T })
      | { [key in AppKey]: T },
  ): T
  select<T>(specifics: { [key in AppKey]?: T }): T | undefined
}

export const App: AppStatic = {
  key: key.toLowerCase() as AppKey,
  select(spec) {
    if (App.key in spec) return spec[App.key]
    return 'default' in spec ? spec.default : undefined
  },
}

const IS_PRODUCTION = NativeConfig.APP_ENVIRONMENT === 'production'
export const webviewUrl = App.select({
  depor: IS_PRODUCTION ? 'https://pwa.depor.com' : 'https://pwa.dev.depor.com',
  elcomercio: IS_PRODUCTION
    ? 'https://pwa.elcomercio.pe'
    : 'https://pwa.dev.elcomercio.pe',
  gestion: IS_PRODUCTION
    ? 'https://pwa.gestion.pe'
    : 'https://pwa.dev.gestion.pe',
  peru21: IS_PRODUCTION ? 'https://pwa.peru21.pe' : 'https://pwa.dev.peru21.pe',
  trome: IS_PRODUCTION ? 'https://pwa.trome.pe' : 'https://pwa.dev.trome.pe',
})
