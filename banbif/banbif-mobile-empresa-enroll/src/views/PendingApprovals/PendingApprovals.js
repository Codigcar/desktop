import React, { Component } from 'react'
import {
	ActivityIndicator,
	Dimensions,
	FlatList,
	Image,
	Platform,
	Text,
	TouchableHighlight,
	TouchableOpacity,
	View
} from 'react-native'
import ViewContainer from '../../components/ViewContainer'
import IconTextInput from '../../components/IconTextInput'
import Icon from '../../components/Icon'
import strings from '../../assets/strings'
import styles from './Styles'

import { default as axios } from '../../services/api'
import CardCheckboxListComponent from '../../components/CardCheckboxListComponent/CardCheckboxListComponent'
import colors from '../../assets/colors'
import ShadowContainer from '../../components/ShadowContainer'
import ModalSoftToken from '../../components/ModalSoftToken/ModalSoftToken'
import ModalSuccessComponent from '../../components/ModalSuccessComponent/ModalSuccessComponent'
import ModalErrorComponent from '../../components/ModalErrorComponent/ModalErrorComponent'
import { SpinnerSize } from '../../utils/spinnerSize'
import { DateFormat } from '../../utils/dateFormat'
import { Monetary } from '../../utils/monetary'
import { StorageService } from '../../services/storage'
import images from '../../assets/images'
import { Actionsheet, Box } from 'native-base'
import enumeration from '../../enum/enum'
import ModalConfirmationComponent from '../../components/ModalConfirmationComponent/ModalConfirmationComponent'
import { enviroment } from '../../utils/enviroments'
import DetectID from '../../modules/DetectID'
import Spinner from 'react-native-loading-spinner-overlay'
import DynamicTextComponent from '../../components/DynamicTextComponent/DynamicTextComponent'
import ModalResultDetailComponent from '../../components/ModalResultDetailComponent/ModalResultDetailComponent'
import { OrderBy } from '../../utils/orderBy'
import moment from 'moment'
import { UpperCase } from '../../utils/uppercase'
import DeviceInfo from 'react-native-device-info'

const height = Dimensions.get('window').height
export default class PendingApprovals extends Component {

	constructor(props) {
		super(props)
		this.aprobacionesFiltro
		this.selectAll = this.selectAll.bind(this)
		this.toggleFilterOptions = this.toggleFilterOptions.bind(this)
		this.onClickFilterOption = this.onClickFilterOption.bind(this)

		this.state = {
			allAprobaciones: [],
			selectedAprobaciones: [],
			productTypes: [],
			filteredProducts: [],
			modais: [],
			messages: [],

			tokenFisico: '',
			textFilter: '',
			textTipoFilter: '',

			hasSoftToken: false,
			filtroBuscar: false,
			filtroTipo: false,
			tipoAprovar: false,
			showModalSuccess: false,
			modalSoftToken: false,
			modalSoftTokenRechazo: false,
			showModalError: false,
			showModalConfirmation: false,
			showModalConfirmationRechazo: false,
			showModalTimer: false,
			spinner: false,
			size: 0,
			loadingmessage: false,
			modalWarning: false,
			textError: '',
			diaSistema: '',
			mesSistema: '',
			anioSistema: '',
			horaSistema: '',
			isFilterOpen: false,
			flagGrupo: false
		}

		this.cards = {}
	}

	async UNSAFE_componentWillMount() {
		await this.getPendingApprovals()

		const hasSoftToken = Boolean((await StorageService.getItemStorage('hasSoftToken')))
		const flagGrupo = Boolean(await StorageService.getItemStorage('flagGrupo'))
		this.setState({ hasSoftToken, flagGrupo })

		if (!this.aprobacionesFiltro || this.aprobacionesFiltro.length == 0) {
			this.aprobacionesFiltro = this.state.allAprobaciones
		}
	}

	componentDidMount() {

		this.props.navigation.setOptions({
			headerRight: () => (
				<View style={{ flexDirection: 'row' }}>
					<TouchableOpacity onPress={() => {
						this.selectAll()
					}}>
						{
							Platform.OS === 'ios' ?
								<Image style={{ width: 30, height: 30, marginRight: 10 }} source={images.tasks}></Image>
								:
								<Icon
									family={Icon.FONT_AWESOME_5}
									name="tasks"
									size={30}
									style={{ color: colors.lightBlue, marginRight: 10 }}
								/>
						}
					</TouchableOpacity>
					<TouchableOpacity onPress={async () => {
						await this.toggleFilterOptions()
					}}>
						<Icon
							family={Icon.FONT_AWESOME}
							name="filter"
							size={30}
							style={{ color: colors.lightBlue, marginRight: 10 }}
						/>
					</TouchableOpacity>
				</View>
			)
		})
	}

	handleBackButtonPressAndroid = () => {
		this.setState({ modalVisible: true })
		return true
	}

	setModalVisible(visible) {
		this.setState({ showModalSuccess: visible })
	}

	async setModalConfirmation() {

		const countApprove = this.state.selectedAprobaciones.length
		if (countApprove <= 0) {
			await this.showModalErrorState(true, '¡Debes seleccionar al menos un elemento!')
			return
		}

		const maximumApprove = enviroment.maximumApprove

		if (countApprove <= maximumApprove) {
			this.setState({ showModalConfirmation: true })
			return
		}

		await this.showModalErrorState(true, '¡Solo puede aprobar ' + maximumApprove + ' operaciones!')
	}

