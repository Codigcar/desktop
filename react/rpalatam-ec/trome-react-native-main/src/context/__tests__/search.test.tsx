import { act, cleanup, renderHook } from '@testing-library/react-hooks'
import MockAxios from 'jest-mock-axios'
import React from 'react'

import { FilterKeys, SearchProvider, useSearchContext } from '../search'
import { searchReducer } from '../search/utils'

beforeEach(cleanup)

function mockAxiosResponse() {
  MockAxios.get.mockResolvedValue({
    data: {
      content_elements: [],
      type: 'results',
    },
  })
}

describe('search context', () => {
  const wrapper: React.FC = ({ children }) => (
    <SearchProvider>{children}</SearchProvider>
  )

  beforeAll(mockAxiosResponse)

  it('should send a search request with provided params', async () => {
    const { result } = renderHook(() => useSearchContext(), { wrapper })

    const term = 'whatever-term'
    const fetchPage = 0

    await act(async () => {
      const fetchFilters = new Map()
      fetchFilters.set('term', term)

      await result.current.fetchSearch({
        fetchPage,
        fetchFilters,
      })
    })
    const { params } = MockAxios.get.mock.calls.pop()?.pop()
    expect(params.q.includes(term)).toBe(true)
    expect(params.from).toBe(fetchPage)
  })

  it('should send an inverted order on call toggleOrder', async () => {
    const { result } = renderHook(() => useSearchContext(), { wrapper })

    await act(async () => {
      await result.current.fetchSearch({
        fetchFilters: new Map(),
        fetchPage: 0,
      })
    })
    const { sort: defaultSort } = MockAxios.get.mock.calls.pop()?.pop().params

    await act(async () => {
      await result.current.toggleOrder()
    })
    const { sort: invertedSort } = MockAxios.get.mock.calls.pop()?.pop().params
    expect(invertedSort).not.toBe(defaultSort)
  })

  it('should clear the filters present in request', async () => {
    const { result } = renderHook(() => useSearchContext(), { wrapper })
    const section = 'politica'
    const initialOrder = 'asc'

    await act(async () => {
      const fetchFilters = new Map<FilterKeys, string>()
      fetchFilters.set('section', section)
      await result.current.fetchSearch({
        fetchFilters,
        fetchPage: 0,
      })
    })
    const {
      params: { q },
    } = MockAxios.get.mock.calls.pop()?.pop()

    expect(q.includes(section)).toBe(true)

    await act(async () => await result.current.toggleOrder())
    await act(async () => await result.current.clearFilters())

    const {
      params: { q: query, sort },
    } = MockAxios.get.mock.calls.pop()?.pop()

    expect(query.includes(section)).toBe(false)
    expect(sort.includes(initialOrder)).toBe(true)
  })

  it('the state should be initial on reset', async () => {
    const { result } = renderHook(() => useSearchContext(), { wrapper })
    await act(async () => {
      await result.current.fetchSearch({
        fetchFilters: new Map(),
        fetchPage: 0,
      })
    })
    const fetchStatus = result.current.status
    act(() => result.current.resetSearch())
    expect(fetchStatus).not.toBe(result.current.status)
  })

  describe('search reducer', () => {
    it('should clear the state', () => {
      const searchTerm = 'test'
      const state = searchReducer(undefined, {
        type: 'clear',
        payload: { searchTerm },
      })
      expect(state.filters.get('term')).toBe(searchTerm)
    })
  })
})
