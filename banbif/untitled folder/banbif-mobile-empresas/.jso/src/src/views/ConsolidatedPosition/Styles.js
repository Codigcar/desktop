  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _default = exports.default = _reactNative.StyleSheet.create({
    separator: {
      borderWidth: 1,
      borderColor: _colors.default.grey,
      marginBottom: 5,
      marginTop: 5
    },
    searchBarContainer: {
      paddingLeft: 15
    },
    searchInput: {
      fontSize: 19,
      width: 200
    },
    searchIcon: {
      color: _colors.default.darkGrey,
      marginRight: 40
    },
    flex1: {
      flex: 1,
      backgroundColor: _colors.default.white
    },
    searchInputContainer: {
      backgroundColor: _colors.default.extraLightGrey,
      marginBottom: 15
    }
  });
