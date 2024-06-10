import React, { useEffect, useState } from 'react'

import {
	View,
	Text, TextInput,
	TouchableOpacity,
	Image,
	Platform,
	BackHandler,
	Linking,
	SafeAreaView
} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { CheckBox } from 'react-native-elements'
import Button from '../../components/Button'
import Icon from '../../components/Icon'
import images from '../../assets/images'
import strings from '../../assets/strings'
import styles from './Styles'
import colors from '../../assets/colors'
import { StorageService } from '../../services/storage'
import { AuthService } from '../../services/auth'
import ModalErrorComponent from '../../components/ModalErrorComponent/ModalErrorComponent'
import ModalErrorComponentUpdate from '../../components/ModalErrorComponent/ModalErrorComponentUpdate'
import Spinner from 'react-native-loading-spinner-overlay'
import DetectID from '../../modules/DetectID'
import { enviroment } from '../../utils/enviroments'
import { default as axios } from '../../services/api'
import JailMonkey from 'jail-monkey'
import Colors from '../../assets/colors'
import ModalComponent from '../../components/ModalComponent'
import { versionAnd, versionIOS } from '../../../version.json'
import CryptoJS from 'crypto-js'
import RNExitApp from 'react-native-exit-app'
import TimerViewComponent from '../TimerViewComponent'
import CommonMessageModal from '../../components/CommonMessageModal'
import { MODAL_TYPES } from '../../components/CommonMessageModal/CommonMessageModal'
import { SoftTokenService } from '../../services/softToken'
import deviceInfoApp from '../../utils/deviceInfo'
import { needsAppUpdate } from './AppVersionUtils'
import ReCaptchaV3 from '../../recaptcha'
import { useIsFocused } from '@react-navigation/native';
import {useAuth0} from 'react-native-auth0';
import LoginScreen from '../../../src2/modules/Auth/presentation/Login.screen'

const playstore = 'https://play.google.com/store/apps/details?id=com.banbifbancaempresasapp'
const appstore = 'https://apps.apple.com/us/app/banbif-empresas/id1270782715'

var maxIntentos = 0
var versionAppEmpresasIOS = []
var versionAppEmpresasAndroid = []
var currentVersionAnd = []
var currentVersionIOS = []

function ReloadToken({ onReloadToken }) {
	const isFocused = useIsFocused();
	const [intervalId, setIntervalId] = useState(null)

	useEffect(() => {
		if (isFocused && !intervalId && onReloadToken) {
			onReloadToken()
			const id = setInterval(onReloadToken, 100000) //refreshing token each 100 seconds because token last 120 seconds only
			setIntervalId(id)
		}
		if (!isFocused && intervalId) {
			clearInterval(intervalId)
			setIntervalId(null)
		}
	}, [isFocused, intervalId, onReloadToken])

	return null;
}

function OktaAuth() {
		const {authorize, clearSession} = useAuth0();

		const OktaPress = async() => {
			try {
				await authorize();
			} catch (e) {
				console.log(e);
			}
		}

		const OktaLogoutPRess = async () => {
			try {
				await clearSession();
			} catch (e) {
				console.log(e);
			}
		}

		return <>
		<Button
			color={colors.lightBlue}
			width={150}
			height={40}
			textButton="login Okta"
			action={async () => {
					OktaPress()
				}
			}
		/>
		<Button
			color={colors.lightBlue}
			width={150}
			height={40}
			textButton="logout Okta"
			action={async () => {
					OktaLogoutPRess()
				}
			}
		/>


	</>
}

export default class Login extends TimerViewComponent {
	constructor(props) {
		super(props)
		this.messageOk = this.messageOk.bind(this)
		this.state = {
			isConnected: null,
			avisoEntidad: false,
			avisoNombre: false,
			avisoContrasena: false,
			textEntidad: '',
			textNombre: '',
			textContrasena: '',
			textButtonLogin: strings.login.buttonLogin,
			textButtonSofttoken: strings.login.butonSofttoken,
			errorMessage: 'A',
			loggedInUser: null,
			userResponse: null,
			recordarMe: false,
			messages: [],
			root: [],
			messagesSesion: [],
			messagesUpdate: [],
			spinner: false,
			hasSoftToken: false,
			lastUsername: '',
			recapchaToken: '',
			showTimeoutModal: false,
			// didLogin: false,
			didLogin: true,
			enableAppRecaptcha: false,
			recaptchaDomain: '',
			recaptchaPublicKey: ''
		}
		this.captchaRef = null
		this.focusListener = null

		this.buttonAtributes = [
			{

				style: {

					flex: 1,
					elevation: 8,
					backgroundColor: Colors.lightBlue,
					width: '50%',

					borderRadius: 10,
					justifyContent: 'center',
					alignItems: 'center',
					margin: 5

				},
				text: {
					title: 'Iniciar de todos modos'
				},
				onPress: {
					onPress: async () => {
						this.doSesion()
					}
				}

			},
			{
				style: {

					flex: 1,
					elevation: 8,
					backgroundColor: Colors.customGrey,
					width: '50%',

					justifyContent: 'center',
					alignItems: 'center',
					borderRadius: 10,
					margin: 5
				},
				text: {
					title: 'Cancelar'
				},
				onPress: {
					onPress: async () => {
						this.closeDialogSesion()
					}
				}
			}
		]
	}

