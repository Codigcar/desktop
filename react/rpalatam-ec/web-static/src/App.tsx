import './tools/polyfill'

import Identity from '@arc-publishing/sdk-identity'
import Sales from '@arc-publishing/sdk-sales'
import classNames from 'classnames'
import Fingerprint2 from 'fingerprintjs2'
import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import Loadable from 'react-loadable'
import { connect } from 'react-redux'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Workbox } from 'workbox-window'
import * as Sentry from '@sentry/browser'

import { LoadPage } from './components/ePlaceHolder'
import UserConfig from './config/web-config'
import { AppContext } from './context/app'
import scrollCategories from './pages/portrait/scroll'
import SectionPage from './pages/section'
import {
  clearFavorites,
  initStateFavorites,
  setFavoritesIds,
  setFavoritesStoriesFromNative,
} from './store/favorites/actions'
import { setTopics } from './store/topics/actions'
import { isSubscribed } from './tools/arc'
import { IS_IOS } from './tools/checkMobile'
import { setUserTracking } from './tools/sentry'
import { addTagManager } from './tools/tagManager'
import {
  getCookie,
  deleteCookie,
  displayImmediateUpdate,
  isLowerVersionThanPublished,
  isPaywallActive,
  pianoIdAvailable,
} from './tools/tools'
import { messageErrorLoad, messageNewVersion } from './tools/newversion'
import { postMessageSesionHandler } from './tools/postMessages'
import './system/button/button.css'
import {
  cleanPreference,
  getAllPreferences,
  setAuthors,
  setTags,
  toggleAuthor,
  toggleNotificationAuthor,
  toggleNotificationTag,
  toggleTag,
} from './store/preferences/actions'
import Modal from './system/modal'
import ModalRegister from './components/eModalMPP/modalRegister'
import NativeAPI from './tools/nativeApi'
import { updateCategoriesFromRN } from './store/config/actions'

const ModalPaywall = Loadable({
  loader: () => import('./components/eModal/paywall'),
  loading: () => null,
})

const ModalUpdate = Loadable({
  loader: () => import('./components/eModal/modalUpdate'),
  loading: () => null,
})

const ENavBottom = Loadable({
  loader: () =>
    import(/* webpackChunkName: "ENavBottom" */ './components/eNavBottom'),
  loading: ({ error }) => {
    if (error) messageErrorLoad()
    return null
  },
})

const EGDPR = Loadable({
  loader: () => import(/* webpackChunkName: "EGDPR" */ './components/eGDPR'),
  loading: ({ error }) => {
    if (error) messageErrorLoad()
    return null
  },
})

const EAudioPlayer = Loadable({
  loader: () =>
    import(/* webpackChunkName: "EAudioPlayer" */ './components/eAudioPlayer'),
  loading: ({ error }) => {
    if (error) messageErrorLoad()
    return null
  },
})

const EAudioMiniPlayer = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "EAudioMiniPlayer" */ './components/eAudioPlayer/EAudioMiniPlayer'
    ),
  loading: ({ error }) => {
    if (error) messageErrorLoad()
    return null
  },
})

const VerticalHome = Loadable({
  loader: () => import(/* webpackChunkName: "VerticalHome" */ './pages/home'),
  loading: ({ error }) => {
    if (error) messageErrorLoad()
    return <LoadPage />
  },
})

const Home = Loadable({
  loader: () => import(/* webpackChunkName: "Home" */ './pages/portrait'),
  loading: ({ error }) => {
    if (error) messageErrorLoad()
    return <LoadPage />
  },
})

const MyNews = Loadable({
  loader: () => import(/* webpackChunkName: "MyNews" */ './pages/mynews'),
  loading: ({ error }) => {
    if (error) messageErrorLoad()
    return <LoadPage />
  },
})

const Authors = Loadable({
  loader: () => import(/* webpackChunkName: "Authors" */ './pages/authors'),
  loading: ({ error }) => {
    if (error) messageErrorLoad()
    return <LoadPage />
  },
})

const Notice = Loadable({
  loader: () => import(/* webpackChunkName: "Notice" */ './pages/notice'),
  loading: ({ error }) => {
    if (error) messageErrorLoad()
    return <LoadPage />
  },
})

const Favorites = Loadable({
  loader: () => import(/* webpackChunkName: "Favorites" */ './pages/favorites'),
  loading: ({ error }) => {
    if (error) messageErrorLoad()
    return <LoadPage />
  },
})

