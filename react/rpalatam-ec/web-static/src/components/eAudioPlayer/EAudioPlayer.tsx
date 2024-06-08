import classNames from 'classnames'
import React from 'react'
import './EAudioPlayer.css'

import { AppContext } from '../../context/app'
import Icon from '../../system/icon'
import IconWrapper from '../../system/icon/icon-wrapper'

interface Props {
  show: boolean
}

class EAudioPlayer extends React.Component<Props> {
  slider = React.createRef()

  state = {
    slideMove: false,
  }

  searchPlayer: any
  timeoutId: any

  componentDidUpdate(prevProps) {
    const { show } = this.props
    if (prevProps.show !== show) {
      if (show) {
        this.searchPlayer = setInterval(() => {
          const player: any = document.getElementById('player')
          if (player) {
            player.addEventListener('timeupdate', this.initProgressBar, false)
            if (player.duration) {
              this.setAudioStatus()
            } else {
              player.addEventListener('loadeddata', this.setAudioStatus, false)
            }
            clearInterval(this.searchPlayer)
          }
        }, 100)
      } else {
        /* const player = document.getElementById('player');
        if (player) {
          player.removeEventListener('timeupdate', this.initProgressBar);
          player.removeEventListener('loadeddata', this.setAudioStatus);
        } */
      }
    }
  }

  componentWillUnmount() {
    const player = document.getElementById('player')
    if (player) {
      player.removeEventListener('timeupdate', this.initProgressBar)
      player.removeEventListener('loadeddata', this.setAudioStatus)
    }
  }

  setAudioStatus = () => {
    const player: any = document.getElementById('player')
    const timemarker = document.getElementById('time-mark')
    const rangebar = document.getElementById('range-obj')
    const percent = player.currentTime / player.duration
    const movX = percent * (rangebar!.offsetWidth - 19)
    const totalLength = this.calculateTotalValue(player.duration)
    const currentTime = this.calculateCurrentValue(player.currentTime)

    const startElement = document.getElementById('start-time')
    const endElement = document.getElementById('end-time')
    if (startElement && endElement) {
      startElement.innerHTML = currentTime
      endElement.innerHTML = totalLength
    }
    rangebar?.setAttribute('max', player.duration)
    if (timemarker) {
      timemarker.style.transform = `translate3d(calc(${movX}px - 100%),0,0)`
    }
  }

  initProgressBar = () => {
    const player: any = document.getElementById('player')
    const length = player.duration
    const current_time = player.currentTime
    const rangebar: any = document.getElementById('range-obj')
    const timemarker = document.getElementById('time-mark')

    if (!length) return

    // calculate current value time
    const currentTime = this.calculateCurrentValue(current_time)
    document.getElementById('start-time')!.innerHTML = currentTime

    if (!this.state.slideMove) {
      // const progressbar = document.getElementById('seek-obj');
      const percent = player.currentTime / player.duration
      const movX = percent * (rangebar.offsetWidth - 19)
      // progressbar.value = player.currentTime / player.duration;
      /* rangebar.style.backgroundSize = `${percent * 100}% 100%`; */
      rangebar.value = player.currentTime
      timemarker!.style.transform = `translate3d(calc(${movX}px - 100%),0,0)`
    }
  }

  /* seek(event) {
    const player = document.getElementById('player');
    const progressbar = document.getElementById('seek-obj');
    const percent = event.nativeEvent.offsetX / progressbar.offsetWidth;
    player.currentTime = percent * player.duration;
    progressbar.value = percent / 100;
  } */

  calculateTotalValue = length => {
    const minutes = Math.floor(length / 60)
    const seconds = Math.round(length - minutes * 60)
    // padStart(2,"0");
    return `${minutes > 9 ? minutes : `0${minutes}`}:${
      seconds > 9 ? seconds : `0${seconds}`
    }`
  }

  calculateCurrentValue = (currentTime): string => {
    // let current_hour = parseInt(currentTime / 3600) % 24;
    const currentMinute = parseInt(String(currentTime / 60)) % 60
    const currentSecondsLong = currentTime % 60
    const currentSeconds = Number(currentSecondsLong.toFixed())
    const newCurrentTime = `${
      currentMinute < 10 ? `0${currentMinute}` : currentMinute
    }:${currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds}`
    return newCurrentTime
  }

  changeTimeEndAudio = event => {
    const elm = event.target
    const player: any = document.getElementById('player')
    const timemarker = document.getElementById('time-mark')
    timemarker?.classList.remove('noTransition')
    player.currentTime = elm.value
    this.setState({
      slideMove: false,
    })
  }

  changeTimeAudio = event => {
    // const progressbar = document.getElementById('seek-obj');
    const rangebar = document.getElementById('range-obj')
    const timemarker = document.getElementById('time-mark')
    const elm = event.target
    const percent = elm.value / elm.max
    // progressbar.value = elm.value / elm.max;
    timemarker?.classList.add('noTransition')
    /* rangebar.style.backgroundSize = `${percent * 100}% 100%`; */
    timemarker!.style.transform = `translate3d(calc(${percent *
      (rangebar!.offsetWidth - 19)}px - 100%),0,0)`
  }

  updateSeconds = (time = 10) => {
    const player: any = document.getElementById('player')
    // const timemarker = document.getElementById('time-mark');
    // const rangebar = document.getElementById('range-obj');
    // const percent = (player.currentTime + time) / player.duration;
    // const movX = percent * (rangebar.offsetWidth - 19);
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
    // timemarker.style.transform = `translate3d(${movX}px,0,0)`;
    this.timeoutId = setTimeout(() => {
      player.currentTime += time
    }, 200)
    // timemarker.style.transform = `translate3d(calc(${movX}px - 100%),0,0)`;
  }

  tooglePlay = () => {
    const { audioPlaying } = this.context
    const player: any = document.getElementById('player')

    if (audioPlaying) {
      player.pause()
    } else {
      player.play()
    }
  }

  /* showModal = () => {
    const { config, history } = this.props;
    const showFacebook = validVersionApp(config.name);
    Modal.open({
      content: elm => (
        <ModalMPP
          myRef={elm}
          context={this.context}
          gaCategory="podcast"
          history={history}
          pageFrom="podcast"
          social={{ facebook: showFacebook }}
        />
      ),
      myClass: 'is-modal-bottom is-modal-register is-modal-swh',
      animation: 'bottomFade',
    });
  }; */

  hideAudioPlayer = event => {
    event.preventDefault()
    const { toggleAudioPlayer } = this.context
    toggleAudioPlayer(false, true)
  }

  render() {
    const { audioContent, audioPlaying, showAudioPlayer } = this.context
    const classes = classNames('audio-player__wrapper', {
      'audio-player-hide': !showAudioPlayer,
    })

    return (
      <div className={classes}>
        <div className="audio-player__content">
          <div className="audio-player__header">
            <figure className="audio-player__image">
              {audioContent.image && (
                <img src={audioContent.image} alt="imagen del episodio" />
              )}
            </figure>
            <div className="audio-player__title">
              <h2>{audioContent.title}</h2>
            </div>
          </div>
          <div className="audio-player__footer">
            <div className="audio-player__player">
              <div className="progress-bar">
                <input
                  id="range-obj"
                  type="range"
                  min="0"
                  max="129"
                  step="0.001"
                  defaultValue={0}
                  onChange={this.changeTimeAudio}
                  onTouchEnd={this.changeTimeEndAudio}
                  onMouseUp={this.changeTimeEndAudio}
                  onTouchStart={() => {
                    this.setState({ slideMove: true })
                  }}
                />
                <div id="time-mark" />
              </div>
              <div className="player-progress">
                <small id="start-time">00:00</small>
                <small id="end-time">--:--</small>
              </div>
              <div className="player__controllers">
                {audioContent.loading.has(audioContent.src) ? (
                  <IconWrapper size="large">
                    <Icon type="loading" style={{ fontSize: 32 }} />
                  </IconWrapper>
                ) : (
                  <React.Fragment>
                    <div>
                      <button
                        type="button"
                        onClick={() => this.updateSeconds(-10)}
                      >
                        <IconWrapper size="large">
                          <Icon type="md-replay-10" />
                        </IconWrapper>
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="icon-play"
                        onClick={this.tooglePlay}
                      >
                        <Icon type={audioPlaying ? 'md-pause' : 'md-play'} />
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => this.updateSeconds(10)}
                      >
                        <IconWrapper size="large">
                          <Icon type="md-fordward-10" />
                        </IconWrapper>
                      </button>
                    </div>
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
        <button
          className="audio-player__back"
          type="button"
          onClick={this.hideAudioPlayer}
        />
      </div>
    )
  }
}

EAudioPlayer.contextType = AppContext

export default EAudioPlayer
