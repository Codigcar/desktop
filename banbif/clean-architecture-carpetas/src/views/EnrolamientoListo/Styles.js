import { StyleSheet } from 'react-native'
import colors from '../../assets/colors'

export default StyleSheet.create({
	container: {
		alignItems: 'center',
		alignContent: 'center',
		backgroundColor: colors.white,
		flex: 1,
		paddingTop: 120,
	},
	title: {
		fontSize: 24,
		fontWeight: '700',
		color: '#20A6FF',
		marginTop: 30,
		marginBottom: 17,
	},
	description: {
		fontSize: 16,
		fontWeight: '600',
		color: '#5B5B5B',
		marginBottom: 8,
	},
	linearGradient: {
		marginTop: 33,
		height: 48,
		width: '100%',
		borderRadius: 50,
	},
	container2: {
		width: '85%',
	},
	buttonText: {
		fontSize: 16,
		fontWeight: '500',
		fontFamily: 'Gill Sans',
		textAlign: 'center',
		margin: 12,
		color: colors.white,
	},
	considerations: {
		marginTop: 26,
		width: '100%',
		backgroundColor: '#F6FAFE',
		paddingVertical: 30,
		paddingHorizontal: 21,
	},
	row: {
		flexDirection: 'row',
		marginTop: 15,
		fontSize: 14,
	},
	bullet: {
		marginTop: 5,
		width: 10,
		height: 10,
		backgroundColor: '#AD96DC',
		borderRadius: 50,
		marginRight: 9,
	},
})
