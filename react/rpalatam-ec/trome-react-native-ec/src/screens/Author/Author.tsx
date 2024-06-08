import analytics from '@react-native-firebase/analytics'
import crashlytics from '@react-native-firebase/crashlytics'
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import Box from '../../components/box'
import Card, { CardPlaceholder } from '../../components/card'
import Ribbon from '../../components/ribbon'
import InfiniteScrollList, {
  ItemAdvertising,
  removeDuplicateStories,
} from '../../containers/infiniteScrollList'
import { useAuth } from '../../context/auth'
import { Advertising } from '../../entities/Advertising'
import { Story } from '../../entities/Story'
import useOpenStory from '../../hooks/useOpenStory'
import AuthorService from '../../services/arc/Author'
import Content, { queryInclude } from '../../services/arc/Content'
import { getAdNewsListConfig } from '../../utils/advertising'
import { insertIntoArray } from '../../utils/tools'
import type { MainStackScreenProps } from '../../routes/types'

const { View } = Box

type Item = Advertising | Story

const AuthorScreen: React.FC = () => {
  const navigation =
    useNavigation<MainStackScreenProps<'Author'>['navigation']>()
  const route = useRoute<MainStackScreenProps<'Author'>['route']>()
  const { name: authorName, path: pathname } = route.params

  const [hasMore, setHasMore] = useState(false)
  const [items, setItems] = useState<Story[]>([])
  const { isSubscribed } = useAuth()

  const Service = useMemo(() => {
    return Content.search({
      cache: true,
      params: {
        query: `type:story+AND+revision.published:true+AND+credits.by.slug:(${pathname})`,
        sourceInclude: queryInclude('cards').join(),
      },
    })
  }, [pathname])

  useEffect(() => {
    if (authorName) return
    AuthorService.getBySlug(pathname).then((data) => {
      const params = {
        name: data?.byline || 'Autor',
        path: pathname,
      }
      navigation.setParams(params as Record<string, string>)
    })

    return () => {
      AuthorService.abort()
    }
  }, [pathname, navigation, authorName])

  const adSlots = useMemo(() => {
    const config = getAdNewsListConfig()
    return isSubscribed ? config.premium : config.free
  }, [isSubscribed])

  const openStory = useOpenStory(authorName as string)

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
      try {
        const stories = await Service.get({ page: pageToLoad })
        analytics().logScreenView({
          screen_name: `screen_author_${pathname}?page=${pageToLoad}`,
          screen_class: 'AuthorScreen',
        })

        setItems((prevList = []) => {
          if (pageToLoad === 0) return insertIntoArray(stories, adSlots)
          const newList = removeDuplicateStories(prevList, stories)
          return insertIntoArray(newList, adSlots)
        })

        setHasMore(stories.length >= 10)
      } catch (error) {
        if (error instanceof Error && !error.message.includes('canceled')) {
          crashlytics().recordError(error)
        }
      }
    },
    [Service, adSlots, pathname],
  )

  useEffect(() => {
    handleLoadMore(0)
    return () => Service.abort()
  }, [handleLoadMore, Service])

  return (
    <View bg="background" flex={1} testID="author-screen">
      <Ribbon title={authorName} />
      <InfiniteScrollList
        data={items}
        pullRefresh
        keyExtractor={({ id }) => id}
        hasMore={hasMore && items.length < 50}
        loadMore={handleLoadMore}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View bg="separator" height={1} mx="1" />}
        ListEmptyComponent={
          <View flex={1} px="0.75">
            <CardPlaceholder repeat={10} variant="magazine" />
          </View>
        }
      />
    </View>
  )
}

export default AuthorScreen
