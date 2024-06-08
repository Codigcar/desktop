import { renderHook } from '@testing-library/react-hooks'

import { useSearchContext } from '../../context/search'
import { STORE_SEARCH_HISTORY } from '../../utils/constants'
import { storage } from '../../utils/storage'
import useSearchHistory from '../useSearchHistory'

const searchProvider = (props = {}) => ({
  clearFilters: jest.fn(),
  filters: new Map([['term', 'text']]),
  orderInverse: false,
  resetSearch: jest.fn(),
  results: [],
  status: 'done',
  toggleOrder: jest.fn(),
  termListHistory: [],
  setTermListHistory: jest.fn(),
  ...props,
})

jest.mock('../../context/search')
const mockSearchContext = useSearchContext as jest.Mock

beforeEach(() => {
  mockSearchContext.mockImplementation(() => searchProvider())
})

describe('useSearchHistory', () => {
  afterEach(() => {
    storage.clearAll()
  })

  it('should save one element in the list', () => {
    const value = 'test-1'
    const { result } = renderHook(() => useSearchHistory())
    result.current.saveTermFromHistory(value)
    const termList = storage.getString(STORE_SEARCH_HISTORY)
    expect(termList).toEqual(JSON.stringify([value]))
  })

  it('should formated one element before saved in the list', () => {
    const value = '          test               -           1            '
    const { result } = renderHook(() => useSearchHistory())
    result.current.saveTermFromHistory(value)
    const termList = storage.getString(STORE_SEARCH_HISTORY)
    expect(termList).toEqual(JSON.stringify(['test - 1']))
  })

  it('should removed one element of list', () => {
    const value = 'test-1'
    const { result } = renderHook(() => useSearchHistory())
    result.current.removeTermFromHistory(value)
    const termList = storage.getString(STORE_SEARCH_HISTORY)
    expect(termList).toEqual(JSON.stringify([]))
  })
})
