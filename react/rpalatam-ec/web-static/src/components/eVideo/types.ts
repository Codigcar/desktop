type Provider = 'powa' | 'jwplayer'

interface Video {
  id: string
  thumb: string
  provider: Provider
}

type Preload = 'none' | 'metadatos'

export interface JWPlayer extends Video {
  hasAds: boolean
  playerId: {
    player: string
    playerAds: string
  }
  preload?: Preload
}

export interface PoWa extends Video {
  brand: string
  preload?: Preload
  stream?: string
}
