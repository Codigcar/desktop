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
  var _Styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var _Icon = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[13]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var width = _reactNative.Dimensions.get("window").width;
  var ModalSoftToken = exports.default = function (_Component) {
    (0, _inherits2.default)(ModalSoftToken, _Component);
    function ModalSoftToken(props) {
      var _this;
      (0, _classCallCheck2.default)(this, ModalSoftToken);
      _this = _callSuper(this, ModalSoftToken, [props]);
      _this.state = {
        textEntidad: "",
        avisoObrigatorio: false
      };
      return _this;
    }
    (0, _createClass2.default)(ModalSoftToken, [{
      key: "render",
      value: function render() {
        var _this2 = this;
        var content = (0, _jsxRuntime.jsxs)(_ShadowContainer.default, {
          style: _Styles.default.ShadowContainerStyle,
          children: [(0, _jsxRuntime.jsx)(_reactNative.TouchableHighlight, {
            style: _Styles.default.Touchable,
            onPress: function onPress() {
              _this2.setState({
                avisoObrigatorio: false
              });
              _this2.props.closeModalSoftToken();
            },
            children: (0, _jsxRuntime.jsx)(_reactNative.View, {
              style: _Styles.default.ViewIcon,
              children: (0, _jsxRuntime.jsx)(_Icon.default, {
                family: _Icon.default.IONICONS,
                name: "ios-close-circle-outline",
                size: 30,
                color: _colors.default.lightBlue
              })
            })
          }), (0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: _Styles.default.ViewStyle,
            children: [(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: _Styles.default.ViewText,
              children: [(0, _jsxRuntime.jsx)(_reactNative.Text, {
                children: "Ingresa el Token F\xEDsico"
              }), (0, _jsxRuntime.jsx)(_reactNative.Text, {
                children: "para confirmar la operaci\xF3n"
              })]
            }), (0, _jsxRuntime.jsx)(_reactNative.TextInput, {
              style: _Styles.default.TextInputStyle,
              onChangeText: function onChangeText(textEntidad) {
                _this2.setState({
                  avisoObrigatorio: false
                });
                _this2.props.setSoftToken(textEntidad);
                _this2.setState({
                  textEntidad: textEntidad
                });
              },
              value: this.state.textEntidad,
              secureTextEntry: true,
              keyboardType: "numeric",
              contextMenuHidden: true
            }), this.state.avisoObrigatorio && (0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: {
                color: "#c30"
              },
              children: "Este campo es obligatorio"
            }), (0, _jsxRuntime.jsx)(_reactNative.View, {
              style: _Styles.default.ViewButtonStyle,
              children: (0, _jsxRuntime.jsx)(_reactNative.TouchableHighlight, {
                onPress: function onPress() {
                  if (_this2.state.textEntidad) {
                    _this2.props.setModal(false);
                    _this2.props.closeModalSoftToken();
                    _this2.props.showSuccess();
                    _this2.state.textEntidad = "";
                  } else {
                    _this2.setState({
                      avisoObrigatorio: true
                    });
                  }
                },
                children: (0, _jsxRuntime.jsx)(_ShadowContainer.default, {
                  style: _Styles.default.ShadowContainerButton,
                  children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: _Styles.default.TextButton,
                    children: "Ok"
                  })
                })
              })
            })]
          })]
        });
        return (0, _jsxRuntime.jsx)(_reactNative.TouchableHighlight, {
          onPress: function onPress() {
            _this2.props.setModal(!_this2.props.modalSoftToken);
          },
          children: (0, _jsxRuntime.jsx)(_reactNative.View, {
            children: (0, _jsxRuntime.jsxs)(_reactNativeModal.default, {
              isVisible: this.props.modalSoftToken,
              onBackButtonPress: function onBackButtonPress() {
                return _this2.props.setModal(false);
              },
              style: _Styles.default.ModalStyle,
              children: [_reactNative.Platform.OS === "ios" && (0, _jsxRuntime.jsx)(_reactNative.KeyboardAvoidingView, {
                behavior: "position",
                enabled: true,
                children: content
              }), _reactNative.Platform.OS != "ios" && content]
            })
          })
        });
      }
    }]);
    return ModalSoftToken;
  }(_react.Component);
