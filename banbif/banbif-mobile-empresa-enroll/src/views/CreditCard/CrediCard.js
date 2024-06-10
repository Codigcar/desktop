import React, { Component } from 'react'
import { Dimensions, Platform, Text, TouchableOpacity, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import styles from './Styles'
import strings from '../../assets/strings'
import colors from '../../assets/colors'
import AccountMovementCreditCardComponent
	from '../../components/AccountMovementCreditCardComponent/AccountMovementCreditCardComponent'
import BlueLineWithTextComponent from '../../components/BlueLineWithTextComponent/BlueLineWithTextComponent'
import CreditCardListComponent from '../../components/CreditCardListComponent/CreditCardListComponent'
import ModalErrorComponent from '../../components/ModalErrorComponent/ModalErrorComponent'
import { default as axios } from '../../services/api'
import DollarIconTextCreditCardComponent
	from '../../components/DollarIconTextCreditCardComponent/DollarIconTextCreditCardComponent'
import { SpinnerSize } from '../../utils/spinnerSize'
import { Monetary } from '../../utils/monetary'
import { Actionsheet, Box } from 'native-base'
import Icon from '../../components/Icon'
import { StorageService } from '../../services/storage'
import EntidadNombre from '../../components/EntidadNombre'

var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']


const height = Dimensions.get('window').height
export default class CreditCard extends Component {
	constructor(props) {
		super(props)
		this.onClickFilterOption = this.onClickFilterOption.bind(this)
		this.toggleMonthFilterOptions = this.toggleMonthFilterOptions.bind(this)

		this.state = {
			blocked: false,
			movementsPage: 0,
			spinnerDetails: false,
			spinnerMoviments: false,
			sizeDetail: 0,
			sizeMoviments: 0,
			list: true,
			messages: [],
			detailProducts: [],
			movementProducts: [],
			toggleBody: true,
			Currency: this.props.route.params.Currency,
			ProductBankIdentifier: this.props.route.params
			.ProductBankIdentifier.toUpperCase(),
			NrAccount: this.props.route.params.NrAccount,
			NrCCI: this.props.route.params.NrCCI,
			Product: this.props.route.params.Product,
			ProductType: this.props.route.params.ProductType,
			SaldoActual: this.props.route.params.SaldoActual,
			SaldoDisponible: this.props.route.params.SaldoDisponible,
			fechaSeleccionada: '',
			fechaInicio: null,
			fechaFin: null,
			mesesIndices: [],
			mesSeleccionado: '',
			indice: '',
			isMonthFilterOpen: false
		}
	}

	MostrarFiltros = IsToggle => {
		if (!IsToggle) {
			if (Platform.OS !== 'ios') {
				return (
					<View>
						<View style={styles.contentAction}>
							<View style={styles.viewTextAction}>
								<Text style={styles.textAction}>Seleccione un Mes: </Text>
							</View>
							<View style={styles.filterAction}>
								<Picker style={styles.filterPicker}
								        selectedValue={this.state.fechaSeleccionada}
								        onValueChange={this.updateMonth.bind()}
								>
									{
										this.state?.meses?.map((data) => {
											return (
												<Picker.Item
													key={data.nombreMes}
													label={data.nombreMes}
													value={data.ultimoDiaMes}
												/>
											)
										})
									}
								</Picker>
							</View>
						</View>
					</View>
				)
			} else {
				return (
					<View style={styles.contentAction}>
						<View style={styles.viewTextAction}>
							<Text style={styles.textAction}>Seleccione un Mes: </Text>
						</View>
						<View style={styles.filterAction}>
							<TouchableOpacity onPress={() => this.toggleMonthFilterOptions()}>
								<View style={styles.filterAction}>
									<Text style={styles.textFilterAction}> {this.state.mesSeleccionado} </Text>
									<Icon
										family={Icon.FONT_AWESOME}
										name="calendar"
										size={20}
										style={{ color: colors.lightBlue, marginLeft: 5 }}
									/>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				)
			}
		}
	}

	BodyToggle = IsToggle => {
		if (IsToggle) {
			return (
				<CreditCardListComponent
					filteredProducts={this.state.detailProducts}
					Currency={this.state.Currency}
					size={this.state.sizeDetail}
					isvisible={this.state.spinnerDetails}
					list={this.state.list}
				/>
			)
		} else {
			return (
				<AccountMovementCreditCardComponent
					filteredProducts={this.state.movementProducts}
					Currency={this.state.Currency}
					size={this.state.sizeMoviments}
					isvisible={this.state.spinnerMoviments}
					list={this.state.list}
					nextPage={this.state.movementsPage}
					onNextPage={this.onNextPage.bind(this)}
				/>
			)
		}
	}

	setNextPage(response) {
		var nextPage = 1
		if (
			response &&
			response.meta &&
			response.meta.numeroPaginaSiguiente &&
			this.state.movementsPage < response.meta.numeroPaginaSiguiente
		) {
			nextPage = response.meta.numeroPaginaSiguiente
		}
		this.setState({
			movementsPage: nextPage
		})
	}

	async setFirstPage() {
		await this.setState({ movementsPage: 1, movementProducts: [] })
	}

	async onNextPage() {
		await this.getCrediCardMovements()
	}

	async fechaConsulta() {
		var today = new Date()
		const inicio = '01'
		let fin = today.getDate()

		if (fin < 10) {
			fin = '0' + fin
		}
		let mes = today.getMonth() + 1

		if (mes < 10) {
			mes = '0' + mes
		}
		const year = today.getFullYear()

		this.setState({
			fechaInicio: year + '-' + mes + '-' + inicio,
			fechaFin: year + '-' + mes + '-' + fin
		})

	}

	async getCrediCardDetails() {
		this.setState({
			spinnerDetails: true,
			sizeDetail: SpinnerSize.get(),
			list: !this.state.list
		})
		try {
			var today = new Date()
			var month = today.getMonth() + 1
			var year = today.getYear() - 100
			const user = await StorageService.getItem('user')
			const tokenClient = await StorageService.getItem('token')

			const response = await axios.post(
				'/api-banca-movil-empresas/v1/consultaTarjetaCredito/consultas/tarjetaCredito',
				{
					productBankIdentifier: this.state.Product.productBankIdentifier,
					estado: {
						mes: month,
						ano: year
					}
				},
				{
					headers: {
						'tokenClient': tokenClient,
						'nombreUsuario': user.nombreLogin
					}
				}
			)

			await this.setState({
				NrAccount: response.data.datos.numeroTarjetaCredito,
				detailProducts: [
					{
						key: '1',
						TextTitle: 'SALDOS',
						TextAvailable: 'Línea disponible',
						TextCredit: 'Línea de crédito',
						TextMantle: 'Monto Utilizado (S/ - $)',
						ValueAvailable:
							this.state.Currency == 'USD'
								? '$ ' + Monetary.format(response.data.datos.montoRetiroEfectivoDolares)
								: 'S/ ' + Monetary.format(response.data.datos.montoRetiroEfectivoSoles),
						ValueCredit:
							this.state.Currency == 'USD'
								? '$ ' + Monetary.format(response.data.datos.lineaLimiteDolares)
								: 'S/ ' + Monetary.format(response.data.datos.lineaLimiteSoles),
						ValueMantle:
							'S/ ' + Monetary.format(response.data.datos.montoSoles) +
							' - ' + '$ ' + Monetary.format(response.data.datos.montoDolares)
					},
					{
						key: '2',
						TextTitle: 'ÚLTIMO CIERRE',
						TextAvailable: 'Pago total        (S/ - $)',
						TextMantle: 'Pago mínimo     (S/ - $)',
						ValueAvailable:
							'S/ ' + Monetary.format(response.data.datos.pagoTotalSoles) +
							' - ' + '$ ' + Monetary.format(response.data.datos.pagoTotalDolares),
						ValueMantle:
							'S/ ' + Monetary.format(response.data.datos.pagoMinimoSoles) +
							' - ' + '$ ' + Monetary.format(response.data.datos.PagoMinimoDolares)
					},
					{
						key: '3',
						TextTitle: 'INFORMACIÓN',
						TextAvailable: 'Cierre Facturación',
						TextCredit: 'Fecha de pago',
						TextMantle: 'Puntos Banbif',
						ValueAvailable: response.data.datos.fechaCierreFacturacion,
						ValueCredit: response.data.datos.fechaPago,
						ValueMantle: response.data.datos.puntosBanbif
					}
				]
			})
		} catch ( err ) {
			this.handleMessages(err)
		}
		this.setState({
			spinnerDetails: false,
			sizeDetail: 0,
			list: !this.state.list
		})
	}

	async getMonthsAndroid() {
		const date = new Date()
		const months = []
		for (let i = 0; i < 12; i++) {
			const ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0)
			months.push({
				'nombreMes': monthNames[date.getMonth()] + ' ' + date.getFullYear(),
				'ultimoDiaMes': date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ultimoDia.getDate()
			})
			date.setMonth(date.getMonth() - 1)
		}

		await this.setState({ meses: months })
	}

	async getMonthsIphone() {
		const date = new Date()
		const months = [],
			mesIndice = []
		for (let i = 0; i < 12; i++) {
			const ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0)
			months.push(monthNames[date.getMonth()] + ' ' + date.getFullYear())
			mesIndice.push(date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ultimoDia.getDate())
			date.setMonth(date.getMonth() - 1)
		}

		this.setState({ meses: months, mesesIndices: mesIndice })
	}

	updateMonth = async (value) => {
		const fecha = new Date(value)
		const startDate = (fecha.getFullYear() + '-' + ('0' + (fecha.getMonth() + 1)).slice(-2) + '-' + '01')
		await this.setState({ fechaSeleccionada: value })
		await this.setFirstPage()
		await this.setState({ fechaInicio: startDate, fechaFin: value })
		await this.getCrediCardMovements()
	}

	async getCrediCardMovements() {
		let that = this
		that.setState({
			spinnerMoviments: true,
			sizeMoviments: SpinnerSize.get(),
			list: !this.state.list,
			blocked: true
		})
		const user = await StorageService.getItem('user')
		const tokenClient = await StorageService.getItem('token')

		axios
		.post(
			'/api-banca-movil-empresas/v1/consultaTarjetaCredito/consultas/tarjetaCredito/movimientos',
			{
				ordenCampos: 'N/A',
				fechaInicio: this.state.fechaInicio,
				fechaFin: this.state.fechaFin,
				tarjetaCredito: {
					productBankIdentifier: this.state.Product.productBankIdentifier,
					numeroTarjetaCredito: this.state.Product.numero
				}
			},
			{
				headers: {
					numeroPagina: this.state.movementsPage,
					tokenClient: tokenClient,
					nombreUsuario: user.nombreLogin,
					'entidad': user.entidad
				}
			}
		)
		.then(response => {
			if (that.hasError(response)) {
				that.handleMessages(err)
				that.setState({
					spinnerMoviments: false,
					sizeMoviments: 0,
					list: !this.state.list
				})
			} else {
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

				const resposta = response.data.datos.map(element => {
					return {
						fechaConsumo: element.fechaMovimiento.replace(/\//g, '-'),
						fechaProceso: element.fechaProceso.replace(/\//g, '-'),
						numeroOperacion: element.numeroOperacion,
						descripcion: element.descripcion,
						montoDolares: element.tarjetaCredito.montoDolares,
						montoSoles: element.tarjetaCredito.montoSoles
					}
				})
				let newMovements = null
				if (this.state.movementsPage > 1) {
					newMovements = this.state.movementProducts
					newMovements.push(...resposta)
				} else {
					newMovements = resposta
				}
				that.setNextPage(response.data)
				that.setState({ spinnerMoviments: false, sizeMoviments: 0, list: !this.state.list })
				that.setState({ movementProducts: newMovements, blocked: false })
			}
		})
		.catch(err => {
			that.mensajePersonalizado(err)
			that.setState({
				spinnerMoviments: false,
				sizeMoviments: 0,
				list: !this.state.list,
				blocked: false,
				movementProducts: []
			})
		})
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

	mensajePersonalizado(err) {
		if (this.hasMessage(err)) {
			let messages
			if (err.response.data.meta.mensajes[0].mensaje === '!Registro no encontrado¡') {
				messages = [
					{
						mensaje: 'No presenta movimientos en el mes actual'
					}
				]
			} else {
				messages = err.response.data.meta.mensajes
			}
			this.setState({ messages })
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

	handleMessages(err) {
		if (this.hasMessage(err)) {
			this.setState({ messages: err.response.data.meta.mensajes })
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

	async UNSAFE_componentWillMount() {
		await this.getCrediCardDetails()
		Platform.OS !== 'ios' ? await this.getMonthsAndroid() : await this.getMonthsIphone()
		await this.fechaConsulta()
	}

	messageOk() {
		let _messages = this.state.messages
		_messages.pop()
		this.setState({ messages: _messages })

		if (this.state.messages.length == 0 && this.state.toggleBody) {
			this.props.navigation.navigate('MainMenu')
		}
	}

	async onClickFilterOption(buttonIndex) {
		if (typeof buttonIndex === 'number' && buttonIndex !== this.state.indice) {
			await this.setState({ mesSeleccionado: this.state.meses?.[buttonIndex], indice: buttonIndex })
			await this.updateMonth(this.state.mesesIndices[buttonIndex])
		}
		this.toggleMonthFilterOptions()
	}

	toggleMonthFilterOptions() {
		this.setState({ isMonthFilterOpen: !this.state.isMonthFilterOpen })
	}


	render() {
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

		return (
			<View style={{ paddingTop: 10, flex: 1, backgroundColor: colors.white }}>
				<TouchableOpacity
					onPress={async () => {
						if (this.state.toggleBody) {
							await this.setFirstPage()
							await this.fechaConsulta()
							await this.setState({ fechaSeleccionada: '', mesSeleccionado: this.state.meses?.[0], indice: 0 })
							await this.getCrediCardMovements()
						}
						return this.setState({
							toggleBody: !this.state.toggleBody,
							ColorLine: !this.state.ColorLine,

						})
					}}
					disabled={this.state.blocked}
				>
					<View style={{ flexDirection: 'column' }}>
						<View style={{ flexDirection: 'row' }}>
							<View style={styles.alignCenterFlex1}>
								<Text
									style={styles.blueLineAligCenter}
									ellipsizeMode="tail"
									numberOfLines={1}
								>
									DETALLE DEL PRODUCTO
								</Text>
							</View>

							<View style={styles.alignCenterFlex1}>
								<Text style={styles.blueLineAligCenter}>MOVIMIENTO</Text>
							</View>
						</View>
						<View>
							<View style={{ flexDirection: 'row', paddingTop: 10 }}>
								<View
									style={[
										{
											backgroundColor: !this.state.toggleBody
												? colors.lightGrey
												: colors.lightBlue
										},
										styles.line
									]}
								/>
								<View
									style={[
										{
											backgroundColor: this.state.toggleBody
												? colors.lightGrey
												: colors.lightBlue
										},
										styles.line
									]}
								/>
							</View>
						</View>
					</View>
				</TouchableOpacity>
				<DollarIconTextCreditCardComponent
					NrAccount={this.state.Product.numero}
					moneda={this.state.Currency}

				/>
				<EntidadNombre entidad={this.props.route.params?.entidad}/>
				<BlueLineWithTextComponent
					Text={
						this.state.toggleBody == true
							? strings.accountDetais.details
							: strings.accountDetais.movements
					}
				/>
				<View style={{ height: height - 247 }}>
					{this.MostrarFiltros(this.state.toggleBody)}
					{this.BodyToggle(this.state.toggleBody)}
				</View>
				{messageViews}

				<Actionsheet isOpen={this.state.isMonthFilterOpen} onClose={this.toggleMonthFilterOptions}>
					<Actionsheet.Content>
						<Box w="100%" h={60} px={4} justifyContent="center">
							<Text>
								Mes
							</Text>
						</Box>
						{
							this.state?.meses?.map((mes, index) => {
								return (
									<Actionsheet.Item
										key={mes + index}
										onPress={() => this.onClickFilterOption(index)}
									>
										{mes}
									</Actionsheet.Item>
								)
							})
						}
					</Actionsheet.Content>
				</Actionsheet>
			</View>
		)
	}
}
