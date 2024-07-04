import { TouchableWithoutFeedback } from 'react-native'

import View from '../box/View'
import Paragraph from '../typhografic/Paragraph'
import { styles } from './styles'

type IButtonProps = {
  title: string
  disabled?: boolean
  icon?: React.ComponentType
  type?: 'default' | 'primary' | 'secondary' | 'disabled' | 'outline'
  size?: 'small' | 'default' | 'large'
  width?: number
  onPress: () => void
}

const Button: React.FC<IButtonProps> = ({
  title,
  disabled,
  icon,
  type = 'default',
  size = 'default',
  width,
  ...rest
}) => {
  const buttonStyles = Object.assign(
    {},
    styles.button.type[type],
    styles.button.size[size],
  )
  const textStyles: any = Object.assign(
    {},
    styles.text.type[type],
    styles.text.size[size],
  )

  return (
    <TouchableWithoutFeedback disabled={disabled} {...rest}>
      <View
        alignItems="center"
        borderRadius="sm"
        flexDirection="row"
        flexWrap="nowrap"
        justifyContent="center"
        opacity={disabled ? 0.7 : 1}
        width={width ?? '100%'}
        {...buttonStyles}>
        <Paragraph fontWeight="bold" {...textStyles}>
          {title}
        </Paragraph>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Button