const Profile = Loadable({
  loader: () => import(/* webpackChunkName: "Profile" */ './pages/profile'),
  loading: ({ error }) => {
    if (error) messageErrorLoad()
    return <LoadPage />
  },
})

const Podcast = Loadable({
  loader: () => import(/* webpackChunkName: "Podcast" */ './pages/podcast'),
  loading: ({ error }) => {
    if (error) messageErrorLoad()
    return <LoadPage />
  },
})

const Story = Loadable({
  loader: () => import(/* webpackChunkName: "Story" */ './pages/story'),
  loading: ({ error }) => {
    if (error) messageErrorLoad()
    return <LoadPage />
  },
})

const Tags = Loadable({
  loader: () => import(/* webpackChunkName: "Tags" */ './pages/tags'),
  loading: ({ error }) => {
    if (error) messageErrorLoad()
    return <LoadPage />
  },
})

const Tv = Loadable({
  loader: () => import(/* webpackChunkName: "Tv" */ './pages/tv'),
  loading: ({ error }) => {
    if (error) messageErrorLoad()
    return <LoadPage />
  },
})

const NoMatch = Loadable({
  loader: () => import(/* webpackChunkName: "NoMatch" */ './pages/nomatch'),
  loading: () => null,
})

const PAGES = {
  initial: VerticalHome,
  home: Home,
  favorites: Favorites,
  notice: Notice,
  mynews: MyNews,
  authors: Authors,
  podcast: Podcast,
  profile: Profile,
  tags: Tags,
  tv: Tv,
}

const CustomRoute = ({ zIndex, component: PageComponent, ...rest }) => (
  <section className="route-section" style={{ zIndex }}>
    <Route {...rest} component={PageComponent} />
  </section>
)

const PAYWALL_ACTIVE = isPaywallActive()
const PIANO_ID_AVAILABLE = pianoIdAvailable()

const getUserProfile = () => {
  const userCookie = getCookie('eeecappuser')
  if (userCookie) {
    const value = JSON.parse(userCookie)
    if (!value.id) return null
    return {
      email: value.email,
      uuid: value.id,
      emailVerified: true,
    }
  }

  const userLocalStorage = localStorage.getItem('ArcId.USER_PROFILE')
  if (!userLocalStorage) return null
  const data = JSON.parse(userLocalStorage)
  if (!data) return null
  if (PIANO_ID_AVAILABLE) {
    deleteCookie('arc_e_id', '/')
    Sales.subscriptions = []
    localStorage.removeItem('topicsState')
    localStorage.removeItem('userHaveSubscription')
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({ type: 'auth.SIGN_OUT' }),
    )
    return null
  }
  setUserTracking(data)
  return data
}

interface Props {
  config: any
  dispatch: any
  history: any
  location: any
  preferences: any
  favorites: any
}

interface State {
  appState: any
  showGDPR: boolean
}
class App extends Component<Props, State> {
  update: (dataUpdate: any) => void
  toggleAudioPlay: (play?: any) => void
  toggleAudioPlayer: (showPlayer?: any, showMiniPlayer?: any) => void
  activePlayer: (action?: any) => void
  toggleAudioContent: (data: any, callback: any) => void
  togglePaywallStatus: (status: boolean) => void
  categories: any
  changeCategories: (categories: any) => void
  signOut: () => void
  signIn: (profile: any, fromListener?: boolean) => void
  getSubscription: (retry: any) => void
  updateFollow: (entity: string) => (body: any) => void
  updateNotifications: (entity: string) => (body: any) => void
  setNightMode: (mode: boolean) => void
  updateProfile: (profile: any) => void

