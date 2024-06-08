import React, { CSSProperties } from 'react'
import { InView } from 'react-intersection-observer'

import Icon from '../../system/icon'
import { getBrand } from '../../tools/tools'

type Episode = {
  media:
    | { thumb: string; data?: { thumb: string } }[]
    | { thumb: string; data?: { thumb: string } }
  tipo: string
  titulo: string
}

interface Props {
  data: {
    brand: string
    episodes: Episode[]
    showVideo(Episode): void
  }
  index: number
  style?: CSSProperties
}

class ECardVideoTv extends React.PureComponent<Props> {
  brand = getBrand()

  getMediaSrc() {
    const {
      data: { episodes },
      index,
    } = this.props
    const episode = episodes[index]
    const { tipo, media } = episode
    if (media === null || (Array.isArray(media) && media.length === 0)) {
      return ''
    }

    let src = ''
    switch (tipo) {
      case 'image':
        if (Array.isArray(media)) {
          src = media[0].thumb || ''
        } else {
          src = media.thumb || ''
        }
        break
      case 'video':
        if (Array.isArray(media)) {
          src = media[0].data?.thumb || ''
        } else {
          src = media.data?.thumb || ''
        }
        break
      default:
        break
    }

    return src.replace(
      'listing_ec_seccion_separador_fotos',
      'listing_ec_home_principal2x1',
    )
  }

  render() {
    const {
      data: { episodes, showVideo },
      index,
      style,
    } = this.props
    const episode = episodes[index]
    return (
      <div style={style}>
        <div className="perutv__video">
          <button
            type="button"
            onClick={() => {
              showVideo(episode)
            }}
          >
            <figure className="perutv__video-wrapper">
              {/* episode.recent && (
                <div className="new-episode">{episode.recent}</div>
              ) */}
              <InView triggerOnce>
                {({ inView, ref }) => (
                  <div ref={ref}>
                    <img
                      decoding="async"
                      src={
                        inView
                          ? this.getMediaSrc()
                          : `${process.env.PUBLIC_URL}/brands/${this.brand}/placeholder.svg`
                      }
                      alt="TV"
                    />
                  </div>
                )}
              </InView>
              <figcaption className="icon-type">
                <Icon type="md-play" style={{ fontSize: 15, color: '#FFF' }} />
              </figcaption>
            </figure>
            <div className="perutv__description">
              <h5>{episode.titulo}</h5>
            </div>
          </button>
        </div>
      </div>
    )
  }
}

export default ECardVideoTv
