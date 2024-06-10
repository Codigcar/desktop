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
  var _Style = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _ShadowContainer = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _propTypes = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var _ProductTypeLeasing = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));
  var _ProductTypeCollections = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13]));
  var _ProductTypeDepositsOfDeposit = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[14]));
  var _ProductTypeLoans = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[15]));
  var _ProductTypeTimeDeposits = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[16]));
  var _ProductTypeDiscounts = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[17]));
  var _ProductTypeCheckingAccountDetails = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[18]));
  var _ProductTypeCreditCard = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[19]));
  var _ProductTypeFactoringComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[20]));
  var _ProductTypeInternationalCollectionsComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[21]));
  var _ProductTypeCreditLineComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[22]));
  var _ProductTypeCreditLettersComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[23]));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[24]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var ProductNameComponent = exports.default = function (_Component) {
    (0, _inherits2.default)(ProductNameComponent, _Component);
    function ProductNameComponent() {
      (0, _classCallCheck2.default)(this, ProductNameComponent);
      return _callSuper(this, ProductNameComponent, arguments);
    }
    (0, _createClass2.default)(ProductNameComponent, [{
      key: "render",
      value: function render() {
        return (0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, Object.assign({}, this.props, {
          children: (0, _jsxRuntime.jsx)(_reactNative.View, {
            children: (0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: _Style.default.headerContainer,
              children: [this.props.ProductType == 1 && (0, _jsxRuntime.jsx)(_ProductTypeLeasing.default, {
                cobranzaNumber: this.props.NrAccount,
                monto: this.props.SaldoActual,
                color: _colors.default.lightBlue,
                moneda: this.props.moneda,
                entidad: this.props.entidad
              }), this.props.ProductType == 2 && (0, _jsxRuntime.jsx)(_ProductTypeFactoringComponent.default, {
                cobranzaNumber: this.props.NrAccount,
                monto: this.props.SaldoActual,
                color: _colors.default.lightBlue,
                moneda: this.props.moneda,
                entidad: this.props.entidad
              }), this.props.ProductType == 3 && (0, _jsxRuntime.jsx)(_ProductTypeInternationalCollectionsComponent.default, {
                cobranzaNumber: this.props.NrAccount,
                monto: this.props.SaldoActual,
                color: _colors.default.lightBlue,
                moneda: this.props.moneda,
                entidad: this.props.entidad
              }), this.props.ProductType == 4 && (0, _jsxRuntime.jsx)(_ProductTypeCreditLineComponent.default, {
                cobranzaNumber: this.props.NrAccount,
                monto: this.props.SaldoActual,
                color: _colors.default.lightBlue,
                moneda: this.props.moneda,
                entidad: this.props.entidad
              }), this.props.ProductType == 5 && (0, _jsxRuntime.jsx)(_ProductTypeCollections.default, {
                nrCobranza: this.props.NrAccount,
                monto: this.props.SaldoActual,
                color: _colors.default.lightBlue,
                moneda: this.props.moneda,
                entidad: this.props.entidad
              }), this.props.ProductType == 6 && (0, _jsxRuntime.jsx)(_ProductTypeDepositsOfDeposit.default, {
                nrProducto: this.props.NrAccount,
                monto: this.props.SaldoActual,
                color: _colors.default.lightBlue,
                moneda: this.props.moneda,
                entidad: this.props.entidad
              }), this.props.ProductType == 7 && (0, _jsxRuntime.jsx)(_ProductTypeLoans.default, {
                nrProducto: this.props.NrAccount,
                saldo: this.props.SaldoActual,
                color: _colors.default.lightBlue,
                moneda: this.props.moneda,
                entidad: this.props.entidad
              }), this.props.ProductType == 8 && (0, _jsxRuntime.jsx)(_ProductTypeTimeDeposits.default, {
                nrProducto: this.props.NrAccount,
                saldoDisponible: this.props.SaldoActual,
                saldoInteres: this.props.SaldoActual + this.props.SaldoDisponible,
                color: _colors.default.lightBlue,
                moneda: this.props.moneda,
                entidad: this.props.entidad
              }), this.props.ProductType == 9 && (0, _jsxRuntime.jsx)(_ProductTypeDiscounts.default, {
                number: this.props.NrAccount,
                saldo: this.props.SaldoActual,
                color: _colors.default.lightBlue,
                moneda: this.props.moneda,
                entidad: this.props.entidad
              }), this.props.ProductType == 10 && (0, _jsxRuntime.jsx)(_ProductTypeCreditLettersComponent.default, {
                number: this.props.NrAccount,
                saldo: this.props.SaldoActual,
                color: _colors.default.lightBlue,
                moneda: this.props.moneda,
                entidad: this.props.entidad
              }), this.props.ProductType == 11 && (0, _jsxRuntime.jsx)(_ProductTypeCheckingAccountDetails.default, {
                nrProducto: this.props.NrAccount,
                saldo: this.props.SaldoDisponible,
                color: _colors.default.lightBlue,
                moneda: this.props.moneda,
                entidad: this.props.entidad
              }), this.props.ProductType == 12 && (0, _jsxRuntime.jsx)(_ProductTypeCreditCard.default, {
                nrProducto: this.props.NrAccount,
                saldo: this.props.SaldoDisponible,
                color: _colors.default.lightBlue,
                moneda: this.props.moneda,
                entidad: this.props.entidad
              })]
            })
          })
        }));
      }
    }]);
    return ProductNameComponent;
  }(_react.Component);
  ProductNameComponent.propTypes = {
    NrAccount: _propTypes.default.string,
    NrCCI: _propTypes.default.string
  };
