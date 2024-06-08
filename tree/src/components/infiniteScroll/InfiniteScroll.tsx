import { useState } from "react"
import { ActivityIndicator, FlatList, FlatListProps, RefreshControl } from "react-native"
import { useTheme } from '@shopify/restyle'
import { Theme } from "../../theme"
import { SafeAreaView } from "../box"

type InfinityScrollProps<T> = FlatListProps<T> & {
  loadMore: (page: number) => Promise<void>
  pullRefresh?: boolean
  hasMore: boolean
  initialPage?: number
}

const InfiniteScrollList = <T extends unknown>(
  props: InfinityScrollProps<T>,
): JSX.Element => {
  const { loadMore, pullRefresh, hasMore, initialPage = 0, ...rest } = props

  const [isPulling, setIsPulling] = useState(false)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [isLoading, setIsLoading] = useState(false)
  const { colors } = useTheme<Theme>()

  return (
    <FlatList<T>
      scrollEventThrottle={0.5}
      refreshControl={
        pullRefresh ? (
          <RefreshControl
            colors={[colors.link]}
            refreshing={isPulling}
            // progressBackgroundColor={colors}
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
          <SafeAreaView edges={['bottom']} p="0.5">
            <ActivityIndicator color={colors.text} />
          </SafeAreaView>
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
