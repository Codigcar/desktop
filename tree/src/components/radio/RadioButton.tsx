import { IconCheck } from '../../assets/icons'
import View from '../box/View'
import Paragraph from '../typhografic/Paragraph'
import { TouchableOpacity } from 'react-native'

type Props = {
  checked: boolean
  onPress: () => void
  text?: string
  type?: 'circular' | 'cuadrado'
}

const RadioButton = ({
  checked,
  onPress,
  text = 'Recordar usuario',
  type = 'circular',
}: Props) => {
  const getIcon = () => {
    if (type === 'circular') {
      return (
        <View
          width={8}
          height={8}
          borderRadius="full"
          backgroundColor="primary"
        />
      )
    }
    return <IconCheck width={10} height={10} />
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <View flexDirection="row" alignItems="center">
        <View
          width={16}
          height={16}
          borderWidth={2}
          borderColor="coolGray-300"
          borderRadius={type === 'circular' ? 'full' : 'none'}
          justifyContent="center"
          alignItems="center"
          mr="0.5">
          {checked ? getIcon() : null}
        </View>
        <Paragraph>{text}</Paragraph>
      </View>
    </TouchableOpacity>
  )
}

export default RadioButton
