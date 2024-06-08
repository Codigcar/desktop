export const PODCAST_PROGRAM_SUCCESS = 'podcast.PODCAST_PROGRAM_SUCCESS'
export const PODCAST_PROGRAM_FAILURE = 'podcast.PODCAST_PROGRAM_FAILURE'

interface OnSuccessProgramAction {
  type: typeof PODCAST_PROGRAM_SUCCESS
  payload: {}
}

interface OnFailureProgramAction {
  type: typeof PODCAST_PROGRAM_FAILURE
  payload: {
    error: Error
  }
}

export type PodcastActionTypes = OnSuccessProgramAction | OnFailureProgramAction

export type PodcastState = Readonly<{
  data: []
  isLoading: boolean
  error: null | Error
  programs: null | []
  programsDetail: {}
}>
