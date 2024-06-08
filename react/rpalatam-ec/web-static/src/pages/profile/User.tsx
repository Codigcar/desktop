import Identity from '@arc-publishing/sdk-identity'
import Sales from '@arc-publishing/sdk-sales'
import * as Sentry from '@sentry/browser'
import classNames from 'classnames'
import React, { useState, useContext, useCallback, SyntheticEvent } from 'react'
import Loadable from 'react-loadable'
import {
  Link,
  Redirect,
  Route,
  Switch,
  RouteComponentProps,
} from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './user.css'

import ChangePasswordView from './ChangePassword'
import ConfirmPasswordView from './ConfirmPassword'
import ERibbon from '../../components/eRibbon/index'
import { AppContext } from '../../context/app'
import Icon from '../../system/icon'
import Notification from '../../system/notification'
import { ARC_ERROR } from '../../tools/errors'
import NativeAPI from '../../tools/nativeApi'
import {
  changePasswordScreenAvailable,
  deleteCookie,
  getDomain,
} from '../../tools/tools'

const NewsletterView = Loadable({
  loader: () => import(/* webpackChunkName: "NewsletterPage" */ './Newsletter'),
  loading: () => null,
})

const CHANGE_PASSWORD_SUPPORTED = changePasswordScreenAvailable()

const NewUser: React.FC<RouteComponentProps> = ({
  history,
  location,
  match,
}) => {
  const [sendVerify, setSendVerify] = useState(false)
  const [domain] = useState(() => getDomain())
  const { signOut, profile } = useContext(AppContext)

  const closeSession = useCallback(
    async (evt: SyntheticEvent) => {
      evt.preventDefault()
      signOut()
      window.localStorage.removeItem('topicsState')

      window.dataLayer?.push({
        event: 'SuscriptionActivity',
        category: 'PWA_Sign_Wall',
        action: 'pwa_sw_cuenta_link_cerrar_sesion',
        label: window.location.href.replace(window.location.origin, ''),
        value: 0,
      })
      Sales.subscriptions = []
      await Identity.logout()
      deleteCookie('arc_e_id', '/')
      window.ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: 'auth.SIGN_OUT',
        }),
      )
    },
    [signOut],
  )

  const validateEmail = useCallback(
    event => {
      event.preventDefault()
      if (sendVerify) return
      Identity.requestVerifyEmail(profile!.email)
        .then(res => {
          if (res) {
            setSendVerify(true)
            Notification.success({
              content: 'Te hemos enviado un correo para verificar tu email',
              duration: 6,
            })
          } else {
            Notification.error({
              content: 'No pudimos verificar tu cuenta. Inténtalo mas tarde',
            })
          }
        })
        .catch(err => {
          const error = new Error(`${ARC_ERROR.VALID_EMAIL} ${err.message}`)
          Sentry.captureException(error)
          Notification.error({
            content: 'No pudimos verificar tu cuenta. Inténtalo más tarde.',
          })
        })
    },
    [profile, sendVerify],
  )

  const handleChangeInformation = (e: SyntheticEvent) => {
    e.preventDefault()
    NativeAPI.navigate('Account', { screen: 'Information' })
  }

  const navigateToChangePassword = (event: SyntheticEvent) => {
    if (!CHANGE_PASSWORD_SUPPORTED) return
    event.preventDefault()
    NativeAPI.navigate('Account', { screen: 'ChangePassword' })
  }

  if (!profile?.uuid) return <Redirect to="/profile" />

  const { emailVerified, email, accountReference } = profile
  const identities = profile?.identities || []
  const isPassword = identities.some(identity => identity.type === 'Password')

  const verifyClass = classNames({
    'input-verify': sendVerify,
  })

  return (
    <div className="internal-page">
      <ERibbon
        content={{ seccion: { nombre: 'Mi Cuenta' } }}
        hideHamburger
        hideIconHome
        history={history}
      />
      <div className="safe-area-with-ribbon pt-48 h-screen">
        <div className="profile__account">
          <ul className="submenu">
            <li>
              <Link
                className="submenu__item"
                to="/profile/user/change-info"
                onClick={handleChangeInformation}
              >
                <div className="submenu__title">
                  <h2>Cambiar mi información</h2>
                </div>
                <Icon type="ios-arrow-forward" style={{ fontSize: 14 }} />
              </Link>
            </li>
            {isPassword && (
              <li>
                <Link
                  className="submenu__item"
                  to="/profile/user/change-password"
                  onClick={navigateToChangePassword}
                >
                  <div className="submenu__title">
                    <h2>Cambiar contraseña</h2>
                  </div>
                  <Icon type="ios-arrow-forward" style={{ fontSize: 14 }} />
                </Link>
              </li>
            )}
            {domain === 'gestion.pe' ? (
              <li>
                <Link className="submenu__item" to="/profile/user/newsletter">
                  <div className="submenu__title">
                    <h2>Newsletter</h2>
                  </div>
                  <Icon type="ios-arrow-forward" style={{ fontSize: 14 }} />
                </Link>
              </li>
            ) : null}
            {email && !emailVerified && !accountReference ? (
              <li className={verifyClass}>
                <div className="submenu__item">
                  <div className="submenu__title">
                    <button type="button" onClick={validateEmail}>
                      <h2>
                        {sendVerify
                          ? 'Correo por verificar'
                          : 'Verificar email'}
                      </h2>
                    </button>
                  </div>
                </div>
              </li>
            ) : null}
          </ul>
          <div className="submenu__item input-logout">
            <button type="button" onClick={closeSession}>
              <h2>Cerrar Sesión</h2>
            </button>
          </div>
        </div>
      </div>
      <TransitionGroup className="transition-group-portrait">
        <CSSTransition
          key={`${match.isExact}`}
          timeout={{ enter: 300, exit: 300 }}
          classNames="fade"
        >
          <section>
            <Switch location={location}>
              <Route
                path={`${match.path}/change-password`}
                component={ChangePasswordView}
              />
              <Route
                path={`${match.path}/confirm-password`}
                component={ConfirmPasswordView}
              />
              <Route
                path={`${match.path}/newsletter`}
                component={NewsletterView}
              />
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
}

export default React.memo(NewUser)
