import * as types from './types'

const INITIAL_STATE: types.PreferencesState = {
  authors: {},
  tags: {},
  isLoading: false,
  error: null,
}

export const preferencesReducer = (
  state = INITIAL_STATE,
  { type, payload },
): types.PreferencesState => {
  switch (type) {
    case types.SET_AUTHORS:
      return {
        ...state,
        authors: payload,
      }
    case types.SET_TAGS:
      return {
        ...state,
        tags: payload,
      }
    case types.HAS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload,
      }
    case types.CLEAN_PREFERENCES:
      return {
        ...state,
        authors: {},
        tags: {},
        error: null,
      }
    case types.SET_LOADING:
      return {
        ...state,
        isLoading: payload,
      }
    default:
      return state
  }
}
