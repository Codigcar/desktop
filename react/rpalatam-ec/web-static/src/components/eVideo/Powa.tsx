import React, { useEffect } from 'react'

import * as types from './types'
import { addScriptAsync } from '../../tools/loadScriptAsync'
import { getDomain } from '../../tools/tools'

declare global {
  interface Window {
    PoWa: any
    powaBoot(): void
    PoWaSettings: any
  }
}

const SCRIPT = {
  name: 'PoWa',
  url: 'https://d1tqo5nrys2b20.cloudfront.net/prod/powaBoot.js?org=elcomercio',
}
const URL = `https://${getDomain()}/`

function init(brand) {
  let settingInterval
  addScriptAsync(SCRIPT).then(() => {
    setTimeout(() => {
      window.powaBoot()
      if (!settingInterval) {
        settingInterval = setInterval(() => {
          if (window.PoWaSettings?.advertising) {
            window.PoWaSettings.maxBitrate.mobile = 600
            window.PoWaSettings.advertising = {
              adBar: false,
              adTag: ({ videoData }) => {
                return videoData.additional_properties.advertising.playAds
                  ? `https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/${brand}_Preroll&description_url=${URL}&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=400x300|640x360&unviewed_position_start=1`
                  : ''
              },
            }
            clearInterval(settingInterval)
          }
        }, 100)
      }
    }, 100)
  })
}

const Powa: React.FC<types.PoWa> = ({ id, brand, preload, stream }) => {
  const customProps = {}
  if (!!stream) customProps['data-stream'] = stream

  useEffect(() => {
    init(brand)
  }, [brand])

  return (
    <div
      className="powa"
      data-org="elcomercio"
      data-aspect-ratio="0.5625"
      data-api="prod"
      data-env="prod"
      data-uuid={id}
      data-preload={preload || 'metadatos'}
      {...customProps}
    />
  )
}

export default Powa
