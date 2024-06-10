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
      flexWrap: "wrap",
      backgroundColor: _colors.default.white
    },
    blueDollar: {
      color: _colors.default.lightBlue
    },
    headerOuterContainer1: {
      marginLeft: 10,
      flex: 1,
      alignContent: "flex-start",
      alignSelf: "flex-start"
    },
    headerOuterContainer2: {
      marginLeft: 10,
      flex: 4,
      alignContent: "flex-start",
      alignSelf: "flex-start"
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
    },
    entidad: {
      alignSelf: "flex-start",
      flex: 1
    },
    entidadText: {
      fontSize: 17,
      opacity: 1
    }
  });
