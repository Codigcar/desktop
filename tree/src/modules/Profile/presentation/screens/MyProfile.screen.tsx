import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native'

import Card from '../../../../components/card'
import Separator from '../../../../components/separator'
import {
  IconCloseFullBg,
  IconPadLock,
  IconTriangleRight,
} from '../../../../assets/icons'
import { View } from '../../../../components/box'
import { Paragraph } from '../../../../components/typhografic'
import { MenuHeaderV2 } from '../../../../containers'
import { useNavigation } from '@react-navigation/native'
import { HeaderAvatar } from '../components'

const MyProfileScreen: React.FC = () => {
  const navigation: any = useNavigation()

  return (
    <View flex={1} bg="white">
      <MenuHeaderV2 />

      <View height={20} />

      <View px="1">
        <HeaderAvatar />

        <View height={30} />

        <Paragraph fontSize={10}>Correo personal</Paragraph>

        <TouchableOpacity
          onPress={() => {
            navigation.push('ProfileStackScreen', {
              screen: 'MyProfileEditScreen',
            })
          }}>
          <View flexDirection="row" alignItems="center">
            <IconCloseFullBg />
            <View width={3} />
            <Paragraph color="primary" fontSize={10}>
              Falta agregar
            </Paragraph>
          </View>
        </TouchableOpacity>

        <View py="1">
          <Separator />
        </View>

        <Paragraph fontSize={10}>Celular</Paragraph>

        <View flexDirection="row" alignItems="center">
          <IconCloseFullBg />
          <View width={3} />
          <Paragraph color="primary" fontSize={10}>
            Falta agregar
          </Paragraph>
        </View>

        <View py="1">
          <Separator />
        </View>

        <Paragraph fontSize={10}>Dirección</Paragraph>
        <Paragraph color="black">
          Calle Las Begonias 238, La Molina. Lima
        </Paragraph>

        <View height={30} />

        <TouchableWithoutFeedback onPress={() => navigation.push('ProfileStackScreen',{screen: 'VerificationScreen'})}>
          <Card.Shadow>
            <View flexDirection="row" alignItems="center" height={35}>
              <IconPadLock />
              <View width={10} />
              <View flex={1}>
                <Paragraph color="primary" fontWeight="600">
                  Modifica tu clave
                </Paragraph>
              </View>
              <IconTriangleRight
                fill="#9F9D9B"
                stroke="#9F9D9B"
                width={10}
                height={10}
              />
            </View>
          </Card.Shadow>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

export default MyProfileScreen
