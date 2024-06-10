  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _Styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _storage = _$$_REQUIRE(_dependencyMap[5]);
  var _constants = _$$_REQUIRE(_dependencyMap[6]);
  var _auth = _$$_REQUIRE(_dependencyMap[7]);
  var _reactNativeSvg = _$$_REQUIRE(_dependencyMap[8]);
  var _svg = _$$_REQUIRE(_dependencyMap[9]);
  var _reactNativeLinearGradient = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[11]);
  var EnrolamientoListo = function EnrolamientoListo(_ref) {
    var navigation = _ref.navigation;
    var accept = function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* () {
        var user = yield _storage.StorageService.getItem('user');
        if (user.role === _constants.USER_ROLES.ADMIN) {
          yield _auth.AuthService.doLogout();
          navigation.navigate('Login');
        } else {
          navigation.navigate('MainMenu');
        }
      });
      return function accept() {
        return _ref2.apply(this, arguments);
      };
    }();
    return (0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: _Styles.default.container,
      children: [(0, _jsxRuntime.jsx)(_reactNativeSvg.SvgXml, {
        xml: _svg.successIcon
      }), (0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: _Styles.default.title,
        children: "\xA1Listo!"
      }), (0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: _Styles.default.description,
        children: "Ya te afiliaste al token digital."
      }), (0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: _Styles.default.description,
        children: "Ahora puedes usar tu token digital"
      }), (0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: _Styles.default.description,
        children: "para confirmar operaciones."
      }), (0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: _Styles.default.container2,
        children: [(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: _Styles.default.considerations,
          children: [(0, _jsxRuntime.jsx)(_reactNative.Text, {
            children: "Ten en cuenta:"
          }), (0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: _Styles.default.row,
            children: [(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: _Styles.default.bullet
            }), (0, _jsxRuntime.jsx)(_reactNative.Text, {
              children: "Puedes consultar tu token digital desde la pantalla de inicio, haciendo clic en el bot\xF3n."
            })]
          })]
        }), (0, _jsxRuntime.jsx)(_reactNativeLinearGradient.default, {
          colors: ['#AD96DC', '#20A6FF'],
          start: {
            x: 0,
            y: 0
          },
          end: {
            x: 1,
            y: 0
          },
          style: _Styles.default.linearGradient,
          children: (0, _jsxRuntime.jsx)(_reactNative.TouchableHighlight, {
            underlayColor: "none",
            onPress: function onPress() {
              void accept();
            },
            children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: _Styles.default.buttonText,
              children: "Aceptar"
            })
          })
        })]
      })]
    });
  };
  var _default = exports.default = EnrolamientoListo;
