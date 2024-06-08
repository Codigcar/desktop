import React from 'react'
import * as types from './types'

import { FormattedNews } from '../../services/types'
import { MessageNotification } from '../../system/messageNotification'
import { WEB_PROJECT_EC_APP } from '../../tools/flags'

type Action = types.FavoritesActionTypes

function resizeFavorites(data) {
  Object.entries(data).forEach(([key, news]: [string, any]) => {
    const nextNews = news.map(notice => {
      if (Array.isArray(notice.media)) {
        return {
          ...notice,
          media: [notice.media[0]],
        }
      } else {
        return notice
      }
    })
    data[key] = nextNews
  })
  return data
}

function sendCurrentFavoritesToRN(ids: string[]) {
  window.ReactNativeWebView?.postMessage(
    JSON.stringify({
      type: 'favorites.SET_LIST_OF_FAVORITES',
      payload: {
        ids,
      },
    }),
  )
}

export const initStateFavorites = () => dispatch => {
  const setIds = new Set<string>()
  let stories: FormattedNews[] = []
  const favorites = window.localStorage.favorite

  if (!!favorites) {
    const store: types.LocalStorageFavorites = JSON.parse(favorites || '{}')

    const clearedData = resizeFavorites(store)
    window.localStorage.setItem('favorite', JSON.stringify(clearedData))

    const dates = Object.keys(store).reverse()
    stories = dates.reduce<FormattedNews[]>(
      (prevStories, key) => [...prevStories, ...store[key].reverse()],
      [],
    )
    stories.forEach(story => setIds.add(story.nid))
    window.localStorage.removeItem('favorite')
    sendCurrentFavoritesToRN(Array.from(setIds).reverse())
  }

  dispatch({
    type: types.INIT_FAVORITE,
    payload: {
      setIds,
      stories,
    },
  })
}

export const toogleFavorite = story => async (dispatch, getState) => {
  const storyId = story.nid
  const { favorites } = getState()
  const isFavorite = favorites.setIds.has(storyId)
  isFavorite ? dispatch(removeFavorite(storyId)) : dispatch(addFavorite(story))

  // Send postmessage to react native
  const setIds = new Set<string>(favorites.setIds)
  isFavorite ? setIds.delete(storyId) : setIds.add(storyId)
  sendCurrentFavoritesToRN(Array.from(setIds))
}

export const clearFavorites = () => {
  return {
    type: types.CLEAR_FAVORITES,
  }
}

export const addFavorite = (story): Action => {
  const storyId = story.nid

  if (!WEB_PROJECT_EC_APP) {
    import('../../system/notification').then(res => {
      res.default.success({
        content: <MessageNotification />,
      })
    })
  }

  return {
    type: types.ADD_FAVORITE,
    payload: {
      nid: storyId,
      story,
    },
  }
}

export const removeFavorite = (storyId: string): Action => {
  return {
    type: types.REMOVE_FAVORITE,
    payload: {
      nid: storyId,
    },
  }
}

export const setFavoritesIds = (ids: string[]): Action => {
  return {
    type: types.SET_IDS,
    payload: {
      ids,
    },
  }
}

export const setFavoritesStoriesFromNative = (
  stories: { [key: string]: any }[],
) => {
  const formattedStories = stories.map(story => {
    const thumb =
      story.promo_items?.basic?.url ||
      story.promo_items?.gallery?.[0].url ||
      story.promo_items?.video?.thumb

    return {
      nid: story.id,
      fecha_publicacion: story.last_updated_date,
      media: thumb ? [{ thumb }] : [],
      restrictions: story.restrictions,
      seccion: { nombre: story.section?.name },
      tiempo_lectura: story.reading_time
        ? `${story.reading_time} min de lectura`
        : undefined,
      tipo: 'image',
      titulo: story.headline,
      url: story.url,
    }
  })
  return setFavoritesStories(formattedStories as FormattedNews[])
}

export const setFavoritesStories = (stories: FormattedNews[]): Action => {
  return {
    type: types.SET_STORIES,
    payload: {
      stories,
    },
  }
}
