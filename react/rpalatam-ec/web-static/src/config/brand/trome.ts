import type { Sections } from './types'

const defaultProps = {
  card: {
    layout: 'magazine',
    header: false,
  },
  template: [{ type: 'notice' }],
}

const PAGES = {
  HOME: {
    path: '/category/:category',
    component: 'home',
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
  name: 'trome',
  url: ['pwa.trome.pe', 'pwa.dev.trome.pe'],
  main: '/category/portada',
  third: {
    taboola: {
      active: true,
      mode: 'thumbnails-d',
    },
    tagManagerCode: 'GTM-TDMR7QP',
  },
  marketing: {
    url: 'https://trome.pe/',
    domain: 'trome.pe',
    brand: 'Trome',
    firstColor: '#FF8400',
    secondaryColor: '#EF5B25',
    font:
      'https://fonts.googleapis.com/css2?family=Encode+Sans+Condensed:wght@400;500;600;900&display=swap',
    secondaryFont:
      'https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;800;900&display=swap',
  },
  categories: [
    {
      ...SECTIONS.PORTADA,
      template: [
        {
          index: 1,
          type: 'notice',
          data: {
            header: false,
          },
        },
        {
          index: 51,
          active: true,
          data: {
            type: 'section',
            layout: 'magazine',
            title: 'Opinión',
            description: false,
            category: 'opinion',
            author: true,
            media: true,
            share: true,
          },
          includeToEnd: true,
        },
        {
          index: 52,
          active: true,
          data: {
            category: 'espectaculos',
            description: false,
            layout: 'magazine',
            title: 'Espectáculos',
            type: 'section',
            media: true,
            share: true,
          },
          includeToEnd: true,
        },
        {
          index: 53,
          active: true,
          data: {
            category: 'deportes',
            description: false,
            layout: 'magazine',
            title: 'Deportes',
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
  navigationTop: [
    {
      key: 'menu',
      type: 'menu',
    },
    {
      key: 'logotipo',
      image: '/brands/trome/logo.svg?v=2',
      type: 'logotipo',
    },
    {
      key: 'other',
      type: null,
    },
  ],
  navigation: {
    topTabNavigator: [],
  },
  components: {},
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
    { ...PAGES.NEWS },
    { ...PAGES.PROFILE },
    { ...PAGES.TAGS },
  ],
  powa: {
    brand: 'Trome_PWA',
    prod: {
      uuid: '03e2d41e-d97e-45c7-a108-c62c816be05c',
    },
    sandbox: {
      uuid: '9f2e1f47-2d16-4989-9a7a-ab5e1e67834e',
    },
  },
  jwplayers: {
    gec: { player: 'mw2yaIG8', playerAds: 'TxIvz082' },
  },
  defaultProps,
}
