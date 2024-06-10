import { StyleSheet } from 'react-native'
import colors from '../../assets/colors'

export default StyleSheet.create({
	ModalStyle: {
		alignItems: 'center'
	},
	ShadowContainerStyle: {
		backgroundColor: 'white',
		minHeight: 304,
		width: 360,
		borderRadius: 8,
	},
	ViewStyle: {
		alignItems: 'center',
		marginTop: 20
	},
	ViewButtonStyle: {
		flexDirection: 'row',
		width: '70%',
		alignItems: 'center',
		marginBottom: 30,
	},
	viewText: {
		flexDirection: 'column',
		alignItems: 'center',
		alignContent: 'center',
		paddingTop: 20,
		paddingBottom: 30,
	},
	message: {
		fontSize: 16,
		fontWeight: '600',
		lineHeight: 24,
		color: '#5B5B5B',
		textAlign: 'center'
	},
	title: {
		fontSize: 20,
		fontWeight: '700',
		lineHeight: 24,
		color: '#20A6FF',
		marginBottom: 10
	},
	linearGradient: {
		flex: 1,
		paddingLeft: 15,
		paddingRight: 15,
		height: 48,
		width: 240,
		borderRadius: 50,

	},
	buttonText: {
		fontSize: 18,
		fontFamily: 'Gill Sans',
		textAlign: 'center',
		margin: 10,
		color: colors.white,
		// backgroundColor: 'transparent',
	},
})
