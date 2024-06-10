import { StyleSheet } from 'react-native'
import colors from '../../assets/colors'

export default StyleSheet.create({
	ModalStyle: {
		alignItems: 'center'
	},
	ShadowContainerStyle: {
		backgroundColor: 'white',
		width: '90%',
		borderRadius: 5
	},
	ViewStyle: {
		alignItems: 'center',
		marginTop: 40
	},
	ViewText: {
		flexDirection: 'column',
		alignItems: 'center',
		alignContent: 'center',
		// paddingTop: 20,
		paddingBottom: 20
	},
	TextStyle: {
		fontSize: 16,
		paddingLeft: 25,
		paddingRight: 25,
		alignSelf: 'center',
		textAlign: 'center',
	},
	TextInputStyle: {
		height: 40,
		width: '70%',
		borderWidth: 1,
		marginLeft: 20,
		borderLeftWidth: 6,
		textAlign: 'left',
		paddingLeft: 20,
		color: colors.darkGrey,
		borderLeftColor: colors.lightBlue
	},
	ShadowContainerButton: {
		shadowRadius: 3,
		elevation: 2,
		alignItems: 'center',
		justifyContent: 'center'
	},
	TextButton: {
		fontSize: 14,
		color: '#fff',
		alignSelf: 'center',
		textAlign: 'center'
	},
	containerHorizontal: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	buttonContainerHorizontal: {
		flexDirection: 'row',
		width: '50%',
		alignItems: 'center',
		justifyContent: 'space-evenly'
	},
	appButtonContainer: {

		elevation: 8,
		backgroundColor: '#20A3FF',
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 12
	},
	title: {
		fontSize: 20,
		fontWeight: '700',
		color: "#20A6FF",
		marginBottom: 5,

	},
	linearGradient: {
		paddingLeft: 15,
		paddingRight: 15,
		height: 48,
		width: 200,
		borderRadius: 50,
		marginBottom: 30,

	},
	buttonText: {
		fontSize: 18,
		fontFamily: 'Gill Sans',
		textAlign: 'center',
		margin: 10,
		color: colors.white,
	},
})