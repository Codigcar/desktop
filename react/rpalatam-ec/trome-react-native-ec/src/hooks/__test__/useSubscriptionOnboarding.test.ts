import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { renderHook } from '@testing-library/react-hooks'

import { useAuth } from '../../context/auth'
import * as service from '../../services/subscription'
import { App } from '../../utils/config'
import {
  FROM_DATE_SUBSCRIPTION_ONBOARDING,
  SIGNUP_ONBOARDING_SHOWN,
  SUBSCRIPTION_ONBOARDING_DATE,
} from '../../utils/constants'
import { storage } from '../../utils/storage'
import { useSubscriptionOnboarding } from '../useSubscriptionOnboarding'
import type { Subscription } from '../../services/subscription/subscription.types'

jest.mock('@react-navigation/native')
const mockUseNavigation = useNavigation as jest.Mock
mockUseNavigation.mockReturnValue({ navigate: jest.fn() })

jest.mock('../../context/auth')
const mockUseAuth = useAuth as jest.Mock
mockUseAuth.mockReturnValue({ user: {} })

const ONE_SECOND = 1000 * 1
const startDate = jest
  .spyOn(service.default as Subscription, 'startDate')
  .mockResolvedValue((FROM_DATE_SUBSCRIPTION_ONBOARDING + ONE_SECOND) / 1000)

describe('useSubscriptionOnboarding', () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
  })

  it('should navigate to subscriber onboarding screen', async () => {
    const navigate = jest.fn()
    mockUseNavigation.mockReturnValueOnce({ navigate })
    const { result } = renderHook(() => useSubscriptionOnboarding())
    await result.current.showOnboarding()
    expect(navigate).toBeCalledWith('Main', {
      screen: 'SubscriptionOnboarding',
    })
  })

  it('should save date to storage for SUBSCRIPTION_ONBOARDING_DATE', async () => {
    const { result } = renderHook(() => useSubscriptionOnboarding())
    await result.current.showOnboarding()
    const date = await AsyncStorage.getItem(SUBSCRIPTION_ONBOARDING_DATE)
    expect(date).not.toBeNull()
  })

  it('should not navigate if subscription is older than FROM_DATE_SUBSCRIPTION_ONBOARDING', async () => {
    const navigate = jest.fn()
    mockUseNavigation.mockReturnValueOnce({ navigate })
    const date = (FROM_DATE_SUBSCRIPTION_ONBOARDING - ONE_SECOND) / 1000
    startDate.mockResolvedValueOnce(date)
    const { result } = renderHook(() => useSubscriptionOnboarding())
    await result.current.showOnboarding()
    expect(navigate).not.toBeCalled()
  })

  it('should not navigate if SUBSCRIPTION_ONBOARDING_DATE is not null', async () => {
    const navigate = jest.fn()
    mockUseNavigation.mockReturnValueOnce({ navigate })
    startDate.mockResolvedValueOnce(null)
    const { result } = renderHook(() => useSubscriptionOnboarding())
    await result.current.showOnboarding()
    expect(navigate).not.toBeCalled()
  })

  it('should not navigate if subscription start date is null', async () => {
    const navigate = jest.fn()
    mockUseNavigation.mockReturnValueOnce({ navigate })
    startDate.mockResolvedValueOnce(null)
    await AsyncStorage.setItem(SUBSCRIPTION_ONBOARDING_DATE, 'date')
    const { result } = renderHook(() => useSubscriptionOnboarding())
    await result.current.showOnboarding()
    expect(navigate).not.toBeCalled()
  })

  it('should not navigate if App key is not elcomercio', async () => {
    App.key = 'gestion'
    const navigate = jest.fn()
    mockUseNavigation.mockReturnValueOnce({ navigate })
    const { result } = renderHook(() => useSubscriptionOnboarding())
    await result.current.showOnboarding()
    expect(navigate).not.toBeCalled()
  })

  it('should not navigate if subscription is undefined', async () => {
    Object.defineProperty(service, 'default', { value: undefined })
    const navigate = jest.fn()
    mockUseNavigation.mockReturnValueOnce({ navigate })
    const { result } = renderHook(() => useSubscriptionOnboarding())
    await result.current.showOnboarding()
    expect(navigate).not.toBeCalled()
  })

  describe('showOnboardingSignup', () => {
    const navigate = jest.fn()

    afterEach(() => {
      storage.clearAll()
      mockUseNavigation.mockReturnValueOnce({ navigate })
    })

    it('should not navigate if App key is not elcomercio', () => {
      const { result } = renderHook(() => useSubscriptionOnboarding())
      result.current.showOnboardingSignUp()
      expect(navigate).not.toBeCalled()
    })

    it('should not open signup onboarding if storage is true', () => {
      storage.set(SIGNUP_ONBOARDING_SHOWN, true)
      const { result } = renderHook(() => useSubscriptionOnboarding())
      result.current.showOnboardingSignUp()
      expect(navigate).not.toBeCalled()
    })

    it('should navigate to signup onboarding screen', () => {
      App.key = 'elcomercio'
      const { result } = renderHook(() => useSubscriptionOnboarding())
      result.current.showOnboardingSignUp()
      expect(navigate).toBeCalledWith('Main', {
        screen: 'SignUpOnboarding',
      })
    })
  })
})