  constructor(props) {
    super(props)
    const { config } = props
    this.categories = config.navigation.topTabNavigator
    /* GET USER PROFILE */
    const dataUser = getUserProfile()

    this.changeCategories = categories => {
      this.setState(state => ({
        appState: { ...state.appState, categories },
      }))
    }

    this.signOut = () => {
      localStorage.removeItem('userHaveSubscription')
      NativeAPI.updateSubscriptionStatus(false)
      this.setState(prevState => ({
        appState: {
          ...prevState.appState,
          profile: null,
          paywallStatus: false,
        },
      }))
      this.props.dispatch(cleanPreference())
      this.props.dispatch(clearFavorites())
      this.props.dispatch(getAllPreferences(false))
    }

    this.signIn = (profile, fromListener) => {
      if (!fromListener) {
        NativeAPI.loadSession(localStorage.getItem('ArcId.USER_INFO'))
      }
      this.setState(
        prevState => ({
          appState: {
            ...prevState.appState,
            ...profile,
          },
        }),
        () => {
          if (PAYWALL_ACTIVE) this.getSubscription(true)
        },
      )
    }

    this.getSubscription = retry => {
      if (PIANO_ID_AVAILABLE) return
      isSubscribed()
        .then(active => {
          NativeAPI.updateSubscriptionStatus(!!active)
          this.togglePaywallStatus(!!active)
        })
        .catch(err => {
          if (err.code === '0001e' && retry) {
            Identity.extendSession().then(() => {
              this.getSubscription(false)
            })
            return
          }
          this.togglePaywallStatus(false)
          Sentry.captureException(err)
        })
    }

    this.update = dataUpdate => {
      this.setState(prevState => ({
        appState: {
          ...prevState.appState,
          dataUpdate,
        },
      }))
    }

    this.toggleAudioPlay = (play = true) => {
      this.setState(prevState => ({
        appState: {
          ...prevState.appState,
          audioPlaying: play,
        },
      }))
    }

    this.toggleAudioPlayer = (showPlayer = false, showMiniPlayer = false) => {
      this.setState(prevState => ({
        appState: {
          ...prevState.appState,
          showAudioPlayer: showPlayer,
          showAudioMiniPlayer: showMiniPlayer,
        },
      }))
    }

    this.activePlayer = (action = true) => {
      this.setState(prevState => ({
        appState: {
          ...prevState.appState,
          audioPlayerActive: action,
        },
      }))
    }

    this.toggleAudioContent = (data, callback) => {
      this.setState(
        prevState => ({
          appState: {
            ...prevState.appState,
            audioContent: data,
          },
        }),
        () => {
          if (callback) {
            callback()
          }
        },
      )
    }

    this.togglePaywallStatus = status => {
      if (status) {
        localStorage.setItem('userHaveSubscription', 'si')
      } else {
        localStorage.removeItem('userHaveSubscription')
      }
      this.props.dispatch(getAllPreferences(status))
      NativeAPI.updateSubscriptionStatus(status)
      this.setState(prevState => ({
        appState: {
          ...prevState.appState,
          paywallStatus: status,
        },
      }))
    }

    this.updateFollow = entity => body => {
      const { paywallStatus } = this.state.appState
      const { dispatch } = this.props
      switch (entity) {
        case 'authors':
          dispatch(toggleAuthor(body, paywallStatus))
          break
        case 'tags':
          dispatch(toggleTag(body, paywallStatus))
          break
        default:
          break
      }
    }

    this.updateNotifications = entity => async body => {
      const { dispatch } = this.props
      const { paywallStatus } = this.state.appState
      switch (entity) {
        case 'authors':
          await dispatch(toggleNotificationAuthor(body, paywallStatus))
          break
        case 'tags':
          await dispatch(toggleNotificationTag(body, paywallStatus))
          break
        default:
          break
      }
    }

    this.setNightMode = mode => {
      this.setState(prevState => ({
        ...prevState,
        appState: {
          ...prevState.appState,
          nightMode: mode,
        },
      }))
    }

    this.updateProfile = userProfile => {
      this.setState(
        prevState => ({
          ...prevState,
          appState: {
            ...prevState.appState,
            profile: userProfile,
          },
        }),
        () => {
          window.localStorage.setItem(
            'ArcId.USER_PROFILE',
            JSON.stringify(userProfile),
          )
        },
      )
    }

    this.state = {
      appState: {
        categories: this.categories,
        changeCategories: this.changeCategories,
        nightMode: UserConfig.get('mode'),
        signOut: this.signOut,
        signIn: this.signIn,
        update: this.update,
        dataUpdate: null,
        profile: dataUser,
        paywallStatus: Boolean(localStorage.getItem('userHaveSubscription')),
        togglePaywallStatus: this.togglePaywallStatus,
        audioPlayerActive: false,
        activePlayer: this.activePlayer,
        audioPlaying: false,
        showAudioPlayer: false,
        showAudioMiniPlayer: false,
        audioContent: {
          loaded: new Set(),
          loading: new Set(),
        },
        toggleAudioPlay: this.toggleAudioPlay,
        toggleAudioPlayer: this.toggleAudioPlayer,
        toggleAudioContent: this.toggleAudioContent,
        updateFollow: this.updateFollow,
        updateNotifications: this.updateNotifications,
        setNightMode: this.setNightMode,
      },
      showGDPR: false,
    }
  }

