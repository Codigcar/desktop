import analytics from '@react-native-firebase/analytics'
import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import DeviceInfo from 'react-native-device-info'

import Button from '../../components/Button'
import Box from '../../components/box'
import Typography from '../../components/typography'
import { useAuth } from '../../context/auth'
import auth from '../../services/auth'

const { View } = Box
const { Paragraph, Title } = Typography

type Props = {
  onDismiss(): void
  setIsLoading: (isLoading: boolean) => void
}

export const DeleteAccount: React.FC<Props> = ({ onDismiss, setIsLoading }) => {
  const { signout } = useAuth()

  const handleDeleteAccount = async () => {
    setIsLoading(true)
    await Promise.all([
      auth.deleteAccount(),
      analytics().logEvent('delete_account'),
    ])
    await signout()
  }

  return (
    <View
      alignItems="center"
      py="0.75"
      px="1.5"
      width="100%"
      testID="modal-delete-account">
      <View pb="1.5">
        <Title color="coolGray-700" fontSize="xl">
          Eliminar Cuenta
        </Title>
        <View mb="0.5" />
        <Paragraph color="coolGray-700">
          {`Nos apena que quieras dar este paso. Si eliminas tu perfil en ${DeviceInfo.getApplicationName()}, también eliminarás el acceso a todos los servicios y datos que estén asociados, entre ellos tu cuenta en los productos del Grupo El Comercio. Ten presente que la eliminación de esta cuenta no se puede anular y los datos son irrecuperables, pero puedes volver a registrarte cuando quieras.`}
        </Paragraph>
      </View>
      <TouchableWithoutFeedback onPress={handleDeleteAccount}>
        <Box.View
          width="100%"
          height={42}
          alignItems="center"
          flexDirection="row"
          justifyContent="center"
          borderRadius="sm"
          flexWrap="nowrap"
          backgroundColor="danger">
          <Paragraph color="white" fontSize="lg" fontWeight="bold">
            Eliminar cuenta
          </Paragraph>
        </Box.View>
      </TouchableWithoutFeedback>
      <View mt="0.75" />
      <Button
        onPress={onDismiss}
        title="Cancelar"
        size="small"
        type="secondary"
      />
    </View>
  )
}

export default DeleteAccount
