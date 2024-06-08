import React from 'react'
import Icon from '../icon/index'
import { getDomain, isPaywallActive, pianoIdAvailable } from '../../tools/tools'
import './premium.css'

interface Props {
  restrictions: string
}

const PIANO_ID_AVAILABLE = pianoIdAvailable()
const PAYWALL_ACTIVE = isPaywallActive()

const IconPremium: React.FC<Props> = ({ restrictions }) => {
  const domain = getDomain()
  const [brand] = domain.split('.')
  const active =
    PAYWALL_ACTIVE ||
    brand === 'trome' ||
    (brand === 'depor' && PIANO_ID_AVAILABLE)

  if (restrictions !== 'premium' || !active) {
    return null
  }

  function getIcon() {
    switch (brand) {
      case 'depor':
        return (
          <span className="icon-premium-depor">
            Exclusivo para
            <img
              alt="La barra D"
              src="https://cdna.depor.com/resources/dist/depor/images/logo-barra.png"
            />
          </span>
        )
      case 'elcomercio':
        return (
          <div className="icon-premium-ec text-xs font-medium">
            <Icon
              view="0 0 896 1024"
              type="md-star"
              style={{ fontSize: 12, color: '#AD9130', marginRight: 3 }}
            />
            <span>Exclusivo para suscriptores</span>
          </div>
        )
      case 'gestion':
        return (
          <span className="premium">
            <Icon
              view="1024 0 1024 1024"
              type="g-plus"
              style={{ fontSize: 16 }}
            />
          </span>
        )
      case 'trome':
        return (
          <span className="icon-premium-trome">
            <img
              alt="club t"
              src="https://cdna.trome.pe/resources/dist/trome/images/logo-club-trome.png?d=1"
            />
          </span>
        )
      default:
        return null
    }
  }

  return getIcon()
}

export default IconPremium
