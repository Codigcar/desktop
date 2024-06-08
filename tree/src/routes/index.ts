import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import {
  AuthStackParamList,
  BookingStackParamList,
  CalificationsStackParamList,
  CoursesStackParamList,
  DrawerStackParamList,
  EventsStackParamList,
  HomeStackParamList,
  JobBoardStackParamList,
  ProfileStackParamList,
  RootStackParamList,
} from './types'

export const RootStack = createNativeStackNavigator<RootStackParamList>()
export const AuthStack = createNativeStackNavigator<AuthStackParamList>()
export const HomeStack = createNativeStackNavigator<HomeStackParamList>()
export const CalificationsStack = createNativeStackNavigator<CalificationsStackParamList>()
export const CoursesStack = createNativeStackNavigator<CoursesStackParamList>()
export const EventsStack = createNativeStackNavigator<EventsStackParamList>()
export const ProfileStack = createNativeStackNavigator<ProfileStackParamList>()
export const BookingsStack = createNativeStackNavigator<BookingStackParamList>()
export const JobBoardStack = createNativeStackNavigator<JobBoardStackParamList>()

export const DrawerStack = createDrawerNavigator<DrawerStackParamList>()