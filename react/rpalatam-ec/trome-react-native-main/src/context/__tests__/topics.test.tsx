import { act, renderHook } from '@testing-library/react-hooks'
import React from 'react'

import { App } from '../../utils/config'
import { STORE_TOPICS } from '../../utils/constants'
import { storage } from '../../utils/storage'
import { TopicsProvider, useTopics } from '../topics'

const mockSubscribeToTopic = jest.fn()
const mockUnsubscribeToTopic = jest.fn()
jest.mock('@react-native-firebase/messaging', () => {
  return () => ({
    subscribeToTopic: mockSubscribeToTopic,
    unsubscribeFromTopic: mockUnsubscribeToTopic,
  })
})

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <TopicsProvider>{children}</TopicsProvider>
)

describe('notifications context', () => {
  afterEach(() => {
    storage.clearAll()
  })

  it('get topics from storage', async () => {
    const topics = ['topic1', 'topic2']
    storage.set(STORE_TOPICS, JSON.stringify(topics))
    const { result } = renderHook(() => useTopics(), { wrapper })
    await act(async () => undefined)
    expect(result.current.topics).toEqual(topics)
  })

  it('subscribe to default topic', async () => {
    App.key = 'gestion'
    const { result } = renderHook(() => useTopics(), { wrapper })
    await act(() => result.current.setDefaultTopics())
    expect(result.current.topics).toEqual(['custom.general'])
  })

  it('subscribe to topic', async () => {
    const { result } = renderHook(() => useTopics(), { wrapper })
    await act(() => result.current.subscribeToTopic('test'))
    expect(result.current.topics).toEqual(['test'])
    const topics = storage.getString(STORE_TOPICS)
    expect(topics).toEqual(JSON.stringify(['test']))
    expect(mockSubscribeToTopic).toHaveBeenCalledWith('test')
  })

  it('subscribe to topic with error', async () => {
    App.key = 'depor'
    mockSubscribeToTopic.mockRejectedValueOnce('')
    const { result } = renderHook(() => useTopics(), { wrapper })
    try {
      await act(() => result.current.subscribeToTopic('test'))
      expect(true).toBeFalsy()
    } catch (error) {
      expect(result.current.topics).toEqual([])
    }
  })

  it('unsubscribe from topic', async () => {
    const { result } = renderHook(() => useTopics(), { wrapper })
    await act(() => result.current.subscribeToTopic('test'))
    await act(() => result.current.unsubscribeFromTopic('test'))
    expect(result.current.topics).toEqual([])
    const topics = storage.getString(STORE_TOPICS)
    expect(topics).toEqual(JSON.stringify([]))
    expect(mockUnsubscribeToTopic).toHaveBeenCalledWith('test')
  })

  it('unsubscribe from topic with error', async () => {
    mockUnsubscribeToTopic.mockRejectedValueOnce('')
    const { result } = renderHook(() => useTopics(), { wrapper })
    try {
      await act(() => result.current.subscribeToTopic('test'))
      await act(() => result.current.unsubscribeFromTopic('test'))
      expect(true).toBeFalsy()
    } catch (error) {
      expect(result.current.topics).toEqual(['test'])
    }
  })
})
