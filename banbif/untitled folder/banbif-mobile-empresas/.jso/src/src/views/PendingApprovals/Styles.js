  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _default = exports.default = _reactNative.StyleSheet.create({
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
    loadingmessage: {
      fontSize: 15,
      alignSelf: "center",
      alignContent: "center",
      justifyContent: "center",
      paddingBottom: 5
    },
    searchInputContainer: {
      backgroundColor: _colors.default.extraLightGrey,
      marginBottom: 5
    },
    containerButton: {
      flexDirection: "column",
      width: "80%",
      alignItems: "center",
      alignSelf: "center",
      justifyContent: "center",
      paddingTop: 2
    },
    textContainer: {
      shadowRadius: 3,
      elevation: 2,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: _colors.default.lightBlue,
      height: 35,
      width: 120
    },
    textContainerRechazar: {
      shadowRadius: 3,
      elevation: 2,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: _colors.default.customGrey,
      height: 35,
      width: 120
    },
    containerButtonAprobacion: {
      justifyContent: "center",
      marginTop: 5
    }
  });
