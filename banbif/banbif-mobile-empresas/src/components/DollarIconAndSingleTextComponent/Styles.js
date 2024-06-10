import { StyleSheet } from "react-native";
import colors from "../../assets/colors";

export default StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  blueDollar: {
    color: colors.lightBlue
  },

  headerOuterContainer: {
    marginLeft: 15,
    flex: 5
  },
  titleContainer: {
    marginBottom: 5
  },
  titleFont: {
    fontSize: 17,
    opacity: 1
  },
  accountFont: {
    fontSize: 17,
    opacity: 0.6
  },

  right: {
    alignItems: "flex-end",
    flex: 1
  }
});
