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
      backgroundColor: _colors.default.white,
      paddingHorizontal: 3,
      width: 30,
      borderRadius: 17,
      alignSelf: "flex-end"
    },
    ViewStyle: {
      alignItems: "center",
      marginTop: -15,
      width: 285,
      backgroundColor: _colors.default.white,
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
      color: _colors.default.darkGrey,
      borderLeftColor: _colors.default.lightBlue
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
