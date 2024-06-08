import { RenderAPI, RenderOptions, render } from '@testing-library/react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { ThemeProvider } from '../../src/context/theme'

const AllTheProviders: React.FC = ({ children }) => {
  return (
    <ThemeProvider>
      <SafeAreaProvider
        initialMetrics={{
          frame: { x: 0, y: 0, width: 0, height: 0 },
          insets: { top: 0, left: 0, right: 0, bottom: 0 },
        }}>
        {children}
      </SafeAreaProvider>
    </ThemeProvider>
  )
}

const customRender = (
  component: React.ReactElement,
  options?: RenderOptions,
): RenderAPI => render(component, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react-native'

export { customRender as render }
