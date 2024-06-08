import { useTheme } from '@shopify/restyle'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Box from '../../components/box'
import Card from '../../components/card'
import Ribbon from '../../components/ribbon'
import Typography from '../../components/typography'
import InfiniteScrollList, {
  ItemAdvertising,
} from '../../containers/infiniteScrollList'
import { useAuth } from '../../context/auth'
import { useFavorites } from '../../context/favorites'
import { Advertising } from '../../entities/Advertising'
import { Story } from '../../entities/Story'
import useOpenStory from '../../hooks/useOpenStory'
import { getAdNewsListConfig } from '../../utils/advertising'
import { insertIntoArray } from '../../utils/tools'
import type { Theme } from '../../theme'

type Item = Advertising | Story

const { Paragraph } = Typography
const { View } = Box
const interval = 10

const EmptyList = () => {
  const { colors } = useTheme<Theme>()
  return (
    <View testID="empty-list" paddingTop="3" paddingHorizontal="2">
      <Paragraph
        color="coolGray-700"
        fontSize="3xl"
        fontWeight="light"
        textAlign="center">
        Aún no tienes noticias guardadas
      </Paragraph>
      <View my="1" />
      <Paragraph
        color="coolGray-700"
        fontSize="lg"
        fontWeight="extralight"
        textAlign="center">
        Utiliza el ícono <Icon name="bookmark" size={22} color={colors.link} />{' '}
        en cualquier publicación y la podrás encontrar aquí para leer luego
      </Paragraph>
    </View>
  )
}

const FavoriteScreen: React.FC = () => {
  const [hasMore, setHasMore] = useState(false)
  const { isSubscribed } = useAuth()
  const {
    fetchFavoritesStories,
    getFavorites,
    sendFavoritesToWebview,
    setFavorites,
    stories,
  } = useFavorites()
  const { ids } = getFavorites()

  const adSlots = useMemo(() => {
    const config = getAdNewsListConfig()
    return isSubscribed ? config.premium : config.free
  }, [isSubscribed])

  const items = useMemo(() => {
    return insertIntoArray(stories, adSlots)
  }, [adSlots, stories])

  const openStory = useOpenStory('Favoritos')

  const renderItem = useCallback(
    ({ item }: { item: Item }) => {
      if (item instanceof Advertising) return <ItemAdvertising item={item} />
      return (
        <Card onPress={() => openStory(item)} story={item} variant="magazine" />
      )
    },
    [openStory],
  )

  const handleLoadMore = useCallback(
    async (pageToLoad: number) => {
      const listOfStories = await fetchFavoritesStories(
        (pageToLoad + 1) * interval,
      )
      setFavorites().stories(listOfStories)
      setHasMore(listOfStories.length >= interval)
    },
    [fetchFavoritesStories, setFavorites],
  )

  useEffect(() => {
    handleLoadMore(0)
  }, [handleLoadMore, sendFavoritesToWebview])

  return (
    <Box.View bg="background" flex={1} testID="favorite-screen">
      <Ribbon
        loading={ids.length > 0 && stories.length === 0}
        title="Leer Luego"
      />
      <InfiniteScrollList
        data={items}
        pullRefresh
        keyExtractor={({ id }) => id}
        hasMore={hasMore && stories.length !== ids.length}
        loadMore={handleLoadMore}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View bg="separator" height={1} mx="1" />}
        ListEmptyComponent={ids.length === 0 ? <EmptyList /> : null}
      />
    </Box.View>
  )
}

export default FavoriteScreen
