import analytics from '@react-native-firebase/analytics'
import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import DeviceInfo from 'react-native-device-info'

import Button from '../../components/Button'
import Box from '../../components/box'
import Typography from '../../components/typography'
import { useAuth } from '../../context/auth'
import auth from '../../services/auth'
import { App } from '../../utils/config'
import type { AllProps, TextProps } from '../../theme'

const { View } = Box
const { Link, Paragraph, Title } = Typography

type Props = {
  isLoading?: boolean
  onDismiss(): void
  setIsLoading: (isLoading: boolean) => void
}
const propStyles = {
  container: App.select<AllProps>({
    elcomercio: { pt: '1.25' },
    default: { py: '0.75' },
  }),
  title: App.select<TextProps>({
    elcomercio: { color: 'text.2', fontSize: 'base' },
    default: { color: 'coolGray-700', fontSize: 'xl' },
  }),
  button: App.select<AllProps>({
    elcomercio: { backgroundColor: 'secondary' },
    default: { backgroundColor: 'danger' },
  }),
  buttonText: App.select<TextProps>({
    elcomercio: {},
    default: { fontWeight: 'bold' },
  }),
  description: App.select<TextProps>({
    elcomercio: { color: 'text.2' },
    default: { color: 'coolGray-700' },
  }),
}

export const DeleteAccount: React.FC<Props> = ({
  isLoading,
  onDismiss,
  setIsLoading,
}) => {
  const { signout } = useAuth()

  const handleDeleteAccount = async () => {
    setIsLoading(true)
    await Promise.all([
      auth.deleteAccount(),
      analytics().logEvent('delete_account'),
    ])
    await signout()
  }

  const isLoadingEC = App.key === 'elcomercio' && isLoading

  return (
    <View
      alignItems="center"
      px="1.5"
      marginBottom="0"
      width="100%"
      testID="modal-delete-account"
      {...propStyles.container}>
      <View pb="1.5">
        <Title {...propStyles.title}>
          {App.key === 'elcomercio' ? 'Eliminar cuenta' : 'Eliminar Cuenta'}
        </Title>
        <View mb="0.5" />
        <Paragraph {...propStyles.description}>
          {`Nos apena que quieras dar este paso. Si eliminas tu perfil en ${DeviceInfo.getApplicationName()}, también eliminarás el acceso a todos los servicios y datos que estén asociados, entre ellos tu cuenta en los productos del Grupo El Comercio. Ten presente que la eliminación de esta cuenta no se puede anular y los datos son irrecuperables, pero puedes volver a registrarte cuando quieras.`}
        </Paragraph>
      </View>
      <TouchableWithoutFeedback
        accessibilityLabel="Eliminar cuenta"
        disabled={isLoadingEC}
        onPress={handleDeleteAccount}>
        <Box.View
          width="100%"
          height={42}
          alignItems="center"
          flexDirection="row"
          justifyContent="center"
          borderRadius="sm"
          flexWrap="nowrap"
          opacity={isLoadingEC ? 0.7 : 1}
          {...propStyles.button}>
          <Paragraph color="white" fontSize="lg" {...propStyles.buttonText}>
            Eliminar cuenta
          </Paragraph>
        </Box.View>
      </TouchableWithoutFeedback>
      <View mt="0.75" />
      {App.key === 'elcomercio' ? (
        <View pt="0.75" pb="0.5">
          <Link fontWeight="medium" onPress={onDismiss}>
            Cancelar
          </Link>
        </View>
      ) : (
        <Button
          onPress={onDismiss}
          title="Cancelar"
          size="small"
          type="secondary"
        />
      )}
    </View>
  )
}

export default DeleteAccount
