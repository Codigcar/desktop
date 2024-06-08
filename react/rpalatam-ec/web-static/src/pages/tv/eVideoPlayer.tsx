import React from 'react'

import Icon from '../../system/icon'
import IconWrapper from '../../system/icon/icon-wrapper'
import EVideo from '../../components/eVideo'
import * as IVideo from '../../components/eVideo/types'
import {
  getJwplayerAttributes,
  getPowaAttributes,
} from '../../components/eVideo/utils'

interface Props {
  config: any
  media?: { thumb: string }[] | { thumb: string }
  myRef: any
  seccion_padre?: {
    code: string
  }
  promo_items?: {
    basic_jwplayer?: {}
    basic_video?: {
      _id: string
    }
    youtube_id?: {
      content: string
    }
  }
  tipo?: string
  titulo?: string
}

class EVideoPlayer extends React.PureComponent<Props> {
  getVideo(data) {
    const { config } = this.props
    const id = data.stream ? config.powa.prod.uuid : data.id
    type ParamsOmit = 'id' | 'provider' | 'thumb'
    const powaProps: Omit<IVideo.PoWa, ParamsOmit> = {
      brand: config.powa.brand,
      stream: data.stream?.url,
    }
    const jwplayerProps: Omit<IVideo.JWPlayer, ParamsOmit> = {
      playerId: config.jwplayers[data.account],
      hasAds: data.has_ads,
    }
    return (
      <EVideo
        id={id}
        provider={data.provider}
        preload="none"
        thumb={data.thumb}
        {...jwplayerProps}
        {...powaProps}
      />
    )
  }

  multimedia = () => {
    const { promo_items: media } = this.props
    if (media?.youtube_id) {
      setTimeout(() => {
        const iframe: HTMLIFrameElement | null = document.querySelector(
          '.player',
        )
        if (iframe) {
          const width = Math.min(
            iframe.offsetWidth,
            iframe.parentElement?.clientWidth || 0,
          )
          iframe.width = `${width}px`
          iframe.height = `${width / (16 / 9)}px`
        }
      }, 500)
      return (
        <iframe
          title="player"
          className="player"
          src={`https://www.youtube.com/embed/${media.youtube_id.content}`}
          allowFullScreen
        />
      )
    }
    let data
    if (media?.basic_jwplayer) {
      data = getJwplayerAttributes(media.basic_jwplayer).data
    } else if (media?.basic_video) {
      data = getPowaAttributes(media.basic_video).data
    }
    return this.getVideo(data)
  }

  render() {
    const { titulo, myRef } = this.props
    return (
      <div className="perutv__video-player-wrapper">
        <div className="video-controls">
          <IconWrapper size="large" />
          <div className="video-title">{titulo}</div>
          <div>
            <button type="button" onClick={() => myRef.remove()}>
              <Icon type="ios-close" style={{ color: '#FFF', fontSize: 36 }} />
            </button>
          </div>
        </div>
        <div className="perutv__iframe-video">{this.multimedia()}</div>
      </div>
    )
  }
}

export default EVideoPlayer
