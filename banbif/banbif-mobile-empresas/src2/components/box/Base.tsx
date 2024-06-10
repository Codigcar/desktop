import {
  BoxProps,
  backgroundColor,
  backgroundColorShorthand,
  border,
  composeRestyleFunctions,
  layout,
  opacity,
  position,
  shadow,
  spacing,
  spacingShorthand,
  useRestyle,
  visible,
} from '@shopify/restyle'

import type { Theme } from '../../theme'

const box = composeRestyleFunctions([
  backgroundColor,
  backgroundColorShorthand,
  border,
  layout,
  opacity,
  position,
  shadow,
  spacing,
  spacingShorthand,
  visible,
  spacing,
])

type Props = { as: React.ComponentType<any> } & BoxProps<Theme>

const Base: React.FC<Props> = ({ as: Component, ...rest }) => {
  const restyle = useRestyle(box as any, rest)
  return <Component {...restyle} />
}

export default Base
