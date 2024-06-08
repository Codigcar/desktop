import React, { useCallback } from 'react'

import LogoDepor from '../../assets/brands/depor/logo.svg'
import LogoComercio from '../../assets/brands/elcomercio/logo.svg'
import LogoGestion from '../../assets/brands/gestion/logo.svg'
import LogoPeru21 from '../../assets/brands/peru21/logo.svg'
import LogoTrome from '../../assets/brands/trome/logo.svg'
import Box from '../../components/box'

const { View } = Box

type Props = {
  brand: string
}

const Cover: React.FC<Props> = ({ brand }) => {
  const renderLogoByBrand: () => JSX.Element = useCallback(() => {
    switch (brand) {
      case 'depor':
        return <LogoDepor />
      case 'elcomercio':
        return <LogoComercio />
      case 'gestion':
        return <LogoGestion color="#841b24" />
      case 'trome':
        return <LogoTrome />
      case 'peru21':
        return <LogoPeru21 />
      default:
        throw new Error('brand logo not found')
    }
  }, [brand])

  return (
    <View height={90} flex={1} alignItems="center" justifyContent="center">
      {renderLogoByBrand()}
    </View>
  )
}

export default Cover
