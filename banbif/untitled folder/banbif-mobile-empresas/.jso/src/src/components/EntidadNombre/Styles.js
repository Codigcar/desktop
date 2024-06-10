  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _default = exports.default = _reactNative.StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      paddingBottom: 5,
      paddingTop: 5,
      alignContent: "space-between",
      justifyContent: "space-between",
      height: 35
    },
    titleContainerInner: {
      paddingLeft: 25,
      paddingRight: 20,
      backgroundColor: _colors.default.lightGrey
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
    entidadText: {
      fontSize: 17,
      opacity: 1,
      color: _colors.default.lightBlue
    },
    entidad: {
      paddingLeft: 17,
      paddingBottom: 5
    }
  });
