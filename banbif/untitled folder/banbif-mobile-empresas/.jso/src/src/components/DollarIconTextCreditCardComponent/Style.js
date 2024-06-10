  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _default = exports.default = _reactNative.StyleSheet.create({
    view: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 15,
      paddingBottom: 10,
      paddingTop: 10,
      flexWrap: "wrap"
    },
    blueDollar: {
      color: _colors.default.lightBlue
    },
    headerOuterContainer: {
      marginLeft: 25,
      flex: 1
    },
    headerOuterContainer1: {
      marginLeft: 10,
      flex: 4
    },
    headerOuterContainer2: {
      marginLeft: 10,
      flex: 4
    },
    titleContainer: {
      marginBottom: 5,
      flexDirection: "row"
    },
    titleFont: {
      fontSize: 17,
      opacity: 1
    },
    accountFont: {
      fontSize: 17,
      opacity: 0.6,
      flexWrap: "wrap"
    },
    right: {
      alignItems: "flex-end",
      flex: 1
    }
  });
