import analytics from '@react-native-firebase/analytics'
import crashlytics from '@react-native-firebase/crashlytics'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'

import { useAuth } from '../context/auth'
import { useNotification } from '../context/notification'
import auth from '../services/auth'
import * as authThirdParty from '../utils/auth'
import { App } from '../utils/config'
import type { RootStackScreenProps } from '../routes/types'

export type SocialMediaProvider = 'facebook' | 'google' | 'apple'

const getToken = (provider: SocialMediaProvider): Promise<string> => {
  if (provider === 'apple') return authThirdParty.appleSignIn()
  if (provider === 'facebook') return authThirdParty.facebookSignIn()
  return authThirdParty.googleSignIn()
}

export const useAuthWithSocialMedia = (): {
  isSubmitted: boolean
  signInSocialMedia: (provider: SocialMediaProvider) => void
  errors: { common_error?: string }
} => {
  const { signin } = useAuth()
  const navigation = useNavigation<RootStackScreenProps<'Auth'>['navigation']>()
  const notification = useNotification()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setFieldError] = useState<{ common_error?: string }>({
    common_error: undefined,
  })

  const signInSocialMedia = async (provider: SocialMediaProvider) => {
    try {
      const token = await getToken(provider)
      setIsSubmitted(true)
      const response = await auth.socialSignIn(provider, token)
      if ('access_token' in response) {
        await analytics().logLogin({ method: provider })
        await auth.setToken(response)
        return signin(provider)
      }
      setIsSubmitted(false)
      if (response.state === 'linking') {
        if (!response.additional_parameters?.email_verified) {
          await auth.passwordlessLoginToken(
            response.email,
            response.additional_parameters?.linking_state as string,
          )
          if (App.key === 'elcomercio') {
            setFieldError({
              common_error:
                'Ya tienes una cuenta con nosotros. Te hemos enviado un correo para poder vincular tus cuentas.',
            })
          } else {
            notification.show({
              message:
                'Ya tienes una cuenta con nosotros. Te hemos enviado un correo para poder vincular tus cuentas.',
              type: 'success',
            })
          }
          setIsSubmitted(false)
          return
        }
        return navigation.navigate('Auth', {
          screen: 'AccountLinking',
          params: {
            email: response.email,
            method: provider,
            additional_parameters: response.additional_parameters,
          },
        })
      }
      navigation.replace('Auth', {
        screen: 'SignUpOptIn',
        params: {
          method: provider,
          need_email: response.need_email,
          additional_parameters: response.additional_parameters,
        },
      })
    } catch (error) {
      let message = 'Ocurrió un error inesperado'
      if (error instanceof Error) {
        if (/cancel/i.test(error.message)) return
        crashlytics().recordError(error)
        message = error.message
      }
      if (message.toLowerCase().includes('captcha')) {
        message = 'En estos momentos no podemos realizar la operación'
      }
      setIsSubmitted(false)
      if (App.key === 'elcomercio') {
        setFieldError({ common_error: message })
      } else {
        notification.show({ message, type: 'error' })
      }
    }
  }

  return {
    isSubmitted,
    signInSocialMedia,
    errors,
  }
}
