import { User } from '../../entities/User'

export interface Authentication {
  accountLinking(
    email: string,
    password: string,
    linking_state: string,
  ): Promise<Token>
  /**
   * Check if a user has verified their email address or not
   * @returns boolean
   */
  checkEmail(): Promise<boolean>
  getOAuthConfig?(): OAuth
  getToken(): Promise<Token | null>
  getUserProfile(): Promise<User>
  login(email: string, password: string): Promise<void>
  logout(): Promise<void>
  passwordlessLoginToken(email: string, linking_state: string): Promise<void>
  requestVerifyEmail(email: string): Promise<void>
  requestResetPassword(email: string): Promise<void>
  setToken(token: Token): Promise<void>
  signUp(data: SignUp): Promise<Token>
  signUpOptIn(data: Record<string, string>): Promise<SocialLinking | Token>
  socialSignIn(
    provider: string,
    token: string,
  ): Promise<SocialLinking | SocialOptIn | Token>
  /**
   * Update user password
   * @param current Old password
   * @param next New password
   */
  updatePassword(current: string, next: string): Promise<void>
  updateProfile(user: User): Promise<User>
  deleteAccount(): Promise<void>
}

/**
 * OAuth config based in React Native App Auth
 * @see https://github.com/FormidableLabs/react-native-app-auth
 */
export interface OAuth {
  client_id: string
  issuer: string
  redirect_url: string
  additional_parameters?: Record<string, string>
}

export interface SignUp {
  data_treatment: boolean
  email: string
  password: string
  first_name?: User['first_name']
  last_name?: User['last_name']
}

interface SocialState {
  provider: string
  state: string
  additional_parameters?: Record<string, boolean | string>
}

export interface SocialOptIn extends SocialState {
  need_email: boolean
  state: 'opt-in'
}

export interface SocialLinking extends SocialState {
  email: string
  state: 'linking'
}

export interface Token {
  access_token: string
  refresh_token: string
}
