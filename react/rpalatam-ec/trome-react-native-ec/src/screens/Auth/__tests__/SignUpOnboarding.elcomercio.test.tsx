import { useNavigation } from '@react-navigation/native'
import { fireEvent } from '@testing-library/react-native'
import { render } from '@testing-utils/library'
import React from 'react'

import { useAuth } from '../../../context/auth'
import { SIGNUP_ONBOARDING_SHOWN } from '../../../utils/constants'
import { storage } from '../../../utils/storage'
import SignUpOnboarding from '../SignUpOnboarding.elcomercio'

const mockGoBack = jest.fn()

jest.mock('@react-navigation/native')
const mockNavigation = useNavigation as jest.Mock
mockNavigation.mockReturnValue({
  goBack: mockGoBack,
})

jest.mock('../../../context/auth')
const mockUseAuth = useAuth as jest.Mock
mockUseAuth.mockImplementation(() => ({
  isAuthenticated: true,
  user: { id: '1', first_name: 'firstName', last_name: 'lastName' },
}))

describe('SignUpOnboarding.elcomercio', () => {
  afterEach(() => {
    storage.clearAll()
  })

  it('should navigate to previous screen', () => {
    const { getByTestId } = render(<SignUpOnboarding />)
    fireEvent.press(getByTestId('icon-close'))
    expect(mockGoBack).toBeCalled()
  })

  it('should set true when press close icon', () => {
    const { getByTestId } = render(<SignUpOnboarding />)
    expect(storage.getBoolean(SIGNUP_ONBOARDING_SHOWN)).not.toBe(true)
    fireEvent.press(getByTestId('icon-close'))
    expect(storage.getBoolean(SIGNUP_ONBOARDING_SHOWN)).toBe(true)
  })
})
