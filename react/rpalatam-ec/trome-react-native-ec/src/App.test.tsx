import '@testing-library/jest-native/extend-expect'
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native'
import { render } from '@testing-utils/library'
import React from 'react'

import { RootStackScreen } from './App'
import { useAuth } from './context/auth'
import { HOME_SCREEN_SHOWN } from './screens/Home'

jest.mock('./context/auth')
const mockUseAuth = useAuth as jest.Mock
mockUseAuth.mockReturnValue({ isAuthenticated: false, user: {} })

jest.mock('./context/navigation', () => {
  return { useMainNavigation: jest.fn().mockReturnValue({ categories: [] }) }
})

jest.mock('./utils/refs', () => ({ HomeWebviewRef: jest.fn() }))

jest.useFakeTimers()

describe('App', () => {
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
      mockUseAuth.mockReturnValueOnce({ isAuthenticated: true, user: {} })
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
