import crashlytics from '@react-native-firebase/crashlytics'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@shopify/restyle'
import React, { useEffect } from 'react'
import { Dimensions, Platform, TouchableWithoutFeedback } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import SplashScreen from 'react-native-splash-screen'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Cover from './Cover'
import Loading from './Loading'
import IconGoogle from '../../assets/icons/icon_google.svg'
import Button from '../../components/Button'
import Box from '../../components/box'
import Typography from '../../components/typography'
import { useAuth } from '../../context/auth'
import { useNotification } from '../../context/notification'
import { useThemeContext } from '../../context/theme'
import { useAuthWithSocialMedia } from '../../hooks/useAuthWithSocialMedia'
import auth from '../../services/auth'
import { Theme } from '../../theme'
import * as authThirdParty from '../../utils/auth'
import { App } from '../../utils/config'
import { getRemoteValue } from '../../utils/firebase'
import { ENABLE_SOCIAL_MEDIA } from '../../utils/flags'
import type { AuthStackScreenProps } from '../../routes/types'

type SocialMediaProvider = 'facebook' | 'google' | 'apple'

const { SafeAreaView, View } = Box
const { Link, Paragraph } = Typography

const AuthWithApple: React.FC<{
  handleSignIn: (provider: SocialMediaProvider) => void
}> = ({ handleSignIn }) => {
  const { colors } = useTheme<Theme>()
  if (Platform.OS !== 'ios') return null

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        handleSignIn('apple')
      }}
      accessibilityLabel="apple">
      <View
        mr="1.25"
        bg="white"
        borderRadius="full"
        height={48}
        width={48}
        alignItems="center"
        justifyContent="center"
        elevation={2}
        shadowColor="coolGray-800"
        shadowOffset={{ width: 0, height: 1 }}
        shadowOpacity={0.2}
        shadowRadius={1.41}>
        <Icon name="apple" size={38} color={colors.black} />
      </View>
    </TouchableWithoutFeedback>
  )
}

const InitialScreen: React.FC = () => {
  const { signin } = useAuth()
  const insets = useSafeAreaInsets()
  const navigation =
    useNavigation<AuthStackScreenProps<'InitialScreen'>['navigation']>()
  const canGoBack = navigation.canGoBack()
  const authOAuth = getRemoteValue('auth_oauth').asString()
  const notification = useNotification()
  const { currentTheme } = useThemeContext()
  const { colors } = useTheme<Theme>()

  const { signInSocialMedia: socialSignIn, isSubmitted } =
    useAuthWithSocialMedia()

  const isOAuthAvailable = !!auth.getOAuthConfig && authOAuth === 'enabled'

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  const handleOAuth = async (params?: Record<string, string>) => {
    try {
      const config = auth.getOAuthConfig?.()
      if (!config) return
      const url = await authThirdParty.authorize({
        ...config,
        additional_parameters: params,
      })
      if (!url) return
      const token = await authThirdParty.tokenExchange(config, url)
      await auth.setToken(token)
      signin('oauth')
    } catch (error) {
      if (!(error instanceof Error)) return
      crashlytics().recordError(error)
      notification.show({
        message: `No se pudo ingresar, inténtalo nuevamente o accede con otro método.`,
        type: 'error',
      })
    }
  }
  const bgColor = App.key === 'gestion' ? 'backgroundSecondary' : 'background'
  const skipColor = App.key === 'peru21' ? 'white' : 'black'
  const facebookColor = currentTheme === 'dark' ? colors.link : '#1977F3'

  return (
    <View bg="brand" flex={1} justifyContent="flex-end">
      <SafeAreaView edges={['top']}>
        {!canGoBack ? (
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.replace('Main', {
                screen: 'Home',
                params: { screen: 'Feed' },
              })
            }}>
            <View alignItems="flex-end" pt="0.5" px="0.75">
              <Paragraph color={skipColor} fontSize="sm" fontWeight="medium">
                OMITIR
              </Paragraph>
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <TouchableWithoutFeedback onPress={navigation.goBack}>
            <View alignItems="flex-end" pt="0.5" px="0.75">
              <Icon
                name="close"
                accessibilityLabel="cerrar"
                color={skipColor}
                size={28}
              />
            </View>
          </TouchableWithoutFeedback>
        )}
      </SafeAreaView>
      <Cover brand={App.key} />
      <SafeAreaView edges={['bottom']} bg={bgColor}>
        <View
          pt="3"
          px="1"
          style={{ paddingBottom: 48 - insets.bottom }}
          bg={bgColor}>
          <Paragraph color="coolGray-500" fontWeight="bold" textAlign="center">
            Continuar con
          </Paragraph>
          {!isOAuthAvailable && ENABLE_SOCIAL_MEDIA ? (
            <View
              alignItems="center"
              flexDirection="row"
              justifyContent="center"
              py="3">
              <TouchableWithoutFeedback
                onPress={() => {
                  socialSignIn('facebook')
                }}
                accessibilityLabel="facebook">
                <View mr="1.25">
                  <Icon name="facebook" size={58} color={facebookColor} />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {
                  socialSignIn('google')
                }}
                accessibilityLabel="google">
                <View
                  bg="white"
                  borderRadius="full"
                  height={48}
                  width={48}
                  alignItems="center"
                  justifyContent="center"
                  mr="1.25"
                  elevation={2}
                  shadowColor="coolGray-800"
                  shadowOffset={{ width: 0, height: 1 }}
                  shadowOpacity={0.2}
                  shadowRadius={1.41}>
                  <IconGoogle width={28} height={28} />
                </View>
              </TouchableWithoutFeedback>
              <AuthWithApple handleSignIn={socialSignIn} />
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate('Auth', { screen: 'SignIn' })
                }}
                accessibilityLabel="email">
                <View
                  bg="danger"
                  borderRadius="full"
                  height={48}
                  width={48}
                  alignItems="center"
                  justifyContent="center">
                  <Icon name="email" size={33} color="#fff" />
                </View>
              </TouchableWithoutFeedback>
            </View>
          ) : (
            <View py="3">
              {isOAuthAvailable ? (
                <Button
                  title="Ingresar"
                  type="primary"
                  onPress={() => handleOAuth({ disable_sign_up: 'true' })}
                />
              ) : (
                <Button
                  title="Correo electrónico"
                  icon={<Icon name="email" size={27} color="#fff" />}
                  type="primary"
                  accessibilityLabel="email"
                  onPress={() => {
                    navigation.navigate('Auth', { screen: 'SignIn' })
                  }}
                />
              )}
            </View>
          )}
          <Paragraph
            color="coolGray-500"
            fontWeight="normal"
            textAlign="center">
            ¿Aún no tienes una cuenta?{' '}
            <Link
              onPress={() => {
                if (isOAuthAvailable) return handleOAuth({ screen: 'register' })
                navigation.navigate('Auth', { screen: 'SignUp' })
              }}
              testID="signup-link">
              Regístrate
            </Link>
          </Paragraph>
        </View>
      </SafeAreaView>
      {isSubmitted ? (
        <Loading height={Dimensions.get('window').height} />
      ) : null}
    </View>
  )
}

export default InitialScreen
