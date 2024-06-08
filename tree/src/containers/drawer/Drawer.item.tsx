import { TouchableOpacity } from 'react-native'
import { View } from '../../components/box'
import Separator from '../../components/separator'
import { Paragraph } from '../../components/typhografic'

type Props = {
  icon: React.ReactElement
  name: string
  onPress?: () => void
}

const DrawerItem: React.FC<Props> = ({ icon, name, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View px="1.5">
        <View flexDirection="row" alignItems="center">
          <View>{icon}</View>
          <View width={10} />
          <View>
            <Paragraph color="black" fontWeight="600">
              {name}
            </Paragraph>
          </View>
        </View>
        <View py="1">
          <Separator />
        </View>
      </View>
    </TouchableOpacity>
  )
}
export default DrawerItem
