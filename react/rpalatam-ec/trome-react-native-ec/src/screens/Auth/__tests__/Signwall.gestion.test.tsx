import { useNavigation } from '@react-navigation/native'
import { fireEvent, render } from '@testing-utils/library'
import React from 'react'

import SignwallModalScreen from '../Signwall.gestion'

const mockNavigate = jest.fn()
const mockGoBack = jest.fn()

jest.mock('@react-navigation/native')
const mockUserNavigation = useNavigation as jest.Mock
mockUserNavigation.mockReturnValue({
  navigate: mockNavigate,
  goBack: mockGoBack,
})

describe('Signwall.gestion', () => {
  it('should navigate to initial screen', () => {
    const { getByText } = render(<SignwallModalScreen />)
    fireEvent.press(getByText('¡Únete hoy!'))
    expect(mockNavigate).toHaveBeenLastCalledWith('Auth', {
      screen: 'InitialScreen',
    })
  })

  it('should go to the back screen', () => {
    const { getByText } = render(<SignwallModalScreen />)
    fireEvent.press(getByText('Volver'))
    expect(mockGoBack).toHaveBeenCalled()
  })

  it('should go to the back screen when user press the backdrop', async () => {
    const { getByTestId } = render(<SignwallModalScreen />)
    fireEvent.press(getByTestId('backdrop'))
    expect(mockGoBack).toHaveBeenCalled()
  })
})
