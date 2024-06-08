import { ThemeProvider as SystemProvider } from '@shopify/restyle'
import { fireEvent, render } from '@testing-utils/library'
import React from 'react'

import { ThemeContext } from '../../../context/theme'
import lightTheme from '../../../theme'
import ThemeSelector, { options } from '../ThemeSelector'

jest.useFakeTimers()
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  Version: 30,
  OS: 'android',
}))

const mockUpdateSchemeSelection = jest.fn()

const wrapper: React.FC = ({ children }) => (
  <ThemeContext.Provider
    value={{
      currentTheme: 'light',
      updateSchemeSelection: mockUpdateSchemeSelection,
      schemeSelection: 'light',
      sendThemeToWebview: jest.fn(),
    }}>
    <SystemProvider theme={lightTheme}>{children}</SystemProvider>
  </ThemeContext.Provider>
)

describe('ThemeSelector', () => {
  it('should render the options correctly on themeSelector', () => {
    const { getByText } = render(<ThemeSelector />)
    const { label: textLabel } = options[0]
    expect(getByText(textLabel)).toBeDefined()
    const { label: systemLabel } = options[2]
    expect(getByText(systemLabel)).toBeDefined()
  })

  it('should change the theme with the selected option id', () => {
    const lightOption = options[0]
    const { getByText } = render(<ThemeSelector />, { wrapper })

    fireEvent.press(getByText(lightOption.label))
    expect(mockUpdateSchemeSelection).toHaveBeenLastCalledWith(lightOption.id)
    expect(mockUpdateSchemeSelection).toHaveBeenCalledTimes(1)
  })
})
