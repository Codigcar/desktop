import { act, render } from '@testing-utils/library'
import React from 'react'
import { RefreshControl, Text } from 'react-native'

import InfiniteScrollList, {
  ItemNativeAdvertising,
  removeDuplicateStories,
} from './infiniteScrollList'
import { Story } from '../../entities/Story'

describe('InfiniteScrollList container', () => {
  const data = Array.from({ length: 4 }).map((_, i) => ({
    _id: `item-${i}`,
  }))

  const loadMore = jest.fn().mockResolvedValue(undefined)

  it('render correctly', async () => {
    const { getByText, getByTestId } = render(
      <InfiniteScrollList
        testID="infiniteList"
        data={data}
        hasMore={true}
        loadMore={loadMore}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <Text>{item._id}</Text>}
        pullRefresh
      />,
    )
    const infiniteList = getByTestId('infiniteList')
    const refreshControl = infiniteList.findByType(RefreshControl)

    expect(getByText(`item-${1}`)).toBeDefined()
    expect(refreshControl).toBeDefined()
    await act(async () => refreshControl.props.onRefresh())
    expect(loadMore).toHaveBeenLastCalledWith(0)

    await act(async () => infiniteList.props.onEndReached())
    expect(loadMore).toHaveBeenLastCalledWith(1)
  })

  it('should remove the duplicate story when it is in the last 10 previous stories', () => {
    const prevItems = Array.from({ length: 20 }).map(
      (_, i) => new Story({ id: `${i}` }),
    )
    const nextStories = Array.from({ length: 10 }).map(
      (_, i) => new Story({ id: `${i + 15}` }),
    )

    const stories = removeDuplicateStories(prevItems, nextStories)
    expect(stories.length).toBe(25)
  })

  it('render native ad', () => {
    const { getByText } = render(<ItemNativeAdvertising item={{ id: 'id' }} />)
    expect(getByText('Headline')).toBeDefined()
  })
})
