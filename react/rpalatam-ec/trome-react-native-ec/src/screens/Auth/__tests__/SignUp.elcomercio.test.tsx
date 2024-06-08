import { useNavigation } from '@react-navigation/native'
import { fireEvent, render } from '@testing-utils/library'
import { FormHandles } from '@unform/core'
import React from 'react'

import { Platform } from 'react-native'
import { useAuthWithEmail } from '../../../hooks/useAuthWithEmail'
import { useAuthWithSocialMedia } from '../../../hooks/useAuthWithSocialMedia'
import SignUpScreen from '../SignUp.elcomercio'

jest.mock('@react-navigation/native')
const mockUseNavigation = useNavigation as jest.Mock
mockUseNavigation.mockReturnValue({ goBack: jest.fn })

jest.mock('../../../hooks/useAuthWithEmail')
const mockUseAuthWithEmail = useAuthWithEmail as jest.Mock
mockUseAuthWithEmail.mockReturnValue({ errors: {} })

const mockNotificationShow = jest.fn()
jest.mock('../../../context/notification', () => ({
  useNotification: jest.fn(() => ({
    show: mockNotificationShow,
  })),
}))

jest.mock('../../../hooks/useAuthWithSocialMedia')
const mockUseAuthWithSocialMedia = useAuthWithSocialMedia as jest.Mock
mockUseAuthWithSocialMedia.mockReturnValue({ errors: {} })

describe('SignwallUp.elcomercio', () => {
  it('should submit form', () => {
    const formRef = React.createRef<FormHandles>()
    const signUp = jest.fn()
    mockUseAuthWithEmail.mockReturnValueOnce({ errors: {}, formRef, signUp })
    const { getByText } = render(<SignUpScreen />)
    const submitForm = jest.spyOn(formRef.current as FormHandles, 'submitForm')
    fireEvent.press(getByText('Registrarme'))
    expect(submitForm).toBeCalled()
    expect(signUp).toBeCalled()
  })

  it('should set field error', () => {
    const setFieldError = jest.fn()
    mockUseAuthWithEmail.mockReturnValueOnce({ errors: {}, setFieldError })
    const { getByA11yLabel, getByTestId } = render(<SignUpScreen />)
    fireEvent.changeText(getByA11yLabel('nombre'), 'Name')
    fireEvent.changeText(getByA11yLabel('apellido'), 'Lastname')
    fireEvent.changeText(getByA11yLabel('email'), 'user@provider.com')
    fireEvent.changeText(getByA11yLabel('contraseña'), '12345678')
    fireEvent.press(getByTestId('terms-checkbox'))
    expect(setFieldError).toBeCalledTimes(5)
  })

  it('should focus the next input', () => {
    const formRef = React.createRef<FormHandles>()
    mockUseAuthWithEmail.mockReturnValueOnce({ errors: {}, formRef })
    const { getByA11yLabel } = render(<SignUpScreen />)
    const getField = jest.spyOn(formRef.current as FormHandles, 'getFieldRef')
    const submitForm = jest.spyOn(formRef.current as FormHandles, 'submitForm')
    getByA11yLabel('nombre').props.onSubmitEditing()
    expect(getField).toHaveBeenLastCalledWith('last_name')
    getByA11yLabel('apellido').props.onSubmitEditing()
    expect(getField).toHaveBeenLastCalledWith('email')
    getByA11yLabel('email').props.onSubmitEditing()
    expect(getField).toHaveBeenLastCalledWith('password')
    getByA11yLabel('contraseña').props.onSubmitEditing()
    expect(submitForm).toBeCalled()
  })

  it('should navigate to signIn screen', () => {
    const replace = jest.fn()
    mockUseNavigation.mockReturnValueOnce({ replace })
    const { getByTestId } = render(<SignUpScreen />)
    fireEvent.press(getByTestId('already-account'))
    expect(replace).toBeCalledWith('Login')
  })

  it('should render email error', () => {
    const common_error = 'Ya tienes una cuenta con nosotros'
    mockUseAuthWithEmail.mockReturnValueOnce({ errors: { common_error } })
    const { getByText } = render(<SignUpScreen />)
    expect(getByText(common_error)).toBeDefined()
  })

  it('should render social provider error', () => {
    const common_error = 'social_error'
    mockUseAuthWithSocialMedia.mockReturnValueOnce({ errors: { common_error } })
    const { getByText, queryByText, rerender } = render(<SignUpScreen />)
    expect(getByText('social_error')).toBeDefined()
    rerender(<SignUpScreen />)
    expect(queryByText('social_error')).toBeNull()
  })

  it('should register with social network', () => {
    Platform.OS = 'android'
    const { getByText, rerender } = render(<SignUpScreen />)
    expect(getByText('Facebook')).toBeTruthy()
    expect(getByText('Google')).toBeTruthy()

    Platform.OS = 'ios'
    rerender(<SignUpScreen />)
    expect(getByText('Facebook')).toBeTruthy()
    expect(getByText('Google')).toBeTruthy()
    expect(getByText('Apple')).toBeTruthy()
  })

  it('should navigate to back when modal is closed', () => {
    const goBack = jest.fn()
    mockUseNavigation.mockReturnValue({ goBack })
    const { getByTestId } = render(<SignUpScreen />)
    fireEvent.press(getByTestId('icon-close'))
    expect(goBack).toBeCalled()
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
    const { rerender, getByTestId, queryByTestId } = render(<SignUpScreen />)
    expect(getByTestId('progress-bar')).toBeDefined()
    rerender(<SignUpScreen />)
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
    const { rerender, getByTestId, queryByTestId } = render(<SignUpScreen />)
    expect(getByTestId('progress-bar')).toBeDefined()
    rerender(<SignUpScreen />)
    expect(queryByTestId('progress-bar')).toBeNull()
  })
})
