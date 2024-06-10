  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _default = exports.default = _reactNative.StyleSheet.create({
    title: {
      color: _colors.default.white,
      fontSize: 17
    },
    icon: {
      color: _colors.default.white
    },
    headerContainer: {
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center'
    },
    blue: {
      color: _colors.default.lightBlue
    },
    headerOuterContainer: {
      marginLeft: 15
    },
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
    },
    menuLine: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    sideBar: {
      position: 'absolute',
      elevation: 2,
      backgroundColor: _colors.default.white,
      top: 0,
      right: 70,
      left: 0,
      bottom: 0
    },
    back: {
      position: "absolute",
      backgroundColor: _colors.default.red,
      right: 0,
      left: 300,
      top: 0,
      bottom: 0,
      elevation: 2
    }
  });