  componentDidMount() {
    const {
      config: { marketing, name, third, pages },
      dispatch,
      history,
    } = this.props
    const { appState } = this.state

    this.categories.forEach(category => {
      scrollCategories[category.key] = 0
    })

    dispatch(initStateFavorites())
    localStorage.removeItem('recents')

    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      const wb = new Workbox(`${window.location.origin}/sw.js`)
      wb.addEventListener('installed', event => {
        if (event.isUpdate) {
          process.env.REACT_APP_ENVIRONMENT === 'production'
            ? messageNewVersion()
            : window.location.reload()
        }
      })
      wb.register()
    }

    /**
     * Quitar del localStorage las categorias personalizas
     *
     * @link
     * https://app.clickup.com/t/1uhk3fn
     */
    localStorage.removeItem('customTabCategories')

    /* SENTRY */
    const prod = /pwa\.(depor|elcomercio|peru21|trome|gestion)\.(pe|com)/.test(
      window.location.hostname,
    )
    Sentry.init({
      dsn: 'https://aa2c63eadc6b4402a38b2f796653323f@sentry.ec.pe/15',
      environment: prod ? 'production' : 'development',
      release: process.env.REACT_APP_VERSION,
      debug: !prod,
      whitelistUrls: [
        /pwa.(dev.)?(elcomercio|depor|gestion|peru21|trome).(pe|com)\/static\/js/,
      ],
      blacklistUrls: [/s0\.2mdn\.net/, /platform\.twitter\.com/],
      // ignoreErrors: ['ServiceWorker'],
      beforeBreadcrumb(breadcrumb) {
        if (breadcrumb?.data?.url?.includes('stats.g.doubleclick.net')) {
          return null
        }
        return breadcrumb
      },
      beforeSend(event, hint = {}) {
        if (process.env.REACT_APP_ENVIRONMENT === 'development') {
          console.log(event, hint)
        }
        const evt = event
        const error = hint.originalException as Error
        if (error?.message && evt.tags) {
          const match = error.message.match(/^\[(.*?)\]/i)
          if (match) {
            const [, categoryError] = match
            evt.tags.category = categoryError
          }
        }
        return evt
      },
    })
    Sentry.configureScope(scope => {
      scope.setTag('brand', name)
      scope.setTag('category', 'GENERAL')
    })

    if (!process.env.REACT_APP_ARC_IDENTITY_JS) {
      throw Error('NOT FOUND ARC IDENTITY URL')
    }

    Identity.options({
      apiOrigin:
        (name === 'depor' || name === 'trome') &&
        process.env.REACT_APP_ENVIRONMENT !== 'production'
          ? `https://api-elcomercio-${name}-sandbox.cdn.arcpublishing.com`
          : `${process.env.REACT_APP_API_ORIGIN}${marketing.domain}`,
    })

    if (appState.profile) {
      this.signIn({ profile: appState.profile }, true)
    } else {
      dispatch(getAllPreferences(false))
    }

    if (process.env.REACT_APP_ENVIRONMENT === 'production') {
      addTagManager(third.tagManagerCode)
    }

    /* GDPR */
    if (
      isLowerVersionThanPublished() &&
      !getCookie('GDPR') &&
      !localStorage.getItem('cookies_politics')
    ) {
      fetch('https://geoapi.eclabs.io/location')
        .then(res => res.json())
        .then(data => {
          if (
            data.is_in_european_union &&
            data.is_in_european_union !== 'nil'
          ) {
            this.setState({
              showGDPR: true,
            })
          }
          window.document.cookie = 'GDPR=true; max-age=604800; path=/;'
        })
        .catch(err => console.error(err))
    }

    const IMMEDIATE_UPDATE = displayImmediateUpdate()
    if (IMMEDIATE_UPDATE) {
      Modal.open({
        content: () => <ModalUpdate />,
        myClass: 'is-modal-center is-modal-swh',
        animation: 'centerFade',
        disableBack: true,
      })
    }

    // Browser ID ARC
    setTimeout(() => {
      Fingerprint2.get(componentss => {
        const values = componentss.map(component => component.value)
        const murmur = Fingerprint2.x64hash128(values.join(''), 31)
        window.document.cookie = `gecdigarc=${murmur};expires=Fri, 31 Dec 2038 23:59:59 GMT;path=/;`
      })
    }, 500)

