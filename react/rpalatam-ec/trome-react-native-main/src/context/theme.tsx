import AsyncStorage from '@react-native-async-storage/async-storage'
import { ThemeProvider as SystemProvider } from '@shopify/restyle'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Appearance, Platform } from 'react-native'

import lightTheme, { darkTheme } from '../theme'
import { STORE_SCHEME } from '../utils/constants'
import { HomeWebviewRef } from '../utils/refs'

export type ThemeKey = 'light' | 'dark'
type SchemeKey = ThemeKey | 'system'
interface ThemeContextInterface {
  currentTheme: ThemeKey
  schemeSelection: SchemeKey
  sendThemeToWebview: () => void
  updateSchemeSelection: (key: SchemeKey) => void
}

export const ThemeContext = createContext({} as ThemeContextInterface)

export const darkModeIsSupported =
  (Platform.OS === 'android' && Platform.Version >= 29) ||
  (Platform.OS === 'ios' && parseInt(Platform.Version as string, 10) >= 13)

export const INITIAL_THEME: ThemeKey = 'light'

export const ThemeProvider: React.FC = ({ children }) => {
  const [colorScheme, setColorScheme] = useState(
    Appearance.getColorScheme() || INITIAL_THEME,
  )
  const [schemeSelection, setSchemeSelection] = useState<SchemeKey>(
    darkModeIsSupported ? 'system' : colorScheme,
  )

  const currentTheme = useMemo(() => {
    if (schemeSelection === 'system') return colorScheme
    return schemeSelection
  }, [colorScheme, schemeSelection])

  const appTheme = useMemo(
    () => (currentTheme === 'dark' ? darkTheme : lightTheme),
    [currentTheme],
  )

  const sendThemeToWebview = useCallback(() => {
    HomeWebviewRef.current?.injectJavaScript(`(function(){
      if (window.NATIVE_CONNECTION && window.NATIVE_CONNECTION.mode) {
        window.NATIVE_CONNECTION.mode.setNightMode(${currentTheme === 'dark'})
      }
    })()`)
  }, [currentTheme])

  const updateSchemeSelection = useCallback((value: SchemeKey) => {
    AsyncStorage.setItem(STORE_SCHEME, value)
    setSchemeSelection(value)
  }, [])

  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    const onColorSchemeChange = (
      preferences: Appearance.AppearancePreferences,
    ) => {
      const color = preferences.colorScheme
      if (timeout.current) clearTimeout(timeout.current)
      timeout.current = setTimeout(() => {
        if (color) setColorScheme(color)
      }, 250)
    }
    const subscription = Appearance.addChangeListener(onColorSchemeChange)
    return () => {
      if (timeout.current) clearTimeout(timeout.current)
      subscription.remove()
    }
  }, [])

  useEffect(() => {
    AsyncStorage.getItem(STORE_SCHEME).then((theme) => {
      if (!theme) return
      setSchemeSelection(theme as SchemeKey)
    })
  }, [])

  useEffect(() => {
    sendThemeToWebview()
  }, [sendThemeToWebview])

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        schemeSelection,
        sendThemeToWebview,
        updateSchemeSelection,
      }}>
      <SystemProvider theme={appTheme}>{children}</SystemProvider>
    </ThemeContext.Provider>
  )
}

export const useThemeContext = (): ThemeContextInterface =>
  useContext(ThemeContext)
