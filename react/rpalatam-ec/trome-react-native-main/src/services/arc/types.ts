export type Query = {
  page: number
  query?: string
  size?: number
  sort?: 'last_updated_date:asc' | 'last_updated_date:desc'
}

export interface ServiceNews {
  content_elements: Notice[]
  type: string
}

export type ContentElement = {
  content?: string
  embed?: {
    config: {
      [field: string]: string
    }
  }
  headlines?: {
    basic: string
  }
  items?: {
    content: string
    type: string
    _id: string
  }[]
  promo_image?: {
    url: string
  }
  referent?: {
    id: string
  }
  streams?: {
    stream_type: string
    url: string
  }[]
  subtitle?: string
  type: string
  subtype?: string
  url?: string
  _id: string
}

export interface Notice {
  canonical_url?: string
  content_elements?: ContentElement[]
  content_restrictions?: {
    content_code?: 'free' | 'metered' | 'premium'
  }
  credits?: {
    by?: {
      name: string
    }[]
  }
  display_date?: string
  headlines?: {
    basic?: string
  }
  last_updated_date?: string
  planning?: {
    story_length?: {
      word_count_actual?: number
    }
  }
  promo_items?: PromoItems
  related_content?: {
    basic?: []
  }
  subheadlines?: {
    basic?: string
  }
  taxonomy?: {
    primary_section?: {
      name?: string
      path?: string
      referent?: {
        id: string
      }
      type?: string
    }
    tags?: {
      slug?: string
      text?: string
    }[]
  }
  type?: string
  _id: string
}

type Image = {
  caption?: string
  subtitle?: string
  url: string
  _id: string
  additional_properties?: {
    fullSizeResizeUrl?: string
  }
}

type Audio = {
  _id: string
  content: string
}

export type PromoItems = {
  basic?: Image
  basic_gallery?: {
    content_elements?: Image[]
  }
  basic_video?: Video
  basic_jwplayer?: Partial<ContentElement>
  path_mp3?: Audio
  youtube_id?: Youtube
}

export type Video = {
  description?: {
    basic?: string
  }
  promo_image?: {
    url?: string
  }
  referent?: {
    id: string
  }
  streams?: {
    stream_type: string
    url: string
  }[]
  _id: string
}

type Youtube = {
  content: string
}

export type Section = {
  code: string
  nombre: string
  url: string
}

export type Tag = {
  code?: string
  nombre?: string
  url?: string
}

// Content-Types:
export type ContentText = {
  id: string
  data?: string
  type: 'html'
}

type ContentImage = {
  data: {
    description?: string
    ruta?: string
    thumb?: string
    type: string
  }
  type: string
}

type ContentRelated = {
  related:
    | {
        id: string
        path: string
        content: string
      }[]
    | undefined
  type: 'related'
  data?: string
}

type ContentOther = {
  type: 'other'
  data: string
}

type ContentTags = {
  code?: string
  slug?: string
  titulo?: string
}

export type ContentSection = {
  code?: string
  nombre: string
  url?: string
}

export type ContentMedia = {
  ruta: string
  thumb: string
  type: string
  description: string
}

export type ContentAttr =
  | ContentImage
  | ContentRelated
  | ContentText
  | ContentOther
  | undefined

export type SingleContent =
  | ContentAttr[]
  | ('image' | 'video' | 'galeria')
  | ContentTags[]
  | ContentSection
  | (ContentSection | { adSection: string })
  | ContentMedia[]
  | undefined
  | null
