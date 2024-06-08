import MockAxios from 'jest-mock-axios'

import Piano from './Piano'

const subscription = new Piano()

afterEach(MockAxios.reset)

describe('Piano service', () => {
  it('should return false when there is no access of type bundle', async () => {
    expect(await subscription.checkAccess({})).toBeFalsy()
    const promise = subscription.checkAccess({ id: 'id' })
    MockAxios.mockResponse({
      data: { accesses: [{ term: { resource: { type: 'standard' } } }] },
    })
    expect(await promise).toBeFalsy()
  })

  it('should return true when accessed of type bundle', async () => {
    const promise = subscription.checkAccess({ id: 'id' })
    MockAxios.mockResponse({
      data: { accesses: [{ term: { resource: { type: 'bundle' } } }] },
    })
    expect(await promise).toBeTruthy()
  })

  it('should return list of subscriptions when service is called', async () => {
    const plan = {
      next_bill_date: 123,
      status: 'active',
      subscription_id: 'id',
      term: {
        name: 'Plan Test',
        payment_billing_plan_table: [
          {
            billingPeriod: '2 every month',
            period: 'month',
            priceValue: 5,
            currency: 'PEN',
          },
        ],
      },
    }

    const promise = subscription.list('id')
    MockAxios.mockResponse({ data: { subscriptions: [plan] } })
    expect(await promise).toEqual([
      {
        id: plan.subscription_id,
        items: [
          { currency: 'PEN', interval: 'month', interval_count: 2, price: 5 },
        ],
        name: plan.term.name,
        next_billing_date: plan.next_bill_date,
        status: plan.status,
      },
    ])
  })

  describe('plan method', () => {
    it('get plan without offfer', async () => {
      const term = {
        payment_billing_plan_table: [
          {
            billingPeriod: '1',
            period: 'month',
            priceValue: 20,
          },
        ],
      }
      const promise = subscription.plan('id')
      const offer = { offer_id: 'id', name: 'name', terms: [term] }
      MockAxios.mockResponse({ data: { offer } })
      const billing = offer.terms[0].payment_billing_plan_table[0]
      expect(await promise).toEqual({
        id: offer.offer_id,
        interval: billing.period,
        interval_count: Number(billing.billingPeriod),
        name: offer.name,
        price: billing.priceValue,
        offer: null,
      })
    })

    it('get plan with offfer', async () => {
      const promise = subscription.plan('id')
      const terms = {
        payment_billing_plan_table: [
          {
            billingPeriod: '1',
            period: 'month',
            priceValue: 5,
          },
          {
            billingPeriod: '1',
            period: 'month',
            priceValue: 20,
          },
        ],
      }
      const offer = { offer_id: 'id', name: 'name', terms: [terms] }
      MockAxios.mockResponse({ data: { offer } })
      const off = terms.payment_billing_plan_table[0]
      const billing = terms.payment_billing_plan_table[1]
      expect(await promise).toEqual({
        id: offer.offer_id,
        interval: billing.period,
        interval_count: Number(billing.billingPeriod),
        name: offer.name,
        price: billing.priceValue,
        offer: {
          interval: off.period,
          interval_count: 1,
          price: off.priceValue,
        },
      })
    })
  })

  describe('start date', () => {
    it('should return null when id is empty', async () => {
      expect(await subscription.startDate()).toBeNull()
    })

    it('should return null when there is no access', async () => {
      const promise = subscription.startDate('id')
      MockAxios.mockResponse({ data: { accesses: [] } })
      expect(await promise).toBeNull()
    })

    it('should return the start date when there is access', async () => {
      const promise = subscription.startDate('id')
      MockAxios.mockResponse({ data: { accesses: [{ start_date: 123 }] } })
      expect(await promise).toBe(123)
    })
  })
})
