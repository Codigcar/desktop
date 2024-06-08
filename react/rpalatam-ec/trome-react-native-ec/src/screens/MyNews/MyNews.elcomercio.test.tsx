import {
  DrawerActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native'
import { act, cleanup, fireEvent, render } from '@testing-utils/library'
import MockAxios from 'jest-mock-axios'
import React from 'react'
import { Banner } from 'react-native-ad-manager'

import MyNews from './MyNews.elcomercio'
import { useAuth } from '../../context/auth'

const MOCK_RESPONSE_INIT = {
  data: {
    content_elements: [
      {
        _id: '1',
        canonical_url: 'url',
        last_updated_date: 'date',
        headlines: { basic: 'title' },
        content_restrictions: {
          content_code: 'premium',
        },
        type: 'story',
      },
      {
        _id: '2',
        canonical_url: 'url',
        last_updated_date: 'date',
        headlines: { basic: 'title2' },
        content_restrictions: {
          content_code: 'premium',
        },
        type: 'story',
      },
    ],
    type: 'results',
  },
}

jest.mock('../../context/navigation', () => ({
  useMainNavigation: jest.fn().mockImplementation(() => ({ categories: [] })),
}))

jest.mock('../../context/favorites', () => ({
  useFavorites: jest.fn().mockImplementation(() => ({ favorites: [] })),
}))

const mockDispatch = jest.fn()
const mockNavigate = jest.fn()
const mockPush = jest.fn()
const mockReplace = jest.fn()

jest.mock('@react-navigation/native')
const mockOpenDrawer = DrawerActions.openDrawer as jest.Mock
mockOpenDrawer.mockReturnValue('open')

const mockUseNavigation = useNavigation as jest.Mock
mockUseNavigation.mockReturnValue({
  navigate: mockNavigate,
  dispatch: mockDispatch,
  push: mockPush,
  replace: mockReplace,
})

const mockUseFocusEffect = useFocusEffect as jest.Mock
mockUseFocusEffect.mockImplementation((fn) => fn())

jest.mock('../../context/auth')
const mockUseAuth = useAuth as jest.Mock
mockUseAuth.mockImplementation(() => ({
  isAuthenticated: true,
  isSubscribed: false,
  user: { id: 'id' },
}))

afterEach(() => {
  MockAxios.reset()
  cleanup()
})

describe('MyNews screen page', () => {
  it('should open drawer', async () => {
    const { getByTestId } = render(<MyNews />)
    await act(async () => undefined)
    const drawerBtn = getByTestId('menu-button')
    fireEvent.press(drawerBtn)
    expect(mockDispatch).toHaveBeenLastCalledWith('open')
  })

  it('should navigate to interest screen', async () => {
    const { getByTestId } = render(<MyNews />)
    await act(async () => undefined)
    const filterBtn = getByTestId('filter-button')
    fireEvent.press(filterBtn)
    expect(mockNavigate).toHaveBeenLastCalledWith('Main', {
      screen: 'Interests',
    })
  })

  it('should render only premium news by default', async () => {
    const { getAllByText } = render(<MyNews />)
    await act(async () => MockAxios.mockResponse(MOCK_RESPONSE_INIT))
    const text = getAllByText(/suscriptor\sdigital/i)
    expect(text.length).toBe(2)
  })

  it('should render card and ad', async () => {
    const { getByTestId, getByText } = render(<MyNews />)
    await act(async () => MockAxios.mockResponse(MOCK_RESPONSE_INIT))
    const title = getByText('title')
    expect(title).toBeDefined()
    fireEvent.press(title)
    const screen = getByTestId('mynews-screen')
    // eslint-disable-next-line testing-library/await-async-query
    expect(screen.findByType(Banner)).toBeDefined()
  })

  it('should not render ad when user is premium', async () => {
    mockUseAuth.mockImplementation(() => ({
      isAuthenticated: true,
      isSubscribed: true,
      user: { id: 'id' },
    }))

    const { getByTestId, getByText } = render(<MyNews />)
    await act(async () => MockAxios.mockResponse(MOCK_RESPONSE_INIT))
    expect(getByText('title')).toBeDefined()
    const screen = getByTestId('mynews-screen')
    try {
      // eslint-disable-next-line testing-library/await-async-query
      screen.findByType(Banner)
      expect(true).toBe(false)
    } catch (error) {
      const message = 'No instances found with node type: "Banner"'
      expect((error as Error).message).toBe(message)
    }
  })

  it('should navigate to home screen if user is not authenticated', async () => {
    mockUseAuth.mockImplementation(() => ({
      isAuthenticated: false,
      user: {},
    }))
    render(<MyNews />)
    await act(async () => undefined)
    expect(mockReplace).toHaveBeenLastCalledWith('Home', { screen: 'Feed' })
  })
})
