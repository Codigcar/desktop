import { StyleSheet } from "react-native";
import colors from "../../assets/colors";

export default StyleSheet.create({
  ModalStyle: {
    alignItems: "center"
  },
  ShadowContainerStyle: {
    backgroundColor: "rgba(0,0,0,0.0)",
    height: 320,
    width: 300,
    zIndex: 1,
    paddingBottom: 30
  },
  Touchable: {
    elevation: 2,
    zIndex: 2,
    width: 32,
    alignSelf: "flex-end"
  },
  ViewIcon: {
    elevation: 2,
    zIndex: 2,
    backgroundColor: colors.white,
    paddingHorizontal: 3,
    width: 30,
    borderRadius: 17,
    alignSelf: "flex-end"
  },
  ViewStyle: {
    alignItems: "center",
    marginTop: -15,
    width: 285,
    backgroundColor: colors.white,
    marginLeft: 7.5,
    paddingBottom: 40
  },
  ViewText: {
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    paddingTop: 30,
    paddingBottom: 20,
    zIndex: 3,
    elevation: 3
  },
  TextStyle: {
    marginTop: 15,
    marginBottom: 10
  },
  ViewButtonStyle: {
    flexDirection: "row",
    width: "70%",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingTop: 20
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
    justifyContent: "center",
    backgroundColor: colors.lightBlue,
    width: 138,
    height: 37
  },
  TextButton: {
    color: colors.white
  }
});
