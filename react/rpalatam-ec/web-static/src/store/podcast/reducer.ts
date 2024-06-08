import * as types from './types'

const initialState: types.PodcastState = {
  data: [],
  isLoading: false,
  error: null,
  programs: null,
  programsDetail: {},
}

export function podcastReducer(
  state = initialState,
  props,
): types.PodcastState {
  const { type, payload } = props
  switch (type) {
    case types.PODCAST_PROGRAM_FAILURE:
      const { error } = payload
      return {
        ...state,
        error,
      }
    case types.PODCAST_PROGRAM_SUCCESS:
      return {
        ...state,
        programsDetail: {
          ...state.programsDetail,
          ...payload,
        },
      }
    default:
      return state
  }
}
