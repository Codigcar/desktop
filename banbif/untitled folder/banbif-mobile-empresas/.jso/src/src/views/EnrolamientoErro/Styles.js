  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _default = exports.default = _reactNative.StyleSheet.create({
    IconAndTextInputContainer: {
      flexDirection: "row",
      padding: 10,
      alignContent: "center",
      alignItems: "center",
      marginTop: 20
    },
    TextInputStyle: {
      height: 40,
      width: "70%",
      borderWidth: 1,
      marginLeft: 10,
      borderLeftWidth: 6,
      textAlign: "left",
      paddingLeft: 20,
      color: _colors.default.darkGrey,
      borderLeftColor: _colors.default.lightBlue
    },
    text: {
      fontSize: 15,
      color: _colors.default.darkGrey
    },
    padding20: {
      paddingTop: 20,
      paddingLeft: 20
    },
    padding40: {
      paddingTop: 40
    },
    paddingTop20: {
      paddingTop: 20
    },
    container: {
      alignItems: 'center',
      alignContent: 'center',
      flex: 1,
      backgroundColor: _colors.default.white,
      justifyContent: "center",
      marginTop: -130
    }
  });
