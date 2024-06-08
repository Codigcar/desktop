import { App } from '../../utils/config'

export { default as PaywallLandingScreen } from './Paywall'

/* eslint-disable @typescript-eslint/no-var-requires */
export const PaywallModalScreen = App.select({
  elcomercio: require('./PaywallModal').default,
  gestion: require('./PaywallModal.gestion').default,
  default: () => null,
})
