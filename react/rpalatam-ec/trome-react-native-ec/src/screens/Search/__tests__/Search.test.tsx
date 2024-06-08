import { act, cleanup, fireEvent, render } from '@testing-utils/library'
import MockAxios from 'jest-mock-axios'
import React from 'react'
import { Platform } from 'react-native'

import { Banner } from '../../../components/ad'
import { useAuth } from '../../../context/auth'
import { useFavorites } from '../../../context/favorites'
import { useMainNavigation } from '../../../context/navigation'
import { NotificationProvider } from '../../../context/notification'
import { SearchProvider } from '../../../context/search/search'
import { HomeWebviewRef } from '../../../utils/refs'
import SearchScreen from '../Search'

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

jest.mock('../../../utils/flags', () => ({ ENABLE_SCREEN_STORY: false }))

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

const arrayOfResults = Array.from({ length: 10 }).map((_, i) => ({
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
    const { getByText, getByTestId } = render(<Search />)
    const searchInput = getByTestId('search-input')
    const submitButton = getByText('Buscar')
    expect(searchInput).toBeTruthy()
    expect(submitButton).toBeDefined()
  })

  describe('search user activity', () => {
    it('should do a correct search when user type and press search-button', async () => {
      const { getByTestId, getByText } = render(<Search />)
      const searchInput = getByTestId('search-input')
      const searchTerm = 'whatever-term'
      const submitButton = getByText('Buscar')
      fireEvent.changeText(searchInput, searchTerm)
      fireEvent.press(submitButton)
      expect(getByTestId('placeholder')).toBeDefined()

      await act(async () => MockAxios.mockResponse({ data: mockRequestData }))
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
      await act(async () => MockAxios.mockResponse({ data: mockRequestData }))
      const firstTitle = mockRequestData.content_elements[0].headlines.basic
      expect(getByText(firstTitle)).toBeDefined()
    })

    it('should parse the searchterm correctly on search', async () => {
      const { getByTestId, getByText } = render(<Search />)
      const searchInput = getByTestId('search-input')
      const submitButton = getByText('Buscar')
      const unparsedTerm = 'The multiword term'
      fireEvent.changeText(searchInput, unparsedTerm)
      fireEvent.press(submitButton)

      await act(async () => MockAxios.mockResponse({ data: mockRequestData }))
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
      expect(queryByTestId('placeholder')).toBeNull()
    })

    it('should send an inverted search when user tap the order button', async () => {
      const { getByTestId } = render(<Search />)
      const input = getByTestId('search-input')
      fireEvent.changeText(input, 'search term')
      act(() => {
        input.props.onSubmitEditing()
      })
      await act(async () => MockAxios.mockResponse({ data: mockRequestData }))
      const sortButton = getByTestId('button-order')
      const { sort: defaultSort } = MockAxios.get.mock.calls.pop()?.pop().params
      fireEvent.press(sortButton)
      await act(async () => MockAxios.mockResponse({ data: mockRequestData }))
      const { sort } = MockAxios.get.mock.calls.pop()?.pop()
      expect(sort).not.toBe(defaultSort)
    })

    it('should render not results status', async () => {
      const { getByTestId, getByText } = render(<Search />)
      const searchInput = getByTestId('search-input')
      fireEvent.changeText(searchInput, 'whatever-term')
      act(() => {
        searchInput.props.onSubmitEditing()
      })
      await act(async () =>
        MockAxios.mockResponse({
          data: { content_elements: [], type: 'results' },
        }),
      )
      expect(getByText('No se encontraron resultados')).toBeDefined()
    })

    it('should render error status', async () => {
      const { getByTestId, getByText } = render(<Search />)
      const searchInput = getByTestId('search-input')
      fireEvent.changeText(searchInput, 'whatever-term')
      act(() => {
        searchInput.props.onSubmitEditing()
      })
      await act(async () => MockAxios.mockError({ message: '400' }))
      expect(getByText('Ocurrió un error inesperado')).toBeDefined()
    })

    it('should render a notification when the search fail on paginate', async () => {
      const { getByTestId, getByText } = render(<Search />)
      const input = getByTestId('search-input')
      fireEvent.changeText(input, 'sample-search text')
      act(() => {
        input.props.onSubmitEditing()
      })
      await act(async () => MockAxios.mockResponse({ data: mockRequestData }))
      const noticesList = getByTestId('search-results')
      act(() => noticesList.props.onEndReached())
      await act(async () => MockAxios.mockError({ message: '400' }))
      expect(getByText('Ocurrió un error inesperado')).toBeDefined()
    })

    it('should navigate on load result-cards', async () => {
      const { getByText, getByTestId } = render(<Search />)
      const searchInput = getByTestId('search-input')
      const submitButton = getByText('Buscar')
      fireEvent.changeText(searchInput, 'whatever-term')
      fireEvent.press(submitButton)
      expect(getByTestId('placeholder')).toBeDefined()
      await act(async () => MockAxios.mockResponse({ data: mockRequestData }))
      const notice = getByText('title_1')
      const injectJavaScript = jest.fn()

      Object.defineProperty(HomeWebviewRef, 'current', {
        value: { injectJavaScript },
      })
      fireEvent.press(notice)
      expect(mockedNavigate).toHaveBeenCalledWith('Main', {
        screen: 'Home',
        params: { screen: 'Feed' },
      })
      const javascriptArg: string = injectJavaScript.mock.calls.pop()?.pop()
      const testNoticeUrl = mockRequestData.content_elements[1].canonical_url
      expect(javascriptArg.includes(testNoticeUrl)).toBe(true)
    })

    it('should keep the last search filters when send a new search', async () => {
      const { getByTestId, getAllByTestId } = render(<Search />)
      const input = getByTestId('search-input')
      const collapseButton = getByTestId('collapse-button')

      fireEvent.changeText(input, 'term')
      fireEvent.press(collapseButton)
      const dateSelect = getByTestId('select-search-date')

      await act(async () => dateSelect.props.onValueChange('-30', 3))
      if (Platform.OS === 'ios') {
        const [, buttonSelectDate] = getAllByTestId('done-button')
        fireEvent.press(buttonSelectDate)
      }
      act(() => input.props.onSubmitEditing())
      await act(async () => MockAxios.mockResponse({ data: mockRequestData }))

      const {
        params: { q: firstQuery },
      } = MockAxios.get.mock.calls.pop()?.pop()
      expect(firstQuery.includes('last_updated_date:')).toBe(true)

      fireEvent.changeText(input, 'test term')
      act(() => {
        input.props.onSubmitEditing()
      })
      await act(async () => MockAxios.mockResponse({ data: mockRequestData }))
      const {
        params: { q: secondQuery },
      } = MockAxios.get.mock.calls.pop()?.pop()
      expect(secondQuery.includes('last_updated_date:')).toBe(true)
    })

    it('should render ad when user is not premium', async () => {
      const { getByTestId, getByText } = render(<Search />)
      const searchTerm = 'whatever-term'
      fireEvent.changeText(getByTestId('search-input'), searchTerm)
      fireEvent.press(getByText('Buscar'))

      await act(async () => MockAxios.mockResponse({ data: mockRequestData }))

      const screen = getByTestId('search-results')
      expect(screen.findAllByType(Banner)).toBeDefined()
    })

    it('should not render ad when user is premium', async () => {
      mockUseAuth.mockImplementation(() => ({
        isSubscribed: true,
      }))

      const { getByTestId, getByText } = render(<Search />)
      const searchTerm = 'whatever-term'
      fireEvent.changeText(getByTestId('search-input'), searchTerm)
      fireEvent.press(getByText('Buscar'))

      await act(async () => MockAxios.mockResponse({ data: mockRequestData }))

      const screen = getByTestId('search-results')
      try {
        screen.findByType(Banner)
        expect(true).toBe(false)
      } catch (error) {
        const message = 'No instances found with node type: "Banner"'
        expect((error as Error).message).toBe(message)
      }
    })
  })
})
