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
  var _Icon = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _Styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[10]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var Accordian = exports.default = function (_Component) {
    (0, _inherits2.default)(Accordian, _Component);
    function Accordian(props) {
      var _this;
      (0, _classCallCheck2.default)(this, Accordian);
      _this = _callSuper(this, Accordian, [props]);
      _this.toggleExpand = function () {
        _reactNative.LayoutAnimation.configureNext(_reactNative.LayoutAnimation.Presets.easeInEaseOut);
        _this.setState({
          expanded: !_this.state.expanded
        });
      };
      _this.state = {
        data: props.data,
        expanded: false
      };
      if (_reactNative.Platform.OS === 'android') {
        _reactNative.UIManager.setLayoutAnimationEnabledExperimental(true);
      }
      return _this;
    }
    (0, _createClass2.default)(Accordian, [{
      key: "render",
      value: function render() {
        var _this2 = this;
        return (0, _jsxRuntime.jsxs)(_reactNative.View, {
          children: [(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
            ref: this.accordian,
            style: _Styles.default.row,
            onPress: function onPress() {
              return _this2.toggleExpand();
            },
            children: [(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: [_Styles.default.title, _Styles.default.font],
              children: this.props.title
            }), (0, _jsxRuntime.jsx)(_Icon.default, {
              style: _Styles.default.blue,
              family: _Icon.default.ENTYPO,
              name: this.state.expanded ? "chevron-small-up" : "chevron-small-down",
              size: 30
            })]
          }), (0, _jsxRuntime.jsx)(_reactNative.View, {
            style: _Styles.default.parentHr
          }), this.state.expanded && (0, _jsxRuntime.jsx)(_reactNative.View, {
            style: _Styles.default.child,
            children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: _Styles.default.text,
              children: this.props.data
            })
          })]
        });
      }
    }]);
    return Accordian;
  }(_react.Component);
