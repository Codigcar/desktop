import { useTheme } from '@shopify/restyle'
import React, { useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  RefreshControl,
} from 'react-native'

import { Banner, NativeAd } from '../../components/ad'
import Box from '../../components/box'
import { Advertising } from '../../entities/Advertising'
import { Story } from '../../entities/Story'
import { Theme } from '../../theme'

type Item = Advertising | Story

type InfinityScrollProps<T> = FlatListProps<T> & {
  loadMore: (page: number) => Promise<void>
  pullRefresh?: boolean
  hasMore: boolean
  initialPage?: number
}

export function removeDuplicateStories(
  prevItems: Item[],
  stories: Story[],
): Story[] {
  const instanceOfStory = (item: Item) => item instanceof Story
  const listOfStories: Story[] = prevItems.filter(instanceOfStory)
  const lastIds = listOfStories.slice(-10).map((story) => story.id)
  const unique = (story: Story) => lastIds.indexOf(story.id) === -1
  const listWithoutDuplicates = stories.filter(unique)
  return [...listOfStories, ...listWithoutDuplicates]
}

export const ItemAdvertising: React.FC<{ item: Advertising }> = ({ item }) => {
  const adLoadedStyle = { paddingVertical: 16 }
  return (
    <Box.View alignItems="center">
      <Banner
        adUnitID={item.id}
        adSize={item.size}
        validAdSizes={item.sizes}
        adLoadedStyle={adLoadedStyle}
      />
    </Box.View>
  )
}

export const ItemNativeAdvertising: React.FC<{ item: Advertising }> = ({
  item,
}) => (
  <Box.View px="1">
    <NativeAd adUnitID={item.id} />
  </Box.View>
)

const InfiniteScrollList = <T extends unknown>(
  props: InfinityScrollProps<T>,
): JSX.Element => {
  const { loadMore, pullRefresh, hasMore, initialPage = 0, ...rest } = props

  const [isPulling, setIsPulling] = useState(false)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const { colors } = useTheme<Theme>()
  const [isLoading, setIsLoading] = useState(false)

  return (
    <FlatList<T>
      scrollEventThrottle={0.5}
      refreshControl={
        pullRefresh ? (
          <RefreshControl
            colors={[colors.link]}
            refreshing={isPulling}
            progressBackgroundColor={colors.background}
            onRefresh={() => {
              setIsPulling(true)
              if (currentPage !== 0) {
                setCurrentPage(0)
              }
              loadMore(0).then(() => {
                setIsPulling(false)
              })
            }}
          />
        ) : undefined
      }
      scrollIndicatorInsets={{ right: 1 }}
      ListFooterComponent={() => {
        if (!isLoading) return null
        return (
          <Box.SafeAreaView edges={['bottom']} p="0.5">
            <ActivityIndicator color={colors.text} />
          </Box.SafeAreaView>
        )
      }}
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        if (!isLoading && hasMore) {
          setIsLoading(true)
          loadMore(currentPage + 1).then(() => {
            setCurrentPage(currentPage + 1)
            setIsLoading(false)
          })
        }
      }}
      {...rest}
    />
  )
}

export default InfiniteScrollList
