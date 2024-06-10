  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _default = exports.default = _reactNative.StyleSheet.create({
    IconAndTextInputContainer: {
      flexDirection: 'row',
      padding: 10,
      alignContent: 'center',
      alignItems: 'center'
    },
    TextInputStyle: {
      height: 40,
      width: '70%',
      borderWidth: 1,
      marginLeft: 10,
      textAlign: 'left',
      paddingLeft: 20,
      borderRadius: 8,
      color: _colors.default.darkGrey,
      borderColor: '#A1A1A1'
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      lineHeight: 28,
      color: '#20A6FF',
      textAlign: 'center'
    },
    description: {
      marginTop: 30,
      marginBottom: 37,
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24
    },
    container: {
      alignItems: 'center',
      backgroundColor: _colors.default.white,
      paddingHorizontal: 20,
      paddingTop: 50,
      flex: 1
    },
    linearGradient: {
      marginTop: 33,
      paddingLeft: 15,
      paddingRight: 15,
      height: 48,
      width: 230,
      borderRadius: 50
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '500',
      fontFamily: 'Gill Sans',
      textAlign: 'center',
      margin: 10,
      color: _colors.default.white
    },
    buttonTextCodigo: {
      color: '#20A6FF',
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 16,
      marginTop: 20
    },
    considerations: {
      marginTop: 26,
      backgroundColor: '#F6FAFE',
      paddingVertical: 17,
      paddingHorizontal: 21
    },
    row: {
      flexDirection: 'row',
      marginTop: 15,
      fontSize: 14
    },
    bullet: {
      marginTop: 5,
      width: 10,
      height: 10,
      backgroundColor: '#AD96DC',
      borderRadius: 50,
      marginRight: 9
    }
  });
