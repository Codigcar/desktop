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
  var _errorState = _$$_REQUIRE(_dependencyMap[11]);
  var _reactNativeSvg = _$$_REQUIRE(_dependencyMap[12]);
  var _reactNativeLinearGradient = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13]));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[14]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var xml = "\n<svg width=\"70\" height=\"85\" viewBox=\"0 0 70 85\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M36.4848 85.0007C48.5633 85.0007 58.3535 83.6019 58.3535 81.7836C58.3535 79.9652 48.5758 78.5664 36.4848 78.5664C24.3939 78.5664 14.6161 79.9652 14.6161 81.7836C14.6161 83.6019 24.4064 85.0007 36.4848 85.0007Z\" fill=\"#F3F3F3\"/>\n<path d=\"M59.9307 6L12 58.1743C33.2625 78.9712 52.7895 65.8963 59.9307 58.1743C74.346 39.0588 67.7136 20.6152 63.8949 11.6442L59.9307 6Z\" fill=\"#F0F2FF\"/>\n<path d=\"M69 35.3723C69 54.3657 53.7677 69.7447 35 69.7447C16.2323 69.7447 1 54.3657 1 35.3723C1 16.379 16.2323 1 35 1C53.7677 1 69 16.379 69 35.3723Z\" stroke=\"#20A6FF\" stroke-width=\"2\"/>\n<path d=\"M23.6154 23.0723L46.983 46.4399\" stroke=\"#F87777\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M23 46.3846L35 34.6923L47 23\" stroke=\"#F87777\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n</svg>\n";
  var ModalErrorComponent = exports.default = function (_Component) {
    (0, _inherits2.default)(ModalErrorComponent, _Component);
    function ModalErrorComponent(props) {
      var _this;
      (0, _classCallCheck2.default)(this, ModalErrorComponent);
      _this = _callSuper(this, ModalErrorComponent, [props]);
      _this.state = {
        modalError: _errorState.ErrorStateService.getIsLogout() ? false : _this.props.Visibility
      };
      return _this;
    }
    (0, _createClass2.default)(ModalErrorComponent, [{
      key: "UNSAFE_componentWillReceiveProps",
      value: function UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
          modalError: _errorState.ErrorStateService.getIsLogout() ? false : nextProps.Visibility
        });
      }
    }, {
      key: "setModalVisible",
      value: function setModalVisible(visible) {
        this.setState({
          modalError: visible
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props$title,
          _this$props$TextError,
          _this2 = this;
        return (0, _jsxRuntime.jsx)(_reactNative.View, Object.assign({
          style: _Styles.default.container
        }, this.props, {
          children: (0, _jsxRuntime.jsx)(_reactNativeModal.default, {
            isVisible: this.state.modalError,
            style: _Styles.default.ModalStyle,
            children: (0, _jsxRuntime.jsx)(_ShadowContainer.default, {
              style: _Styles.default.ShadowContainerStyle,
              children: (0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: _Styles.default.ViewStyle,
                children: [(0, _jsxRuntime.jsx)(_reactNativeSvg.SvgXml, {
                  xml: xml
                }), (0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: _Styles.default.ViewText,
                  children: [((_this$props$title = this.props.title) == null ? undefined : _this$props$title.length) > 0 && (0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: _Styles.default.title,
                    children: this.props.title
                  }), (0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: _Styles.default.TextStyle,
                    ellipsizeMode: "tail",
                    children: this.props.TextError
                  }), ((_this$props$TextError = this.props.TextError1) == null ? undefined : _this$props$TextError.length) > 0 && (0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: _Styles.default.TextStyle,
                    ellipsizeMode: "tail",
                    children: this.props.TextError1
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
                      _this2.setModalVisible(!_this2.state.modalError);
                      _this2.props.Callback && _this2.props.Callback();
                    },
                    children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: _Styles.default.buttonText,
                      children: "Cerrar"
                    })
                  })
                })]
              })
            })
          })
        }));
      }
    }]);
    return ModalErrorComponent;
  }(_react.Component);
