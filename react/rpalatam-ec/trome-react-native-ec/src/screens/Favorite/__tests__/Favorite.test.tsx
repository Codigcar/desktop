import { cleanup as cleanHook, renderHook } from '@testing-library/react-hooks'
import { act, cleanup, fireEvent, render } from '@testing-utils/library'
import MockAxios from 'jest-mock-axios'
import React from 'react'
import { Banner } from 'react-native-ad-manager'

import { useAuth } from '../../../context/auth'
import { FavoritesProvider, useFavorites } from '../../../context/favorites'
import {
  NavigationProvider,
  useMainNavigation,
} from '../../../context/navigation'
import { App } from '../../../utils/config'
import FavoriteScreen from '../Favorite'

App.key = 'gestion'
const Container: React.FC = ({ children }) => (
  <NavigationProvider>
    <FavoritesProvider>{children}</FavoritesProvider>
  </NavigationProvider>
)

const Favorite: React.FC = () => (
  <Container>
    <FavoriteScreen />
  </Container>
)

jest.mock('../../../context/navigation')
const mockUseMainNavigation = useMainNavigation as jest.Mock
const MockCategoriesProvider = NavigationProvider as jest.Mock

mockUseMainNavigation.mockReturnValue({
  categories: [],
})

MockCategoriesProvider.mockImplementation(({ children }) => children)

jest.mock('../../../context/auth')
const mockUseAuth = useAuth as jest.Mock

const MOCK_RESPONSE = {
  data: {
    content_elements: [
      {
        _id: '1',
        canonical_url: 'url',
        last_updated_date: 'date',
        headlines: { basic: 'headline1' },
        type: 'story',
      },
      {
        _id: '2',
        canonical_url: 'url',
        last_updated_date: 'date',
        headlines: { basic: 'headline2' },
        type: 'story',
      },
    ],
    type: 'results',
  },
}

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    goBack: jest.fn(),
    navigate: jest.fn(),
    push: jest.fn(),
  })),
  useRoute: jest.fn(() => ({
    name: '',
  })),
}))

beforeEach(() => {
  mockUseAuth.mockImplementation(() => ({
    isSubscribed: false,
    user: {},
  }))
})

afterEach(() => {
  MockAxios.reset()
  cleanup()
  cleanHook()
})

describe('Favorite Screen', () => {
  it('render empty list', async () => {
    const { getByTestId } = render(<Favorite />)
    await act(async () => undefined)
    expect(getByTestId('empty-list')).toBeDefined()
  })

  it('should render story and ad', async () => {
    const { result } = renderHook(() => useFavorites(), { wrapper: Container })
    await act(async () => {
      result.current.setFavorites().ids(['1', '2'])
    })

    const { getByTestId, getByText } = render(<Favorite />)
    await act(async () => undefined)
    await act(async () => MockAxios.mockResponse(MOCK_RESPONSE))

    const title = getByText('headline1')
    expect(title).toBeDefined()
    fireEvent.press(title)

    const screen = getByTestId('favorite-screen')
    expect(screen.findByType(Banner)).toBeDefined()
  })

  it('should not render ad when user is premium', async () => {
    mockUseAuth.mockImplementation(() => ({
      isSubscribed: true,
      user: { id: 'id' },
    }))

    const { getByTestId, getByText } = render(<Favorite />)

    const data = ['1', '2']
    await act(async () => MockAxios.mockResponse({ data: { data } }))
    await act(async () => MockAxios.mockResponse(MOCK_RESPONSE))

    expect(getByText('headline1')).toBeDefined()

    const screen = getByTestId('favorite-screen')
    try {
      screen.findByType(Banner)
      expect(true).toBe(false)
    } catch (error) {
      const message = 'No instances found with node type: "Banner"'
      expect((error as Error).message).toBe(message)
    }
  })

  it('render placeholder', async () => {
    const { result } = renderHook(() => useFavorites(), { wrapper: Container })
    await act(async () => {
      result.current.setFavorites().ids(['123'])
    })

    const { getByTestId } = render(<Favorite />)
    await act(async () => undefined)
    expect(getByTestId('placeholder')).toBeDefined()
  })
})
