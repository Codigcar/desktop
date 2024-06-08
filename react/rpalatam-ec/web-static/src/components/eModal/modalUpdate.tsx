import * as React from 'react'

import { IS_ANDROID, IS_IOS } from '../../tools/checkMobile'
import { getBrand } from '../../tools/tools'

const BRAND = getBrand()
const PLATFORM = IS_ANDROID() || IS_IOS()

const ids = {
  depor: {
    android: 'com.eeec.depor',
    ios: '990848578',
  },
  elcomercio: {
    android: 'com.gec.elcomercio',
    ios: '793178800',
  },
  gestion: {
    android: 'com.eeec.gestion',
    ios: '991224096',
  },
  peru21: {
    android: 'com.eeec.peru21',
    ios: '991197788',
  },
  trome: {
    android: 'com.eeec.trome',
    ios: '991048862',
  },
}

const ModalUpdate = () => {
  const actionModal = () => {
    const id = ids[BRAND]
    if (IS_IOS()) {
      window.open(`itms-apps://itunes.apple.com/app/${id.ios}`)
    } else if (IS_ANDROID()) {
      window.open(`https://play.google.com/store/apps/details?id=${id.android}`)
    }
  }

  return (
    <div className="is-modal upate-modal">
      <div className="is-modal__content">
        <div className="upate-modal__text">
          <h1 className="text-base font-semibold">Nueva versión disponible</h1>
          <p className="text-xs">
            Actualiza ahora para obtener las últimas funcionalidades de la
            aplicación
          </p>
        </div>
        {PLATFORM ? (
          <button className="text-base font-semibold" onClick={actionModal}>
            Actualizar
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default ModalUpdate
