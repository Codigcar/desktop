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
  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[7]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[8]);
  var _propTypes = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _Icon = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _Styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var _reactNativeLinearGradient = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[13]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var ModalComponent = exports.default = function (_Component) {
    (0, _inherits2.default)(ModalComponent, _Component);
    function ModalComponent() {
      (0, _classCallCheck2.default)(this, ModalComponent);
      return _callSuper(this, ModalComponent, arguments);
    }
    (0, _createClass2.default)(ModalComponent, [{
      key: "render",
      value: function render() {
        var _this$props,
          _this = this,
          _this$props$yesButton,
          _this$props$noButtont;
        return (0, _jsxRuntime.jsx)(_reactNativeModal.default, Object.assign({}, this.props, {
          style: _Styles.default.ModalStyle,
          children: (0, _jsxRuntime.jsx)(_reactNative.View, {
            style: _Styles.default.ShadowContainerStyle,
            children: (0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: _Styles.default.ViewStyle,
              children: [((_this$props = this.props) == null ? undefined : _this$props.iconModal) !== null && (0, _jsxRuntime.jsx)(_Icon.default, Object.assign({}, this.props.iconModal)), (0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: _Styles.default.TextStyle,
                children: this.props.textModal
              }), (0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: _Styles.default.ViewButtonStyle,
                children: [(0, _jsxRuntime.jsx)(_reactNativeLinearGradient.default, {
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
                      _this.props.yesButtonAction && _this.props.yesButtonAction();
                    },
                    children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: _Styles.default.buttonText,
                      children: (_this$props$yesButton = this.props.yesButtontext) != null ? _this$props$yesButton : 'Si'
                    })
                  })
                }), (0, _jsxRuntime.jsx)(_reactNative.TouchableHighlight, {
                  style: _Styles.default.noButtonContainer,
                  underlayColor: "none",
                  onPress: function onPress() {
                    _this.props.onClose();
                  },
                  children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: _Styles.default.noButtonText,
                    children: (_this$props$noButtont = this.props.noButtontext) != null ? _this$props$noButtont : 'No'
                  })
                })]
              })]
            })
          })
        }));
      }
    }]);
    return ModalComponent;
  }(_react.Component);
  ModalComponent.propTypes = {
    yesButtonAction: _propTypes.default.func,
    onClose: _propTypes.default.func,
    textModal: _propTypes.default.string,
    iconModal: _propTypes.default.object
  };
  ModalComponent.defaultProps = {
    buttons: []
  };
