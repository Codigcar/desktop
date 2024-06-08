import React, { useEffect } from 'react'

import * as types from './types'
import { addScriptAsync } from '../../tools/loadScriptAsync'

declare global {
  interface Window {
    jwplayer: any
  }
}

function init({ id, jwplayerId, preload }) {
  addScriptAsync({
    name: `JWPlayer-${jwplayerId}`,
    url: `https://cdn.jwplayer.com/libraries/${jwplayerId}.js`,
  }).then(() => {
    window.jwplayer?.(`botr_${id}_${jwplayerId}_div`)?.setup?.({
      playlist: `https://cdn.jwplayer.com/v2/media/${id}`,
      preload: preload || 'metadatos',
    })
  })
}

const JWPlayer: React.FC<types.JWPlayer> = ({
  id,
  hasAds,
  playerId,
  preload,
}) => {
  const jwplayerId = hasAds ? playerId.playerAds : playerId.player

  useEffect(() => {
    init({ id, jwplayerId, preload })
    return () => {
      window.jwplayer?.().remove?.()
    }
  }, [id, jwplayerId, preload])

  return <div id={`botr_${id}_${jwplayerId}_div`} />
}

export default JWPlayer
