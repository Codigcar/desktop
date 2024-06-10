import { createText, useRestyle } from '@shopify/restyle'

import type { TextProps, Theme } from '../../theme'
import { text } from '../../theme/customRestyleFunctions'

export function autoLineHeight(
  fontSize?: TextProps['fontSize'],
): TextProps['lineHeight'] {
  if (!fontSize) return undefined
  switch (fontSize) {
    case 'xxs':
      return '3'
    case 'xs':
      return '4'
    case 'sm':
      return '5'
    case 'base':
      return '6'
    case 'lg':
    case 'xl':
      return '7'
    case '2xl':
      return '8'
    case '3xl':
      return '9'
    case '4xl':
      return '10'
    default:
      return undefined
  }
}

function getFontFamilyByWeight(fontWeight: string): string {
  const fontName = 'Poppins'

  switch (fontWeight) {
    case '300':
      return `${fontName}-Light`
    case '500':
      return `${fontName}-Medium`
    case '600':
      return `${fontName}-SemiBold`
    case '700':
      return `${fontName}-Bold`
    case 'bold':
      return `${fontName}-Bold`
    case '900':
      return `${fontName}-Black`
    default:
      return `${fontName}-Regular`
  }
}

const TextBase = createText<Theme>()
export interface TextProps2 extends React.ComponentProps<typeof TextBase> {}

const Text: React.FC<TextProps2> = (props) => {

  const { fontWeight, ...rest } = props
  const { style } = rest
  const fontName = getFontFamilyByWeight(fontWeight ?? '400')
  const styles = Object.assign({ fontFamily: fontName }, style)

  const restyle = useRestyle(text as any, { ...rest, style: styles })
  return <TextBase {...restyle} />
}

export default Text
