  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _SecurityScreen = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[5]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var showSecurityScreenFromAppState = function showSecurityScreenFromAppState(appState) {
    return ['background', 'inactive'].includes(appState);
  };
  var withSecurityScreenIOS = function withSecurityScreenIOS(Wrapped) {
    return function (props) {
      var _useState = (0, _react.useState)(showSecurityScreenFromAppState(_reactNative.AppState.currentState)),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        showSecurityScreen = _useState2[0],
        setShowSecurityScreen = _useState2[1];
      (0, _react.useEffect)(function () {
        var onChangeAppState = function onChangeAppState(nextAppState) {
          var nextShowSecurityScreen = showSecurityScreenFromAppState(nextAppState);
          setShowSecurityScreen(nextShowSecurityScreen);
        };
        var subscription = _reactNative.AppState.addEventListener('change', onChangeAppState);
        return function () {
          subscription.remove();
        };
      }, []);
      return showSecurityScreen ? (0, _jsxRuntime.jsx)(_SecurityScreen.default, {}) : (0, _jsxRuntime.jsx)(Wrapped, Object.assign({}, props));
    };
  };
  var withSecurityScreenAndroid = function withSecurityScreenAndroid(Wrapped) {
    return Wrapped;
  };
  var withSecurityScreen = _reactNative.Platform.OS === 'ios' ? withSecurityScreenIOS : withSecurityScreenAndroid;
  var _default = exports.default = withSecurityScreen;
