import * as types from './types'

const initialState: types.TVState = {
  data: [],
  isLoading: false,
  error: null,
  programs: null,
  programsDetail: {},
}

export function tvReducer(state = initialState, props): types.TVState {
  const { type, payload } = props
  switch (type) {
    case types.TV_PROGRAM_SUCCESS:
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
