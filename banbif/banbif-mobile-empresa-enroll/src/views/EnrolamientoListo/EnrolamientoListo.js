import React from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import styles from './Styles'
import { StorageService } from '../../services/storage'
import { USER_ROLES } from '../../utils/constants'
import { AuthService } from '../../services/auth'
import { SvgXml } from 'react-native-svg'
import { successIcon } from '../../utils/svg'
import LinearGradient from 'react-native-linear-gradient'

const EnrolamientoListo = ({ navigation }) => {

	const accept = async () => {

		const user = await StorageService.getItem('user')
		if (user.role === USER_ROLES.ADMIN) {
			// if is admin, logout
			await AuthService.doLogout()
			navigation.navigate('Login')
		} else {
			navigation.navigate('MainMenu')
		}
	}

	return (
		<View style={styles.container}>
			<SvgXml xml={successIcon}/>
			<Text style={styles.title}>
				¡Listo!
			</Text>
			<Text style={styles.description}>Ya te afiliaste al token digital.</Text>
			<Text style={styles.description}>Ahora puedes usar tu token digital</Text>
			<Text style={styles.description}>para confirmar operaciones.</Text>
			<View style={styles.container2}>
				<View style={styles.considerations}>
					<Text>Ten en cuenta:</Text>
					<View style={styles.row}>
						<View style={styles.bullet}></View>
						<Text>
							Puedes consultar tu token digital desde la pantalla de inicio, haciendo clic en el botón.
						</Text>
					</View>
				</View>
				<LinearGradient
					colors={['#AD96DC', '#20A6FF']}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 0 }}
					style={styles.linearGradient}
				>
					<TouchableHighlight
						underlayColor="none"
						onPress={() => {
							void accept()
						}}>
						<Text style={styles.buttonText}>
							Aceptar
						</Text>
					</TouchableHighlight>
				</LinearGradient>
			</View>
		</View>
	)
}


export default EnrolamientoListo
