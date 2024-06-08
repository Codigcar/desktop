import { useNavigation } from '@react-navigation/native'
import { fireEvent, render } from '@testing-utils/library'
import { FormHandles } from '@unform/core'
import React from 'react'
import { Platform } from 'react-native'

import { useAuthWithEmail } from '../../../hooks/useAuthWithEmail'
import { useAuthWithSocialMedia } from '../../../hooks/useAuthWithSocialMedia'
import SignwallModalScreen from '../Signwall.elcomercio'
import Banner from '../common/Banner'

jest.mock('@react-navigation/native')
const mockUseNavigation = useNavigation as jest.Mock
mockUseNavigation.mockReturnValue({ goBack: jest.fn })

jest.mock('../../../hooks/useAuthWithEmail')
const mockUseAuthWithEmail = useAuthWithEmail as jest.Mock
mockUseAuthWithEmail.mockReturnValue({ errors: {} })

jest.mock('../../../hooks/useAuthWithSocialMedia')
const mockUseAuthWithSocialMedia = useAuthWithSocialMedia as jest.Mock
mockUseAuthWithSocialMedia.mockReturnValue({ errors: {} })

describe('Signwall', () => {
  it('should submit form', () => {
    const formRef = React.createRef<FormHandles>()
    mockUseAuthWithEmail.mockReturnValue({
      errors: {},
      formRef,
      setFieldError: jest.fn(),
    })
    const { getByA11yLabel, getByText } = render(<SignwallModalScreen />)
    fireEvent.changeText(getByA11yLabel('email'), 'user@provider.com')
    fireEvent.changeText(getByA11yLabel('contraseña'), '12345678')
    const submitForm = jest.spyOn(formRef.current as FormHandles, 'submitForm')
    fireEvent.press(getByText('Ingresar'))
    expect(submitForm).toBeCalled()
  })

  it('should navigate to register screen', () => {
    const navigate = jest.fn()
    mockUseNavigation.mockReturnValueOnce({ navigate })
    const { getByText } = render(<SignwallModalScreen />)
    fireEvent.press(getByText('¡REGÍSTRATE!'))
    expect(navigate).toBeCalledWith('SignUp')
  })

  it('should navigate to forgot password screen', () => {
    const navigate = jest.fn()
    mockUseNavigation.mockReturnValueOnce({ navigate })
    const { getByText } = render(<SignwallModalScreen />)
    fireEvent.press(getByText('Olvidé mi contraseña'))
    expect(navigate).toBeCalledWith('RecoveryPassword')
  })

  it('should render email error', () => {
    const common_error = 'email_error'
    mockUseAuthWithEmail.mockReturnValueOnce({ errors: { common_error } })
    const { getByText, queryByText, rerender } = render(<SignwallModalScreen />)
    expect(getByText('email_error')).toBeDefined()
    rerender(<SignwallModalScreen />)
    expect(queryByText('email_error')).toBeNull()
  })

  it('should render social provider error', () => {
    const common_error = 'social_error'
    mockUseAuthWithSocialMedia.mockReturnValueOnce({ errors: { common_error } })
    const { getByText, queryByText, rerender } = render(<SignwallModalScreen />)
    expect(getByText('social_error')).toBeDefined()
    rerender(<SignwallModalScreen />)
    expect(queryByText('social_error')).toBeNull()
  })

  it('should render social providers', () => {
    Platform.OS = 'android'
    const { getByText, rerender } = render(<SignwallModalScreen />)
    expect(getByText('Facebook')).toBeDefined()
    expect(getByText('Google')).toBeTruthy()
    Platform.OS = 'ios'
    rerender(<SignwallModalScreen />)
    expect(getByText('Facebook')).toBeTruthy()
    expect(getByText('Google')).toBeTruthy()
    expect(getByText('Apple')).toBeTruthy()
  })

  it('should show progress bar with auth email', () => {
    mockUseAuthWithEmail
      .mockReturnValueOnce({
        errors: {},
        isSubmitted: true,
      })
      .mockReturnValueOnce({
        errors: {},
        isSubmitted: false,
      })
    const { rerender, getByTestId, queryByTestId } = render(
      <SignwallModalScreen />,
    )
    expect(getByTestId('progress-bar')).toBeDefined()
    rerender(<SignwallModalScreen />)
    expect(queryByTestId('progress-bar')).toBeNull()
  })

  it('should show progress bar with auth social media', () => {
    mockUseAuthWithSocialMedia
      .mockReturnValueOnce({
        errors: {},
        isSubmitted: true,
      })
      .mockReturnValueOnce({
        errors: {},
        isSubmitted: false,
      })
    const { rerender, getByTestId, queryByTestId } = render(
      <SignwallModalScreen />,
    )
    expect(getByTestId('progress-bar')).toBeDefined()
    rerender(<SignwallModalScreen />)
    expect(queryByTestId('progress-bar')).toBeNull()
  })
})

describe('Banner', () => {
  it('should navigate to back when modal is closed', () => {
    const goBack = jest.fn()
    mockUseNavigation.mockReturnValue({ goBack })
    const { getByA11yLabel } = render(
      <Banner onPress={jest.fn} title="Title" />,
    )
    fireEvent.press(getByA11yLabel('cerrar'))
    expect(goBack).toBeCalled()
  })
})
