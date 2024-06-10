  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _default = exports.default = _reactNative.StyleSheet.create({
    container: {
      backgroundColor: _colors.default.white,
      flex: 1
    },
    separator: {
      borderWidth: 1,
      borderColor: _colors.default.grey,
      marginBottom: 5,
      marginTop: 5
    },
    pageContainer: {
      width: 90,
      flexDirection: 'row',
      alignSelf: 'center',
      marginTop: 10,
      alignContent: 'center',
      height: 100
    },
    pageIcon: {
      backgroundColor: _colors.default.white,
      borderColor: _colors.default.lightBlue,
      borderWidth: 1,
      borderRadius: 10,
      width: 20,
      height: 20,
      shadowOpacity: 0,
      shadowColor: _colors.default.white,
      shadowRadius: 0,
      marginTop: 5
    },
    pageIconText: {
      color: _colors.default.lightBlue,
      paddingLeft: 2,
      marginTop: _reactNative.Platform.OS === 'ios' ? -2 : -5
    },
    pageText: {
      marginLeft: 5,
      color: _colors.default.lightBlue,
      marginTop: 7
    },
    textNotFound: {
      flex: 1,
      alignItems: "center",
      alignSelf: "center",
      paddingTop: 15
    }
  });
