import { StyleSheet } from "react-native";
import colors from "../../assets/colors";

export default StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingBottom: 10,
    paddingTop: 10,
    flexWrap: "wrap"
  },
  blueDollar: {
    color: colors.lightBlue
  },
  headerOuterContainer: {
    marginLeft: 25,
    flex: 1
  },
  headerOuterContainer1: {
    marginLeft: 10,
    flex: 4
  },
  headerOuterContainer2: {
    marginLeft: 10,
    flex: 4
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
