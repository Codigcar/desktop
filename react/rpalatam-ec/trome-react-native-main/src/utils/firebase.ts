import { FirebaseDynamicLinksTypes } from '@react-native-firebase/dynamic-links'
import messaging from '@react-native-firebase/messaging'
import remoteConfig, {
  FirebaseRemoteConfigTypes,
} from '@react-native-firebase/remote-config'

import {
  AD_NEWS_LIST,
  DEFAULT_CATEGORIES,
  DEFAULT_CATEGORY_FILTER,
} from './constants'

type Status = 'enabled' | 'disabled'
type RemoteKeys = {
  auth_oauth: Status
  interstitial_home?: Status
  category_filter: string
  default_categories: string
  ad_news_list: string
}

async function setDefaultRemoteValues(): Promise<void> {
  const isDebugMode = process.env.NODE_ENV === 'development'
  await remoteConfig().setConfigSettings({
    minimumFetchIntervalMillis: isDebugMode ? 3000 : 43200000,
    fetchTimeMillis: 10000,
  })
  const defaultValues: RemoteKeys = {
    auth_oauth: 'disabled',
    interstitial_home: 'enabled',
    category_filter: JSON.stringify(DEFAULT_CATEGORY_FILTER),
    default_categories: JSON.stringify(DEFAULT_CATEGORIES),
    ad_news_list: JSON.stringify(AD_NEWS_LIST),
  }
  await remoteConfig().setDefaults(defaultValues)
}

export async function activateRemoteConfig(): Promise<boolean> {
  await setDefaultRemoteValues()
  return remoteConfig().activate()
}

export function getRemoteValue(
  keyName: keyof RemoteKeys,
): FirebaseRemoteConfigTypes.ConfigValue {
  return remoteConfig().getValue(keyName)
}

export async function requestUserPermission(): Promise<boolean> {
  const authStatus = await messaging().requestPermission()
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  return enabled
}

export function initBackgroundMessageHandler(): void {
  messaging().setBackgroundMessageHandler(Promise.resolve)
}

export function initForegroundMessageHandler(): () => void {
  const unSubscribe = messaging().onMessage(() => undefined)
  return unSubscribe
}

export function handleDynamicLink(
  link: FirebaseDynamicLinksTypes.DynamicLink | null,
): string | undefined {
  let message
  if (link?.url && /^https/.test(link.url)) {
    message = JSON.stringify({
      content: link.url,
      type: 'pushHistory',
    })
  }
  return message
}
