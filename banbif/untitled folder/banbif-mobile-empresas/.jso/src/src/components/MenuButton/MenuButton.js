  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _possibleConstructorReturn2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _getPrototypeOf2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _inherits2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[6]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[7]);
  var _propTypes = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _Icon = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _ShadowContainer = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _Styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[12]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var MenuButton = exports.default = function (_Component) {
    (0, _inherits2.default)(MenuButton, _Component);
    function MenuButton() {
      (0, _classCallCheck2.default)(this, MenuButton);
      return _callSuper(this, MenuButton, arguments);
    }
    (0, _createClass2.default)(MenuButton, [{
      key: "render",
      value: function render() {
        return (0, _jsxRuntime.jsx)(_ShadowContainer.default, {
          style: _Styles.default.shadowContainer,
          children: (0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
            onPress: this.props.onPress,
            children: (0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: _Styles.default.innerContainer,
              children: [(0, _jsxRuntime.jsx)(_reactNative.View, {
                children: (0, _jsxRuntime.jsx)(_Icon.default, {
                  family: this.props.family,
                  name: this.props.icon,
                  size: 80,
                  style: _Styles.default.blue
                })
              }), (0, _jsxRuntime.jsx)(_reactNative.View, {
                children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: [_Styles.default.text, _Styles.default.blue],
                  children: this.props.text
                })
              })]
            })
          })
        });
      }
    }]);
    return MenuButton;
  }(_react.Component);
  MenuButton.propTypes = {
    family: _propTypes.default.string,
    icon: _propTypes.default.string,
    text: _propTypes.default.string,
    onPress: _propTypes.default.func
  };
