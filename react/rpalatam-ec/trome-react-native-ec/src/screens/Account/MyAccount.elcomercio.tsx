import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@shopify/restyle'
import React, { useState } from 'react'
import { Platform, TouchableWithoutFeedback } from 'react-native'

import DeleteAccount from './DeleteAccount'
import IconChevronRight from '../../assets/icons/elcomercio/chevron-right.svg'
import Box from '../../components/box'
import Menu from '../../components/menu'
import Ribbon from '../../components/ribbon'
import Typography from '../../components/typography'
import {
  BottomSheetCustomModal,
  BottomSheetModalProvider,
} from '../../containers/bottomSheet'
import Backdrop from '../../containers/bottomSheet/Backdrop'
import { useAuth } from '../../context/auth'
import { sendFeedbackByEmail } from '../../utils/mailer'
import type { AccountStackScreenProps } from '../../routes/types'
import type { Theme } from '../../theme'

const { View } = Box
const { Paragraph } = Typography
const { Item } = Menu

export const deleteAccountModalRef = React.createRef<BottomSheetCustomModal>()

type ListItem = {
  title: string
  action: () => void
  show?: boolean
}

const MyAccountItem: React.FC<ListItem> = ({ title, action, show = true }) => {
  const { colors } = useTheme<Theme>()

  if (!show) return null

  return (
    <TouchableWithoutFeedback onPress={action}>
      <Item
        prefix={
          <IconChevronRight fill={colors['stroke.1']} height={10} width={10} />
        }
        borderBottomColor="stroke.1"
        borderBottomWidth={1}
        height={62}>
        <Paragraph fontSize="sm" color="text.3">
          {title}
        </Paragraph>
      </Item>
    </TouchableWithoutFeedback>
  )
}

const MyAccountScreen: React.FC = () => {
  const navigation =
    useNavigation<AccountStackScreenProps<'AccountOptions'>['navigation']>()
  const { user, isSubscribed } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const listItem: ListItem[] = [
    {
      title: 'Cambiar información',
      action: () => navigation.navigate('Information'),
    },
    {
      title: 'Cambiar contraseña',
      action: () => navigation.navigate('ChangePassword'),
      show: user.user_metadata?.passwordStatus === 'has-password',
    },
    {
      title: 'Enviar comentario',
      action: () => sendFeedbackByEmail({ id: user.id, email: user.email }),
      show: isSubscribed,
    },
  ]

  return (
    <BottomSheetModalProvider>
      <View bg="background.2" flex={1}>
        <Ribbon title="Mi cuenta" />
        <View px="1.5" flex={1} bg="background.3">
          {listItem.map(({ title, action, show }, index) => (
            <MyAccountItem
              key={index}
              title={title}
              action={action}
              show={show}
            />
          ))}
          {!isSubscribed && Platform.OS === 'ios' ? (
            <TouchableWithoutFeedback
              onPress={() => deleteAccountModalRef.current?.present()}>
              <Item prefix={<View height={10} width={10} />} height={62}>
                <Paragraph fontSize="sm" color="text.4">
                  Eliminar mi cuenta
                </Paragraph>
              </Item>
            </TouchableWithoutFeedback>
          ) : null}
        </View>
      </View>
      <BottomSheetCustomModal
        ref={deleteAccountModalRef}
        backdropComponent={(props) => (
          <Backdrop
            onPress={() => {
              if (isLoading) return
              deleteAccountModalRef.current?.close()
            }}
            {...props}
          />
        )}
        enableHandlePanningGesture={!isLoading}
        enableContentPanningGesture={!isLoading}
        snapPoints={[425]}>
        <DeleteAccount
          onDismiss={() => deleteAccountModalRef.current?.dismiss()}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </BottomSheetCustomModal>
    </BottomSheetModalProvider>
  )
}

export default MyAccountScreen
