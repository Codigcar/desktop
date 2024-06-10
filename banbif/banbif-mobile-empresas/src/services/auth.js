import axios from 'axios'
import { enviroment } from '../utils/enviroments'
import * as qs from 'querystring'
import { StorageService } from './storage'
import { default as jwtDecode } from 'jwt-decode'
import { Platform } from 'react-native'
import { ErrorStateService } from './errorState'
import { navigate } from './navigation'
import CryptoJS from 'crypto-js'
import { MODAL_TYPES } from '../components/CommonMessageModal/CommonMessageModal'
import { USER_ROLES } from '../utils/constants'
import DeviceInfo from 'react-native-device-info'
import deviceInfoApp from '../utils/deviceInfo'
import { SoftTokenService } from './softToken'


class Auth {

	async getInitial() {

		await this.removeItens()

		const payload = qs.stringify({
			client_id: enviroment.client_id,
			client_secret: enviroment.client_secret,
			grant_type: 'client_credentials'
		})

		console.log('obtener token payload', payload)
		const response = (await axios.post(
			`${enviroment.ssoUrl}/auth/realms/${enviroment.contextUrl}/protocol/openid-connect/token`,
			payload,
			{
				timeout: 30000,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}
		))
		const { access_token } = response.data
		await StorageService.setItem('access_token_conf', access_token)
	}

	async encrypt(data) {
		var key = CryptoJS.enc.Latin1.parse(enviroment.key)
		var iv = CryptoJS.enc.Latin1.parse(enviroment.iv)
		var encrypted = CryptoJS.AES.encrypt(
			data,
			key,
			{
				iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding
			})
		return encrypted
	}

	async getObject(username, password, textEntidad, recapchaToken, enableAppRecaptcha) {
		if(enableAppRecaptcha) {
			const hasSoftToken = Boolean((await StorageService.getItemStorage('hasSoftToken')))

			const payloadSessionUsuario = {
				cliente: {
					entidad: {
						nombre: textEntidad,
						usuarios: [
							{
								nombre: username,
								contrasenia: password,
								softTokenHabilitado: hasSoftToken
							}
						]
					}
				},
				ipDispositivo: await DeviceInfo.getIpAddress(),
				sistemaOperativoDispositivo: Platform.OS + ' ' + DeviceInfo.getSystemVersion(),
				nombreDispositivo: DeviceInfo.getModel(),
				recaptcha: {respuesta: recapchaToken}
			}
			return payloadSessionUsuario
		}
		const hasSoftToken = Boolean((await StorageService.getItemStorage('hasSoftToken')))
		const payloadSessionUsuario = {
			cliente: {
				entidad: {
					nombre: textEntidad,
					usuarios: [
						{
							nombre: username,
							contrasenia: password,
							softTokenHabilitado: hasSoftToken
						}
					]
				}
			},
			ipDispositivo: await DeviceInfo.getIpAddress(),
			sistemaOperativoDispositivo: Platform.OS + ' ' + DeviceInfo.getSystemVersion(),
			nombreDispositivo: DeviceInfo.getModel(),
		}
		return payloadSessionUsuario
	}

