import { act, cleanup, fireEvent, render } from '@testing-utils/library'
import MockAxios from 'jest-mock-axios'
import React from 'react'

import { useAuth } from '../../../context/auth'
import { useFavorites } from '../../../context/favorites'
import { useMainNavigation } from '../../../context/navigation'
import { NotificationProvider } from '../../../context/notification'
import { SearchProvider } from '../../../context/search/search'
import SearchScreen from '../Search.gestion'

const Search: React.FC = () => (
  <NotificationProvider>
    <SearchProvider>
      <SearchScreen />
    </SearchProvider>
  </NotificationProvider>
)

const mockedNavigate = jest.fn()
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    navigate: mockedNavigate,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  })),
  useRoute: jest.fn(() => ({
    name: 'Buscador',
  })),
}))

jest.mock('../../../context/auth')
const mockUseAuth = useAuth as jest.Mock

jest.mock('../../../context/favorites')
const MockFavorites = useFavorites as jest.Mock

jest.mock('../../../context/navigation')
const MockCategories = useMainNavigation as jest.Mock

beforeAll(() => {
  MockFavorites.mockImplementation(() => ({
    favorites: [],
    toggleFavorite: jest.fn(),
  }))
  MockCategories.mockReturnValue({
    categories: [],
  })
})

beforeEach(() => {
  MockAxios.reset()
  mockUseAuth.mockImplementation(() => ({
    isSubscribed: false,
  }))
})

afterEach(cleanup)

const arrayOfResults = Array.from({ length: 11 }).map((_, i) => ({
  _id: `${i}`,
  canonical_url: `/url${i}`,
  last_updated_date: 'date',
  headlines: { basic: `title_${i}` },
  type: 'story',
}))

const mockRequestData = {
  content_elements: arrayOfResults,
  type: 'results',
}

describe('Search screen page', () => {
  it('render without crashing', () => {
    const { getByTestId } = render(<Search />)
    const searchInput = getByTestId('search-input')
    expect(searchInput).toBeTruthy()
  })

  describe('search user activity', () => {
    it('should do a correct search when user type and press search-button', async () => {
      const { getByTestId } = render(<Search />)
      const searchInput = getByTestId('search-input')
      const searchTerm = 'whatever-term'
      const input = getByTestId('search-input')
      fireEvent.changeText(searchInput, searchTerm)
      act(() => {
        input.props.onSubmitEditing()
      })
      expect(getByTestId('status-started')).toBeDefined()

      await act(async () =>
        MockAxios.mockResponseFor(
          { url: '/search' },
          { data: mockRequestData },
        ),
      )
      const {
        params: { from, q: query },
      } = MockAxios.get.mock.calls.pop()?.pop()
      expect(from).toBe(0)
      expect(query.includes(searchTerm)).toBe(true)
    })

    it('should render the search results when response is success', async () => {
      const { getByTestId, getByText } = render(<Search />)
      const input = getByTestId('search-input')
      fireEvent.changeText(input, 'search-term')
      act(() => {
        input.props.onSubmitEditing()
      })
      await act(async () =>
        MockAxios.mockResponseFor(
          { url: '/search' },
          { data: mockRequestData },
        ),
      )
      const firstTitle = mockRequestData.content_elements[0].headlines.basic
      expect(getByText(firstTitle)).toBeDefined()
    })

    it('should parse the searchterm correctly on search', async () => {
      const { getByTestId } = render(<Search />)
      const input = getByTestId('search-input')
      const searchInput = getByTestId('search-input')
      const unparsedTerm = 'The multiword term'
      fireEvent.changeText(searchInput, unparsedTerm)
      act(() => {
        input.props.onSubmitEditing()
      })

      await act(async () =>
        MockAxios.mockResponseFor(
          { url: '/search' },
          { data: mockRequestData },
        ),
      )
      const { params } = MockAxios.get.mock.calls.pop()?.pop()
      const parsedTerm = unparsedTerm.trim().toLowerCase().replace(/\s/g, '-')
      expect(params.q.includes(parsedTerm)).toBe(true)
    })

    it("the user shouldn't send a request with empty term", () => {
      const { getByTestId, queryByTestId } = render(<Search />)
      const input = getByTestId('search-input')
      fireEvent.changeText(input, '')
      act(() => {
        input.props.onSubmitEditing()
      })
      expect(queryByTestId('status-started')).toBeNull()
    })

    it('should send an inverted search when user tap the order button', async () => {
      const { getByTestId } = render(<Search />)
      const input = getByTestId('search-input')
      fireEvent.changeText(input, 'search term')
      act(() => {
        input.props.onSubmitEditing()
      })
      await act(async () =>
        MockAxios.mockResponseFor(
          { url: '/search' },
          { data: mockRequestData },
        ),
      )
      const sortButton = getByTestId('button-order')
      const { sort: defaultSort } = MockAxios.get.mock.calls.pop()?.pop().params
      fireEvent.press(sortButton)
      await act(async () =>
        MockAxios.mockResponseFor(
          { url: '/search' },
          { data: mockRequestData },
        ),
      )
      const { sort } = MockAxios.get.mock.calls.pop()?.pop()
      expect(sort).not.toBe(defaultSort)
    })

    it('should render a notification when the search fail on paginate', async () => {
      const { getByTestId, getByText } = render(<Search />)
      const input = getByTestId('search-input')
      fireEvent.changeText(input, 'sample-search text')
      act(() => {
        input.props.onSubmitEditing()
      })
      await act(async () =>
        MockAxios.mockResponseFor({ url: '/search' }, { data: [] }),
      )
      await act(async () => MockAxios.mockError({ message: '400' }))
      expect(getByText('Ocurrió un error inesperado')).toBeDefined()
    })

    it('should navigate on load result-cards', async () => {
      const { getByText } = render(<Search />)
      MockAxios.mockResponseFor(
        { url: '/premium/top.json' },
        { data: ['qwe', 'sad', 'zxc'] },
      )
      await act(async () => undefined)

      MockAxios.mockResponseFor({ url: '/ids' }, { data: mockRequestData })
      await act(async () => undefined)

      const notice = getByText('title_1')

      fireEvent.press(notice)
      expect(mockedNavigate).toHaveBeenCalledWith('Main', {
        screen: 'Home',
        params: { screen: 'Feed' },
      })
    })

    it('should content only 10 elements', async () => {
      const { getByText, queryByText } = render(<Search />)
      MockAxios.mockResponseFor(
        { url: '/premium/top.json' },
        { data: ['qwe', 'sad', 'zxc'] },
      )
      await act(async () => undefined)

      MockAxios.mockResponseFor({ url: '/ids' }, { data: mockRequestData })
      await act(async () => undefined)

      const notice = getByText('title_10')

      fireEvent.press(notice)
      expect(mockedNavigate).toHaveBeenCalledWith('Main', {
        screen: 'Home',
        params: { screen: 'Feed' },
      })

      expect(queryByText('title_11')).toBeNull()
    })
  })
})
