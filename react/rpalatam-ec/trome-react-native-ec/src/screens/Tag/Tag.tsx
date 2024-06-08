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
import Content, { queryInclude } from '../../services/arc/Content'
import TagService from '../../services/arc/Tag'
import { getAdNewsListConfig } from '../../utils/advertising'
import { insertIntoArray } from '../../utils/tools'
import type { MainStackScreenProps } from '../../routes/types'

type Item = Advertising | Story

const { View } = Box

const TagScreen: React.FC = () => {
  const navigation = useNavigation<MainStackScreenProps<'Tag'>['navigation']>()
  const route = useRoute<MainStackScreenProps<'Tag'>['route']>()
  const { isSubscribed } = useAuth()
  const { name: tagName, path: pathname } = route.params
  const [items, setItems] = useState<Story[]>([])
  const [hasMore, setHasMore] = useState(false)

  const adSlots = useMemo(() => {
    const config = getAdNewsListConfig()
    return isSubscribed ? config.premium : config.free
  }, [isSubscribed])

  const Service = useMemo(() => {
    return Content.search({
      cache: true,
      params: {
        query: `type:story+AND+revision.published:true+AND+NOT+taxonomy.primary_section._id:(?no-flujo)+AND+NOT+taxonomy.tags.slug:"no-app"+AND+taxonomy.tags.slug:/${pathname}/`,
        sourceInclude: queryInclude('cards').join(),
      },
    })
  }, [pathname])

  useEffect(() => {
    if (tagName) return
    TagService.getBySlug(pathname).then((data) => {
      const params = { name: data?.name || 'Tag', path: pathname }
      navigation.setParams(params as Record<string, string>)
    })

    return () => {
      TagService.abort()
    }
  }, [pathname, navigation, tagName])

  const openStory = useOpenStory(tagName as string)

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
          screen_name: `screen_tag_${pathname}?page=${pageToLoad}`,
          screen_class: 'TagScreen',
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
    return () => {
      Service.abort()
    }
  }, [handleLoadMore, Service])

  return (
    <View bg="background" flex={1} testID="tag-screen">
      <Ribbon title={tagName} />
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
            <CardPlaceholder repeat={8} variant="magazine" />
          </View>
        }
      />
    </View>
  )
}

export default TagScreen
