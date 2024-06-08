import type { Sections } from './types'

const defaultProps = {
  card: {
    layout: 'magazine',
    description: true,
    author: true,
  },
  template: [
    {
      index: 1,
      data: {
        author: true,
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
  MYNEWS: {
    path: '/mynews',
    component: 'mynews',
    title: 'Mis noticias',
  },
  AUTHORS: {
    path: '/authors',
    component: 'authors',
    title: 'Autores',
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
  name: 'elcomercio',
  url: ['pwa.elcomercio.pe', 'pwa.dev.elcomercio.pe'],
  main: '/category/portada',
  third: {
    tagManagerCode: 'GTM-KGHXT7F',
    taboola: {
      active: true,
      mode: 'thumbnails-i',
    },
  },
  marketing: {
    url: 'https://elcomercio.pe/',
    domain: 'elcomercio.pe',
    brand: 'El Comercio',
    firstColor: '#FFCB05',
    secondaryColor: '#FFCB05',
  },
  categories: [
    {
      ...SECTIONS.PORTADA,
      template: [
        {
          index: 1,
          data: {
            layout: 'full',
            author: true,
            description: true,
          },
          type: 'notice',
        },
      ],
    },
  ],
  internalPages: {
    terminos:
      'https://ecoid.pe/terminos_y_condiciones/a94a8fe5ccb19ba61c4c0873d391e987982fbbd3',
    politicas:
      'https://ecoid.pe/politica_privacidad/a94a8fe5ccb19ba61c4c0873d391e987982fbbd3',
  },
  navigation: {
    topTabNavigator: [],
  },
  bottomTabNavigator: [
    {
      id: 'home',
      label: PAGES.HOME.title,
      icon: {
        type: 'md-home_outline',
      },
      path: '/category/portada',
    },
    {
      id: 'mynews',
      label: PAGES.MYNEWS.title,
      icon: {
        type: 'md-post-add',
      },
      path: PAGES.MYNEWS.path,
    },
    {
      id: 'profile',
      label: PAGES.PROFILE.title,
      icon: {
        type: 'md-person_outline',
      },
      path: PAGES.PROFILE.path,
    },
  ],
  navigationTop: [
    {
      key: 'menu',
      type: 'menu',
    },
    {
      key: 'logotipo',
      image: '/brands/elcomercio/logo.svg',
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
    signwall: true,
  },
  ads: {
    home: [
      {
        index: 3,
        active: true,
        data: {
          id: 'ads_m_p_movil1',
          nid: 'ads_m_p_movil1',
          type: 'ads',
          position: 'caja1',
        },
      },
      {
        index: 6,
        active: true,
        data: {
          id: 'ads_m_p_movil2',
          nid: 'ads_m_p_movil2',
          type: 'ads',
          position: 'caja2',
        },
      },
      {
        index: 9,
        active: true,
        data: {
          id: 'ads_m_p_movil3',
          nid: 'ads_m_p_movil3',
          type: 'ads',
          position: 'caja3',
        },
      },
      {
        index: 12,
        active: true,
        data: {
          id: 'ads_m_p_movil4',
          nid: 'ads_m_p_movil4',
          type: 'ads',
          position: 'caja4',
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
    { ...PAGES.MYNEWS },
    { ...PAGES.AUTHORS },
    { ...PAGES.NEWS },
    { ...PAGES.PROFILE },
    { ...PAGES.TAGS },
  ],
  powa: {
    brand: 'Comercio_PWA',
    prod: {
      uuid: 'e35e70c8-77a0-410a-bdf8-7d9cfd5f9bd7',
    },
    sandbox: {
      uuid: '6bab82c7-8330-4c3b-b8a5-66ee5c239861',
    },
  },
  jwplayers: {
    gec: { player: 'QesGNLbA', playerAds: 'oxSCGgVV' },
    elcomercio: { player: 'VWAez0JC', playerAds: 'diFqwoLd' },
  },
  suscription: {
    signwallCount: 4,
    paywallCount: 9,
  },
  defaultProps,
}