	async saveSession(username, password, textEntidad, recapchaToken, enableAppRecaptcha) {
	console.log("🚀 -------------------------------------------------------------------------🚀")
	console.log("🚀 ~ file: auth.js:58 ~ Auth ~ saveSession ~ recapchaToken:", recapchaToken)
	console.log("🚀 -------------------------------------------------------------------------🚀")

		try {
			const access_token_conf = await StorageService.getItem('access_token_conf')
			// const hasSoftToken = Boolean((await StorageService.getItemStorage('hasSoftToken')))

			// const payloadSessionUsuario = {
			// 	cliente: {
			// 		entidad: {
			// 			nombre: textEntidad,
			// 			usuarios: [
			// 				{
			// 					nombre: username,
			// 					contrasenia: password,
			// 					softTokenHabilitado: hasSoftToken
			// 				}
			// 			]
			// 		}
			// 	},
			// 	ipDispositivo: await DeviceInfo.getIpAddress(),
			// 	sistemaOperativoDispositivo: Platform.OS + ' ' + DeviceInfo.getSystemVersion(),
			// 	nombreDispositivo: DeviceInfo.getModel(),
			// 	recaptcha: {respuesta: recapchaToken}
			// }
			const payloadSessionUsuario = await this.getObject(username, password, textEntidad, recapchaToken, enableAppRecaptcha)

			// const recaptcha = {respuesta: recapchaToken}

			// const newPayload = enviroment.enableAppRecaptcha ? {...payloadSessionUsuario, recaptcha} : payloadSessionUsuario

			const responseSessionUsuario = (await axios.post(
				`${enviroment.baseURL}/api-banca-movil-empresas/v1/seguridadEmpresas/iniciar/sesion/usuario`,
				{ sesionUsuario: payloadSessionUsuario },
				{
					headers: {
						'Content-Type': 'application/json',
						'codigoCanal': 'APP_BANCA_MOVIL',
						'Authorization': `Bearer ${access_token_conf}`,
					}
				}
			))
			const { cliente, token } = responseSessionUsuario.data?.datos
			console.log('cliente!!!: ', cliente)

			const usuario = cliente.entidad.usuarios[0]
			// validar si respuesta del backend es -1 (error en login)

			// Validar intentos de login - Login fallido
			if (responseSessionUsuario.data?.metadata?.mensajes[0]?.codigo === '-1') {
				responseSessionUsuario.data.meta = { ...responseSessionUsuario.data?.metadata }
				throw responseSessionUsuario?.data
			}
			// De aca en adelante es Login ok, pero se debe validar algunas cosas
			const { tokenAcceso, tokenActualizacion } = token
			const decodedToken = jwtDecode(tokenAcceso)

			// Validaciones solo para Admins
			if (decodedToken?.role === USER_ROLES.ADMIN) {

				// Validar si tiene habilitado el token digital
				if (!usuario?.softTokenHabilitado) {
					throw 'No tienes habilitado el enrolamiento en el App Empresas'
				}

				// ya esta enrolado al token digital
				const hasSoftToken = Boolean(await StorageService.getItemStorage('hasSoftToken'))
				if (hasSoftToken && usuario?.softTokenHabilitado) {

					throw 'Ya te encuentras enrolado al token digital'
				}

			}


			// Login correcto

			await StorageService.setItem('username', username)
			await StorageService.setItem('password', password)


			const documento = usuario?.numeroDocumento
			const codigo = usuario?.codigo
			const softTokenHabilitado = usuario?.softTokenHabilitado

        	await StorageService.setItemStorage("flagGrupo", usuario.tipo === 'M' ? 'true' : 'false')
        	await StorageService.setItemStorage("usuarioTipo", usuario.tipo)
			
			const user = {
				nombreLogin: await StorageService.getItem('nombreLogin'),
				nombre: decodedToken.name,
				entidad: await StorageService.getItem('entidad'),
				entityId: decodedToken.entityId,
				userId: decodedToken.userId,
				role: decodedToken.role,
				email: decodedToken.email,
			}
			
			await StorageService.setItem('DNI', '')
			await StorageService.setItem('CLIENTTOKEN', 'false')
			await StorageService.setItem('token', tokenAcceso)
			await StorageService.setItem('refreshToken', tokenActualizacion)
			await StorageService.setItem('user', user)
			await StorageService.setItem('identificador', codigo)

			if (softTokenHabilitado) {
				await StorageService.setItem('CLIENTTOKEN', 'true')
			}

			if (documento) {
				await StorageService.setItem('DNI', documento)
			}

			return { status: true, codeActivation: usuario?.codigoActivacion }
		} catch ( error ) {
      		console.log('LOGIN ERROR', error, JSON.stringify(error?.response?.data))
			const codigo = error?.response?.data?.meta?.mensajes?.[0]?.codigo || error?.meta?.mensajes?.[0]?.codigo
			const serverErrorMessage = error?.response?.data?.meta?.mensajes?.[0]?.mensaje || error?.meta?.mensajes?.[0]?.mensaje
			let errorToShow = serverErrorMessage || 'No fue posible obtener los datos del cliente'
			let title = null
			let mensaje1 = null
			let status = MODAL_TYPES.ERROR

			/* Casos*/

			// Usuario/clave incorrectos
			if (serverErrorMessage?.toLowerCase()?.trim()?.includes('los datos de ingreso son incorrectos')) {
				const usuario = error?.datos?.cliente?.entidad?.usuarios?.[0]
				const numAttemps = usuario?.numeroIntentosBloqueo
				if (numAttemps?.length > 0) {
					const titleAttemp = (numAttemps === '1') ? 'Primer' : (numAttemps === '2' ? 'Segundo' : 'Tercer')
					errorToShow = '¡Nombre de usuario o contraseña inválidos!'
					title = `${titleAttemp} intento fallido`
					mensaje1 = numAttemps === '1' || numAttemps === '2' ?
						'Al tercer intento fallido se bloqueará \n' +
						'el usuario por 24 horas.' :
						'Su usuario ha sido bloqueado \n' +
						'por 24 horas.'
				}
			}

			// Admin con softTokenHabilitado -> false
			if (error === 'No tienes habilitado el enrolamiento en el App Empresas') {
				errorToShow = 'No tienes habilitado el token digital.'
				status = MODAL_TYPES.WARNING
			}

			// Admin ya enrolado - No puedo loguearse
			if (error === 'Ya te encuentras enrolado al token digital') {
				errorToShow = 'Ya te encuentras enrolado \n al token digital.'
				status = MODAL_TYPES.WARNING
			}

			// Error de token de recaptcha faltante
			if (serverErrorMessage.includes('faltante') && serverErrorMessage.includes('recaptcha.respuesta')) {
				errorToShow = 'Los datos de ingreso son incorrectos'
			}

			// No ha cambiado su clave por primera vez
			// Estado 5 debe cambiar la clave
			if (errorToShow === 'Debe cambiar la clave por primera vez') {
				errorToShow = 'Aún no has hecho tu cambio \n de contraseña, por favor ingresa a la Banca \n por Internet Empresas desde una laptop o \n computadora.'
				status = MODAL_TYPES.WARNING
			}

			if (errorToShow === 'Usted no cuenta con un correo configurado.'){
				status = MODAL_TYPES.WARNING
				if (codigo === '-3')
					errorToShow = errorToShow + ' Comunícate con la Banca Telefónica Empresas: Lima (01) 625-3333 Provincias 0-801-0-0457.'
				if (codigo === '-4')
					errorToShow = errorToShow + ' Solicítelo a su administrador'
			}

			let err = {
				response: {
					data: {
						meta: {
							mensajes: [
								{ mensaje: errorToShow, title, mensaje1, status }
							]
						}
					}
				}
			}
			throw err
		}
	}