	async setModalConfirmacionRechazar() {

		const countApprove = this.state.selectedAprobaciones.length
		if (countApprove > 0) {
			this.setState({ showModalConfirmationRechazo: true })
			return
		}

		await this.showModalErrorState(true, '¡Debes seleccionar al menos un elemento!')
	}

	async setModalTimer() {
		try {
			const aprobaciones = this.state.selectedAprobaciones.filter(function (item) {
				return item.orquestradorAprobacionesEnum === 'PAGOS_PROVEEDORES'
			}).map(function ({ formaPago, tipoCarga, fechaVencimento }) {
				return { formaPago, tipoCarga, fechaVencimento }
			})

			let despuesDeLaUna = false

			if (aprobaciones.length > 0) {
				await this.obtenerFechaActual()
				aprobaciones.forEach(data => {
					if (data.formaPago === '5' && (data.tipoCarga === 'M' || data.tipoCarga === 'I')) {
						const fecha = moment(data.fechaVencimento)
						const dia = fecha.format('D')
						const mes = fecha.format('M')
						const anio = fecha.format('YYYY')
						if (dia == this.state.diaSistema && mes == this.state.mesSistema &&
							anio == this.state.anioSistema && parseInt(this.state.horaSistema) > 12) {
							despuesDeLaUna = true
							return
						}
					}
				})
			}

			if (despuesDeLaUna) {
				if (Platform.OS === 'ios') {
					await new Promise(r => setTimeout(() => r(), 500))
				}
				this.setState({ showModalTimer: true })
			} else {
				this.setState({ showModalTimer: false })
				this.settingtValidation()
			}
		} catch ( error ) {
			this.handleMessages(error)
		}
	}

	async obtenerFechaActual() {
		try {

			const response = await axios.get(
				'/api-banca-movil-empresas/v1/seguridadEmpresas/parametros/FECHASISTEMA'
			)

			if (response.data && response.data.meta.totalRegistros <= 0) {
				throw err
			}

			const fechaSistema = response.data.datos.parametros[0].descripcion

			const fecha = moment(fechaSistema, 'YYYY-MM-DD HH:mm:ss')
			const dia = fecha.format('D')
			const mes = fecha.format('M')
			const anio = fecha.format('YYYY')
			await this.setState({ anioSistema: anio, mesSistema: mes, diaSistema: dia, horaSistema: fecha.hours() })
		} catch ( err ) {
			throw err
		}
	}

	async settingtValidation() {
		if (this.state.hasSoftToken) {
			this.setState({ showModalConfirmation: false })
			await this.sendToken()
		} else {
			await this.showModalSoftToken()
		}
	}

	async setModalSoftToken(status) {

		if (this.state.selectedAprobaciones.length > 0) {
			this.setState({ modalSoftToken: status })
		} else {
			await this.showModalErrorState(true, '')
		}
	}

	setModalSuccess(modalSuccess) {
		this.setState({ modalSuccess })
	}

	setTokenFisico(tokenFisico) {
		this.setState({ tokenFisico })
	}

