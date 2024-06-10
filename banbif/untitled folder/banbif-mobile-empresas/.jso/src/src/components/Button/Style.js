  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _default = exports.default = _reactNative.StyleSheet.create({
    ShadowContainerButton: {
      shadowRadius: 3,
      elevation: 2,
      alignItems: "center",
      justifyContent: "center"
    },
    TextButton: {
      color: _colors.default.white
    }
  });
