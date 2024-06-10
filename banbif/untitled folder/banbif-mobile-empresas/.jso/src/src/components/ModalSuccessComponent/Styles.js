  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _default = exports.default = _reactNative.StyleSheet.create({
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
    TextStyle: {
      marginTop: 15,
      marginBottom: 10
    },
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
      color: _colors.default.darkGrey,
      borderLeftColor: _colors.default.lightBlue
    },
    viewText: {
      flexDirection: "column",
      alignItems: "center",
      alignContent: "center",
      paddingTop: 30,
      paddingBottom: 30,
      paddingHorizontal: 15
    },
    ShadowContainerButton: {
      shadowRadius: 3,
      elevation: 2,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: _colors.default.lightBlue,
      width: 138,
      height: 37
    },
    TextButton: {
      color: _colors.default.white
    }
  });
