import { useTheme } from '@shopify/restyle'
import React, { useCallback, useEffect, useMemo } from 'react'
import { FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Box from '../../components/box'
import Card, { CardPlaceholder } from '../../components/card'
import Ribbon from '../../components/ribbon'
import Typography from '../../components/typography'
import { ItemAdvertising } from '../../containers/infiniteScrollList'
import { useAuth } from '../../context/auth'
import { useFavorites } from '../../context/favorites'
import { Advertising } from '../../entities/Advertising'
import { Story } from '../../entities/Story'
import useOpenStory from '../../hooks/useOpenStory'
import { getAdNewsListConfig } from '../../utils/advertising'
import { insertIntoArray } from '../../utils/tools'
import type { Theme } from 'src/theme'

type Item = Advertising | Story

const { Paragraph } = Typography

const FavoriteScreen: React.FC = () => {
  const { colors } = useTheme<Theme>()
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

  const isPending = useMemo(() => {
    const listOfStories = items.filter((item) => item instanceof Story)
    const idsFetched = listOfStories.map((story) => story.id)
    const storiesForFetch = ids.filter((id) => !idsFetched.includes(id))
    return storiesForFetch.length > 0
  }, [ids, items])

  useEffect(() => {
    return () => {
      sendFavoritesToWebview().stories()
    }
  }, [sendFavoritesToWebview])

  useEffect(() => {
    fetchFavoritesStories().then((listOfStories) => {
      setFavorites().stories(listOfStories)
    })
  }, [fetchFavoritesStories, isPending, setFavorites])

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

  return (
    <Box.View bg="background" flex={1} testID="favorite-screen">
      <Ribbon title="Leer Luego" />
      {isPending ? (
        <Box.View px="1" pt="0.5">
          <CardPlaceholder repeat={8} variant="magazine" />
        </Box.View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          scrollIndicatorInsets={{ right: 1 }}
          ItemSeparatorComponent={() => (
            <Box.View bg="separator" height={1} mx="1" />
          )}
          ListEmptyComponent={() => (
            <Box.View testID="empty-list" paddingTop="3" paddingHorizontal="2">
              <Paragraph
                color="coolGray-700"
                fontSize="3xl"
                fontWeight="light"
                textAlign="center">
                Aún no tienes noticias guardadas
              </Paragraph>
              <Box.View my="1" />
              <Paragraph
                color="coolGray-700"
                fontSize="lg"
                fontWeight="extralight"
                textAlign="center">
                Utiliza el ícono{' '}
                <Icon name="bookmark" size={22} color={colors.link} /> en
                cualquier publicación y la podrás encontrar aquí para leer luego
              </Paragraph>
            </Box.View>
          )}
        />
      )}
    </Box.View>
  )
}

export default FavoriteScreen
