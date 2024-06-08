import { useRoute } from '@react-navigation/native'
import { act, fireEvent, render } from '@testing-utils/library'
import React from 'react'

import { useAuth } from '../../../context/auth'
import { useNotification } from '../../../context/notification'
import auth from '../../../services/auth'
import AccountLinking from '../AccountLinking'

jest.mock('@react-navigation/native')
const mockUseRoute = useRoute as jest.Mock
mockUseRoute.mockReturnValue({
  params: {
    method: 'facebook',
    additional_parameters: {
      email_verified: true,
      linking_state: 'state',
    },
  },
})

jest.mock('../../../context/auth')
const mockUseAuth = useAuth as jest.Mock
const signin = jest.fn()
mockUseAuth.mockReturnValue({ signin })

jest.mock('../../../context/notification')
const mockUseNotification = useNotification as jest.Mock

describe('AccountLinking', () => {
  it('should linking accounts', async () => {
    const token = { access_token: 'at', refresh_token: 'rt' }
    const accountLinking = jest
      .spyOn(auth, 'accountLinking')
      .mockResolvedValueOnce(token)
    const setToken = jest.spyOn(auth, 'setToken').mockResolvedValueOnce()
    const { getByA11yLabel, getByText } = render(<AccountLinking />)

    fireEvent.changeText(getByA11yLabel('email'), 'ec@ec.pe')
    fireEvent.changeText(getByA11yLabel('contraseña'), 'abcd1234')
    fireEvent.press(getByText(/confirmar/i))
    await act(async () => undefined)
    expect(accountLinking).toBeCalledWith('ec@ec.pe', 'abcd1234', 'state')
    expect(setToken).toBeCalledWith(token)
    expect(signin).toHaveBeenLastCalledWith('facebook')
  })

  it('should show form errors when inputs are empty', async () => {
    const { getByText, queryAllByText } = render(<AccountLinking />)
    fireEvent.press(getByText(/confirmar/i))
    await act(async () => undefined)
    expect(queryAllByText(/campo\srequerido/i).length).toBe(1)
    expect(queryAllByText(/email\sinválido/i).length).toBe(1)
  })

  it('should set error status when captcha fails', async () => {
    jest
      .spyOn(auth, 'accountLinking')
      .mockRejectedValue(
        new Error('Para restablecer su contraseña, complete el captcha'),
      )
    const showFn = jest.fn()
    mockUseNotification.mockReturnValueOnce({ show: showFn })

    const { getByA11yLabel, getByText } = render(<AccountLinking />)

    fireEvent.changeText(getByA11yLabel('email'), 'ec@ec.pe')
    fireEvent.changeText(getByA11yLabel('contraseña'), 'abcd1234')
    fireEvent.press(getByText(/confirmar/i))
    await act(async () => undefined)

    expect(showFn).toBeCalledWith({
      message: 'En estos momentos no podemos realizar la operación',
      type: 'error',
    })
  })
})
