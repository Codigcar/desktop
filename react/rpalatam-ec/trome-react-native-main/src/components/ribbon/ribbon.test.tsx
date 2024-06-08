import { ThemeProvider } from '@shopify/restyle'
import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import { Button, Keyboard, Text } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import Ribbon from '.'
import theme from '../../theme'

const wrapper = ({ children }: { children: JSX.Element }) => (
  <ThemeProvider theme={theme}>
    <SafeAreaProvider
      initialMetrics={{
        frame: { x: 0, y: 0, width: 0, height: 0 },
        insets: { top: 0, left: 0, right: 0, bottom: 0 },
      }}>
      {children}
    </SafeAreaProvider>
  </ThemeProvider>
)

const mockGoBackFn = jest.fn()
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    goBack: mockGoBackFn,
  })),
}))

describe('ribbon component', () => {
  it('render title ribbon', () => {
    const { getByText } = render(<Ribbon title="WUF" />, { wrapper })
    expect(getByText('WUF')).toBeDefined()
  })

  it('go back from ribbon', () => {
    const mockKeyboardDismiss = jest.spyOn(Keyboard, 'dismiss')
    const { getByTestId } = render(<Ribbon title="WUF" />, { wrapper })
    const btn = getByTestId('goback-button')
    fireEvent.press(btn)
    expect(mockGoBackFn).toHaveBeenCalled()
    expect(mockKeyboardDismiss).toHaveBeenCalled()
  })

  it('render addons', () => {
    const { getByText, queryByText } = render(
      <Ribbon
        title="WUF"
        LeftComponent={() => (
          <Button onPress={jest.fn} title="left-component" />
        )}
        RigthComponent={() => (
          <Button onPress={jest.fn} title="rigth-component" />
        )}>
        <Text>children-component</Text>
      </Ribbon>,
      { wrapper },
    )

    expect(queryByText('WUF')).toBeNull()
    expect(getByText('children-component')).toBeDefined()
    expect(getByText('left-component')).toBeDefined()
    expect(getByText('rigth-component')).toBeDefined()
  })
})
