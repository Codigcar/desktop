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
  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[8]);
  var _Icon = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _Style = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var _DetectID = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));
  var _ModalHandleError2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13]));
  var _reactNativePaper = _$$_REQUIRE(_dependencyMap[14]);
  var _images = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[15]));
  var _elements = _$$_REQUIRE(_dependencyMap[16]);
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[17]);
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var SoftTokenLogin = exports.default = function (_ModalHandleError) {
    (0, _inherits2.default)(SoftTokenLogin, _ModalHandleError);
    function SoftTokenLogin(props) {
      var _this;
      (0, _classCallCheck2.default)(this, SoftTokenLogin);
      _this = _callSuper(this, SoftTokenLogin, [props]);
      _this._handleAppStateChange = function (nextAppState) {
        if (_this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
          if (_this.props.route.params.isConnected === true) {
            return _this.props.navigation.navigate("Login");
          }
        }
        _this.setState({
          appState: nextAppState
        });
      };
      _this.state = Object.assign(_this.state, {
        isConected: true,
        timer: null,
        code: null,
        redirect: true,
        redirectRoute: 'Login',
        appState: _reactNative.AppState.currentState
      });
      return _this;
    }
    (0, _createClass2.default)(SoftTokenLogin, [{
      key: "resetToken",
      value: function () {
        var _resetToken = (0, _asyncToGenerator2.default)(function* () {
          var _this2 = this;
          try {
            this.setState({
              timer: (yield _DetectID.default.getTokenTimeStepValue()) / 100.0,
              code: yield _DetectID.default.getTokenValue()
            });
            clearInterval(this.interval);
            this.interval = setInterval(function () {
              _this2.setState((0, _asyncToGenerator2.default)(function* () {
                return {
                  timer: (yield _DetectID.default.getTokenTimeStepValue()) / 100.0
                };
              }));
              _this2.resetToken();
            }, 2000);
          } catch (e) {
            this.handleMessages(e);
          }
        });
        function resetToken() {
          return _resetToken.apply(this, arguments);
        }
        return resetToken;
      }()
    }, {
      key: "componentDidMount",
      value: function () {
        var _componentDidMount = (0, _asyncToGenerator2.default)(function* () {
          yield this.setState({
            isConected: this.props.route.params.isConnected
          });
          this.appStateSubscription = _reactNative.AppState.addEventListener('change', this._handleAppStateChange);
          yield this.resetToken();
        });
        function componentDidMount() {
          return _componentDidMount.apply(this, arguments);
        }
        return componentDidMount;
      }()
    }, {
      key: "componentDidUpdate",
      value: function () {
        var _componentDidUpdate = (0, _asyncToGenerator2.default)(function* () {
          if (this.state.timer >= 1) {
            yield this.resetToken();
          }
        });
        function componentDidUpdate() {
          return _componentDidUpdate.apply(this, arguments);
        }
        return componentDidUpdate;
      }()
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.appStateSubscription.remove();
        clearInterval(this.interval);
      }
    }, {
      key: "render",
      value: function render() {
        var _this3 = this;
        return (0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: _Style.default.viewContainer,
          children: [(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: {
              paddingTop: 20
            },
            children: (0, _jsxRuntime.jsx)(_elements.HeaderBackButton, {
              tintColor: _colors.default.lightBlue,
              onPress: function onPress() {
                _this3.state.isConected === true ? _this3.props.navigation.navigate("Login") : _reactNative.BackHandler.exitApp();
              }
            })
          }), (0, _jsxRuntime.jsxs)(_reactNative.View, {
            children: [(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: _Style.default.contentContainer,
              children: (0, _jsxRuntime.jsx)(_reactNative.Image, {
                style: {
                  width: 139,
                  height: 63
                },
                source: _images.default.logoTextoLogin
              })
            }), (0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: _Style.default.claveUsoPersonal,
              children: [(0, _jsxRuntime.jsx)(_Icon.default, {
                size: 30,
                name: "ios-information-circle",
                family: _Icon.default.IONICONS,
                color: _colors.default.lightGrey
              }), (0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: _Style.default.view,
                children: "\xA1La clave es de uso personal,"
              }), (0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: _Style.default.view,
                children: "no la compartas con nadie!"
              })]
            }), (0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: _Style.default.token,
              children: [(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: _Style.default.view,
                children: "Token Digital"
              }), (0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: _Style.default.text1,
                children: this.state.code
              })]
            }), (0, _jsxRuntime.jsx)(_reactNative.View, {
              style: {
                paddingTop: 5
              },
              children: (0, _jsxRuntime.jsx)(_reactNativePaper.ProgressBar, {
                progress: this.state.timer,
                color: _colors.default.lightBlue,
                style: {
                  width: '100%',
                  height: 15
                }
              })
            }), (0, _jsxRuntime.jsx)(_reactNative.View, {
              style: {
                paddingTop: 5
              },
              children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: _Style.default.view,
                children: "Esta clave expira cada 60 segundos"
              })
            }), (0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: _Style.default.contenedorRecuerda,
              children: [(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: _Style.default.tituloRecuerda,
                children: "Recuerda: "
              }), (0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: {
                  paddingTop: 5
                },
                children: [(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: _Style.default.view,
                  children: "* El token digital es una clave de 6"
                }), (0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: _Style.default.view,
                  children: "   digitos, utilizala para aprobar tus"
                }), (0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: _Style.default.view,
                  children: "   operaciones por el APP o la Web."
                })]
              }), (0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: {
                  paddingTop: 5
                },
                children: [(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: _Style.default.view,
                  children: "* Solo puedes utilizar una clave por"
                }), (0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: _Style.default.textoRecuerda,
                  children: "    operaci\xF3n."
                })]
              })]
            })]
          })]
        });
      }
    }]);
    return SoftTokenLogin;
  }(_ModalHandleError2.default);
