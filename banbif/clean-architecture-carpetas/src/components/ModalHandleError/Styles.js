import { StyleSheet } from "react-native";
import colors from "../../assets/colors";

export default StyleSheet.create({
  ModalStyle: {
    alignItems: "center"
  },
  ShadowContainerStyle: {
    backgroundColor: "white",
    height: 275,
    width: 300
  },
  ViewStyle: {
    alignItems: "center",
    marginTop: 40
  },
  ViewText: {
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    paddingTop: 20,
    paddingBottom: 20
  },
  TextStyle: { paddingLeft: 25, paddingRight: 25, alignSelf: "center" },
  ViewButtonStyle: {
    flexDirection: "row",
    width: "70%",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  TextInputStyle: {
    height: 40,
    width: "70%",
    borderWidth: 1,
    marginLeft: 20,
    borderLeftWidth: 6,
    textAlign: "left",
    paddingLeft: 20,
    color: colors.darkGrey,
    borderLeftColor: colors.lightBlue
  },
  ShadowContainerButton: {
    shadowRadius: 3,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  TextButton: {
    color: colors.white
  }
});
