import { useNavigation, useRoute } from '@react-navigation/native'
import { fireEvent, render } from '@testing-utils/library'
import React from 'react'

import { useAuthLinkAccount } from '../../../hooks/useAuthLinkAccount'
import AccountLinking from '../AccountLinking'

jest.mock('@react-navigation/native')
const mockUseNavigation = useNavigation as jest.Mock
const mockUseRoute = useRoute as jest.Mock
mockUseRoute.mockReturnValue({
  params: {
    method: 'facebook',
    additional_parameters: {
      email_verified: true,
      linking_state: 'state',
    },
  },
})

jest.mock('../../../hooks/useAuthLinkAccount')
const mockUseAuthLinkAccount = useAuthLinkAccount as jest.Mock
mockUseAuthLinkAccount.mockReturnValue({ errors: {} })

describe('AccountLinking', () => {
  it('should render loading when form is submitted', () => {
    mockUseAuthLinkAccount
      .mockReturnValueOnce({ errors: {}, isSubmitted: true })
      .mockReturnValueOnce({ errors: {}, isSubmitted: false })
    const { getByTestId, rerender, queryByTestId } = render(<AccountLinking />)
    expect(getByTestId('loading')).toBeDefined()
    rerender(<AccountLinking />)
    expect(queryByTestId('loading')).toBeNull()
  })

  it('should call linkingAccount from hook', () => {
    const hook = {
      errors: {},
      formRef: React.createRef(),
      linkingAccount: jest.fn(),
      setFieldError: jest.fn(),
    }
    mockUseAuthLinkAccount.mockReturnValueOnce(hook)
    const { getByA11yLabel, getByText } = render(<AccountLinking />)

    fireEvent.changeText(getByA11yLabel('email'), 'ec@ec.pe')
    fireEvent.changeText(getByA11yLabel('contraseña'), 'abcd1234')
    fireEvent.press(getByText(/confirmar/i))
    expect(hook.linkingAccount).toBeCalled()
  })

  it('should show form errors', () => {
    mockUseAuthLinkAccount.mockReturnValueOnce({
      errors: {
        email: 'Email inválido',
        password: 'Campo requerido',
      },
    })
    const { queryAllByText } = render(<AccountLinking />)
    expect(queryAllByText(/campo\srequerido/i).length).toBe(1)
    expect(queryAllByText(/email\sinválido/i).length).toBe(1)
  })

  it('should navigate to forgot password screen', () => {
    const navigate = jest.fn()
    mockUseNavigation.mockReturnValue({ navigate })
    const { getByText } = render(<AccountLinking />)
    fireEvent.press(getByText('¿Olvidaste tu contraseña?'))
    expect(navigate).toBeCalled()
  })
})
