  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _possibleConstructorReturn2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _getPrototypeOf2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _inherits2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[7]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[8]);
  var _netinfo = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _Icon = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var _ModalHandleError2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));
  var _Button = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13]));
  var _strings = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[14]));
  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[15]));
  var _ShadowContainer = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[16]));
  var _Styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[17]));
  var _storage = _$$_REQUIRE(_dependencyMap[18]);
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[19]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var NetworkVerification = exports.default = function (_ModalHandleError) {
    (0, _inherits2.default)(NetworkVerification, _ModalHandleError);
    function NetworkVerification(props) {
      var _this;
      (0, _classCallCheck2.default)(this, NetworkVerification);
      _this = _callSuper(this, NetworkVerification, [props]);
      _this._handleConnectivityChange = function (iSConnected) {
        _this.setState({
          iSConnected: iSConnected
        });
      };
      _this._handleOpeninWebview = function () {
        if (_this.state.iSConnected === true) {
          _this.props.navigation.navigate("Login", {
            isConnected: true
          });
          return;
        }
        if (_this.state.iSConnected === false) {
          _this.setState({
            modalIntermediate: true
          });
        }
      };
      _this._handleOpeninToken = function () {
        if (_this.state.iSConnected === false) {
          _this.props.navigation.navigate("Login", {
            isConnected: false
          });
          _this.props.navigation.navigate("SoftTokenLogin", {
            isConnected: false
          });
          return;
        }
        if (_this.state.iSConnected === true) {
          _this.props.navigation.navigate("Login", {
            isConnected: true
          });
          _this.props.navigation.navigate("SoftTokenLogin", {
            isConnected: true
          });
          return;
        }
      };
      _this.state = {
        hasSoftToken: false,
        modalIntermediate: null,
        iSConnected: null
      };
      return _this;
    }
    (0, _createClass2.default)(NetworkVerification, [{
      key: "componentDidMount",
      value: function () {
        var _componentDidMount = (0, _asyncToGenerator2.default)(function* () {
          var _this2 = this;
          var hasSoftToken = Boolean(yield _storage.StorageService.getItemStorage('hasSoftToken'));
          this.setState({
            hasSoftToken: hasSoftToken
          });
          _netinfo.default.isConnected.addEventListener("connectionChange", this._handleConnectivityChange);
          _netinfo.default.isConnected.fetch().done(function (isConnected) {
            _this2.setState({
              iSConnected: isConnected
            });
            if (isConnected === true) {
              _this2.props.navigation.navigate("Login", {
                isConnected: true
              });
            }
            if (isConnected === false) {
              _this2.setState({
                modalIntermediate: true
              });
            }
          });
        });
        function componentDidMount() {
          return _componentDidMount.apply(this, arguments);
        }
        return componentDidMount;
      }()
    }, {
      key: "render",
      value: function render() {
        var _this3 = this;
        return (0, _jsxRuntime.jsx)(_reactNative.View, {
          children: (0, _jsxRuntime.jsx)(_reactNativeModal.default, {
            onBackButtonPress: function onBackButtonPress() {
              return _reactNative.BackHandler.exitApp();
            },
            isVisible: this.state.modalIntermediate,
            style: {
              alignItems: "center"
            },
            children: (0, _jsxRuntime.jsx)(_ShadowContainer.default, {
              style: _Styles.default.shadowContainerStyle,
              children: (0, _jsxRuntime.jsx)(_reactNative.View, {
                style: _Styles.default.mainViewStyle,
                children: (0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: _Styles.default.viewStyle,
                  children: [(0, _jsxRuntime.jsx)(_Icon.default, {
                    style: [_colors.default.lightBlue],
                    family: _Icon.default.IONICONS,
                    name: "alert-circle",
                    size: 70,
                    color: _colors.default.lightBlue
                  }), (0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: _Styles.default.viewTextStyle,
                    children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: _Styles.default.modalTextAligin,
                      children: _strings.default.noInternet.noInternet
                    })
                  }), (0, _jsxRuntime.jsx)(_reactNative.View, {
                    children: (0, _jsxRuntime.jsx)(_Button.default, {
                      color: _colors.default.lightBlue,
                      width: 150,
                      height: 40,
                      textButton: _strings.default.networkVerification.texButtonReitentar,
                      action: function action() {
                        _this3.setState({
                          modalIntermediate: false
                        });
                        _this3._handleOpeninWebview();
                      }
                    })
                  }), this.state.hasSoftToken && (0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: {
                      paddingTop: 10
                    },
                    children: (0, _jsxRuntime.jsx)(_Button.default, {
                      color: _colors.default.lightBlue,
                      width: 150,
                      height: 40,
                      textButton: _strings.default.networkVerification.texButtonSoftToken,
                      action: function action() {
                        _this3.setState({
                          modalIntermediate: false
                        });
                        _this3._handleOpeninToken();
                      }
                    })
                  })]
                })
              })
            })
          })
        });
      }
    }]);
    return NetworkVerification;
  }(_ModalHandleError2.default);
