import { StyleSheet } from "react-native";
import colors from "../../assets/colors";

export default StyleSheet.create({
  box: {
    borderColor: colors.extraLightGrey,
    borderWidth: 0,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 4,
    paddingHorizontal: 5
  },
  viewContainer: { paddingTop: 5, paddingHorizontal: 10, paddingBottom: 5 },
  container: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: colors.darkGrey,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  }
});
