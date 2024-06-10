  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _default = exports.default = _reactNative.StyleSheet.create({
    sideBar: {
      position: 'absolute',
      elevation: 2,
      backgroundColor: _colors.default.white,
      top: 0,
      right: 70,
      left: 0,
      bottom: 0
    },
    headerContainer: {
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      elevation: 0,
      borderBottomColor: _colors.default.grey,
      borderBottomWidth: 1
    },
    blue: {
      color: _colors.default.lightBlue
    },
    headerOuterContainer: {},
    titleContainer: {
      marginBottom: 5
    },
    titleFont: {
      fontSize: 19,
      opacity: 0.87
    },
    accountFont: {
      fontSize: 19,
      opacity: 0.54
    }
  });
