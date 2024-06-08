import analytics from '@react-native-firebase/analytics'
import { useNavigation } from '@react-navigation/native'
import { FormHandles, SubmitHandler } from '@unform/core'
import { Form } from '@unform/mobile'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native'

import SearchAdvanced from './SearchAdvanced'
import SearchHeader from './SearchHeader'
import { computeEstimatedDate, parseDate } from './utils'
import Box from '../../components/box'
import Card, { CardPlaceholder } from '../../components/card'
import Typography from '../../components/typography'
import InfiniteScrollList, {
  ItemAdvertising,
} from '../../containers/infiniteScrollList'
import { useAuth } from '../../context/auth'
import { useNotification } from '../../context/notification'
import { FilterKeys, useSearchContext } from '../../context/search'
import { Advertising } from '../../entities/Advertising'
import { Story } from '../../entities/Story'
import useOpenStory from '../../hooks/useOpenStory'
import useSearchHistory from '../../hooks/useSearchHistory'
import { getAdNewsListConfig } from '../../utils/advertising'
import { insertIntoArray } from '../../utils/tools'
import type { MainStackScreenProps } from '../../routes/types'
import type { AllProps } from '../../theme/index'

const formContainerStyles = Platform.select<AllProps>({
  android: {},
  default: { zIndex: 1 },
})

const TemplateMessage: React.FC<{ message: string }> = React.memo(
  ({ message }) => (
    <Box.View pt="3" px="2">
      <Typography.Paragraph
        color="coolGray-700"
        fontSize="3xl"
        fontWeight="light"
        textAlign="center">
        {message}
      </Typography.Paragraph>
    </Box.View>
  ),
)

const SearchScreen: React.FC = () => {
  const navigation =
    useNavigation<MainStackScreenProps<'Search'>['navigation']>()
  const { isSubscribed } = useAuth()
  const {
    filters,
    fetchSearch,
    cancelSearch,
    orderInverse,
    results,
    status,
    page,
    hasError,
    hasMore,
  } = useSearchContext()
  const { saveTermFromHistory } = useSearchHistory()

  const formRef = useRef<FormHandles>(null)

  const adConfig = useRef(getAdNewsListConfig())
  const resultsWithAds = useMemo(() => {
    const { free, premium } = adConfig.current
    const adSlots = isSubscribed ? premium : free
    return insertIntoArray<Story, Advertising>(results, adSlots)
  }, [results, isSubscribed])

  const handleSubmitSearch: SubmitHandler = (data) => {
    if (!data.term) return
    if (!data.term.replace(/\s/g, '')) return
    saveTermFromHistory(data.term)

    const inputChange = filters.get('term') === data.term.trim()
    if (inputChange && status !== 'idle') return

    const nextFilters = new Map<FilterKeys, string>()
    nextFilters.set('term', data.term.trim())

    const lastSection = filters.get('section')
    if (lastSection && !data.section) nextFilters.set('section', lastSection)
    if (data.section) nextFilters.set('section', data.section)

    if (data.searchDate && data.searchDate !== 'custom') {
      nextFilters.set('dateFrom', computeEstimatedDate(+data.searchDate))
    }

    if (data.searchDate === 'custom') {
      const parsedFrom = parseDate(data.dateFrom)
      const parsedTo = parseDate(data.dateTo)
      if (parsedFrom) nextFilters.set('dateFrom', parsedFrom)
      if (parsedTo) nextFilters.set('dateTo', parsedTo)
    }

    const dateFrom = filters.get('dateFrom')
    const dateTo = filters.get('dateTo')
    if (!data.dateFrom && dateFrom) nextFilters.set('dateFrom', dateFrom)
    if (!data.dateTo && dateTo) nextFilters.set('dateTo', dateTo)

    analytics().logSearch({
      search_term: nextFilters.get('term') || '',
    })

    fetchSearch({
      fetchFilters: nextFilters,
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

  const openStory = useOpenStory('Buscador')

  const renderItem = useCallback(
    ({ item }: { item: Story | Advertising }) => {
      if (item instanceof Advertising) return <ItemAdvertising item={item} />
      return (
        <Card onPress={() => openStory(item)} story={item} variant="magazine" />
      )
    },
    [openStory],
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
    const backHandler = () => {
      if (status === 'started') cancelSearch()
      return
    }
    navigation.addListener('beforeRemove', backHandler)
    return () => {
      navigation.removeListener('beforeRemove', backHandler)
    }
  }, [navigation, status, cancelSearch])

  return (
    <Box.View bg="background" flex={1}>
      <Box.View {...formContainerStyles}>
        <Form ref={formRef} onSubmit={handleSubmitSearch}>
          <SearchHeader ref={formRef} />
          {status === 'idle' ? <SearchAdvanced ref={formRef} /> : null}
        </Form>
      </Box.View>
      <Box.View flex={1}>
        {status === 'idle' ? (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Box.View flex={1} />
          </TouchableWithoutFeedback>
        ) : null}
        {status === 'started' ? (
          <Box.View flex={1} px="0.75">
            <CardPlaceholder repeat={8} variant="magazine" />
          </Box.View>
        ) : null}
        {hasError && !hasResults ? (
          <TemplateMessage message="Ocurrió un error inesperado" />
        ) : null}
        {status === 'done' ? (
          <InfiniteScrollList
            testID="search-results"
            pullRefresh
            initialPage={page}
            data={resultsWithAds}
            keyExtractor={(item) => item.id}
            loadMore={handleLoadMore}
            hasMore={results.length < 50 && !!hasMore}
            renderItem={renderItem}
            ItemSeparatorComponent={() => (
              <Box.View px="1">
                <Box.View height={1} bg="separator" />
              </Box.View>
            )}
            ListEmptyComponent={() => {
              if (hasError) return null
              return <TemplateMessage message="No se encontraron resultados" />
            }}
          />
        ) : null}
      </Box.View>
    </Box.View>
  )
}

export default SearchScreen
