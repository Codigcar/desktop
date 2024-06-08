import { useNavigation } from '@react-navigation/native'
import { fireEvent, render } from '@testing-utils/library'
import React from 'react'
import { Platform } from 'react-native'

import { useAuth } from '../../../context/auth'
import { App } from '../../../utils/config'
import { sendFeedbackByEmail } from '../../../utils/mailer'
import MyAccountScreen, { deleteAccountModalRef } from '../MyAccount.elcomercio'

jest.mock('../../../utils/mailer')

jest.useFakeTimers()
jest.mock('@react-navigation/native')
const mockUseNavigation = useNavigation as jest.Mock
mockUseNavigation.mockReturnValue({ goBack: jest.fn })

jest.mock('../../../containers/bottomSheet', () => {
  const react = jest.requireActual('react')
  const reactNative = jest.requireActual('react-native')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const BottomSheetCustomModal = react.forwardRef((props: any, ref: any) => (
    <reactNative.View {...props} testID="modal" forwardedRef={ref} />
  ))
  return { BottomSheetCustomModal, BottomSheetModalProvider: reactNative.View }
})

jest.mock('../../../context/auth')
const mockUseAuth = useAuth as jest.Mock

const mockUser = {
  id: 'id',
  first_name: 'Jose',
  last_name: 'Perez',
  email: 'jose@perez.pe',
}

describe('MyAccount.elcomercio', () => {
  beforeAll(() => {
    App.key = 'elcomercio'
    mockUseAuth.mockReturnValue({
      user: mockUser,
    })
  })

  it('should show password when the user has a password to enter the app', () => {
    mockUseAuth.mockReturnValueOnce({
      user: { ...mockUser, user_metadata: { passwordStatus: 'has-password' } },
    })

    const { getByText } = render(<MyAccountScreen />)
    expect(getByText('Cambiar contraseña')).toBeDefined()
  })

  it('should not show the password when the value of passwordStatus is different from has-password', () => {
    mockUseAuth.mockReturnValueOnce({
      user: { ...mockUser, user_metadata: undefined },
    })

    const { queryByTestId } = render(<MyAccountScreen />)
    expect(queryByTestId('Cambiar contraseña')).toBeNull()
  })

  it('should not show delete account if the user is on an android device', () => {
    Platform.OS = 'android'
    mockUseAuth.mockReturnValueOnce({
      isSubscribed: false,
      user: mockUser,
    })
    const { queryByText } = render(<MyAccountScreen />)
    expect(queryByText('Eliminar mi cuenta')).toBeNull()
  })

  it('should not show delete account if user is subscriber', () => {
    Platform.OS = 'ios'
    mockUseAuth.mockReturnValueOnce({
      isSubscribed: true,
      user: mockUser,
    })
    const { queryByText } = render(<MyAccountScreen />)
    expect(queryByText('Eliminar mi cuenta')).toBeNull()
  })

  describe('delete account modal', () => {
    beforeAll(() => {
      Platform.OS = 'ios'
    })

    it('should show call modal present method', () => {
      mockUseAuth.mockReturnValueOnce({
        user: mockUser,
        isSubscribed: false,
      })
      const { getByText } = render(<MyAccountScreen />)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ref = deleteAccountModalRef as any
      ref.current = { present: jest.fn() }
      fireEvent.press(getByText('Eliminar mi cuenta'))
      expect(ref.current.present).toBeCalled()
    })

    it('should close modal when user press the backdrop', async () => {
      const { getByTestId } = render(<MyAccountScreen />)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ref = deleteAccountModalRef as any
      ref.current = { close: jest.fn() }
      const backdrop = getByTestId('modal').props.backdropComponent()
      backdrop.props.onPress()
      expect(ref.current.close).toBeCalled()
    })

    it('should not close modal when isLoading is true', async () => {
      const { getByA11yLabel, getByTestId } = render(<MyAccountScreen />)
      fireEvent.press(getByA11yLabel('Eliminar cuenta'))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ref = deleteAccountModalRef as any
      ref.current = { close: jest.fn() }
      const backdrop = getByTestId('modal').props.backdropComponent()
      backdrop.props.onPress()
      expect(ref.current.close).not.toBeCalled()
    })

    it('should dismiss modal', () => {
      const { getByText } = render(<MyAccountScreen />)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ref = deleteAccountModalRef as any
      ref.current = { dismiss: jest.fn() }
      fireEvent.press(getByText('Cancelar'))
      expect(ref.current.dismiss).toBeCalled()
    })

    it('should send feedback if only the user is a subscriber', () => {
      const user = { id: 'id', email: 'ec@ec.pe' }
      mockUseAuth
        .mockReturnValueOnce({ isSubscribed: true, user })
        .mockReturnValue({ isSubscribed: false, user })

      const { getByText, rerender, queryByText } = render(<MyAccountScreen />)
      fireEvent.press(getByText(/enviar\scomentario/i))
      expect(sendFeedbackByEmail).toHaveBeenLastCalledWith(user)

      rerender(<MyAccountScreen />)
      expect(queryByText(/enviar\scomentario/i)).toBeNull()
    })
  })
})
