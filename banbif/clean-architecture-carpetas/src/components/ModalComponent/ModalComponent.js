import Modal from 'react-native-modal'
import React, { Component } from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import PropTypes from 'prop-types'
import Icon from '../Icon'
import Style from './Styles'
import LinearGradient from 'react-native-linear-gradient'

export default class ModalComponent extends Component {
	render() {
		return (
			<Modal {...this.props} style={Style.ModalStyle}>
				<View style={Style.ShadowContainerStyle}>
					<View style={Style.ViewStyle}>
						{
							this.props?.iconModal !== null &&
							<Icon
								{...this.props.iconModal}
							/>
						}
						<Text style={Style.TextStyle}>{this.props.textModal}</Text>
						<View style={Style.ViewButtonStyle}>

							<LinearGradient
								colors={['#AD96DC', '#20A6FF']}
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 0 }}
								style={Style.linearGradient}
							>
								<TouchableHighlight
									underlayColor="none"
									onPress={() => {
										this.props.yesButtonAction && this.props.yesButtonAction()
									}}>
									<Text style={Style.buttonText}>
										{this.props.yesButtontext ?? 'Si'}
									</Text>
								</TouchableHighlight>
							</LinearGradient>

							<TouchableHighlight
								style={Style.noButtonContainer}
								underlayColor="none"
								onPress={() => {
									this.props.onClose()
								}}>
								<Text style={Style.noButtonText}>
									{this.props.noButtontext ?? 'No'}
								</Text>
							</TouchableHighlight>

						</View>
					</View>
				</View>
			</Modal>
		)
	}
}


ModalComponent.propTypes = {
	yesButtonAction: PropTypes.func,
	onClose: PropTypes.func,
	textModal: PropTypes.string,
	iconModal: PropTypes.object,
}

ModalComponent.defaultProps = {
	buttons: [],
}
