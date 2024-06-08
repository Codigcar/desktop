import messaging from '@react-native-firebase/messaging'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

import { App } from '../utils/config'
import { STORE_TOPICS } from '../utils/constants'
import { storage } from '../utils/storage'

type Context = {
  subscribeToTopic(topic: string): Promise<void>
  topics: string[]
  unsubscribeFromTopic(topic: string): Promise<void>
  setDefaultTopics(): void
}

export const TopicsContext = createContext<Context>({} as Context)

const requiredTopics = (): string[] | undefined =>
  App.select({
    gestion: ['custom.general'],
    trome: ['custom.general'],
  })

export const TopicsProvider: React.FC = ({ children }) => {
  const [topics, setTopics] = useState<Context['topics']>([])
  const refTopics = useRef<Context['topics']>([])

  const subscribeToTopic = useCallback(async (topic: string) => {
    const nextTopics = [...refTopics.current, topic]
    setTopics(nextTopics)
    try {
      await messaging().subscribeToTopic(topic)
      storage.set(STORE_TOPICS, JSON.stringify(nextTopics))
      refTopics.current = nextTopics
    } catch (_) {
      setTopics(refTopics.current)
      throw new Error('No se pudo realizar la suscripción')
    }
  }, [])

  const unsubscribeFromTopic = useCallback(async (topic: string) => {
    const nextTopics = refTopics.current.filter((t) => t !== topic)
    setTopics(nextTopics)
    try {
      await messaging().unsubscribeFromTopic(topic)
      storage.set(STORE_TOPICS, JSON.stringify(nextTopics))
      refTopics.current = nextTopics
    } catch (_) {
      setTopics(refTopics.current)
      throw new Error('No se pudo realizar la desuscripción')
    }
  }, [])

  const setDefaultTopics = useCallback(() => {
    const requireTopics = requiredTopics()
    const topicsStorage = storage.getString(STORE_TOPICS)
    if (topicsStorage || !requireTopics) return
    requireTopics.forEach((topic) => {
      subscribeToTopic(topic)
    })
  }, [subscribeToTopic])

  useEffect(() => {
    const topicsStorage = storage.getString(STORE_TOPICS)
    if (!topicsStorage) return
    refTopics.current = JSON.parse(topicsStorage)
    setTopics(refTopics.current)
  }, [])

  return (
    <TopicsContext.Provider
      value={{
        subscribeToTopic,
        topics,
        unsubscribeFromTopic,
        setDefaultTopics,
      }}>
      {children}
    </TopicsContext.Provider>
  )
}

export const useTopics = (): Context => useContext(TopicsContext)
