import { useNavigation, useRoute } from '@react-navigation/native'
import { act, fireEvent, render } from '@testing-utils/library'
import React from 'react'

import { useAuth } from '../../../context/auth'
import { useNotification } from '../../../context/notification'
import auth from '../../../services/auth'
import SignUpOptIn from '../SignUpOptIn'

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

describe('SignUpOptIn', () => {
  it('should not sign up when the term was not accepted', async () => {
    const signUpOptIn = jest.spyOn(auth, 'signUpOptIn')
    const { getByTestId, getByText } = render(<SignUpOptIn />)

    fireEvent.press(getByTestId('terms-checkbox'))
    fireEvent.press(getByText('Registrarme'))
    await act(async () => undefined)
    expect(signUpOptIn).not.toBeCalled()
  })

  it('should show error notification when sign up opt-in fails', async () => {
    const show = jest.fn()
    mockUseNotification.mockReturnValueOnce({ show })
    auth.signUpOptIn = jest.fn().mockRejectedValueOnce(new Error('300040'))
    const { getByText } = render(<SignUpOptIn />)

    fireEvent.press(getByText('Registrarme'))
    await act(async () => undefined)
    expect(show).toBeCalled()
  })

  describe('handle sign up opt-in', () => {
    const params = {
      method: 'google',
      need_email: false,
      additional_parameters: { input_state: 'state' },
    }

    it('should sign up with a provider', async () => {
      mockUseRoute.mockReturnValueOnce({ params })
      const token = { access_token: 'g_at', refresh_token: 'g_rt' }
      const signUpOptIn = jest
        .spyOn(auth, 'signUpOptIn')
        .mockResolvedValueOnce(token)
      const setToken = jest.spyOn(auth, 'setToken').mockResolvedValueOnce()
      const { getByText } = render(<SignUpOptIn />)

      fireEvent.press(getByText('Registrarme'))
      await act(async () => undefined)
      expect(signUpOptIn).toBeCalledWith({
        mobile_phone: '',
        data_treatment: true,
        terms_and_privacy_policy: true,
        input_state: 'state',
      })
      expect(setToken).toBeCalledWith(token)
      expect(signin).toBeCalledWith(params.method)
    })

    it('should navigate to account linking screen', async () => {
      const navigate = jest.fn()
      mockUseNavigation.mockReturnValueOnce({ navigate })
      mockUseRoute.mockReturnValueOnce({
        params: { ...params, need_email: true },
      })
      const response = {
        email: 'ec@ec.pe',
        provider: params.method,
        additional_parameters: {
          linking_state: 'abc123',
        },
      }
      jest
        .spyOn(auth, 'signUpOptIn')
        .mockResolvedValueOnce({ ...response, state: 'linking' })
      const { getByA11yLabel, getByText } = render(<SignUpOptIn />)

      fireEvent.changeText(getByA11yLabel('email'), 'ec@ec.pe')
      fireEvent.press(getByText('Registrarme'))
      await act(async () => undefined)
      expect(navigate).toBeCalledWith('Auth', {
        screen: 'AccountLinking',
        params: {
          email: response.email,
          method: response.provider,
          additional_parameters: response.additional_parameters,
        },
      })
    })
  })
})