    /* Fix for input on iOS - virtual keyword */
    if (IS_IOS()) {
      window.addEventListener(
        'blur',
        event => {
          const target = event.target as HTMLElement
          if (
            target &&
            (target.tagName === 'INPUT' ||
              target.tagName === 'SELECT' ||
              target.tagName === 'TEXTAREA')
          ) {
            setTimeout(() => {
              window.scrollTo(document.body.scrollLeft, document.body.scrollTop)
            }, 0)
          }
        },
        true,
      )
    }

    /* Postmessage from React Native */
    window.addEventListener(
      'message',
      event => {
        const { content, type, payload } = event.data
        if (type === 'app.OPEN_SIGNWALL_MODAL') {
          Modal.open({
            content: elm => (
              <ModalRegister
                context={this.state.appState}
                gaCategory="sw"
                myRef={elm}
              />
            ),
            myClass: 'is-modal-bottom is-modal-register is-modal-swh',
            animation: 'bottomFade',
          })
          return
        }
        if (type === 'app.OPEN_PAYWALL_MODAL') {
          Modal.open({
            content: elm => (
              <ModalPaywall
                myRef={elm}
                context={this.state.appState}
                gaCategory="organic"
              />
            ),
            myClass: 'is-modal-bottom is-modal-swh',
            animation: 'bottomFade',
          })
        }
        if (type === 'auth.UPDATE_PROFILE') this.updateProfile(payload)
        if (type === 'auth.PROFILE' && PIANO_ID_AVAILABLE) {
          const profile = {
            email: payload.email,
            uuid: payload.id,
            emailVerified: true,
          }
          this.setState(prevState => ({
            ...prevState,
            appState: {
              ...prevState.appState,
              profile,
            },
          }))
          const noticeWrapper = document.querySelector('.wrap-view-new')
          if (noticeWrapper) noticeWrapper.removeAttribute('style')
          window.currentModal?.modal?.remove()
          // Remove ArcId
          localStorage.removeItem('ArcId.USER_INFO')
          localStorage.removeItem('ArcId.USER_PROFILE')
          // Hide Relogin Notification
          document.querySelector('.notification-relogin')?.classList.add('out')
          return
        }
        if (type === 'auth.LOGOUT') {
          this.signOut()
          if (!PIANO_ID_AVAILABLE) {
            Sales.subscriptions = []
            Identity.logout()
          }
        }
        if (type === 'subscription.UPDATE_STATUS' && PIANO_ID_AVAILABLE) {
          this.togglePaywallStatus(payload.status)
          return
        }
        if (type !== 'pushHistory') return
        try {
          const url = new URL(content)
          history.push({
            pathname: url.pathname,
            search: '?ref=openapp',
          })
        } catch (error) {
          console.error(error, content)
        }
      },
      false,
    )

    window.currentModal = {
      modal: null,
      onClose: user => {
        this.signIn(
          {
            profile: user,
          },
          true,
        )
      },
    }

