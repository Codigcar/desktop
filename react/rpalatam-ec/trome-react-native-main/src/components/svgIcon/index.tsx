import React from 'react'
import { Path, Svg } from 'react-native-svg'
import SRCIcons from './source'

type Props = {
  type: keyof typeof SRCIcons
  color?: string
}

const SvgIcon: React.FC<Props> = ({ type, color }) => {
  return getIcon(SRCIcons[type], color)
}

export default SvgIcon

function getIcon(source: string[], fill = '#080808') {
  return (
    <Svg width={46} height={16} fill={fill} viewBox="1024 0 1024 1024">
      {source.map((p) => (
        <Path key={p} d={p} />
      ))}
    </Svg>
  )
}
