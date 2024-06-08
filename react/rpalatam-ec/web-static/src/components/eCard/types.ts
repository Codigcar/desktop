export interface Props {
  category: string
  content: {
    bajada?: string
    creditos?: {
      name: string
    }
    fecha_publicacion: string
    nid: string
    tipo: string
    media: { thumb: string }[] | { thumb: string }
    url?: string
    titulo: string
    seccion: {
      nombre: string
      url: string
    }
    restrictions: string
    tiempo_lectura?: string
  }
  config: {
    components: {
      signwall?: boolean
    }
    marketing: {
      domain?: string
    }
    name: string
    third: {}
  }
  type?: string
  author?: boolean
  description?: boolean
  header?: boolean
  routePath?: string
  share?: boolean
  footer?: boolean
  media?: boolean
  position?: number
  timeRead?: boolean
  isFavorite?: boolean
}
