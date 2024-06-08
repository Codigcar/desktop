import analytics from '@react-native-firebase/analytics'
import crashlytics from '@react-native-firebase/crashlytics'
import {
  DrawerActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native'
import { useTheme } from '@shopify/restyle'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { useMMKV, useMMKVString } from 'react-native-mmkv'

import IconEqualizer from '../../assets/icons/elcomercio/equalizer.svg'
import IconMenu from '../../assets/icons/elcomercio/menu.svg'
import Box from '../../components/box'
import Card from '../../components/card'
import Ribbon from '../../components/ribbon'
import Typography from '../../components/typography'
import InfiniteScrollList, {
  ItemAdvertising,
  removeDuplicateStories,
} from '../../containers/infiniteScrollList'
import { useAuth } from '../../context/auth'
import { Advertising } from '../../entities/Advertising'
import { Story } from '../../entities/Story'
import useOpenStory from '../../hooks/useOpenStory'
import Content, { queryInclude } from '../../services/arc/Content'
import { Theme } from '../../theme'
import { getAdNewsListConfig } from '../../utils/advertising'
import { STORE_INTERESTS } from '../../utils/constants'
import { insertIntoArray } from '../../utils/tools'
import type { HomeStackScreenProps } from '../../routes/types'

type Item = Advertising | Story

const { View } = Box
const { Paragraph } = Typography
const storageId = 'app.config'

const getQuery = (interests = []) => {
  const tagQuery =
    interests.length > 0
      ? `+OR+taxonomy.tags.slug:(${interests.join('+OR+')})`
      : ''
  return `type:story+AND+revision.published:true+AND+(content_restrictions.content_code:premium${tagQuery})`
}

const MyNewsScreen: React.FC = () => {
  const { colors } = useTheme<Theme>()
  const navigation =
    useNavigation<HomeStackScreenProps<'MyNews'>['navigation']>()

  const { isSubscribed, isAuthenticated } = useAuth()
  const [items, setItems] = useState<Story[]>([])
  const [hasMore, setHasMore] = useState(false)

  const key = useMMKV({ id: storageId })
  const [data] = useMMKVString(STORE_INTERESTS, key)

  const interests = useMemo(() => {
    return data ? JSON.parse(data) : []
  }, [data])

  const Service = useMemo(() => {
    return Content.search({
      cache: false,
      params: {
        query: getQuery(interests),
        sourceInclude: queryInclude('cards').join(),
      },
    })
  }, [interests])

  const openStory = useOpenStory('Mis Noticias')

  const renderItem = useCallback(
    ({ item }: { item: Item }) => {
      if (item instanceof Advertising) return <ItemAdvertising item={item} />
      return (
        <Card onPress={() => openStory(item)} story={item} variant="magazine" />
      )
    },
    [openStory],
  )

  const adSlots = useMemo(() => {
    const config = getAdNewsListConfig()
    return isSubscribed ? config.premium : config.free
  }, [isSubscribed])

  const handleLoadMore = useCallback(
    async (pageToLoad: number) => {
      try {
        const stories = await Service.get({ page: pageToLoad })
        analytics().logScreenView({
          screen_name: `screen_mynews?page=${pageToLoad}`,
          screen_class: 'MyNewsScreen',
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
    [Service, adSlots],
  )

  useEffect(() => {
    return () => {
      Service.abort()
    }
  }, [Service])

  useFocusEffect(
    useCallback(() => {
      if (!isAuthenticated)
        return navigation.replace('Home', { screen: 'Feed' })

      handleLoadMore(0)
    }, [isAuthenticated, navigation, handleLoadMore]),
  )

  return (
    <View bg="background" flex={1} testID="mynews-screen">
      <Ribbon
        loading={!items.length}
        LeftComponent={() => {
          return (
            <View alignItems="center" flexDirection="row">
              <TouchableWithoutFeedback
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                testID="menu-button"
                hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}>
                <View ml="0.5" width={16} height={16}>
                  <IconMenu fill={colors['text.2']} />
                </View>
              </TouchableWithoutFeedback>
              <View alignItems="center" flexDirection="row" ml="1.25">
                <Paragraph
                  textAlign="center"
                  color="text.1"
                  fontSize="lg"
                  fontWeight="black">
                  Mis noticias
                </Paragraph>
              </View>
            </View>
          )
        }}
        RigthComponent={() => {
          return (
            <View alignItems="center" flexDirection="row">
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate('Main', { screen: 'Interests' })
                }
                hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}
                testID="filter-button">
                <View mr="0.5" width={18} height={18}>
                  <IconEqualizer fill={colors.secondary} />
                </View>
              </TouchableWithoutFeedback>
            </View>
          )
        }}
      />
      <InfiniteScrollList
        data={items}
        pullRefresh
        keyExtractor={({ id }) => id}
        hasMore={hasMore && items.length < 60}
        loadMore={handleLoadMore}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View bg="separator" height={1} mx="1" />}
      />
    </View>
  )
}

export default MyNewsScreen
