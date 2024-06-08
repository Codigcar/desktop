import NativeConfig from 'react-native-config'

import { App } from './config'

const IS_PRODUCTION = NativeConfig.APP_ENVIRONMENT === 'production'

export const STORE_FAVORITES = '@storage_favorites'
export const STORE_HOME_SCREEN_SHOWN = '@app_home_screen_shown'
export const STORE_SCHEME = '@app_scheme'
export const STORE_CATEGORIES = '@user_categories'
export const STORAGE_OPEN_INTERSTITIAL = '@storage_open_interstitial'
export const STORE_INTERESTS = '@storage_interests'
export const STORE_SEARCH_HISTORY = '@storage_search_history'
export const STORE_TOPICS = '@storage_topics'
export const SUBSCRIPTION_ONBOARDING_DATE = '@subscription_onboarding_date'
export const SIGNUP_ONBOARDING_SHOWN = '@signup_onboarding_shown'
export const FROM_DATE_SUBSCRIPTION_ONBOARDING = new Date(2022, 9, 1).getTime() // 1 octubre de 2022

export type CategoryFilter = {
  whitelist: Record<string, string>
  blacklist: Record<string, string>
}

const PORTRAIT_CATEGORY = {
  ad: 'principal',
  key: 'portada',
  label: 'Portada',
  path: '/category/portada',
  type: 'category',
}

const LAST_NEWS_CATEGORY = {
  ad: 'default',
  key: 'ultimo',
  label: 'Lo Último',
  path: '/category/ultimo',
  type: 'category',
}

export const DEFAULT_CATEGORIES = App.select({
  gestion: [],
  default: [PORTRAIT_CATEGORY, LAST_NEWS_CATEGORY],
})

export const DEFAULT_CATEGORY_FILTER = App.select({
  elcomercio: {
    blacklist: {
      'link-M8VGH671510M59XRHTM9RCEBHR': 'ultimas-noticias',
      'link-EQ855NA75531QEP65VRV0RGV1M': 'portada',
      'link-UNUC2AP10H0HFA9V3HM4YAZE84': 'blogs',
      'link-Z2DZAKBU3D2XZ1YCUVNHNYAZ1M': 'publirreportaje',
      'link-EAD20B60MD64D5CKE0M5NNU2KR': 'colecciones-el-comercio',
      'link-9YQN2G2D6T7YDDCN8ZQCD4TM7M': 'las-mas-leidas',
      'link-E1W59X02NT3XK1RW7XTR9URCCR': 'tecnologia-y-ciencias',
      'link-UWWK4AQ5KT4N38M36QU6NKDTXM': 'edicion-impresa',
    },
    whitelist: {
      'link-H2UWFWUQ712HB883Q5DEXFEC6C': '/tecnologia-e-sports',
    },
  },
  gestion: {
    blacklist: {
      '/gestion-tv': 'gestion-tv',
      'link-8GR1QGUUET4YD0XHVUEND11FE8': 'portada',
    },
    whitelist: {
      'link-P5WJUUAHN956Z4WZ9486W4YTUC': '/plusg',
    },
  },
  peru21: {
    blacklist: {
      '/peru21tv': 'peru21-tv',
      'link-TKYHZKC0DX3KDA2PEXVBR9KFJC': 'ultimas-noticias',
    },
    whitelist: {},
  },
  trome: {
    blacklist: {
      '/dr-trome': 'dr-trome',
      '/edicion-impresa': 'edicion-impresa',
      '/fotos': 'fotos',
      '/malcriadas': 'malcriadas',
    },
    whitelist: {},
  },
  depor: {
    blacklist: {
      '/archivo': 'archivo',
    },
    whitelist: {},
  },
})

export const AD_NEWS_LIST = {
  free: {
    positions: [1, 7, 13, 19, 25, 31, 37, 43],
    size: 'mediumRectangle',
    sizes: ['mediumRectangle', 'largeBanner', 'banner'],
  },
  premium: {
    positions: [],
    size: 'banner',
    sizes: ['banner'],
  },
}

export const ORIGIN = App.select({
  depor: IS_PRODUCTION
    ? 'https://depor.com'
    : 'https://elcomercio-depor-sandbox.cdn.arcpublishing.com',
  elcomercio: IS_PRODUCTION
    ? 'https://elcomercio.pe'
    : 'https://elcomercio-elcomercio-sandbox.cdn.arcpublishing.com',
  gestion: IS_PRODUCTION
    ? 'https://gestion.pe'
    : 'https://elcomercio-gestion-sandbox.cdn.arcpublishing.com',
  peru21: IS_PRODUCTION
    ? 'https://peru21.pe'
    : 'https://elcomercio-peru21-sandbox.cdn.arcpublishing.com',
  trome: IS_PRODUCTION
    ? 'https://trome.pe'
    : 'https://elcomercio-trome-sandbox.cdn.arcpublishing.com',
})

export const LEGAL_URLS = App.select({
  depor: {
    data: 'https://depor.com/tratamiento-de-datos/',
    policies: 'https://depor.com/politicas-privacidad/',
    terms: 'https://depor.com/terminos-servicio/',
  },
  elcomercio: {
    data: 'https://elcomercio.pe/tratamiento-de-datos/',
    policies: 'https://elcomercio.pe/politicas-privacidad/',
    terms: 'https://elcomercio.pe/terminos-y-condiciones/',
  },
  gestion: {
    data: 'https://gestion.pe/tratamiento-de-datos/',
    policies: 'https://gestion.pe/politica-de-privacidad/',
    terms: 'https://gestion.pe/terminos-y-condiciones/',
  },
  peru21: {
    data: 'https://peru21.pe/tratamiento-de-datos/',
    policies: 'https://peru21.pe/politicas-de-privacidad/',
    terms: 'https://peru21.pe/terminos-y-condiciones/',
  },
  trome: {
    data: 'https://trome.pe/tratamiento-de-datos/',
    policies: 'https://trome.pe/politica-de-privacidad/',
    terms: 'https://trome.pe/terminos-y-condiciones/',
  },
})

export const SUBSCRIPTION_LANDING_URL = `${ORIGIN}/suscripciones`
