import { useNavigation } from '@react-navigation/native'
import { act, fireEvent, render } from '@testing-utils/library'
import MockAxios from 'jest-mock-axios'
import React from 'react'

import NewslettersScreen from './Newsletters'
import { useAuth } from '../../context/auth'
import auth from '../../services/auth'
import { NewsletterPreferences } from '../../services/preferences'
import { App } from '../../utils/config'

jest.mock('@react-navigation/native')
const mockUseNavigation = useNavigation as jest.Mock
mockUseNavigation.mockReturnValue({})

jest.mock('../../context/auth')
const mockUseAuth = useAuth as jest.Mock
mockUseAuth.mockReturnValue({ user: {} })

const RESPONSE = {
  elcomercio: [
    {
      code: 'general',
      image: 'https://image.png',
      description: 'description',
      name: 'General',
      order: 1,
    },
  ],
}

describe('Newsletters.elcomercio', () => {
  beforeAll(() => {
    App.key = 'elcomercio'
    MockAxios.mockResponse({ data: RESPONSE })
  })

  it('render loading for initial request', async () => {
    const { getByTestId, queryByTestId } = render(<NewslettersScreen />)
    expect(getByTestId('ribbon-loading')).toBeDefined()
    await act(async () => undefined)
    expect(queryByTestId('loading')).toBeNull()
  })

  it('navigate to back', async () => {
    const goBack = jest.fn()
    mockUseNavigation.mockReturnValue({ goBack })
    const { getByTestId } = render(<NewslettersScreen />)
    await act(async () => undefined)
    fireEvent.press(getByTestId('goback-button'))
    expect(goBack).toBeCalled()
  })

  it('should navigate to login screen', async () => {
    const navigate = jest.fn()
    mockUseNavigation.mockReturnValue({ navigate })

    const { getByTestId } = render(<NewslettersScreen />)
    await act(async () => undefined)
    fireEvent(getByTestId('change-value'), 'onValueChange', true)
    expect(navigate).toBeCalledWith('Login')
  })

  it('should add the id to subscribed', async () => {
    mockUseAuth.mockReturnValue({ user: { id: '1234' } })
    jest.spyOn(auth, 'getToken').mockResolvedValueOnce({
      access_token: 'user_token',
      refresh_token: 'refresh_token',
    })
    NewsletterPreferences.post = jest.fn().mockResolvedValue([])
    const { getByTestId } = render(<NewslettersScreen />)
    await act(async () => undefined)
    fireEvent(getByTestId('change-value'), 'onValueChange', true)
    await act(async () => undefined)
    expect(getByTestId('change-value')).toHaveProp('value', true)
  })
})
