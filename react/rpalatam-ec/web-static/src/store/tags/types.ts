export const TAGS_START = 'tags.TAGS_START'
export const TAGS_END = 'tags.TAGS_END'
export const TAGS_SUCCESS = 'tags.TAGS_SUCCESS'
export const TAGS_FAILURE = 'tags.TAGS_FAILURE'

interface TagsStartAction {
  type: typeof TAGS_START
}

interface TagsEndAction {
  type: typeof TAGS_END
}

interface OnSuccessAction {
  type: typeof TAGS_SUCCESS
  payload: {
    codeTag: string
    data: []
  }
}

interface OnFailureAction {
  type: typeof TAGS_FAILURE
  payload: {
    error: Error
  }
}

export type TagsActionTypes =
  | TagsStartAction
  | TagsEndAction
  | OnSuccessAction
  | OnFailureAction

export type TagsState = Readonly<{
  data: []
  isLoading: boolean
  error: null | Error
}>
