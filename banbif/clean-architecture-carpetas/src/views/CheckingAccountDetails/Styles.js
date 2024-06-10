import { StyleSheet } from "react-native";
import colors from "../../assets/colors";
import { Row } from "native-base";

export default StyleSheet.create({
  containerView: {
    flex: 1,
    paddingTop: 10
  },
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
    paddingHorizontal: 5,
  },
  container: {
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: colors.white,
    flex: 1
  },

  line: {
    width: "50%",
    height: 6
  },
  alignCenterFlex1: {
    alignContent: "center",
    flex: 1
  },
  alignCenterFlex2: {
    alignContent: "center",
    flex: 1,

  },
  blueLineAligCenter: {
    color: colors.lightBlue,
    alignSelf: "center",
    paddingLeft: 20
  },
  filterPicker: {
    flex: 3,
    flexDirection: "row",
    fontSize: 16,
    color: colors.lightBlue,
  },
  contentAction: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 35
  },
  viewTextAction: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 3,
    borderColor: colors.lightBlue,
    height: 35
  },
  textAction: {
    fontSize: 16,
    color: colors.lightBlue,
  },
  monthFilter: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  filterAction: {
    flex: 3,
    flexDirection: "row",
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.lightBlue,
  },
  textFilterAction: {
    fontSize: 16,
    color: colors.lightBlue
  }
});
