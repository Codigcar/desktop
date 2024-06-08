import { App } from './config'

export const STORE_FAVORITES = '@storage_favorites'
export const STORE_HOME_SCREEN_SHOWN = '@app_home_screen_shown'
export const STORE_SCHEME = '@app_scheme'
export const STORE_CATEGORIES = '@user_categories'
export const STORAGE_OPEN_INTERSTITIAL = '@storage_open_interstitial'
export const STORE_TOPICS = '@storage_topics'
export const STORE_SEARCH_HISTORY = '@storage_search_history'

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
    },
    whitelist: {
      'link-H2UWFWUQ712HB883Q5DEXFEC6C': '/tecnologia-e-sports',
      'link-UNUC2AP10H0HFA9V3HM4YAZE84': 'https://elcomercio.pe/blogs/',
      'link-9YQN2G2D6T7YDDCN8ZQCD4TM7M':
        'https://elcomercio.pe/las-mas-leidas/',
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
