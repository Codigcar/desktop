import Identity from '@arc-publishing/sdk-identity'
import Sales from '@arc-publishing/sdk-sales'

import {
  useState,
  useEffect,
  useCallback,
  SyntheticEvent,
  useReducer,
} from 'react'

import * as types from '../pages/profile/Subscription.types'
import { getDomain, getBrand } from './tools'
import { addScriptAsync } from '../tools/loadScriptAsync'

type CurrentSubscription = {
  id?: number
  details?: any
}

const apiOrigin = `${process.env.REACT_APP_API_ORIGIN}${getDomain()}`

function isError(response: any): response is types.APIErrorResponse {
  return (response as types.APIErrorResponse).code !== undefined
}

function subscriptionsReducer(state: types.State, action: types.Action) {
  switch (action.type) {
    case 'error': {
      return {
        ...state,
        status: 'rejected',
        error: action.error,
      }
    }
    case 'success': {
      return {
        ...state,
        status: 'resolved',
        subscriptions: action.response,
      }
    }
    case 'started': {
      return {
        ...state,
        status: 'pending',
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const useSubscriptions = () => {
  const [state, dispatch] = useReducer(subscriptionsReducer, {
    status: 'idle',
    error: null,
  })

  const [currentSubscription, setCurrentSubscription] = useState<
    CurrentSubscription
  >({})

  const getActiveSubscriptions = useCallback(async () => {
    try {
      Sales.options({ apiOrigin })
      const subscriptions = await Sales.getAllActiveSubscriptions()
      if (!isError(subscriptions)) {
        dispatch({ type: 'success', response: subscriptions })
        if (subscriptions.length > 0) {
          const [{ subscriptionID: id }] = subscriptions
          setCurrentSubscription({ id, details: undefined })
        }
      }
    } catch (err) {
      dispatch({ type: 'error', error: 'No pudimos acceder a tu suscripción' })
    }
  }, [])

  const getSubscriptionDetails = useCallback(async (idSubscription: number) => {
    try {
      const detailsResponse = await Sales.getSubscriptionDetails(idSubscription)
      setCurrentSubscription({ id: idSubscription, details: detailsResponse })
    } catch (err) {
      console.log({
        error: err,
        message: 'Error at getSubscriptionDetails method',
      })
    }
  }, [])

  useEffect(() => {
    getActiveSubscriptions()
  }, [getActiveSubscriptions])

  useEffect(() => {
    if (currentSubscription.id && !currentSubscription.details) {
      getSubscriptionDetails(currentSubscription.id)
    }
  }, [
    currentSubscription.id,
    currentSubscription.details,
    getSubscriptionDetails,
  ])

  const changeSubscription = (evt: SyntheticEvent) => {
    const target = evt.target as HTMLSelectElement
    setCurrentSubscription({ id: +target.value, details: undefined })
  }

  const cancelSubscription = async (reason = '') => {
    await Sales.cancelSubscription(Number(currentSubscription.id), reason)
  }

  function verifySuscription() {
    dispatch({ type: 'started' })
    getActiveSubscriptions()
  }

  const updateSubscriptionPayment = useCallback(
    async (cardInfo, callbacks) => {
      const brand = getBrand()
      try {
        const options = await Sales.getPaymentOptions()
        if (!isError(options)) {
          const [{ paymentMethodID }] = options
          const init = await Sales.initializePaymentUpdate(
            currentSubscription.details!.currentPaymentMethod.paymentMethodID,
            paymentMethodID,
          )
          if (!isError(init)) {
            const {
              parameter1: publicKey,
              parameter2: accountID,
              parameter3: payUBaseUrl,
              parameter4: deviceSessionId,
            } = init
            const res = await fetch(
              `${process.env.REACT_APP_PAYWALL_PAYU_URL}/user/payment-profile/${
                currentSubscription.details!.subscriptionID
              }`,
              {
                headers: {
                  site: brand,
                  'user-token': `${Identity.userIdentity.accessToken}`,
                },
              },
            )
            const payUProfile = await res.json()
            const nameCard =
              payUProfile.name || payUProfile.lastname
                ? `${payUProfile.name} ${payUProfile.lastname}`
                : 'APPROVED'
            if (!window.payU) {
              await Promise.all([
                addScriptAsync({
                  url:
                    'https://d2g037f9e082nm.cloudfront.net/creativos/payu-sdk/payu-sdk.js',
                  name: 'payU',
                }),
              ])
            }
            const payU = window.payU
            payU.setURL(payUBaseUrl)
            payU.setPublicKey(publicKey)
            payU.setAccountID(accountID)
            payU.setCardDetails({
              name_card: nameCard,
              payer_id: new Date().getTime(),
              document: payUProfile.doc_number,
              ...cardInfo,
            })
            const response: {
              token: string
            } = await new Promise((resolve, reject) => {
              payU.createToken(res => {
                if (res.error) {
                  reject(new Error(res.error))
                } else {
                  resolve(res)
                }
              })
            })
            await Sales.finalizePaymentUpdate(
              currentSubscription.details!.currentPaymentMethod.paymentMethodID,
              paymentMethodID,
              `${response.token}~${deviceSessionId}~${cardInfo.cvv}`,
              {
                address: {
                  line1: `${payUProfile.doc_type}_${payUProfile.doc_number}`,
                  locality: 'Lima',
                  country: 'PE',
                },
                email: payUProfile.email,
                phone: payUProfile.phone,
              },
            )
            callbacks?.onSuccess()
          }
        }
      } catch (error) {
        callbacks?.onError()
        throw new Error(error)
      }
    },
    [currentSubscription.details],
  )

  return {
    status: state.status,
    subscriptions: state.subscriptions,
    currentSubscription,
    changeSubscription,
    cancelSubscription,
    verifySuscription,
    updateSubscriptionPayment,
  }
}

export default useSubscriptions
