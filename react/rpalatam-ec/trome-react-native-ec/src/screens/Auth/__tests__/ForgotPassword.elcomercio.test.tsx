import { useNavigation } from '@react-navigation/native'
import { fireEvent, render } from '@testing-utils/library'
import { FormHandles } from '@unform/core'
import React from 'react'

import { useForgotPassword } from '../../../hooks/useForgotPassword'
import ForgotPasswordScreen from '../ForgotPassword.elcomercio'

jest.mock('@react-navigation/native')
const mockUseNavigation = useNavigation as jest.Mock
mockUseNavigation.mockReturnValue({ goBack: jest.fn })

jest.mock('../../../hooks/useForgotPassword')
const mockUserForgotPassword = useForgotPassword as jest.Mock
mockUserForgotPassword.mockReturnValue({ errors: {} })

describe('ForgotPassword.elcomercio', () => {
  it('navigate to back', () => {
    const goBack = jest.fn()
    mockUseNavigation.mockReturnValue({ goBack })
    const { getByTestId } = render(<ForgotPasswordScreen />)
    fireEvent.press(getByTestId('icon-close'))
    expect(goBack).toHaveBeenCalled()
  })

  it('should show the form when emailSent is equal to false', async () => {
    const formRef = React.createRef<FormHandles>()
    const forgotPassword = jest.fn()
    mockUserForgotPassword.mockReturnValueOnce({
      errors: {},
      emailSent: false,
      forgotPassword,
      formRef,
    })
    const { getByText } = render(<ForgotPasswordScreen />)
    fireEvent.press(getByText('Enviar'))

    expect(forgotPassword).toHaveBeenCalled()
  })

  it('It should show the message "Email sent" when sending the email successfully', () => {
    mockUserForgotPassword.mockReturnValueOnce({
      errors: {},
      emailSent: true,
    })
    const { getByText } = render(<ForgotPasswordScreen />)

    expect(
      getByText(
        'E-mail enviado. \nRevisa tu correo electrónico para cambiar tu contraseña',
      ),
    ).toBeDefined()
  })

  it('should show progress bar', () => {
    mockUserForgotPassword
      .mockReturnValueOnce({
        errors: {},
        isSubmitted: true,
      })
      .mockReturnValueOnce({
        errors: {},
        isSubmitted: false,
      })
    const { rerender, getByTestId, queryByTestId } = render(
      <ForgotPasswordScreen />,
    )
    expect(getByTestId('progress-bar')).toBeDefined()
    rerender(<ForgotPasswordScreen />)
    expect(queryByTestId('progress-bar')).toBeNull()
  })
})
