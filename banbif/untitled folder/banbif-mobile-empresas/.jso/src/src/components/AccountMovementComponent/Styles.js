  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _default = exports.default = _reactNative.StyleSheet.create({
    box: {
      borderColor: _colors.default.extraLightGrey,
      borderWidth: 0,
      shadowColor: _colors.default.black,
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 4,
      paddingHorizontal: 5
    },
    container: {
      borderWidth: 1,
      borderRadius: 2,
      borderColor: '#ddd',
      borderBottomWidth: 0,
      shadowColor: _colors.default.darkGrey,
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 3
    },
    pageContainer: {
      width: 90,
      flexDirection: 'row',
      alignSelf: 'center',
      paddingTop: 10,
      alignContent: 'center',
      height: 100
    },
    pageIcon: {
      backgroundColor: _colors.default.white,
      borderColor: _colors.default.lightBlue,
      borderWidth: 1,
      borderRadius: 10,
      width: 20,
      height: 20,
      shadowOpacity: 0,
      shadowColor: _colors.default.white,
      shadowRadius: 0,
      marginTop: 5
    },
    pageIconText: {
      color: _colors.default.lightBlue,
      paddingLeft: 2,
      marginTop: -2
    },
    pageText: {
      marginLeft: 5,
      color: _colors.default.lightBlue,
      marginTop: 7
    },
    View: {
      backgroundColor: _colors.default.headerListGrey,
      flexDirection: "row",
      justifyContent: "space-between",
      height: 40,
      alignItems: "center"
    },
    Day: {
      textAlign: "center",
      color: _colors.default.white,
      flex: 2
    },
    History: {
      textAlign: "center",
      color: _colors.default.white,
      flex: 4
    },
    Value: {
      textAlign: "center",
      color: _colors.default.white,
      flex: 3
    }
  });
