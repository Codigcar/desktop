import React from "react";
import { View, Text, AppState, Image, BackHandler } from "react-native";
import Icon from '../../components/Icon';
import colors from "../../assets/colors";
import Style from "./Style";
import DetectID from '../../modules/DetectID';
import ModalHandleError from "../../components/ModalHandleError";
import { ProgressBar } from 'react-native-paper';
import images from '../../assets/images';
import { HeaderBackButton } from "@react-navigation/elements";

export default class SoftTokenLogin extends ModalHandleError {
	constructor(props) {
		super(props);
		this.state = Object.assign(this.state, {
			isConected: true,
			timer: null,
			code: null,
			redirect: true,
			redirectRoute: 'Login',
			appState: AppState.currentState
		});
	}

	async resetToken() {

		try {
			this.setState({
				timer: (await DetectID.getTokenTimeStepValue()) / 100.0,
				code: await DetectID.getTokenValue()
			});
			clearInterval(this.interval);
			this.interval = setInterval(
				() => {
					this.setState(async () => ({ timer: (await DetectID.getTokenTimeStepValue()) / 100.0 }))
					this.resetToken()
				},
				2000
			);
		} catch (e) {
			this.handleMessages(e);
		}
	}
	async componentDidMount() {
		await this.setState({ isConected: this.props.route.params.isConnected })
		this.appStateSubscription = AppState.addEventListener('change', this._handleAppStateChange);
		await this.resetToken();
	}


	async componentDidUpdate() {
		if (this.state.timer >= 1) {
			await this.resetToken();
		}
	}



	componentWillUnmount() {
		this.appStateSubscription.remove()
		clearInterval(this.interval);
	}

	_handleAppStateChange = (nextAppState) => {
		if (
			this.state.appState.match(/inactive|background/) &&
			nextAppState === 'active'
		) {
			if (this.props.route.params.isConnected === true) {
				return this.props.navigation.navigate("Login")
			}

		}
		this.setState({ appState: nextAppState });
	}

	render() {

		return (
			<View style={Style.viewContainer}>
				<View style={{ paddingTop: 20 }}>
					<HeaderBackButton tintColor={colors.lightBlue} onPress={() => {
						this.state.isConected === true ? this.props.navigation.navigate("Login") : BackHandler.exitApp()
					}} />
				</View>
				{/* {this.getModals()} */}
				<View>
					<View style={Style.contentContainer}>
						<Image style={{ width: 139, height: 63 }} source={images.logoTextoLogin}></Image>
					</View>
					<View style={Style.claveUsoPersonal}>
						<Icon
							size={30}
							name="ios-information-circle"
							family={Icon.IONICONS}
							color={colors.lightGrey}
						/>
						<Text style={Style.view}>¡La clave es de uso personal,</Text>
						<Text style={Style.view}>no la compartas con nadie!</Text>
					</View>
					<View style={Style.token}>
						<Text style={Style.view}>Token Digital</Text>
						<Text style={Style.text1}>{this.state.code}</Text>
					</View>
					<View style={{ paddingTop: 5 }}>
						<ProgressBar
							progress={this.state.timer}
							color={colors.lightBlue}
							style={{ width: '100%', height: 15 }}
						/>
					</View>
					<View style={{ paddingTop: 5 }}>
						<Text style={Style.view} >Esta clave expira cada 60 segundos</Text>
					</View>
					<View style={Style.contenedorRecuerda}>
						<Text style={Style.tituloRecuerda}>Recuerda: </Text>
						<View style={{ paddingTop: 5 }}>
							<Text style={Style.view}>* El token digital es una clave de 6</Text>
							<Text style={Style.view}>   digitos, utilizala para aprobar tus</Text>
							<Text style={Style.view}>   operaciones por el APP o la Web.</Text>
						</View>
						<View style={{ paddingTop: 5 }}>
							<Text style={Style.view}>* Solo puedes utilizar una clave por</Text>
							<Text style={Style.textoRecuerda}>    operación.</Text>
						</View>
					</View>
				</View>
			</View>

		);
	}
}
