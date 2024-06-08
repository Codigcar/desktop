import { useNavigation } from '@react-navigation/native'
import { act, fireEvent, render } from '@testing-utils/library'
import MockAxios from 'jest-mock-axios'
import React from 'react'

import NotificationsScreen from './Notifications'
import { useTopics } from '../../context/topics'

jest.mock('@react-navigation/native')
const mockUseNavigation = useNavigation as jest.Mock
mockUseNavigation.mockReturnValue({})

jest.mock('../../context/topics')
const MockNotification = useTopics as jest.Mock
MockNotification.mockReturnValue({ topics: [] })

const RESPONSE = [
  {
    title: 'Test',
    data: [
      { display_name: 'John', id: 'jhon' },
      { display_name: 'Doe', id: 'doe', image: 'url' },
    ],
  },
]

describe('CustomContent Screen', () => {
  beforeAll(() => {
    MockAxios.mockResponse({ data: RESPONSE })
  })

  it('render loading for initial request', async () => {
    const { getByTestId, queryByTestId } = render(<NotificationsScreen />)
    expect(getByTestId('loading')).toBeDefined()
    await act(async () => undefined)
    expect(queryByTestId('loading')).toBeNull()
  })

  it('active notification', async () => {
    const subscribeToTopic = jest.fn().mockResolvedValue('')
    MockNotification.mockReturnValue({ topics: [], subscribeToTopic })
    const { getByTestId, queryByTestId } = render(<NotificationsScreen />)
    await act(async () => undefined)
    fireEvent(getByTestId('jhon'), 'onValueChange', true)
    expect(getByTestId('loading')).toBeDefined()
    await act(async () => undefined)
    expect(subscribeToTopic).toBeCalledWith('jhon')
    expect(queryByTestId('loading')).toBeNull()
  })

  it('desactive notification', async () => {
    const unsubscribeFromTopic = jest.fn().mockResolvedValue('')
    MockNotification.mockReturnValue({ topics: [], unsubscribeFromTopic })
    const { getByTestId, queryByTestId } = render(<NotificationsScreen />)
    await act(async () => undefined)
    fireEvent(getByTestId('jhon'), 'onValueChange', false)
    expect(getByTestId('loading')).toBeDefined()
    await act(async () => undefined)
    expect(unsubscribeFromTopic).toBeCalledWith('jhon')
    expect(queryByTestId('loading')).toBeNull()
  })

  it('navigate to back', async () => {
    const goBack = jest.fn()
    mockUseNavigation.mockReturnValue({ goBack })
    const { getByTestId } = render(<NotificationsScreen />)
    await act(async () => undefined)
    fireEvent.press(getByTestId('goback-button'))
    expect(goBack).toBeCalled()
  })
})
