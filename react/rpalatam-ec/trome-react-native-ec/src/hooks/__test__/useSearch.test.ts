import { act, renderHook } from '@testing-library/react-hooks'

import { FilterKeys, useSearchContext } from '../../context/search'
import { useSearch } from '../useSearch'

jest.mock('../../context/search')
const mockUseSearch = useSearchContext as jest.Mock
mockUseSearch.mockReturnValue({
  handleLoadMore: jest.fn(),
  searchTerm: '',
  submitSearch: jest.fn(),
})

describe('useSearch', () => {
  const form = { term: 'ceviche', section: '' }
  const filters = new Map<FilterKeys, string>()

  it('should get results successfully', async () => {
    const fetchSearch = jest.fn()
    const resetSearch = jest.fn()
    mockUseSearch.mockReturnValue({
      fetchSearch,
      resetSearch,
      filters,
    })
    const { result } = renderHook(() => useSearch())

    const reset = jest.fn()
    await act(() => result.current.submitSearch(form, { reset }))

    expect(fetchSearch).toBeCalled()
  })

  it('should get more successful results', async () => {
    const fetchSearch = jest.fn()
    mockUseSearch.mockReturnValue({
      fetchSearch,
      filters,
    })
    const { result } = renderHook(() => useSearch())

    await act(() => result.current.handleLoadMore(2))

    expect(fetchSearch).toBeCalled()
  })

  describe('Errors', () => {
    it('the method should not be called to get results if the term is empty', async () => {
      const fetchSearch = jest.fn()
      mockUseSearch.mockReturnValue({
        fetchSearch,
      })
      const { result } = renderHook(() => useSearch())

      const reset = jest.fn()
      await act(() =>
        result.current.submitSearch(
          { term: undefined, section: '' },
          { reset },
        ),
      )

      expect(fetchSearch).not.toBeCalled()
    })
  })
})
