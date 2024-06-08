import React from 'react'
import Loadable from 'react-loadable'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import ERibbon from '../../components/eRibbon'
import { AppContext } from '../../context/app'
import Icon from '../../system/icon'
import { programFetch } from '../../store/podcast/actions'
import Modal from '../../system/modal'
import { dateFormat } from '../../tools/tools'

const ModalMPP = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "ModalMPP" */ '../../components/eModalMPP/modalRegister'
    ),
  loading: () => null,
})

interface Props {
  dispatch: any
  episodes: {
    nid: string
    titulo: string
    bajada: string
    audio: string
    fecha_publicacion: string
  }[]
  location: any
  match: any
}

class Program extends React.Component<Props> {
  program: {}
  detailProgram: any
  player: any
  constructor(props) {
    super(props)
    this.program = props.match.params.id
    const [PODCASTPAGE] = props.config.pages.filter(
      p => p.component === 'podcast',
    )
    const [detailProgram] = PODCASTPAGE.programs.filter(
      p => p.path === this.program,
    )
    this.detailProgram = detailProgram
  }

  componentDidMount() {
    const { activePlayer } = this.context
    const { dispatch, match } = this.props
    const program = match.params.id
    activePlayer()
    dispatch(programFetch(program))
  }

  componentWillUnmount() {
    const { audioPlaying, toggleAudioPlayer } = this.context
    /* if (this.player) {
      this.player.removeEventListener('loadeddata', this.loadedData);
    } */
    toggleAudioPlayer(false, audioPlaying)
  }

  getMediaSrc = episode => {
    const { tipo, media } = episode

    if (media === null || (Array.isArray(media) && media.length === 0)) {
      return ''
    }

    let src = ''
    switch (tipo) {
      case 'image':
      case 'imagen_completa':
      case 'foto_galeria':
      case 'galeria':
        src = media[0].thumb || ''
        break
      case 'infografia':
      case 'video':
        if (Array.isArray(media)) {
          src = media[0].thumb || ''
        } else {
          src = media.thumb || ''
        }
        break
      default:
        break
    }

    return src
  }

  getDate = date => {
    const months = [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Oct',
      'Nov',
      'Dic',
    ]
    const [day, month, year] = dateFormat(date, 'small').split('.')
    const monthNumber = Number(month)
    const today = new Date()
    let newDate = `${day} de ${months[monthNumber - 1]}.`
    if (Number(year) !== today.getFullYear()) {
      newDate += ` del ${year}`
    }
    return newDate
  }

  tooglePlay = (event, episode) => {
    event.preventDefault()
    const {
      audioPlaying,
      audioContent,
      profile,
      toggleAudioContent,
    } = this.context
    const player: any = document.getElementById('player')

    if (!profile?.uuid) {
      this.showModal()
      return
    }

    /* El audio que se desea reproducir ya se está reproduciendo */
    if (
      audioContent.src === episode.audio &&
      audioContent.id === episode.nid &&
      audioContent.program === this.program
    ) {
      if (audioContent.loading.has(episode.audio)) return
      if (audioPlaying) {
        player.pause()
      } else {
        player.play()
      }
    } else {
      if (
        (player && player.src !== '') ||
        (player && audioContent.program !== this.program)
      ) {
        player.pause()
        player.currentTime = 0
        if (audioContent.src !== episode.audio) {
          player.src = ''
        }
      }
      if (this.player) {
        this.player.removeEventListener('loadeddata', this.loadedData)
      }
      const audioIsLoading =
        audioContent.loading.has(episode.audio) ||
        audioContent.loaded.has(episode.audio)

      toggleAudioContent(
        {
          ...audioContent,
          loading: audioIsLoading
            ? audioContent.loading
            : new Set(audioContent.loading).add(episode.audio),
          id: episode.nid,
          src: episode.audio,
          image: this.getMediaSrc(episode),
          title: episode.titulo,
          program: this.program,
        },
        () => {
          if (audioContent.id !== episode.nid) {
            this.setGA({ action: 'playbackStarted' })
          }
          player.play()
          /* if (audioContent.loaded.has(episode.audio)) {
            player.play();
          } */
          this.player = player
          this.player.addEventListener('loadeddata', this.loadedData, false)
        },
      )
    }
  }

