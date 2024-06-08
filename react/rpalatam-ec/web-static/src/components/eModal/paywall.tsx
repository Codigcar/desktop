import Identity from '@arc-publishing/sdk-identity'
import * as Sentry from '@sentry/browser'
import React from 'react'
import Loadable from 'react-loadable'
import './modal.css'

import {
  CampaignInterface,
  fetchPaywallCampaign,
} from '../../services/paywall-campaign'
import Icon from '../../system/icon'
import Modal from '../../system/modal'
import Notification from '../../system/notification'
import { isSubscribed } from '../../tools/arc'
import { RN_SCREENS_STORY, RN_SCREENS_STORY_V2 } from '../../tools/flags'
import nativeApi from '../../tools/nativeApi'
import { getDomain, pianoIdAvailable } from '../../tools/tools'

declare global {
  interface Window {
    nativeConnection: any
    webkit: any
  }
}

const ModalRegister = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "ModalRegister" */ '../eModalMPP/modalRegister'
    ),
  loading: () => null,
})

const refValues = {
  organic: 'organico',
  hard: 'paywall',
  premium: 'premium',
}

const BENEFITS = [
  'Sin anuncios en la aplicación.',
  'Análisis e informes exclusivos.',
  'Navegación ilimitada desde todos tus dispositivos.',
  'Descuentos especiales del Club de beneficios.',
  'Soporte prioritario en la aplicación.',
]

const domain = getDomain()
const [brand] = domain.split('.')
const PIANO_ID_AVAILABLE = pianoIdAvailable()

interface Props {
  callback?: any
  context: any
  gaCategory: string
  gaValue?: number | null
  history?: any
  myRef: any
  noticePath?: string
}

interface State {
  validating: boolean
  withSession: boolean
  campaign: CampaignInterface
  loadingCampaign: boolean
}

export class ModalPaywall extends React.PureComponent<Props, State> {
  state = {
    validating: false,
    withSession: true,
    campaign: {
      name: '',
      plans: {
        monthly: {
          initial: {
            amount: 0,
            durationCount: 0,
          },
          normal: {
            amount: 0,
            durationCount: 0,
          },
        },
      },
    },
    loadingCampaign: true,
  }

