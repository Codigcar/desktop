import React, { useContext, useMemo, useCallback } from 'react'
import Loadable from 'react-loadable'
import { Link, Route, Switch, RouteComponentProps } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './profile.css'

import { AppContext } from '../../context/app'
import Icon from '../../system/icon'
import IconWrapper from '../../system/icon/icon-wrapper'
import Modal from '../../system/modal'
import { historyBack } from '../../tools/history'
import {
  isPaywallActive,
  getBrand,
  myAccountScreenAvailable,
  openAuthScreenAvailable,
  pianoIdAvailable,
  sendFeedbackByEmailAvailable,
} from '../../tools/tools'
import NativeAPI from '../../tools/nativeApi'

const ModalRegister = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "ModalRegister" */ '../../components/eModalMPP/modalRegister'
    ),
  loading: () => null,
})

const UserPage = Loadable({
  loader: () => import(/* webpackChunkName: "UserPage" */ './User'),
  loading: () => null,
})

const ConfirmPasswordPage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "ConfirmPasswordPage" */ './ConfirmPassword'),
  loading: () => null,
})

const SubscriptionPage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "SubscriptionPage" */ './Subscription'),
  loading: () => null,
})

const URL = {
  depor: 'https://depor.com/politicas-cookies/',
  elcomercio: 'https://elcomercio.pe/politica-de-cookies/',
  gestion: 'https://gestion.pe/politica-de-cookies/',
  peru21: 'https://peru21.pe/politicas-de-cookies/',
  trome: 'https://trome.pe/politica-de-cookies/',
}

const AUTH_SCREEN_AVAILABLE = openAuthScreenAvailable()
const FEEDBACK_BY_EMAIL_AVAILABLE = sendFeedbackByEmailAvailable()
const PAYWALL_ACTIVE = isPaywallActive()
const PIANO_ID_AVAILABLE = pianoIdAvailable()

