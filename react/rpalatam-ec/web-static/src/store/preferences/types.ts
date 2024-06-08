export const SET_AUTHORS = 'preferences.SET_AUTHORS'
export const SET_TAGS = 'preferences.SET_TAG'
export const HAS_ERROR = 'preferences.HAS_ERROR'

export const CLEAN_PREFERENCES = 'preferences.CLEAN_PREFERENCES'
export const SET_LOADING = 'preferences.SET_LOADING'

export type Author = {
  _id: string
  slug: string
  name: string
  image?: {
    url: string
  }
  description?: string
  notifications?: 'enabled' | 'disabled'
}

export type Tag = {
  _id: string
  name: string
  slug: string
  description: string
  notifications?: 'enabled' | 'disabled'
}

export type PreferencesState = {
  authors: {
    [field: string]: Author
  }
  tags: {
    [field: string]: Tag
  }
  isLoading: boolean
  error: any
}

export interface ConfirmOptions {
  heading: string
  highlight: string
  text: string
  textAccept?: string
  textDecline?: string
}

export type ConfirmResult = 'accepted' | 'declined'
