import React from 'react'
import '../eModal/modal.css'

import RegisterModal from '../eModal/formModal'
import Notification from '../../system/notification'

const trackValues = {
  podcast: {
    category: 'Podcast',
    action: 'pwa_podcast_modal_signwall_open',
  },
  favorites: {
    category: 'PWA_Favorites',
    action: 'pwa_favorites_modal_signwall_open',
  },
  comments: {
    category: 'PWA_Comments',
    action: 'pwa_comments_modal_signwall_open',
  },
  newsletter: {
    category: 'PWA_Newsletter',
    action: 'pwa_newsletter_modal_signwall_open',
  },
  paywall: {
    category: 'PWA_Paywall',
    action: 'pwa_paywall_modal_signwall_open',
  },
}

interface Props {
  gaCategory: string
  myRef: any
  context: any
  callback?(string): void
}

export class ModalRegister extends React.PureComponent<Props> {
  componentDidMount() {
    const { gaCategory, myRef, context, callback } = this.props
    const track = trackValues[gaCategory]
    if (track) {
      window.dataLayer?.push({
        event: 'SuscriptionActivity',
        category: track.category,
        action: track.action,
        label: window.location.href.replace(window.location.origin, ''),
        value: 0,
      })
    }
    window.currentModal = {
      modal: myRef,
      track: gaCategory,
      onClose: user => {
        context.signIn({ profile: user })
        callback?.('success')
      },
    }
  }

  authFacebook = (type, user) => {
    const { callback, context, myRef } = this.props
    if (type === 'success') {
      context.signIn({ profile: user })
      callback?.('success')
      myRef.remove()
      Notification.success({
        content: 'Bienvenido(a) nuevamente.',
      })
    } else if (type === 'error') {
      callback?.('error')
      Notification.error({
        content: 'Hubo un error en el registro. Inténtalo nuevamente.',
      })
    }
  }

  render() {
    const { gaCategory, myRef } = this.props

    return (
      <div className="is-modal">
        <div className="is-modal__content">
          <RegisterModal
            callback={this.authFacebook}
            modalRef={myRef}
            track={{
              category: gaCategory,
            }}
            type="default"
          />
        </div>
      </div>
    )
  }
}

export default ModalRegister
