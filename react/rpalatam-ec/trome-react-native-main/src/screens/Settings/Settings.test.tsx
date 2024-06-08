import { act, fireEvent, render } from '@testing-utils/library'
import React from 'react'

import Settings from './Settings'
import { App } from '../../utils/config'
import { openInBrowser } from '../../utils/inappbrowser'

const mockNavigate = jest.fn()
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({ navigate: mockNavigate })),
}))

jest.mock('../../utils/inappbrowser')

jest.useFakeTimers()

describe('Settings screen page', () => {
  it('should navigate to custom content screen', () => {
    const { getByText } = render(<Settings />)

    fireEvent.press(getByText(/mi\scontenido/i))
    expect(mockNavigate).toHaveBeenLastCalledWith('Main', {
      screen: 'CustomContent',
    })
  })

  it('should open the policy url by active brand', () => {
    const { getByText } = render(<Settings />)

    fireEvent.press(getByText(/política\sde\scookies/i))
    expect(openInBrowser).toHaveBeenLastCalledWith(
      expect.stringContaining(App.key),
    )
  })

  it('should open modal theme', () => {
    const { getByText, getByTestId, queryByTestId } = render(<Settings />)

    expect(queryByTestId('backdrop-touchable')).toBeNull()
    fireEvent.press(getByText(/apariencia/i))
    act(jest.runAllTimers)
    expect(getByTestId('backdrop-touchable')).toBeDefined()
  })
})
