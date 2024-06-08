import axios from 'axios'
import NativeConfig from 'react-native-config'

import { App } from '../../utils/config'
import type {
  Subscription,
  SubscriptionDetail,
  SubscriptionPlan,
} from './subscription.types'

const IS_PRODUCTION = NativeConfig.APP_ENVIRONMENT === 'production'
const defaultParams = App.select({
  elcomercio: {
    aid: IS_PRODUCTION ? 'Enoqbpnkpu' : 'PeVZORGJsu',
    api_token: NativeConfig.PIANO_API_TOKEN_ELCOMERCIO,
  },
  gestion: {
    aid: IS_PRODUCTION ? 'UmAkgzZ4pu' : 'uqsWkaVNsu',
    api_token: NativeConfig.PIANO_API_TOKEN_GESTION,
  },
})

const instance = axios.create({
  baseURL: NativeConfig.PIANO_BASE_URL,
  params: defaultParams,
})

interface Resource {
  type: string
}

interface Term {
  name: string
  payment_billing_plan_table: {
    billingPeriod: string
    period: string
    priceValue: number
    currency: string
  }[]
  resource: Resource
  term_id: string
}

interface Access {
  access_id: string
  resource: Resource
  term: Term
  start_date: number
}

interface AccessListResponse {
  accesses: Access[]
}

interface SubscriptionItem {
  next_bill_date: number
  status: string
  subscription_id: string
  term: Term
}

interface OfferResponse {
  offer_id: string
  name: string
  terms: {
    payment_billing_plan_table: {
      billingPeriod: string
      period: string
      priceValue: number
    }[]
  }[]
}

class Piano implements Subscription {
  async checkAccess(
    params: Record<string, string | undefined>,
  ): Promise<boolean> {
    if (!params.id) return false
    const response = await instance.get<AccessListResponse>(
      '/api/v3/publisher/user/access/list',
      {
        params: { uid: params.id },
      },
    )

    /**
     * Se realiza este filtro porque tener accesos no implica tener una suscripción,
     * existen accesos de tipo bundle y standard, este último hace referencia a
     * accesso de registro pero no de suscripción.
     */
    const accesses = response.data.accesses.filter((access) => {
      const resource = access.resource || access.term.resource
      return /bundle/i.test(resource.type)
    })
    return accesses.length > 0
  }

  async list(id: string): Promise<SubscriptionDetail[]> {
    const response = await instance.get<{ subscriptions: SubscriptionItem[] }>(
      '/api/v3/publisher/subscription/list',
      {
        params: { uid: id },
      },
    )
    return response.data.subscriptions.map((subs) => ({
      id: subs.subscription_id,
      name: subs.term.name,
      next_billing_date: subs.next_bill_date,
      status: subs.status,
      items: subs.term.payment_billing_plan_table.map((payment) => {
        const intervalCount = payment.billingPeriod.match(/\d+/)
        return {
          currency: payment.currency,
          interval: payment.period,
          interval_count: Number(intervalCount?.[0]),
          price: payment.priceValue,
        }
      }),
    }))
  }

  async plan(id: string): Promise<SubscriptionPlan> {
    const response = await instance.get<{ offer: OfferResponse }>(
      '/api/v3/publisher/offer/get',
      {
        params: { offer_id: id },
      },
    )
    const offer = response.data.offer
    const term = offer.terms.shift()
    if (!term) throw new Error('no term')
    const plan = term.payment_billing_plan_table.pop()
    if (!plan) throw new Error('no plan')
    const intervalCount = plan.billingPeriod.match(/\d+/)
    const off = term.payment_billing_plan_table.shift()
    return {
      id: offer.offer_id,
      interval: plan.period,
      interval_count: Number(intervalCount?.[0]),
      name: offer.name,
      price: plan.priceValue,
      offer: off
        ? { interval: off.period, interval_count: 1, price: off.priceValue }
        : null,
    }
  }

  async startDate(id?: string): Promise<number | null> {
    if (!id) return null
    const response = await instance.get<AccessListResponse>(
      '/api/v3/publisher/user/access/list',
      {
        params: { uid: id },
      },
    )
    return response.data.accesses[0]?.start_date || null
  }
}

export default Piano
