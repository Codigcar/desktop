import React, { useState } from 'react'
import { BackHandler, Platform, ScrollView, Text, View } from 'react-native'
import Icon from '../../components/Icon'
import ShadowContainer from '../../components/ShadowContainer'
import MenuButton from '../../components/MenuButton'
import styles from './Styles'
import strings from '../../assets/strings'
import { StorageService } from '../../services/storage'
import { StringUtils } from '../../utils/stringFormat'
import ModalComponent from '../../components/ModalComponent'
import { useFocusEffect } from '@react-navigation/native'
import { USER_ROLES } from '../../utils/constants'
import colors from '../../assets/colors'

const MainMenu = ({ navigation }) => {

	const [state, setState] = useState({
		modalVisible: false,
		usuarioNombre: '',
		isSoftToken: null,
		hasSoftToken: false,
		isLogout: false,
		modalVisibleSoftToken: true,
		role: null
	})

	useFocusEffect(
		React.useCallback(() => {
			loadStorageData()
			const subscription = BackHandler.addEventListener('hardwareBackPress', handleBackButtonPressAndroid)

			return () => {
				subscription.remove()
			}
		}, [])
	)

	const loadStorageData = async () => {
		const hasSoftToken = Boolean((await StorageService.getItemStorage('hasSoftToken')))
		const user = await StorageService.getItem('user')
		const isSoftToken = await StorageService.getItem('CLIENTTOKEN')

		setState(prevState => ({
			...prevState,
			usuarioNombre: 'Carlos',
			isSoftToken: isSoftToken,
			role: 'admin',
			hasSoftToken
		}))
	}

	const handleBackButtonPressAndroid = () => {
		setState(prevState => ({
			...prevState,
			modalVisible: true
		}))
	}


	const toggleModalVisible = () => {
		setState(prevState => ({
			...prevState,
			modalVisible: !prevState.modalVisible
		}))
	}

	const toggleModalVisibleSoftToken = () => {
		setState(prevState => ({
			...prevState,
			modalVisibleSoftToken: !prevState.modalVisibleSoftToken
		}))
	}

	const mostrarSoftToken = state.isSoftToken && !state.hasSoftToken

	const content = (
		<View>
			<ShadowContainer style={styles.headerContainer}>
				<View>
					<Icon
						size={30}
						name="person-circle-outline"
						family={Icon.IONICONS}
						style={styles.blue}
					/>
				</View>

				<View style={styles.headerOuterContainer}>
					<View style={styles.titleContainer}>
						<Text style={styles.titleFont}>{state.usuarioNombre}</Text>
					</View>
				</View>

			</ShadowContainer>
			<View style={{ margin: 15 }}>
				<View style={styles.menuLine}>
					{
						state.role !== USER_ROLES.ADMIN &&
						<MenuButton
							onPress={() => navigation.navigate('ConsolidatedPosition')}
							family={Icon.IONICONS}
							icon="ios-grid"
							text={strings.mainMenu.products}
						/>
					}
					{
						mostrarSoftToken &&
						<MenuButton
							onPress={() => navigation.navigate('EnrolamientoSoftToken')}
							// onPress={() => navigation.navigate('EnrolamientoListo')}
							family={Icon.IONICONS}
							icon="lock-closed"
							text={strings.mainMenu.softtoken}
						/>
					}
					{
						(state.role !== '0' && state.role !== USER_ROLES.ADMIN) &&
						<MenuButton
							onPress={() => navigation.navigate('PendingApprovals')}
							family={Icon.IONICONS}
							icon="ios-notifications"
							text={strings.mainMenu.autorizations}
						/>
					}
				</View>
			</View>
			<View>
			</View>
			{
				mostrarSoftToken &&
				<ModalComponent
					yesButtonAction={() => {
						toggleModalVisibleSoftToken()
						navigation.navigate('EnrolamientoSoftToken')
					}}
					isVisible={state.modalVisibleSoftToken}
					onClose={() => {
						toggleModalVisibleSoftToken()
					}}
					textModal={'¿Desea enrolarse al token digital?'}
				/>
			}
		</View>
	)

	const sideBarAndroid = (
		<View>
			<ScrollView style={{ backgroundColor: 'white', height: '100%' }}>
				{content}
			</ScrollView>
		</View>
	)

	return (
		(Platform.OS === 'ios') ? content : sideBarAndroid
	)


}

export default MainMenu
