import React, { useRef } from 'react'
import { Animated, StyleSheet, TouchableOpacity } from 'react-native'

import { useRadioGroup } from './RadioGroupContext'
import Box from '../box'
import type { RadioProps } from './types'

const { View } = Box

const RadioButton: React.FC<RadioProps & { onPress: () => void }> = React.memo(
  (props) => {
    const { value, checked, children, color, disabled, style, ...rest } = props

    const scale = useRef(new Animated.Value(checked ? 1 : 0)).current
    Animated.timing(scale, {
      toValue: checked ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start()

    return (
      <TouchableOpacity
        accessibilityRole="radio"
        accessibilityState={{ checked }}
        accessibilityValue={{ text: value }}
        activeOpacity={0.6}
        disabled={disabled}
        style={styles.button}
        {...rest}>
        <View
          alignItems="center"
          flexDirection="row"
          opacity={disabled ? 0.5 : 1}>
          <View
            width={26}
            height={26}
            borderWidth={2}
            borderColor="coolGray-300"
            borderRadius="full"
            justifyContent="center"
            alignItems="center"
            style={style}>
            <Animated.View
              style={[
                styles.thumb,
                { backgroundColor: color || '#0089FF' },
                { transform: [{ scale }] },
              ]}
            />
          </View>
          {children ? (
            <View flex={1} ml="0.5">
              {children}
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    )
  },
  (prevProps, nextProps) => prevProps.checked === nextProps.checked,
)

const Radio: React.FC<RadioProps> = ({
  checked: checkedProp,
  value,
  ...rest
}) => {
  const radioGroup = useRadioGroup()
  const checked = radioGroup ? radioGroup?.value === value : checkedProp

  return (
    <RadioButton
      onPress={() => radioGroup?.onPress(value)}
      value={value}
      checked={checked}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
  },
  thumb: {
    borderRadius: 9999,
    height: '60%',
    width: '60%',
  },
})

export default Radio
