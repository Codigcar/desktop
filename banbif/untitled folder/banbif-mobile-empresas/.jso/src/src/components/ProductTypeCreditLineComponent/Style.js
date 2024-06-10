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
      paddingLeft: 10,
      paddingBottom: 10,
      paddingTop: 10,
      flexWrap: "wrap"
    },
    blueDollar: {
      color: _colors.default.lightBlue
    },
    headerOuterContainer: {
      marginLeft: 25,
      flex: 5
    },
    titleContainer: {
      flexDirection: 'row',
      paddingBottom: 5,
      alignContent: "space-between",
      justifyContent: "space-between"
    },
    titleFont: {
      fontSize: 17,
      opacity: 1
    },
    accountFont: {
      fontSize: 17,
      opacity: 0.6,
      flexWrap: "wrap",
      alignSelf: "flex-end"
    },
    headerOuterContainer: {
      flex: 8,
      flexDirection: "column"
    },
    entidadText: {
      fontSize: 17,
      opacity: 1
    },
    entidad: {
      flex: 1
    }
  });