	async doToken() {
		const username = await StorageService.getItem('username')
		const password = await StorageService.getItem('password')

		const payload = qs.stringify({
			grant_type: 'password',
			client_id: enviroment.client_id,
			client_secret: enviroment.client_secret,
			username,
			password
		})

		const response = (await axios.post(
			`${enviroment.ssoUrl}/auth/realms/${enviroment.contextUrl}/protocol/openid-connect/token`,
			payload,
			{
				timeout: 30000,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}
		))
		const { access_token, refresh_token } = response.data
		const decodedToken = jwtDecode(access_token)

		const user = {
			nombreLogin: await StorageService.getItem('nombreLogin'),
			nombre: decodedToken.name,
			entidad: await StorageService.getItem('entidad'),
			entityId: decodedToken.entityId,
			userId: decodedToken.userId,
			role: decodedToken.role,
			email: decodedToken.email
		}
		await StorageService.setItem('DNI', '')
		await StorageService.setItem('CLIENTTOKEN', 'false')
		await StorageService.setItem('token', access_token)
		await StorageService.setItem('refreshToken', refresh_token)
		await StorageService.setItem('user', user)

	}

	async doRefreshToken() {

		const apiLog = axios.create({
			baseURL: enviroment.ssoUrl,
			timeout: 90000
		})

		apiLog.interceptors.response.use(
			async (response) => {
				return response
			}, async (error) => {
				const { config } = error
				const originalRequest = config
				const refreshAttempted = await StorageService.getItem('refreshAttempted')
				if (error && error.response && [400].indexOf(error.response.status) > -1) {
					try {
						await this.doToken()
						return new Promise(async resolve => {
							const refreshToken = await StorageService.getItem('refreshToken')
							const payload = qs.stringify({
								grant_type: 'refresh_token',
								client_id: enviroment.client_id,
								client_secret: enviroment.client_secret,
								refresh_token: refreshToken,
							})
							originalRequest.data = payload
							resolve(apiLog(originalRequest))
						})
					} catch ( e ) {
						ErrorStateService.setIsLogout(true)
						await StorageService.removeItem('token')
						await StorageService.removeItem('refreshToken')
						await StorageService.removeItem('user')
						await StorageService.removeItem('DNI')
						navigate('IntermediateScreen')
					}
				} else {
					return Promise.reject(error)
				}
			})

		const refreshToken = await StorageService.getItem('refreshToken')
		const response = (await apiLog.post(
			`/auth/realms/${enviroment.contextUrl}/protocol/openid-connect/token`,
			qs.stringify({
				grant_type: 'refresh_token',
				client_id: enviroment.client_id,
				client_secret: enviroment.client_secret,
				refresh_token: refreshToken,
			}),
			{
				timeout: 30000,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}
		))

		const { access_token, refresh_token } = response.data
		const decodedToken = jwtDecode(access_token)

		const user = {
			nombreLogin: await StorageService.getItem('nombreLogin'),
			nombre: decodedToken.name,
			entidad: await StorageService.getItem('entidad'),
			entityId: decodedToken.entityId,
			userId: decodedToken.userId,
			role: decodedToken.role,
			email: decodedToken.email
		}
		await StorageService.setItem('token', access_token)
		await StorageService.setItem('refreshToken', refresh_token)
		await StorageService.setItem('user', user)
	}

