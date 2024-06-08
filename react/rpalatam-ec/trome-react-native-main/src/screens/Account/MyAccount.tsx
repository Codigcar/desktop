import { useNavigation } from '@react-navigation/native'
import React, { useRef, useState } from 'react'
import { Alert, Platform } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

import DeleteAccount from './DeleteAccount'
import Loading from './Loading'
import Box from '../../components/box'
import Menu from '../../components/menu'
import Ribbon from '../../components/ribbon'
import Typography from '../../components/typography'
import {
  BottomSheetCustomModal,
  BottomSheetModalProvider,
} from '../../containers/bottomSheet'
import { useAuth } from '../../context/auth'
import { App } from '../../utils/config'
import type { AccountStackScreenProps } from '../../routes/types'

const { SafeAreaView, View } = Box
const { Paragraph } = Typography

const Container = App.select<React.FC>({
  gestion: (props) => <View flex={1} {...props} />,
  default: (props) => <SafeAreaView edges={['bottom']} flex={1} {...props} />,
})

const Item: React.FC = ({ children }) => (
  <Menu.Item
    borderBottomColor="separator"
    borderBottomWidth={1}
    px="1.5"
    py="1"
    suffix="chevron">
    <Paragraph color="coolGray-700" fontSize="sm" fontWeight="bold">
      {children}
    </Paragraph>
  </Menu.Item>
)

const MyAccount: React.FC = () => {
  const navigation =
    useNavigation<AccountStackScreenProps<'AccountOptions'>['navigation']>()
  const { signout, user, isSubscribed } = useAuth()
  const { first_name = '' } = user
  const name = /^(undefined|null|-)$/i.test(first_name) ? null : first_name

  const [isLoading, setIsLoading] = useState(false)
  const deleteAccountModalRef = useRef<BottomSheetCustomModal>(null)

  const handleLogout = () => {
    Alert.alert(name || 'Confirmación', '¿Estás seguro de cerrar sesión?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        onPress: signout,
        text: 'Cerrar sesión',
        style: 'destructive',
      },
    ])
  }

  return (
    <BottomSheetModalProvider>
      <View bg="background" flex={1}>
        <Ribbon title="Mi Cuenta" />
        <Container>
          <View flex={1}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('Information')}>
              <Item>Cambiar información</Item>
            </TouchableWithoutFeedback>
            {user.user_metadata?.passwordStatus === 'has-password' ? (
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('ChangePassword')}>
                <Item>Cambiar contraseña</Item>
              </TouchableWithoutFeedback>
            ) : null}
            {!isSubscribed && Platform.OS === 'ios' ? (
              <TouchableWithoutFeedback
                onPress={() => deleteAccountModalRef.current?.present()}>
                <Menu.Item
                  px="1.5"
                  py="1"
                  borderBottomColor="separator"
                  borderBottomWidth={1}>
                  <Paragraph
                    color="coolGray-700"
                    fontSize="sm"
                    fontWeight="bold">
                    Eliminar cuenta
                  </Paragraph>
                </Menu.Item>
              </TouchableWithoutFeedback>
            ) : null}
          </View>
          <View borderTopColor="separator" borderTopWidth={1}>
            <TouchableWithoutFeedback onPress={handleLogout}>
              <Menu.Item px="1.5" py="1">
                <Paragraph color="coolGray-700" fontSize="sm" fontWeight="bold">
                  Cerrar sesión
                </Paragraph>
              </Menu.Item>
            </TouchableWithoutFeedback>
          </View>
        </Container>
      </View>
      <BottomSheetCustomModal ref={deleteAccountModalRef} snapPoints={[440]}>
        <DeleteAccount
          onDismiss={() => deleteAccountModalRef.current?.dismiss()}
          setIsLoading={setIsLoading}
        />
      </BottomSheetCustomModal>
      {!isLoading ? null : <Loading />}
    </BottomSheetModalProvider>
  )
}

export default MyAccount
