import React, { useMemo } from 'react'

import ThemeOption from './ThemeOption'
import Box from '../../components/box'
import Typography from '../../components/typography'
import { darkModeIsSupported, useThemeContext } from '../../context/theme'

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
    ? [{ id: 'system', label: 'Predeterminado por el sistema' }]
    : []),
]

const ThemeSelector: React.FC = () => {
  const { schemeSelection, updateSchemeSelection } = useThemeContext()

  const handlePressOption = useMemo(
    () => throttle(updateSchemeSelection, 500),
    [updateSchemeSelection],
  )

  return (
    <View py="0.75" px="1.5" width="100%">
      <View mb="1">
        <Paragraph color="coolGray-700" fontWeight="bold">
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
    </View>
  )
}

export default ThemeSelector
