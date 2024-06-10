  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _default = exports.default = _reactNative.StyleSheet.create({
    ModalStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    ShadowContainerStyle: {
      backgroundColor: 'white',
      width: '90%',
      borderRadius: 10
    },
    ViewStyle: {
      marginTop: 0,
      alignItems: 'center',
      marginBottom: 20
    },
    TextStyle: {
      marginTop: 15,
      marginBottom: 10,
      textAlign: 'center',
      alignItems: 'center',
      color: '#5B5B5B',
      fontSize: 15,
      fontWeight: '600',
      lineHeight: 24
    },
    ViewButtonStyle: {
      flexDirection: 'column',
      marginStart: 10,
      marginEnd: 10,
      marginBottom: 10
    },
    actions: {
      borderRadius: 5,
      marginHorizontal: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginStart: 5
    },
    ViewButtonInner: {
      width: 0.5,
      height: '100%',
      margin: 10
    },
    appButtonContainer: {
      elevation: 8,
      backgroundColor: '#009688',
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12
    },
    appButtonText: {
      marginTop: 15,
      marginBottom: 10,
      alignItems: 'center',
      fontSize: 11,
      color: '#fff',
      alignSelf: 'center',
      textAlign: 'center',
      textAlignVertical: 'center'
    },
    viewText: {
      flexDirection: 'column',
      alignItems: 'center',
      alignContent: 'center',
      paddingTop: 30,
      paddingBottom: 30
    },
    linearGradient: {
      marginTop: 10,
      paddingLeft: 15,
      paddingRight: 15,
      height: 48,
      width: 230,
      borderRadius: 50,
      marginBottom: 5
    },
    noButtonContainer: {
      borderRadius: 50,
      backgroundColor: _colors.default.customGrey
    },
    buttonText: {
      fontSize: 15,
      fontWeight: '500',
      fontFamily: 'Gill Sans',
      textAlign: 'center',
      margin: 10,
      color: _colors.default.white
    },
    noButtonText: {
      fontSize: 15,
      fontWeight: '500',
      fontFamily: 'Gill Sans',
      textAlign: 'center',
      margin: 10,
      color: _colors.default.white
    }
  });
