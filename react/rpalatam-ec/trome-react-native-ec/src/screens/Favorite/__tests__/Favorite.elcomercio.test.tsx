import { cleanup, fireEvent, render } from '@testing-utils/library'
import React from 'react'
import { Banner } from 'react-native-ad-manager'

import { useAuth } from '../../../context/auth'
import { useFavorites } from '../../../context/favorites'
import { App } from '../../../utils/config'
import Favorite from '../Favorite.elcomercio'

App.key = 'elcomercio'

jest.mock('../../../context/navigation', () => ({
  useMainNavigation: jest.fn().mockImplementation(() => ({ categories: [] })),
}))

jest.mock('../../../context/auth')
const mockUseAuth = useAuth as jest.Mock
mockUseAuth.mockImplementation(() => ({
  isSubscribed: false,
  user: {},
}))

jest.mock('../../../context/favorites')
const mockUseFavorites = useFavorites as jest.Mock
mockUseFavorites.mockImplementation(() => ({
  favorites: [],
  getFavorites: jest.fn().mockImplementation(() => ({
    ids: [],
  })),
  stories: [],
}))

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({ push: jest.fn() })),
  useRoute: jest.fn(),
}))

afterEach(() => {
  cleanup()
})

describe('Favorite Screen', () => {
  it('render empty list', () => {
    const { getByTestId } = render(<Favorite />)
    expect(getByTestId('empty-list')).toBeDefined()
  })

  it('should render story and ad', () => {
    mockUseAuth.mockImplementation(() => ({
      isSubscribed: false,
      isAuthenticated: true,
      user: { id: 'id' },
    }))
    mockUseFavorites.mockImplementation(() => ({
      favorites: ['LIVI72437NDOHE6AQVUBW7YVFQ'],
      getFavorites: jest.fn().mockImplementation(() => ({
        ids: ['LIVI72437NDOHE6AQVUBW7YVFQ'],
      })),
      stories: [
        {
          id: 'LIVI72437NDOHE6AQVUBW7YVFQ',
          headline: 'headline',
        },
      ],
    }))
    const { getByTestId, getByText } = render(<Favorite />)

    const title = getByText('headline')
    expect(title).toBeDefined()
    fireEvent.press(title)

    const screen = getByTestId('favorite-screen')
    // eslint-disable-next-line testing-library/await-async-query
    expect(screen.findByType(Banner)).toBeDefined()
  })

  it('should not render ad when user is premium', () => {
    mockUseAuth.mockImplementation(() => ({
      isSubscribed: true,
      isAuthenticated: true,
      user: { id: 'id' },
    }))

    mockUseFavorites.mockImplementation(() => ({
      favorites: ['LIVI72437NDOHE6AQVUBW7YVFQ'],
      getFavorites: jest.fn().mockImplementation(() => ({
        ids: ['LIVI72437NDOHE6AQVUBW7YVFQ'],
      })),
      stories: [
        {
          id: 'LIVI72437NDOHE6AQVUBW7YVFQ',
          headline: 'headline',
        },
      ],
    }))

    const { getByTestId, getByText } = render(<Favorite />)

    expect(getByText('headline')).toBeDefined()
    const screen = getByTestId('favorite-screen')
    try {
      // eslint-disable-next-line testing-library/await-async-query
      screen.findByType(Banner)
      expect(true).toBe(false)
    } catch (error) {
      const message = 'No instances found with node type: "Banner"'
      expect((error as Error).message).toBe(message)
    }
  })
})
