import React from 'react'
import './button.css'

import Icon from '../icon/index'

type CallbackType = 'success' | 'error'

interface Props {
  callback: (type: CallbackType, user: {}) => void
  children?: React.ReactElement
  track: {
    category: string
  }
}

const GoogleLogin: React.FC<Props> = () => {
  function handleLogin() {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({ type: 'auth.GET_GOOGLE_TOKEN' }),
    )
  }

  return (
    <button
      className="is-button button-google"
      onClick={handleLogin}
      type="button"
    >
      <Icon
        type="logo-google"
        style={{ color: '#fff', marginRight: 10 }}
        view="0 0 1024 1024"
      />
      Continuar con <span>Google</span>
    </button>
  )
}

export default React.memo(GoogleLogin)
