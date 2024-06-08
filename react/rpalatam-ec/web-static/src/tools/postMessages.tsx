import Identity from '@arc-publishing/sdk-identity'
import React from 'react'

import { getToken } from './arc'
import { signIn } from './auth'
import Icon from '../system/icon'
import Modal from '../system/modal'
import Notification from '../system/notification'

export type ModalRef = {
  modal: any
  onClose?: (param?: any) => void
  track?: string
}

export const postMessageSesionHandler = async (event: MessageEvent) => {
  let { type, payload = {} } = event.data

  // For old versions
  if (event.data.accessToken && event.data.providerSource) {
    type = 'auth.SIGN_IN'
    payload = {
      provider: event.data.providerSource,
      userIdentity: {
        accessToken: event.data.accessToken,
      },
    }
  }

  let backgroundRef
  if (type === 'auth.SIGN_IN') {
    Modal.open({
      content: elm => {
        backgroundRef = elm
        return (
          <div className="h-screen login-loading">
            <Icon type="loading" />
          </div>
        )
      },
    })
  }

  switch (type) {
    case 'auth.SIGN_IN': {
      try {
        const category = !!window.currentModal.modal
          ? window.currentModal.track || 'sw'
          : 'onboarding'

        /**
         * Si el usuario proviene de una versión antigua traerá solo el accessToken,
         * por lo que es necesario traer el userIdentity completo
         */
        if (!payload.userIdentity.refreshToken) {
          const userIdentity = await getToken(
            payload.userIdentity.accessToken,
            payload.provider,
          )
          payload.userIdentity = userIdentity
        }
        Identity.userIdentity = payload.userIdentity
        const user = await signIn(category, payload.provider)
        window.currentModal?.modal?.remove()
        window.currentModal?.onClose?.(user)
        Notification.success({
          content: 'Bienvenido(a) nuevamente',
        })
      } catch (error) {
        window.ReactNativeWebView?.postMessage(
          JSON.stringify({ type: 'auth.SIGN_OUT' }),
        )
        Notification.error({
          content: 'Hubo un error al iniciar sesión. Intentalo nuevamente',
        })
      }
      backgroundRef.remove()
      break
    }
    default:
      break
  }
}
