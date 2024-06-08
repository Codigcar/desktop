import React, { useContext, useEffect, useMemo } from 'react'
import Loadable from 'react-loadable'
import { Route, RouteComponentProps, Switch, Link } from 'react-router-dom'

import ERibbon from '../../components/eRibbon/index'
import { AppContext } from '../../context/app'
import Icon from '../../system/icon'
import Modal from '../../system/modal'
import { dateFormat, getBrand } from '../../tools/tools'
import useSuscriptions from '../../tools/useSubscriptions'
import ModalCancelation from '../../components/eModal/modalCancelation'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Notification from '../../system/notification'
import ECreditCard from '../../components/eCreditCard'

const ModalPaywall = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "ModalPaywall" */ '../../components/eModal/paywall'
    ),
  loading: () => null,
})

const UpdatePayment = Loadable({
  loader: () => import('./UpdatePayment/UpdatePayment'),
  loading: () => null,
})

function getAmount(price: number, currency: string) {
  const currencySymbol = {
    PEN: 'S/',
    USD: '$',
  }
  return (
    <span>
      <sub>{currencySymbol[currency] || 'S/'}</sub>
      {price.toFixed(2)}
    </span>
  )
}

const Subscription: React.FC<RouteComponentProps> = ({
  history,
  match,
  location,
}) => {
  const { isExact, path } = match
  const context = useContext(AppContext)
  const { togglePaywallStatus } = context

  const {
    subscriptions,
    status,
    currentSubscription,
    changeSubscription,
    cancelSubscription,
    verifySuscription,
    updateSubscriptionPayment,
  } = useSuscriptions()

  function showModalPaywall() {
    Modal.open({
      content: elm => (
        <ModalPaywall
          callback={verifySuscription}
          myRef={elm}
          context={context}
          gaCategory="organic"
        />
      ),
      myClass: 'is-modal-bottom is-modal-swh',
      animation: 'bottomFade',
    })
  }

  const brand = useMemo(() => getBrand(), [])
  const isCanceled = currentSubscription.details?.status === 3
  const hasCreditCard = !!currentSubscription.details?.currentPaymentMethod
    ?.creditCardType

  useEffect(() => {
    if (subscriptions && subscriptions.length > 0) {
      togglePaywallStatus(true)
    }
  }, [subscriptions, togglePaywallStatus])

  return (
    <div className="internal-page">
      <ERibbon
        content={{ seccion: { nombre: 'Mi Suscripción' } }}
        hideHamburger
        hideIconHome
        history={history}
      />
      <div className="safe-area-with-ribbon pt-48 h-screen">
        {status === 'idle' || status === 'pending' ? (
          <div className="loading__wrapper">
            <Icon type="loading" />
          </div>
        ) : null}
        {(status === 'rejected' ? true : null) && (
          <div className="subscription__empty">
            <p>No pudimos acceder a tu suscripción</p>
          </div>
        )}
        {(status === 'resolved' ? true : null) && (
          <React.Fragment>
            {subscriptions && subscriptions.length > 0 ? (
              <div className="subscription__wrapper">
                <div className="subscription__content">
                  <div className="subscription__select">
                    <div>
                      <Icon type="ios-arrow-down" />
                      <select
                        value={currentSubscription.id}
                        onChange={changeSubscription}
                      >
                        {subscriptions.map(subscription => (
                          <option
                            key={subscription.subscriptionID}
                            value={subscription.subscriptionID}
                          >
                            {subscription.productName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="subscription__card-wrapper">
                    {(hasCreditCard ? true : null) && (
                      <>
                        <ECreditCard
                          lastFour={
                            currentSubscription.details.currentPaymentMethod
                              .lastFour
                          }
                          initialCardType={
                            currentSubscription.details.currentPaymentMethod
                              .creditCardType
                          }
                        />
                        {!isCanceled && (
                          <Link to="/profile/mi-suscripcion/update-payment">
                            <button
                              type="button"
                              className="subscription__btn-edit"
                              disabled={isCanceled}
                            >
                              Editar información
                            </button>
                          </Link>
                        )}
                      </>
                    )}
                  </div>
                  <div className="subscription__detail">
                    <h3>Historial de pagos</h3>
                    {currentSubscription.details ? (
                      <ul className="subscription__history">
                        {currentSubscription.details.paymentHistory?.map(
                          payment => (
                            <li key={payment.transactionDate}>
                              <p>
                                {dateFormat(payment.periodFrom, 'small_v2')} -{' '}
                                {dateFormat(payment.periodTo, 'small_v2')}
                              </p>
                              <p className="subscription__price">
                                {getAmount(payment.total, payment.currency)}
                              </p>
                            </li>
                          ),
                        )}
                      </ul>
                    ) : (
                      <div className="loading__wrapper">
                        <Icon type="loading" />
                      </div>
                    )}
                  </div>
                </div>
                {(hasCreditCard ? true : null) && (
                  <div className="submenu__item input-logout">
                    <button
                      type="button"
                      className="btn-cancelsubscription"
                      onClick={() => {
                        window.dataLayer?.push({
                          event: 'SuscriptionActivity',
                          category: 'PWA_Paywall',
                          action: 'pwa_paywall_btn_anulacion',
                        })
                        Modal.open({
                          content: elm => (
                            <ModalCancelation
                              modalRef={elm}
                              subscriptionDate={
                                currentSubscription.details.nextEventDateUTC
                              }
                              cancelMethod={cancelSubscription}
                              brand={brand}
                              callback={verifySuscription}
                            />
                          ),
                          myClass:
                            'is-modal-bottom is-modal-register is-modal-swh',
                          animation: 'bottomFade',
                          onBackgroundPress: () => {
                            window.dataLayer?.push({
                              event: 'SuscriptionActivity',
                              category: 'PWA_Paywall',
                              action: 'pwa_paywall_btn_close_anulacion',
                            })
                          },
                        })
                      }}
                      disabled={isCanceled}
                    >
                      {isCanceled
                        ? 'Suscripción anulada'
                        : 'Anular suscripción'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="subscription__empty">
                <p>Aún no tiene una suscripción</p>
                <button type="button" onClick={showModalPaywall}>
                  Suscribirme
                </button>
              </div>
            )}
          </React.Fragment>
        )}
      </div>
      <TransitionGroup className="transition-group-portrait">
        <CSSTransition
          key={isExact + ''}
          timeout={{ enter: 300, exit: 300 }}
          classNames="fade"
        >
          <section>
            <Switch location={location}>
              <Route
                path={`${path}/update-payment`}
                render={() => (
                  <UpdatePayment
                    cardType={
                      (currentSubscription.details &&
                        currentSubscription.details.currentPaymentMethod
                          .creditCardType) ||
                      'VISA'
                    }
                    history={history}
                    location={location}
                    match={match}
                    updateMethod={data => {
                      return updateSubscriptionPayment(data, {
                        onSuccess: () => {
                          Notification.success({
                            content: 'Actualización exitosa',
                            duration: 4,
                          })
                        },
                        onError: () => {
                          Notification.error({
                            content: 'Ocurrió un error. Inténtelo mas tarde',
                            duration: 4,
                          })
                        },
                      })
                    }}
                    lastFour={
                      (currentSubscription.details &&
                        currentSubscription.details.currentPaymentMethod
                          .lastFour) ||
                      '****'
                    }
                    callback={verifySuscription}
                  />
                )}
              />
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
}

export default Subscription
