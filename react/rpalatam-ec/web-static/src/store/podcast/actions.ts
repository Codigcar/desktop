import * as types from './types'
import NewsService from '../../services/news'
import { getQueryPodcast } from '../../services/querys'

const onSuccessProgram = (program, data): types.PodcastActionTypes => ({
  type: types.PODCAST_PROGRAM_SUCCESS,
  payload: {
    [program]: data,
  },
})

const onFailureProgram = (error): types.PodcastActionTypes => ({
  type: types.PODCAST_PROGRAM_FAILURE,
  payload: {
    error,
  },
})

export const programFetch = (program, _params = { page: 0 }) => (
  dispatch,
  getState,
): void => {
  const { configBrand, podcastState } = getState()
  if (podcastState.programsDetail[program]) return
  const newService = new NewsService()
  const [PODCASTPAGE] = configBrand.pages.filter(p => p.component === 'podcast')
  const [{ query }] = PODCASTPAGE.programs.filter(p => p.path === program)
  const fetchContent = newService.content({
    query: getQueryPodcast(query),
    website: configBrand.name,
    sort: 'last_updated_date:desc',
    from: (_params.page || 0) * 20,
    size: 20,
  })
  fetchContent
    .then(({ content: programs }) => {
      const programsWithAudio = programs
        .map(p => {
          const audio = p?.promo_items?.path_mp3?.content || {}
          return { ...p, audio }
        })
        .filter(p => p.audio && p.audio !== '')
      dispatch(onSuccessProgram(program, programsWithAudio))
    })
    .catch(error => {
      console.error(error)
      dispatch(onFailureProgram(error))
    })
}
