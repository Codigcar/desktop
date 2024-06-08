/* eslint-disable @typescript-eslint/camelcase */
import dateformat from 'dateformat'
import { IS_ANDROID } from './checkMobile'

const IS_PRODUCTION = process.env.REACT_APP_ENVIRONMENT === 'production'
const LAST_BUILD_NUMBER_PUBLISHED = 1653

export function queryString(obj, prefix = true): string {
  const str: string[] = []
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    }
  }
  const stringPrefix = prefix ? '?' : ''
  return str.length ? stringPrefix.concat(str.join('&')) : ''
}

export const dateFormat = (StringDate, _format = 'small'): string => {
  if (!StringDate) {
    return '--:--'
  }
  let format
  switch (_format) {
    case 'small':
      format = 'dd.mm.yyyy'
      break
    case 'large':
      format = 'dd.mm.yyyy / h:MM TT'
      break
    case 'small_v2':
      format = 'dd/mm/yyyy'
      break
    default:
      format = _format
      break
  }
  const date = new Date(StringDate)
  return dateformat(date, format)
}

export function loadStyle(src) {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.type = 'text/css'
  link.href = src
  document.body.appendChild(link)
  return link
}

export const contentLight = content => {
  const {
    media,
    url,
    tiempo_lectura,
    titulo,
    tipo,
    nid,
    restrictions,
    seccion,
    fecha_publicacion,
  } = content
  return {
    media,
    url,
    tiempo_lectura,
    titulo,
    tipo,
    nid,
    restrictions,
    seccion,
    fecha_publicacion,
  }
}

export const getCookie = name => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    const lastElm = parts.pop()
    if (lastElm) {
      return lastElm.split(';').shift()
    }
    return
  }
  return
}

export const deleteCookie = (name, path = '/') => {
  document.cookie = `${name}=; Path=${path}; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`
}

export const getDomain = (): string => {
  const domain = window.location.hostname.match(
    /(elcomercio|gestion|peru21|depor|trome).(pe|com)/,
  )
  return domain ? domain[0] : 'gestion.pe'
}

export const getBrand = (): string => {
  const [brand] = getDomain().split('.')
  return brand
}

export const isLowerVersionThanPublished = (): boolean => {
  const version = window.PACKAGE ? window.PACKAGE.version : 0
  if (!IS_PRODUCTION || IS_ANDROID()) return true
  return version <= LAST_BUILD_NUMBER_PUBLISHED
}

export const isFacebookActive = (): boolean => {
  const version = window.PACKAGE ? window.PACKAGE.version : 0
  const domain = getDomain()
  return (
    isLowerVersionThanPublished() &&
    ((domain === 'elcomercio.pe' && version >= 30) ||
      (domain === 'gestion.pe' && version >= 28) ||
      (domain === 'peru21.pe' && version >= 33) ||
      (domain === 'depor.com' && version >= 39) ||
      (domain === 'trome.pe' && version >= 30))
  )
}

export const isGoogleActive = (): boolean => {
  const version = window.PACKAGE?.version || 0
  return isLowerVersionThanPublished() && version >= 1051
}

export const isPaywallActive = (): boolean => {
  const brand = getBrand()
  return (
    isLowerVersionThanPublished() &&
    (brand === 'elcomercio' || brand === 'gestion')
  )
}

export const myNewsAvailable = (): boolean => {
  const brand = getBrand()
  return brand === 'elcomercio' || brand === 'gestion'
}

export const clearFalsyProperties = <T>(object: T) => {
  Object.keys(object).forEach(key => !object[key] && delete object[key])
  return object
}

export const isEmptyObject = object => {
  return Object.keys(object).length === 0
}

export const webviewNewVersionAvailable = (): boolean => {
  const version = window.PACKAGE?.version || 0
  return version >= 790 && !!window.ReactNativeWebView
}

export const tagScreenAvailable = (): boolean => {
  const version = window.PACKAGE?.version || 0
  return version > 1010 && !!window.ReactNativeWebView
}

export const changePasswordScreenAvailable = (): boolean => {
  const version = window.PACKAGE?.version || 0
  return version > 1010 && !!window.ReactNativeWebView
}

export const openAuthScreenAvailable = (): boolean => {
  const version = window.PACKAGE?.version || 0
  return version > 1019 && !!window.ReactNativeWebView
}

export const myAccountScreenAvailable = (): boolean => {
  const version = window.PACKAGE?.version || 0
  return version > 1019 && !!window.ReactNativeWebView
}

export const authorScreenAvailable = (): boolean => {
  const brands = ['depor', 'peru21', 'trome']
  const version = window.PACKAGE?.version || 0
  return (
    brands.includes(getBrand()) && version > 1051 && !!window.ReactNativeWebView
  )
}

export const preferencesContextAvailable = (): boolean => {
  const version = window.PACKAGE?.version || 0
  return version > 1051 && !!window.ReactNativeWebView
}

export const openReviewInStoreAvailable = (): boolean => {
  const version = window.PACKAGE?.version || 0
  return version > 1085 && !!window.ReactNativeWebView
}

export const sendFeedbackByEmailAvailable = (): boolean => {
  const version = window.PACKAGE?.version || 0
  return version > 1085 && !!window.ReactNativeWebView
}

export const pianoIdAvailable = (): boolean => {
  if (!window.ReactNativeWebView) return false
  const brand = getBrand()
  const version = window.PACKAGE?.version || 0
  return (
    (brand === 'depor' && version > 1131) ||
    (brand === 'elcomercio' && version > 1243) ||
    (brand === 'gestion' && version > 1131) ||
    (brand === 'peru21' && version >= 1139) ||
    (brand === 'trome' && version > 1345)
  )
}

export const openAlertAvailable = (): boolean => {
  const version = window.PACKAGE?.version || 0
  return version >= 1150 && !!window.ReactNativeWebView
}

export const displayImmediateUpdate = (): boolean => {
  const version = window.PACKAGE?.version || 0
  return version < 1131
}
