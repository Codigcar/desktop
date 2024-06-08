import React from 'react'
import '../eModal/modal.css'

import RegisterModal from '../eModal/formModal'
import IconPremium from '../../system/button/premium'
import Notification from '../../system/notification'
import { signCustomize } from '../../tools/arc'
import { RN_SCREENS_STORY } from '../../tools/flags'
import NativeAPI from '../../tools/nativeApi'
import { getBrand } from '../../tools/tools'

const customize = signCustomize()
const brand = getBrand()

interface Props {
  history: any
  myRef: any
  context: any
}

export class ModalSignwall extends React.PureComponent<Props> {
  componentDidMount() {
    const { myRef, context } = this.props
    window.dataLayer?.push({
      event: 'SuscriptionActivity',
      category: 'PWA_Sign_Wall_Hard',
      action: 'pwa_swh_modal_signwall_open',
      label: window.location.href.replace(window.location.origin, ''),
      value: 0,
    })
    window.currentModal = {
      modal: myRef,
      onClose: user => {
        context.signIn({ profile: user })
        this.cleanBlockStyles()
      },
      track: 'swh',
    }
  }

  goLogin = (path = 'register') => {
    const { history, myRef } = this.props
    const location = {
      pathname: '/login',
      search: `?from=swh&to=${path}`,
      state: { fromSWH: true },
    }

    history.push(location)
    myRef.remove()
  }

  historyBack = () => {
    if (RN_SCREENS_STORY()) return NativeAPI.navigateGoBack()
    const { history, myRef } = this.props
    history.replace('/category/portada?ref=swh')
    myRef.remove()
  }

  cleanBlockStyles = () => {
    const noticeWrapper = document.querySelector('.wrap-view-new')
    if (noticeWrapper) noticeWrapper.removeAttribute('style')
  }

  authFacebook = (type, user) => {
    const { context, myRef } = this.props
    if (type === 'success') {
      context.signIn({ profile: user })
      this.cleanBlockStyles()
      myRef.remove()
      Notification.success({
        content: 'Bienvenido(a) nuevamente.',
      })
    } else if (type === 'error') {
      Notification.error({
        content: 'Hubo un error al iniciar sesión. Inténtalo nuevamente.',
      })
    } else if (type === 'escape') {
      this.historyBack()
    }
  }

  render() {
    const { myRef } = this.props

    return (
      <div className="is-modal">
        <div className="is-modal__content">
          <RegisterModal
            blocking
            callback={this.authFacebook}
            modalRef={myRef}
            track={{
              category: 'swh',
            }}
          >
            <div className="swh-message">
              {brand === 'depor' ? (
                <figure className="logo-premium-depor">
                  <img
                    alt="La barra D"
                    src="https://cdna.depor.com/resources/dist/depor/images/logo-barra.png"
                  />
                </figure>
              ) : null}
              {brand === 'peru21' ? (
                <div>
                  <IconPremium restrictions="premium" />
                </div>
              ) : null}
              <h5
                className="font-serif"
                dangerouslySetInnerHTML={{ __html: customize.loginMessage }}
              />
              {brand !== 'depor' ? null : (
                <div className="swh-partners">
                  <figure>
                    <img
                      alt="contenido premium"
                      src="https://cdna.depor.com/resources/dist/depor/images/contenido.png"
                    />
                  </figure>
                  <figure>
                    <img
                      alt="acceso a newsletters"
                      src="https://cdna.depor.com/resources/dist/depor/images/news.png"
                    />
                  </figure>
                  <figure>
                    <img
                      alt="eventos exclusivos"
                      src="https://cdna.depor.com/resources/dist/depor/images/eventos.png"
                    />
                  </figure>
                  <figure>
                    <img
                      alt="grandes premios"
                      src="https://cdna.depor.com/resources/dist/depor/images/premios.png"
                    />
                  </figure>
                  <figure>
                    <img
                      alt="Podcast y programas de video"
                      src="https://cdna.depor.com/resources/dist/depor/images/podcast.png"
                    />
                  </figure>
                </div>
              )}
              {brand !== 'trome' ? null : (
                <div className="swh-partners">
                  <figure>
                    <img
                      alt="la fe de cuto"
                      src="https://cdna.trome.pe/resources/dist/trome/images/la-fe-de-cuto.png?d=1"
                    />
                  </figure>
                  <figure>
                    <img
                      alt="cafe noticias"
                      src="https://cdna.trome.pe/resources/dist/trome/images/cafe-noticias.png?d=1"
                    />
                  </figure>
                  <figure>
                    <img
                      alt="extasiados"
                      src="https://cdna.trome.pe/resources/dist/trome/images/extasiados.png?d=1"
                    />
                  </figure>
                </div>
              )}
            </div>
          </RegisterModal>
        </div>
      </div>
    )
  }
}

export default ModalSignwall
