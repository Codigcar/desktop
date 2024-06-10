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
  var _Icon = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _Style = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _monetaryType = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var _monetary = _$$_REQUIRE(_dependencyMap[12]);
  var _CurrencyComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13]));
  var _EntidadNombre = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[14]));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[15]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var ProductTypeLeasing = exports.default = function (_Component) {
    (0, _inherits2.default)(ProductTypeLeasing, _Component);
    function ProductTypeLeasing() {
      (0, _classCallCheck2.default)(this, ProductTypeLeasing);
      return _callSuper(this, ProductTypeLeasing, arguments);
    }
    (0, _createClass2.default)(ProductTypeLeasing, [{
      key: "render",
      value: function render() {
        var _this$props;
        return (0, _jsxRuntime.jsxs)(_reactNative.View, Object.assign({}, this.props, {
          style: _Style.default.view,
          children: [(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: {
              flex: 1
            },
            children: (0, _jsxRuntime.jsx)(_CurrencyComponent.default, {
              moneda: this.props.moneda
            })
          }), (0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: _Style.default.headerOuterContainer,
            children: [(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: _Style.default.titleContainer,
              children: [(0, _jsxRuntime.jsx)(_reactNative.View, {
                style: {
                  width: "50%"
                },
                children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: _Style.default.titleFont,
                  children: "Nro. de Operaci\xF3n"
                })
              }), (0, _jsxRuntime.jsx)(_reactNative.View, {
                style: {
                  justifyContent: "center",
                  width: "50%"
                },
                children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: _Style.default.accountFont,
                  children: this.props.cobranzaNumber
                })
              })]
            }), (0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: _Style.default.titleContainer,
              children: [(0, _jsxRuntime.jsx)(_reactNative.View, {
                style: {
                  width: "50%"
                },
                children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: _Style.default.titleFont,
                  children: "Saldo Capital"
                })
              }), (0, _jsxRuntime.jsx)(_reactNative.View, {
                style: {
                  justifyContent: "center",
                  width: "50%"
                },
                children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: [_Style.default.accountFont, {
                    color: this.props.monto > 0 ? _colors.default.green : _colors.default.red
                  }],
                  children: _monetaryType.default[this.props.moneda] + _monetary.Monetary.format(this.props.monto)
                })
              })]
            }), (0, _jsxRuntime.jsx)(_EntidadNombre.default, {
              entidad: (_this$props = this.props) == null ? undefined : _this$props.entidad,
              isInList: true
            })]
          }), (0, _jsxRuntime.jsx)(_reactNative.View, {
            style: _Style.default.right,
            children: (0, _jsxRuntime.jsx)(_Icon.default, {
              style: {
                color: this.props.color
              },
              family: _Icon.default.ENTYPO,
              name: "chevron-small-right",
              size: 40
            })
          })]
        }));
      }
    }]);
    return ProductTypeLeasing;
  }(_react.Component);
  ProductTypeLeasing.proptype = {};
