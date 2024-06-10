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
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _propTypes = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _dateFormat = _$$_REQUIRE(_dependencyMap[10]);
  var _Styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var _InterleavedListMovementCreditCardComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));
  var _monetary = _$$_REQUIRE(_dependencyMap[13]);
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[14]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var height = _reactNative.Dimensions.get("window").height;
  var AccountMovementCreditCardComponent = exports.default = function (_Component) {
    (0, _inherits2.default)(AccountMovementCreditCardComponent, _Component);
    function AccountMovementCreditCardComponent() {
      var _this;
      (0, _classCallCheck2.default)(this, AccountMovementCreditCardComponent);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _callSuper(this, AccountMovementCreditCardComponent, [].concat(args));
      _this.ConditionalFooter = function () {
        if (_this.props.nextPage > 1) {
          return (0, _jsxRuntime.jsx)(_reactNative.View, {
            style: {
              backgroundColor: _colors.default.white,
              height: 100,
              marginBottom: 20
            },
            children: (0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
              onPress: _this.props.onNextPage,
              children: (0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: _Styles.default.pageContainer,
                children: [(0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: _Styles.default.pageIcon,
                  children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: _Styles.default.pageIconText,
                    children: "..."
                  })
                }), (0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: _Styles.default.pageText,
                  children: "Ver m\xE1s"
                })]
              })
            })
          });
        } else {
          return (0, _jsxRuntime.jsx)(_reactNative.View, {
            style: {
              height: 100
            }
          });
        }
      };
      return _this;
    }
    (0, _createClass2.default)(AccountMovementCreditCardComponent, [{
      key: "render",
      value: function render() {
        var _this2 = this;
        return (0, _jsxRuntime.jsxs)(_reactNative.View, Object.assign({}, this.props, {
          children: [(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: _Styles.default.View,
            children: [(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: _Styles.default.Day,
              children: "Fecha Cons."
            }), (0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: _Styles.default.Day,
              children: "Fecha Proc."
            }), (0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: _Styles.default.History,
              children: "Descripci\xF3n   "
            }), (0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: _Styles.default.Value,
              children: "Monto S/."
            }), (0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: _Styles.default.Value,
              children: "Monto $"
            })]
          }), (0, _jsxRuntime.jsx)(_reactNative.View, {
            children: (0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: [_Styles.default.container, {
                height: height - 270
              }],
              children: [(0, _jsxRuntime.jsx)(_reactNative.ActivityIndicator, {
                style: {
                  paddingTop: this.props.size != 0 ? 40 : 0
                },
                animating: this.props.isvisible,
                size: this.props.size,
                color: _colors.default.lightBlue
              }), this.props.list && (0, _jsxRuntime.jsx)(_reactNative.FlatList, {
                data: this.props.filteredProducts,
                renderItem: function renderItem(_ref) {
                  var item = _ref.item,
                    index = _ref.index;
                  return (0, _jsxRuntime.jsx)(_InterleavedListMovementCreditCardComponent.default, {
                    BackgroundColor: !(index % 2 == 0) ? _colors.default.listGrey : _colors.default.white,
                    FechaConsumo: !(item.fechaConsumo == undefined) ? _dateFormat.DateFormat.formatMonthNameMovement(item.fechaConsumo) : "",
                    FechaProceso: !(item.fechaProceso == undefined) ? _dateFormat.DateFormat.formatMonthNameMovement(item.fechaProceso) : "",
                    History: item.descripcion,
                    Soles: _monetary.Monetary.format(item.montoSoles),
                    Dolares: _monetary.Monetary.format(item.montoDolares),
                    onPress: function onPress() {
                      return _this2.props.navigation.navigate("Product Name");
                    },
                    children: item.textDetails
                  }, item.textDetails);
                },
                ListFooterComponent: this.ConditionalFooter
              })]
            })
          })]
        }));
      }
    }]);
    return AccountMovementCreditCardComponent;
  }(_react.Component);
  AccountMovementCreditCardComponent.propstype = {
    filteredProducts: _propTypes.default.array,
    Currency: _propTypes.default.string
  };
