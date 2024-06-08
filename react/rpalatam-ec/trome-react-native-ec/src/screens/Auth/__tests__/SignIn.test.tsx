import { useNavigation, useRoute } from '@react-navigation/native'
import { act, fireEvent, render } from '@testing-utils/library'
import React from 'react'

import { useAuth } from '../../../context/auth'
import SignIn from '../SignIn'

jest.mock('@react-navigation/native')
const mockUseNavigation = useNavigation as jest.Mock
const mockUseRoute = useRoute as jest.Mock
mockUseRoute.mockReturnValue({ params: {} })

jest.mock('../../../context/auth')
const mockUseAuth = useAuth as jest.Mock
const signin = jest.fn()
mockUseAuth.mockReturnValue({ signin })

describe('SignIn', () => {
  it('should navigate to forgot password screen', async () => {
    const navigate = jest.fn()
    mockUseNavigation.mockReturnValueOnce({ navigate })
    const { getByTestId } = render(<SignIn />)

    fireEvent.press(getByTestId('forgot_password-button'))
    expect(navigate).toBeCalledWith('Auth', { screen: 'ForgotPassword' })
  })

  it('should show form errors', async () => {
    const { getByText, queryAllByText } = render(<SignIn />)

    fireEvent.press(getByText(/iniciar\ssesión/i))
    await act(async () => undefined)
    expect(queryAllByText(/campo\srequerido/i).length).toBe(1)
    expect(queryAllByText(/email\sinválido/i).length).toBe(1)
  })
})
