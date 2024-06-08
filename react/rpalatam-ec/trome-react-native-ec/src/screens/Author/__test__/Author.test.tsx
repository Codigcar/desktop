import { useNavigation, useRoute } from '@react-navigation/native'
import { act, cleanup, fireEvent, render } from '@testing-utils/library'
import MockAxios from 'jest-mock-axios'
import React from 'react'
import { Banner } from 'react-native-ad-manager'

import { useAuth } from '../../../context/auth'
import { FavoritesProvider } from '../../../context/favorites'
import { NavigationProvider } from '../../../context/navigation'
import AuthorScreen from '../Author'

const Component: React.FC = () => (
  <NavigationProvider>
    <FavoritesProvider>
      <AuthorScreen />
    </FavoritesProvider>
  </NavigationProvider>
)

const MOCK_RESPONSE = {
  data: {
    content_elements: [
      {
        _id: '1',
        canonical_url: 'url',
        last_updated_date: 'date',
        headlines: { basic: 'title_one' },
        type: 'story',
      },
    ],
    type: 'results',
  },
}

jest.mock('@react-navigation/native')
const mockUseNavigation = useNavigation as jest.Mock
const mockUseRoute = useRoute as jest.Mock
mockUseNavigation.mockImplementation(() => ({
  navigate: jest.fn(),
  push: jest.fn(),
}))
mockUseRoute.mockImplementation(() => ({
  params: {
    name: 'Author Name',
    path: 'author-slug',
  },
}))

jest.mock('../../../context/auth')
const mockUseAuth = useAuth as jest.Mock

beforeEach(() => {
  mockUseAuth.mockImplementation(() => ({
    isSubscribed: false,
    user: {},
  }))
})

afterEach(() => {
  MockAxios.reset()
  cleanup()
})

describe('Author screen page', () => {
  it('should render card and ad', async () => {
    const { getByTestId, getByText } = render(<Component />)
    await act(async () => undefined)
    expect(getByTestId('placeholder')).toBeDefined()
    await act(async () => MockAxios.mockResponse(MOCK_RESPONSE))

    const title = getByText('title_one')
    expect(title).toBeDefined()
    fireEvent.press(title)

    const screen = getByTestId('author-screen')
    expect(screen.findByType(Banner)).toBeDefined()
  })

  it('should not render ad when user is premium', async () => {
    mockUseAuth.mockImplementation(() => ({
      isSubscribed: true,
      user: { id: 'id' },
    }))

    const { getByTestId, getByText } = render(<Component />)
    await act(async () => MockAxios.mockResponse(MOCK_RESPONSE))

    expect(getByText('title_one')).toBeDefined()

    const screen = getByTestId('author-screen')
    try {
      screen.findByType(Banner)
      expect(true).toBe(false)
    } catch (error) {
      const message = 'No instances found with node type: "Banner"'
      expect((error as Error).message).toBe(message)
    }
  })

  describe('author params', () => {
    it('author name is defined', async () => {
      const { getByText } = render(<Component />)
      await act(async () => undefined)
      expect(getByText('Author Name')).toBeDefined()
    })

    it('set navigation screen params', async () => {
      const setParams = jest.fn()
      mockUseNavigation.mockImplementationOnce(() => ({ setParams }))
      mockUseRoute.mockImplementationOnce(() => ({
        params: { path: 'author-slug' },
      }))
      render(<Component />)
      const response = {
        byline: 'author-first-name author-last-name',
      }
      await act(async () =>
        MockAxios.mockResponse({ data: { authors: [response] } }),
      )
      expect(setParams).toBeCalledWith({
        name: 'author-first-name author-last-name',
        path: 'author-slug',
      })
    })

    it('set navigation screen params whem data is blank', async () => {
      const setParams = jest.fn()
      mockUseNavigation.mockImplementationOnce(() => ({ setParams }))
      mockUseRoute.mockImplementationOnce(() => ({
        params: { path: 'author-slug' },
      }))
      render(<Component />)
      await act(async () => MockAxios.mockResponse({ data: { authors: [] } }))
      expect(setParams).toBeCalledWith({
        name: 'Autor',
        path: 'author-slug',
      })
    })
  })
})
