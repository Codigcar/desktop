import React, { useMemo } from 'react'
import { SvgProps } from 'react-native-svg'

import DeporPlaceholder from '../../assets/brands/depor/placeholder.svg'
import ElComercioPlaceholder from '../../assets/brands/elcomercio/placeholder.svg'
import GestionPlaceholder from '../../assets/brands/gestion/placeholder.svg'
import Peru21Placeholder from '../../assets/brands/peru21/placeholder.svg'
import TromePlaceholder from '../../assets/brands/trome/placeholder.svg'
import { App } from '../../utils/config'
import Box from '../box'

type Props = {
  width?: number
}

const Placeholder: React.FC<Props> = ({ width = 100 }) => {
  const svgProps: SvgProps = useMemo(() => {
    return {
      width,
      height: width * 0.8,
      fill: '#000',
      fillOpacity: 0.2,
    }
  }, [width])

  const Isotipo = useMemo(() => {
    return App.select({
      depor: <DeporPlaceholder {...svgProps} />,
      elcomercio: <ElComercioPlaceholder {...svgProps} />,
      gestion: <GestionPlaceholder {...svgProps} />,
      peru21: <Peru21Placeholder {...svgProps} />,
      trome: <TromePlaceholder {...svgProps} />,
    })
  }, [svgProps])

  return (
    <Box.View
      bg="trueGray-200"
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center">
      {Isotipo}
    </Box.View>
  )
}

export default Placeholder
