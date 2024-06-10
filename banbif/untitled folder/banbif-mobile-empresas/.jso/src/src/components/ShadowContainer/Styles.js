  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _default = exports.default = _reactNative.StyleSheet.create({
    container: {
      shadowColor: _colors.default.black,
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 1,
      backgroundColor: _colors.default.white
    }
  });
