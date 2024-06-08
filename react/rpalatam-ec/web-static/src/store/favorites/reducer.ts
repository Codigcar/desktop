import React from 'react'
import * as types from './types'

const initialState: types.FavoritesState = {
  setIds: new Set(),
  refIds: React.createRef(),
  stories: [],
  refStories: React.createRef(),
}

export const favoritesReducer = (
  state = initialState,
  props,
): types.FavoritesState => {
  const { type, payload } = props
  const setIds = new Set(state.setIds)
  const refStories = state.refStories.current || []
  switch (type) {
    case types.INIT_FAVORITE:
      state.refIds.current = Array.from(payload.setIds)
      state.refStories.current = payload.stories
      return {
        ...state,
        setIds: payload.setIds,
        stories: payload.stories,
      }
    case types.ADD_FAVORITE: {
      setIds.add(payload.nid)
      state.refIds.current = Array.from(setIds)
      state.refStories.current = [payload.story, ...refStories]
      return {
        ...state,
        setIds,
      }
    }
    case types.REMOVE_FAVORITE: {
      setIds.delete(payload.nid)
      state.refIds.current = Array.from(setIds)
      state.refStories.current = refStories.filter(
        story => story.nid !== payload.nid,
      )
      return {
        ...state,
        setIds,
      }
    }
    case types.SET_IDS:
      state.refIds.current = payload.ids
      return {
        ...state,
        setIds: new Set(payload.ids),
      }
    case types.SET_STORIES:
      state.refStories.current = payload.stories
      return {
        ...state,
        stories: payload.stories,
      }
    default:
      return state
  }
}
