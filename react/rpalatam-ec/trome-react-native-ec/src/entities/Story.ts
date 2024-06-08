type Image = {
  id: string
  url: string
}

type Video = {
  id: string
  thumb: string
  provider: string
}

export type PromoItems = {
  basic?: Image
  gallery?: Image[]
  video?: Video
}

export type Section = {
  name: string
  path: string
}

export class Story {
  public readonly id!: string
  public headline?: string
  public last_updated_date?: string
  public promo_items?: PromoItems
  /**
   * Reading time in minutes
   */
  public reading_time?: number
  public restrictions?: 'free' | 'metered' | 'premium'
  public section?: Section
  public subheadline?: string
  public type?: keyof PromoItems
  public url?: string

  constructor(props: Story) {
    Object.assign(this, props)
  }
}
