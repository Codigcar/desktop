import { App } from '../../utils/config'

export { default as VerifyAccountScreen } from './VerifyAccount'
export { default as SignUpOnboarding } from './SignUpOnboarding.elcomercio'

/* eslint-disable @typescript-eslint/no-var-requires */
export const AccountLinkingScreen = App.select({
  elcomercio: require('./AccountLinking.elcomercio').default,
  default: require('./AccountLinking').default,
})

export const InitialScreen = App.select({
  elcomercio: require('./InitialScreen.elcomercio').default,
  default: require('./InitialScreen').default,
})

export const ForgotPasswordScreen = App.select({
  elcomercio: require('./ForgotPassword.elcomercio').default,
  default: require('./ForgotPassword').default,
})

export const LoginScreen = App.select({
  elcomercio: require('./Login.elcomercio').default,
  default: require('./SignIn').default,
})

export const SignwallModalScreen = App.select({
  elcomercio: require('./Signwall.elcomercio').default,
  gestion: require('./Signwall.gestion').default,
  default: () => null,
})

export const SignUpOptInScreen = App.select({
  elcomercio: require('./SignUpOptIn.elcomercio').default,
  default: require('./SignUpOptIn').default,
})

export const SignUpScreen = App.select({
  elcomercio: require('./SignUp.elcomercio').default,
  default: require('./SignUp').default,
})
