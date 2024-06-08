import AsyncStorage from '@react-native-async-storage/async-storage'
import analytics from '@react-native-firebase/analytics'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { useAuth } from './auth'
import { Story } from '../entities/Story'
import Content, { queryInclude } from '../services/arc/Content'
import { getContentFormated } from '../services/arc/utils'
import auth from '../services/auth'
import { FavoritePreferences } from '../services/preferences'
import { App } from '../utils/config'
import { STORE_FAVORITES } from '../utils/constants'
import { HomeWebviewRef } from '../utils/refs'

interface Context {
  favorites: Story['id'][]
  fetchFavoritesStories: (size?: number) => Promise<Story[]>
  getFavorites: () => { ids: Story['id'][]; stories: Story[] }
  sendFavoritesToWebview: () => { ids: () => void; stories: () => void }
  setFavorites: () => {
    ids: (ids: Story['id'][]) => Promise<void>
    stories: (stories: Story[]) => void
  }
  stories: Story[]
  toggleFavorite: (story: Story['id']) => Promise<void>
}

export const FavoritesContext = createContext<Context>({} as Context)

export const FavoritesProvider: React.FC = ({ children }) => {
  const { isSubscribed, user } = useAuth()
  const [ids, setIds] = useState<Story['id'][]>([])
  const [listOfStories, setListOfStories] = useState<Story[]>([])
  const refIds = useRef<Story['id'][]>([])
  const refStories = useRef<Story[]>([])
  const Service = useMemo(() => {
    return Content.ids({
      params: { sourceInclude: queryInclude('cards').join() },
    })
  }, [])

  const sendFavoritesToWebview = useCallback(() => {
    function inject<T>(method: string, value: T) {
      HomeWebviewRef.current?.injectJavaScript(
        `(function() {
          window.NATIVE_CONNECTION && window.NATIVE_CONNECTION.favorites['${method}'](${JSON.stringify(
          value,
        )})
        })()`,
      )
    }
    return {
      ids() {
        inject<Story['id'][]>('setIds', refIds.current)
      },
      stories() {
        inject<Story[]>('setStories', refStories.current)
      },
    }
  }, [])

  useEffect(() => {
    sendFavoritesToWebview().ids()
  }, [ids, sendFavoritesToWebview])

  useEffect(() => {
    sendFavoritesToWebview().stories()
  }, [listOfStories, sendFavoritesToWebview])

  useEffect(() => {
    const nextStories = refStories.current.filter((prevStory) =>
      ids.includes(prevStory.id),
    )
    refStories.current = nextStories
  }, [ids])

  const getFavorites = useCallback(() => {
    return { ids: refIds.current, stories: refStories.current }
  }, [])

  const setFavoritesIds = useCallback((storiesIds: Story['id'][]) => {
    refIds.current = storiesIds
    setIds(storiesIds)
  }, [])

  const setFavoritesStories = useCallback((stories: Story[]) => {
    refStories.current = stories
    setListOfStories(stories)
  }, [])

  const saveFavoritesIds = useCallback(
    async (storiesIds: string[]) => {
      if (isSubscribed && App.key !== 'elcomercio') {
        FavoritePreferences.abort()
        const token = await auth.getToken()
        FavoritePreferences.post(storiesIds, {
          accessToken: token?.access_token,
          email: user.email,
          id: user.id,
        }).catch(console.log)
      } else {
        await AsyncStorage.setItem(STORE_FAVORITES, JSON.stringify(storiesIds))
      }
      setFavoritesIds(storiesIds)
    },
    [isSubscribed, setFavoritesIds, user],
  )

  const setFavorites = useCallback(() => {
    return {
      ids(storiesIds: Story['id'][]) {
        return saveFavoritesIds(storiesIds)
      },
      stories(stories: Story[]) {
        return setFavoritesStories(stories)
      },
    }
  }, [saveFavoritesIds, setFavoritesStories])

  const toggleFavorite = useCallback(
    async (storyId: Story['id']) => {
      const isFavorite = refIds.current.includes(storyId)

      if (!isFavorite) {
        await analytics().logEvent('add_to_read_later', {
          id: storyId,
        })
      }

      const nextFavorites = isFavorite
        ? refIds.current.filter((id) => id !== storyId)
        : [...refIds.current, storyId]
      await saveFavoritesIds(nextFavorites)
    },
    [saveFavoritesIds],
  )
  const fetchFavoritesStories = useCallback(
    async (size) => {
      Service.abort()
      let currentIds = Array.from(refIds.current).reverse()
      let idsFetched = refStories.current.map((story) => story.id)

      if (App.key === 'elcomercio') {
        currentIds = currentIds.splice(0, size)
        idsFetched = idsFetched.splice(0, size)
      }

      const storiesForFetch = currentIds.filter(
        (id) => !idsFetched.includes(id),
      )
      if (storiesForFetch.length === 0) return refStories.current
      const response = await Service.get(storiesForFetch)
      const storiesFormated = getContentFormated(response)
      const newStories = [...refStories.current, ...storiesFormated]
      return currentIds.map((id) =>
        newStories.find((story) => story.id === id),
      ) as Story[]
    },
    [Service],
  )

  const readFavoritesFromStorage = useCallback(async () => {
    const item = await AsyncStorage.getItem(STORE_FAVORITES)
    if (item === null) return setFavoritesIds([])
    const favorites: Story['id'][] = JSON.parse(item)
    setFavoritesIds(favorites)
  }, [setFavoritesIds])

  useEffect(() => {
    if (isSubscribed && user.id && App.key !== 'elcomercio') {
      FavoritePreferences.get(user.id)
        .then((remoteIds) => {
          const listOfIds = remoteIds.filter((id) => !!id)
          setFavoritesIds(listOfIds)
        })
        .catch(console.log)
    } else {
      readFavoritesFromStorage()
    }
  }, [isSubscribed, readFavoritesFromStorage, setFavoritesIds, user.id])

  return (
    <FavoritesContext.Provider
      value={{
        favorites: ids,
        getFavorites,
        fetchFavoritesStories,
        sendFavoritesToWebview,
        setFavorites,
        stories: listOfStories,
        toggleFavorite,
      }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = (): Context => useContext(FavoritesContext)
