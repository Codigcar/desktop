import React, { Component } from 'react'
import { Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import ShadowContainer from '../ShadowContainer'
import Style from './Styles'
import { ErrorStateService } from '../../services/errorState'

import { SvgXml } from 'react-native-svg'
import LinearGradient from 'react-native-linear-gradient'

const xml = `
<svg width="70" height="85" viewBox="0 0 70 85" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M36.4848 85.0007C48.5633 85.0007 58.3535 83.6019 58.3535 81.7836C58.3535 79.9652 48.5758 78.5664 36.4848 78.5664C24.3939 78.5664 14.6161 79.9652 14.6161 81.7836C14.6161 83.6019 24.4064 85.0007 36.4848 85.0007Z" fill="#F3F3F3"/>
<path d="M59.9307 6L12 58.1743C33.2625 78.9712 52.7895 65.8963 59.9307 58.1743C74.346 39.0588 67.7136 20.6152 63.8949 11.6442L59.9307 6Z" fill="#F0F2FF"/>
<path d="M69 35.3723C69 54.3657 53.7677 69.7447 35 69.7447C16.2323 69.7447 1 54.3657 1 35.3723C1 16.379 16.2323 1 35 1C53.7677 1 69 16.379 69 35.3723Z" stroke="#20A6FF" stroke-width="2"/>
<path d="M23.6154 23.0723L46.983 46.4399" stroke="#F87777" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M23 46.3846L35 34.6923L47 23" stroke="#F87777" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`


export default class ModalErrorComponent extends Component {
	constructor(props) {
		super(props)

		this.state = {
			modalError: ErrorStateService.getIsLogout() ? false : this.props.Visibility
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState({
			modalError: ErrorStateService.getIsLogout() ? false : nextProps.Visibility,
		})
	}

	setModalVisible(visible) {
		this.setState({ modalError: visible })

	}

	render() {

		return (
			<View style={Style.container}{...this.props}>

				<Modal isVisible={this.state.modalError} style={Style.ModalStyle}>
					<ShadowContainer style={Style.ShadowContainerStyle}>
						<View style={Style.ViewStyle}>
							<SvgXml xml={xml}/>
							<View
								style={Style.ViewText}
							>
								{
									this.props.title?.length > 0 &&
									<Text style={Style.title}>
										{this.props.title}
									</Text>
								}
								<Text style={Style.TextStyle} ellipsizeMode="tail">
									{this.props.TextError}
								</Text>
								{
									this.props.TextError1?.length > 0 &&
									<Text style={Style.TextStyle} ellipsizeMode="tail">
										{this.props.TextError1}
									</Text>
								}
							</View>

							{/*<View style={Style.ViewButtonStyle}>*/}
								<LinearGradient
									colors={['#AD96DC', '#20A6FF']}
									start={{ x: 0, y: 0 }}
									end={{ x: 1, y: 0 }}
									style={Style.linearGradient}
								>
									<TouchableHighlight
										underlayColor="none"
										onPress={() => {
											this.setModalVisible(!this.state.modalError)
											this.props.Callback && this.props.Callback()
										}}>
										<Text style={Style.buttonText}>
											Cerrar
										</Text>
									</TouchableHighlight>
								</LinearGradient>
							{/*</View>*/}
						</View>
					</ShadowContainer>
				</Modal>
			</View>
		)
	}
}
