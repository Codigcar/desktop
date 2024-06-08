/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { fireEvent, render } from '@testing-utils/library'
import React from 'react'
import { Linking, Platform } from 'react-native'

import { act } from 'react-test-renderer'
import SubscriptionScreen from './Subscription'
import { useAuth } from '../../context/auth'
import subscription from '../../services/subscription'
import type { SubscriptionDetail } from '../../services/subscription/subscription.types'

jest.mock('../../context/auth')
const mockUseAuth = useAuth as jest.Mock

const mockNavigateFn = jest.fn()
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    navigate: mockNavigateFn,
  })),
}))

const SUBSCRIPTION: SubscriptionDetail = {
  id: 'id',
  items: [{ currency: 'PEN', interval: 'month', interval_count: 1, price: 10 }],
  name: 'Plan Test',
  next_billing_date: 1646416378, // Date: 4/3/2022
  status: 'active',
}

beforeEach(() => {
  mockUseAuth.mockImplementation(() => ({
    user: { id: 'id' },
    isSubscribed: true,
  }))
})

describe('Subscription screen', () => {
  it('should open landing page when user is not a subscriber', () => {
    Platform.OS = 'android'
    const spy = jest.spyOn(Linking, 'openURL')
    mockUseAuth.mockImplementation(() => ({
      user: { id: 'id' },
      isSubscribed: false,
    }))

    const { getByText } = render(<SubscriptionScreen />)
    fireEvent.press(getByText(/suscribirme/i))
    expect(spy).toBeCalledWith(expect.stringContaining('/suscripciones/'))
  })

  it('should show loading indicator when subscription is loading', async () => {
    const { getByTestId } = render(<SubscriptionScreen />)
    expect(getByTestId('loading')).toBeDefined()
  })

  it('should show the default title of the subscription when the subscriber has no subscriptions in Piano', async () => {
    subscription!.list = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve([]))

    const { getByText } = render(<SubscriptionScreen />)
    await act(async () => undefined)
    expect(getByText(/plan\ssuscriptor/i)).toBeDefined()
  })

  it('should show the plan interval when the user has a subscription', async () => {
    subscription!.list = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve([SUBSCRIPTION]))

    const { getByText } = render(<SubscriptionScreen />)
    await act(async () => undefined)
    expect(getByText(/10\.00/i)).toBeDefined()
    expect(getByText(/plan\stest/i)).toBeDefined()
    expect(getByText(/cada\s1\smes/i)).toBeDefined()
    expect(getByText(/4\/3\/2022/i)).toBeDefined()
  })

  it('should show plan interval per year where applicable', async () => {
    const plan: SubscriptionDetail = {
      ...SUBSCRIPTION,
      items: [{ ...SUBSCRIPTION.items[0], interval: 'year' }],
    }
    subscription!.list = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve([plan]))

    const { getByText } = render(<SubscriptionScreen />)
    await act(async () => undefined)
    expect(getByText(/cada\s1\saño/i)).toBeDefined()
  })

  it('should show plan interval per semester where applicable', async () => {
    const plan: SubscriptionDetail = {
      ...SUBSCRIPTION,
      items: [{ ...SUBSCRIPTION.items[0], interval_count: 6 }],
    }
    subscription!.list = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve([plan]))

    const { getByText } = render(<SubscriptionScreen />)
    await act(async () => undefined)
    expect(getByText(/cada\s6\smeses/i)).toBeDefined()
  })

  it('should not show the renewal day when the subscription is not active', async () => {
    const plan: SubscriptionDetail = { ...SUBSCRIPTION, status: 'inactive' }
    subscription!.list = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve([plan]))

    const { queryByText } = render(<SubscriptionScreen />)
    await act(async () => undefined)
    expect(queryByText(/4\/3\/2022/i)).toBeNull()
  })

  it('should open the account page on the web if the user tries to manage their subscription', async () => {
    const spy = jest.spyOn(Linking, 'openURL')
    subscription!.list = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve([SUBSCRIPTION]))

    const { getByText } = render(<SubscriptionScreen />)
    await act(async () => undefined)
    fireEvent.press(getByText(/gestionar/i))
    expect(spy).toBeCalledWith(expect.stringContaining('/mi-cuenta/'))
  })
})
