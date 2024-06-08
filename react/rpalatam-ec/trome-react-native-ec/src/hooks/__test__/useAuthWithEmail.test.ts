import { useNavigation } from '@react-navigation/native'
import { act, renderHook } from '@testing-library/react-hooks'

import { useAuth } from '../../context/auth'
import { useNotification } from '../../context/notification'
import auth from '../../services/auth'
import { App } from '../../utils/config'
import * as flags from '../../utils/flags'
import { useAuthWithEmail } from '../useAuthWithEmail'

jest.mock('@react-navigation/native')
const mockUseNavigation = useNavigation as jest.Mock

jest.mock('../../context/auth')
const mockUseAuth = useAuth as jest.Mock
mockUseAuth.mockReturnValue({ signin: jest.fn() })

jest.mock('../../context/notification')
const mockUseNotification = useNotification as jest.Mock

describe('useAuthWithEmail', () => {
  const user = { email: 'ec@ec.pe', password: '12345678' }

  it('should login successfully', async () => {
    const signin = jest.fn()
    mockUseAuth.mockReturnValue({ signin })
    const { result } = renderHook(() => useAuthWithEmail())
    jest.spyOn(auth, 'login').mockResolvedValueOnce()
    jest.spyOn(auth, 'checkEmail').mockResolvedValueOnce(true)
    const reset = jest.fn()
    await act(() => result.current.signInEmail(user, { reset }))
    expect(signin).toBeCalledWith('email')
    expect(reset).toBeCalled()
  })

  describe('email unverified', () => {
    beforeAll(() => {
      jest.spyOn(auth, 'login').mockResolvedValue()
      jest.spyOn(auth, 'checkEmail').mockResolvedValue(false)
      jest.spyOn(auth, 'logout').mockResolvedValue()
      jest.spyOn(auth, 'requestVerifyEmail').mockResolvedValue()
      mockUseNavigation.mockReturnValue({ navigate: jest.fn() })
      Object.defineProperty(flags, 'ENABLE_VERIFY_ACCOUNT', { value: true })
    })

    it('should logout called', async () => {
      const logout = jest.spyOn(auth, 'logout').mockResolvedValueOnce()
      const { result } = renderHook(() => useAuthWithEmail())
      await act(() => result.current.signInEmail(user, { reset: jest.fn() }))
      expect(logout).toBeCalled()
    })

    it('should request verify email called', async () => {
      const requestVerifyEmail = jest
        .spyOn(auth, 'requestVerifyEmail')
        .mockResolvedValueOnce()
      const { result } = renderHook(() => useAuthWithEmail())
      await act(() => result.current.signInEmail(user, { reset: jest.fn() }))
      expect(requestVerifyEmail).toBeCalled()
    })

    it('should navigate to verify account screen', async () => {
      const navigate = jest.fn()
      mockUseNavigation.mockReturnValueOnce({ navigate })
      const { result } = renderHook(() => useAuthWithEmail())
      await act(() => result.current.signInEmail(user, { reset: jest.fn() }))
      expect(navigate).toBeCalledWith('Auth', {
        screen: 'VerifyAccount',
        params: {
          emailToResend: user.email,
        },
      })
    })
  })

  describe('errors', () => {
    it('should show a notification when an error occurs', async () => {
      jest.spyOn(auth, 'login').mockRejectedValue(new Error('error notify'))
      const show = jest.fn()
      mockUseNotification.mockReturnValue({ show })
      const { result } = renderHook(() => useAuthWithEmail())

      App.key = 'gestion'
      await act(async () =>
        result.current.signInEmail(user, { reset: jest.fn }),
      )
      expect(show).toBeCalledWith({ message: 'error notify', type: 'error' })
    })

    it('should set error state when an error occurs', async () => {
      jest.spyOn(auth, 'login').mockRejectedValueOnce(new Error('error field'))
      const { result } = renderHook(() => useAuthWithEmail())

      App.key = 'elcomercio'
      await act(async () =>
        result.current.signInEmail(user, { reset: jest.fn }),
      )
      expect(result.current.errors).toEqual({ common_error: 'error field' })
    })
  })
})

describe('useAuthWithEmail SignUp', () => {
  const userMock = {
    first_name: 'firstName',
    last_name: 'lastName',
    email: 'email@email.com',
    password: '12345678',
    terminos: true,
    data_treatment: true,
  }

  beforeAll(() => {
    mockUseNavigation.mockReturnValue({ navigate: jest.fn() })
  })

  it('should navigate to the login screen when registration is successful', async () => {
    Object.defineProperty(flags, 'ENABLE_VERIFY_ACCOUNT', { value: false })
    const signin = jest.fn()
    mockUseAuth.mockReturnValue({ signin })
    const { result } = renderHook(() => useAuthWithEmail())
    jest.spyOn(auth, 'signUp').mockResolvedValueOnce({
      access_token: '123',
      refresh_token: '123',
    })
    jest.spyOn(auth, 'login').mockResolvedValueOnce()
    const reset = jest.fn()
    await act(() => result.current.signUp(userMock, { reset }))
    expect(signin).toBeCalledWith('email')
    expect(reset).toBeCalled()
  })

  it('should registered successfully then send to verify email', async () => {
    Object.defineProperty(flags, 'ENABLE_VERIFY_ACCOUNT', { value: true })
    const navigate = jest.fn()
    mockUseNavigation.mockReturnValueOnce({ navigate })

    const { result } = renderHook(() => useAuthWithEmail())
    jest.spyOn(auth, 'signUp').mockResolvedValueOnce({
      access_token: '123',
      refresh_token: '123',
    })
    const reset = jest.fn()
    await act(() => result.current.signUp(userMock, { reset }))
    expect(navigate).toBeCalledWith('Auth', {
      screen: 'VerifyAccount',
      params: {
        emailToResend: userMock.email,
      },
    })
    expect(reset).toBeCalled()
  })

  describe('errors', () => {
    it('should show a notification when an error occurs', async () => {
      App.key = 'gestion'
      jest.spyOn(auth, 'signUp').mockRejectedValue(new Error('error notify'))
      const show = jest.fn()
      mockUseNotification.mockReturnValue({ show })
      const { result } = renderHook(() => useAuthWithEmail())

      await act(async () => result.current.signUp(userMock, { reset: jest.fn }))
      expect(show).toBeCalledWith({ message: 'error notify', type: 'error' })
    })

    it('should set error state when an error occurs', async () => {
      App.key = 'elcomercio'
      jest.spyOn(auth, 'signUp').mockRejectedValueOnce(new Error('error field'))
      const { result } = renderHook(() => useAuthWithEmail())

      await act(async () => result.current.signUp(userMock, { reset: jest.fn }))
      expect(result.current.errors).toEqual({ common_error: 'error field' })
    })
  })
})
