export { default as SubscriptionOnboardingScreen } from './Onboarding.elcomercio'
import { App } from '../../utils/config'

/* eslint-disable @typescript-eslint/no-var-requires */
export const SubscriptionScreen = App.select({
  elcomercio: require('./Subscription.elcomercio').default,
  default: require('./Subscription').default,
})
