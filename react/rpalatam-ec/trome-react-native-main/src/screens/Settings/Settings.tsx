import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@shopify/restyle'
import React, { useRef } from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Box from '../../components/box'
import Menu from '../../components/menu'
import Ribbon from '../../components/ribbon'
import Typography from '../../components/typography'
import {
  BottomSheetCustomModal,
  BottomSheetModalProvider,
} from '../../containers/bottomSheet'
import ThemeSelector from '../../containers/themeSelector'
import { App } from '../../utils/config'
import { openInBrowser } from '../../utils/inappbrowser'
import type { MainStackScreenProps } from '../../routes/types'
import type { BoxProps, Theme } from '../../theme'

const { View } = Box
const { Item } = Menu
const { Paragraph } = Typography

const COOKIE_URL = App.select({
  depor: 'https://depor.com/politicas-cookies/',
  elcomercio: 'https://elcomercio.pe/politica-de-cookies/',
  gestion: 'https://gestion.pe/politica-de-cookies/',
  peru21: 'https://peru21.pe/politicas-de-cookies/',
  trome: 'https://trome.pe/politica-de-cookies/',
})

const itemProps: BoxProps = {
  borderBottomColor: 'separator',
  borderBottomWidth: 1,
  px: '1.5',
  py: '1',
}

const Settings: React.FC = () => {
  const navigation =
    useNavigation<MainStackScreenProps<'Settings'>['navigation']>()
  const { colors } = useTheme<Theme>()
  const modalThemeRef = useRef<BottomSheetCustomModal>(null)

  return (
    <BottomSheetModalProvider>
      <View bg="background" flex={1}>
        <Ribbon title="Ajustes" />
        <View>
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate('Main', { screen: 'CustomContent' })
            }>
            <Item
              {...itemProps}
              prefix={<Icon name="view-list" size={26} color={colors.text} />}
              suffix="chevron">
              <View>
                <Paragraph color="coolGray-700" fontSize="sm" fontWeight="bold">
                  Mi contenido
                </Paragraph>
                <Paragraph color="text" fontSize="sm">
                  Personalizar las secciones
                </Paragraph>
              </View>
            </Item>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => modalThemeRef.current?.present()}>
            <Item
              {...itemProps}
              prefix={
                <Icon name="brightness-4" size={26} color={colors.text} />
              }>
              <View>
                <Paragraph color="coolGray-700" fontSize="sm" fontWeight="bold">
                  Apariencia
                </Paragraph>
                <Paragraph color="text" fontSize="sm">
                  Ajustar el tema de la aplicación
                </Paragraph>
              </View>
            </Item>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => openInBrowser(COOKIE_URL)}>
            <Item {...itemProps}>
              <View>
                <Paragraph color="coolGray-700" fontSize="sm" fontWeight="bold">
                  Política de cookies
                </Paragraph>
              </View>
            </Item>
          </TouchableWithoutFeedback>
        </View>
        <BottomSheetCustomModal ref={modalThemeRef} snapPoints={[250]}>
          <ThemeSelector />
        </BottomSheetCustomModal>
      </View>
    </BottomSheetModalProvider>
  )
}

export default Settings
