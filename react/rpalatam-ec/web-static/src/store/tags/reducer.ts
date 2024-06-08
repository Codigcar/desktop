import * as types from './types'

const initialState: types.TagsState = {
  data: [],
  isLoading: false,
  error: null,
}

export function tags(state = initialState, props): types.TagsState {
  const { type, payload } = props
  switch (type) {
    case types.TAGS_START:
      return {
        ...state,
        error: null,
        isLoading: true,
      }
    case types.TAGS_END:
      return {
        ...state,
        isLoading: false,
      }
    case types.TAGS_SUCCESS:
      const { data } = payload
      return {
        ...state,
        data,
      }
    case types.TAGS_FAILURE:
      const { error } = payload
      return {
        ...state,
        error,
      }
    default:
      return state
  }
}
