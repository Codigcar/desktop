import { createContext, useMemo, useState } from 'react'
import { Platform } from 'react-native'
import { ThemeProvider as SystemProvider } from '@shopify/restyle'

import lightTheme from '../theme'

type Props = {
  children: any
}

export const darkModeIsSupported =
  (Platform.OS === 'android' && Platform.Version >= 29) ||
  (Platform.OS === 'ios' && parseInt(Platform.Version as string, 10) >= 13)

export type ThemeKey = 'light' | 'dark'
type SchemeKey = ThemeKey | 'system'

export const INITIAL_THEME: ThemeKey = 'light'

const dynamicModeIsEnabled = false

interface ThemeContextInterface {
    currentTheme: ThemeKey
    schemeSelection: SchemeKey
  }

export const ThemeContext = createContext({} as ThemeContextInterface)

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [colorScheme, setColorScheme] = useState(INITIAL_THEME)
  const [schemeSelection, setSchemeSelection] = useState<SchemeKey>(
    darkModeIsSupported && dynamicModeIsEnabled ? 'system' : colorScheme,
  )

  const currentTheme = useMemo(() => {
    if (schemeSelection === 'system') return colorScheme
    return schemeSelection
  }, [colorScheme, schemeSelection])

  const appTheme = useMemo(
    () => (lightTheme),
    [currentTheme],
  )

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        schemeSelection,
      }}>
      <SystemProvider theme={appTheme}>{children}</SystemProvider>
    </ThemeContext.Provider>
  )
}
