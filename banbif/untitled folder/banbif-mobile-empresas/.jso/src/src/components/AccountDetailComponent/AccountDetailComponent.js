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
  var _BlueLineWithTextComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _DollarIconAndTextComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _propTypes = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var _EntidadNombre = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[13]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var AccountDetailComponent = exports.default = function (_Component) {
    (0, _inherits2.default)(AccountDetailComponent, _Component);
    function AccountDetailComponent() {
      (0, _classCallCheck2.default)(this, AccountDetailComponent);
      return _callSuper(this, AccountDetailComponent, arguments);
    }
    (0, _createClass2.default)(AccountDetailComponent, [{
      key: "render",
      value: function render() {
        var _this$props;
        return (0, _jsxRuntime.jsxs)(_reactNative.View, Object.assign({}, this.props, {
          children: [(0, _jsxRuntime.jsx)(_reactNative.View, {
            children: (0, _jsxRuntime.jsx)(_DollarIconAndTextComponent.default, {
              NrAccount: this.props.NrAccount,
              NrCCI: this.props.NrCCI,
              ArrowColor: _colors.default.white,
              isDetail: true,
              moneda: this.props.moneda
            })
          }), (0, _jsxRuntime.jsx)(_EntidadNombre.default, {
            entidad: (_this$props = this.props) == null ? undefined : _this$props.entidad
          }), (0, _jsxRuntime.jsx)(_reactNative.View, {
            children: (0, _jsxRuntime.jsx)(_BlueLineWithTextComponent.default, {
              Text: this.props.type
            })
          })]
        }));
      }
    }]);
    return AccountDetailComponent;
  }(_react.Component);
  AccountDetailComponent.propstype = {
    NrAccount: _propTypes.default.string,
    NrCCI: _propTypes.default.string
  };
