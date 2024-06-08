import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { useCallback } from 'react'

import { useAuth } from '../context/auth'
import subscription from '../services/subscription'
import { App } from '../utils/config'
import {
  FROM_DATE_SUBSCRIPTION_ONBOARDING,
  SIGNUP_ONBOARDING_SHOWN,
  SUBSCRIPTION_ONBOARDING_DATE,
} from '../utils/constants'
import { storage } from '../utils/storage'
import type { RootStackScreenProps } from '../routes/types'

interface Hook {
  showOnboarding: () => Promise<void>
  showOnboardingSignUp: () => void
}

export const useSubscriptionOnboarding = (): Hook => {
  const navigation = useNavigation<RootStackScreenProps<'Main'>['navigation']>()
  const { user } = useAuth()

  const showOnboarding = useCallback(async () => {
    if (!subscription || App.key !== 'elcomercio') return
    if (await AsyncStorage.getItem(SUBSCRIPTION_ONBOARDING_DATE)) return

    const startDateSubscription = await subscription.startDate(user.id)
    if (!startDateSubscription) return

    if (startDateSubscription * 1000 > FROM_DATE_SUBSCRIPTION_ONBOARDING) {
      await AsyncStorage.setItem(SUBSCRIPTION_ONBOARDING_DATE, `${Date.now()}`)
      navigation.navigate('Main', { screen: 'SubscriptionOnboarding' })
    }
  }, [navigation, user.id])

  const showOnboardingSignUp = useCallback(() => {
    if (App.key !== 'elcomercio' || storage.getBoolean(SIGNUP_ONBOARDING_SHOWN))
      return

    navigation.navigate('Main', { screen: 'SignUpOnboarding' })
  }, [navigation])

  return {
    showOnboarding,
    showOnboardingSignUp,
  }
}
