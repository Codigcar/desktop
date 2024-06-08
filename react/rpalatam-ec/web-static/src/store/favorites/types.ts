import React from 'react'
import { FormattedNews } from '../../services/types'

export const INIT_FAVORITE = 'favorites.INIT_FAVORITE'
export const ADD_FAVORITE = 'favorites.ADD_FAVORITE'
export const REMOVE_FAVORITE = 'favorites.REMOVE_FAVORITE'
export const LOAD_FAVORITES = 'favorites.LOAD_FAVORITES'
export const SET_IDS = 'favorites.SET_IDS'
export const SET_STORIES = 'favorites.SET_STORIES'
export const SET_LOADING = 'favorites.SET_LOADING'
export const CLEAR_FAVORITES = 'favorites.CLEAR_FAVORITES'

interface InitFavoritesAction {
  type: typeof INIT_FAVORITE
  payload: {
    setIds: Set<string>
    stories: FormattedNews[]
  }
}

interface AddFavoritesAction {
  type: typeof ADD_FAVORITE
  payload: {}
}

interface RemoveFavoritesAction {
  type: typeof REMOVE_FAVORITE
  payload: {
    nid: string
  }
}

interface SetIdsAction {
  type: typeof SET_IDS
  payload: {
    ids: string[]
  }
}

interface SetStoriesAction {
  type: typeof SET_STORIES
  payload: {
    stories: FormattedNews[]
  }
}

export type FavoritesActionTypes =
  | InitFavoritesAction
  | AddFavoritesAction
  | RemoveFavoritesAction
  | SetIdsAction
  | SetStoriesAction

export interface FavoritesState {
  setIds: Set<string>
  refIds: React.MutableRefObject<string[] | null>
  stories: FormattedNews[]
  refStories: React.MutableRefObject<FormattedNews[] | null>
}

export interface LocalStorageFavorites {
  [key: string]: FormattedNews[]
}