	async componentDidUpdate(prevProps, prevState) {
		const isTimeout = this.props.route?.params?.isTimeout
		if (this.state.showTimeoutModal !== isTimeout && isTimeout) {
			this.setState({ showTimeoutModal: true })
		}
	}

	async componentDidMount() {
		

		this._unsubscribe = this.props.navigation.addListener('focus', async () => {
			//**
			const didLogin = Boolean(await StorageService.getItemStorage("didLogin"))
			this.setState({ didLogin })

			if (false) {
				this.setState({
					messages: [
						{
							title:'¡Hola!',
							mensaje: 'Actualizamos el App para mayor seguridad.\nEn caso el botón "Token Digital" esté deshabilitado, inicia sesión para activarlo.\nGracias por tu colaboración',
							status:'warning',
						}
					]
				})
			}

			const statusRecordar = await StorageService.getItemNotBase64('recordarMe')

			if (statusRecordar) {
				var textEntidadNumeric = await StorageService.getItemNotBase64('textEntidad')
				const textEntidad = textEntidadNumeric.toString()
				const textNombre = await StorageService.getItemNotBase64('textNombre')
				this.setState({ recordarMe: true, textEntidad, textNombre })
			}

			const hasSoftToken = Boolean((await StorageService.getItemStorage('hasSoftToken')))

			try {
				if (hasSoftToken) {
					await DetectID.init(enviroment.detectIDUrl)
				}
			} catch ( e ) {
			}

			this.setState({ hasSoftToken })
		})

		if (Platform.OS !== 'ios') {
			SplashScreen.hide()
		}
	}

	handleBackButtonPressAndroid = () => {
		if (Platform.OS != 'ios') {
			BackHandler.exitApp()
		} else {
			BackHandler.exitApp()
		}
	}

	async onPressOkta() {
		console.log('holaaa')
		const {authorize} = useAuth0();
        try {
            await authorize();
        } catch (e) {
            console.log(e);
        }
    };

	async componentWillUnmount() {
		this._unsubscribe()
	}

	async getConfigurationInitial() {

		try {
			const response = await axios.get(`${enviroment.clientInformationInitial}/api-empresas-mobile-conf/v1/client-information`)

			const configuration = response.data
			await this.configuracion(configuration)
			// this.state.messages = []
			maxIntentos = enviroment.numeroIntentosLogin
			versionAppEmpresasIOS = enviroment.versionAppEmpresasIOS?.split('.').map(Number) // api version
			versionAppEmpresasAndroid = enviroment.versionAppEmpresasAndroid?.split('.').map(Number) // api version
			currentVersionAnd = versionAnd?.split('.').map(Number) // installed version
			currentVersionIOS = versionIOS?.split('.').map(Number) // installed version
			this.setState({enableAppRecaptcha: enviroment.enableAppRecaptcha})
			this.setState({recaptchaDomain: enviroment.recaptchaDomain})
			this.setState({recaptchaPublicKey: enviroment.recaptchaPublicKey})

			if (Platform.OS === 'ios' ? needsAppUpdate(currentVersionIOS, versionAppEmpresasIOS) : needsAppUpdate(currentVersionAnd, versionAppEmpresasAndroid))
				this.showAlertForUpdate()
		} catch ( err ) {
			console.log("Error", err)
			this.setState({
				messages: [
					{
						mensaje:
						strings.messages.error
					}
				]
			})
		}
	}

