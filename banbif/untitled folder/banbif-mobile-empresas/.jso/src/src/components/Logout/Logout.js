  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _ModalComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _Icon = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _Styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _auth = _$$_REQUIRE(_dependencyMap[8]);
  var _native = _$$_REQUIRE(_dependencyMap[9]);
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[10]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var Logout = function Logout(_ref) {
    var navigation = _ref.navigation;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      modalVisible = _useState2[0],
      setModalVisible = _useState2[1];
    var screenName = (0, _native.useNavigationState)(function (state) {
      return state.routes[state.index].name;
    });
    var handleBackButtonPressAndroid = function handleBackButtonPressAndroid() {
      setModalVisible(true);
    };
    (0, _react.useEffect)(function () {
      var backHandler = _reactNative.BackHandler.addEventListener('hardwareBackPress', screenName === 'MainMenu' ? handleBackButtonPressAndroid : function () {});
      return function () {
        return backHandler.remove();
      };
    }, [navigation, screenName]);
    var toggleModalVisible = function toggleModalVisible() {
      return setModalVisible(function (prev) {
        return !prev;
      });
    };
    return (0, _jsxRuntime.jsx)(_reactNative.TouchableHighlight, {
      style: {
        marginRight: 15
      },
      onPress: toggleModalVisible,
      children: (0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: _Styles.default.container,
        children: [(0, _jsxRuntime.jsx)(_ModalComponent.default, {
          yesButtonAction: (0, _asyncToGenerator2.default)(function* () {
            toggleModalVisible();
            yield _auth.AuthService.doLogout();
            navigation.navigate('Login', {
              refreshToken: true
            });
          }),
          isVisible: modalVisible,
          onClose: toggleModalVisible,
          textModal: "\xBFEst\xE1s seguro que deseas cerrar sesi\xF3n?"
        }), (0, _jsxRuntime.jsx)(_reactNative.View, {
          children: (0, _jsxRuntime.jsx)(_Icon.default, {
            family: _Icon.default.IONICONS,
            name: "log-out-outline",
            size: 35,
            style: _Styles.default.icon
          })
        })]
      })
    });
  };
  var _default = exports.default = Logout;
