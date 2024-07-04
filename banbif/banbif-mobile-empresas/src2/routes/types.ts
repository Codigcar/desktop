import { NativeStackScreenProps } from "@react-navigation/native-stack"

export type AppStackParamList = {
  LoginScreen: undefined

  NetworkLogger: undefined
  LoginAuth0: undefined
  SettingScreen: undefined
  LogoutAuth0: undefined
  RegisterAuth0: undefined
  NetworkVerification: undefined
  SoftTokenLogin: undefined
  MainMenu: undefined
  ConsolidatedPosition: undefined
  ProductName: undefined
  CheckingAccountDetails: undefined
  CreditCard: undefined
  Loans: undefined
  TimeDeposits: undefined
  Leasing: undefined
  Factoring: undefined
  DepositsOfDeposit: undefined
  InternationalCollections: undefined
  Collections: undefined
  Discounts: undefined
  CreditLetters: undefined
  LetterCreditLine: undefined
  PendingApprovals: undefined
  EnrolamientoSoftToken: undefined
  EnrolamientoListo: undefined
  EnrolamientoErro: undefined
  IntermediateScreen: undefined
  FrequentQuestions: undefined
}

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>
