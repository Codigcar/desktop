import classNames from 'classnames'
import React from 'react'
import Swipeable from 'react-swipeable'
import './EAudioPlayer.css'

import { AppContext } from '../../context/app'
import { transform } from '../../tools/transform'
import Notification from '../../system/notification'

interface Props {
  show: boolean
}

class EAudioPlayer extends React.Component<Props> {
  progress = React.createRef<HTMLProgressElement>()
  wrapper = React.createRef<HTMLDivElement>()
  trackStarted = false
  trackProgressStarted = false
  trackProgressQuarter = false
  trackProgressHalf = false
  trackProgressThreeQuarters = false
  trackProgressEnd = false
  el: any

  componentDidUpdate(prevProps) {
    // const { sign } = this.context;
    const { show } = this.props
    if (show !== prevProps.show) {
      /* const { current } = this.progress;
      if (show && current.value !== 0 && current.value < 0.99 && true) {
        this.setState({
          showMiniPlayer: true,
        });
      } else {
        this.setState({
          showMiniPlayer: false,
        });
      } */
    }
  }

  componentWillUnmount() {
    const player: any = document.getElementById('player')
    if (player && player.duration !== player.currentTime) {
      const { audioContent } = this.context
      window.ga?.('gtm1.send', 'event', {
        eventCategory: 'Podcast',
        eventAction: 'playbackClosed',
        eventValue: Math.round(player.currentTime),
        eventLabel: `${audioContent.title}-${audioContent.id} | ${audioContent.program}`,
      })
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

  initProgressBar = () => {
    const player: any = document.getElementById('player')
    const progressbar = this.progress.current
    const percentage =
      Math.round((player.currentTime / player.duration) * 100) / 100

    if (percentage >= 0.25 && !this.trackProgressQuarter && this.trackStarted) {
      this.setGA({ action: 'playProgressQuarter' })
      this.trackProgressQuarter = true
    }

    if (percentage >= 0.5 && !this.trackProgressHalf && this.trackStarted) {
      this.setGA({ action: 'playProgressHalf' })
      this.trackProgressHalf = true
    }

    if (
      percentage >= 0.75 &&
      !this.trackProgressThreeQuarters &&
      this.trackStarted
    ) {
      this.setGA({ action: 'playProgressThreeQuarters' })
      this.trackProgressThreeQuarters = true
    }
    if (!progressbar || !player.duration) return
    progressbar.value = player.currentTime / player.duration
  }

  pausePodcast = () => {
    const { audioContent, toggleAudioPlay } = this.context
    const player: any = document.getElementById('player')
    const percentage =
      Math.round((player.currentTime / player.duration) * 100) / 100
    toggleAudioPlay(false)
    this.setGA({ action: 'playbackPaused' })

    if (percentage >= 1 && !this.trackProgressEnd) {
      this.setGA({ action: 'playProgressEnd' })
      this.trackProgressEnd = true
    }

    if (percentage >= 1) {
      window.ga?.('gtm1.send', 'event', {
        eventCategory: 'Podcast',
        eventAction: 'playbackFinished',
        eventValue: Math.round(player.currentTime),
        eventLabel: `${audioContent.title}-${audioContent.id} | ${audioContent.program}`,
      })
    }
  }

  playPodcast = () => {
    const { audioContent, toggleAudioPlay } = this.context
    /* const player = document.getElementById('player'); */
    /* const percentage =
      Math.round((player.currentTime / player.duration) * 100) / 100; */
    toggleAudioPlay(true)
    /* if (!this.trackStarted) {
      this.setGA({ action: 'playbackStarted' });
      this.trackStarted = true;
    } */
    /* if (percentage >= 0 && !this.trackProgressStarted) {
      this.setGA({ action: 'playProgressStarted' });
      this.trackProgressStarted = true;
    } */
    if (audioContent.loading.has(audioContent.src)) return
    this.setGA({ action: 'playbackPlay' })
  }

  errorPodcast = () => {
    const { audioPlaying } = this.context
    if (audioPlaying) {
      Notification.error({
        content: 'No se pudo reproducir el audio',
      })
    }
  }

  showPlayer = (event) => {
    event.preventDefault()
    const { toggleAudioPlayer } = this.context
    toggleAudioPlayer(true, false)
  }

  swipingLeft(e, deltax) {
    const el = this.el.childNodes[0]
    el.classList.add('noTransition')

    el.style.opacity = 1 - deltax / window.innerWidth
    transform(el, `translate3d(-${deltax}px,0,0)`)
  }

  swiped(e, deltaX, deltaY, isFlick, velocity) {
    const el = this.el.childNodes[0]
    el.classList.remove('noTransition')

    if ((velocity >= 0.2 && deltaX > 70) || deltaX >= window.innerWidth / 4) {
      // el.removeAttribute('style');
      transform(el, 'translate3d(-100vw,0,0)', () => {
        const {
          activePlayer,
          toggleAudioPlay,
          toggleAudioPlayer,
        } = this.context
        toggleAudioPlay(false)
        activePlayer(false)
        toggleAudioPlayer(false, false)
      })
    } else {
      this.wrapper.current?.removeAttribute('style')
      el.removeAttribute('style')
    }
  }

  render() {
    const { audioContent, audioPlaying, showAudioMiniPlayer } = this.context
    const inProgram = window.location.pathname.split('podcast/')
    const classes = classNames('audio-mini-player-wrapper', {
      'audio-mini-player-hide': !showAudioMiniPlayer || inProgram.length > 1,
    })

    return (
      <Swipeable
        innerRef={(el) => (this.el = el)}
        onSwiped={this.swiped.bind(this)}
        onSwipingLeft={this.swipingLeft.bind(this)}
      >
        <div ref={this.wrapper} className={classes}>
          <button type="button" onClick={this.showPlayer}>
            <figure>
              <img src={audioContent.image} alt="poster" />
              <div className="img-overlay">
                {audioPlaying ? (
                  <div className="audio-animation animated">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                ) : (
                  <div className="audio-animation">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                )}
              </div>
            </figure>
            <div>
              <audio
                id="player"
                onTimeUpdate={this.initProgressBar}
                onPause={this.pausePodcast}
                onPlay={this.playPodcast}
                src={audioContent.src}
              />
              <progress ref={this.progress} value="0" max="1" />
            </div>
          </button>
        </div>
      </Swipeable>
    )
  }
}

EAudioPlayer.contextType = AppContext

export default EAudioPlayer
