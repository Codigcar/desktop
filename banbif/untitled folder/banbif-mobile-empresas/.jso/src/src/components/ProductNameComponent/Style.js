  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _default = exports.default = _reactNative.StyleSheet.create({
    headerContainer: {
      paddingRight: 15,
      paddingBottom: 5,
      paddingTop: 5,
      marginTop: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    blue: {
      color: _colors.default.lightBlue
    },
    headerOuterContainer: {
      marginLeft: 15,
      flex: 5
    },
    titleContainer: {
      marginBottom: 5
    },
    titleFont: {
      fontSize: 17,
      opacity: 1
    },
    accountFont: {
      fontSize: 17,
      opacity: 0.6
    },
    menuLine: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    right: {
      alignItems: 'flex-end',
      flex: 1
    }
  });
