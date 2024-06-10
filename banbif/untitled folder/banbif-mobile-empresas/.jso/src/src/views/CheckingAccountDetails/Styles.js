  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _nativeBase = _$$_REQUIRE(_dependencyMap[3]);
  var _default = exports.default = _reactNative.StyleSheet.create({
    containerView: {
      flex: 1,
      paddingTop: 10
    },
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
      paddingTop: 5,
      paddingBottom: 5,
      backgroundColor: _colors.default.white,
      flex: 1
    },
    line: {
      width: "50%",
      height: 6
    },
    alignCenterFlex1: {
      alignContent: "center",
      flex: 1
    },
    alignCenterFlex2: {
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
      alignItems: "center",
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