	async getPendingApprovals() {
		await this.setState({ spinner: true, size: SpinnerSize.get() })
		try {
			const lisTransfer = []
			const user = await StorageService.getItem('user')
			const usuarioTipo = await StorageService.getItemStorage('usuarioTipo')
			const tokenClient = await StorageService.getItem('token')
			const response = await axios.get(
				'/api-banca-movil-empresas/v1/aprobacionesPendientes',
				{
					headers: {
						'codigoIBS': user.userId,
						'nombreUsuario': UpperCase.upperCase(user.nombreLogin),
						'entidad': UpperCase.upperCase(user.entidad),
						'tokenClient': tokenClient,
						'tipoGrupo': usuarioTipo
					}
				}
			)
			if (response.data && response.data.datos.length <= 0) {
				let err = {
					response: {
						data: {
							meta: {
								mensajes: [{
									mensaje: '!Registro no encontrado¡'
								}]
							}
						}
					}
				}
				throw err
			}
			// console.log('response.data.datos!!!: ', response.data.datos)
			response.data.datos.forEach((data, i) => {
				data.typeTransfer =
					data.tipoAprobacion === '1' && data.moneda != data.currencyInterbankAccountId ?
						data.orquestradorAprobacionesEnum + '_2' :
						data.orquestradorAprobacionesEnum + '_' + data.tipoAprobacion
				data.key = String(i + 1)
				if (data.orquestradorAprobacionesEnum === 'TRANSFERENCIAS' && data.tipoAprobacion === '1') {
					data.data = [
						{ key: '1', text: 'Número Referencia', value: data.numeroReferencia },
						{ key: '2', text: 'Fecha', value: DateFormat.format(data.fecha) },
						{ key: '3', text: 'Cuenta Cargo', value: data.cuentaCargo },
						{ key: '4', text: 'Moneda de Cargo', value: data.moneda },
						{ key: '5', text: 'Monto de Cargo', value: Monetary.format(data.monto) },
						{ key: '6', text: 'Cuenta Abono', value: data.creditProductBankIdentifier },
						{ key: '7', text: 'Moneda de Abono', value: data.currencyInterbankAccountId },
						{ key: '8', text: 'Monto de Abono', value: Monetary.format(data.montoAbono) },
						{ key: '9', text: 'Ingresado Por', value: data.nombreUsuario },
						{ key: '10', text: 'Nro. de Aprobaciones', value: data.numeroAprobador }
					]
				} else if (data.orquestradorAprobacionesEnum === 'TRANSFERENCIAS') {
					data.data = [
						{ key: '1', text: 'Número Referencia', value: data.numeroReferencia },
						{ key: '2', text: 'Fecha', value: DateFormat.format(data.fecha) },
						{ key: '3', text: 'Cuenta Cargo', value: data.cuentaCargo },
						{ key: '4', text: 'Moneda de Cargo', value: data.moneda },
						{ key: '5', text: 'Monto de Cargo', value: Monetary.format(data.monto) },
						{ key: '6', text: 'Beneficiario', value: data.beneficiaryName },
						{ key: '7', text: 'Cuenta Abono', value: data.creditProductBankIdentifier },
						{ key: '8', text: 'Moneda de Abono', value: data.currencyInterbankAccountId },
						{ key: '9', text: 'Monto de Abono', value: Monetary.format(data.montoAbono) },
						{ key: '10', text: 'Ingresado Por', value: data.nombreUsuario },
						{ key: '11', text: 'Nro. de Aprobaciones', value: data.numeroAprobador }
					]
				} else if (data.orquestradorAprobacionesEnum === 'TRANSFERENCIAS_EXTERIOR') {
					data.data = [
						{ key: '1', text: 'Número Referencia', value: data.numeroReferencia },
						{ key: '2', text: 'Fecha', value: DateFormat.format(data.fecha) },
						{ key: '3', text: 'Cuenta Cargo', value: data.cuentaCargo },
						{ key: '4', text: 'Moneda de Cargo', value: data.moneda },
						{ key: '5', text: 'Monto de Cargo', value: Monetary.format(data.monto) },
						{ key: '6', text: 'Beneficiario', value: data.beneficiaryName },
						{ key: '7', text: 'Cuenta Abono', value: data.creditProductBankIdentifier },
						{ key: '8', text: 'Ingresado Por', value: data.nombreUsuario },
						{ key: '9', text: 'Nro. de Aprobaciones', value: data.numeroAprobador }
					]
				} else if (data.orquestradorAprobacionesEnum === 'PAGOS_PROVEEDORES' ||
					data.orquestradorAprobacionesEnum === 'PAGOS_HABERES') {
					data.data = [
						{ key: '1', text: 'Número Referencia', value: data.numeroReferencia },
						{ key: '2', text: 'Descripción', value: data.description.substring(0, 33) },
						{ key: '3', text: 'Número de registros', value: data.cantidadRegistros },
						{ key: '4', text: 'Fecha', value: DateFormat.format(data.fecha) },
						{ key: '5', text: 'Monto', value: Monetary.format(data.monto) },
						{ key: '6', text: 'Cuenta Cargo', value: data.cuentaCargo },
						{ key: '7', text: 'Moneda', value: data.moneda },
						{ key: '8', text: 'Ingresado Por', value: data.nombreUsuario },
						{ key: '9', text: 'Nro. de Aprobaciones', value: data.numeroAprobador }
					]
				} else if (data.orquestradorAprobacionesEnum === 'PAGO_LETRAS') {
					data.data = [
						{ key: '1', text: 'Número Referencia', value: data.numeroReferencia },
						{ key: '2', text: 'Fecha', value: DateFormat.format(data.fecha) },
						{ key: '3', text: 'Num. Planilla', value: data.numeroPlanilla },
						{ key: '4', text: 'Num. Letra', value: data.numeroLetra },
						{ key: '5', text: 'Girador', value: data.beneficiaryName },
						{ key: '6', text: 'Producto', value: data.tipoAprobacion },
						{ key: '7', text: 'Monto', value: Monetary.format(data.montoTotal) },
						{ key: '8', text: 'Fecha emisión', value: DateFormat.format(data.fechaFacturacion) },
						{ key: '9', text: 'Fecha vencimiento', value: DateFormat.format(data.fechaVencimento) },
						{ key: '10', text: 'Moneda', value: data.moneda },
						{ key: '11', text: 'Ingresado Por', value: data.nombreUsuario },
						{ key: '12', text: 'Nro. de Aprobaciones', value: data.numeroAprobador }
					]
				} else if (data.orquestradorAprobacionesEnum === 'PLANILLA_LETRAS') {
					data.data = [
						{ key: '1', text: 'Número Referencia', value: data.numeroReferencia },
						{ key: '2', text: 'Fecha', value: DateFormat.format(data.fecha) },
						{ key: '3', text: 'Tipo doc.', value: enumeration.tipoDocumentoPlanillaElectronica[data.tipoServicio] },
						{ key: '4', text: 'Tipo de Planilla', value: enumeration.tipoPlanillaElectronica[data.tipoAprobacion] },
						{ key: '5', text: 'Num. Reg.', value: data.cantidadRegistros },
						{ key: '6', text: 'Moneda', value: data.moneda },
						{ key: '7', text: 'Monto', value: Monetary.format(data.monto) },
						{ key: '8', text: 'Cuenta de Abono', value: data.cuentaCargo },
						{ key: '9', text: 'Moneda de abono', value: data.currencyInterbankAccountId },
						{ key: '10', text: 'Descripción', value: data.description.substring(0, 33) },
						{ key: '11', text: 'Ingresado Por', value: data.nombreUsuario },
						{ key: '12', text: 'Nro. de Aprobaciones', value: data.numeroAprobador }
					]
				} else if (data.orquestradorAprobacionesEnum === 'CARTA_FIANZA_SOLICITUD') {
					data.data = [
						{ key: '1', text: 'Número Referencia', value: data.numeroReferencia },
						{ key: '2', text: 'Moneda', value: data.moneda },
						{ key: '3', text: 'Fecha emisión', value: DateFormat.format(data.fechaFacturacion) },
						{ key: '4', text: 'Fecha vencimiento', value: DateFormat.format(data.fechaVencimento) },
						{ key: '5', text: 'Monto', value: Monetary.format(data.monto) },
						{ key: '6', text: 'Modalidad', value: enumeration.cartaFianzaModalidad[data.tipoServicio] },
						{ key: '7', text: 'Beneficiario', value: data.beneficiaryName },
						{ key: '8', text: 'Cuenta Cargo', value: data.cuentaCargo },
						{ key: '9', text: 'Moneda de Cargo', value: data.currencyInterbankAccountId },
						{ key: '10', text: 'Ingresado Por', value: data.nombreUsuario },
						{ key: '11', text: 'Nro. de Aprobaciones', value: data.numeroAprobador }
					]
				} else if (data.orquestradorAprobacionesEnum === 'CARTA_FIANZA_RENOVACION') {
					data.data = [
						{ key: '1', text: 'Número Referencia', value: data.numeroReferencia },
						{ key: '2', text: 'Moneda', value: data.moneda },
						{ key: '3', text: 'Monto', value: Monetary.format(data.monto) },
						{ key: '4', text: 'Fecha emisión', value: DateFormat.format(data.fechaFacturacion) },
						{ key: '5', text: 'Fecha vencimiento', value: DateFormat.format(data.fechaVencimento) },
						{ key: '6', text: 'Modalidad', value: data.tipoServicio },
						{ key: '7', text: 'Beneficiario', value: data.beneficiaryName },
						{ key: '8', text: 'Cuenta Cargo', value: data.cuentaCargo },
						{ key: '9', text: 'Moneda de Cargo', value: data.currencyInterbankAccountId },
						{ key: '10', text: 'Ingresado Por', value: data.nombreUsuario },
						{ key: '11', text: 'Nro. de Aprobaciones', value: data.numeroAprobador }
					]
				} else if (data.orquestradorAprobacionesEnum === 'PAGOS_OTROS_SERVICIOS' ||
					data.orquestradorAprobacionesEnum === 'PAGOS_SERVICIOS_CLARO' ||
					data.orquestradorAprobacionesEnum === 'PAGOS_SERVICIOS_EDELNOR' ||
					data.orquestradorAprobacionesEnum === 'PAGOS_SERVICIOS_LUZDELSUR' ||
					data.orquestradorAprobacionesEnum === 'PAGOS_SERVICIOS_TELEFONICA' ||
					data.orquestradorAprobacionesEnum === 'PAGOS_SERVICIOS_ENTEL') {
					data.data = [
						{ key: '1', text: 'Referencia', value: data.numeroReferencia },
						{ key: '2', text: 'Fecha', value: DateFormat.format(data.fecha) },
						{ key: '3', text: 'Cod. suministro', value: data.codigoSuministro },
						{ key: '4', text: 'Número de recibo', value: data.numeroRecibo },
						{ key: '5', text: 'Cuenta de cargo', value: data.cuentaCargo },
						{ key: '6', text: 'Moneda de cargo', value: data.moneda },
						{ key: '7', text: 'Monto a pagar', value: Monetary.format(data.monto) },
						{ key: '8', text: 'Moneda a pagar', value: data.currencyInterbankAccountId },
						{ key: '9', text: 'Empresa', value: data.tipoServicio },
						{ key: '10', text: 'Ingresado Por', value: data.nombreUsuario },
						{ key: '11', text: 'Nro. de Aprobaciones', value: data.numeroAprobador }
					]
				} else if (data.orquestradorAprobacionesEnum === 'AUTODESEMBOLSO') {
					data.data = [
						{ key: '1', text: 'Número Referencia', value: data.numeroReferencia },
						{ key: '2', text: 'Fecha', value: DateFormat.format(data.fecha) },
						{ key: '3', text: 'Núm. Línea de Crédito', value: data.numeroLinea },
						{ key: '4', text: 'Monto de Abono', value: Monetary.format(data.monto) },
						{ key: '5', text: 'Moneda de Abono', value: data.currencyInterbankAccountId },
						{ key: '6', text: 'Cuenta de Abono', value: data.creditProductBankIdentifier },
						{ key: '7', text: 'Cuenta de Cargo', value: data.cuentaCargo },
						{ key: '8', text: 'Moneda Cuenta Cargo', value: data.moneda },
						{ key: '9', text: 'Cantidad Máxima de Días de Pago', value: data.maxDiaPago },
						{ key: '10', text: 'Cuotas Mensuales', value: data.numeroCuota },
						{ key: '11', text: 'Ingresado Por', value: data.nombreUsuario },
						{ key: '12', text: 'Nro. de Aprobaciones', value: data.numeroAprobador }
					]
				} else if (data.orquestradorAprobacionesEnum === 'PAGOS_SERVICIOS_CHEQUES') {
					data.data = [
						{ key: '1', text: 'Número Referencia', value: data.numeroReferencia },
						{ key: '2', text: 'Nro. Lote', value: data.numLote },
						{ key: '3', text: 'Registro Lote', value: data.regLote },
						{ key: '4', text: 'Importe Total', value: data.monto },
						{ key: '5', text: 'Moneda Lote', value: data.moneda },
						{ key: '6', text: 'Ingresado Por', value: data.nombreUsuario },
						{ key: '7', text: 'Nro. de Aprobaciones', value: data.numeroAprobador }
					]
				} else {
					data.data = [
						{ key: '1', text: 'Número Referencia', value: data.numeroReferencia },
						{ key: '2', text: 'Fecha', value: DateFormat.format(data.fecha) },
						{ key: '3', text: 'Monto', value: Monetary.format(data.monto) },
						{ key: '4', text: 'Cuenta Cargo', value: data.cuentaCargo },
						{ key: '5', text: 'Moneda', value: data.moneda },
						{ key: '6', text: 'Ingresado Por', value: data.nombreUsuario },
						{ key: '7', text: 'Nro. de Aprobaciones', value: data.numeroAprobador }
					]
				}
			})
			await this.setState({ allAprobaciones: (response.data.datos.sort(OrderBy.order('fecha'))) })
			this.aprobacionesFiltro = this.state.allAprobaciones
		} catch ( err ) {
			this.handleMessages(err)
		}
		await this.setState({ spinner: false, size: 0 })
	}

