type PreferenceEntity = {
  _id: string
  name: string
  slug: string
}

type Preferencesx = {
  authors: {
    [id: string]: PreferenceEntity
  }
  tags: {
    [id: string]: PreferenceEntity
  }
  newsletter: string[]
}

type Topics = Preferencesx & {
  favorites: string[]
}

type FetchParams = {
  brand: string
  type: keyof Topics
  uuid: string
}
