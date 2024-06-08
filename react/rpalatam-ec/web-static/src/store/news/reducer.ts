import * as types from './types'

export const newsHasErrored = (
  state = { status: false, message: '', errorType: '' },
  props,
): {} => {
  const { type, payload } = props
  switch (type) {
    case types.NEWS_HAS_ERRORED:
      state = {
        status: payload.hasErrored,
        message: payload.message,
        errorType: payload.errorType,
      }
      return state
    default:
      return state
  }
}

export const aNewFetchSuccess = (state = {}, props): {} => {
  const { type, payload } = props
  switch (type) {
    case types.A_NEW_FETCH_SUCCESS:
      return Object.assign({}, state, payload.data)
    case types.NEWS_PULL_REFRESH:
      const pullState = Object.assign({}, state)
      pullState[payload.category] = payload.data
      return state
    default:
      return state
  }
}

export const aNewCategoryPage = (state = {}, props): {} => {
  const { type, payload } = props
  switch (type) {
    case types.A_NEW_CATEGORY_PAGE:
      if (!state[payload.category]) {
        const tmp = {}
        tmp[payload.category] = {
          page: payload.page || 0,
          firstConsultation: Date.now(),
        }
        return Object.assign({}, state, tmp)
      }
      if (payload.page === 0) {
        state[payload.category].firstConsultation = Date.now()
      }
      state[payload.category].page = payload.page
      return state
    default:
      return state
  }
}

export const breakingNews = (state = [], props) => {
  const { type, payload } = props
  switch (type) {
    case types.NEWS_BREAKING:
      return payload
    default:
      return state
  }
}
