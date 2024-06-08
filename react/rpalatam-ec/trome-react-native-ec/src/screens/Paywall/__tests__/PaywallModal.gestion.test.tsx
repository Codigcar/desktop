import { useNavigation, useRoute } from '@react-navigation/native'
import { act, fireEvent, render } from '@testing-utils/library'
import React from 'react'

import { useAuth } from '../../../context/auth'
import PaywallModalScreen from '../PaywallModal.gestion'

jest.mock('@react-navigation/native')
const mockUseNavigation = useNavigation as jest.Mock
mockUseNavigation.mockReturnValue({})
const mockUseRoute = useRoute as jest.Mock
mockUseRoute.mockReturnValue({ params: { title: 'Title' } })

jest.mock('../../../context/auth')
const mockUseAuth = useAuth as jest.Mock
mockUseAuth.mockReturnValue({})

const mockRecordError = jest.fn()
jest.mock('@react-native-firebase/crashlytics', () => {
  return () => ({ recordError: mockRecordError })
})

jest.mock('../../../services/subscription', () => ({
  plan: jest.fn().mockResolvedValue({
    id: 'id',
    name: 'Plan Digital',
    interval: 'month',
    interval_count: 1,
    offer: { price: 5, interval: 'month', interval_count: 1 },
    price: 20,
  }),
}))

describe('PaywallModal.gestion', () => {
  it('should navigate to login screen when user is not logged in', async () => {
    mockUseAuth.mockReturnValue({ user: {} })
    const navigate = jest.fn()
    mockUseNavigation.mockReturnValue({ navigate })
    const { getByText } = render(<PaywallModalScreen />)
    await act(async () => undefined)
    fireEvent.press(getByText('Restaurar'))
    expect(navigate).toBeCalledWith('Auth', { screen: 'InitialScreen' })
  })

  it('should verify subscription', async () => {
    const verifySubscription = jest.fn().mockResolvedValue(undefined)
    mockUseAuth.mockReturnValue({ user: { id: 'id' }, verifySubscription })
    const { getByText, queryByText } = render(<PaywallModalScreen />)
    await act(async () => undefined)
    fireEvent.press(getByText('Restaurar'))
    expect(getByText('Validando...')).toBeDefined()
    expect(verifySubscription).toBeCalled()
    await act(async () => undefined)
    expect(queryByText('Validando...')).toBeNull()
  })

  it('should navigate to back when modal is closed', async () => {
    const goBack = jest.fn()
    mockUseNavigation.mockReturnValue({ goBack })
    const { getByText } = render(<PaywallModalScreen />)
    await act(async () => undefined)
    fireEvent.press(getByText('Volver'))
    expect(goBack).toBeCalled()
  })
})
