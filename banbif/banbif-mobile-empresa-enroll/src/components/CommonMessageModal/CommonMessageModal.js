import React, { useState } from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import Modal from 'react-native-modal'
import ShadowContainer from '../ShadowContainer'
import { SvgXml } from 'react-native-svg'
import Style from './Styles'
import LinearGradient from 'react-native-linear-gradient'
import { errorIcon, informativeIcon, successIcon } from '../../utils/svg'
import PropTypes from 'prop-types'

export const MODAL_TYPES = {
	SUCCESS: 'success',
	ERROR: 'error',
	WARNING: 'warning'
}

const CommonMessageModal = ({ visible, title, text, callback, buttonText, status, text1 }) => {

	// const [state, setState] = useState(visible)
	const getIcon = () => {
		switch (status) {
			case MODAL_TYPES.SUCCESS:
				return successIcon
			case MODAL_TYPES.ERROR:
				return errorIcon
			case MODAL_TYPES.WARNING:
				return informativeIcon
			default:
				return errorIcon
		}
	}
	return (
		<TouchableHighlight
		>
			<View style={Style.container}>
				<Modal isVisible={visible} style={Style.ModalStyle}>
					<ShadowContainer style={Style.ShadowContainerStyle}>
						<View style={Style.ViewStyle}>
							<SvgXml xml={getIcon()}/>
							<View
								style={Style.viewText}
							>
								{
									title &&
									<Text style={Style.title}>
										{title}
									</Text>
								}
								<Text
									ellipsizeMode="tail"
									style={Style.message}
								>
									{text}
								</Text>
								{
									text1 &&
									<Text
										ellipsizeMode="tail"
										style={Style.message}
									>
										{text1}
									</Text>
								}
							</View>
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
											callback && callback()
										}}>
										<Text style={Style.buttonText}>
											{buttonText}
										</Text>
									</TouchableHighlight>
								</LinearGradient>
							</View>
						</View>
					</ShadowContainer>
				</Modal>
			</View>
		</TouchableHighlight>
	)
}

export default CommonMessageModal


CommonMessageModal.propTypes = {
	status: PropTypes.string,
	visible: PropTypes.bool,
	title: PropTypes.string,
	text: PropTypes.string.isRequired,
	buttonText: PropTypes.string,
	callback: PropTypes.func,
}

CommonMessageModal.defaultProps = {
	visible: false,
	title: '',
	text: '',
	buttonText: 'Aceptar',
	status: MODAL_TYPES.ERROR,
	callback: () => {
	},
}
