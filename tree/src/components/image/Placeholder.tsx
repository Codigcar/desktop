import React, { useMemo } from 'react'
import { SvgProps } from 'react-native-svg'

import { IconLogoUSMPBlack } from '../../assets/icons'
import View from '../box/View'

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
    return <IconLogoUSMPBlack />
  }, [svgProps])

  return (
    <View
      bg="trueGray-200"
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center">
      {Isotipo}
    </View>
  )
}

export default Placeholder
