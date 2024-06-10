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
      elevation: 3,
      marginLeft: 5,
      marginRight: 5,
      marginTop: 10
    },
    line: {
      width: "50%",
      height: 6
    },
    alignCenterFlex1: {
      alignContent: "center",
      flex: 1
    },
    blueLineAligCenter: {
      color: _colors.default.lightBlue,
      alignSelf: "center",
      paddingLeft: 20
    },
    filterPicker: {
      flex: 3,
      flexDirection: "row",
      fontSize: 16,
      color: _colors.default.lightBlue
    },
    contentAction: {
      flexDirection: 'row',
      justifyContent: 'center',
      height: 35
    },
    viewTextAction: {
      flex: 3,
      alignItems: 'center',
      justifyContent: 'center',
      borderRightWidth: 3,
      borderColor: _colors.default.lightBlue,
      height: 35
    },
    textAction: {
      fontSize: 16,
      color: _colors.default.lightBlue
    },
    monthFilter: {
      flex: 1,
      flexDirection: "row"
    },
    filterAction: {
      flex: 3,
      flexDirection: "row",
      fontSize: 16,
      alignItems: 'center',
      justifyContent: 'center',
      color: _colors.default.lightBlue
    },
    textFilterAction: {
      fontSize: 16,
      color: _colors.default.lightBlue
    }
  });