	async doLogout() {

		// await AuthService.runSSLPinning()
		// var isSessionActive = await this.checkSesionUser()
		// if (isSessionActive == 0) {
		// } else {
		// 	this.deleteSesionUsuario()
		// }
		// const refreshToken = await StorageService.getItem('refreshToken')
		// const token = await StorageService.getItem('token')
		// await this.removeItens()
	}

	async removeItens() {
		await StorageService.removeItem('token')
		await StorageService.removeItem('refreshToken')
		await StorageService.removeItem('user')
		await StorageService.removeItem('CLIENTTOKEN')
		await StorageService.removeItem('user')
		await StorageService.removeItem('refreshAttempted')
	}

	async runSSLPinning() {
		try {
			if (enviroment.shaDomain === '') {
				return
			}
			// const result = await isSSLValid({
			// 	url: enviroment.clientInformationInitial,
			// 	hashes: [enviroment.shaDomain],
			// 	domainNames: [enviroment.domainName],
			// })
			const result = true
			enviroment.pinninOk = result
			return result
		} catch ( e ) {
			console.error('Error from ssl pinnig', e)
			enviroment.pinninOk = false
			throw e
		}
	}

	async deleteSesionUsuarioLogin() {
		const token = await StorageService.getItem('token')
		const user = await StorageService.getItem('user')
		const nombreUsuario = qs.stringify({ 'nombreLogin': user.nombreLogin }, { indices: false })
		const newnombreUsuario = nombreUsuario.replace('nombreLogin=', '')
		await axios.delete(
			`${enviroment.baseURL}/api-banca-movil-empresas/v1/seguridadEmpresas/eliminar/sesiones/` + user.entidad + '/' + user.nombreLogin,
			{
				headers: {
					'nombreUsuario': newnombreUsuario,
					'entidad': user.entidad,
					'Authorization': `Bearer ${token}`,
					'tokenClient': token,
					'Content-Type': 'application/json; charset=UTF-8',
					'codigoCanal': 'APP_BANCA_MOVIL'
				}
			}
		)
	}

