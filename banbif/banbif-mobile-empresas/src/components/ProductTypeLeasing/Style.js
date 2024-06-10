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
	},
	blueDollar: {
		color: colors.lightBlue
	},
	titleContainer: {
		flexDirection: 'row',
		paddingBottom: 5,
		alignContent: "space-between",
		justifyContent: "space-between"
	},
	titleFont: {
		fontSize: 17,
		opacity: 1,
	},
	accountFont: {
		fontSize: 17,
		opacity: 0.6,
		flexWrap: "wrap",
		alignSelf: "flex-end",
	},
	headerOuterContainer: {
		flex: 8,
		flexDirection: "column"
	},
});
