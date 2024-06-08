import { renderHook } from '@testing-library/react-hooks'
import { act } from '@testing-utils/library'

import { useAuth } from '../../context/auth'
import { useNotification } from '../../context/notification'
import auth from '../../services/auth'
import { App } from '../../utils/config'
import { useAuthLinkAccount } from '../useAuthLinkAccount'

jest.mock('../../context/auth')
const mockUseAuth = useAuth as jest.Mock
const signin = jest.fn()
mockUseAuth.mockReturnValue({ signin })

jest.mock('../../context/notification')
const mockUseNotification = useNotification as jest.Mock

describe('useAuthLinkAccount', () => {
  const token = { access_token: 'at', refresh_token: 'rt' }
  const screenData = {
    email: 'ec@ec.pe',
    method: 'facebook',
    additional_parameters: {
      email_verified: false,
      linking_state: 'state',
    },
  }
  const userData = {
    email: 'ec@ec.pe',
    password: 'abcd1234',
  }
  it('should linking accounts', async () => {
    const accountLinking = jest
      .spyOn(auth, 'accountLinking')
      .mockResolvedValueOnce(token)

    jest.spyOn(auth, 'setToken').mockResolvedValueOnce()
    const { result } = renderHook(() => useAuthLinkAccount(screenData))

    await act(() => result.current.linkingAccount(userData, { reset: jest.fn }))
    expect(accountLinking).toBeCalledWith('ec@ec.pe', 'abcd1234', 'state')
    expect(signin).toHaveBeenLastCalledWith('facebook')
  })

  describe('Errors useAuthLinkAccount', () => {
    it('should show a notification when an error occurs', async () => {
      const show = jest.fn()

      App.key = 'gestion'

      mockUseNotification.mockReturnValueOnce({ show })
      jest
        .spyOn(auth, 'accountLinking')
        .mockRejectedValueOnce(new Error('error notify'))

      const { result } = renderHook(() => useAuthLinkAccount(screenData))

      await act(() =>
        result.current.linkingAccount(userData, { reset: jest.fn }),
      )

      expect(show).toBeCalledWith({ message: 'error notify', type: 'error' })
    })

    it('should set error status when captcha fails', async () => {
      const show = jest.fn()
      mockUseNotification.mockReturnValueOnce({ show })
      jest
        .spyOn(auth, 'accountLinking')
        .mockRejectedValueOnce(
          new Error('Para restablecer su contraseña, complete el captcha'),
        )
      const { result } = renderHook(() => useAuthLinkAccount(screenData))

      await act(() =>
        result.current.linkingAccount(userData, { reset: jest.fn }),
      )
      expect(show).toBeCalledWith({
        message: 'En estos momentos no podemos realizar la operación',
        type: 'error',
      })
    })

    it('should set state error when an error occurs', async () => {
      App.key = 'elcomercio'

      jest
        .spyOn(auth, 'accountLinking')
        .mockRejectedValueOnce(new Error('error field'))

      const { result } = renderHook(() => useAuthLinkAccount(screenData))

      await act(() =>
        result.current.linkingAccount(userData, { reset: jest.fn }),
      )

      expect(result.current.errors).toEqual({ common_error: 'error field' })
    })
  })
})
