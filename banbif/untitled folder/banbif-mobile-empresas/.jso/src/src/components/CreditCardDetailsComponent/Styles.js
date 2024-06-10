  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _default = exports.default = _reactNative.StyleSheet.create({
    box: {
      borderColor: _colors.default.extraLightGrey,
      borderWidth: 0,
      shadowColor: _colors.default.black,
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
      shadowColor: _colors.default.darkGrey,
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 3
    },
    View: {
      backgroundColor: _colors.default.white,
      paddingLeft: 10,
      paddingBottom: 10,
      paddingTop: 5
    },
    Day: {
      color: _colors.default.white,
      flex: 1
    },
    Doa: {
      color: _colors.default.white,
      flex: 3
    },
    History: {
      color: _colors.default.white,
      flex: 3
    },
    Value: {
      color: _colors.default.white,
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
      backgroundColor: _colors.default.listGrey,
      paddingLeft: 10,
      alignContent: "flex-start",
      justifyContent: "flex-start",
      textAlign: "left",
      paddingBottom: 10,
      paddingTop: 10
    },
    whiteList: {
      flexDirection: "row",
      backgroundColor: _colors.default.white,
      paddingLeft: 10,
      paddingBottom: 10,
      alignContent: "flex-start",
      justifyContent: "flex-start",
      textAlign: "left"
    },
    textTitle: {
      fontSize: 14,
      color: "#000000",
      fontWeight: _reactNative.Platform.OS === "ios" ? "bold" : "normal",
      opacity: 0.87
    }
  });
