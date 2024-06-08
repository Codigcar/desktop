import { useRef, useState } from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import View from '../box/View'
import { Noop } from 'react-hook-form'
import Paragraph from '../typhografic/Paragraph'
import { IconValidError } from '../../assets/icons'
import { ResponsiveValue } from '@shopify/restyle'
import { Theme } from '../../theme'

export type ICustomInput = {
  placeholder?: string
  onChangeText?: any
  SuffixComponent?: React.ComponentType
  secureTextEntry?: any
  onBlur?: Noop
  value: string
  isPassword?: boolean
  errors: any
  name: string
}

const CustomInput = ({
  onBlur,
  onChangeText,
  placeholder,
  SuffixComponent,
  value,
  isPassword,
  errors,
  name,
  ...props
}: ICustomInput) => {
  const [isFocused, setIsFocused] = useState(false)
  const labelPosition = useRef(new Animated.Value(value ? 1 : 0)).current

  const handleFocus = () => {
    setIsFocused(true)
    animatedLabel(1)
  }

  const handleBlur = () => {
    onBlur && onBlur()
    setIsFocused(false)
    if (!value) {
      animatedLabel(0)
    }
  }

  const handleTextChange = (text: string) => {
    if (onChangeText) {
      onChangeText(text)
    }
    if (text) {
      animatedLabel(1)
    } else {
      animatedLabel(isFocused ? 1 : 0)
    }
  }

  const animatedLabel = (toValue: any) => {
    Animated.timing(labelPosition, {
      toValue: toValue,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }

  const labelStyle = {
    left: 15,
    top: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [19, -4],
    }),
    fontSize: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 12],
    }),
    color: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: ['gray', '#888'],
    }),
  }

  return (
    <View>
      <View
        borderColor={errors[name] ? 'danger' : isFocused ? 'black' : 'gray-900'}
        borderRadius="full"
        borderWidth={1}
        height={46}
        justifyContent="center"
        paddingBottom="s">
        <View backgroundColor="white" flex={1}>
          <Animated.Text style={[styles.label, labelStyle]}>
            <Paragraph>{placeholder}</Paragraph>
          </Animated.Text>
        </View>
        <View alignItems="center" flexDirection="row" paddingRight="l">
          <TextInput
            {...props}
            style={styles.input}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={handleTextChange}
            value={value}
            textAlignVertical="center"
            textContentType={
              props.secureTextEntry ? 'newPassword' : props.secureTextEntry
            }
            secureTextEntry={isPassword}
          />
          <View>{SuffixComponent ? <SuffixComponent /> : null}</View>
        </View>
      </View>
      <View height={5} />
      {errors[name] ? (
        <View flexDirection="row" alignItems="center">
          <View width={10} />
          <IconValidError />
          <View width={10} />
          <Paragraph color="danger">{errors[name].message}</Paragraph>
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    position: 'absolute',
    color: 'black',
    backgroundColor: 'white',
    fontSize: 12,
    lineHeight: 35,
    paddingHorizontal: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: 50,
    marginTop: 10,
    paddingLeft: 25,
    color:'black'
  },
  errorText: {
    marginTop: 5,
    fontSize: 14,
    color: 'red',
  },
})

export default CustomInput
