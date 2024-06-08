import { combineReducers } from 'redux'

import { favoritesReducer } from './favorites/reducer'
import {
  breakingNews,
  newsHasErrored,
  aNewFetchSuccess,
  aNewCategoryPage,
} from './news/reducer'
import { tvReducer } from './tv/reducer'
import { podcastReducer } from './podcast/reducer'
import { preferencesReducer } from './preferences/reducer'
import { topicsReducer } from './topics/reducer'

export type ConfigState = {
  ads: {
    home: { data: {}; index: number }[]
  }
  components?: { menuBottom?: boolean }
  main: string
  name: string
  navigationTop: []
  pages?: {
    component: string
    programs: {
      title: string
      image: string
      description: string
      path: string
      query: string
    }[]
  }[]
  marketing: {
    url: string
    domain: string
    brand: string
  }
}

const initialState: ConfigState = {} as ConfigState

const configReducer = (state = initialState, action): ConfigState => {
  switch (action.type) {
    case 'LOADING_CONFIG':
      return action.config
    default:
      return state
  }
}

const rootReducer = combineReducers({
  configBrand: configReducer,
  favorites: favoritesReducer,
  breakingNews,
  newsHasErrored,
  aNewFetchSuccess,
  aNewCategoryPage,
  tvState: tvReducer,
  podcastState: podcastReducer,
  preferences: preferencesReducer,
  topics: topicsReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