  loadedData = () => {
    const { audioContent, toggleAudioContent } = this.context
    const audiosLoading = new Set(audioContent.loading)
    audiosLoading.delete(audioContent.src)
    this.setGA({ action: 'playProgressStarted' })
    this.setGA({ action: 'playbackPlay' })
    toggleAudioContent({
      ...audioContent,
      loading: audiosLoading,
      loaded: new Set(audioContent.loaded).add(audioContent.src),
    })
    if (this.player) {
      /* this.player.play(); */
      this.player.removeEventListener('loadeddata', this.loadedData)
    }
  }

  setGA = ({ action }) => {
    const { audioContent } = this.context
    window.ga?.('gtm1.send', 'event', {
      eventCategory: 'Podcast',
      eventAction: action,
      eventLabel: `${audioContent.title}-${audioContent.id} | ${audioContent.program}`,
    })
  }

  showModal = () => {
    Modal.open({
      content: elm => (
        <ModalMPP myRef={elm} context={this.context} gaCategory="podcast" />
      ),
      myClass: 'is-modal-bottom is-modal-register is-modal-swh',
      animation: 'bottomFade',
    })
  }

  render() {
    const { audioContent, audioPlaying } = this.context
    const { episodes, location } = this.props
    return (
      <div className="podcast-program-view h-screen">
        <ERibbon
          content={{
            seccion: {
              nombre: location.state ? location.state.program : 'Programa TV',
            },
          }}
        />
        <div className="safe-area-with-ribbon safe-area-inset-bottom pt-48 h-full overflow-y-auto overflow-scrolling-touch">
          <div className="podcast-program__portada">
            <figure>
              <img alt="imagen del programa" src={this.detailProgram?.image} />
            </figure>
            <div className="podcast-program__portada-text">
              <div className="card__header">
                <h3 className="font-serif">{this.detailProgram?.title}</h3>
              </div>
              <div className="card__description">
                {this.detailProgram?.description}
              </div>
            </div>
          </div>
          {episodes ? (
            <>
              {episodes.length > 0 ? (
                <div className="podcast__video-player">
                  <div className="podcast__program">
                    <div style={{ padding: '0 16px' }}>
                      {episodes.map(episode => (
                        <div className="card__content" key={episode.nid}>
                          <div className="card-episode">
                            <div className="card__header">
                              <h3 className="font-serif">{episode.titulo}</h3>
                            </div>
                            {episode.bajada ? (
                              <div className="card__description">
                                {episode.bajada}
                              </div>
                            ) : null}
                            <div className="card__footer">
                              <button
                                type="button"
                                className="icon-play"
                                onClick={event =>
                                  this.tooglePlay(event, episode)
                                }
                              >
                                {audioContent.id === episode.nid &&
                                audioContent.loading.has(episode.audio) ? (
                                  <div className="card_btn_loading">
                                    <Icon type="loading" /> Cargando
                                  </div>
                                ) : (
                                  <>
                                    {audioContent.id === episode.nid &&
                                    audioContent.program === this.program &&
                                    audioPlaying ? (
                                      <div className="card_btn_pause">
                                        <Icon type="md-pause" /> Escuchando
                                      </div>
                                    ) : (
                                      <div>
                                        <Icon type="md-play" /> Escuchar
                                      </div>
                                    )}
                                  </>
                                )}
                              </button>
                              <p className="card__date">
                                {this.getDate(episode.fecha_publicacion)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="podcast-program-loading">No hay episodios</div>
              )}
            </>
          ) : (
            <div className="podcast-program-loading">
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
  const program = props.match.params.id
  return {
    config: state.configBrand,
    episodes: state.podcastState.programsDetail[program],
  }
}

export default withRouter(connect(mapStateToProps)(Program))