const Profile: React.FC<RouteComponentProps> = ({
  location,
  match: { path, isExact },
}) => {
  const { profile, signIn, ...rest } = useContext(AppContext)

  const brand = useMemo(() => getBrand(), [])

  const getUserInfo = useCallback(
    value => {
      const field = profile && profile[value]
      if (field && field.toLowerCase() !== 'undefined' && field !== '-') {
        return value === 'lastName' ? ` ${field}` : field
      }
      return ''
    },
    [profile],
  )

  const showModalRegister = useCallback(() => {
    if (AUTH_SCREEN_AVAILABLE) {
      NativeAPI.navigate('Auth', {
        screen: 'InitialScreen',
        params: { showCloseOption: true },
      })
      return
    }

    Modal.open({
      content: elm => (
        <ModalRegister
          myRef={elm}
          context={{ profile, signIn, ...rest }}
          gaCategory="sw"
        />
      ),
      myClass: 'is-modal-bottom is-modal-register is-modal-swh',
      animation: 'bottomFade',
    })
  }, [profile, signIn, rest])

  const handleLink = useCallback(
    (event: React.SyntheticEvent) => {
      if (!profile?.uuid) {
        event.preventDefault()
        showModalRegister()
      }
    },
    [profile, showModalRegister],
  )

  const navigateToSubscription = (event: React.SyntheticEvent) => {
    if (PIANO_ID_AVAILABLE) {
      event.preventDefault()
      NativeAPI.navigate('Subscription')
      return
    }
    handleLink(event)
  }

  const navigateToMyAccount = (event: React.SyntheticEvent) => {
    if (!profile?.uuid) {
      event.preventDefault()
      showModalRegister()
    } else {
      const nativeSupport = myAccountScreenAvailable()
      if (nativeSupport) {
        event.preventDefault()
        NativeAPI.navigate('Account')
      }
    }
  }

  const openInBrowser = (event: React.SyntheticEvent) => {
    event.preventDefault()
    window.open(URL[brand], '_blank')
  }

  const openFavorites = (event: React.SyntheticEvent) => {
    event.preventDefault()
    NativeAPI.navigate('Favorite')
  }

  const openCustomContent = useCallback((event: React.SyntheticEvent) => {
    event.preventDefault()
    NativeAPI.navigate('CustomContent')
  }, [])

  const handleEmail = () => {
    const data = { type: 'app.SEND_FEEDBACK_BY_EMAIL' }
    window.ReactNativeWebView?.postMessage(JSON.stringify(data))
  }

  return (
    <div className="profile-view page-view">
      <div className="profile__header safe-area-inset-top">
        <div>
          <button type="button" onClick={historyBack}>
            <IconWrapper size="large">
              <Icon
                type="ios-arrow-forward"
                style={{ fontSize: 20, transform: 'rotate(180deg)' }}
              />
            </IconWrapper>
          </button>
        </div>
        <div className="submenu__item">
          <div>
            <h2>Bienvenido(a){` ${getUserInfo('firstName')}`}</h2>
            {profile && <small>{profile.email || ''}</small>}
          </div>
          {!profile && (
            <div>
              <button
                className="profile__login-button"
                type="button"
                onClick={showModalRegister}
              >
                Iniciar sesión
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="profile__submenu-wrapper">
        <ul className={isExact ? 'submenu pb-48' : 'submenu'}>
          <li>
            <Link
              to="/profile/user"
              className="submenu__item"
              onClick={navigateToMyAccount}
            >
              <div className="submenu__title">
                <Icon type="md-person_outline" />
                <div>
                  <h2>Mi Cuenta</h2>
                  <small>Edite su información</small>
                </div>
              </div>
              <Icon type="ios-arrow-forward" style={{ fontSize: 14 }} />
            </Link>
          </li>
          {PAYWALL_ACTIVE && (
            <li>
              <Link
                to="/profile/mi-suscripcion"
                className="submenu__item"
                onClick={navigateToSubscription}
              >
                <div className="submenu__title">
                  <Icon type="md-account-balance-wallet_outline" />
                  <div>
                    <h2>Mi suscripción</h2>
                    <small>Detalles de su suscripción</small>
                  </div>
                </div>
                <Icon type="ios-arrow-forward" style={{ fontSize: 14 }} />
              </Link>
            </li>
          )}
          <li>
            <Link
              to="/profile/mi-contenido"
              className="submenu__item"
              onClick={openCustomContent}
            >
              <div className="submenu__title">
                <Icon type="md-list_alt" />
                <div>
                  <h2>Mi contenido</h2>
                  <small>Personalice sus secciones</small>
                </div>
              </div>
              <Icon type="ios-arrow-forward" style={{ fontSize: 14 }} />
            </Link>
          </li>
          <li>
            <Link
              to="/favorites"
              className="submenu__item"
              onClick={openFavorites}
            >
              <div className="submenu__title">
                <Icon type="md-bookmark_outline" />
                <div>
                  <h2>Leer luego</h2>
                  <small>Todas sus noticias guardadas</small>
                </div>
              </div>
              <Icon type="ios-arrow-forward" style={{ fontSize: 14 }} />
            </Link>
          </li>
          <li>
            <button
              className="submenu__item"
              onClick={() => NativeAPI.openModeSheet()}
            >
              <div className="submenu__title">
                <Icon
                  type="md-brightness_outline"
                  style={{ transform: 'rotate(135deg)' }}
                />
                <div>
                  <h2>Apariencia</h2>
                  <small>Ajuste el tema de la aplicación</small>
                </div>
              </div>
              <Icon type="ios-arrow-forward" style={{ fontSize: 14 }} />
            </button>
          </li>
          {rest.paywallStatus && FEEDBACK_BY_EMAIL_AVAILABLE ? (
            <li>
              <button className="submenu__item" onClick={handleEmail}>
                <div className="submenu__title">
                  <div>
                    <h2>Enviar comentario</h2>
                  </div>
                </div>
              </button>
            </li>
          ) : null}
          <li>
            <Link
              to="/politics"
              className="submenu__item"
              onClick={openInBrowser}
            >
              <div className="submenu__title">
                <div>
                  <h2>Política de cookies</h2>
                </div>
              </div>
              <Icon type="ios-arrow-forward" style={{ fontSize: 14 }} />
            </Link>
          </li>
        </ul>
      </div>
      <TransitionGroup className="transition-group-portrait">
        <CSSTransition
          key={isExact + ''}
          timeout={{ enter: 300, exit: 300 }}
          classNames="fade"
        >
          <section>
            <Switch location={location}>
              <Route path={`${path}/user`} component={UserPage} />
              <Route
                path={`${path}/mi-suscripcion`}
                component={SubscriptionPage}
              />
              <Route
                path={`${path}/confirm-password`}
                component={ConfirmPasswordPage}
              />
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
}

export default Profile