	async handleMessages(err) {
		let messages = []

		if (Platform.OS === 'ios') {
			await new Promise(r => setTimeout(() => r(), 1000))
		}

		if (this.hasMessage(err)) {
			const base = err.response.data.meta.mensajes[0]

			if (base.mensaje === 'Campo faltante: softTokenAutorizacion.claveCompartida') {
				messages = [
					{
						mensaje: 'El cliente no tiene registrado el número de DNI'
					}
				]
			} else if (base.mensaje === '!Registro no encontrado¡') {
				messages = [
					{
						mensaje: 'No hay operaciones pendientes por aprobar'
					}
				]
			} else if (base.codigo === '802') {
				messages = [
					{
						mensaje: 'El token es inválido.'
					}
				]
			}
			else {
				messages = err.response.data.meta.mensajes
			}

		} else {
			messages = [
				{
					mensaje:
					strings.messages.error
				}
			]
		}
		this.setState({ messages })
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

	messageOk() {
		let _messages = this.state.messages
		_messages.pop()

		this.setState({ messages: _messages })

		if (
			this.state.messages.length == 0 &&
			this.state.allAprobaciones.length == 0
		) {
			this.props.navigation.navigate('MainMenu')
		}
	}

	async onChange(item) {
		let selecteds = this.state.selectedAprobaciones

		if (item.isChecked) {
			if (selecteds.find(s => s.key == item.id)) return

			const aprobacione = {
				...this.state.allAprobaciones.find(
					aprobacione => aprobacione.key == item.id
				)
			}

			delete aprobacione.data

			selecteds.push(aprobacione)
		} else {
			const index = selecteds.findIndex(aprobacione => aprobacione.key == item.id)
			selecteds.splice(index, 1)
		}

		await this.setState({ selectedAprobaciones: selecteds })
	}

	async closeModalSoftToken() {
		await this.setState({ modalSoftToken: false, modalSoftTokenRechazo: false })
	}

	async sendToken() {
		try {

			const aprobacionesSelected = this.state.selectedAprobaciones
			await this.setLoadingmessage(true)
			const aprobaciones = this.state.selectedAprobaciones.map(ap => {
				delete ap.key
				delete ap.typeTransfer
				return ap
			})

			const { hasSoftToken, tokenFisico } = this.state
			let headers = {}
			const user = await StorageService.getItem('user')
			headers.usuarioBancaInternet = user.nombreLogin
			headers.entidad = user.entidad
			if (hasSoftToken) {
				headers.numeroDocumento = await StorageService.getItem('DNI')
				headers.contrasena = await DetectID.getTokenValue()
				headers.tipoToken = 'SOFTTOKEN'
			} else {
				headers.numeroDocumento = tokenFisico
				headers.contrasena = tokenFisico
				headers.tipoToken = 'HARDTOKEN'
			}
			const tokenClient = await StorageService.getItem('token')
			headers.tokenClient = tokenClient
			console.log('Approbe REQUEST /api-banca-movil-empresas/v1/aprobacionesPendientes/aprobar', { aprobaciones: aprobaciones }, {headers})
			const response = await axios.put(
				'/api-banca-movil-empresas/v1/aprobacionesPendientes/aprobar',
				{
					sesionUsuario: {
						ipDispositivo: await DeviceInfo.getIpAddress(),
						sistemaOperativoDispositivo: Platform.OS + ' ' + DeviceInfo.getSystemVersion(),
						nombreDispositivo: DeviceInfo.getModel(),
					},
					aprobaciones: aprobaciones
				},
				{
					headers
				}
			)
			console.log('Approbe RESPONSE: ', response)
			await this.setLoadingmessage(false)
			await this.setState({ selectedAprobaciones: [], allAprobaciones: [], textFilter: '' })
			await this.handleResponseMeta(response.data.meta, true)
		} catch ( e ) {
			await this.setLoadingmessage(false)
			await this.handleMessages(e)
		}
	}

	async rechazarOpreaciones() {
		try {
			const aprobacionesSelected = this.state.selectedAprobaciones
			await this.setLoadingmessage(true)
			const aprobaciones = this.state.selectedAprobaciones.map(ap => {
				delete ap.key
				delete ap.typeTransfer
				return ap
			})

			const { hasSoftToken, tokenFisico } = this.state
			let headers = {}
			const user = await StorageService.getItem('user')
			headers.usuarioBancaInternet = user.nombreLogin
			headers.entidad = user.entidad

			if (hasSoftToken) {
				headers.numeroDocumento = await StorageService.getItem('DNI')
				headers.contrasena = await DetectID.getTokenValue()
				headers.tipoToken = 'SOFTTOKEN'
			} else {
				headers.numeroDocumento = tokenFisico
				headers.contrasena = tokenFisico
				headers.tipoToken = 'HARDTOKEN'
			}

			const tokenClient = await StorageService.getItem('token')
			headers.tokenClient = tokenClient
			const response = await axios.put(
				'/api-banca-movil-empresas/v1/aprobacionesPendientes/rechazar',
				{ aprobaciones: aprobaciones },
				{
					headers
				}
			)
			await this.setLoadingmessage(false)
			await this.setState({ selectedAprobaciones: [], allAprobaciones: [], textFilter: '' })
			await this.handleResponseMeta(response.data.meta, false)
		} catch ( e ) {
			await this.setLoadingmessage(false)
			await this.handleMessages(e)
		}
	}

	async setLoadingmessage(valor) {
		if (Platform.OS === 'ios') {
			await new Promise(r => setTimeout(() => r(), 1000))
		}

		await this.setState({ loadingmessage: valor })
	}

	async handleResponseMeta(meta, aprobacion) {


		if (!meta || !meta.mensajes) {
			await this.getPendingApprovals()


			return
		}
		let mensajes = meta.mensajes

		mensajes = mensajes.map((men, i) => {
			if (men.tipo == 'info') {
				if (aprobacion) {
					men.mensaje = '¡Sus operaciones han sido aprobadas!'
				} else {
					men.mensaje = '¡Sus operaciones han sido rechazadas!'
				}


				return (
					<ModalSuccessComponent
						texto={men.mensaje}
						key={i}
						visible={true}
						Callback={async (success) => {
							if (success) {
								await this.getPendingApprovals()
							}
						}
						}
					/>
				)
			}

			if (men.tipo == 'warn') {
				return (
					<ModalResultDetailComponent
						texto={men.mensaje}
						titulo={'¡Alguno de sus operaciones ha fallado!'}
						key={i}
						visible={true}
						Callback={async (success) => {
							if (success) {
								await this.getPendingApprovals()
							}
						}
						}/>
				)
			}

			if ((men.tipo = 'error')) {
				return (
					<ModalErrorComponent
						TextError={men.mensaje}
						key={i}
						Visibility={true}
					/>
				)
			}
		})

		if (Platform.OS === 'ios') {
			await new Promise(r => setTimeout(() => r(), 1000))
		}

		await this.setState({ modais: mensajes })
	}

	async filter(title) {
		await this.setState({ textFilter: title })
		let filterList = this.aprobacionesFiltro

		if (this.state.filtroTipo) {
			filterList = filterList.filter(ap => ap.orquestradorAprobacionesEnum.indexOf(this.state.textTipoFilter) > -1)
		}

		const results = filterList.filter(
			a =>
				a.numeroReferencia
				.trim()
				.toLowerCase()
				.indexOf(title.trim().toLowerCase().replace(/ /g, '')) > -1 ||
				DateFormat.format(a.fecha)
				.trim()
				.toLowerCase()
				.indexOf(title.trim().toLowerCase().replace(/ /g, '')) > -1 ||
				Monetary.format(a.monto)
				.trim()
				.toLowerCase()
				.indexOf(title.trim().toLowerCase().replace(/ /g, '')) > -1 ||
				a.cuentaCargo
				.trim()
				.toLowerCase()
				.indexOf(title.trim().toLowerCase().replace(/ /g, '')) > -1 ||
				a.moneda
				.trim()
				.toLowerCase()
				.indexOf(title.trim().toLowerCase().replace(/ /g, '')) > -1 ||
				(typeof a.tipoServicio !== 'undefined' && a.tipoServicio
				.trim()
				.toLowerCase()
				.indexOf(title.trim().toLowerCase().replace(/ /g, '')) > -1) ||
				(typeof a.beneficiaryName !== 'undefined' && a.beneficiaryName
				.trim()
				.toLowerCase()
				.indexOf(title.trim().toLowerCase().replace(/ /g, '')) > -1)
		)
		await this.setState({ allAprobaciones: results, filtroBuscar: title.length == 0 ? false : true })
		await this.checkCards()
		return results
	}

	selectAll() {
		const cardsKeys = (Object.keys(this.cards))

		const cardsVerifiy = (cardsKeys.filter(k => this.cards[k] != null)).length > 0

		if (!cardsVerifiy) return

		const cardsSelectLength = (cardsKeys.filter(k => this.cards[k] && this.cards[k].state && this.cards[k].state.isChecked)).length
		const cardsSelect = cardsSelectLength > 0

		cardsKeys.forEach(k => {
			const card = this.cards[k]

			if (!card) return

			if (cardsSelectLength == 0) {
				card.selectCard()
			} else if (cardsSelect && !card.state.isChecked) {
				card.selectCard()
			} else if (cardsSelectLength == this.state.allAprobaciones.length) {
				card.selectCard()
			}
		})
	}

	async checkCards() {
		const cardsKeys = (Object.keys(this.cards))

		cardsKeys.forEach(k => {
			const card = this.cards[k]

			if (card && card.props && !card.state.isChecked) {
				const aprobacioneSelected = this.state.selectedAprobaciones.find(sa => sa.key == card.props.id)

				if (aprobacioneSelected) {
					card.selectCard()
				}
			}

		})
	}

	async showModalSoftToken() {
		if (Platform.OS === 'ios') {
			await new Promise(r => setTimeout(() => r(), 500))
		}
		this.setState({ showModalConfirmation: false, modalSoftToken: true })
	}

	async showModalSoftTokenRechazo() {
		if (Platform.OS === 'ios') {
			await new Promise(r => setTimeout(() => r(), 500))
		}
		this.setState({ showModalConfirmationRechazo: false, modalSoftTokenRechazo: true })
	}

	async showModalErrorState(enable, text) {
		if (Platform.OS === 'ios') {
			await new Promise(r => setTimeout(() => r(), 500))
		}
		this.setState({ showModalError: enable })
		this.setState({ textError: text })
	}

	toggleFilterOptions() {
		this.setState({ isFilterOpen: !this.state.isFilterOpen })
	}

	async onClickFilterOption(buttonIndex) {

		const aproEnum = enumeration.filtrosAprobaciones
		const options = (Object.keys(aproEnum)).map(k => aproEnum[k])

		if (typeof buttonIndex === 'number') {
			const indice = options[buttonIndex]
			const valor = Object.keys(aproEnum).find(k => (aproEnum[k] == indice))

			this.setState({ textTipoFilter: valor })
			let filterList = this.aprobacionesFiltro

			if (valor == 'LIMPIAR') {
				if (this.state.filtroBuscar) {
					this.setState({ filtroTipo: false })
					await this.filter(this.state.textFilter)
				} else {
					this.setState({ allAprobaciones: this.aprobacionesFiltro, filtroTipo: false })
				}
				this.toggleFilterOptions()
				await this.checkCards()
				return
			}

			if (this.state.filtroBuscar) {
				this.setState({ filtroTipo: false })
				filterList = await this.filter(this.state.textFilter)
			}

			const results = filterList.filter(ap => ap.orquestradorAprobacionesEnum.indexOf(valor) > -1)

			this.setState({ allAprobaciones: results, filtroTipo: true, isFilterOpen: false })
			await this.checkCards()
		}
	}

	render() {
		const searchIcon = {
			family: Icon.IONICONS,
			name: 'md-search',
			size: 35,
			style: styles.searchIcon
		}

		const textInput = {
			placeholder: strings.consolidatedPosition.searchBarPlaceholder,
			style: styles.searchInput,
			onChangeText: async title => await this.filter(title)
		}

		const aproEnum = enumeration.filtrosAprobaciones
		const filterOptions = (Object.keys(aproEnum)).map(k => aproEnum[k])

		let messageViews = this.state.messages.map((message, i) => {
			return (
				<ModalErrorComponent
					key={message.mensaje}
					TextError={message.mensaje}
					Visibility={
						this.state.messages.length > 0 &&
						i == this.state.messages.length - 1
					}
					Callback={this.messageOk.bind(this)}
				/>
			)
		})
		const getTitle = item => enumeration.aprobaciones[item.orquestradorAprobacionesEnum === 'TRANSFERENCIAS' ?
			item.typeTransfer : item.orquestradorAprobacionesEnum]
		return (
			<ViewContainer style={{ flex: 1, backgroundColor: colors.white }}>
				<View>
					<Spinner
						visible={this.state.loadingmessage}
						textContent={'Procesando...'}
						textStyle={{ color: '#FFF' }}
					/>
				</View>
				<View style={styles.searchInputContainer}>
					<View style={styles.searchBarContainer}>
						<IconTextInput icon={searchIcon} input={textInput}/>
					</View>
				</View>
				<View style={{ height: height - 275 }}>
					<View>
						<ActivityIndicator
							style={{ paddingBottom: this.state.spinner ? 10 : 0 }}
							animating={this.state.spinner}
							size={Platform.OS === 'ios' ? SpinnerSize.get() : this.state.size}
							color={colors.lightBlue}
						>
						</ActivityIndicator>

						<FlatList
							data={this.state.allAprobaciones}
							renderItem={({ item, index }) => (
								<CardCheckboxListComponent
									ref={(ref) => {this.cards[item.key] = ref}}
									id={item.key}
									key={item.key}
									hideHeaderLine={index === 0}
									onChange={async (item) => await this.onChange(item)}
									title={getTitle(item)}
									data={item.data}
									flagGrupo={this.state.flagGrupo}
									headerData={{
										moneda: item.moneda,
										monto: item.monto,
										entidad: item.entidad,
									}}
								/>
							)}
							initialNumToRender={this.state.allAprobaciones.length}
							contentContainerStyle={{ paddingBottom: 5, paddingRight: 10 }}
							ItemSeparatorComponent={() => <View style={{ paddingTop: 15 }}/>}
						/>
					</View>
				</View>

				<View
					style={styles.containerButton}
				>
					<DynamicTextComponent
						style={{ marginTop: 2 }}
						dynamicText={'Total Seleccionados: ' + this.state.selectedAprobaciones.length}
					/>

					<View style={styles.containerButtonAprobacion}>
						<TouchableHighlight
							onPress={async () => {
								await this.setModalConfirmation()
							}}
						>
							<ShadowContainer style={styles.textContainer}>
								<Text style={{ color: colors.white, fontSize: 15 }}>Aprobar</Text>
							</ShadowContainer>
						</TouchableHighlight>

						<TouchableHighlight style={{ marginTop: 3 }}
						                    onPress={async () => {
							                    await this.setModalConfirmacionRechazar()
						                    }}
						>
							<ShadowContainer style={styles.textContainerRechazar}>
								<Text style={{ color: colors.white, fontSize: 15 }}>Rechazar</Text>
							</ShadowContainer>
						</TouchableHighlight>

					</View>

					{!this.state.hasSoftToken && <ModalSoftToken
						showSuccess={async () => await this.sendToken()}
						closeModalSoftToken={async () => await this.closeModalSoftToken()}
						setSoftToken={this.setTokenFisico.bind(this)}
						modalSoftToken={this.state.modalSoftToken}
						setModal={async () => await this.setModalSoftToken.bind(this)}
					/>
					}
					{!this.state.hasSoftToken && <ModalSoftToken
						showSuccess={async () => await this.rechazarOpreaciones()}
						closeModalSoftToken={async () => await this.closeModalSoftToken()}
						setSoftToken={this.setTokenFisico.bind(this)}
						modalSoftToken={this.state.modalSoftTokenRechazo}
						setModal={async () => await this.setModalSoftToken.bind(this)}
					/>
					}
					<ModalConfirmationComponent
						TextConfirmation={'¿Confirma la aprobación de los registros seleccionados?'}
						Callback={async (success) => {
							if (success) {
								this.setModalTimer()
								this.setState({ showModalConfirmation: false })
							} else {
								this.setState({ showModalConfirmation: false })
							}
						}
						}
						Visibility={this.state.showModalConfirmation}
					/>

					<ModalConfirmationComponent
						TextConfirmation={'Usted ha seleccionado operaciones BCR, sí son firmadas después de la 01:00 p.m. se procesarán al día siguiente útil. ¿Desea continuar?'}
						Callback={async (success) => {
							if (success) {
								if (this.state.hasSoftToken) {
									this.setState({ showModalConfirmation: false })
									await this.sendToken()
								} else {
									await this.showModalSoftToken()
								}
							}
							this.setState({ showModalTimer: false })
						}
						}
						Visibility={this.state.showModalTimer}
					/>
					<ModalConfirmationComponent
						TextConfirmation={'¿Confirma el rechazo de los registros seleccionados?'}
						Callback={async (success) => {
							if (success) {
								if (this.state.hasSoftToken) {
									this.setState({ showModalConfirmationRechazo: false })
									await this.rechazarOpreaciones()
								} else {
									await this.showModalSoftTokenRechazo()
								}
							} else {
								this.setState({ showModalConfirmationRechazo: false })
							}
						}
						}
						Visibility={this.state.showModalConfirmationRechazo}
					/>

					<ModalErrorComponent
						TextError={this.state.textError}
						Visibility={this.state.showModalError}
						Callback={() => this.setState({ showModalError: false })}
					/>

					{this.state.modais}
				</View>

				{messageViews}

				<Actionsheet isOpen={this.state.isFilterOpen} onClose={this.toggleFilterOptions}>
					<Actionsheet.Content>
						<Box w="100%" h={60} px={4} justifyContent="center">
							<Text fontSize="16" color="gray.500" _dark={{
								color: 'gray.300'
							}}>
								Filtrar por tipo
							</Text>
						</Box>
						{
							filterOptions.map((option, index) => {
								return (
									<Actionsheet.Item
										key={option}
										onPress={() => this.onClickFilterOption(index)}
									>
										{option}
									</Actionsheet.Item>
								)
							})
						}
					</Actionsheet.Content>
				</Actionsheet>

			</ViewContainer>
		)
	}
}
