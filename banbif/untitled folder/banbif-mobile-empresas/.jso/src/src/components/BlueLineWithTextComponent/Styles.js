  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _default = exports.default = _reactNative.StyleSheet.create({
    ViewColor: {
      backgroundColor: _colors.default.lightBlue,
      width: "100%",
      height: 35
    },
    TextColor: {
      color: _colors.default.white,
      fontSize: 17,
      paddingLeft: 25,
      paddingTop: 6,
      opacity: 0.8
    }
  });