	async deleteSesionUsuario() {
		const apiLog = axios.create({

			baseURL: enviroment.baseURL,
			timeout: 90000,

			headers: {
				'codigoCanal': 'APP_BANCA_MOVIL'
			}
		})

		apiLog.interceptors.request.use(
			async (config) => {
				ErrorStateService.setIsLogout(false)

				const token = await StorageService.getItem('token')
				if (token) config.headers.Authorization = `Bearer ${token}`
				config.headers['Content-Type'] = 'application/json; charset=UTF-8'

				return config
			},
			async (error) => {
				ErrorStateService.setIsLogout(true)
				await StorageService.removeItem('token')
				await StorageService.removeItem('refreshToken')
				await StorageService.removeItem('user')
				await StorageService.removeItem('DNI')
				navigate('IntermediateScreen')
			}
		)

		apiLog.interceptors.response.use(
			async (response) => {
				return response
			}, async (error) => {
				const { config } = error
				const originalRequest = config

				const refreshAttempted = await StorageService.getItem('refreshAttempted')

				if (error && error.response && [401, 403].indexOf(error.response.status) > -1) {
					try {
						if (refreshAttempted) {
							return Promise.reject(error)
						} else {
							await this.doRefreshToken()
							return new Promise(async resolve => {
								originalRequest.headers.Authorization = 'Bearer ' + await StorageService.getItem('token')
								originalRequest.headers.tokenClient = await StorageService.getItem('token')
								resolve(apiLog(originalRequest))
							})
						}
					} catch ( e ) {
						ErrorStateService.setIsLogout(true)
						await StorageService.removeItem('token')
						await StorageService.removeItem('refreshToken')
						await StorageService.removeItem('user')
						await StorageService.removeItem('DNI')
						navigate('IntermediateScreen')
					}
				} else {
					return Promise.reject(error)
				}

			})
		const token = await StorageService.getItem('token')
		const user = await StorageService.getItem('user')
		const nombreUsuario = qs.stringify({ 'nombreLogin': user.nombreLogin }, { indices: false })
		const newnombreUsuario = nombreUsuario.replace('nombreLogin=', '')
		try {
			await apiLog.delete(
				'api-banca-movil-empresas/v1/seguridadEmpresas/eliminar/sesiones/' + user.entidad + '/' + user.nombreLogin,
				{
					headers: {
						'nombreUsuario': newnombreUsuario,
						'entidad': user.entidad,
						'tokenClient': token
					}
				}
			)
		} catch ( e ) {

		}
	}

	async checkSesionUser() {
		const user = await StorageService.getItem('user')
		const identificador = await StorageService.getItem('identificador')
		var platform = ''

		if (Platform.OS != 'ios') {
			platform = 'ANDROID'
		} else {
			platform = 'IOS'
		}

		const payload = {
			'sesionUsuario': {
				'cliente': {
					'entidad': {
						'nombre': user.entidad,
						'usuarios': [{
							'nombre': user.nombreLogin
						}]
					}
				},
				'identificador': identificador
			}
		}

		const apiLog = axios.create({

			baseURL: enviroment.baseURL,
			timeout: 90000,

			headers: {
				'codigoCanal': 'APP_BANCA_MOVIL'
			}
		})

		apiLog.interceptors.request.use(
			async (config) => {
				ErrorStateService.setIsLogout(false)
				const token = await StorageService.getItem('token')
				if (token) config.headers.Authorization = `Bearer ${token}`
				config.headers['Content-Type'] = 'application/json; charset=UTF-8'
				return config
			},
			async (error) => {
				ErrorStateService.setIsLogout(true)
				await StorageService.removeItem('token')
				await StorageService.removeItem('refreshToken')
				await StorageService.removeItem('user')
				await StorageService.removeItem('DNI')
				navigate('IntermediateScreen')

			}
		)

		apiLog.interceptors.response.use(
			async (response) => {
				return response
			}, async (error) => {
				const { config } = error
				const originalRequest = config

				const refreshAttempted = await StorageService.getItem('refreshAttempted')

				if (error && error.response && [401, 403].indexOf(error.response.status) > -1) {
					try {
						if (refreshAttempted) {
							return Promise.reject(error)
						} else {
							await this.doRefreshToken()
							return new Promise(async resolve => {
								originalRequest.headers.Authorization = 'Bearer ' + await StorageService.getItem('token')
								originalRequest.headers.tokenClient = await StorageService.getItem('token')
								resolve(apiLog(originalRequest))
							})
						}
					} catch ( e ) {
						ErrorStateService.setIsLogout(true)
						await StorageService.removeItem('token')
						await StorageService.removeItem('refreshToken')
						await StorageService.removeItem('user')
						await StorageService.removeItem('DNI')
						navigate('IntermediateScreen')
					}
				} else {
					return Promise.reject(error)
				}

			})
		const token = await StorageService.getItem('token')
		const resSesionActiva = await apiLog.post(
			`api-banca-movil-empresas/v1/seguridadEmpresas/listar/sesiones/usuario`, payload,
			{
				headers: {
					'tokenClient': token
				}
			}
		)

		return resSesionActiva.data.meta.totalRegistros
	}

}

export const AuthService = new Auth()
