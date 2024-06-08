import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

import * as types from './types'
import NewsService from '../../services/news'
import { getQueryTvProgram } from '../../services/querys'

const onSuccessProgram = (program, data): types.ProgramActionTypes => ({
  type: types.TV_PROGRAM_SUCCESS,
  payload: {
    [program]: data,
  },
})

const onFailureProgram = (error): types.ProgramActionTypes => ({
  type: types.TV_PROGRAM_FAILURE,
  payload: {
    error,
  },
})

export const programFetch = (
  program,
  _params = { page: 0 },
): ThunkAction<void, any, null, Action<string>> => (
  dispatch,
  getState,
): void => {
  const { configBrand, tvState } = getState()
  if (tvState.programsDetail[program]) return
  const newService = new NewsService()
  const [TVPAGE] = configBrand.pages.filter(p => p.component === 'tv')
  const [{ path }] = TVPAGE.programs.filter(p => p.path === program)
  const fetchContent = newService.content({
    query: getQueryTvProgram(path),
    website: configBrand.name,
    sort: 'last_updated_date:desc',
    from: (_params.page || 0) * 10,
    size: 10,
  })
  fetchContent
    .then(({ content: programs }) => {
      const programsWithVideo = programs.filter(
        p =>
          p.promo_items?.basic_jwplayer ||
          p.promo_items?.basic_video ||
          p.promo_items?.youtube_id,
      )
      dispatch(onSuccessProgram(program, programsWithVideo))
    })
    .catch(error => {
      console.error(error)
      dispatch(onFailureProgram(error))
    })
}
