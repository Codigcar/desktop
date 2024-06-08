import { act, cleanup, renderHook } from '@testing-library/react-hooks'
import React from 'react'
import { Linking } from 'react-native'

import auth from '../../services/auth'
import subscription from '../../services/subscription'
import { tokenExchange } from '../../utils/auth'
import { sendPostMessageToWebview } from '../../utils/refs'
import { AuthProvider, useAuth } from '../auth'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
)

const mockLogEvent = jest.fn()
const mockSetUserId = jest.fn()
const mockSetUserProperty = jest.fn()
jest.mock('@react-native-firebase/analytics', () =>
  jest.fn(() => ({
    logEvent: mockLogEvent,
    logScreenView: jest.fn(),
    setUserId: mockSetUserId,
    setUserProperty: mockSetUserProperty,
  })),
)

jest.mock('../../utils/auth')
const mockTokenExchange = tokenExchange as jest.Mock

jest.mock('../../utils/refs')
const mockPostMessage = sendPostMessageToWebview as jest.Mock

beforeEach(() => {
  auth.getUserProfile = jest
    .fn()
    .mockImplementation(() => Promise.resolve({ email: 'test', id: '1' }))
  auth.logout = jest.fn().mockResolvedValue(true)
  auth.setToken = jest.fn().mockResolvedValue(true)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  subscription!.checkAccess = jest
    .fn()
    .mockImplementation(() => Promise.resolve(false))
})

afterEach(cleanup)

describe('auth context', () => {
  it('should login when signin function is called', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    await act(async () => undefined)
    await act(async () => result.current.signin('email'))
    expect(result.current.isAuthenticated).toBeTruthy()
  })

  it('should logout whent signout function is called', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    await act(async () => undefined)
    await act(async () => result.current.signout())
    expect(result.current.isAuthenticated).toBeFalsy()
    expect(mockLogEvent).toHaveBeenLastCalledWith('logout')
    expect(mockPostMessage).toHaveBeenLastCalledWith('Home', {
      type: 'auth.LOGOUT',
    })
  })

  it('onAuthenticationChange should be called when login/logout event happens', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    await act(async () => undefined)
    const fnListener = jest.fn()
    const unsubscribe = result.current.onAuthenticationChange(fnListener)

    await act(async () => {
      result.current.signin('email')
      result.current.signout()
    })
    expect(fnListener).toHaveBeenCalledTimes(2)

    unsubscribe()
    await act(async () => result.current.signin('email'))
    expect(fnListener.mock.calls.length).not.toBeGreaterThan(2)
  })

  it('should set user profile on hook and user id on analytics when login', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    await act(async () => undefined)

    auth.getUserProfile = jest
      .fn()
      .mockResolvedValueOnce({ email: '', id: 'id' })

    await auth.setToken({ access_token: 'token', refresh_token: 'token' })
    await act(async () => result.current.signin(''))
    expect(result.current.user.id).toBe('id')
    expect(mockSetUserId).toHaveBeenLastCalledWith('id')

    await act(async () => result.current.signout())
    expect(mockSetUserId).toHaveBeenLastCalledWith(null)
  })

  it('should set subscriptor when login/logout', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    await act(async () => undefined)

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    subscription!.checkAccess = jest
      .fn()
      .mockResolvedValueOnce(true)
      .mockResolvedValue(false)

    const token = { access_token: 'token', refresh_token: 'token' }
    await auth.setToken(token)
    await act(async () => result.current.signin(''))
    expect(result.current.isSubscribed).toBeTruthy()
    expect(mockSetUserProperty).toHaveBeenLastCalledWith(
      'account_type',
      'premium',
    )

    await act(async () => result.current.signout())
    expect(result.current.isSubscribed).toBeFalsy()
    expect(mockSetUserProperty).toHaveBeenLastCalledWith('account_type', 'free')

    await auth.setToken(token)
    await act(async () => result.current.signin(''))
    expect(result.current.isSubscribed).toBeFalsy()
    expect(mockSetUserProperty).toHaveBeenLastCalledWith('account_type', 'free')
  })

  describe('deep linking', () => {
    const config = {
      client_id: 'id',
      redirect_url: 'scheme://oauth',
      issuer: 'https://oauth.com',
    }

    it('without oauth config', async () => {
      const listener = Linking.addEventListener as jest.Mock
      const { result } = renderHook(() => useAuth(), { wrapper })
      await act(async () => undefined)
      const [[, callback]] = listener.mock.calls.reverse()
      await act(async () => callback({ url: config.redirect_url }))
      expect(result.current.isAuthenticated).toBeFalsy()
    })

    it('invalid redirect url', async () => {
      auth.getOAuthConfig = jest.fn().mockReturnValue(config)
      const listener = Linking.addEventListener as jest.Mock
      const { result } = renderHook(() => useAuth(), { wrapper })
      await act(async () => undefined)
      const [[, callback]] = listener.mock.calls.reverse()
      await act(async () => callback({ url: 'scheme://other?code=123' }))
      expect(result.current.isAuthenticated).toBeFalsy()
    })

    it('authenticate in the app', async () => {
      auth.getOAuthConfig = jest.fn().mockReturnValue(config)
      mockTokenExchange.mockResolvedValueOnce({})
      const listener = Linking.addEventListener as jest.Mock
      const { result } = renderHook(() => useAuth(), { wrapper })
      await act(async () => undefined)
      const [[, callback]] = listener.mock.calls.reverse()
      await act(async () => callback({ url: config.redirect_url }))
      expect(result.current.isAuthenticated).toBeTruthy()
    })

    it('remove event listener on unmount', async () => {
      const listener = Linking.addEventListener as jest.Mock
      const remove = jest.fn()
      listener.mockReturnValueOnce({ remove })
      const { unmount } = renderHook(() => useAuth(), { wrapper })
      await act(async () => undefined)
      expect(remove).not.toBeCalled()
      unmount()
      expect(remove).toBeCalled()
    })
  })
})
