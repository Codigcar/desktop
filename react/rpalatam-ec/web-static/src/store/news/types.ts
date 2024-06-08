export const NEWS_HAS_ERRORED = 'news.NEWS_HAS_ERRORED'
export const A_NEW_DELETE = 'news.A_NEW_DELETE'
export const MERGE_FAVORITES = 'news.MERGE_FAVORITES'
export const A_NEW_FETCH_SUCCESS = 'news.A_NEW_FETCH_SUCCESS'
export const CLEAN_CATEGORY_NEWS = 'news.CLEAN_CATEGORY_NEWS'
export const A_NEW_CATEGORY_PAGE = 'news.A_NEW_CATEGORY_PAGE'
export const NEWS_PULL_REFRESH = 'news.NEWS_PULL_REFRESH'
export const NEWS_BREAKING = 'news.NEWS_BREAKING'

interface FetchSuccessAction {
  type: typeof A_NEW_FETCH_SUCCESS
  payload: {
    data: {}
  }
}

interface PullRefreshAction {
  type: typeof NEWS_PULL_REFRESH
}

interface NewCategoryPageAction {
  type: typeof A_NEW_CATEGORY_PAGE
  payload: {
    category: string
    page: number
  }
}

interface NewsHasErrorAction {
  type: typeof NEWS_HAS_ERRORED
  payload: {
    hasErrored: boolean
    message: string | Error
    errorType: string
  }
}

export type FetchNewsActionTypes = FetchSuccessAction | PullRefreshAction

export type CategoryPageActionType = NewCategoryPageAction

export type ErrorActionType = NewsHasErrorAction
