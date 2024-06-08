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
        layout: 'full',
      },
      type: 'notice',
    },
  ],
}

const PAGES = {
  HOME: {
    path: '/',
    component: 'initial',
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
  TV: {
    path: '/gestion-tv',
    component: 'tv',
    title: 'Gestión TV',
    programs: [
      {
        title: '20 EN EMPLEABILIDAD',
        path: '20-empleabilidad',
      },
      {
        title: 'CONSULTOR DE NEGOCIOS',
        path: 'consultorio-negocios',
      },
      {
        title: 'CON LAS CUENTAS CLARAS',
        path: 'cuentas-claras',
      },
      {
        title: 'HABLEMOS MAS SIMPLE',
        path: 'hablemos-mas-simple',
      },
    ],
  },
}

export default {
  name: 'gestion',
  url: ['pwa.gestion.pe', 'pwa.dev.gestion.pe'],
  main: '/',
  third: {
    tagManagerCode: 'GTM-MP8PBDF',
    taboola: {
      active: false,
      mode: '',
    },
  },
  marketing: {
    url: 'https://gestion.pe/',
    domain: 'gestion.pe',
    brand: 'Gestión',
    firstColor: '#F5E9DE',
    secondaryColor: '#841b24',
    font:
      'https://fonts.googleapis.com/css2?family=Merriweather:wght@900&display=swap',
  },
  categories: [],
  templates: [
    {
      _id: 'portada',
      default: { card: defaultProps.card },
      path: '/',
      template: defaultProps.template,
    },
  ],
  internalPages: {
    terminos:
      'https://ecoid.pe/terminos_y_condiciones/108f85a3d8e750a325ced951af6cd758a90e73a34',
    politicas:
      'https://ecoid.pe/politica_privacidad/108f85a3d8e750a325ced951af6cd758a90e73a34',
  },
  bottomTabNavigator: [
    {
      id: 'menu',
      label: 'Secciones',
    },
    {
      id: 'home',
      label: PAGES.HOME.title,
      icon: {
        type: 'md-home_outline',
      },
      path: PAGES.HOME.path,
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
      type: null,
    },
    {
      key: 'logotipo',
      image: '/brands/gestion/logo.svg',
      image_night: '/brands/gestion/logo_night.svg',
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
    signwall: true,
    menuBottom: true,
  },
  navigation: {
    topTabNavigator: [],
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
        index: 101,
        active: true,
        data: {
          id: 'ads_m_p_movil3',
          nid: 'ads_m_p_movil3',
          position: 'caja3',
          type: 'ads',
        },
      },
      {
        index: 103,
        active: true,
        data: {
          id: 'ads_m_p_movil4',
          nid: 'ads_m_p_movil4',
          position: 'caja4',
          type: 'ads',
        },
      },
      {
        index: 105,
        active: true,
        data: {
          id: 'ads_m_p_movil5',
          nid: 'ads_m_p_movil5',
          position: 'caja5',
          type: 'ads',
        },
      },
      {
        index: 107,
        active: true,
        data: {
          id: 'ads_m_p_movil6',
          nid: 'ads_m_p_movil6',
          position: 'caja6',
          type: 'ads',
        },
      },
      {
        index: 109,
        active: true,
        data: {
          id: 'ads_m_p_movil7',
          nid: 'ads_m_p_movil7',
          position: 'caja7',
          type: 'ads',
        },
      },
      {
        index: 111,
        active: true,
        data: {
          id: 'ads_m_p_movil8',
          nid: 'ads_m_p_movil8',
          position: 'caja8',
          type: 'ads',
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
    { ...PAGES.TV },
  ],
  powa: {
    brand: 'Gestion_PWA',
    prod: {
      uuid: '100b251e-53dc-4755-a295-2fd227fc1551',
    },
    sandbox: {
      uuid: '6bab82c7-8330-4c3b-b8a5-66ee5c239861',
    },
  },
  jwplayers: {
    gec: { player: '5yA2N7Qh', playerAds: 'LIi3eTVR' },
  },
  suscription: {
    signwallCount: 3,
    paywallCount: 8,
  },
  defaultProps,
}
