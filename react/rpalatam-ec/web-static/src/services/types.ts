export interface ServiceNews {
  content_elements: Notice[]
  type: string
}

export interface Notice {
  canonical_url: string
  content_elements?: {
    caption?: string
    content?: string
    embed?: {
      config?: {
        block?: string
        data?: {
          author?: string
          title?: string
          text?: string
          img?: string
        }
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
    header?: Header
    rows?: Row
    type: string
    list_type: string
    subtype?: string
    url?: string
    _id: string
  }[]
  content_restrictions?: {
    content_code?: string
  }
  credits?: {
    by?: {
      name: string
    }[]
  }
  display_date?: string
  headlines: {
    basic: string
  }
  last_updated_date: string
  planning?: {
    story_length?: {
      character_count_actual?: number
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

type Audio = {
  _id: string
  content: string
}

type Image = {
  caption: string
  subtitle: string
  url: string
  _id: string
  additional_properties?: {
    fullSizeResizeUrl?: string
  }
}

type Header = {
  _id?: string
  content?: string
  type?: string
}[]

type Row = {
  _id?: string
  content?: string
  type?: string
}[][]

type PromoItems = {
  basic?: Image
  basic_gallery?: {
    promo_items?: {
      basic: Image
    }
    content_elements?: Image[]
  }
  basic_video?: Video
  basic_jwplayer?: {}
  path_mp3?: Audio
  youtube_id?: Youtube
}

type Video = {
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

export interface FormattedNews {
  audio?: string
  bajada?: string
  contenido?: string
  contenido_json?: {
    id?: string
    data: any
    type: string
  }
  creditos?: {
    name: string
  }
  fecha_publicacion: string
  media:
    | {
        description: string
        id: string
        ruta: string
        thumb: string
        title?: string
        type: 'image'
      }[]
    | undefined
  nid: string
  promo_items?: PromoItems
  relacionados: []
  restrictions?: string
  seccion: Section
  seccion_padre: Section
  tags: Tags[]
  tiempo_lectura: string | null
  tipo: TypeNews
  titulo: string
  url: string
}

type Section = {
  code: string
  nombre: string
  url: string
}

type TypeNews = 'image' | 'galeria' | 'video'

type Tags = {
  code: string
  nombre: string
  url: string
}

export type Query = {
  query: string
  website: string
  sort: string
  from: number
  size: number
}
