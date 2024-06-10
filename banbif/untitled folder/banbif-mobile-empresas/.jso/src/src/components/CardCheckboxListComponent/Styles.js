  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _default = exports.default = _reactNative.StyleSheet.create({
    container: {
      borderWidth: 1,
      borderRadius: 5,
      borderColor: "#ddd",
      shadowColor: _colors.default.darkGrey,
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.3,
      shadowRadius: 1,
      elevation: 3,
      paddingTop: 5
    },
    iconBlue: {
      color: _colors.default.lightBlue,
      paddingRight: 15
    },
    iconGrey: {
      color: _colors.default.lightGrey,
      paddingRight: 15
    },
    containerTitle: {
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 15,
      backgroundColor: "#fff",
      paddingBottom: 15,
      marginTop: _reactNative.Platform.OS === "ios" ? 0 : 5,
      marginLeft: _reactNative.Platform.OS === "ios" ? 0 : 5,
      marginRight: _reactNative.Platform.OS === "ios" ? 0 : 5
    },
    textTitle: {
      fontSize: 15,
      paddingLeft: 15,
      justifyContent: "center",
      backgroundColor: "#fff"
    },
    containerLine: {
      backgroundColor: "white",
      marginHorizontal: 2
    },
    line: {
      height: 1,
      backgroundColor: _colors.default.grey,
      width: "90%",
      alignSelf: "center"
    },
    containerFlatlist: {
      marginTop: _reactNative.Platform.OS === "ios" ? 0 : 5,
      marginLeft: _reactNative.Platform.OS === "ios" ? 0 : 5,
      marginRight: _reactNative.Platform.OS === "ios" ? 0 : 5
    },
    flatlistContent: {},
    headerContainer: {
      flex: 1
    },
    headerTitle: {
      fontSize: 17,
      fontWeight: 'bold',
      paddingLeft: '10%'
    },
    headerDetailsContainer: {
      flexDirection: 'row'
    },
    headerCurrency: {
      width: '10%',
      paddintTop: '25%'
    },
    headerDetails: {
      width: '75%'
    },
    headerCheckbox: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '15%'
    },
    accountFont: {
      fontSize: 17,
      opacity: 0.6
    }
  });
