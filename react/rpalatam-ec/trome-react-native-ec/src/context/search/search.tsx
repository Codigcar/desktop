import crashlytics from '@react-native-firebase/crashlytics'
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
} from 'react'

import { initialState, searchReducer } from './utils'
import { Story } from '../../entities/Story'
import Content from '../../services/arc/Content'
import { getQuerySearch, queryInclude } from '../../services/arc/querys'
import { mapToObject } from '../../utils/tools'

export type FilterKeys = 'dateFrom' | 'dateTo' | 'section' | 'term' | 'order'
type SearchStatus = 'idle' | 'done' | 'started'

type SearchParams = {
  fetchPage: number
  fetchFilters: Map<FilterKeys, string>
  fetchOrderInverse?: boolean
  fromZero?: boolean
}

interface Context {
  filters: Map<FilterKeys, string>
  hasError: boolean
  hasMore: boolean
  page: number
  results: Story[]
  orderInverse: boolean
  status: SearchStatus
  termListHistory: string[]
  fetchSearch: (params: SearchParams) => Promise<void>
  cancelSearch: () => void
  resetSearch: () => void
  restoreSearch: () => void
  clearFilters: () => Promise<void>
  setTermListHistory(term: string[]): void
  toggleOrder: () => Promise<void>
}

const SearchContext = createContext<Context>({} as Context)

export const SearchProvider: React.FC = ({ children }) => {
  const [
    { status, filters, hasError, hasMore, orderInverse, page, results },
    dispatch,
  ] = useReducer(searchReducer, initialState)
  const [termListHistory, setTermListHistory] = useState<string[]>([])

  const Service = useMemo(
    () =>
      Content.search({
        params: {
          query: getQuerySearch({
            ...mapToObject(filters),
            term: filters.get('term')?.trim().replace(/\s/g, ''),
          }),
          sourceInclude: queryInclude('cards').join(),
        },
      }),
    [filters],
  )

  const cancelSearch = useCallback(() => {
    Service.abort()
    dispatch({ type: 'reset' })
  }, [Service])

  const fetchSearch = useCallback(
    async ({
      fetchPage,
      fetchFilters,
      fetchOrderInverse = false,
      fromZero,
    }: SearchParams) => {
      try {
        if (fromZero) dispatch({ type: 'init' })
        const term = fetchFilters.get('term')?.trim().replace(/\s/g, '-') + ''
        const contentResults = await Service.get({
          page: fetchPage,
          query: getQuerySearch({ ...mapToObject(fetchFilters), term }),
          sort: fetchOrderInverse
            ? 'last_updated_date:asc'
            : 'last_updated_date:desc',
        })
        const lastIds = results.slice(-10).map(({ id }) => id)
        const resultsWithoutDuplicates = contentResults.filter(
          ({ id }) => lastIds.indexOf(id) === -1,
        )
        const nextResults =
          fetchPage !== 0
            ? [...results, ...resultsWithoutDuplicates]
            : contentResults

        const lastFetchResults =
          fetchPage === 0 ? resultsWithoutDuplicates : contentResults

        dispatch({
          type: 'success',
          payload: {
            results: nextResults,
            filters: fetchFilters,
            orderInverse: fetchOrderInverse,
            hasMore: lastFetchResults.length >= 10,
            page: fetchPage,
          },
        })
      } catch (error) {
        if (!error.message.includes('canceled')) {
          crashlytics().recordError(error)
          dispatch({ type: 'failure' })
          return
        }
        dispatch({ type: 'reset' })
      }
    },
    [Service, results],
  )

  const clearFilters = useCallback(async () => {
    const nextFilters = new Map<FilterKeys, string>()
    const searchTerm = filters.get('term') || ''
    nextFilters.set('term', searchTerm)
    if (filters.has('section') || filters.has('dateFrom')) {
      await fetchSearch({
        fetchPage: 0,
        fetchFilters: nextFilters,
        fromZero: true,
        fetchOrderInverse: orderInverse,
      })
    } else {
      dispatch({ type: 'clear', payload: { searchTerm } })
    }
  }, [fetchSearch, filters, orderInverse])

  const resetSearch = useCallback(() => {
    Service.abort()
    dispatch({ type: 'clear' })
  }, [Service])

  const restoreSearch = useCallback(() => {
    dispatch({ type: 'restore' })
  }, [])

  const toggleOrder = useCallback(async () => {
    await fetchSearch({
      fetchPage: 0,
      fetchFilters: filters,
      fetchOrderInverse: !orderInverse,
      fromZero: true,
    })
  }, [filters, orderInverse, fetchSearch])

  return (
    <SearchContext.Provider
      value={{
        clearFilters,
        fetchSearch,
        cancelSearch,
        hasError,
        hasMore,
        resetSearch,
        restoreSearch,
        results,
        orderInverse,
        page,
        filters,
        status,
        toggleOrder,
        termListHistory,
        setTermListHistory,
      }}>
      {children}
    </SearchContext.Provider>
  )
}

export const useSearchContext = (): Context => useContext(SearchContext)
