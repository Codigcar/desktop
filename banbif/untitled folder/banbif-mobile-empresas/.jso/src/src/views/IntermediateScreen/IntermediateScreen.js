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
  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[7]);
  var _Icon = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _ModalHandleError2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _Button = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var _strings = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));
  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13]));
  var _ShadowContainer = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[14]));
  var _Styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[15]));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[16]);
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var IntermediateScrenn = exports.default = function (_ModalHandleError) {
    (0, _inherits2.default)(IntermediateScrenn, _ModalHandleError);
    function IntermediateScrenn(props) {
      var _this;
      (0, _classCallCheck2.default)(this, IntermediateScrenn);
      _this = _callSuper(this, IntermediateScrenn, [props]);
      _this.state = {
        modalIntermediate: true
      };
      return _this;
    }
    (0, _createClass2.default)(IntermediateScrenn, [{
      key: "moveToLogin",
      value: function moveToLogin() {
        _reactNative.BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonPressAndroid);
        this.props.navigation.navigate("Login");
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;
        return (0, _jsxRuntime.jsx)(_reactNative.View, {
          children: (0, _jsxRuntime.jsx)(_reactNativeModal.default, {
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
                      style: {
                        fontSize: 15
                      },
                      children: _strings.default.redirectToLogin.textScreen
                    })
                  }), (0, _jsxRuntime.jsx)(_reactNative.View, {
                    children: (0, _jsxRuntime.jsx)(_Button.default, {
                      color: _colors.default.lightBlue,
                      width: 150,
                      height: 40,
                      textButton: _strings.default.redirectToLogin.textButton,
                      action: function action() {
                        _this2.setState({
                          modalIntermediate: false
                        });
                        _this2.moveToLogin();
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
    return IntermediateScrenn;
  }(_ModalHandleError2.default);
