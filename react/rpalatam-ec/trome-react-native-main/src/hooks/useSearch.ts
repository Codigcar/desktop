import analytics from '@react-native-firebase/analytics'
import { useNavigation } from '@react-navigation/native'
import { SubmitHandler } from '@unform/core'
import { useCallback, useEffect, useMemo, useRef } from 'react'

import useSearchHistory from './useSearchHistory'
import { useAuth } from '../context/auth'
import { useNotification } from '../context/notification'
import { useSearchContext } from '../context/search'
import { Advertising } from '../entities/Advertising'
import { Story } from '../entities/Story'
import { getFilters } from '../screens/Search/utils'
import { getAdNewsListConfig } from '../utils/advertising'
import { App } from '../utils/config'
import { insertIntoArray } from '../utils/tools'
import type { MainStackScreenProps } from '../routes/types'

type UseSearch = {
  hasResults: boolean
  handleLoadMore: (page: number) => Promise<void>
  handleSubmitSearch: SubmitHandler
  resultsWithAds: (Story | Advertising)[]
}

const useSearch = (): UseSearch => {
  const navigation =
    useNavigation<MainStackScreenProps<'Search'>['navigation']>()

  const { isSubscribed } = useAuth()
  const {
    filters,
    fetchSearch,
    orderInverse,
    results,
    status,
    hasError,
    cancelSearch,
  } = useSearchContext()
  const { saveTermFromHistory } = useSearchHistory()

  const adConfig = useRef(getAdNewsListConfig())
  const resultsWithAds = useMemo(() => {
    const { free, premium } = adConfig.current
    const adSlots = isSubscribed ? premium : free
    return insertIntoArray<Story, Advertising>(results, adSlots)
  }, [results, isSubscribed])

  const handleSubmitSearch: SubmitHandler = (data) => {
    if (!data.term) return
    if (!data.term.replace(/\s/g, '')) return
    if (App.key === 'gestion') saveTermFromHistory(data.term)

    const inputChange = filters.get('term') === data.term.trim()
    if (inputChange && status !== 'idle') return

    analytics().logSearch({ search_term: data.term.trim() })

    fetchSearch({
      fetchFilters: getFilters(filters, data),
      fetchPage: 0,
      fromZero: true,
      fetchOrderInverse: orderInverse,
    })
  }

  const handleLoadMore = useCallback(
    async (pageToLoad) => {
      await fetchSearch({
        fetchPage: pageToLoad,
        fetchFilters: filters,
        fetchOrderInverse: orderInverse,
      })

      const term = filters.get('term')
      if (term) {
        const trackParam =
          pageToLoad > 0 ? `page=${pageToLoad}` : 'ref=pullRefresh'
        analytics().logViewSearchResults({
          search_term: `${term}?${trackParam}`,
        })
      }
    },
    [filters, fetchSearch, orderInverse],
  )

  const hasResults = results.length > 0
  const notification = useNotification()

  useEffect(() => {
    if (hasError && hasResults) {
      notification.show({
        message: 'Ocurrió un error inesperado',
        type: 'error',
      })
    }
  }, [hasError, hasResults, notification])

  useEffect(() => {
    return navigation.addListener('beforeRemove', () => {
      if (status === 'started') cancelSearch()
    })
  }, [navigation, status, cancelSearch])

  return {
    hasResults,
    handleLoadMore,
    handleSubmitSearch,
    resultsWithAds,
  }
}

export default useSearch
