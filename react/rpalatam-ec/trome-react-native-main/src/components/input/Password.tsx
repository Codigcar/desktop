import React, { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Input from './Input'
import { PasswordProps } from './types'

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
        <TouchableWithoutFeedback onPress={toggleShowPassword}>
          <Icon
            name={showPassword ? 'eye-off' : 'eye'}
            size={16}
            color="#6B7280"
            testID="password-icon"
          />
        </TouchableWithoutFeedback>
      )}
    />
  )
}

export default Password
