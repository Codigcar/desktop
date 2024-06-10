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
  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _ShadowContainer = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _Icon = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _Styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[13]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var ModalConfirmationComponent = exports.default = function (_Component) {
    (0, _inherits2.default)(ModalConfirmationComponent, _Component);
    function ModalConfirmationComponent(props) {
      var _this;
      (0, _classCallCheck2.default)(this, ModalConfirmationComponent);
      _this = _callSuper(this, ModalConfirmationComponent, [props]);
      _this.state = {
        modalConfirmation: _this.props.Visibility
      };
      return _this;
    }
    (0, _createClass2.default)(ModalConfirmationComponent, [{
      key: "UNSAFE_componentWillReceiveProps",
      value: function UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
          modalConfirmation: nextProps.Visibility
        });
      }
    }, {
      key: "setModalVisible",
      value: function setModalVisible(visible) {
        this.setState({
          modalConfirmation: visible
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;
        return (0, _jsxRuntime.jsx)(_reactNative.View, Object.assign({
          style: _Styles.default.container
        }, this.props, {
          children: (0, _jsxRuntime.jsx)(_reactNativeModal.default, {
            isVisible: this.state.modalConfirmation,
            style: _Styles.default.ModalStyle,
            children: (0, _jsxRuntime.jsx)(_ShadowContainer.default, {
              style: _Styles.default.ShadowContainerStyle,
              children: (0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: _Styles.default.ViewStyle,
                children: [(0, _jsxRuntime.jsx)(_Icon.default, {
                  style: [_colors.default.lightBlue],
                  family: _Icon.default.IONICONS,
                  name: "alert-circle",
                  size: 70,
                  color: _colors.default.lightBlue
                }), (0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: _Styles.default.ViewText,
                  children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: _Styles.default.TextStyle,
                    ellipsizeMode: "tail",
                    numberOfLines: 4,
                    children: this.props.TextConfirmation
                  })
                }), (0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: {
                    flexDirection: "row"
                  },
                  children: [(0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: _Styles.default.ViewButtonStyle,
                    children: (0, _jsxRuntime.jsx)(_reactNative.TouchableHighlight, {
                      onPress: function onPress() {
                        _this2.setModalVisible(!_this2.state.modalConfirmation);
                        if (_this2.props.Callback) {
                          _this2.props.Callback(true);
                        }
                      },
                      children: (0, _jsxRuntime.jsx)(_ShadowContainer.default, {
                        style: _Styles.default.ShadowContainerButtonBlue,
                        children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
                          style: _Styles.default.TextButton,
                          children: "S\xED"
                        })
                      })
                    })
                  }), (0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: _Styles.default.ViewButtonStyle,
                    children: (0, _jsxRuntime.jsx)(_reactNative.TouchableHighlight, {
                      onPress: function onPress() {
                        _this2.setModalVisible(!_this2.state.modalConfirmation);
                        if (_this2.props.Callback) {
                          _this2.props.Callback(false);
                        }
                      },
                      children: (0, _jsxRuntime.jsx)(_ShadowContainer.default, {
                        style: _Styles.default.ShadowContainerButtonGrey,
                        children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
                          style: _Styles.default.TextButton,
                          children: "No"
                        })
                      })
                    })
                  })]
                })]
              })
            })
          })
        }));
      }
    }]);
    return ModalConfirmationComponent;
  }(_react.Component);
