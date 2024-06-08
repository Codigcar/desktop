export const TV_PROGRAM_SUCCESS = 'tv.TV_PROGRAM_SUCCESS'
export const TV_PROGRAM_FAILURE = 'tv.TV_PROGRAM_FAILURE'

interface OnSuccessProgramAction {
  type: typeof TV_PROGRAM_SUCCESS
  payload: {}
}

interface OnFailureProgramAction {
  type: typeof TV_PROGRAM_FAILURE
  payload: {
    error: typeof Error
  }
}

export type ProgramActionTypes = OnSuccessProgramAction | OnFailureProgramAction

export type TVState = Readonly<{
  data: []
  isLoading: boolean
  error: null | Error
  programs: null | []
  programsDetail: object
}>
