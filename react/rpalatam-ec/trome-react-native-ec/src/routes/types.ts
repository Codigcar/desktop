import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native'
import type { StackScreenProps } from '@react-navigation/stack'
import type { WebViewProps } from 'react-native-webview'

export type DrawerParamList = {
  App: NavigatorScreenParams<RootStackParamList>
}

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>
  Gallery: {
    album: {
      count: number
      photos: {
        order: number
        src: string
        description: string | undefined
      }[]
      caption?: boolean
    }
  }
  RecoveryPassword: undefined
  Login: undefined
  Main: NavigatorScreenParams<MainStackParamList>
  Paywall: { title: string; url: string } & WebViewProps
  PaywallModal: { title: string }
  SignUp: undefined
  SignwallModal: undefined
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>

export type AuthStackParamList = {
  AccountLinking: {
    email: string
    method: string
    additional_parameters?: Record<string, boolean | string>
  }
  InitialScreen?: { skipLogin?: boolean }
  SignUp: undefined
  SignUpOptIn: {
    method: string
    need_email: boolean
    additional_parameters?: Record<string, boolean | string>
  }
  SignIn?: { email?: string }
  ForgotPassword: undefined
  VerifyAccount: { emailToResend: string }
}

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  CompositeScreenProps<
    StackScreenProps<AuthStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >

export type MainStackParamList = {
  Favorite: undefined
  CustomContent: undefined
  Home: NavigatorScreenParams<HomeStackParamList>
  Podcast: undefined | { program?: string }
  Interests: undefined
  Search: undefined | { preserve?: boolean }
  Story: { id: string; pathname?: string } | { pathname: string; id?: string }
  News: {
    name: string
    path: string
    /**
     * @deprecated The prop should not be used instead use the name and path directly
     */
    section?: {
      name: string
      path: string
    }
  }
  Account: NavigatorScreenParams<AccountStackParamList>
  Profile: undefined
  Tag: {
    path: string
    name?: string
  }
  Author: {
    path: string
    name?: string
  }
  Newsletters: undefined
  Notifications: undefined
  Settings: undefined
  Subscription: undefined
  SubscriptionOnboarding: undefined
  SignUpOnboarding: undefined
}

export type MainStackScreenProps<T extends keyof MainStackParamList> =
  CompositeScreenProps<
    StackScreenProps<MainStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >

export type AccountStackParamList = {
  AccountOptions: undefined
  ChangePassword: undefined
  Information: undefined
}

export type AccountStackScreenProps<T extends keyof AccountStackParamList> =
  CompositeScreenProps<
    StackScreenProps<AccountStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >

export type HomeStackParamList = {
  Club: undefined
  Feed: undefined
  Games: undefined
  MyNews: undefined
  PrintEdition: undefined
  Profile: undefined
}

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >
