import React from 'react'

import './eVideo.css'
import * as types from './types'
import JWPlayer from './JWPlayer'
import Powa from './Powa'

type Props = types.JWPlayer | types.PoWa

const EVideo: React.FC<Props> = ({ provider, ...restProps }) => {
  if (provider === 'jwplayer') {
    return <JWPlayer {...(restProps as types.JWPlayer)} />
  }

  if (provider === 'powa') {
    return <Powa {...(restProps as types.PoWa)} />
  }

  if (provider === 'youtube') {
    return (
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${restProps.id}?playsinline=1&enablejsapi=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }

  return null
}

export default React.memo(EVideo)
