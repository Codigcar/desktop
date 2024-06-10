import React, { Component } from 'react'
import { View, Text, Platform, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import styles from './Styles'
import strings from '../../assets/strings'
import colors from '../../assets/colors'
import DetailsComponent from '../../components/DetailsComponent/DetailsComponent'
import AccountMovementComponent from '../../components/AccountMovementComponent/AccountMovementComponent'
import AccountDetailComponent from '../../components/AccountDetailComponent/AccountDetailComponent'
import { default as axios } from '../../services/api'
import ModalErrorComponent from '../../components/ModalErrorComponent/ModalErrorComponent'
import monetaryType from '../../monetaryType/monetaryType'
import { SpinnerSize } from '../../utils/spinnerSize'
import { Monetary } from '../../utils/monetary'
import { Actionsheet } from 'native-base'
import Icon from '../../components/Icon'
import { StorageService } from '../../services/storage'

var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
export default class CheckingAccountDetails extends Component {
	constructor(props) {
		super(props)

		this.toggleMounthOptions = this.toggleMounthOptions.bind(this)
		this.onChooseMounth = this.onChooseMounth.bind(this)

		this.state = {
			blocked: false,
			movementsPage: 0,
			spinnerDetails: false,
			spinnerMovements: false,
			list: true,
			messages: [],
			toggleBody: true,
			Currency: this.props.route.params.Currency,
			NrAccount: this.props.route.params.NrAccount,
			entidad: this.props.route.params.entidad,
			NrCCI: this.props.route.params.NrCCI,
			ProductBankIdentifier: this.props.route.params.ProductBankIdentifier.toUpperCase(),
			Product: this.props.route.params.Product,
			ProductType: this.props.route.params.ProductType,
			SaldoActual: this.props.route.params.SaldoActual,
			SaldoDisponible: this.props.route.params.SaldoDisponible,
			detailProducts: [],
			movementProducts: [],
			meses: [],
			fechaSeleccionada: '',
			fechaInicio: null,
			fechaFin: null,
			mesesIndices: [],
			mesSeleccionado: '',
			indice: '',
			isMounthOptionsOpen: false
		}
	}

	async getCheckingAccountDetails() {
		this.setState({ spinnerDetails: true, list: !this.state.list })
		try {
			const user = await StorageService.getItem('user')
			const tokenClient = await StorageService.getItem('token')
			console.log('Api | Cuentas Corrientes y de Ahorros-CheckingAccountDetails.js: api-banca-movil-empresas/v1/productosEmpresa/consultas/detalleCuenta', {
				// 'tokenClient': tokenClient,
				'nombreUsuario': user.nombreLogin,
				'entidad': user.entidad,
				productBankIdentifier: this.state.ProductBankIdentifier
			})
			const response = await axios.post(
				'/api-banca-movil-empresas/v1/productosEmpresa/consultas/detalleCuenta',
				{
					productBankIdentifier: this.state.ProductBankIdentifier
				},
				{
					headers: {
						'tokenClient': tokenClient,
						'nombreUsuario': user.nombreLogin,
						'entidad': user.entidad
					}
				}
			).catch(error => {
				console.log('error', error, error?.response?.data, error.message)
			})
			await this.setState({
				spinnerDetails: false,
				list: !this.state.list,
				sizeDetails: 0,
				detailProducts: [
					{
						key: '1',
						text: 'Saldo Contable',
						value:
							monetaryType[this.state.Currency] +
							Monetary.format(response.data.datos.cuenta.saldoContable)
					},
					{
						key: '2',
						text: 'Saldo Disponible',
						value:
							monetaryType[this.state.Currency] +
							Monetary.format(response.data.datos.cuenta.saldoDisponible)
					}
				]
			})
		} catch ( err ) {
			console.log('err!!', err)
			this.handleMessages(err)
			this.setState({ spinnerDetails: false })
		}
		this.setState({ spinnerDetails: false })
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

	hasError(err) {
		return err && err.status != 200 && err.status != 201
	}

	setNextPage(response) {
		var nextPage = 1
		if (response && response.meta && response.meta.numeroPaginaSiguiente && this.state.movementsPage < response.meta.numeroPaginaSiguiente) {
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
		await this.getCheckingAccountMovements()
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

		this.setState({ meses: months })
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
		await this.getCheckingAccountMovements()
	}

	async getCheckingAccountMovements() {
		let that = this
		const user = await StorageService.getItem('user')
		const tokenClient = await StorageService.getItem('token')
		that.setState({ spinnerMovements: true, list: !this.state.list, blocked: true })
		axios
		.post('/api-banca-movil-empresas/v1/consultaCuenta/consultas/cuenta/movimientos', {
				cuenta: {
					productBankIdentifier: this.state.ProductBankIdentifier
				},
				tipoMovimiento: 'TODO',
				tipoBusca: 'FILTRO_FECHAS',
				fechaInicio: this.state.fechaInicio,
				fechaFin: this.state.fechaFin
			},
			{
				headers: {
					numeroPagina: this.state.movementsPage,
					tokenClient: tokenClient,
					nombreUsuario: user.nombreLogin,
					entidad: user.entidad
				}
			})
		.then(response => {
			if (that.hasError(response)) {
				that.handleMessages(err)
				that.setState({ spinnerMovements: false, list: !this.state.list })
			} else {
				let newMovements = null
				if (this.state.movementsPage > 1) {
					newMovements = this.state.movementProducts
					newMovements.push(...response.data.datos)
				} else {
					newMovements = response.data.datos
				}
				that.setNextPage(response.data)
				that.setState({
					movementProducts: newMovements,
					spinnerMovements: false,
					list: !this.state.list,
					blocked: false
				})
			}
		})
		.catch(err => {
			that.mensajePersonalizado(err)
			that.setState({ movementProducts: [], spinnerMovements: false, list: !this.state.list, blocked: false })
		})
	}

	mensajePersonalizado(err) {
		if (this.hasMessage(err)) {
			let messages
			if (err.response.data.meta.mensajes[0].mensaje === '¡Registro no encontrado!') {
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

	async UNSAFE_componentWillMount() {
		await this.fechaConsulta()
		Platform.OS !== 'ios' ? await this.getMonthsAndroid() : await this.getMonthsIphone()
		await this.getCheckingAccountDetails()
		// BackHandler.removeEventListener(
		//   'hardwareBackPress',
		//   this.handleBackButtonPressAndroid
		// )
	}

	handleBackButtonPressAndroid = () => {
		this.setState({ modalVisible: true })
		return true
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
										this.state.meses?.map((data) => {
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
							<TouchableOpacity onPress={this.toggleMounthOptions}>
								<View style={styles.monthFilter}>
									<Text style={styles.textFilterAction}>{this.state.mesSeleccionado} </Text>
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
				<DetailsComponent
					filteredProducts={this.state.detailProducts}
					isvisible={this.state.spinnerDetails}
					size={this.state.spinnerDetails ? SpinnerSize.get() : 0}
					list={this.state.list}
				/>
			)
		} else {
			return (

				<AccountMovementComponent
					filteredProducts={this.state.movementProducts}
					Currency={this.state.Currency}
					isvisible={this.state.spinnerMovements}
					size={this.state.spinnerMovements ? SpinnerSize.get() : 0}
					list={this.state.list}
					nextPage={this.state.movementsPage}
					onNextPage={this.onNextPage.bind(this)}
				/>
			)
		}
	}

	messageOk() {
		let _messages = this.state.messages
		_messages.pop()
		this.setState({ messages: _messages })

		if (this.state.messages.length == 0 && this.state.toggleBody) {
			this.props.navigation.navigate('MainMenu')
		}
	}

	async onChooseMounth(buttonIndex) {
		if (typeof buttonIndex === 'number' && buttonIndex !== this.state.indice) {
			await this.setState({ mesSeleccionado: this.state.meses?.[buttonIndex], indice: buttonIndex })
			await this.updateMonth(this.state.mesesIndices[buttonIndex])
		}
		this.toggleMounthOptions()
	}

	toggleMounthOptions() {
		this.setState({ isMounthOptionsOpen: !this.state.isMounthOptionsOpen })
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
			<View style={styles.container}>
				<TouchableOpacity
					onPress={async () => {
						if (this.state.toggleBody) {
							await this.setFirstPage()
							await this.fechaConsulta()
							await this.setState({ fechaSeleccionada: '', mesSeleccionado: this.state.meses?.[0], indice: 0 })
							await this.getCheckingAccountMovements()
						}
						return this.setState({
							toggleBody: !this.state.toggleBody,
							ColorLine: !this.state.ColorLine
						})
					}}
					disabled={this.state.blocked}
				>
					<View style={{ flexDirection: 'column' }}>
						<View style={{ flexDirection: 'row' }}>
							<View style={styles.alignCenterFlex2}>
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
				<AccountDetailComponent
					type={
						this.state.toggleBody
							? strings.accountDetais.details
							: strings.accountDetais.movements
					}
					NrAccount={this.state.NrAccount}
					entidad={this.state.entidad}
					NrCCI={this.state.NrCCI}
					SaldoActual={this.state.SaldoActual}
					SaldoDisponible={this.state.SaldoDisponible}
					moneda={this.state.Currency}

				/>
				{this.MostrarFiltros(this.state.toggleBody)}
				{this.BodyToggle(this.state.toggleBody)}
				{messageViews}

				<Actionsheet isOpen={this.state.isMounthOptionsOpen} onClose={this.toggleMounthOptions}>
					<Actionsheet.Content>
						{
							this.state.meses?.map((mounth, index) => {
								return (
									<Actionsheet.Item
										key={mounth + index}
										onPress={() => this.onChooseMounth(index)}
									>
										{mounth}
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