    window.addEventListener('message', postMessageSesionHandler, true)
    const payload: { auth?: Record<string, string> } = {}
    if (appState.profile?.uuid) payload.auth = appState.profile
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({ type: 'init.WEB_LOADED', payload }),
    )
    window.appHistory = this.props.history

    const tv = pages.find(p => p.component === 'tv')
    const drawerPages = [
      {
        id: 'profile',
        path: '/profile',
        name: 'Mi Perfil',
        iconName: 'account',
      },
    ]

    tv &&
      drawerPages.push({
        id: tv.component,
        path: tv.path,
        name: tv.title,
        iconName: 'monitor',
      })

    const initialData = {
      isSubscriptor: appState.paywallStatus,
      paywallActive: PAYWALL_ACTIVE,
      pages: drawerPages,
    }

    NativeAPI.loadInitialData(initialData)
    if (PAYWALL_ACTIVE && !appState.paywallStatus) {
      NativeAPI.triggerInAppEvent('campaign_non_subscribers')
    }

    window.NATIVE_CONNECTION = {
      favorites: {
        setIds: (ids: string[]) => {
          dispatch(setFavoritesIds(ids))
        },
        setStories: (stories: []) => {
          dispatch(setFavoritesStoriesFromNative(stories))
        },
      },
      preferences: {
        setAuthors: authors => dispatch(setAuthors(authors)),
        setTags: tags => dispatch(setTags(tags)),
      },
      categories: {
        setCategoriesConfig: config => {
          dispatch(updateCategoriesFromRN(config, this.changeCategories))
        },
      },
      mode: { setNightMode: this.setNightMode },
      topics: { setTopics: (topics: string[]) => dispatch(setTopics(topics)) },
    }
  }

  componentWillUnmount() {
    window.removeEventListener('message', postMessageSesionHandler)
  }

  render() {
    const {
      config: {
        components: { menuBottom },
        main,
        marketing,
        name,
        pages,
      },
      location,
    } = this.props

    const { appState, showGDPR } = this.state
    const myKey = location.pathname.split('/')[1] || 'category'

    const classes = classNames(name, {
      'night-mode': appState.nightMode,
      [`zoom-${UserConfig.get('fontSize')}`]: true,
    })

    const pageCategories = appState.categories.filter(c => c.id !== 'portada')

    return (
      <div>
        <Helmet>
          <meta name="theme-color" content={marketing.firstColor} />
          <link id="link-canonical" rel="canonical" href={marketing.url} />
          <link rel="shortcut icon" href={`/brands/${name}/favicon.png`} />
          <link rel="manifest" href={`/brands/${name}/manifest.json`} />
          <link
            rel="preconnect"
            href={`https://img.${marketing.domain}`}
            crossOrigin="use-credentials"
          />
          <link rel="preload" as="image" href={`/brands/${name}/logo.svg`} />
          <link
            rel="preload"
            as="image"
            href={`/brands/${name}/placeholder.svg`}
          />
          <link
            rel="apple-touch-icon"
            sizes="167x167"
            href={`/brands/${name}/167x167.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`/brands/${name}/180x180.png`}
          />
          <link rel="dns-prefetch" href="https://adservice.google.com" />
          <link rel="preconnect" href="https://adservice.google.com" />
          <link rel="dns-prefetch" href="https://tpc.googlesyndication.com" />
          <link rel="preconnect" href="https://tpc.googlesyndication.com" />
          <link rel="preconnect" href="https://www.googletagmanager.com" />
          <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
          <link rel="preconnect" href="http://pagead2.googlesyndication.com" />
          <link
            rel="dns-prefetch"
            href="http://pagead2.googlesyndication.com"
          />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          {marketing.font && <link href={marketing.font} rel="stylesheet" />}
          {name === 'elcomercio' && (
            <link href={`/brands/elcomercio/styles.css`} rel="stylesheet" />
          )}
          <title>{marketing.brand}</title>
          <style type="text/css">
            {`
            .splash-screen, .is-header.is-primary, .e-head.bg-brand {
              background-color: ${marketing.firstColor};
            }
            .categories-menu-indicator {
              background-color: ${marketing.secondaryColor};
            }
            .page-view {
              height: ${menuBottom ? 'calc(100vh - 49px)' : '100vh'}
            }
            @supports (padding: env(safe-area-inset-bottom)) {
              .page-view {
                height: ${
                  menuBottom
                    ? 'calc(100vh - env(safe-area-inset-bottom) - 49px)'
                    : '100vh'
                }
              }
            }
          `}
          </style>
          <body className={classes} />
        </Helmet>
        <AppContext.Provider value={appState}>
          {main === '/' ? (
            <Route path="/category/:category" component={SectionPage} />
          ) : (
            <Route exact path="/" render={() => <Redirect to={main} />} />
          )}
          <TransitionGroup className="transition-group">
            <CSSTransition
              key={myKey}
              timeout={{ enter: 300, exit: 300 }}
              classNames="fade"
            >
              <Switch location={location}>
                {pages.map(page => (
                  <CustomRoute
                    key={page.path}
                    path={page.path}
                    component={PAGES[page.component]}
                    zIndex={page.component === 'notice' ? 4 : 'auto'}
                    exact={page.path === '/'}
                  />
                ))}
                {pageCategories.map(page => (
                  <CustomRoute
                    key={page.path}
                    path={`/${page.key}/:notice`}
                    component={Notice}
                    zIndex={4}
                  />
                ))}
                <CustomRoute
                  path={'/story/:storyId'}
                  component={Story}
                  zIndex={4}
                />
                <Route component={NoMatch} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
          {menuBottom ? <ENavBottom /> : null}
          {showGDPR ? <EGDPR location={location} /> : null}
          {appState.audioPlayerActive ? (
            <>
              <EAudioPlayer show={appState.showAudioPlayer} />
              <EAudioMiniPlayer show />
            </>
          ) : null}
        </AppContext.Provider>
      </div>
    )
  }
}

const AppWrapper: React.FC<any> = props => {
  return <div>{props.config.categories ? <App {...props} /> : ''}</div>
}

const mapStateToProps = state => ({
  config: state.configBrand,
})

export default withRouter(connect(mapStateToProps)(AppWrapper))
