import { useNavigation } from '@react-navigation/native'
import { fireEvent, render } from '@testing-utils/library'
import React from 'react'

import { useAuth } from '../../../context/auth'
import { ORIGIN, SUBSCRIPTION_LANDING_URL } from '../../../utils/constants'
import { openInBrowser } from '../../../utils/inappbrowser'
import SubscriptionScreen from '../Subscription.elcomercio'

jest.mock('../../../context/auth')
const mockUseAuth = useAuth as jest.Mock

jest.mock('@react-navigation/native')
const mockUseNavigation = useNavigation as jest.Mock
mockUseNavigation.mockReturnValue({ navigate: jest.fn() })

jest.mock('../../../utils/inappbrowser')

describe('Subscription.elcomercio', () => {
  describe('user connected and without subscription', () => {
    beforeAll(() => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        isSubscribed: false,
        user: {
          id: 'id',
          first_name: 'Jose',
          last_name: 'Perez',
          email: 'jose@perez.pe',
        },
      })
    })

    it('should navigate to web subscription plans', async () => {
      const { getByA11yLabel } = render(<SubscriptionScreen />)
      fireEvent.press(getByA11yLabel('suscribete'))
      expect(openInBrowser).toHaveBeenCalledWith(
        `${SUBSCRIPTION_LANDING_URL}/?ref=app`,
      )
    })
  })

  describe('user connected and with active subscription', () => {
    beforeAll(() => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        isSubscribed: true,
        user: {
          id: 'id',
          first_name: 'Jose',
          last_name: 'Perez',
          email: 'jose@perez.pe',
        },
      })
    })

    it('should navigate to my account on the web', async () => {
      const { getByText } = render(<SubscriptionScreen />)

      fireEvent.press(getByText('Gestionar tu suscripción'))
      expect(openInBrowser).toHaveBeenCalledWith(`${ORIGIN}/mi-cuenta/?ref=ecr`)
    })
  })
})
