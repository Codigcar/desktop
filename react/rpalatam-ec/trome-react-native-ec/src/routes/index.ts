import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import {
  AccountStackParamList,
  AuthStackParamList,
  HomeStackParamList,
  MainStackParamList,
  RootStackParamList,
} from './types'

export const AccountStack = createStackNavigator<AccountStackParamList>()
export const AuthStack = createStackNavigator<AuthStackParamList>()
export const HomeStack = createBottomTabNavigator<HomeStackParamList>()
export const MainStack = createStackNavigator<MainStackParamList>()
export const RootStack = createStackNavigator<RootStackParamList>()
