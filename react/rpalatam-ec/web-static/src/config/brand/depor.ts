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
  name: 'depor',
  url: ['pwa.depor.com', 'pwa.dev.depor.com'],
  main: '/category/portada',
  third: {
    tagManagerCode: 'GTM-W82K6DF',
    taboola: {
      active: false,
      mode: '',
    },
  },
  marketing: {
    url: 'https://depor.com/',
    domain: 'depor.com',
    brand: 'Depor',
    firstColor: '#007c31',
    secondaryColor: '#f25a23',
    font:
      'https://fonts.googleapis.com/css2?family=Merriweather:wght@900&display=swap',
  },
  categories: [
    {
      ...SECTIONS.PORTADA,
      default: {
        card: Object.assign({}, defaultProps.card),
      },
      template: [
        {
          index: 1,
          data: {
            layout: 'full',
            description: true,
          },
          type: 'notice',
        },
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
      label: 'Inicio',
      icon: {
        type: 'md-home',
      },
      path: '/category/portada',
    },
    {
      id: 'search',
      label: 'Buscar',
      icon: {
        type: 'md-search',
      },
      path: '/search',
    },
  ],
  navigation: {
    topTabNavigator: [],
  },
  navigationTop: [
    {
      key: 'menu',
      type: 'menu',
    },
    {
      key: 'logotipo',
      image: '/brands/depor/logo.svg',
      type: 'logotipo',
    },
    {
      key: 'other',
      type: null,
    },
  ],
  components: {
    menuBottom: false,
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
    { ...PAGES.NEWS },
    { ...PAGES.PROFILE },
    { ...PAGES.TAGS },
  ],
  powa: {
    brand: 'Depor_PWA',
    prod: {
      uuid: 'f0b207ae-e4ea-42cc-b1ec-c114601b533f',
    },
    sandbox: {
      uuid: '6631d933-2202-4267-ad3c-a0f6a5f51238',
    },
  },
  jwplayers: {
    gec: { player: 'nM3HvVdY', playerAds: 'Hm6R42Pa' },
  },
  defaultProps,
}
