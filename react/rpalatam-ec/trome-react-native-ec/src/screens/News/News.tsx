import analytics from '@react-native-firebase/analytics'
import crashlytics from '@react-native-firebase/crashlytics'
import { useRoute } from '@react-navigation/native'
import { useTheme } from '@shopify/restyle'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Alert, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Box from '../../components/box'
import Card, { CardPlaceholder } from '../../components/card'
import Ribbon from '../../components/ribbon'
import InfiniteScrollList, {
  ItemAdvertising,
  ItemNativeAdvertising,
  removeDuplicateStories,
} from '../../containers/infiniteScrollList'
import { useAuth } from '../../context/auth'
import { useMainNavigation } from '../../context/navigation'
import { useNotification } from '../../context/notification'
import { Advertising } from '../../entities/Advertising'
import { Story } from '../../entities/Story'
import useOpenStory from '../../hooks/useOpenStory'
import Content, {
  getQueryBySection,
  queryInclude,
} from '../../services/arc/Content'
import { getAdNewsListConfig } from '../../utils/advertising'
import { App } from '../../utils/config'
import { insertIntoArray } from '../../utils/tools'
import type { MainStackScreenProps } from '../../routes/types'
import type { Theme } from '../../theme'

type Item = Advertising | Story

const { View } = Box

const AdvertisingView = App.select({
  peru21: ItemNativeAdvertising,
  default: ItemAdvertising,
})

const NewsScreen: React.FC = () => {
  const route = useRoute<MainStackScreenProps<'News'>['route']>()
  const { colors } = useTheme<Theme>()
  const { isSubscribed } = useAuth()
  const { name, path, section: sect } = route.params
  const section = useMemo(
    () => ({
      name: sect?.name || name,
      path: sect?.path || path,
    }),
    [name, path, sect?.name, sect?.path],
  )

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
        query: getQueryBySection(
          section.path.replace(/^\//, '').replace(/\/$/, ''),
        ),
        sourceInclude: queryInclude('cards').join(),
      },
    })
  }, [section.path])

  const openStory = useOpenStory(section.name)

  const renderItem = useCallback(
    ({ index, item }: { index: number; item: Item }) => {
      if (item instanceof Advertising) return <AdvertisingView item={item} />
      const story: Story = { ...item, section: undefined }
      return (
        <Card
          onPress={() => openStory(item)}
          story={story}
          density={index === 0 ? 'comfortable' : 'compact'}
          variant={index === 0 ? 'default' : 'magazine'}
        />
      )
    },
    [openStory],
  )

  const handleLoadMore = useCallback(
    async (pageToLoad: number) => {
      try {
        const stories = await Service.get({ page: pageToLoad })
        analytics().logScreenView({
          screen_name: `screen_news_${section.path}?page=${pageToLoad}`,
          screen_class: 'NewsScreen',
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
    [Service, adSlots, section],
  )

  useEffect(() => {
    handleLoadMore(0)
    return () => {
      Service.abort()
    }
  }, [handleLoadMore, Service])

  const { categories, setListOfCategory } = useMainNavigation()
  const notification = useNotification()

  const category = useMemo(() => {
    return categories.find(({ key }) => key === section.path)
  }, [categories, section.path])

  const handleHomeCategory = useCallback(() => {
    if (!category) return
    setListOfCategory((prevCategories) => {
      return prevCategories.map((item) => {
        if (item.key !== category.key) return item
        return { ...item, active: !item.active }
      })
    })
    const action = category.active
      ? 'Se removió la sección del Inicio'
      : 'Se agregó la sección al Inicio'
    notification.show({ message: action, type: 'success' })
  }, [category, notification, setListOfCategory])

  const sendAlert = () => {
    Alert.alert(
      `¿Remover "${section.name}?"`,
      'La sección dejará de mostrarse en el Inicio',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          onPress: () => handleHomeCategory(),
          text: 'Remover',
          style: 'destructive',
        },
      ],
    )
  }

  return (
    <View bg="background" flex={1} testID="News-screen">
      <Ribbon
        title={section.name}
        // eslint-disable-next-line react-native/no-inline-styles
        titleStyle={{ textTransform: 'capitalize' }}
        RigthComponent={() => {
          if (!category || App.key !== 'gestion') return null
          return (
            <TouchableWithoutFeedback
              onPress={() => {
                if (category.active) {
                  sendAlert()
                } else {
                  handleHomeCategory()
                }
              }}
              hitSlop={{ top: 4, left: 4, right: 4, bottom: 4 }}>
              <View
                width={32}
                height={32}
                alignItems="center"
                justifyContent="center">
                <Icon
                  name={category.active ? 'home-remove' : 'home-plus'}
                  color={category.active ? colors.danger : colors.link}
                  size={24}
                  testID="icon-home"
                />
              </View>
            </TouchableWithoutFeedback>
          )
        }}
      />
      <InfiniteScrollList
        data={items}
        pullRefresh
        keyExtractor={({ id }) => id}
        hasMore={hasMore && items.length < 50}
        loadMore={handleLoadMore}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View bg="separator" height={1} mx="1" />}
        ListEmptyComponent={
          <View flex={1} px="0.75" pt="1">
            <CardPlaceholder repeat={1} variant="default" />
            <CardPlaceholder repeat={5} variant="magazine" />
          </View>
        }
      />
    </View>
  )
}

export default NewsScreen