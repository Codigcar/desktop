import { Platform } from 'react-native'
import { App } from './config'

export const ENABLE_SCREEN_AUTH_SIGNWALL = App.select({
  gestion: true,
  default: false,
})

export const ENABLE_SCREEN_STORY = App.select({
  elcomercio: false,
  default: true,
})

export const ENABLE_SCREEN_PAYWALL_MODAL = App.select({
  gestion: true,
  default: false,
})

export const ENABLE_AUTHENTICATION = App.select({
  peru21: false,
  default: true,
})

export const ENABLE_NOTIFICATIONS = App.select({
  gestion: true,
  trome: true,
  default: false,
})

export const ENABLE_SOCIAL_MEDIA = App.select({
  elcomercio: true,
  gestion: true,
  default: Platform.OS === 'android',
})

export const ENABLE_VERIFY_ACCOUNT = App.select({
  gestion: false,
  default: true,
})

export const ENABLE_SEARCH_HISTORY = App.select({
  gestion: true,
  default: false,
})
