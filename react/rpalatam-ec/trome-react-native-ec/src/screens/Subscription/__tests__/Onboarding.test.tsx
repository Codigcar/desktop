import { useNavigation } from '@react-navigation/native'
import { fireEvent, render } from '@testing-utils/library'
import React from 'react'
import { useAuth } from '../../../context/auth'
import SubscriptionOnboarding from '../Onboarding.elcomercio'

jest.mock('../../../context/auth')
const mockUseAuth = useAuth as jest.Mock
mockUseAuth.mockReturnValue({ user: {} })

jest.mock('@react-navigation/native')
const mockUseNavigation = useNavigation as jest.Mock
mockUseNavigation.mockReturnValue({ goBack: jest.fn() })

describe('SubscriptionOnboarding', () => {
  it('should goBack when you press icon close', () => {
    const goBack = jest.fn()
    mockUseNavigation.mockReturnValueOnce({ goBack })
    const { getByTestId } = render(<SubscriptionOnboarding />)
    fireEvent.press(getByTestId('icon-close'))
    expect(goBack).toHaveBeenCalled()
  })

  it('should render first_name and last_name', () => {
    const user = { first_name: 'jhon', last_name: 'doe' }
    mockUseAuth.mockReturnValueOnce({ user })
    const { getByText } = render(<SubscriptionOnboarding />)
    expect(getByText('JHON DOE')).toBeDefined()
  })
})