	async configuracion(configuration) {

		enviroment.baseURL = configuration.clientBaseUrl
		enviroment.ssoUrl = configuration.clientSsoUrl
		enviroment.client_id = configuration.clientId
		enviroment.client_secret = configuration.clientSecret
		enviroment.maximumApprove = configuration.maximumApproveApprovalsSlopes
		enviroment.whiteMarchProduction = configuration.whiteMarchProduction
		enviroment.numeroIntentosLogin = configuration.numeroIntentosLogin
		enviroment.versionAppEmpresasAndroid = configuration.versionAppEmpresasAndroid
		enviroment.versionAppEmpresasIOS = configuration.versionAppEmpresasIOS
		enviroment.templateEmailInicioSesion = configuration.templateEmailInicioSesion
		axios.defaults.baseURL = enviroment.baseURL

		// enviroment.detectIDUrl = 'http://bif3sms10:8080/detect/public/registration/mobileServices.htm?code='
		enviroment.detectIDUrl = configuration.clientDetectIdUrl

		enviroment.key = configuration.encriptKey
		enviroment.iv = configuration.encriptIv
		enviroment.siteKeyCaptcha = configuration.siteKeyCaptcha
		enviroment.emailBanbif = configuration.emailBanbif
		enviroment.shaDomain = configuration.certificateShaDomain

		enviroment.enableAppRecaptcha = configuration.enableAppRecaptcha
		enviroment.recaptchaDomain = configuration.recaptchaDomain
		enviroment.recaptchaPublicKey = configuration.recaptchaPublicKey
	}


	async handleLogin() {
		const { textEntidad, textNombre, textContrasena } = this.state
		await StorageService.setItem('entidad', textEntidad.trim())
		await StorageService.setItem('nombreLogin', textNombre.trim())
		this.setState({ avisoEntidad: false, avisoContrasena: false, avisoNombre: false })
		await this.setState({ spinner: true })
		try {
			await AuthService.getInitial()
			var encrypted = await AuthService.encrypt(textContrasena)
			this.doLogin(encrypted.toString())
		} catch ( e ) {
			await this.setState({ spinner: false })
		}
	}

	async doLogin(string) {

		const { textEntidad, textNombre, recapchaToken, enableAppRecaptcha } = this.state

		try {

			var enutf = string.toString(CryptoJS.enc.Utf8)
			const saveSessionResponse = await AuthService.saveSession(textNombre, enutf, textEntidad, recapchaToken, enableAppRecaptcha)

			await this.guardarRecordarMe()
			BackHandler.removeEventListener()
			this.setState({ textContrasena: '' })
			this.setState({ lastUsername: '' })
			
			const { status, codeActivation } = saveSessionResponse
			if (status) {
				const hasCodeActivation = String(codeActivation).trim().length > 0
				if (hasCodeActivation && codeActivation) {
					await DetectID.removeAccount()
					const validarCodigoResp = await SoftTokenService.validarCodigo({code: codeActivation})
					if(!validarCodigoResp.status) {
						this.setState({
							messages: [
								{
									title:'¡Hubo un error!',
									mensaje: `No procesó enrolamiento silencioso ${validarCodigoResp.detectIdCodeResp}`,
									status:'error',
								}
							]
						})
						return
					}
				}
				await this.setState({ spinner: false })
				await StorageService.setItemStorage('didLogin', 'true')
				this.props.navigation.navigate('MainMenu')
			}

			
			//**

		} catch ( e ) {
			await this.setState({ spinner: false })
			this.handleMessages(e)
		}
	}

	async guardarRecordarMe() {
		if (this.state.recordarMe) {
			const { textEntidad, textNombre } = this.state
			await StorageService.setItemNotBase64('textEntidad', textEntidad.trim())
			await StorageService.setItemNotBase64('textNombre', textNombre.trim())
			await StorageService.setItemNotBase64('recordarMe', 'true')
		} else {
			this.setState({ textNombre: '', textContrasena: '', textEntidad: '' })
			const oldStatusRecordar = await StorageService.getItemNotBase64('recordarMe')

			if (oldStatusRecordar) {
				await StorageService.removeItem('textEntidad')
				await StorageService.removeItem('textNombre')
				await StorageService.removeItem('recordarMe')
			}
		}
	}

	async runSSLPinningLogin() {
		await AuthService.runSSLPinning()
		if (enviroment.pinninOk) {
			await this.validateFields()
		}
	}

