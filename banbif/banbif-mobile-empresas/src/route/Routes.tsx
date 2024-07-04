import React, { createRef, useEffect, useRef, useState } from 'react'
import strings from '../assets/strings'
import MainMenu from '../views/MainMenu'
import Login from '../views/Login'
import ProductName from '../views/ProductName'
import CheckingAccountDetails from '../views/CheckingAccountDetails'
import ConsolidatedPosition from '../views/ConsolidatedPosition/ConsolidatedPosition'
import Loans from '../views/Loans/Loans'
import TimeDeposits from '../views/TimeDeposits/TimeDeposits'
import Leasing from '../views/Leasing/Leasing'
import {
  Image,
  Keyboard,
  PanResponder,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from '../components/Icon'
import Logout from '../components/Logout'
import Logo from '../components/Logo'
import colors from '../assets/colors'
import Factoring from '../views/Factoring/Factoring'
import DepositsOfDeposit from '../views/DepositsOfDeposit/DepositsOfDeposit'
import InternationalCollections from '../views/InternationalCollections/InternationalCollections'
import Collections from '../views/Collections/Collections'
import Discounts from '../views/Discounts/Discounts'
import LetterCreditLine from '../views/LetterCreditLine/LetterCreditLine'
import CreditCard from '../views/CreditCard/CrediCard'
import PendingApprovals from '../views/PendingApprovals/PendingApprovals'
import EnrolamientoSoftToken from '../views/EnrolamientoSoftToken/EnrolamientoSoftToken'
import EnrolamientoListo from '../views/EnrolamientoListo/EnrolamientoListo'
import EnrolamientoErro from '../views/EnrolamientoErro/EnrolamientoErro'
import CreditLetters from '../views/CreditLetters/CreditLetters'
import SoftTokenLogin from '../views/SoftTokenLogin/SoftTokenLogin'
import IntermediateScreen from '../views/IntermediateScreen/IntermediateScreen'
import images from '../assets/images'
import NetworkVerification from '../views/NetworkVerification/NetworkVerification'
import FrequentQuestions from '../views/FrequentQuestions/FrequentQuestions'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { navigate, navigationRef } from '../services/navigation'
import { AuthService } from '../services/auth'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import NetworkLogger from 'react-native-network-logger'
import { AppStack } from '../../src2/routes'
import LoginScreen from '../../src2/modules/Auth/Login/presentation/Login.screen'

const Stack = createNativeStackNavigator()
let timeout: any
const TIME_TIMEOUT = 180000 // 3 minutos

const FloatingButton = ({ onPress }: any) => (
  <TouchableOpacity
    style={{
      position: 'absolute',
      bottom: 20,
      right: 20,
      //   borderRadius:2,
      //   borderWidth:2,
      //   borderColor:'red',
      backgroundColor: 'gray',
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onPress={onPress}>
    <Text>+</Text>
  </TouchableOpacity>
)

const MyScreen = () => <NetworkLogger />

const Tab = createBottomTabNavigator()

const Routes = () => {
  const [isTimeout, setIsTimeout] = useState(false)
  const refLogout = createRef()

  const resetInactivityTimeout = () => {
    clearTimeout(timeout)
    if (isTimeout) {
      timeout = setTimeout(() => {
        logout(refLogout)
      }, TIME_TIMEOUT)
    }
  }

  //
  const logout = async (ref: any) => {
    await AuthService.doLogout()
    navigate('Login', { isTimeout: true })
  }

  const handleStateChange = () => {
    setIsTimeout(true)
  }

  useEffect(() => {
    timeout = setTimeout(() => {
      if (isTimeout) {
        logout(refLogout)
      }
    }, TIME_TIMEOUT)

    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      clearTimeout(timeout)
    })
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      resetInactivityTimeout()
    })
    return () => {
      clearTimeout(timeout)
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [isTimeout])

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: () => {
      resetInactivityTimeout()
    },
    onStartShouldSetPanResponder: () => {
      resetInactivityTimeout()
    },
    onStartShouldSetPanResponderCapture: () => {
      resetInactivityTimeout()
    },
  })

  return (
    <View
      {...panResponder.panHandlers}
      style={{ flex: 1, backgroundColor: 'transparent' }}>
      <NavigationContainer
        ref={navigationRef}
        onStateChange={handleStateChange}>
        <AppStack.Navigator initialRouteName="LoginScreen">
          {/* Nuevo */}
          <AppStack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          
          {/* Nuevo */}
          <AppStack.Screen name="NetworkLogger" component={MyScreen} />

          <AppStack.Screen
            name="NetworkVerification"
            component={NetworkVerification}
            options={{
              headerShown: false,
            }}
          />

          <AppStack.Screen
            name="SoftTokenLogin"
            component={SoftTokenLogin}
            options={{
              headerShown: false,
            }}
          />

          <AppStack.Screen
            name="MainMenu"
            component={MainMenu}
            options={({ navigation, route }) => {
              let altura = 60
              let imagem = <Logo />

              if (route?.params) {
                altura = route.params?.altura
                imagem = altura == 0 ? <View /> : <Logo />
              }
              return {
                gestureEnabled: false,
                headerTitle: () => (
                  <Image
                    style={{ width: 110, height: 30 }}
                    source={images.logo}
                  />
                ),
                headerStyle: {
                  backgroundColor: colors.lightBlue,
                  justifyContent: 'center',
                  //height: altura
                },
                headerBackVisible: false,
                headerTintColor: colors.white,
                headerTitleAlign: 'center',
                headerLeft: () => imagem,
                headerRight: () => <Logout navigation={navigation} />,
              }
            }}
          />

          <AppStack.Screen
            name="ConsolidatedPosition"
            component={ConsolidatedPosition}
            options={{
              title: strings.consolidatedPosition.title,
              headerStyle: {
                backgroundColor: colors.lightBlue,
                height: 60,
              },
              headerTintColor: colors.white,
              headerTitleStyle: {
                alignSelf: 'center',
                fontWeight: 'normal',
              },
              headerBackTitle: '',
              headerBackImage: () => (
                <Icon
                  family={Icon.ENTYPO}
                  name="chevron-small-left"
                  size={40}
                  style={{ color: colors.white }}
                />
              ),
            }}
          />

          <AppStack.Screen
            name="ProductName"
            component={ProductName}
            options={({ navigation, route }) => ({
              title: route.params.descripcion,
              headerStyle: {
                backgroundColor: colors.lightBlue,
                height: 60,
              },
              headerTintColor: colors.white,
              headerTitleStyle: {
                fontWeight: 'normal',
                textAlign: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
              },
              headerBackTitle: '',
              headerBackImage: () => (
                <Icon
                  family={Icon.ENTYPO}
                  name="chevron-small-left"
                  size={40}
                  style={{ color: colors.white }}
                />
              ),
            })}
          />

          <AppStack.Screen
            name="CheckingAccountDetails"
            component={CheckingAccountDetails}
            options={{
              title: 'Cuentas Corrientes y de Ahorro',
              headerStyle: {
                backgroundColor: colors.white,
                height: 60,
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
              },

              headerTintColor: colors.black,

              headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: 17,
                alignSelf: 'center',
              },
              headerBackTitle: '',
              headerCheckingAccountDetailsBackImage: (
                <Icon
                  family={Icon.ENTYPO}
                  name="chevron-small-left"
                  size={40}
                  style={{ color: colors.black }}
                />
              ),
            }}
          />

          <AppStack.Screen
            name="CreditCard"
            component={CreditCard}
            options={{
              title: 'Tarjeta de Crédito',
              headerStyle: {
                backgroundColor: colors.white,
                height: 60,
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
              },
              headerTintColor: colors.black,
              headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: 17,
                alignSelf: 'center',
              },
              headerBackTitle: '',
              headerBackImage: () => (
                <Icon
                  family={Icon.ENTYPO}
                  name="chevron-small-left"
                  size={40}
                  style={{ color: colors.black }}
                />
              ),
            }}
          />

          <AppStack.Screen
            name="Loans"
            component={Loans}
            options={{
              title: 'Préstamos',
              headerStyle: {
                backgroundColor: colors.white,
                height: 60,
              },
              headerTintColor: colors.black,

              headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: 17,
                alignSelf: 'center',
              },
              headerBackTitle: '',
              headerBackImage: () => (
                <Icon
                  family={Icon.ENTYPO}
                  name="chevron-small-left"
                  size={40}
                  style={{ color: colors.black }}
                />
              ),
            }}
          />

          <AppStack.Screen
            name="TimeDeposits"
            component={TimeDeposits}
            options={{
              title: 'Depósitos a Plazo Fijo',
              headerStyle: {
                backgroundColor: colors.white,
                height: 60,
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
              },
              headerTintColor: colors.black,

              headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: 17,
                alignSelf: 'center',
              },
              headerBackTitle: '',
              headerBackImage: () => (
                <Icon
                  family={Icon.ENTYPO}
                  name="chevron-small-left"
                  size={40}
                  style={{ color: colors.black }}
                />
              ),
            }}
          />

          <AppStack.Screen
            name="Leasing"
            component={Leasing}
            options={{
              title: 'Leasing',
              headerStyle: {
                backgroundColor: colors.white,
                height: 60,
              },
              headerTintColor: colors.black,
              headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: 17,
                alignSelf: 'center',
              },
              headerBackTitle: '',
              headerBackImage: () => (
                <Icon
                  family={Icon.ENTYPO}
                  name="chevron-small-left"
                  size={40}
                  style={{ color: colors.black }}
                />
              ),
            }}
          />

          <AppStack.Screen
            name="Factoring"
            component={Factoring}
            options={{
              title: 'Factoring Eletrónico',
              headerStyle: {
                backgroundColor: colors.white,
                height: 60,
              },
              headerTintColor: colors.black,

              headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: 17,
                alignSelf: 'center',
              },
              headerBackTitle: '',
              headerBackImage: () => (
                <Icon
                  family={Icon.ENTYPO}
                  name="chevron-small-left"
                  size={40}
                  style={{ color: colors.black }}
                />
              ),
            }}
          />

          <AppStack.Screen
            name="DepositsOfDeposit"
            component={DepositsOfDeposit}
            options={{
              title: 'Carta Fianza',
              headerStyle: {
                backgroundColor: colors.white,
                height: 60,
              },
              headerTintColor: colors.black,
              headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: 17,
                alignSelf: 'center',
              },
              headerBackTitle: '',
              headerBackImage: () => (
                <Icon
                  family={Icon.ENTYPO}
                  name="chevron-small-left"
                  size={40}
                  style={{ color: colors.black }}
                />
              ),
            }}
          />

          <AppStack.Screen
            name="InternationalCollections"
            component={InternationalCollections}
            options={{
              title: 'Cobranzas Importación - Exportación',
              headerStyle: {
                backgroundColor: colors.white,
                height: 60,
              },
              headerTintColor: colors.black,
              headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: 17,
                alignSelf: 'center',
              },
              headerBackTitle: '',
              headerBackImage: () => (
                <Icon
                  family={Icon.ENTYPO}
                  name="chevron-small-left"
                  size={40}
                  style={{ color: colors.black }}
                />
              ),
            }}
          />

          <AppStack.Screen
            name="Collections"
            component={Collections}
            options={{
              title: 'Cobranzas',
              headerStyle: {
                backgroundColor: colors.white,
                height: 60,
              },
              headerTintColor: colors.black,
              headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: 17,
                alignSelf: 'center',
              },
              headerBackTitle: '',
              headerBackImage: () => (
                <Icon
                  family={Icon.ENTYPO}
                  name="chevron-small-left"
                  size={40}
                  style={{ color: colors.black }}
                />
              ),
            }}
          />

          <AppStack.Screen
            name="Discounts"
            component={Discounts}
            options={{
              title: 'Descuentos',
              headerStyle: {
                backgroundColor: colors.white,
                height: 60,
              },
              headerTintColor: colors.black,
              headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: 17,
                alignSelf: 'center',
              },
              headerBackTitle: '',
              headerBackImage: () => (
                <Icon
                  family={Icon.ENTYPO}
                  name="chevron-small-left"
                  size={40}
                  style={{ color: colors.black }}
                />
              ),
            }}
          />

          <AppStack.Screen
            name="CreditLetters"
            component={CreditLetters}
            options={{
              title: 'Cartas de Crédito',
              headerStyle: {
                backgroundColor: colors.white,
                height: 60,
              },
              headerTintColor: colors.black,
              headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: 17,
                alignSelf: 'center',
              },
              headerBackTitle: '',
              headerBackImage: () => (
                <Icon
                  family={Icon.ENTYPO}
                  name="chevron-small-left"
                  size={40}
                  style={{ color: colors.black }}
                />
              ),
            }}
          />

          <AppStack.Screen
            name="LetterCreditLine"
            component={LetterCreditLine}
            options={{
              title: 'Línea de Crédito de Descuentos',
              headerStyle: {
                backgroundColor: colors.white,
                height: 60,
              },
              headerTintColor: colors.black,
              headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: 17,
                alignSelf: 'center',
              },
              headerBackTitle: '',
              headerBackImage: () => (
                <Icon
                  family={Icon.ENTYPO}
                  name="chevron-small-left"
                  size={40}
                  style={{ color: colors.black }}
                />
              ),
            }}
          />

          <AppStack.Screen
            name="PendingApprovals"
            component={PendingApprovals}
            options={({ route }) => ({
              title: 'Aprobaciones Pendientes',
              headerStyle: {
                backgroundColor: colors.white,
                height: 60,
              },
              headerTintColor: colors.black,
              headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: 17,
                alignSelf: 'center',
              },
              headerBackTitle: '',
              headerBackImage: () => (
                <Icon
                  family={Icon.ENTYPO}
                  name="chevron-small-left"
                  size={40}
                  style={{ color: colors.black }}
                />
              ),
            })}
          />

          <AppStack.Screen
            name="EnrolamientoSoftToken"
            component={EnrolamientoSoftToken}
            options={{
              title: 'Afiliación Digital',
              headerStyle: {
                backgroundColor: colors.white,
                height: 60,
                borderBottomWidth: 0,
                shadowRadius: 0,
                shadowOffset: {
                  height: 0,
                },
                shadowColor: 'transparent',
                elevation: 0,
              },
              // headerTitleStyle: {
              //   fontWeight: "normal"
              // },
              headerTintColor: colors.black,
              headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: 17,
                alignSelf: 'center',
              },
              headerBackTitle: '',
              headerBackImage: () => (
                <Icon
                  family={Icon.ENTYPO}
                  name="chevron-small-left"
                  size={40}
                  style={{ color: colors.lightBlue }}
                />
              ),
            }}
          />

          <AppStack.Screen
            name="EnrolamientoListo"
            component={EnrolamientoListo}
            options={{
              headerShown: false,
            }}
          />

          <AppStack.Screen
            name="EnrolamientoErro"
            component={EnrolamientoErro}
            options={{
              title: 'Enrolamiento al Token',
              headerStyle: {
                backgroundColor: colors.white,
                height: 60,
                borderBottomWidth: 0,
                shadowRadius: 0,
                shadowOffset: {
                  height: 0,
                },
                shadowColor: 'transparent',
                elevation: 0,
              },
              headerTintColor: colors.black,
              headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: 17,
                alignSelf: 'center',
              },
              headerBackTitle: '',
              headerBackImage: () => <View />,
            }}
          />

          <AppStack.Screen
            name="IntermediateScreen"
            component={IntermediateScreen}
            options={{
              headerShown: false,
            }}
          />

          <AppStack.Screen
            name="FrequentQuestions"
            component={FrequentQuestions}
            options={{
              title: strings.frequentQuestions.title,
              headerStyle: {
                backgroundColor: colors.lightBlue,
                height: 60,
              },
              headerTintColor: colors.white,
              headerTitleStyle: {
                alignSelf: 'center',
                fontWeight: 'normal',
              },
              headerBackTitle: '',
              headerBackImage: () => (
                <Icon
                  family={Icon.ENTYPO}
                  name="chevron-small-left"
                  size={40}
                  style={{ color: colors.white }}
                />
              ),
            }}
          />
        </AppStack.Navigator>
        <FloatingButton
          onPress={() => {
            console.log('Botón flotante presionado')
            navigate('NetworkLogger')
          }}
        />
      </NavigationContainer>
    </View>
  )
}

export default Routes
