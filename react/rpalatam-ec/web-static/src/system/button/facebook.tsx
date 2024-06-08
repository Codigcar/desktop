import React from 'react'
import './button.css'

import Icon from '../icon'

declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage(message: string): void
    }
  }
}

type CallbackType = 'success' | 'error'

interface Props {
  callback: (type: CallbackType, user: {}) => void
  children?: React.ReactElement
  track: {
    category: string
  }
}

const FacebookLogin: React.FC<Props> = () => {
  function openModal() {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ type: 'auth.GET_FACEBOOK_TOKEN' }),
      )
      return
    }
    if (!process.env.REACT_APP_ECOID) throw new Error('ECOID missing')
    window.open(
      `${process.env.REACT_APP_ECOID}/mpp/facebook/login/`,
      '_blank',
      'location=yes,height=400,width=520,scrollbars=yes,status=yes',
    )
  }
  return (
    <button className="is-button button-fb" onClick={openModal} type="button">
      <Icon type="logo-facebook" style={{ color: '#fff', marginRight: 10 }} />
      Continuar con <span>Facebook</span>
    </button>
  )
}

export default React.memo(FacebookLogin)
