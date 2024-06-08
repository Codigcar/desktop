import { act, renderHook } from '@testing-library/react-hooks'
import MockAxios from 'jest-mock-axios'

import { useAuth } from '../../context/auth'
import { useMainNavigation } from '../../context/navigation'
import { useNotification } from '../../context/notification'
import { useSearchContext } from '../../context/search'
import { Advertising } from '../../entities/Advertising'
import { App } from '../../utils/config'
import useSearch from '../useSearch'

const searchProvider = (props = {}) => ({
  clearFilters: jest.fn(),
  filters: new Map([['term', 'text']]),
  orderInverse: false,
  resetSearch: jest.fn(),
  results: [],
  status: 'done',
  toggleOrder: jest.fn(),
  termListHistory: [],
  ...props,
})

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    addListener: jest.fn(),
  })),
}))

jest.mock('../../context/search')
const mockSearchContext = useSearchContext as jest.Mock

jest.mock('../../context/navigation')
const mockUseMainNavigation = useMainNavigation as jest.Mock

jest.mock('../../context/auth')
const mockUseAuth = useAuth as jest.Mock

jest.mock('../../context/notification')
const MockUseNotification = useNotification as jest.Mock

const mocklogViewSearchResults = jest.fn()
const mocklogSearch = jest.fn()
jest.mock('@react-native-firebase/analytics', () =>
  jest.fn(() => ({
    logViewSearchResults: mocklogViewSearchResults,
    logSearch: mocklogSearch,
  })),
)

const mockSaveTermFromHistory = jest.fn()
jest.mock('../useSearchHistory', () =>
  jest.fn(() => ({
    saveTermFromHistory: mockSaveTermFromHistory,
  })),
)

beforeEach(() => {
  mockSearchContext.mockImplementation(() => searchProvider())
  MockAxios.reset()
  mockUseAuth.mockImplementation(() => ({
    isSubscribed: false,
  }))
})

beforeAll(() => {
  mockUseMainNavigation.mockReturnValue({ categories: [], mainNavigation: [] })
})

const arrayOfResults = Array.from({ length: 2 }).map((_, i) => ({
  id: `${i}`,
  url: `/url${i}`,
  last_updated_date: 'date',
  headline: `title_${i}`,
}))

describe('useSearch', () => {
  it('should show result with ads', async () => {
    mockSearchContext.mockImplementation(() =>
      searchProvider({ results: arrayOfResults }),
    )
    const { result } = renderHook(() => useSearch())

    await act(async () => undefined)

    const existAds = result.current.resultsWithAds.filter(
      (item) => item instanceof Advertising,
    )

    expect(existAds[0]).toBeDefined()
  })

  it('should not show result with ads', async () => {
    mockUseAuth.mockImplementation(() => ({
      isSubscribed: true,
    }))
    mockSearchContext.mockImplementation(() =>
      searchProvider({ results: arrayOfResults }),
    )
    const { result } = renderHook(() => useSearch())

    await act(async () => undefined)

    const existAds = result.current.resultsWithAds.filter(
      (item) => item instanceof Advertising,
    )

    expect(existAds[0]).toBeUndefined()
  })

  it('should show a notification when exist a error', () => {
    const fnShow = jest.fn()
    MockUseNotification.mockReturnValue({ show: fnShow })
    mockSearchContext.mockImplementation(() =>
      searchProvider({ results: arrayOfResults, hasError: true }),
    )
    const { result } = renderHook(() => useSearch())

    expect(result.current.hasResults).toBeTruthy()
    expect(fnShow).toBeCalledWith({
      message: 'Ocurrió un error inesperado',
      type: 'error',
    })
  })

  it('should load more results', async () => {
    const mockFetchSearch = jest.fn()
    mockSearchContext.mockImplementation(() =>
      searchProvider({ results: arrayOfResults, fetchSearch: mockFetchSearch }),
    )
    const { result } = renderHook(() => useSearch())

    await act(async () => result.current.handleLoadMore(2))
    const defaultSearch = searchProvider()
    expect(mockFetchSearch).toBeCalledWith({
      fetchPage: 2,
      fetchFilters: defaultSearch.filters,
      fetchOrderInverse: defaultSearch.orderInverse,
    })
  })

  it('should set term in analytics', async () => {
    mockSearchContext.mockImplementation(() =>
      searchProvider({ results: arrayOfResults, fetchSearch: jest.fn() }),
    )
    const { result } = renderHook(() => useSearch())

    await act(async () => result.current.handleLoadMore(2))

    expect(mocklogViewSearchResults).toBeCalledWith({
      search_term: `text?page=2`,
    })
  })

  it('should not called fetchSearch if term is blank', async () => {
    const mockFetchSearch = jest.fn()
    mockSearchContext.mockImplementation(() =>
      searchProvider({ results: arrayOfResults, fetchSearch: mockFetchSearch }),
    )
    const { result } = renderHook(() => useSearch())

    await act(async () =>
      result.current.handleSubmitSearch(
        { term: '  ' },
        {
          reset: jest.fn(),
        },
      ),
    )

    expect(mockFetchSearch).not.toBeCalled()
  })

  it('should saved term in storage', async () => {
    App.key = 'gestion'
    mockSearchContext.mockImplementation(() =>
      searchProvider({ results: arrayOfResults, fetchSearch: jest.fn() }),
    )
    const { result } = renderHook(() => useSearch())

    await act(async () =>
      result.current.handleSubmitSearch(
        { term: 'text' },
        {
          reset: jest.fn(),
        },
      ),
    )

    expect(mockSaveTermFromHistory).toBeCalledWith('text')
  })

  it('if term in filters is equal to term in data, should not called to fetchSearch', async () => {
    const mockFetchSearch = jest.fn()
    mockSearchContext.mockImplementation(() =>
      searchProvider({ results: arrayOfResults, fetchSearch: mockFetchSearch }),
    )
    const { result } = renderHook(() => useSearch())

    await act(async () =>
      result.current.handleSubmitSearch(
        { term: 'text' },
        {
          reset: jest.fn(),
        },
      ),
    )

    expect(mockFetchSearch).not.toBeCalled()
  })

  it('if term in filters is not equal to term in data, should called to fetchSearch', async () => {
    const mockFetchSearch = jest.fn()
    mockSearchContext.mockImplementation(() =>
      searchProvider({
        results: arrayOfResults,
        fetchSearch: mockFetchSearch,
        status: 'started',
      }),
    )
    const { result } = renderHook(() => useSearch())

    await act(async () =>
      result.current.handleSubmitSearch(
        { term: 'text_1' },
        {
          reset: jest.fn(),
        },
      ),
    )

    expect(mocklogSearch).toBeCalledWith({ search_term: 'text_1' })
    expect(mockFetchSearch).toBeCalledWith({
      fetchFilters: new Map([['term', 'text_1']]),
      fetchPage: 0,
      fromZero: true,
      fetchOrderInverse: false,
    })
  })
})
