import type { Sections } from './types'

const defaultProps = {
  card: {
    layout: 'magazine',
    description: true,
  },
  template: [
    {
      index: 1,
      data: {
        description: true,
      },
      type: 'notice',
    },
  ],
}

const PAGES = {
  HOME: {
    path: '/category/:category',
    component: 'home',
    title: 'Inicio',
  },
  FAVORITES: {
    path: '/favorites',
    component: 'favorites',
    title: 'Leer luego',
  },
  NEWS: {
    path: '/news/:id',
    component: 'notice',
  },
  PROFILE: {
    path: '/profile',
    component: 'profile',
    title: 'Mi perfil',
  },
  TAGS: {
    path: '/tags',
    component: 'tags',
  },
  TV: {
    path: '/peru21tv',
    component: 'tv',
    title: 'Perú21TV',
    programs: [
      {
        title: '21Noticias',
        path: '21noticias',
      },
      {
        title: 'La Voz del 21',
        path: 'lavozdel21',
      },
      {
        title: 'Informe21',
        path: 'informe21',
      },
      {
        title: 'Entrevista21',
        path: 'entrevista21',
      },
      {
        title: 'Colección del Bicentenario',
        path: 'coleccion-del-bicentenario',
      },
      {
        title: 'Pelas y Series',
        path: 'pelas-series',
      },
      {
        title: 'Dinero con Sentido',
        path: 'dinero-con-sentido',
      },
      {
        title: 'Salud Emocional',
        path: 'salud-emocional',
      },
      {
        title: 'Pez en el agua',
        path: 'pez-en-el-agua',
      },
      {
        title: 'Tu importas',
        path: 'tu-importas',
      },
      {
        title: 'Tu veterinaria responde',
        path: 'tu-veterinaria-responde',
      },
      {
        title: 'Game On',
        path: 'game-on',
      },
      {
        title: 'Especiales21',
        path: 'especiales21',
      },
      {
        title: 'Tribuna electoral',
        path: 'tribuna?electoral',
      },
      {
        title: 'Pico a pico',
        path: 'pico-a-pico',
      },
      {
        title: 'Tú contribuyes',
        path: 'tu-contribuyes',
      },
    ],
  },
}

const SECTIONS: Sections = {
  PORTADA: {
    ad: 'principal',
    key: 'portada',
    label: 'Portada',
    path: '/category/portada',
  },
}

export default {
  name: 'peru21',
  url: ['pwa.peru21.pe', 'pwa.dev.peru21.pe'],
  main: '/category/portada',
  third: {
    tagManagerCode: 'GTM-K4TR74P',
    taboola: {
      active: false,
      mode: 'thumbnails-d',
    },
  },
  marketing: {
    url: 'https://peru21.pe/',
    domain: 'peru21.pe',
    brand: 'Perú 21',
    firstColor: '#0E6DC1',
    secondaryColor: '#939393',
    font:
      'https://fonts.googleapis.com/css2?family=Merriweather:wght@900&display=swap',
  },
  categories: [
    {
      ...SECTIONS.PORTADA,
      template: [
        {
          index: 1,
          data: {
            layout: 'full',
            description: true,
          },
          type: 'notice',
        },
        {
          index: 7,
          active: true,
          data: {
            author: true,
            category: 'opinion',
            description: true,
            title: 'Opinión',
            type: 'section',
            share: true,
          },
          includeToEnd: true,
        },
        {
          index: 48,
          active: true,
          data: {
            category: 'deportes',
            layout: 'magazine',
            title: 'Deportes',
            type: 'section',
            media: true,
            share: true,
          },
          includeToEnd: true,
        },
        {
          index: 50,
          active: true,
          data: {
            category: 'espectaculos',
            layout: 'magazine',
            title: 'Espectáculos',
            type: 'section',
            media: true,
            share: true,
          },
          includeToEnd: true,
        },
        ...defaultProps.template,
      ],
    },
  ],
  bottomTabNavigator: [
    {
      id: 'menu',
      label: 'Menú',
    },
    {
      id: 'home',
      label: PAGES.HOME.title,
      icon: {
        type: 'md-home',
      },
      path: '/category/portada',
    },
    {
      id: 'favorites',
      label: PAGES.FAVORITES.title,
      icon: {
        type: 'md-bookmark',
      },
      path: PAGES.FAVORITES.path,
    },
    {
      id: 'peru21tv',
      label: PAGES.TV.title,
      icon: {
        className: 'icon-p21tv',
        type: 'peru-21',
        view: '64 64 896 896',
      },
      path: PAGES.TV.path,
    },
  ],
  navigation: {
    topTabNavigator: [],
  },
  navigationTop: [
    {
      key: 'menu',
      type: null,
    },
    {
      key: 'logotipo',
      image: '/brands/peru21/logo.svg',
      type: 'logotipo',
    },
    {
      key: 'search',
      icon: {
        type: 'md-search',
      },
      url: '/search',
      type: 'link',
    },
  ],
  components: {
    menuBottom: true,
  },
  ads: {
    home: [
      {
        index: 3,
        active: true,
        data: {
          id: 'ads_m_p_movil1',
          nid: 'ads_m_p_movil1',
          position: 'caja1',
          type: 'ads',
        },
      },
      {
        index: 6,
        active: true,
        data: {
          id: 'ads_m_p_movil2',
          nid: 'ads_m_p_movil2',
          position: 'caja2',
          type: 'ads',
        },
      },
      {
        index: 9,
        active: true,
        data: {
          id: 'ads_m_p_movil3',
          nid: 'ads_m_p_movil3',
          position: 'caja3',
          type: 'ads',
        },
      },
      {
        index: 12,
        active: true,
        data: {
          id: 'ads_m_p_movil4',
          nid: 'ads_m_p_movil4',
          position: 'caja4',
          type: 'ads',
        },
      },
      {
        index: 15,
        active: true,
        data: {
          id: 'ads_m_p_movil5',
          nid: 'ads_m_p_movil5',
          type: 'ads',
          position: 'caja5',
        },
      },
    ],
  },
  pages: [
    { ...PAGES.HOME },
    { ...PAGES.FAVORITES },
    { ...PAGES.NEWS },
    { ...PAGES.PROFILE },
    { ...PAGES.TAGS },
    { ...PAGES.TV },
  ],
  powa: {
    brand: 'Peru21_PWA',
    prod: {
      uuid: 'a5442390-8ed5-4055-9fdb-9fdc688fbb74',
    },
    sandbox: {
      uuid: '9c7dba09-27a3-48a4-a879-f96dba3751c8',
    },
  },
  jwplayers: {
    gec: { player: 'QesGNLbA', playerAds: 'dQvX1cu0' },
    peru21: { player: 'CrwCn7tq', playerAds: 'q9aJiogA' },
  },
  defaultProps,
}
