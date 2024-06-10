import { StyleSheet } from "react-native";
import colors from "../../assets/colors";

export default StyleSheet.create({
	view: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 10,
		paddingBottom: 10,
		paddingTop: 10,
		flexWrap: "wrap",
		backgroundColor: colors.white
	},
	blueDollar: {
		color: colors.lightBlue
	},

	headerOuterContainer1: {
		marginLeft: 10,
		flex: 4,
		alignContent: "flex-start",
		// alignSelf: "flex-start",
	},
	headerOuterContainer2: {
		marginLeft: 10,
		flex: 4,
		alignContent: "flex-start",
		alignSelf: "flex-start"
	},
	titleContainer: {
		marginBottom: 5,
		flexDirection: "row"
	},
	titleFont: {
		fontSize: 17,
		opacity: 1
	},
	accountFont: {
		fontSize: 17,
		opacity: 0.6,
		flexWrap: "wrap"
	},

	right: {
		alignItems: "flex-end",
		flex: 1
	},
});
