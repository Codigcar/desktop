import { StyleSheet, Platform } from "react-native";
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
  container: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: colors.darkGrey,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3
  },
  View: {
    backgroundColor: colors.white,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingTop: 5
  },
  Day: {
    color: colors.white,
    flex: 1
  },

  Doa: {
    color: colors.white,
    flex: 3
  },
  History: {
    color: colors.white,
    flex: 3
  },
  Value: {
    color: colors.white,
    flex: 2
  },
  list: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    textAlign: "left",
    paddingRight: 10
  },
  greyList: {
    flexDirection: "row",
    backgroundColor: colors.listGrey,
    paddingLeft: 10,
    alignContent: "flex-start",
    justifyContent: "flex-start",
    textAlign: "left",
    paddingBottom: 10,
    paddingTop: 10
  },
  whiteList: {
    flexDirection: "row",
    backgroundColor: colors.white,
    paddingLeft: 10,
    paddingBottom: 10,
    alignContent: "flex-start",
    justifyContent: "flex-start",
    textAlign: "left"
  },
  textTitle: {
    fontSize: 14,
    color: "#000000",
    fontWeight: Platform.OS === "ios" ? "bold" : "normal",
    opacity: 0.87
  }
});
