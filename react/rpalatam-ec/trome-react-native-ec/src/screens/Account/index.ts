import { App } from '../../utils/config'

/* eslint-disable @typescript-eslint/no-var-requires */
export const MyAccount = App.select({
  elcomercio: require('./MyAccount.elcomercio').default,
  default: require('./MyAccount').default,
})

export const ChangePasswordScreen = App.select({
  elcomercio: require('./ChangePassword.elcomercio').default,
  default: require('./ChangePassword').default,
})

export const InformationScreen = App.select({
  elcomercio: require('./Information.elcomercio').default,
  default: require('./Information').default,
})
