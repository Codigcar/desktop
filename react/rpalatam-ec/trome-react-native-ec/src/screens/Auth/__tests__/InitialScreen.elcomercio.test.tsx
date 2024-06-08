import { useNavigation } from '@react-navigation/native'
import { fireEvent, render } from '@testing-utils/library'
import React from 'react'

import InitialScreen from '../InitialScreen.elcomercio'

const mockNavigation = jest.fn()
const mockReplace = jest.fn()

jest.mock('@react-navigation/native')
const mockUseNavigation = useNavigation as jest.Mock
mockUseNavigation.mockReturnValue({
  navigate: mockNavigation,
  replace: mockReplace,
})

describe('InitialScreen.elcomercio', () => {
  it('should navigate to login screen', () => {
    const { getByText } = render(<InitialScreen />)
    fireEvent.press(getByText('Ingresar'))

    expect(mockNavigation).toHaveBeenLastCalledWith('Login')
  })

  it('should navigate to signup screen', () => {
    const { getByText } = render(<InitialScreen />)
    fireEvent.press(getByText('Crea una cuenta gratis'))

    expect(mockNavigation).toHaveBeenLastCalledWith('SignUp')
  })

  it('should navigate to home screen', () => {
    const { getByTestId } = render(<InitialScreen />)
    fireEvent.press(getByTestId('icon-close'))

    expect(mockReplace).toHaveBeenLastCalledWith('Main', {
      screen: 'Home',
      params: { screen: 'Feed' },
    })
  })
})
