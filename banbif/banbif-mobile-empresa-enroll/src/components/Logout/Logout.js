import React, { useEffect, useState } from 'react'
import { BackHandler, TouchableHighlight, View } from 'react-native'
import ModalComponent from '../ModalComponent'
import Icon from '../Icon'
import styles from './Styles'
import { AuthService } from '../../services/auth'
import { useNavigationState } from '@react-navigation/native';


const Logout = ({ navigation }) => {

	const [modalVisible, setModalVisible] = useState(false)
	const screenName = useNavigationState((state) => state.routes[state.index].name)

	const handleBackButtonPressAndroid = () => {
		setModalVisible(true)
	}

	useEffect(() => {
		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			screenName === 'MainMenu' ? handleBackButtonPressAndroid : () => {},
		);

		return () => backHandler.remove();
	}, [navigation, screenName])

	const toggleModalVisible = () => setModalVisible(prev => !prev)

	return (
		<TouchableHighlight
			style={{ marginRight: 15 }}
			onPress={toggleModalVisible}
		>
			<View style={styles.container}>
				<ModalComponent
					yesButtonAction={async () => {
						toggleModalVisible()
						await AuthService.doLogout()
						navigation.navigate('Login', { refreshToken: true })
					}}
					isVisible={modalVisible}
					onClose={toggleModalVisible}
					textModal="¿Estás seguro que deseas cerrar sesión?"
				/>
				<View>
					<Icon
						family={Icon.IONICONS}
						name="log-out-outline"
						size={35}
						style={styles.icon}/>
				</View>
			</View>
		</TouchableHighlight>
	)
}

export default Logout
