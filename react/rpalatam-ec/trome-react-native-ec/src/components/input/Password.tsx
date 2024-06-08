import React, { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Input from './Input'
import IconEyeOff from '../../assets/icons/elcomercio/eye-off.svg'
import IconEye from '../../assets/icons/elcomercio/eye.svg'
import { App } from '../../utils/config'
import type { PasswordProps } from './types'

const IconPassword = App.select({
  elcomercio: (
    <IconEye fill="#8E8E8E" width={16} height={16} testID="password-icon" />
  ),
  default: <Icon name="eye" size={16} color="#6B7280" testID="password-icon" />,
})

const IconShowPassword = App.select({
  elcomercio: (
    <IconEyeOff fill="#8E8E8E" width={16} height={16} testID="password-icon" />
  ),
  default: (
    <Icon name="eye-off" size={16} color="#6B7280" testID="password-icon" />
  ),
})

const Password: React.FC<PasswordProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Input
      {...props}
      secureTextEntry={!showPassword}
      SuffixComponent={() => (
        <TouchableWithoutFeedback
          hitSlop={{ bottom: 4, left: 4, right: 4, top: 4 }}
          onPress={toggleShowPassword}>
          {showPassword ? IconShowPassword : IconPassword}
        </TouchableWithoutFeedback>
      )}
    />
  )
}

export default Password
