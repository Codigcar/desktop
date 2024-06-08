import AsyncStorage from '@react-native-async-storage/async-storage'
import { act, renderHook } from '@testing-library/react-hooks'
import { fireEvent, render } from '@testing-utils/library'
import React from 'react'
import { Appearance } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

import Box from '../../components/box'
import { STORE_SCHEME } from '../../utils/constants'
import { HomeWebviewRef } from '../../utils/refs'
import {
  INITIAL_THEME,
  ThemeKey,
  ThemeProvider,
  useThemeContext,
} from '../theme'

jest.mock('react-native-device-info', () => ({
  getBundleId: jest.fn(() => 'com.eeec.gestion'),
}))

jest.useFakeTimers()
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  Version: 30,
  OS: 'android',
}))

const injectJavaScript = jest.fn()
Object.defineProperty(HomeWebviewRef, 'current', {
  value: { injectJavaScript },
})

const TestComponent: React.FC = () => {
  const { schemeSelection, updateSchemeSelection } = useThemeContext()
  const toggleTheme = () => {
    updateSchemeSelection(schemeSelection === 'dark' ? 'light' : 'dark')
  }
  return (
    <>
      <TouchableWithoutFeedback onPress={toggleTheme} testID="btn-update" />
      <Box.View bg="background" testID="altered-box" />
    </>
  )
}

beforeEach((done) => AsyncStorage.clear().then(() => done()))

describe('theme context', () => {
  it('set color scheme when appearance change', () => {
    const event = jest.spyOn(Appearance, 'addChangeListener')
    const { result } = renderHook(() => useThemeContext(), {
      wrapper: ThemeProvider,
    })
    const initialTheme = result.current.currentTheme
    const [fn] = event.mock.calls[0]
    act(() => {
      fn({ colorScheme: 'dark' })
      jest.runAllTimers()
    })
    expect(result.current.currentTheme).not.toBe(initialTheme)
  })

  it('should update pwa-nightMode on change currentTheme', async () => {
    const nextTheme: ThemeKey = 'dark'
    const isNightMode = nextTheme === 'dark'
    const { result } = renderHook(() => useThemeContext(), {
      wrapper: ThemeProvider,
    })
    await Promise.resolve()
    act(() => result.current.updateSchemeSelection(nextTheme))
    const injectedJS = injectJavaScript.mock.calls.pop().pop()
    expect(injectedJS.includes(`setNightMode(${isNightMode})`)).toBe(true)
  })

  it('should sync currentTheme with schemeSelection', async () => {
    const { result } = renderHook(() => useThemeContext(), {
      wrapper: ThemeProvider,
    })
    await Promise.resolve()
    const defaultTheme = result.current.currentTheme

    act(() => result.current.updateSchemeSelection('light'))
    expect(result.current.currentTheme).toBe('light')

    act(() => result.current.updateSchemeSelection('dark'))
    expect(result.current.currentTheme).toBe('dark')

    act(() => result.current.updateSchemeSelection('system'))
    expect(result.current.currentTheme).toBe(defaultTheme)
  })

  it('should provide system theme accord "currentTheme" property', async () => {
    const { getByTestId } = render(<TestComponent />)
    await Promise.resolve()
    const toggleButton = getByTestId('btn-update')
    const box = getByTestId('altered-box')

    const firstThemeStyles = box.props.style[0]
    fireEvent.press(toggleButton)
    const secontThemeStyles = box.props.style[0]
    expect(firstThemeStyles).not.toEqual(secontThemeStyles)
  })

  it('should load theme from storage on mount and set if is not null', async () => {
    const savedTheme: ThemeKey = 'dark'
    await AsyncStorage.setItem(STORE_SCHEME, 'dark')
    const { result } = renderHook(() => useThemeContext(), {
      wrapper: ThemeProvider,
    })
    await act(async () => await Promise.resolve())
    expect(result.current.schemeSelection).toBe(savedTheme)
  })

  it('should load initial theme when theme is not in storage', () => {
    jest.spyOn(Appearance, 'getColorScheme').mockReturnValue(null)
    const { result } = renderHook(() => useThemeContext(), {
      wrapper: ThemeProvider,
    })
    expect(result.current.currentTheme).toBe(INITIAL_THEME)
  })
})
