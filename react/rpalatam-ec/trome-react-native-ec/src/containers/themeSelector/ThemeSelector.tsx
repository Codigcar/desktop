import React, { useMemo } from 'react'

import ThemeOption from './ThemeOption'
import Box from '../../components/box'
import Typography from '../../components/typography'
import { darkModeIsSupported, useThemeContext } from '../../context/theme'
import { App } from '../../utils/config'
import type { BoxProps, TextProps } from '../../theme'

const { View } = Box
const { Paragraph } = Typography

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function throttle(callback: (...args: any[]) => void, wait: number) {
  let lastTime = 0
  return function (...args: []) {
    const now = Date.now()
    if (now - lastTime > wait) {
      callback(...args)
      lastTime = now
    }
  }
}

export const options = [
  { id: 'light', label: 'Claro' },
  { id: 'dark', label: 'Oscuro' },
  ...(darkModeIsSupported
    ? [
        {
          id: 'system',
          label:
            App.key === 'elcomercio'
              ? 'Automático'
              : 'Predeterminado por el sistema',
        },
      ]
    : []),
]

const propStyles = {
  titleContainer: App.select<BoxProps>({
    elcomercio: { mb: '1.25' },
    default: { mb: '1' },
  }),
  title: App.select<TextProps>({
    elcomercio: { color: 'secondary', fontSize: 'xl', textAlign: 'center' },
    default: { color: 'coolGray-700' },
  }),
}

const ThemeSelector: React.FC = () => {
  const { schemeSelection, updateSchemeSelection } = useThemeContext()

  const handlePressOption = useMemo(
    () => throttle(updateSchemeSelection, 500),
    [updateSchemeSelection],
  )

  return (
    <View py="0.75" px="1.5" width="100%">
      <View {...propStyles.titleContainer}>
        <Paragraph fontWeight="bold" {...propStyles.title}>
          Seleccione apariencia
        </Paragraph>
      </View>
      {options.map(({ id, label }) => (
        <View key={id} borderTopColor="separator" borderTopWidth={1}>
          <ThemeOption
            active={id === schemeSelection}
            id={id}
            label={label}
            onPress={handlePressOption}
          />
        </View>
      ))}
      {App.key === 'elcomercio' ? (
        <View borderTopColor="separator" borderTopWidth={1} height={10} />
      ) : null}
    </View>
  )
}

export default ThemeSelector
