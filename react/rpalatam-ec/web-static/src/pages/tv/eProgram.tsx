import React from 'react'
import { InView } from 'react-intersection-observer'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import EVideoPlayer from './eVideoPlayer'
import ERibbon from '../../components/eRibbon'
import { AppContext } from '../../context/app'
import Icon from '../../system/icon'
import { programFetch } from '../../store/tv/actions'
import Modal from '../../system/modal'

interface Props {
  config: any
  dispatch: any
  episodes: { nid: string; video: string; titulo: string; recent: boolean }[]
  location: any
  match: any
}

class Program extends React.Component<Props> {
  videoIframe = React.createRef()

  componentDidMount() {
    const { dispatch, match } = this.props
    const [path] = match.path.split('/').slice(-1)
    if (path) {
      dispatch(programFetch(path))
    }
  }

  showVideo = episode => {
    const { config } = this.props
    const { paywallStatus } = this.context

    const basic_jwplayer = episode?.promo_items?.basic_jwplayer
    const has_ads = basic_jwplayer?.embed?.config?.has_ads

    if (has_ads && paywallStatus) {
      episode.promo_items.basic_jwplayer.embed.config.has_ads = 0
    }
    Modal.open({
      content: elm => <EVideoPlayer {...episode} config={config} myRef={elm} />,
      myClass: 'is-modal-center is-video-player',
      animation: 'modalBack',
      disableBack: true,
    })
  }

  getMediaSrc = episode => {
    const { tipo, media } = episode

    if (media === null || (Array.isArray(media) && media.length === 0)) {
      return ''
    }

    let src = ''
    switch (tipo) {
      case 'image': {
        if (Array.isArray(media)) {
          src = media[0].thumb || ''
        } else {
          src = media.thumb || ''
        }
        break
      }
      case 'video':
        if (Array.isArray(media)) {
          src = media[0].data.thumb || ''
        } else {
          src = media.data.thumb || ''
        }
        break
      default:
        break
    }

    return src
  }

  render() {
    const { config, episodes, location } = this.props
    return (
      <div className="tv-program-view page-view">
        <ERibbon
          content={{
            seccion: {
              nombre: location.state ? location.state.program : 'Programa TV',
            },
          }}
        />
        <div className="h-full overflow-y-auto overflow-scrolling-touch safe-area-pt-48 pt-48">
          {episodes && episodes.length > 0 ? (
            <div className="perutv__video-player">
              <div className="perutv__iframe-video">
                <video
                  src={episodes[0].video}
                  controls={false}
                  poster={this.getMediaSrc(episodes[0])}
                  preload="none"
                />
                <button
                  type="button"
                  className="btn-play-episode"
                  onClick={() => {
                    this.showVideo(episodes[0])
                  }}
                >
                  <Icon
                    type="md-play-circle"
                    style={{ fontSize: 48, color: '#FFF' }}
                  />
                </button>
              </div>
              <div className="perutv__portada-text">
                <div className="perutv__description">
                  <h5>{episodes[0].titulo}</h5>
                  {/* <p>{episodes[0].description}</p> */}
                </div>
              </div>
              <div className="perutv__program">
                <div className="perutv__title">
                  <h3 className="font-serif">Últimos episodios</h3>
                </div>
                <div style={{ padding: '0 20px' }}>
                  {episodes.slice(1).map(episode => (
                    <button
                      type="button"
                      key={episode.nid}
                      onClick={() => this.showVideo(episode)}
                    >
                      <div className="card-video">
                        <figure>
                          {episode.recent && (
                            <div className="new-episode">{episode.recent}</div>
                          )}
                          <InView triggerOnce>
                            {({ inView, ref }) => (
                              <div ref={ref}>
                                <img
                                  decoding="async"
                                  src={
                                    inView
                                      ? this.getMediaSrc(episode)
                                      : `${process.env.PUBLIC_URL}/brands/${config.name}/placeholder.svg`
                                  }
                                  alt="episodio"
                                />
                              </div>
                            )}
                          </InView>
                          <figcaption className="icon-type">
                            <Icon
                              type="md-play"
                              style={{ fontSize: 15, color: '#FFF' }}
                            />
                          </figcaption>
                        </figure>
                        <p className="font-serif">{episode.titulo}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <Icon type="loading" style={{ fontSize: 24 }} />
            </div>
          )}
        </div>
      </div>
    )
  }
}

Program.contextType = AppContext

const mapStateToProps = (state, props) => {
  const [path] = props.match.path.split('/').slice(-1)
  return {
    config: state.configBrand,
    episodes: state.tvState.programsDetail[path],
  }
}

export default withRouter(connect(mapStateToProps)(Program))
