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
  var _ModalErrorComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _strings = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _errorState = _$$_REQUIRE(_dependencyMap[9]);
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[10]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var ModalHandleError = exports.default = function (_Component) {
    (0, _inherits2.default)(ModalHandleError, _Component);
    function ModalHandleError(props) {
      var _this;
      (0, _classCallCheck2.default)(this, ModalHandleError);
      _this = _callSuper(this, ModalHandleError, [props]);
      _this.handleMessages = _this.handleMessages;
      _this.hasMessage = _this.hasMessage;
      _this.hasError = _this.hasError;
      _this.messageOk = _this.messageOk;
      _this.getModals = _this.getModals;
      _this.state = {
        messages: [],
        visible: _errorState.ErrorStateService.getIsLogout() ? false : true
      };
      return _this;
    }
    (0, _createClass2.default)(ModalHandleError, [{
      key: "hasMessage",
      value: function hasMessage(err) {
        return err && err.response && err.response.data && err.response.data.meta && err.response.data.meta.mensajes && err.response.data.meta.mensajes.length > 0;
      }
    }, {
      key: "handleMessages",
      value: function handleMessages(err) {
        if (this.hasMessage(err)) {
          this.setState({
            messages: err.response.data.meta.mensajes
          });
        } else {
          this.setState({
            messages: [{
              mensaje: _strings.default.messages.error
            }]
          });
        }
      }
    }, {
      key: "hasError",
      value: function hasError(err) {
        return err && err.status != 200 && err.status != 201;
      }
    }, {
      key: "messageOk",
      value: function messageOk() {
        var _this$state = this.state,
          messages = _this$state.messages,
          redirect = _this$state.redirect,
          redirectRoute = _this$state.redirectRoute;
        var _messages = this.state.messages;
        _messages.pop();
        this.setState({
          messages: _messages
        });
        if (messages.length == 0 && redirect) {
          if (redirectRoute) {
            this.props.navigation.navigate(redirectRoute);
          } else {
            this.props.navigation.navigate("MainMenu");
          }
        }
      }
    }, {
      key: "getModals",
      value: function getModals() {
        var _this2 = this;
        var messageViews = this.state.messages.map(function (message, i) {
          return (0, _jsxRuntime.jsx)(_ModalErrorComponent.default, {
            TextError: message.mensaje,
            Visibility: _this2.state.messages.length > 0 && i == _this2.state.messages.length - 1 && _this2.state.visible,
            Callback: _this2.messageOk.bind(_this2)
          }, i);
        });
        return messageViews;
      }
    }]);
    return ModalHandleError;
  }(_react.Component);
