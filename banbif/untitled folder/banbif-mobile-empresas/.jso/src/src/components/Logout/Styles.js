  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _default = exports.default = _reactNative.StyleSheet.create({
    container: {
      width: 30,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    title: {
      color: _colors.default.white,
      fontSize: 17
    },
    icon: {
      color: _colors.default.white
    }
  });
