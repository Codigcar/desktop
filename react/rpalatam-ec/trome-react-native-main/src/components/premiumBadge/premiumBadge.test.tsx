import { render } from '@testing-utils/library'
import React from 'react'

import PremiumBadge from './premiumBadge'

describe('premiumBadge', () => {
  it('render accord props | ElComercio', () => {
    const { getByText } = render(<PremiumBadge brand="elcomercio" />)

    expect(getByText('suscriptor digital'.toUpperCase())).toBeDefined()
  })

  it('render accord props | Gestion', () => {
    const { getByText } = render(<PremiumBadge brand="gestion" />)
    expect(getByText('Plus')).toBeDefined()
  })
})
