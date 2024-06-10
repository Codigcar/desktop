import React from 'react'
import {
	View,
	Text,
	TextInput,
	ActivityIndicator,
	Platform,
	PermissionsAndroid,
	BackHandler,
	TouchableHighlight
} from 'react-native'
import { Toast } from 'native-base'
import Button from '../../components/Button'
import Icon from '../../components/Icon'
import styles from './Styles'
import colors from '../../assets/colors'
import { StorageService } from '../../services/storage'
import ModalHandleError from '../../components/ModalHandleError'
import { SpinnerSize } from '../../utils/spinnerSize'
import { SoftTokenService } from '../../services/softToken'
import strings from '../../assets/strings'
import ModalErrorComponent from '../../components/ModalErrorComponent/ModalErrorComponent'
import LinearGradient from 'react-native-linear-gradient'
import Spinner from 'react-native-loading-spinner-overlay'
import DetectID from '../../modules/DetectID'
import { enviroment } from '../../utils/enviroments'

export default class EnrolamientoSoftToken extends ModalHandleError {
	constructor(props) {
		super(props)
		this.onInputChange = this.onInputChange.bind(this)
		this.state = Object.assign(this.state, {
			email: '',
			redirect: true,
			size: 0,
			loading: false,
			textError: '',
			showModalError: false,
			code: '',
		})
	}

	async UNSAFE_componentWillMount() {
		const email = (await StorageService.getItem('user')).email
		this.enviarEmail()
		this.setState({ email })
	}


	friendlyMessage(err) {
		err.response.data.meta.mensajes.forEach(item => {

			if (strings.messages.enrolamientoSoftToken[item.codigo]) {
				item.mensaje = strings.messages.enrolamientoSoftToken[item.codigo]
			}


		})
		return err
	}

	shouldRedirectToActivationCode(err) {
		var redirectToActivationCode = false
		err.response.data.meta.mensajes.forEach(item => {
			if (item.codigo == strings.messages.enrolamientoSoftToken.codes.softTokenProcessing) {

				redirectToActivationCode = true
			}
		})
		return redirectToActivationCode
	}

	async enviarEmail() {
		//**
		await this.setState({ loading: true })
		try {
			await SoftTokenService.enviarCodigoEmail()
		} catch ( err ) {
			if (this.hasMessage(err)) {
				if (this.shouldRedirectToActivationCode(err)) {
					// this.props.navigation.navigate('EnrolamientoCodigoActivacion');
				} else {
					let erro = this.friendlyMessage(err)
					this.handleMessages(erro)
				}
			} else {
				await this.setState({ textError: 'DNI o correo electrónico no encontrado', showModalError: true })
			}
		}
		await this.setState({ loading: false })
	}

	hasMessage(err) {
		return (
			err &&
			err.response &&
			err.response.data &&
			err.response.data.meta &&
			err.response.data.meta.mensajes &&
			err.response.data.meta.mensajes.length > 0
		)
	}

	onInputChange = (value) => {
		this.setState({ code: value })
	}

	async validarCodigo() {
		if (this.state.code === '') return
		const { navigation } = this.props

		await this.setState({ loading: true, size: SpinnerSize.get() })

		try {
			const validateCodeResp = await SoftTokenService.validarCodigo({ code: this.state.code })
			await this.setState({ loading: false })

			if(!validateCodeResp.status) {
				navigation.navigate('EnrolamientoErro', { mensaje: `${validateCodeResp.message} (${validateCodeResp.detectIdCodeResp})` })
				return
			}
			navigation.navigate('EnrolamientoListo')
		} catch ( e ) {
			this.setState({ loading: false, size: 0 })
			navigation.navigate('EnrolamientoErro', { mensaje: `${strings.messages.error} (0)` })
		}
	}

	async reenviarCodigo() {
		await this.setState({ loading: true })
		try {
			await SoftTokenService.enviarCodigoEmail()
			Toast.show({
				title: '¡Código reenviado!',
				buttonText: 'Ok'
			})
		} catch ( err ) {
			let erro = this.friendlyMessage(err)
			this.handleMessages(erro)
		}
		await this.setState({ loading: false, size: 0 })
	}

	render() {
		const { email } = this.state
		return (
			<View style={styles.container}>


				<Spinner
					visible={this.state.loading}
					textContent={'Cargando...'}
					textStyle={{ color: '#FFF' }}
				/>

				{this.getModals()}

				<Text style={styles.title}>
					Te hemos enviado un código
				</Text>
				<Text style={styles.title}>
					de activación
				</Text>
				<Text style={styles.description}>
					Revisa tu buzón de correo electrónico {email}
				</Text>

				<View style={styles.IconAndTextInputContainer}>
					<TextInput
						style={styles.TextInputStyle}
						value={this.state.code}
						onChangeText={this.onInputChange}
						placeholderTextColor={'#C4C4C4'}
						placeholder={'Escribir código'}
						// editable={false}
					/>
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
							this.validarCodigo()
						}}>
						<Text style={styles.buttonText}>
							Validar
						</Text>
					</TouchableHighlight>
				</LinearGradient>

				<TouchableHighlight
					underlayColor="none"
					onPress={() => {
						this.reenviarCodigo()
					}}>
					<Text style={styles.buttonTextCodigo}>
						Reenviar código de activación
					</Text>
				</TouchableHighlight>

				<View style={styles.considerations}>
					<Text>Ten en cuenta:</Text>
					<View style={styles.row}>
						<View style={styles.bullet}></View>
						<Text>
							Si eres un usuario administrador y no es tu correo electrónico, comunícate con la Banca Telefónica
							Empresas: Lima (01) 625-3333 Provincias 0-801-0-0457.
						</Text>
					</View>
					<View style={styles.row}>
						<View style={styles.bullet}></View>
						<Text>
							Si eres un usuario supervisor o ambos y no es tu correo electrónico, comunícate con un usuario
							administrador de tu empresa.
						</Text>
					</View>
				</View>

				{/*<ActivityIndicator*/}
				{/*	style={{ paddingTop: this.state.loading ? 20 : 0, paddingBottom: this.state.loading ? 40 : 0, }}*/}
				{/*	animating={this.state.loading}*/}
				{/*	size={Platform.OS === 'ios' ? 'small' : this.state.size}*/}
				{/*	color={colors.lightBlue}*/}
				{/*/>*/}

				<ModalErrorComponent
					TextError={this.state.textError}
					Visibility={this.state.showModalError}
					Callback={
						() => {
							this.setState({ showModalError: false, loading: false })
						}
					}
				/>
			</View>
		)
	}
}
