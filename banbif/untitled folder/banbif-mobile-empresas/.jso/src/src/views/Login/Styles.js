  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var height = _reactNative.Dimensions.get('window').height;
  var _default = exports.default = _reactNative.StyleSheet.create({
    LoginContainer: {
      height: "100%",
      backgroundColor: _colors.default.white
    },
    LogoContainer: {
      alignItems: "center",
      paddingTop: 30
    },
    ContentContainer: {
      alignItems: "center",
      paddingTop: 30
    },
    IconAndTextInputContainer: {
      flexDirection: "row",
      padding: 10,
      alignContent: "center",
      alignItems: "center"
    },
    TextInputStyle: {
      height: 40,
      width: "70%",
      borderWidth: 1,
      marginLeft: 20,
      borderLeftWidth: 6,
      textAlign: "left",
      paddingLeft: 20,
      color: _colors.default.darkGrey
    },
    ForgotPassword: {
      flexDirection: 'row',
      alignItems: "center",
      width: "90%",
      paddingRight: 30
    },
    PaddingTopView: {
      paddingTop: 15
    },
    TextCheckBoxStyle: {
      color: "gray",
      fontWeight: "normal"
    },
    ContainerSofttoken: {
      alignContent: "center",
      backgroundColor: _colors.default.lightBlue,
      alignItems: "center",
      width: 150
    },
    ViewSofttoken: {
      alignItems: "center",
      justifyContent: 'center',
      width: 160,
      height: 40,
      flexDirection: "row"
    },
    TextSofttoken: {
      color: _colors.default.white,
      paddingLeft: 10,
      fontSize: 14
    }
  });