	async validateFields() {
		const { textEntidad, textNombre, textContrasena } = this.state
		if (!textEntidad) {
			this.setState({ avisoEntidad: true })
			await this.setState({
				messages: [
					{
						mensaje: '¡Ingrese los campos obligatorios!'
					}
				]
			})

		} else {
			this.setState({ avisoEntidad: false })
		}
		if (!textNombre) {
			this.setState({ avisoNombre: true })
			await this.setState({
				messages: [
					{
						mensaje: '¡Ingrese los campos obligatorios!'
					}
				]
			})

		} else {
			this.setState({ avisoNombre: false })
		}
		if (!textContrasena) {
			this.setState({ avisoContrasena: true })
			await this.setState({
				messages: [
					{
						mensaje: '¡Ingrese los campos obligatorios!'
					}
				]
			})

		} else {

			if (textContrasena.length > 10) {
				this.setState({ avisoContrasena: true })
				await this.setState({
					messages: [
						{
							mensaje: 'Longitud de contraseña inválida'
						}
					]
				})

			} else {
				if (textEntidad && textNombre && textContrasena) {
					this.setState({ avisoEntidad: false, avisoContrasena: false, avisoNombre: false })
					this.handleLogin()
				}
			}
		}
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


	async handleMessages(err) {

		const { textEntidad, textNombre } = this.state
		if (err && err.message && err.message.indexOf('401') > -1) {
			try {

				this.setState({ lastUsername: textNombre })
				this.setState({
					messages: [
						{
							mensaje: '¡Nombre de usuario o contraseña inválidos!'
						}
					]
				})


			} catch ( err ) {
				try {
					if (err.response.data.meta.mensajes[0].mensaje == 'El usuario se encuentra suspendido') {
						this.setState({
							messages: [
								{
									mensaje: 'Usuario Suspendido. Comunícate con el administrador de BIFnet Empresarial de tu Empresa'
								}
							]
						})

					} else {

						this.setState({
							messages: [
								{
									mensaje: '¡Nombre de usuario o contraseña inválidos!'
								}
							]
						})

					}

				} catch ( err ) {

					this.setState({
						messages: [
							{
								mensaje: '¡Nombre de usuario o contraseña inválidos!'
							}
						]
					})
				}
			}
		} else if (this.hasMessage(err)) {
			try {
				if (err.response.data.meta.mensajes[0].mensaje.includes('sesión')) {
					this.setState({
						messagesSesion: [
							{
								mensaje: 'Ya existe una sesión abierta en otro dispositivo. ¿Desea continuar en este dispositivo?'
							}
						]
					})
				} else if (err.response.data.meta.mensajes[0].mensaje == '¡Registro no encontrado!') {
					this.setState({
						messages: [
							{
								mensaje: '¡Nombre de usuario o contraseña inválidos!'
							}
						]
					})
				} else if (err.response.data.meta.mensajes[0].mensaje?.includes('inválido')) {
					this.setState({
						messages: [
							{
								title: err.response.data.meta.mensajes[0].title,
								mensaje: 'Contraseña incorrecta',
								mensaje1: err.response.data.meta.mensajes[0]?.mensaje1,
							}
						]
					})
				} else {
					this.setState({ messages: err.response.data.meta.mensajes })
				}
			} catch ( err ) {
				this.setState({ messages: err.response.data.meta.mensajes })
			}
		} else {
			this.setState({
				messages: [
					{
						mensaje:
						strings.messages.error
					}
				]
			})
		}
	}

	hasError(err) {
		return err && err.status != 200 && err.status != 201
	}

	closeDialogSesion() {
		let _messages = this.state.messagesSesion
		_messages.pop()
		this.setState({ messagesSesion: _messages })
	}

	doSesion = async event => {

		try {
			this.closeDialogSesion()
			await AuthService.deleteSesionUsuarioLogin()
			await this.guardarRecordarMe()
			this.props.navigation.navigate('MainMenu')
			this.setState({ textContrasena: '' })
		} catch ( e ) {
			this.setState({
				messages: [
					{
						mensaje:
						strings.messages.error
					}
				]
			})
		}
	}

	messageOk() {
		let _messages = this.state.messages
		_messages.pop()
		if (this.state.enableAppRecaptcha)
			this.captchaForm.refreshToken()
		this.setState({ messages: _messages })
	}

	messageOkUpdate() {
		let _messages = this.state.messagesUpdate
		_messages.pop()
		if (Platform.OS != 'ios') {
			Linking.openURL(playstore)
		} else {
			Linking.openURL(appstore)
		}
	}

	async isRooted() {
		if (JailMonkey.isJailBroken()) {
			this.setState({
				root: [
					{
						mensaje: 'No es posible ejecutar la App en este equipo rooteado'
					}
				]
			})
		}
	}

	async showAlertForUpdate() {
		this.setState({
			messagesUpdate: [
				{
					mensaje: 'Hay una actualización disponible, por favor proceda a instalarla para continuar.'
				}
			]
		})
	}

	onMessage = event => {
		if (event && event.nativeEvent.data) {
			if (['cancel', 'error', 'expired'].includes(event.nativeEvent.data)) {
				if (this.state.enableAppRecaptcha)
					this.captchaForm.hide()
				return
			} else {
				setTimeout(() => {
					if (this.state.enableAppRecaptcha)
						this.captchaForm.hide()
					this.handleLogin()
				}, 1500)
			}
		}
	}

	messageOkRoot() {

		if (Platform.OS != 'ios') {
			BackHandler.exitApp()
		} else {
			RNExitApp.exitApp()
		}
	}

	// async adminMessage() {
	// const { hasSoftToken } = this.state
	// const user = await StorageService.getItem('user')
	// return null
	// if (hasSoftToken && user?.role === USER_ROLES.ADMIN) {
	// 	return (
	// 		<CommonMessageModal
	// 			text={'Ya te encuentras enrolado al token digital.'}
	// 			visible
	// 			// callback={() => {
	// 			// 	this.props.navigation.setParams({ isTimeout: false })
	// 			// 	this.setState({ showTimeoutModal: false })
	// 			// }
	// 			// }
	// 			status={MODAL_TYPES.INFORMATIVE}
	// 		/>
	// 	)
	// } else return null
	// }

	render() {

		const { navigate } = this.props.navigation
		const { hasSoftToken, enableAppRecaptcha, recaptchaPublicKey, recaptchaDomain } = this.state

		let messageViewsUpdate = this.state.messagesUpdate.map((message, i) => {
			return (
				<ModalErrorComponentUpdate
					key={message.mensaje}
					TextError={message.mensaje}
					Visibility={
						this.state.messagesUpdate.length > 0 &&
						i == this.state.messagesUpdate.length - 1
					}
					Callback={this.messageOkUpdate.bind(this)}
				/>
			)
		})

		let messageViews = this.state.messages.map((message, i) => {
			return (
				<CommonMessageModal
					key={message.mensaje}
					title={message?.title}
					text={message.mensaje}
					text1={message?.mensaje1}
					visible={this.state.messages.length > 0 && i == this.state.messages.length - 1}
					buttonText="Cerrar"
					callback={this.messageOk}
					status={message?.status || MODAL_TYPES.ERROR}
				/>
			)
		})
		let messageRoot = this.state.root.map((message, i) => {
			return (
				<ModalErrorComponent
					key={message.mensaje}
					TextError={message.mensaje}
					Visibility={
						this.state.root.length > 0 &&
						i == this.state.root.length - 1
					}
					Callback={this.messageOkRoot.bind(this)}
				/>
			)
		})
		let messageRootSesion = this.state.messagesSesion.map((message, i) => {
			return (
				<ModalComponent
					key={message.mensaje}
					buttons={this.buttonAtributes}
					isVisible={this.state.messagesSesion.length > 0 &&
						i == this.state.messagesSesion.length - 1}
					onClose={() => {
						this.closeDialogSesion.bind(this)
					}}
					// iconModal={{
					// 	family: Icon.IONICONS,
					// 	name: 'ios-close-circle',
					// 	size: 90,
					// 	color: Colors.lightBlue,
					// }}

					textModal={message.mensaje}
				/>
			)
		})

		return (
			<SafeAreaView>
				{
					enableAppRecaptcha ?
						<ReCaptchaV3
							ref={ref => (this.captchaForm = ref)}
							captchaDomain={recaptchaDomain}
							siteKey={recaptchaPublicKey}
							onReceiveToken={(key) => {
								console.log('refresh token')
								this.setState({ recapchaToken: key })
							}}
						/> : null
				}


				{ enableAppRecaptcha ? <ReloadToken onReloadToken={this.captchaForm?.refreshToken}/> : null }
				{
					this.state.showTimeoutModal &&
					<CommonMessageModal
						title={'Su sesión ha expirado'}
						visible
						callback={() => {
							this.props.navigation.setParams({ isTimeout: false })
							this.setState({ showTimeoutModal: false })
							if (enableAppRecaptcha)
								this.captchaForm.refreshToken()
						}
						}
						status={MODAL_TYPES.WARNING}
					/>
				}


				<View style={styles.LoginContainer}>
					<Spinner
						visible={this.state.spinner}
						textContent={'Cargando...'}
						textStyle={{ color: '#FFF' }}
					/>

					<View style={styles.LogoContainer}>
						<Image style={{ width: 139, height: 63 }} source={images.logoTextoLogin}></Image>
					</View>
					<View style={styles.ContentContainer}>
						<View style={styles.IconAndTextInputContainer}>
							<Icon
								size={30}
								name="ios-briefcase"
								family={Icon.IONICONS}
								color={this.state.avisoEntidad == false ? colors.lightBlue : 'red'}
							/>

							<TextInput
								style={[styles.TextInputStyle, { borderLeftColor: this.state.avisoEntidad == false ? colors.lightBlue : 'red' }]}
								placeholder={strings.login.inputEntidadPlaceholder}
								maxLength={10}
								onChangeText={textEntidad => this.setState({ textEntidad: textEntidad.trim(), avisoEntidad: false })}
								value={this.state.textEntidad}
								placeholderTextColor={colors.lightGrey}
							/>
						</View>
						<View style={styles.IconAndTextInputContainer}>
							<Icon
								size={30}
								name="person-circle-outline"
								family={Icon.IONICONS}
								color={this.state.avisoNombre == false ? colors.lightBlue : 'red'}
							/>
							<TextInput
								style={[styles.TextInputStyle, { borderLeftColor: this.state.avisoNombre == false ? colors.lightBlue : 'red' }]}
								placeholder={strings.login.inputNombrePlaceholder}
								maxLength={10}
								onChangeText={textNombre => this.setState({ textNombre: textNombre.trim(), avisoNombre: false })}
								value={this.state.textNombre}
								placeholderTextColor={colors.lightGrey}
							/>

						</View>
						<View style={styles.IconAndTextInputContainer}>
							<Icon
								style={{ transform: [{ rotate: '180deg' }] }}
								size={30}
								name="ios-key"
								family={Icon.IONICONS}
								color={this.state.avisoContrasena == false ? colors.lightBlue : 'red'}
							/>

							<TextInput
								style={[styles.TextInputStyle, { borderLeftColor: this.state.avisoContrasena == false ? colors.lightBlue : 'red' }]}
								placeholder={strings.login.inputContrasenaPlaceholder}
								onChangeText={textContrasena => {
									this.setState({ textContrasena, avisoContrasena: false })
								}}
								value={this.state.textContrasena}
								maxLength={10}
								placeholderTextColor={colors.lightGrey}
								secureTextEntry
								keyboardType="numeric"
								contextMenuHidden={true}
							/>
						</View>
						<View style={styles.PaddingTopView}>
							<Button
								color={colors.lightBlue}
								width={150}
								height={40}
								textButton={strings.login.buttonLogin}
								action={async () =>{
									await this.runSSLPinningLogin()
								}
								}
							/>
							<LoginScreen />

						</View>
						<View>
							<CheckBox
								title={strings.login.checkBoxText}
								textStyle={styles.TextCheckBoxStyle}
								center
								checked={this.state.recordarMe}
								onPress={async () =>
									await this.setState({ recordarMe: !this.state.recordarMe })
								}
								uncheckedColor={colors.darkGrey}
								containerStyle={{
									backgroundColor: colors.white,
									borderColor: colors.white
								}}
							/>
						</View>
					</View>
					<View style={{ flex:1 }}>
					{hasSoftToken &&
						<View style={{ alignSelf: 'center', paddingTop: '10%' }}>
							<View style={[this.state.didLogin ? styles.ContainerSofttoken: styles.ContainerSofttokenDisabled]}>
								<TouchableOpacity
									disabled={!this.state.didLogin}
									onPress={() => {
										this.goToPosicion(navigate)
									}}>
									<View style={styles.ViewSofttoken}>
										<View>
											<Icon
												family={Icon.IONICONS}
												name={'lock-closed'}
												size={27}
												style={{ color: colors.white }}
											/>
										</View>
										<View>
											<Text style={styles.TextSofttoken}>
												{strings.login.butonSofttoken}
											</Text>
										</View>
									</View>
								</TouchableOpacity>
							</View>
						</View>
					}
					</View>

					{messageViews}
					{messageRoot}
					{messageRootSesion}
					{messageViewsUpdate}
				</View>
			</SafeAreaView>
		)
	}

	goToPosicion(navigate) {
		BackHandler.removeEventListener('hardwareBackPress')
		navigate('SoftTokenLogin', { isConnected: true })
	}


	async UNSAFE_componentWillMount() {
		await this.getConfigurationInitial()
	}

}
