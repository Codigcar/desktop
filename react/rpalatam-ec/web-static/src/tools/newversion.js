import React from 'react'

import Notification from '../system/notification/index.tsx'

export function messageErrorLoad() {
  return Notification.error({
    content: (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <div>Error en la red </div>
        <button
          onClick={event => {
            const { target } = event
            target.innerText = 'Cargando...'
            target.disabled = true
            target.style.opacity = '0.5'
            window.location.reload(true)
          }}
          style={{
            border: '2px solid #ff0000',
            padding: '3px 8px',
            borderRadius: '4px',
            fontWeight: '500',
            color: '#ff0000',
            fontSize: '13px',
            marginLeft: '12px',
          }}
          type="button"
        >
          RECARGAR
        </button>
      </div>
    ),
    duration: 0,
  })
}

export function messageNewVersion() {
  return Notification.success({
    content: (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <div>Nueva versión disponible </div>
        <button
          onClick={event => {
            const { target } = event
            target.innerText = 'Cargando...'
            target.disabled = true
            target.style.opacity = '0.5'
            window.location.reload(true)
          }}
          style={{
            border: '2px solid #00a0ff',
            padding: '3px 8px',
            borderRadius: '4px',
            fontWeight: '600',
            color: '#00a0ff',
            fontSize: '13px',
            marginLeft: '12px',
            backgroundColor: '#fff',
          }}
          type="button"
        >
          RECARGAR
        </button>
      </div>
    ),
    duration: 0,
  })
}
