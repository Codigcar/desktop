import { FilterKeys } from './search'
import { Story } from '../../entities/Story'

export type SearchState = {
  filters: Map<FilterKeys, string>
  hasMore: boolean
  hasError: boolean
  page: number
  status: 'idle' | 'started' | 'done'
  results: Story[]
  orderInverse: boolean
}

export const initialState: SearchState = {
  filters: new Map(),
  hasMore: true,
  hasError: false,
  page: 0,
  status: 'idle',
  results: [],
  orderInverse: false,
}

type SearchAction =
  | { type: 'init' }
  | { type: 'failure' }
  | { type: 'reset' }
  | { type: 'restore' }
  | { type: 'clear'; payload?: { searchTerm?: string } }
  | {
      type: 'success'
      payload: {
        results: Story[]
        filters: Map<FilterKeys, string>
        orderInverse: boolean
        hasMore: boolean
        page: number
      }
    }

export const searchReducer = (
  state = initialState,
  action: SearchAction,
): SearchState => {
  switch (action.type) {
    case 'init':
      return { ...state, hasError: false, status: 'started' }
    case 'success': {
      const {
        payload: { results, filters, orderInverse, hasMore, page },
      } = action
      return {
        ...state,
        page,
        orderInverse,
        results,
        filters,
        hasMore,
        status: 'done',
        hasError: false,
      }
    }
    case 'clear': {
      const { payload } = action
      const nextFilters = new Map<FilterKeys, string>()
      if (payload?.searchTerm !== undefined) {
        nextFilters.set('term', payload?.searchTerm)
      }
      return { ...initialState, filters: nextFilters }
    }
    case 'failure':
      return { ...state, hasError: true, status: 'done' }
    case 'reset': {
      const hasResults = state.results.length > 0
      return { ...state, status: hasResults ? 'done' : 'idle' }
    }
    case 'restore': {
      return initialState
    }
    default:
      return state
  }
}
