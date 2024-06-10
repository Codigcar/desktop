  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _default = exports.default = _reactNative.StyleSheet.create({
    shadowContainer: {
      margin: 7,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: _colors.default.lightLightGrey
    },
    innerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      width: _reactNative.Dimensions.get('window').width / 2 - 31,
      height: 150
    },
    blue: {
      color: _colors.default.lightBlue
    },
    text: {
      fontSize: _reactNative.Dimensions.get('window').width > 350 ? 15 : 12,
      textAlign: 'center'
    }
  });
