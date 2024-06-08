import * as types from './types'

export const onSuccess = (codeTag, data): types.TagsActionTypes => ({
  type: types.TAGS_SUCCESS,
  payload: {
    codeTag,
    data,
  },
})

export const onFailure = (error): types.TagsActionTypes => ({
  type: types.TAGS_FAILURE,
  payload: {
    error,
  },
})
