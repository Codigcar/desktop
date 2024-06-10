  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _default = exports.default = _reactNative.StyleSheet.create({
    viewContainer: {
      alignContent: "center",
      alignItems: "center",
      flex: 1,
      backgroundColor: _colors.default.white
    },
    view: {
      color: _colors.default.lightBlue,
      alignContent: "center",
      alignSelf: "center",
      fontSize: 16
    },
    text1: {
      color: _colors.default.lightBlue,
      alignContent: "center",
      alignSelf: "center",
      fontSize: 26,
      paddingTop: 5,
      letterSpacing: 10
    },
    text2: {
      fontSize: 15,
      alignContent: "center",
      alignSelf: "center",
      paddingTop: 26
    },
    text3: {
      fontSize: 15,
      alignContent: "center",
      alignSelf: "center"
    },
    contentContainer: {
      alignItems: "center",
      paddingTop: 4
    },
    claveUsoPersonal: {
      paddingTop: 30,
      alignItems: "center"
    },
    token: {
      alignItems: "center",
      paddingTop: 60
    },
    tituloRecuerda: {
      color: _colors.default.lightBlue,
      fontSize: 16,
      fontWeight: "bold"
    },
    textoRecuerda: {
      color: _colors.default.lightBlue,
      fontSize: 16
    },
    contenedorRecuerda: {
      marginTop: 50,
      backgroundColor: _colors.default.lightLightGrey,
      padding: 10
    }
  });
