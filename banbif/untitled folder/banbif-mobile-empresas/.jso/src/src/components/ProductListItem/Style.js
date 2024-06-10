  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _default = exports.default = _reactNative.StyleSheet.create({
    row: {
      flexDirection: 'row'
    },
    centered: {
      alignItems: 'center'
    },
    right: {
      alignItems: 'flex-end',
      flex: 1
    },
    text: {
      color: _colors.default.black,
      fontSize: 19
    },
    flex4: {
      flex: 4
    },
    blue: {
      color: _colors.default.lightBlue
    }
  });
