import { useNavigation } from '@react-navigation/core'
import { View } from '../../../../components/box'
import { Paragraph } from '../../../../components/typhografic'
import { AppStackScreenProps } from '../../../../routes/types'

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<AppStackScreenProps<'LoginScreen'>['navigation']>()

  return (
    <View>
      <Paragraph>LoginScreen</Paragraph>
    </View>
  )
}

export default LoginScreen
