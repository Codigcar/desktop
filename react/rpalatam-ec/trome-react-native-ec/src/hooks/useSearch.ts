import analytics from '@react-native-firebase/analytics'
import { SubmitHandler } from '@unform/core'
import { useCallback, useRef, useState } from 'react'
import { Keyboard } from 'react-native'

import { useSearchContext } from '../context/search'
import type { FilterKeys } from '../context/search'

type UseSearch = {
  handleLoadMore: (pageToLoad: number) => Promise<void>
  searchTerm: string
  submitSearch: SubmitHandler<{ term?: string; section: string }>
  radioGroupRef: React.MutableRefObject<string | undefined>
}

export const useSearch = (): UseSearch => {
  const radioGroupRef = useRef<string>()
  const { filters, fetchSearch, resetSearch } = useSearchContext()

  const [searchTerm, setSearchTerm] = useState<string>('')
  const submitSearch: SubmitHandler<{ term?: string; section: string }> = (
    data,
  ) => {
    Keyboard.dismiss()
    const term = data.term?.trim()
    if (!term) return

    setSearchTerm(term)
    resetSearch()
    const nextFilters = new Map<FilterKeys, string>()
    nextFilters.set('term', term)
    nextFilters.set('section', data.section)

    const orderPost = radioGroupRef.current || filters.get('order')
    nextFilters.set('order', orderPost || 'data_recent')

    analytics().logSearch({
      search_term: nextFilters.get('term') as string,
    })

    fetchSearch({
      fetchFilters: nextFilters,
      fetchPage: 0,
      fromZero: true,
      fetchOrderInverse: radioGroupRef.current === 'data_leastRecent',
    })
  }

  const handleLoadMore = useCallback(
    async (pageToLoad) => {
      await fetchSearch({
        fetchPage: pageToLoad,
        fetchFilters: filters,
        fetchOrderInverse: radioGroupRef.current === 'data_leastRecent',
      })

      const term = filters.get('term')
      if (!term) return

      analytics().logViewSearchResults({
        search_term: `${term}?page=${pageToLoad}`,
      })
    },
    [filters, fetchSearch],
  )

  return {
    handleLoadMore,
    searchTerm,
    submitSearch,
    radioGroupRef,
  }
}
