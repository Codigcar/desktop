import React, { useCallback } from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'

import Box from '../../../components/box'
import Card, { CardPlaceholder } from '../../../components/card'
import InfiniteScrollList, {
  ItemAdvertising,
} from '../../../containers/infiniteScrollList'
import { useSearchContext } from '../../../context/search'
import { Advertising } from '../../../entities/Advertising'
import { Story } from '../../../entities/Story'
import useOpenStory from '../../../hooks/useOpenStory'
import useSearch from '../../../hooks/useSearch'
import { TemplateMessage } from '../Search.gestion'

const CommonTemplate: React.FC = () => {
  const { results, status, page, hasError, hasMore } = useSearchContext()
  const { resultsWithAds, handleLoadMore } = useSearch()
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
  if (status === 'idle') {
    return (
      <TouchableWithoutFeedback testID="status-idle" onPress={Keyboard.dismiss}>
        <Box.View flex={1} />
      </TouchableWithoutFeedback>
    )
  }

  if (status === 'started') {
    return (
      <Box.View testID="status-started" flex={1} px="0.75">
        <CardPlaceholder repeat={8} variant="magazine" />
      </Box.View>
    )
  }

  if (status === 'done') {
    return (
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
    )
  }

  return null
}

export default CommonTemplate
