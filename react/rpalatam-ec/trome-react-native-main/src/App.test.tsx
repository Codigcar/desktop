import '@testing-library/jest-native/extend-expect'
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native'
import { act, fireEvent, render } from '@testing-utils/library'
import React from 'react'

import {
  AccountStackScreen,
  AppNavigator,
  ProfileStackScreen,
  RootStackScreen,
} from './App'
import { useAuth } from './context/auth'
import { HOME_SCREEN_SHOWN } from './screens/Home'

const mockLogScreenView = jest.fn()
jest.mock('@react-native-firebase/analytics', () =>
  jest.fn(() => ({ logScreenView: mockLogScreenView })),
)

jest.mock('./context/auth')
const mockUseAuth = useAuth as jest.Mock
mockUseAuth.mockReturnValue({ isAuthenticated: false, user: {} })

jest.mock('./utils/refs', () => ({ HomeWebviewRef: jest.fn() }))

jest.useFakeTimers()

describe('App', () => {
  it('log screens with Analytics', async () => {
    jest.spyOn(HOME_SCREEN_SHOWN, 'get').mockReturnValueOnce(true)
    const { getByText } = render(<AppNavigator />)
    await act(async () => undefined)
    fireEvent.press(getByText('Leer Luego'))
    await act(async () => undefined)
    expect(mockLogScreenView).toBeCalledTimes(1)
    expect(mockLogScreenView).toBeCalledWith({ screen_name: 'FavoriteScreen' })
  })

  describe('account stack', () => {
    it('initial screen', () => {
      const ref = React.createRef<NavigationContainerRef<never>>()
      render(
        <NavigationContainer ref={ref}>
          <AccountStackScreen />
        </NavigationContainer>,
      )
      expect(ref.current?.getCurrentRoute()?.name).toBe('AccountOptions')
    })
  })

  describe('profile stack', () => {
    it('initial screen', () => {
      const ref = React.createRef<NavigationContainerRef<never>>()
      render(
        <NavigationContainer ref={ref}>
          <ProfileStackScreen />
        </NavigationContainer>,
      )
      expect(ref.current?.getCurrentRoute()?.name).toBe('ProfileOptions')
    })
  })

  describe('root stack', () => {
    it('init auth stack', () => {
      const ref = React.createRef<NavigationContainerRef<never>>()
      render(
        <NavigationContainer ref={ref}>
          <RootStackScreen />
        </NavigationContainer>,
      )
      expect(ref.current?.getCurrentRoute()?.name).toBe('InitialScreen')
    })

    it('init main stack when user is logged in', () => {
      mockUseAuth.mockReturnValueOnce({ isAuthenticated: true })
      const ref = React.createRef<NavigationContainerRef<never>>()
      render(
        <NavigationContainer ref={ref}>
          <RootStackScreen />
        </NavigationContainer>,
      )
      expect(ref.current?.getCurrentRoute()?.name).toBe('Feed')
    })

    it('init main stack when HOME_SCREEN_SHOWN is true', () => {
      jest.spyOn(HOME_SCREEN_SHOWN, 'get').mockReturnValue(true)
      const ref = React.createRef<NavigationContainerRef<never>>()
      render(
        <NavigationContainer ref={ref}>
          <RootStackScreen />
        </NavigationContainer>,
      )
      expect(ref.current?.getCurrentRoute()?.name).toBe('Feed')
    })
  })
})
