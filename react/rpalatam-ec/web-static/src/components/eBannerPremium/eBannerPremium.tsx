import React, { useContext, memo } from 'react'
import Loadable from 'react-loadable'
import './eBannerPremium.css'
import { AppContext } from '../../context/app'
import Modal from '../../system/modal'

const ModalPaywall = Loadable({
  loader: () =>
    import(/* webpackChunkName: "ModalPaywall" */ '../eModal/paywall'),
  loading: () => null,
})

interface Props {
  position?: number | null
}

const EBannerPremium: React.FC<Props> = ({ position }) => {
  const context = useContext(AppContext)

  const openPaywallModal = gaCategory => {
    Modal.open({
      content: elm => (
        <ModalPaywall
          myRef={elm}
          context={context}
          gaCategory={gaCategory}
          gaValue={position}
        />
      ),
      myClass: 'is-modal-bottom is-modal-swh',
      animation: 'bottomFade',
      disableBack: true,
    })
  }

  return (
    <div className="eBannerPremium">
      <p>
        Conviértete en usuario <strong>Premium</strong> y disfruta de la
        aplicación libre de publicidad
      </p>
      <button
        type="button"
        className="btn-subscribe"
        onClick={() => openPaywallModal('organic')}
      >
        Suscribirme
      </button>
    </div>
  )
}

export default memo(EBannerPremium)
