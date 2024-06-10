  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _images = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _Styles = _$$_REQUIRE(_dependencyMap[4]);
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[5]);
  var SecurityScreen = function SecurityScreen() {
    return (0, _jsxRuntime.jsx)(_reactNative.View, {
      style: _Styles.styles.container,
      children: (0, _jsxRuntime.jsx)(_reactNative.Image, {
        style: _Styles.styles.image,
        source: _images.default.logoTextoLogin
      })
    });
  };
  var _default = exports.default = SecurityScreen;
