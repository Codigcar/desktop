import { useNavigation, useRoute } from '@react-navigation/native'
import { act, fireEvent, render } from '@testing-utils/library'
import React from 'react'

import { useAuth } from '../../../context/auth'
import { useNotification } from '../../../context/notification'
import auth from '../../../services/auth'
import SignIn from '../SignIn'

jest.mock('@react-navigation/native')
const mockUseNavigation = useNavigation as jest.Mock
const mockUseRoute = useRoute as jest.Mock
mockUseRoute.mockReturnValue({ params: {} })

jest.mock('../../../context/auth')
const mockUseAuth = useAuth as jest.Mock
const signin = jest.fn()
mockUseAuth.mockReturnValue({ signin })

jest.mock('../../../context/notification')
const mockUseNotification = useNotification as jest.Mock

describe('SignIn', () => {
  const user = { email: 'ec@ec.pe', password: '12345678' }

  it('should login successfully', async () => {
    const login = jest.spyOn(auth, 'login').mockResolvedValueOnce()
    jest.spyOn(auth, 'checkEmail').mockResolvedValueOnce(true)
    const { getByA11yLabel, getByText } = render(<SignIn />)

    fireEvent.changeText(getByA11yLabel('email'), user.email)
    fireEvent.changeText(getByA11yLabel('contraseña'), user.password)
    fireEvent.press(getByText(/iniciar\ssesión/i))
    await act(async () => undefined)
    expect(login).toBeCalledWith(user.email, user.password)
    expect(signin).toHaveBeenLastCalledWith('email')
  })

  it('should navigate to verify account screen', async () => {
    jest.spyOn(auth, 'login').mockResolvedValueOnce()
    const logout = jest.spyOn(auth, 'logout').mockResolvedValueOnce()
    const requestVerifyEmail = jest
      .spyOn(auth, 'requestVerifyEmail')
      .mockResolvedValueOnce()
    jest.spyOn(auth, 'checkEmail').mockResolvedValueOnce(false)
    const navigate = jest.fn()
    mockUseNavigation.mockReturnValueOnce({ navigate })
    const { getByA11yLabel, getByText } = render(<SignIn />)

    fireEvent.changeText(getByA11yLabel('email'), user.email)
    fireEvent.changeText(getByA11yLabel('contraseña'), user.password)
    fireEvent.press(getByText(/iniciar\ssesión/i))
    await act(async () => undefined)
    expect(logout).toBeCalled()
    expect(requestVerifyEmail).toBeCalledWith(user.email)
    expect(navigate).toBeCalledWith('Auth', {
      screen: 'VerifyAccount',
      params: {
        emailToResend: user.email,
      },
    })
  })

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

  it('should notification error', async () => {
    const show = jest.fn()
    mockUseNotification.mockReturnValueOnce({ show })
    const message = 'error message'
    jest.spyOn(auth, 'login').mockRejectedValueOnce(new Error(message))
    const { getByA11yLabel, getByText } = render(<SignIn />)

    fireEvent.changeText(getByA11yLabel('email'), user.email)
    fireEvent.changeText(getByA11yLabel('contraseña'), user.password)
    fireEvent.press(getByText(/iniciar\ssesión/i))
    await act(async () => undefined)
    act(() => undefined)
    expect(show).toBeCalledWith({ message, type: 'error' })
  })
})
