import { StyleSheet } from "react-native";
import colors from "../../assets/colors";

export default StyleSheet.create({
  ViewColor: {
    backgroundColor: colors.lightBlue,
    width: "100%",
    height: 35
  },
  TextColor: {
    color: colors.white,
    fontSize: 17,
    paddingLeft: 25,
    paddingTop: 6,
    opacity: 0.8
  }
});