  componentDidMount() {
    const { gaCategory, gaValue } = this.props
    // const category = categories[gaCategory];
    if (gaCategory) {
      window.dataLayer?.push({
        event: 'SuscriptionActivity',
        category: 'PWA_Paywall',
        action: `pwa_paywall_modal_${gaCategory}_open`,
        label: window.location.href.replace(window.location.origin, ''),
        value: gaValue || 0,
      })
    }

    fetchPaywallCampaign(brand).then(res => {
      if (res.ok && res.data) {
        this.setState({ loadingCampaign: false, campaign: res.data })
      }
    })
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.paywallMessage)
    window.removeEventListener('message', this.handlePostmessage)
  }

  goToHome = () => {
    if (RN_SCREENS_STORY() || RN_SCREENS_STORY_V2()) {
      return nativeApi.navigateGoBack()
    }
    const { history, myRef } = this.props
    myRef.remove()
    history.replace('/category/portada?ref=paywall-modal')
  }

  showModalRegister = () => {
    const { context } = this.props
    Modal.open({
      content: elm => (
        <ModalRegister
          myRef={elm}
          callback={this.verifySubscription}
          context={context}
          gaCategory="paywall"
        />
      ),
      myClass: 'is-modal-bottom is-modal-register is-modal-swh',
      animation: 'bottomFade',
    })
  }

  verifySubscription = type => {
    const { context, myRef } = this.props
    if (type === 'success') {
      this.setState(
        {
          validating: true,
          withSession: false,
        },
        () => {
          isSubscribed()
            .then(active => {
              if (active) {
                context.togglePaywallStatus(true)
                const noticeWrapper = document.querySelector('.wrap-view-new')
                if (noticeWrapper) noticeWrapper.removeAttribute('style')
                myRef.remove()
                return
              }
              Notification.info({
                content: 'Aún no tienes una suscripción.',
              })
              this.setState({
                validating: false,
              })
            })
            .catch(err => {
              this.setState({
                validating: false,
              })
              Notification.error({
                content:
                  'No pudimos validar tu suscripción. Por favor vuelve a iniciar sesión.',
              })
              Sentry.captureException(err)
            })
        },
      )
    }
  }

  handleRestore = () => {
    if (PIANO_ID_AVAILABLE) {
      window.removeEventListener('message', this.handlePostmessage)
      window.addEventListener('message', this.handlePostmessage, false)
      nativeApi.checkAccessSubscription()
      this.setState({ validating: true })
      return
    }
    const user = localStorage.getItem('ArcId.USER_INFO')
    const profile = JSON.parse(user || '{}')
    if (profile?.uuid) this.verifySubscription('success')
    else this.showModalRegister()
  }

  handlePostmessage = event => {
    const { type, payload } = event.data
    if (!/^subscription\./.test(type)) return
    if (!payload.status) return this.setState({ validating: false })
    document.querySelector('.wrap-view-new')?.removeAttribute('style')
    this.props.myRef.remove()
  }

  paywallMessage = event => {
    const { callback, context, myRef } = this.props
    if (event.origin.includes(domain)) {
      switch (event.data) {
        case 'paywall_ready':
          const userInfoStorage = localStorage.getItem('ArcId.USER_INFO')
          if (window.webkit?.messageHandlers?.nativeConnection) {
            window.webkit.messageHandlers.nativeConnection.postMessage(
              userInfoStorage,
            )
          } else if (window.nativeConnection) {
            window.nativeConnection.postMessage(userInfoStorage)
          }
          break
        case 'successful_purchase':
          this.setState({
            validating: true,
          })

          window.removeEventListener('message', this.paywallMessage)
          window.dataLayer?.push({
            event: 'SuscriptionActivity',
            category: 'PWA_Paywall',
            action: 'pwa_paywall_successful_purchase',
            label: window.location.href.replace(window.location.origin, ''),
            value: 0,
          })

          Identity.extendSession()
            .then(() => {
              isSubscribed()
                .then(active => {
                  if (!active) throw new Error('Without subscription')
                  callback?.()
                  context.togglePaywallStatus(true)
                  document
                    .querySelector('.wrap-view-new')
                    ?.removeAttribute('style')
                  myRef.remove()
                })
                .catch(err => {
                  Notification.error({
                    content:
                      'No pudimos validar tu suscripción. Por favor vuelve a iniciar sesión.',
                  })
                  Sentry.captureException(err)
                })
                .finally(() => {
                  this.setState({
                    validating: false,
                  })
                })
            })
            .catch(() => {
              this.setState({
                validating: false,
              })
              this.showModalRegister()
              myRef.remove()
            })
          break
        default:
          break
      }
    }
  }

  openPaywall = () => {
    const { noticePath = '', gaCategory } = this.props
    window.removeEventListener('message', this.paywallMessage)
    window.addEventListener('message', this.paywallMessage, false)
    const path = PIANO_ID_AVAILABLE
      ? '/suscripciones'
      : '/suscripcionesdigitales'
    const url =
      process.env.REACT_APP_ENVIRONMENT === 'production'
        ? `https://${domain}${path}/`
        : `https://elcomercio-${brand}-sandbox.cdn.arcpublishing.com${path}/`
    const ref = refValues[gaCategory] || 'organico'

    window.dataLayer?.push({
      event: 'SuscriptionActivity',
      category: 'PWA_Paywall',
      action: 'pwa_paywall_btn_ver_planes',
      label: window.location.href.replace(window.location.origin, ''),
      value: 0,
    })

    if (
      window.ReactNativeWebView ||
      window.nativeConnection?.requestJsExternalWebView
    ) {
      const userInfo = localStorage.getItem('ArcId.USER_INFO')
      const userProfile = localStorage.getItem('ArcId.USER_PROFILE')
      window.ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: 'navigation.NAVIGATE_TO_SCREEN',
          payload: {
            name: 'Paywall',
            params: {
              title: 'Suscripciones Digitales',
              url,
              injectedJavaScriptBeforeContentLoaded: `(function() {
                sessionStorage.setItem("paywall_last_url","${noticePath}");
                sessionStorage.setItem("paywall_type_modal","${ref}");
                localStorage.setItem("ArcId.USER_INFO", JSON.stringify(${userInfo}));
                localStorage.setItem("ArcId.USER_PROFILE", JSON.stringify(${userProfile}));
                window.ReactNativeWebView.pwaCloseWebview = function() {
                  window.ReactNativeWebView.postMessage("navigation.GO_BACK")
                };
                true;
              })();`,
            },
          },
        }),
      )
      window.nativeConnection?.requestJsExternalWebView(
        url,
        `sessionStorage.setItem("paywall_last_url","${noticePath}");
         sessionStorage.setItem("paywall_type_modal","${ref}");
         localStorage.removeItem("ArcId.USER_INFO");
         localStorage.removeItem("ArcId.USER_PROFILE");
        `,
      )
      return
    }

    window.open(url, '_blank')
  }

  getSubHeading = gaCategory => {
    switch (gaCategory) {
      case 'hard':
        return 'Has alcanzado el límite de noticias. <br /> Para continuar leyendo, adquiere tu'
      case 'premium':
        return 'Para acceder a este contenido exclusivo, adquiere tu'
      default:
        return ''
    }
  }

  render() {
    const { validating, campaign, loadingCampaign } = this.state
    const { gaCategory, myRef } = this.props
    const { initial, normal } = campaign.plans.monthly

    const STORY_ENABLED = RN_SCREENS_STORY() || RN_SCREENS_STORY_V2()
    return (
      <div className="is-modal">
        <div className="is-modal__content" style={{ overflow: 'hidden' }}>
          <div className="register-modal">
            <div className="paywall__modal-header">
              <p
                dangerouslySetInnerHTML={{
                  __html: this.getSubHeading(gaCategory),
                }}
              />
              <h5 className="font-serif">Plan Digital</h5>
            </div>
            {loadingCampaign ? (
              <div className="campaign__loader placeholder animate-inout">
                <div className="campaign__loader-background-placeholder">
                  <div className="wrap-block">
                    <div className="animated-background line mid-line" />
                    <div className="animated-background mini-line last-line" />
                    <div className="animated-background line" />
                  </div>
                  <div className="animated-background mini-line" />
                  <div className="background-space" />
                  <div className="wrap-block">
                    <div className="animated-background mini-line" />
                    <div className="animated-background mini-line" />
                    <div className="animated-background mini-line mid-line" />
                  </div>
                  <div className="animated-background flat-line" />
                </div>
              </div>
            ) : (
              <div className="register-content">
                <div className="paywall-content">
                  {initial.amount !== 0 ? (
                    <div className="paywall__price">
                      <p className="paywall__price-number">
                        <sup>S/</sup>
                        {initial.amount}
                      </p>
                      <div className="paywall__price-conditions">
                        <p>
                          <strong>
                            Al mes
                            <br /> durante {initial.durationCount}{' '}
                            {initial.durationCount === 1 ? 'mes' : 'meses'}
                          </strong>
                        </p>
                        <p>
                          Luego s/
                          {`${normal.amount} al mes`}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="paywall__price">
                      <p className="paywall__price-text font-serif">Gratis</p>
                      <div className="paywall__price-conditions">
                        <p>
                          <strong>
                            durante {initial.durationCount}{' '}
                            {initial.durationCount === 1 ? 'mes' : 'meses'}
                          </strong>
                        </p>
                        <p>Luego s/{normal.amount} al mes</p>
                      </div>
                    </div>
                  )}
                  <div className="hr-title">
                    <span>BENEFICIOS</span>
                  </div>
                  <ul className="benefit-list">
                    {BENEFITS.map((benefit, key) => (
                      <li key={key}>
                        <Icon type="outline-check_circle" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  type="button"
                  className="btn-paywall"
                  onClick={this.openPaywall}
                >
                  Ver planes
                </button>
                <div className="paywall__verify">
                  ¿Ya tienes una suscripción?{' '}
                  <button
                    type="button"
                    disabled={validating}
                    onClick={this.handleRestore}
                  >
                    {validating ? 'Validando...' : 'Restaurar'}
                  </button>
                </div>
              </div>
            )}
            {gaCategory === 'organic' ? (
              <button
                className="btn-close"
                type="button"
                onClick={() => {
                  myRef.remove()
                }}
              >
                Cerrar
              </button>
            ) : (
              <button
                className="btn-close"
                type="button"
                onClick={this.goToHome}
              >
                {STORY_ENABLED ? 'Volver' : 'Volver a la portada'}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default ModalPaywall
