import { useRestyle } from '@shopify/restyle'
import React from 'react'

import { box } from '../../theme/customRestyleFunctions'
import type { BoxProps } from '../../theme'

type Props = { as: React.ComponentType } & BoxProps

const Base: React.FC<Props> = ({ as: Component, ...rest }) => {
  const restyle = useRestyle(box, rest)
  return <Component {...restyle} />
}

export default Base
