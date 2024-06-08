import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@shopify/restyle'
import React, { useCallback } from 'react'
import { TouchableWithoutFeedback } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Button from '../../components/Button'
import Box from '../../components/box'
import SafeAreaView from '../../components/box/SafeAreaView'
import Typography from '../../components/typography'
import type { RootStackScreenProps } from '../../routes/types'
import type { Theme } from '../../theme'

const { View } = Box
const { Paragraph } = Typography

const BENEFITS = [
  'Acceder a más de 100 noticias nuevas al día e informes especiales',
  'Guardar tus notas favoritas',
]

const SignwallModalScreen: React.FC = () => {
  const navigation =
    useNavigation<RootStackScreenProps<'SignwallModal'>['navigation']>()
  const { colors } = useTheme<Theme>()

  const navigateToInitialScreen = () => {
    navigation.navigate('Auth', {
      screen: 'InitialScreen',
    })
  }

  const goBack = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  return (
    <View flex={1} flexDirection="column-reverse">
      <View
        bg="background"
        borderTopLeftRadius="xl"
        borderTopRightRadius="xl"
        zIndex={1}>
        <View width={'100%'}>
          <View px="1" pt="1.5">
            <Paragraph
              color="coolGray-800"
              fontSize="lg"
              fontWeight="bold"
              letterSpacing="tight">
              Inicia sesión y sigue informado con lo más completo de economía,
              negocios y finanzas
            </Paragraph>
          </View>
          <View mx="1" py="0.5">
            {BENEFITS.map((beneficios, index) => (
              <View
                alignItems="flex-start"
                flexDirection="row"
                key={index}
                my="0.25">
                <View
                  alignItems="center"
                  borderColor="coolGray-700"
                  borderRadius="full"
                  borderWidth={1.5}
                  height={16}
                  justifyContent="center"
                  mt="0.25"
                  width={16}>
                  <Icon color={colors['coolGray-800']} name="check" size={12} />
                </View>
                <View pl="0.5">
                  <Paragraph color="text" fontWeight="light">
                    {beneficios}
                  </Paragraph>
                </View>
              </View>
            ))}
            <View py="1">
              <Button
                onPress={navigateToInitialScreen}
                title="¡Únete hoy!"
                type="primary"
              />
            </View>
          </View>
          <TouchableWithoutFeedback onPress={goBack}>
            <View
              alignItems="center"
              bg="black"
              flexDirection="row"
              justifyContent="center"
              py="0.5">
              <Paragraph color="white">Volver</Paragraph>
            </View>
          </TouchableWithoutFeedback>
          <SafeAreaView edges={['bottom']} bg="black" />
        </View>
      </View>
      <TouchableWithoutFeedback onPress={goBack}>
        <View
          bg="black"
          opacity={0.5}
          testID="backdrop"
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
        />
      </TouchableWithoutFeedback>
    </View>
  )
}

export default SignwallModalScreen
