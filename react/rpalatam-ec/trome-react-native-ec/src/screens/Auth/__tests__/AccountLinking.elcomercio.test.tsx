import { useNavigation, useRoute } from '@react-navigation/native'
import { fireEvent, render } from '@testing-utils/library'
import React from 'react'
import { useAuthLinkAccount } from '../../../hooks/useAuthLinkAccount'
import AccountLinking from '../AccountLinking.elcomercio'

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

const mockGoBack = jest.fn()
mockUseNavigation.mockReturnValue({
  goBack: mockGoBack,
})

jest.mock('../../../hooks/useAuthLinkAccount')
const mockUseAuthLinkAccount = useAuthLinkAccount as jest.Mock
mockUseAuthLinkAccount.mockReturnValue({ errors: {}, isSubmitted: false })

describe('AccountLinking.elcomercio', () => {
  it('should render loading when form is submitted', () => {
    mockUseAuthLinkAccount
      .mockReturnValueOnce({
        errors: {},
        isSubmitted: true,
      })
      .mockReturnValueOnce({
        errors: {},
        isSubmitted: false,
      })

    const { getByTestId, rerender, queryByTestId } = render(<AccountLinking />)

    expect(getByTestId('ribbon-loading')).toBeDefined()
    rerender(<AccountLinking />)
    expect(queryByTestId('loading')).toBeNull()
  })

  it('should be able to submit the form', () => {
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
    fireEvent.press(getByText(/ingresar/i))

    expect(hook.linkingAccount).toBeCalled()
  })
})
