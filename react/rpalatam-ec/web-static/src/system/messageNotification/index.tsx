import React from 'react'
import './index.css'

import nativeApi from '../../tools/nativeApi'

export const MessageNotification = () => (
  <div className="message-notification">
    <p>Agregado a leer luego</p>
    <p
      className="message-notification__link"
      onClick={() => nativeApi.navigate('Favorite')}
    >
      Ir a leer luego
    </p>
  </div>
)
